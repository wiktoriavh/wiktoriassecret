<template>
  <Header />

  <div class="container">
    <main>
      <!-- page content -->
      <slot />
    </main>

    <Aside />
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
}
</style>
