<script setup lang="ts">
const links = [
  { name: 'TTRPG Actual Plays', to: '/ttrpg-actual-plays' },
  { name: 'Bookmarks', to: '/bookmarks' },
]
</script>

<template>
  <footer class="navigation">
    Wiktoria's Secret
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.name }}</NuxtLink>
  </footer>
</template>

<style scoped>
.navigation {
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
}
</style>