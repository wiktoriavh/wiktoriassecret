<template>
  <Header />

  <div>
    <main class="container">
      <!-- page content -->
      <slot />
    </main>
  </div>

  <Footer />
</template>

<style scoped>
main {
  flex: 1;
}

.container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
}
</style>
