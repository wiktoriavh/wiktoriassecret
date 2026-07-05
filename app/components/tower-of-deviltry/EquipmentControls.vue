<script setup lang="ts">
import type { EquipmentMode, EquipmentTable } from '~/utils/towerOfDeviltry'
import { defaultEquipmentOptions } from '~/utils/towerOfDeviltry'

const mode = defineModel<EquipmentMode>('mode', { default: 'random' })
const rolls = defineModel<[EquipmentTable, EquipmentTable, EquipmentTable]>('rolls', {
  default: () => defaultEquipmentOptions().rolls
})

const tableLabels: Record<EquipmentTable, string> = {
  armor: 'Armor (d4)',
  weapon: 'Weapon (d12)',
  other: 'Other (d4)'
}
</script>

<template>
  <div class="equipment-controls">
    <fieldset class="mode-fieldset">
      <legend>Equipment</legend>
      <label class="radio-label">
        <input v-model="mode" type="radio" value="random">
        Random tables
      </label>
      <label class="radio-label">
        <input v-model="mode" type="radio" value="manual">
        Choose tables
      </label>
    </fieldset>

    <div v-if="mode === 'manual'" class="roll-selects">
      <label v-for="n in 3" :key="n" class="select-label">
        Roll {{ n }}
        <select v-model="rolls[n - 1]" class="tod-select">
          <option v-for="(label, key) in tableLabels" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
.equipment-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-end;
}

.mode-fieldset {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.35rem 0.75rem 0.5rem;
  margin: 0;
  font-size: 0.85rem;
}

.mode-fieldset legend {
  font-size: 0.75rem;
  padding: 0 0.25rem;
}

.radio-label {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 0.75rem;
  cursor: pointer;
}

.roll-selects {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.select-label {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.75rem;
}

.tod-select {
  font-size: 0.85rem;
  padding: 0.2rem 0.35rem;
  border: 1px solid #8a867d;
  border-radius: 0.2rem;
  background: #f8f4e8;
  color: #280905;
}
</style>
