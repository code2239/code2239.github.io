import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    categories: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    source: z.string().optional(),
    category: z.enum(["reading", "learning", "research"]).optional(),
  }),
});

const resources = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    files: z.array(z.object({
      filename: z.string(),
      label: z.string(),
      size: z.string().optional(),
      format: z.string().optional(),
    })),
    sourceUrl: z.string().url().optional(),
  }),
});

export const collections = { blog, projects, notes, resources };
