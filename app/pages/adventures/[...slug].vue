<script setup lang="ts">
const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first();
});

const metaNote = computed(() => {
  return {
    description: page.value?.description || '',
    ttrpg: page.value?.meta.ttrpg || '',
    ttrpgLink: page.value?.meta.ttrpgLink || ''
  }
});

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
  <h1>{{ page?.title }}</h1>
  <MetaNote :note="metaNote" />
  <ContentRenderer :value="page" />
</template>

<style>

</style>