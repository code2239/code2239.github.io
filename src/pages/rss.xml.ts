import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../lib/config";

export async function GET(context: { site: URL }) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id.replace(/\.md$/, "")}`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}