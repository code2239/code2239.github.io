import { getCollection } from "astro:content";
import { create, insertMultiple, save } from "@orama/orama";

export async function GET() {
  const [blog, projects, notes, resources] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
    getCollection("notes"),
    getCollection("resources"),
  ]);

  const entries = [
    ...blog.map((p) => ({
      title: p.data.title,
      summary: p.data.summary,
      href: `/blog/${p.id.replace(/\.md$/, "")}`,
      type: "blog" as const,
      tags: p.data.tags.join(", "),
      date: p.data.date,
    })),
    ...projects.map((p) => ({
      title: p.data.title,
      summary: p.data.summary,
      href: `/projects/${p.id.replace(/\.md$/, "")}`,
      type: "projects" as const,
      tags: p.data.tags.join(", "),
      date: p.data.date,
    })),
    ...notes.map((n) => ({
      title: n.data.title,
      summary: n.data.summary,
      href: `/notes/${n.id.replace(/\.md$/, "")}`,
      type: "notes" as const,
      tags: n.data.tags.join(", "),
      date: n.data.date,
    })),
    ...resources.map((r) => ({
      title: r.data.title,
      summary: r.data.summary,
      href: `/resources/${r.id.replace(/\.md$/, "")}`,
      type: "resources" as const,
      tags: r.data.tags.join(", "),
      date: r.data.date,
    })),
  ];

  const db = await create({
    schema: {
      title: "string",
      summary: "string",
      href: "string",
      type: "string",
      tags: "string",
      date: "string",
    } as const,
  });

  await insertMultiple(db, entries);

  const raw = await save(db);
  return new Response(JSON.stringify(raw), {
    headers: { "Content-Type": "application/json" },
  });
}