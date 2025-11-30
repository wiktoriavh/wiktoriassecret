<script setup lang="ts">
const links = [
  { name: 'Home', to: '/' },
  { name: 'Adventures', to: '/adventures' }
]
</script>

<template>
  <header class="navigation">
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.name }}</NuxtLink>
  </header>
</template>

<style scoped>
.navigation {
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
}
</style>