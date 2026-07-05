<script setup lang="ts">
import { ref } from 'vue';
import { usePrintExport } from '~/composables/usePrintExport';

const props = withDefaults(defineProps<{
  filename: string
  layout?: 'a4' | 'fit'
}>(), {
  layout: 'a4'
})

const emit = defineEmits<{
  generate: []
}>()

const printableRef = ref<HTMLElement | null>(null)
const { printSheet, saveRefAsImage } = usePrintExport()

async function onSavePng() {
  await saveRefAsImage(printableRef, props.filename)
}

function onPrint() {
  printSheet(printableRef, props.layout)
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
      <button type="button" class="tod-btn" @click="onPrint">
        Print
      </button>
      <button type="button" class="tod-btn" @click="onSavePng">
        Save as PNG
      </button>
    </div>

    <div ref="printableRef" class="tod-printable"
      :class="layout === 'fit' ? 'tod-printable--fit' : 'tod-printable--a4'">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tod-generator {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
  width: 100%;
  max-width: 100%;
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
  border-radius: 0.25rem;
  padding: 0;
}

.tod-disclaimer {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}
</style>
