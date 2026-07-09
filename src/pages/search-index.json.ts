import { getCollection } from "astro:content";

export async function GET() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  const [blog, projects, notes, resources] = await Promise.all([
    getCollection("blog"),
    getCollection("projects"),
    getCollection("notes"),
    getCollection("resources"),
  ]);

  const entries = [
    ...blog.map((p) => ({
      title: p.data.title.toLowerCase(),
      summary: p.data.summary.toLowerCase(),
      displayTitle: p.data.title,
      displaySummary: p.data.summary,
      href: `${base}/blog/${p.id.replace(/\.md$/, "")}`,
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
      href: `${base}/projects/${p.id.replace(/\.md$/, "")}`,
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
      href: `${base}/notes/${n.id.replace(/\.md$/, "")}`,
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
      href: `${base}/resources/${r.id.replace(/\.md$/, "")}`,
      type: "resources" as const,
      tags: r.data.tags.join(", ").toLowerCase(),
      displayTags: r.data.tags.join(", "),
      date: r.data.date,
    })),
  ];

  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json" },
  });
}