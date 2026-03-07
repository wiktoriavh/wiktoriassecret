import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    ttrpgActualPlays: defineCollection({
      type: 'page',
      source: 'ttrpg-actual-plays/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        ttrpg: z.string().optional(),
        'ttrpg-link': z.string().optional()
      })
    }),
    bookmarks: defineCollection({
      type: 'page',
      source: 'bookmarks/*.md',
      schema: z.object({
        title: z.string(),
        url: z.string(),
        date: z.string()
      })
    })
  }
})
