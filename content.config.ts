import { defineCollection, defineContentConfig, z } from '@nuxt/content'

/** Optional fields like `ttrpg`, `link` are conventions per tag; unknown keys are kept for future tag-specific metadata. */
const postSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    tags: z.array(z.string()),
    /** External URL (bookmarks, or system / store link for TTRPG). */
    link: z.string().optional(),
    /** TTRPG system or campaign label. */
    ttrpg: z.string().optional()
  })
  .passthrough()
  .superRefine((data, ctx) => {
    if (data.tags.includes('bookmark') && !data.link) {
      ctx.addIssue({
        code: 'custom',
        message: 'Posts tagged "bookmark" must set `link`.',
        path: ['link']
      })
    }
  })

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'posts/**/*.md',
      schema: postSchema
    })
  }
})
