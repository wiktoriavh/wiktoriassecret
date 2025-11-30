import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    rootTag: 'body'
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image'
  ],

  nitro: {
    output: {
      dir: 'dist'
    },
    prerender: {
      autoSubfolderIndex: false
    }
  }
})