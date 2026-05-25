import { defineCollection, z } from 'astro:content';

const config = defineCollection({
  type: 'data',
  schema: z.any(),
});

const induccion = defineCollection({
  type: 'data',
  schema: z.any(),
});

const kb = defineCollection({
  type: 'content',
  schema: z.object({}).passthrough(),
});

export const collections = {
  config,
  induccion,
  kb,
};
