<script setup lang="ts">
const { data: adventures } = await useAsyncData('adventures', async () => {
  return (await queryCollection('ttrpg').order('date', 'DESC').all())
    .map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      ttrpg: item.ttrpg,
      url: item.path
    }))
})

useSeoMeta({
  title: 'TTRPG',
  description: 'All my TTRPG adventures and stories'
})
</script>

<template>
  <div class="grid-container">
    <main class="main-content">
      <div class="item">
        <h1>TTRPG</h1>

        <section class="card">
          <PostCard :posts="(adventures || [])">
            <template #title="{ post }">
              {{ post.title }}
              <span v-if="post.ttrpg" class="ttrpg">({{ post.ttrpg }})</span>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: rotate(0.3deg);
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
