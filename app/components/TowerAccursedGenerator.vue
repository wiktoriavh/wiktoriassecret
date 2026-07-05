<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Character, EquipmentOptions } from '~/utils/towerOfDeviltry'
import {
  defaultEquipmentOptions,
  generateAccursed,
  randomName
} from '~/utils/towerOfDeviltry'

const character = ref<Character | null>(null)
const equipmentMode = ref<EquipmentOptions['mode']>('random')
const equipmentRolls = ref<EquipmentOptions['rolls']>(defaultEquipmentOptions().rolls)

function getEquipmentOptions(): EquipmentOptions {
  return {
    mode: equipmentMode.value,
    rolls: [...equipmentRolls.value]
  }
}

function generate() {
  character.value = generateAccursed(getEquipmentOptions())
}

function assignRandomName() {
  if (character.value) {
    character.value = { ...character.value, name: randomName() }
  }
}

onMounted(() => {
  generate()
})
</script>

<template>
  <div class="tod-generator">
    <TowerOfDeviltryPrintExportControls
      v-if="character"
      filename="tower-accursed.png"
      @generate="generate"
    >
      <template #controls>
        <TowerOfDeviltryEquipmentControls
          v-model:mode="equipmentMode"
          v-model:rolls="equipmentRolls"
        />
        <button type="button" class="tod-btn-extra" @click="assignRandomName">
          Random name
        </button>
      </template>

      <TowerOfDeviltryCharacterSheet :character="character" variant="accursed" />
    </TowerOfDeviltryPrintExportControls>
  </div>
</template>

<style scoped>
.tod-generator {
  width: 100%;
  max-width: 100%;
}

.tod-btn-extra {
  background: #f8f4e8;
  color: #280905;
  border: 1px solid #8a867d;
  border-radius: 0.25rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.tod-btn-extra:hover {
  border-color: #280905;
}
</style>
