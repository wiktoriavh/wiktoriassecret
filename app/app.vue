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

body {
  display: flex;
  flex-direction: column;
  background-image: url('/images/paper-texture.jpg');
  width: 70ch;
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