<script setup lang="ts">
import { ref } from 'vue'
import { usePrintExport } from '~/composables/usePrintExport'

const props = defineProps<{
  filename: string
}>()

const emit = defineEmits<{
  generate: []
}>()

const printableRef = ref<HTMLElement | null>(null)
const { printSheet, saveRefAsImage } = usePrintExport()

async function onSavePng() {
  await saveRefAsImage(printableRef, props.filename)
}

defineExpose({ printableRef })
</script>

<template>
  <div class="tod-generator">
    <div class="tod-controls">
      <slot name="controls" />
      <button type="button" class="tod-btn" @click="emit('generate')">
        Re-roll
      </button>
      <button type="button" class="tod-btn" @click="printSheet">
        Print
      </button>
      <button type="button" class="tod-btn" @click="onSavePng">
        Save as PNG
      </button>
    </div>

    <div ref="printableRef" class="tod-printable">
      <slot />
    </div>

    <p class="tod-disclaimer">
      For pen-and-paper play — print or save, then play at the table.
    </p>
  </div>
</template>

<style scoped>
.tod-generator {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.tod-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.tod-btn {
  background: #280905;
  color: #f8f4e8;
  border: 1px solid #280905;
  border-radius: 0.25rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.tod-btn:hover {
  background: #4a1510;
}

.tod-printable {
  background: white;
  color: black;
  padding: 0.5rem;
  border-radius: 0.25rem;
  max-width: 8.5in;
}

.tod-disclaimer {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}
</style>
