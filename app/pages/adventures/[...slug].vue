<script setup lang="ts">
const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => 
  queryCollection('content').path(route.path).first()
)

if (error.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

if (page.value) {
  useSeoMeta({
    title: page.value.title || 'Page',
    description: page.value.description || ''
  })
}
</script>

<template>
  <ContentRenderer :value="page" />
</template>
