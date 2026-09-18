<script setup lang="ts">
const links = [
  { name: "TTRPG", to: "/ttrpg" },
  { name: "Bookmarks", to: "/bookmarks" },
];
</script>

<template>
  <footer class="navigation">
    <div class="footer-main">
      Wiktoria's Secret
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{
        link.name
      }}</NuxtLink>
    </div>
    <!-- Web dev & web design webring -->
    <nav class="wd-web-webring" aria-label="Web dev and web design webring">
      <a
        href="https://webring.webdev-webdesign.com/prev/?from=https%3A%2F%2Fwiktoriassecret.com%2F"
        >&larr; Prev</a
      >
      <a href="https://webring.webdev-webdesign.com/"
        >Web dev &amp; design webring</a
      >
      <a
        href="https://webring.webdev-webdesign.com/random/?from=https%3A%2F%2Fwiktoriassecret.com%2F"
        >Random</a
      >
      <a
        href="https://webring.webdev-webdesign.com/next/?from=https%3A%2F%2Fwiktoriassecret.com%2F"
        >Next &rarr;</a
      >
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

.wd-web-webring {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: center;
}
</style>
