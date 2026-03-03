<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: sans-serif;
  min-height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #280905;
  color: #fcf8f0;
  padding: 2rem;
}

a,
a:visited {
  color: #F68048;
}

a:hover {
  color: hsl(19, 91%, 50%);
  text-underline-offset: 0.2em;
}

h2,
h3,
h4,
h5,
h6 {
  font-size: 1.5rem;
}

h1 {
  text-align: center;
  transform: rotate(1deg);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card {
  background-color: #f8f4e8;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  color: #280905;
}
</style>