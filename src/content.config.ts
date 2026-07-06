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

export const collections = { blog };
