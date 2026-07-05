import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog");
  const data = posts.map((p) => ({
    title: p.data.title,
    summary: p.data.summary,
    href: `/blog/${p.id.replace(/\.md$/, "")}`,
  }));
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}