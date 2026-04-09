<script setup lang="ts">
const route = useRoute()

const { data: page, error } = await useAsyncData(route.path, () => {
  return queryCollection('bookmarks').path(route.path).first();
});

if (error.value || !page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

if (page.value) {
  useSeoMeta({
    title: page.value.title || 'Bookmark',
    description: `A bookmark saved on ${page.value.date}`
  })
}
</script>

<template>
  <div class="grid-container">
    <main class="main-content">
      <div class="item">
        <h1>{{ page?.title }}</h1>
        <div class="card">
          <div class="metadata">
            <p v-if="page?.link" class="url">
              <a :href="page.link" target="_blank" rel="noopener noreferrer">Visit site →</a>
            </p>
            <time v-if="page?.date" :datetime="page.date" class="date">
              Found: {{ new Date(page.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) }}
            </time>
          </div>
          <ContentRenderer class="content" :value="page" />
        </div>
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

.metadata {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.url a {
  color: #280905;
  font-weight: 600;
  text-decoration: none;
}

.url a:hover {
  text-decoration: underline wavy;
  text-underline-offset: 0.2em;
}

.date {
  font-size: 0.875rem;
  color: #666;
  font-family: monospace;
}

.content {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5ch;
  font-size: 1.2rem;
}

.content :deep(a) {
  color: black;
  text-decoration: none;
}

.content :deep(a:hover) {
  text-decoration: underline wavy;
  text-underline-offset: 0.2em;
}

.content :deep(a:hover::after) {
  content: ' #';
}
</style>
