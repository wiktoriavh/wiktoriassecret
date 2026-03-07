<script setup lang="ts">
import { randomRotation } from '~/utils/randomRotation';

const { data: adventures } = await useAsyncData('adventures', async () => {
  return (await queryCollection('ttrpgActualPlays').order('date', 'DESC').all())
    .map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      ttrpg: item.ttrpg,
      url: item.path
    }))
})

const { data: bookmarks } = await useAsyncData('bookmarks', async () => {
  return (await queryCollection('bookmarks').order('date', 'DESC').all())
    .map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      url: item.url
    }))
})

const adventuresRotation = useState('adventures-rotation', () => randomRotation())
const bookmarksRotation = useState('bookmarks-rotation', () => randomRotation())

useSeoMeta({
  title: "Wiktoria's Secret",
  description: "All about Wiktoria's Secret"
})
</script>

<template>
  <div class="grid-container">
    <main class="main-content">
      <div class="item">
        <h1>All about Wiktoria's Secret</h1>

        <section class="card" :style="{ transform: `rotate(${adventuresRotation}deg)` }">
          <h2>My recent TTRPG adventures</h2>

          <PostCard :posts="(adventures || [])">
            <template #title="{ post }">
              {{ post.title }}
              <span v-if="post.ttrpg" class="ttrpg">({{ post.ttrpg }})</span>
            </template>
          </PostCard>
        </section>

        <section class="card" :style="{ transform: `rotate(${bookmarksRotation}deg)` }">
          <h2>My favourite sites</h2>

          <PostCard :posts="(bookmarks || [])">
            <template #title="{ post }">
              {{ post.title }}
            </template>
          </PostCard>
        </section>
      </div>
    </main>


    <Aside class="aside-content" />

  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  gap: 2rem;
  width: 100%;
}

/* Desktop layout: 2 columns, 1 row */
@media (min-width: 769px) {
  .grid-container {
    grid-template-columns: 4fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "main aside";
  }

  .main-content {
    grid-area: main;
  }

  .aside-content {
    grid-area: aside;
  }
}

/* Mobile layout: 1 column, 2 rows (aside first, then main) */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "aside"
      "main";
  }

  .main-content {
    grid-area: main;
  }

  .aside-content {
    grid-area: aside;
  }
}

.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  font-size: 1.175rem
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

.ttrpg {
  font-size: 0.9em;
  margin-left: .25em;
}
</style>