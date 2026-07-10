// card-renderers.js
// Shared JS card-rendering functions, matching the original Astro components' HTML structure.
// Used by list-paginator.js for client-side rendering after filter + paginate.

import { escapeHtml } from "./list-paginator.js";

/**
 * Blog article card - matches ArticleCard.astro + TagList.astro.
 */
export function renderBlogCard(item) {
  const tagsHtml = item.tags
    .map(
      (t, i) =>
        `<span>${escapeHtml(t)}${i < item.tags.length - 1 ? '<span class="mx-1">·</span>' : ""}</span>`
    )
    .join("");

  return `
    <article class="card-hover p-6 h-full">
      <a href="${escapeHtml(item.href)}" class="no-underline flex flex-col h-full group">
        <h3 class="text-lg font-semibold mb-1.5 text-[var(--color-text)] line-clamp-2">
          ${escapeHtml(item.title)}
        </h3>
        <p class="text-sm text-[var(--color-text-tertiary)] mb-2">${escapeHtml(item.date)}</p>
        <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">
          ${escapeHtml(item.summary)}
        </p>
        <div class="mt-auto">
          <span class="text-sm text-[var(--color-text-tertiary)]">${tagsHtml}</span>
        </div>
      </a>
    </article>`;
}

/**
 * Notes card - same structure as blog card but links to /notes/.
 */
export function renderNotesCard(item) {
  const tagsHtml = item.tags
    .map(
      (t, i) =>
        `<span>${escapeHtml(t)}${i < item.tags.length - 1 ? '<span class="mx-1">·</span>' : ""}</span>`
    )
    .join("");

  return `
    <article class="card-hover p-6 h-full">
      <a href="${escapeHtml(item.href)}" class="no-underline flex flex-col h-full group">
        <h3 class="text-lg font-semibold mb-1.5 text-[var(--color-text)] line-clamp-2">
          ${escapeHtml(item.title)}
        </h3>
        <p class="text-sm text-[var(--color-text-tertiary)] mb-2">${escapeHtml(item.date)}</p>
        <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">
          ${escapeHtml(item.summary)}
        </p>
        <div class="mt-auto">
          <span class="text-sm text-[var(--color-text-tertiary)]">${tagsHtml}</span>
        </div>
      </a>
    </article>`;
}

/**
 * Project card - matches ProjectCard.astro.
 */
export function renderProjectCard(item) {
  const tagsHtml = item.tags
    .map(
      (t, i) =>
        `<span>${escapeHtml(t)}${i < item.tags.length - 1 ? '<span class="mx-1">·</span>' : ""}</span>`
    )
    .join("");

  const imageHtml = item.image
    ? `<div class="aspect-[16/9] overflow-hidden bg-[var(--color-bg-tertiary)]">
         <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
       </div>`
    : `<div class="aspect-[16/9] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-bg-tertiary)] flex items-center justify-center">
         <svg class="w-10 h-10 text-[var(--color-text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
           <rect x="2" y="3" width="20" height="14" rx="2" />
           <path d="M8 21h8M12 17v4" />
         </svg>
       </div>`;

  const linksHtml = (item.github || item.demo)
    ? `<div class="px-5 pb-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-3">
         ${item.github ? `<a href="${escapeHtml(item.github)}" target="_blank" rel="noopener noreferrer" class="text-xs text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</a>` : ""}
         ${item.demo ? `<a href="${escapeHtml(item.demo)}" target="_blank" rel="noopener noreferrer" class="text-xs text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>Live Demo</a>` : ""}
       </div>`
    : "";

  return `
    <article class="card-hover overflow-hidden h-full flex flex-col">
      <a href="${escapeHtml(item.href)}" class="no-underline flex flex-col h-full group">
        ${imageHtml}
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-base font-semibold mb-1 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
            ${escapeHtml(item.title)}
          </h3>
          <p class="text-sm text-[var(--color-text-tertiary)] mb-2">${escapeHtml(item.date)}</p>
          <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">
            ${escapeHtml(item.summary)}
          </p>
          <div class="mt-auto">
            <span class="text-sm text-[var(--color-text-tertiary)]">${tagsHtml}</span>
          </div>
        </div>
      </a>
      ${linksHtml}
    </article>`;
}

/**
 * Resource card (root-level single resource).
 * Matches the resource-index-item pattern in resources/index.astro.
 */
export function renderResourceCard(item) {
  const filesCount = item.fileCount || 0;

  const tagsHtml = item.tags
    .slice(0, 4)
    .map((t) => `<span class="text-xs px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] font-mono">${escapeHtml(t)}</span>`)
    .join("");

  return `
    <article class="card-hover overflow-hidden h-full flex flex-col">
      <a href="${escapeHtml(item.href)}" class="no-underline flex flex-col h-full group">
        <div class="aspect-[16/9] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-bg-tertiary)] flex items-center justify-center relative">
          <svg class="w-14 h-14 text-[var(--color-accent)]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${filesCount > 0 ? `<span class="absolute bottom-4 right-4 text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg)]/80 px-2 py-1 rounded">${filesCount} 个文件</span>` : ""}
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-base font-semibold mb-1 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
            ${escapeHtml(item.title)}
          </h3>
          <p class="text-xs text-[var(--color-text-tertiary)] mb-2">${escapeHtml(item.date)}</p>
          <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2 mb-3">
            ${escapeHtml(item.summary)}
          </p>
          <div class="flex flex-wrap gap-1.5 mt-auto">
            ${tagsHtml}
          </div>
        </div>
      </a>
    </article>`;
}

/**
 * Resource group card - matches the group-entry pattern in resources/index.astro.
 */
export function renderResourceGroupCard(item) {
  const tagsHtml = (item.tags || [])
    .slice(0, 5)
    .map((t) => `<span class="text-xs px-2 py-0.5 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] font-mono">${escapeHtml(t)}</span>`)
    .join("");

  return `
    <article class="card-hover overflow-hidden h-full flex flex-col">
      <a href="${escapeHtml(item.href)}" class="no-underline flex flex-col h-full group">
        <div class="aspect-[16/9] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-bg-tertiary)] flex items-center justify-center relative">
          <svg class="w-14 h-14 text-[var(--color-accent)]/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
          </svg>
          <span class="absolute bottom-4 right-4 text-xs font-mono text-[var(--color-text-tertiary)] bg-[var(--color-bg)]/80 px-2 py-1 rounded">
            ${item.itemCount || 0} 个资源
          </span>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-base font-semibold mb-1 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors capitalize">
            ${escapeHtml(item.title)}
          </h3>
          <p class="text-xs text-[var(--color-text-tertiary)] mb-2">${escapeHtml(item.dateRange || item.date)}</p>
          <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">
            ${escapeHtml(item.summary)}
          </p>
        </div>
      </a>
    </article>`;
}