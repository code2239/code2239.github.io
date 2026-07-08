// filter-controller.js
// Client-side tag filtering + search + URL sync for PostFilter sidebar.
// Extracted from PostFilter.astro to keep the component template clean.

export function initFilter() {
  const buttons = document.querySelectorAll(".sidebar-tag");
  const posts = document.querySelectorAll(".post-item");
  const searchInput = document.getElementById("post-search");
  const clearBtn = document.getElementById("search-clear");
  const emptyEl = document.getElementById("filter-empty");

  if (!searchInput && buttons.length === 0) return;

  let activeTag = "";

  function updateVisibility() {
    const query = searchInput?.value.trim().toLowerCase() || "";
    let visibleCount = 0;

    posts.forEach((post) => {
      const tags = post.getAttribute("data-tags") || "";
      const text = post.textContent?.toLowerCase() || "";
      const tagMatch = !activeTag || tags.split(",").includes(activeTag);
      const searchMatch = !query || text.includes(query);

      if (tagMatch && searchMatch) {
        post.style.display = "";
        visibleCount++;
      } else {
        post.style.display = "none";
      }
    });

    if (emptyEl) emptyEl.style.display = visibleCount === 0 ? "block" : "none";
    if (clearBtn) clearBtn.style.display = query ? "flex" : "none";
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTag = btn.getAttribute("data-tag") || "";
      buttons.forEach((b) =>
        b.classList.toggle("active", b.getAttribute("data-tag") === activeTag)
      );
      const url = new URL(window.location.href);
      activeTag
        ? url.searchParams.set("tag", activeTag)
        : url.searchParams.delete("tag");
      window.history.replaceState({}, "", url.toString());
      updateVisibility();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", updateVisibility);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      updateVisibility();
    });
  }

  const params = new URLSearchParams(window.location.search);
  const initialTag = params.get("tag") || "";
  if (initialTag) {
    activeTag = initialTag;
    buttons.forEach((b) =>
      b.classList.toggle("active", b.getAttribute("data-tag") === activeTag)
    );
  }
  updateVisibility();
}