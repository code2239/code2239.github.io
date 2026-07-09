import { getCollection } from "astro:content";
import { create, insertMultiple, save } from "@orama/orama";
import { createTokenizer } from "@orama/tokenizers/mandarin";

export async function GET() {
  const [blog, projects, notes, resources] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
    getCollection("notes"),
    getCollection("resources"),
  ]);

  // Lowercase all searchable text for case-insensitive matching
  const entries = [
    ...blog.map((p) => ({
      title: p.data.title.toLowerCase(),
      summary: p.data.summary.toLowerCase(),
      displayTitle: p.data.title,
      displaySummary: p.data.summary,
      href: `/blog/${p.id.replace(/\.md$/, "")}`,
      type: "blog" as const,
      tags: p.data.tags.join(", ").toLowerCase(),
      displayTags: p.data.tags.join(", "),
      date: p.data.date,
    })),
    ...projects.map((p) => ({
      title: p.data.title.toLowerCase(),
      summary: p.data.summary.toLowerCase(),
      displayTitle: p.data.title,
      displaySummary: p.data.summary,
      href: `/projects/${p.id.replace(/\.md$/, "")}`,
      type: "projects" as const,
      tags: p.data.tags.join(", ").toLowerCase(),
      displayTags: p.data.tags.join(", "),
      date: p.data.date,
    })),
    ...notes.map((n) => ({
      title: n.data.title.toLowerCase(),
      summary: n.data.summary.toLowerCase(),
      displayTitle: n.data.title,
      displaySummary: n.data.summary,
      href: `/notes/${n.id.replace(/\.md$/, "")}`,
      type: "notes" as const,
      tags: n.data.tags.join(", ").toLowerCase(),
      displayTags: n.data.tags.join(", "),
      date: n.data.date,
    })),
    ...resources.map((r) => ({
      title: r.data.title.toLowerCase(),
      summary: r.data.summary.toLowerCase(),
      displayTitle: r.data.title,
      displaySummary: r.data.summary,
      href: `/resources/${r.id.replace(/\.md$/, "")}`,
      type: "resources" as const,
      tags: r.data.tags.join(", ").toLowerCase(),
      displayTags: r.data.tags.join(", "),
      date: r.data.date,
    })),
  ];

  const tokenizer = await createTokenizer({ language: "mandarin" });

  const db = await create({
    schema: {
      title: "string",
      summary: "string",
      displayTitle: "string",
      displaySummary: "string",
      href: "string",
      type: "string",
      tags: "string",
      displayTags: "string",
      date: "string",
    } as const,
    components: { tokenizer },
  });

  await insertMultiple(db, entries);

  const raw = await save(db);
  return new Response(JSON.stringify(raw), {
    headers: { "Content-Type": "application/json" },
  });
}