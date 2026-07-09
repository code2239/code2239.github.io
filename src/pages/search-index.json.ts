import { getCollection } from "astro:content";

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
      tags: p.data.tags,
      date: p.data.date,
    })),
    ...projects.map((p) => ({
      title: p.data.title,
      summary: p.data.summary,
      href: `/projects/${p.id.replace(/\.md$/, "")}`,
      type: "projects" as const,
      tags: p.data.tags,
      date: p.data.date,
    })),
    ...notes.map((n) => ({
      title: n.data.title,
      summary: n.data.summary,
      href: `/notes/${n.id.replace(/\.md$/, "")}`,
      type: "notes" as const,
      tags: n.data.tags,
      date: n.data.date,
    })),
    ...resources.map((r) => ({
      title: r.data.title,
      summary: r.data.summary,
      href: `/resources/${r.id.replace(/\.md$/, "")}`,
      type: "resources" as const,
      tags: r.data.tags,
      date: r.data.date,
    })),
  ];

  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json" },
  });
}