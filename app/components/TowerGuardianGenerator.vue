<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Character, EquipmentOptions } from '~/utils/towerOfDeviltry'
import {
  defaultEquipmentOptions,
  generateGuardian,
  randomName
} from '~/utils/towerOfDeviltry'

const towerLevel = ref(1)
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
  character.value = generateGuardian(towerLevel.value, getEquipmentOptions())
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
      :filename="`tower-guardian-l${towerLevel}.png`"
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
        <TowerOfDeviltryEquipmentControls
          v-model:mode="equipmentMode"
          v-model:rolls="equipmentRolls"
        />
        <button type="button" class="tod-btn-extra" @click="assignRandomName">
          Random name
        </button>
      </template>

      <TowerOfDeviltryCharacterSheet :character="character" variant="guardian" />
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
