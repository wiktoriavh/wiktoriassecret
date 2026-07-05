<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TowerLevelMap } from '~/utils/towerOfDeviltry'
import { generateTowerMap } from '~/utils/towerOfDeviltry'

const towerLevel = ref(1)
const map = ref<TowerLevelMap | null>(null)

function generate() {
  map.value = generateTowerMap(towerLevel.value)
}

onMounted(() => {
  generate()
})
</script>

<template>
  <div class="tod-generator">
    <TowerOfDeviltryPrintExportControls
      v-if="map"
      layout="fit"
      :filename="`tower-level-l${towerLevel}.png`"
      @generate="generate"
    >
      <template #controls>
        <label class="level-label">
          Tower level
          <input
            v-model.number="towerLevel"
            type="number"
            min="1"
            max="51"
            class="level-input"
          >
        </label>
      </template>

      <TowerOfDeviltryTowerMap :map="map" />
    </TowerOfDeviltryPrintExportControls>
  </div>
</template>

<style scoped>
.tod-generator {
  width: 100%;
  max-width: 100%;
}

.level-label {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.75rem;
}

.level-input {
  width: 4rem;
  font-size: 0.9rem;
  padding: 0.3rem 0.4rem;
  border: 1px solid #8a867d;
  border-radius: 0.2rem;
  background: #f8f4e8;
  color: #280905;
}
</style>
