// list-paginator.js
// Shared client-side pagination + filtering engine.
// Works with Astro SSG: pages embed JSON data, paginator handles filter + slice + render.

/**
 * Escape HTML to prevent XSS in innerHTML rendering.
 */
export function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Compute which page numbers to show (with ellipsis for large ranges).
 * Pattern: [1] ... [page-1] [page] [page+1] ... [last]
 */
export function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = [];
  pages.push(1);
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

/**
 * Render pagination buttons into a container element.
 * Call this from onStateChange to keep pagination in sync.
 */
export function renderPagination(container, currentPage, totalPages, onPageChange) {
  // Clear existing listeners by replacing with clone (no clone needed since we innerHTML)
  if (totalPages <= 1) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }
  container.style.display = "";

  const pages = getPageNumbers(currentPage, totalPages);
  let html = "";

  // Previous button
  html += `<button class="page-btn" data-page="${currentPage - 1}"${
    currentPage <= 1 ? " disabled" : ""
  } aria-label="上一页">←</button>`;

  // Page numbers
  for (const p of pages) {
    if (p === "...") {
      html += '<span class="page-ellipsis">…</span>';
    } else {
      html += `<button class="page-btn${
        p === currentPage ? " active" : ""
      }" data-page="${p}">${p}</button>`;
    }
  }

  // Next button
  html += `<button class="page-btn" data-page="${currentPage + 1}"${
    currentPage >= totalPages ? " disabled" : ""
  } aria-label="下一页">→</button>`;

  container.innerHTML = html;

  // Bind click events
  container.querySelectorAll(".page-btn:not([disabled])").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPage = parseInt(btn.getAttribute("data-page"));
      if (targetPage >= 1 && targetPage <= totalPages) {
        onPageChange(targetPage);
      }
    });
  });
}

/**
 * Create a paginator instance.
 *
 * @param {Object} config
 * @param {Array}  config.items         - Full data array
 * @param {number} config.pageSize      - Items per page (default 10)
 * @param {Object} config.filterDefs    - Filter definitions: { param: matchFn(item, value) }
 * @param {Function} config.onStateChange - Called with state object on every state change
 * @returns {{ setFilter, goToPage, destroy }}
 */
export function createPaginator(config) {
  const { items, pageSize = 10, filterDefs = {}, onStateChange } = config;

  let activeFilters = {};
  let currentPage = 1;

  // Read initial state from URL
  const initialParams = new URLSearchParams(window.location.search);
  for (const key of Object.keys(filterDefs)) {
    const val = initialParams.get(key);
    if (val) activeFilters[key] = val;
  }
  // Also read search param even if not in filterDefs (blog search)
  const searchVal = initialParams.get("search");
  if (searchVal) activeFilters["search"] = searchVal;

  const initialPage = parseInt(initialParams.get("page"));
  if (initialPage >= 1) currentPage = initialPage;

  function getFilteredItems() {
    return items.filter((item) => {
      for (const [key, value] of Object.entries(activeFilters)) {
        if (!value) continue;
        if (filterDefs[key]) {
          if (!filterDefs[key](item, value)) return false;
        } else if (key === "search") {
          // Default search: match against title + summary + tags
          const haystack = [
            item.title || "",
            item.summary || "",
            (item.tags || []).join(" "),
          ]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(value.toLowerCase())) return false;
        }
      }
      return true;
    });
  }

  function syncURL() {
    const url = new URL(window.location.href);
    // Clear known params
    for (const key of [...Object.keys(filterDefs), "search", "page"]) {
      url.searchParams.delete(key);
    }
    // Set active filters
    for (const [key, value] of Object.entries(activeFilters)) {
      if (value) url.searchParams.set(key, value);
    }
    // Set page (only if > 1, to keep URLs clean)
    if (currentPage > 1) {
      url.searchParams.set("page", String(currentPage));
    }
    window.history.replaceState({}, "", url.toString());
  }

  function notify() {
    const filtered = getFilteredItems();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

    // Clamp current page
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    syncURL();

    if (onStateChange) {
      onStateChange({
        pageItems,
        currentPage,
        totalPages,
        filteredCount: filtered.length,
        activeFilters: { ...activeFilters },
        start,
        end: Math.min(start + pageSize, filtered.length),
      });
    }
  }

  function setFilter(key, value) {
    if (value) {
      activeFilters[key] = value;
    } else {
      delete activeFilters[key];
    }
    currentPage = 1; // Reset to page 1 on filter change
    notify();
  }

  function goToPage(page) {
    currentPage = page;
    notify();
    // Scroll to top of list
    const container = document.getElementById("blog-list") ||
                      document.getElementById("notes-list") ||
                      document.getElementById("resources-list") ||
                      document.getElementById("projects-list");
    if (container) {
      container.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function destroy() {
    activeFilters = {};
    currentPage = 1;
  }

  // Initial render
  notify();

  return { setFilter, goToPage, getFilteredItems, notify, destroy };
}