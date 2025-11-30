<script setup lang="ts">
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
})

useSeoMeta({
  title: "Wiktoria's Adventures",
  description: 'A collection of my adventures and stories'
})
</script>

<template>
  <div>
    <p>Welcome! Here are all my adventure posts:</p>
    
    <div v-if="adventures && adventures.length > 0">
      <ul>
        <li v-for="adventure in adventures" :key="adventure._id">
          <NuxtLink :to="adventure.path">
            {{ adventure.title || adventure.stem }}
          </NuxtLink>
          <span v-if="adventure.date"> - {{ new Date(adventure.date).toLocaleDateString() }}</span>
          <p v-if="adventure.description">{{ adventure.description }}</p>
        </li>
      </ul>
    </div>
    
    <p v-else>
      No adventures yet. Check back soon!
    </p>
  </div>
</template>

