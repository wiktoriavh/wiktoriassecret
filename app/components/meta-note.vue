<script lang="ts" setup>
defineProps<{
  note: {
    description: string;
    ttrpg: string;
    ttrpgLink: string;
  };
}>();
</script>

<template>
  <div class="meta-note">
    <p>{{ note.description }}</p>
    <p>Played in <a :href="note.ttrpgLink">{{ note.ttrpg }}</a></p>
  </div>
</template>

<style scoped>
.meta-note>p {
  font-size: 1rem;
}
</style>