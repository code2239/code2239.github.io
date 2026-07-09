// search-init.ts — Dynamically loaded when user triggers global search.
// Keeps @orama/orama (23KB gzip) out of the initial page bundle.

let searchReady = false;
let initPromise: Promise<void> | null = null;

const TYPE_LABELS: Record<string, string> = {
  blog: "博", projects: "项", notes: "记", resources: "资",
};

const TYPE_NAMES: Record<string, string> = {
  blog: "博客", projects: "项目", notes: "日记", resources: "资源",
};

const TYPE_ORDER = ["blog", "projects", "notes", "resources"];

function highlightMatch(text: string, term: string): string {
  if (!term || term.length < 2) return text;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(regex, '<mark class="srch-highlight">$1</mark>');
}

interface Doc {
  title: string; summary: string; displayTitle: string; displaySummary: string;
  href: string; type: string; tags: string; displayTags: string; date: string;
}

export async function initSearchModal() {
  if (searchReady) {
    openModal();
    return;
  }

  if (initPromise) {
    await initPromise;
    openModal();
    return;
  }

  initPromise = (async () => {
    const [{ create, insertMultiple, search }, { createTokenizer }] = await Promise.all([
      import("@orama/orama"),
      import("@orama/tokenizers/mandarin"),
    ]);

    const overlay = document.getElementById("search-overlay")!;
    const backdrop = document.getElementById("search-backdrop")!;
    const input = document.getElementById("search-input") as HTMLInputElement;
    const resultsContainer = document.getElementById("search-results")!;
    const emptyHint = document.getElementById("search-empty-hint")!;
    const skeleton = document.getElementById("search-skeleton")!;

    let db: Awaited<ReturnType<typeof create>> | null = null;
    let activeIdx = -1;
    let resultItems: Array<{ el: HTMLElement; href: string }> = [];
    let debounceTimer: ReturnType<typeof setTimeout>;

    // ---- Open / Close ----
    function open() {
      overlay.classList.add("open");
      input.value = "";
      activeIdx = -1;
      resultItems = [];
      emptyHint.textContent = "输入关键词开始搜索";
      emptyHint.className = "srch-empty";
      resultsContainer.innerHTML = "";
      resultsContainer.appendChild(emptyHint);
      setTimeout(() => input.focus(), 60);
    }

    function close() {
      overlay.classList.remove("open");
    }

    // ---- Search ----
    async function doSearch() {
      const q = input.value.trim();
      if (!q) {
        resultItems = [];
        activeIdx = -1;
        resultsContainer.innerHTML = "";
        emptyHint.textContent = db ? "输入关键词开始搜索" : "正在加载搜索索引...";
        emptyHint.className = "srch-empty";
        resultsContainer.appendChild(emptyHint);
        skeleton.style.display = "none";
        return;
      }

      // Show skeleton while searching
      resultsContainer.innerHTML = "";
      skeleton.style.display = "block";

      if (!db) {
        // Lazy-load index on first search
        try {
          const tokenizer = await createTokenizer({ language: "mandarin" });
          db = await create({
            schema: {
              title: "string", summary: "string", displayTitle: "string", displaySummary: "string",
              href: "string", type: "string", tags: "string", displayTags: "string", date: "string",
            } as const,
            components: { tokenizer },
          });

          const res = await fetch("/search-index.json");
          const docs = (await res.json()) as Doc[];
          await insertMultiple(db, docs);
        } catch {
          emptyHint.textContent = "搜索暂不可用，请稍后重试";
          skeleton.style.display = "none";
          return;
        }
      }

      const rawResults = await search(db, {
        term: q.toLowerCase(),
        properties: ["title", "summary", "tags"],
        limit: 20,
      });

      const hits = rawResults.hits.map((h) => ({
        title: (h.document.displayTitle as string) || (h.document.title as string),
        summary: (h.document.displaySummary as string) || (h.document.summary as string),
        href: h.document.href as string,
        type: h.document.type as string,
        tags: ((h.document.displayTags as string) || (h.document.tags as string)).split(", ").filter(Boolean),
      }));

      if (hits.length === 0) {
        resultItems = [];
        activeIdx = -1;
        resultsContainer.innerHTML = "";
        skeleton.style.display = "none";
        emptyHint.innerHTML = `<p>没有找到与「${q}」相关的结果</p><p class="srch-no-results-hint">试试其他关键词，或浏览 <a href="/blog">博客</a> · <a href="/projects">项目</a></p>`;
        emptyHint.className = "srch-no-results";
        resultsContainer.appendChild(emptyHint);
        return;
      }

      const grouped = new Map<string, typeof hits>();
      for (const hit of hits) {
        if (!grouped.has(hit.type)) grouped.set(hit.type, []);
        grouped.get(hit.type)!.push(hit);
      }

      skeleton.style.display = "none";
      resultsContainer.innerHTML = "";
      resultItems = [];

      for (const type of TYPE_ORDER) {
        const group = grouped.get(type);
        if (!group || group.length === 0) continue;

        const header = document.createElement("div");
        header.className = "srch-group";
        header.innerHTML = `${TYPE_NAMES[type] || type}<span class="srch-group-count">(${group.length})</span>`;
        resultsContainer.appendChild(header);

        for (const hit of group) {
          const el = document.createElement("a");
          el.href = hit.href;
          el.className = "srch-item";
          el.dataset.idx = String(resultItems.length);

          const tagsHTML = hit.tags.length > 0
            ? `<div class="srch-item-tags">${hit.tags.slice(0, 4).map((t) => `<span class="srch-item-tag">${t}</span>`).join("")}</div>`
            : "";

          const highlightedTitle = highlightMatch(hit.title, q);
          const highlightedSummary = highlightMatch(hit.summary, q);

          el.innerHTML = `
            <span class="srch-item-badge">${TYPE_LABELS[hit.type] || hit.type}</span>
            <div class="srch-item-body">
              <div class="srch-item-title">${highlightedTitle}</div>
              <div class="srch-item-summary">${highlightedSummary}</div>
              ${tagsHTML}
            </div>
          `;

          el.addEventListener("click", close);
          el.addEventListener("mouseenter", () => {
            activeIdx = Number(el.dataset.idx);
            updateActive();
          });

          resultsContainer.appendChild(el);
          resultItems.push({ el, href: hit.href });
        }
      }

      activeIdx = 0;
      updateActive();
    }

    function updateActive() {
      resultItems.forEach(({ el }) => {
        el.classList.toggle("active", Number(el.dataset.idx) === activeIdx);
      });
      const active = resultItems.find(({ el }) => Number(el.dataset.idx) === activeIdx);
      active?.el.scrollIntoView({ block: "nearest" });
    }

    // ---- Events ----
    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doSearch, 150);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); if (resultItems.length) { activeIdx = Math.min(activeIdx + 1, resultItems.length - 1); updateActive(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (resultItems.length) { activeIdx = Math.max(activeIdx - 1, 0); updateActive(); } }
      else if (e.key === "Enter") { e.preventDefault(); if (activeIdx >= 0 && activeIdx < resultItems.length) { window.location.href = resultItems[activeIdx].href; close(); } }
      else if (e.key === "Escape") { close(); }
    });

    backdrop.addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        overlay.classList.contains("open") ? close() : open();
      }
    });

    (window as any).__searchOpen = open;
    searchReady = true;
  })();

  await initPromise;
  openModal();
}

function openModal() {
  (window as any).__searchOpen?.();
}