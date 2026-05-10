<script setup lang="ts">
const links = [
  { name: 'TTRPG', to: '/ttrpg' },
  { name: 'Bookmarks', to: '/bookmarks' },
]
</script>

<template>
  <footer class="navigation">
    <div class="footer-main">
      Wiktoria's Secret
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.name }}</NuxtLink>
    </div>
    <!-- The Maw Webring -->
    <nav class="themaw-webring" aria-label="The Maw Webring">
      <a href="https://webring.themaw.dev/prev/?from=https%3A%2F%2Fwiktoriassecret.com%2F">&larr; Prev</a>
      <a href="https://webring.themaw.dev/">The Maw Webring</a>
      <a href="https://webring.themaw.dev/random/?from=https%3A%2F%2Fwiktoriassecret.com%2F">Random</a>
      <a href="https://webring.themaw.dev/next/?from=https%3A%2F%2Fwiktoriassecret.com%2F">Next &rarr;</a>
    </nav>
  </footer>
</template>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
}

.footer-main {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.themaw-webring {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: center;
}
</style>