<script setup lang="ts">
type Adventure = {
  id: string;
  title: string;
  date: string;
  ttrpg?: string;
  path: string;
}

const { data: adventures } = await useAsyncData('adventures', async () => {
  const items = await queryCollection('content').all()

  // Filter for adventures and sort by date (newest first)
  return items
    .filter(item => item.path?.startsWith('/adventures/') && item.stem !== 'index')
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })
    .map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      ttrpg: item.ttrpg,
      path: item.path
    }))
})

useSeoMeta({
  title: "Wiktoria's Adventures",
  description: 'A collection of my adventures and stories'
})
</script>

<template>
  <h1>All about Wiktoria's Secret</h1>

  <section>
    <DirectorySpan>
      /<h2 class="directory-title">Adventures</h2>
    </DirectorySpan>

    <PostCard :posts="(adventures || []) as Adventure[]" />
  </section>
</template>

<style scoped>
h2.directory-title {
  margin-bottom: 0;
  font-size: inherit;
  font-weight: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  padding: inherit;
  border-radius: inherit;
  background-color: inherit;
  border: inherit;
  text-decoration: inherit;
  text-underline-offset: inherit;
  display: inline;
}

.item {
  list-style: none;
}

.item a {
  color: black;
  text-underline-offset: none;
  text-decoration: none;
  display: block;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid transparent;
}

.item a:hover {
  border: 1px solid #8a867d;
}

.item p {
  font-size: 1rem;
  color: black;
  font-weight: normal;
  text-decoration: none;
}
</style>