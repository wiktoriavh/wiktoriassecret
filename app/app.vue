<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Tagesschrift', sans-serif;
  min-height: 100%;
  font-size: 1.2rem;
}

html {
  position: relative;
}

html::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('/images/paper-texture.jpg');
  z-index: -1;
}

body {
  display: flex;
  flex-direction: column;
  max-width: 70ch;
  padding: 0 1rem;
  box-sizing: border-box;
  margin: 0 auto;
}

a, a:visited {
  color: #780606;
}

a:hover {
  color: rgb(161, 30, 30);
  text-underline-offset: 0.2em;
}
</style>