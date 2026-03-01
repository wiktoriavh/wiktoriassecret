<script setup lang="ts">
const links = [
  { name: 'Home', to: '/', rotation: Math.random() - 0.5 },
  { name: 'Adventures', to: '/adventures', rotation: Math.random() - 0.5 }
]
</script>

<template>
  <header class="navigation">
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :style="{ transform: `rotate(${link.rotation}deg)` }">
      {{ link.name }}</NuxtLink>
  </header>
</template>

<style scoped>
.navigation {
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  justify-content: center;
  align-items: center;
}

.navigation a {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  background-color: #fcf8f0;
  color: #280905;
  font-weight: 700;
}

.navigation a:hover {
  text-decoration: underline wavy;
  text-underline-offset: 0.2em;
}
</style>