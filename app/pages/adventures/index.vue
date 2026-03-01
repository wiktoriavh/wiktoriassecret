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
    .map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      path: item.path,
      stem: item.stem
    }))
})

useSeoMeta({
  title: 'Adventures',
  description: 'All my adventures'
})
</script>

<template>
  <div class="adventures-index">
    <p>Explore all my adventures and stories.</p>

    <div v-if="adventures && adventures.length > 0" class="adventures-list">
      <article v-for="adventure in adventures" :key="adventure.id" class="adventure-item">
        <NuxtLink :to="adventure.path" class="adventure-link">
          <h2>{{ adventure.title || adventure.stem }}</h2>
          <p v-if="adventure.description" class="description">
            {{ adventure.description }}
          </p>
          <time v-if="adventure.date" :datetime="adventure.date" class="date">
            {{ new Date(adventure.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) }}
          </time>
        </NuxtLink>
      </article>
    </div>

    <p v-else class="no-adventures">
      No adventures yet. Check back soon!
    </p>
  </div>
</template>

<style scoped>
.adventures-index {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.adventures-list {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.adventure-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.adventure-item:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.adventure-link {
  text-decoration: none;
  color: inherit;
}

.adventure-link h2 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.description {
  color: #6b7280;
  margin: 0.5rem 0;
}

.date {
  display: block;
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}

.no-adventures {
  margin-top: 2rem;
  color: #6b7280;
}
</style>
