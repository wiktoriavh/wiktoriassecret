<script setup lang="ts">
import type { TowerLevelMap } from '~/utils/towerOfDeviltry'
import { TERRAIN_LEGEND } from '~/utils/towerOfDeviltry'

defineProps<{
  map: TowerLevelMap
}>()
</script>

<template>
  <div class="tod-map-sheet">
    <h2 class="map-title">
      Tower Level: {{ map.level }}
    </h2>

    <div class="map-grid" role="grid" aria-label="Tower level map">
      <div
        v-for="(row, rowIndex) in map.cells"
        :key="`row-${rowIndex}`"
        class="map-row"
      >
        <div
          v-for="(cell, colIndex) in row"
          :key="`cell-${rowIndex}-${colIndex}`"
          class="map-cell"
          :class="{
            'cell-accursed': rowIndex === 5 && colIndex === 5,
            'cell-guardian': rowIndex === 0 && colIndex === 0
          }"
          role="gridcell"
        >
          {{ cell }}
        </div>
      </div>
    </div>

    <div class="map-legend">
      <p><strong>Accursed</strong> enters bottom-right. <strong>Guardian</strong> starts top-left.</p>
      <p>
        <span v-for="(label, code) in TERRAIN_LEGEND" :key="code">
          <template v-if="code">
            <strong>{{ code }}</strong> {{ label }} ·
          </template>
        </span>
        blank = Regular floor
      </p>
    </div>
  </div>
</template>

<style scoped>
.tod-map-sheet {
  --tod-ink: #111;
  font-family: 'Cabin Sketch', 'Segoe UI', sans-serif;
  color: var(--tod-ink);
  background: #fff;
  border: 3px solid var(--tod-ink);
  outline: 2px dashed var(--tod-ink);
  outline-offset: 4px;
  padding: 1rem;
  max-width: 24rem;
}

.map-title {
  font-size: 1.25rem;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
  text-align: center;
}

.map-grid {
  display: flex;
  flex-direction: column;
  border: 2px solid var(--tod-ink);
}

.map-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.map-cell {
  aspect-ratio: 1;
  border: 1px solid var(--tod-ink);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  min-height: 2.25rem;
}

.cell-accursed,
.cell-guardian {
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 3px,
    #eee 3px,
    #eee 6px
  );
}

.map-legend {
  margin-top: 0.75rem;
  font-size: 0.65rem;
  line-height: 1.4;
}

.map-legend p {
  margin: 0 0 0.35rem;
}
</style>
