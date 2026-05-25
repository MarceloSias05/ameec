import { defineCollection, z } from 'astro:content';

const config = defineCollection({
  type: 'data',
  schema: z.any(),
});

const induccion = defineCollection({
  type: 'data',
  schema: z.any(),
});

export const collections = {
  config,
  induccion,
};
