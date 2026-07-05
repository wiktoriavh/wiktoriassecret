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

    <table class="map-grid" role="grid" aria-label="Tower level map">
      <tbody>
        <tr v-for="(row, rowIndex) in map.cells" :key="`row-${rowIndex}`">
          <td
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
          </td>
        </tr>
      </tbody>
    </table>

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
  --tod-ink: #000;
  --map-cell-size: 1in;
  font-family: 'Cabin Sketch', 'Segoe UI', sans-serif;
  color: var(--tod-ink);
  background: #fff;
  border: none;
  outline: none;
  padding: 0.75rem;
  width: fit-content;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map-title {
  font-size: 1.25rem;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
  text-align: center;
}

.map-grid {
  border-collapse: collapse;
  border: 2pt solid var(--tod-ink);
  table-layout: fixed;
}

.map-cell {
  width: var(--map-cell-size);
  height: var(--map-cell-size);
  min-width: var(--map-cell-size);
  min-height: var(--map-cell-size);
  border: 1pt solid var(--tod-ink);
  text-align: center;
  vertical-align: middle;
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0;
  box-sizing: border-box;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
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

@media screen and (max-width: 768px) {
  .tod-map-sheet {
    width: 100%;
    padding: 0.5rem;
    align-items: stretch;
  }

  .map-title {
    font-size: 1rem;
  }

  .map-grid {
    width: 100%;
  }

  .map-cell {
    width: auto;
    height: auto;
    min-width: 0;
    min-height: 0;
    aspect-ratio: 1;
    font-size: clamp(0.55rem, 2.8vw, 0.875rem);
    padding: 0.1rem;
  }

  .map-legend {
    font-size: 0.6rem;
  }
}
</style>
