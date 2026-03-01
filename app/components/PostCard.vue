<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <NuxtLink :to="post.path" class="post-card">
        <time :datetime="post.date">{{ new Date(post.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) }}</time>
        <span class="title">
          {{ post.title }}
          <span class="ttrpg" v-if="post.ttrpg">({{ post.ttrpg }})</span>
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
type Post = {
  title: string;
  date: string;
  ttrpg?: string;
  path: string;
  id: string;
}
defineProps<{
  posts: Post[];
}>();
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .75rem;
  padding: 0;
}

li {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  font-size: 1.25rem;
}

.post-card {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-items: baseline;
  text-decoration: none;
  color: inherit;
  gap: 1rem;
}

time {
  font-family: monospace;
  font-size: 0.9em;
}

li:hover .title {
  text-decoration: underline wavy;
  text-underline-offset: 0.2em;
}

.ttrpg {
  font-size: 0.9em;
  margin-left: .25em;
}
</style>
