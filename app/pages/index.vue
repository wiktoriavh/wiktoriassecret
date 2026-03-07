<script setup lang="ts">
type Adventure = {
  id: string;
  title: string;
  date: string;
  ttrpg?: string;
  path: string;
}

const { data: adventures } = await useAsyncData('adventures', async () => {
  const items = await queryCollection('adventures').all()

  return items
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
  <div class="grid-container">
    <main class="main-content">
      <div class="item">
        <h1>All about Wiktoria's Secret</h1>

        <section class="card">
          <h2>My recent TTRPG adventures</h2>

          <PostCard :posts="(adventures || []) as Adventure[]" />
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
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: rotate(.3deg);
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
</style>