// src/lib/tagUtils.ts
// Shared tag-counting utility — replaces inline tag aggregation in pages.

interface HasTags {
  data: { tags: string[] };
}

/**
 * Return tags sorted by post count (descending), then alphabetically.
 * Input: array of posts / content entries with data.tags.
 */
export function getTagCounts(posts: Array<HasTags>): [string, number][] {
  const map = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}