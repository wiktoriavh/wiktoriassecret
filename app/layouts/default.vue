<template>
  <Header />

  <main>
    <!-- page content -->
    <slot />
  </main>

  <Footer />
</template>

<style scoped>
main {
  flex: 1;
}
</style>

