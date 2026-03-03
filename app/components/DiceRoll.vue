<template>
  <span class="dice-roll">
    <span class="notation">{{ notation }}</span>
    <span class="equals">=</span>
    <span v-for="(roll, index) in processedRolls" :key="index" :class="{
      'roll-value': true,
      'roll-kept': roll.kept,
      'roll-dropped': !roll.kept
    }">
      {{ roll.value }}<span v-if="index < processedRolls.length - 1">, </span>
    </span>
    <span v-if="parsedNotation.modifier !== 0" class="modifier">
      {{ parsedNotation.modifier > 0 ? '+' : '' }}{{ parsedNotation.modifier }}
    </span>
    <span v-if="showTotal" class="total">
      ({{ total }})
    </span>
    <span v-if="target !== undefined" :class="['result', resultClass]">
      {{ resultText }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  notation: string          // e.g., "2d6kh", "3d8kl", "1d20+5", "4d6kh3"
  rolls: number[]           // Array of rolled values
  target?: number           // Optional target number for success/failure
  compareType?: 'higher' | 'under'  // Whether to roll higher or under the target (default: 'higher')
  showTotal?: boolean       // Whether to show the total in parentheses (default: true if modifier exists)
}

const props = defineProps<Props>()

interface ParsedNotation {
  count: number
  sides: number
  keepType: 'high' | 'low' | null
  keepCount: number | null
  modifier: number
}

interface ProcessedRoll {
  value: number
  kept: boolean
  index: number
}

// Parse dice notation
const parsedNotation = computed<ParsedNotation>(() => {
  const notation = props.notation.toLowerCase().trim()

  // Match pattern: XdY[kh/kl][N][+/-M]
  const match = notation.match(/^(\d+)d(\d+)(?:(kh|kl)(\d+)?)?([+-]\d+)?$/)

  if (!match) {
    return {
      count: 1,
      sides: 20,
      keepType: null,
      keepCount: null,
      modifier: 0
    }
  }

  const [, count, sides, keepType, keepCount, modifier] = match

  return {
    count: parseInt(count!),
    sides: parseInt(sides!),
    keepType: keepType ? (keepType === 'kh' ? 'high' : 'low') : null,
    keepCount: keepCount ? parseInt(keepCount) : (keepType ? 1 : null),
    modifier: modifier ? parseInt(modifier) : 0
  }
})

// Process rolls to determine which should be kept/dropped
const processedRolls = computed<ProcessedRoll[]>(() => {
  const { keepType, keepCount } = parsedNotation.value

  if (!keepType || keepCount === null) {
    // No keep rule, all dice are kept
    return props.rolls.map((value, index) => ({
      value,
      kept: true,
      index
    }))
  }

  // Create indexed array for sorting
  const indexedRolls = props.rolls.map((value, index) => ({
    value,
    kept: false,
    index
  }))

  // Sort by value
  const sorted = [...indexedRolls].sort((a, b) => {
    if (keepType === 'high') {
      return b.value - a.value // Descending for keep high
    } else {
      return a.value - b.value // Ascending for keep low
    }
  })

  // Mark the top N as kept
  for (let i = 0; i < Math.min(keepCount, sorted.length); i++) {
    const rollToKeep = indexedRolls.find(r => r.index === sorted[i]!.index)
    if (rollToKeep) {
      rollToKeep.kept = true
    }
  }

  return indexedRolls
})

// Calculate total
const total = computed<number>(() => {
  const keptSum = processedRolls.value
    .filter(r => r.kept)
    .reduce((sum, r) => sum + r.value, 0)

  return keptSum + parsedNotation.value.modifier
})

// Show total in parentheses if modifier exists or if explicitly requested
const showTotal = computed<boolean>(() => {
  if (props.showTotal !== undefined) return props.showTotal
  return parsedNotation.value.modifier !== 0
})

// Success/failure comparison
const isSuccess = computed<boolean>(() => {
  if (props.target === undefined) return false
  const compareType = props.compareType || 'higher'

  if (compareType === 'under') {
    return total.value <= props.target
  } else {
    return total.value >= props.target
  }
})

const resultText = computed<string>(() => {
  if (props.target === undefined) return ''
  const result = isSuccess.value ? 'Success' : 'Failure'
  return `vs ${props.target}: ${result}`
})

const resultClass = computed<string>(() => {
  if (props.target === undefined) return ''
  return isSuccess.value ? 'success' : 'failure'
})
</script>

<style scoped>
.dice-roll {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1rem;
}

.equals {
  margin: 0 0.125rem;
}

.roll-value {
  display: inline;
}

.roll-kept {
  font-weight: 600;
}

.roll-dropped {
  text-decoration: line-through;
}

.modifier {
  font-weight: 600;
  margin-left: 0.125rem;
}

.total {
  margin-left: 0.25rem;
  font-weight: 600;
}

.result {
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.result.success {
  font-weight: 600;
}
</style>
