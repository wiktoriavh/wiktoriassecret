<template>
  <Header />

  <div class="layout-wrapper">
    <slot />
  </div>

  <Footer />
</template>

<style scoped>
.layout-wrapper {
  flex: 1;
}
</style>
