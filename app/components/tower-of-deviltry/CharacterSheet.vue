<script setup lang="ts">
import { computed } from 'vue'
import type { Character } from '~/utils/towerOfDeviltry'
import {
  CURSE_BOON_DEFINITIONS,
  CURSE_BOON_GRID_SIZE,
  CRUX_DIE_STEPS,
  curseBoonName,
  equipmentDisplayLabel,
  getCurseBoon,
  hasSkillTrait,
  isStackableCurseBoon,
  resolveCharacterSheetStats,
  SKILL_DEFINITIONS,
  SKILL_TRAIT_DEFINITIONS,
  skillModifier,
  unarmedAttack
} from '~/utils/towerOfDeviltry'

const props = defineProps<{
  character: Character
  variant?: 'accursed' | 'guardian'
}>()

const stats = computed(() => resolveCharacterSheetStats(props.character))

function weapons(character: Character) {
  return character.equipment.filter(item => item.kind === 'weapon')
}

const ATTACK_ROW_COUNT = 4

const TEST_DEFINITIONS = [
  { key: 'initiative' as const, label: 'Initiative', formula: 'PRE + Alertness' },
  { key: 'attack' as const, label: 'Attack', formula: 'VIT + Fighting' },
  { key: 'dodge' as const, label: 'Dodge', formula: 'VIT + Athletics' },
  { key: 'block' as const, label: 'Block', formula: 'VIT + Fighting' }
]

function attackRows(character: Character) {
  const rolled = weapons(character).filter(weapon => weapon.name !== 'Unarmed')
  const attacks = [unarmedAttack(), ...rolled]
  return Array.from({ length: ATTACK_ROW_COUNT }, (_, i) => attacks[i] ?? null)
}

function nonWeaponInventory(character: Character) {
  return character.equipment
    .filter(item => item.kind !== 'weapon')
    .map(item => equipmentDisplayLabel(item))
}

function weaponName(weapon: { name: string, enchantedBonus?: string }) {
  return weapon.enchantedBonus ? `Enchanted ${weapon.name}` : weapon.name
}

function curseBoonTitle(character: Character, boon: { id: number, name: string }) {
  const entry = getCurseBoon(character, boon.id)
  return entry ? curseBoonName(entry) : boon.name
}
</script>

<template>
  <div class="tod-sheet">
    <header class="sheet-header">
      <h2 class="sheet-title">
        Tower of Deviltry
      </h2>
      <div class="header-boxes">
        <div class="stat-box crux-box">
          <span class="stat-label">Crux Die</span>
          <div class="crux-die-options">
            <div v-for="die in CRUX_DIE_STEPS" :key="die" class="crux-die-option">
              <span class="mark-circle" :class="{ filled: character.cruxDie === die }" />
              <span class="crux-die-label">d{{ die }}</span>
            </div>
          </div>
        </div>
        <div class="stat-box exp-box">
          <span class="stat-label">EXP</span>
          <span
            class="stat-value"
            :class="{ 'stat-value--write-in': variant !== 'guardian' }"
          >{{ variant === 'guardian' ? character.exp : 0 }}</span>
        </div>
      </div>
    </header>

    <div class="name-row">
      <span class="label">Name:</span>
      <span class="value-line name-value">{{ character.name || '' }}</span>
    </div>

    <div class="attrs-row">
      <div v-for="attr in ['bul', 'vit', 'pre', 'apt'] as const" :key="attr" class="attr-cell">
        <span class="attr-label">{{ attr.toUpperCase() }}</span>
        <span class="value-line">{{ stats.attributes[attr] }}</span>
      </div>
    </div>

    <div class="top-band">
      <div class="vitals-row">
        <div class="hp-cell">
          <span class="label">HP</span>
          <div class="hp-values">
            <span class="hp-sub">current</span>
            <span class="value-line hp-current" />
            <span class="hp-sep">/</span>
            <span class="hp-sub">max</span>
            <span class="value-line hp-max">{{ stats.hpMax }}</span>
          </div>
        </div>
        <div class="vitals-cell">
          <span class="label">SPD</span>
          <span class="value-line">{{ stats.spd }}</span>
        </div>
      </div>

      <table class="tests-table">
        <thead>
          <tr>
            <th colspan="4">
              Tests
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="test in TEST_DEFINITIONS" :key="test.key" class="test-cell">
              <span class="test-name">{{ test.label }}</span>
              <span class="test-formula">{{ test.formula }}</span>
              <span class="test-mod">{{ stats[test.key] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="main-grid">
      <section class="skills-section">
        <table class="skills-table">
          <thead>
            <tr>
              <th>Skills</th>
              <th>Score</th>
              <th>+</th>
              <th>Attr</th>
              <th>=</th>
              <th>Mod</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="skill in SKILL_DEFINITIONS" :key="skill.key">
              <td>{{ skill.label }}</td>
              <td>{{ stats.skills[skill.key] }}</td>
              <td>+</td>
              <td>{{ stats.attributes[skill.attr.toLowerCase() as keyof typeof stats.attributes] }}</td>
              <td>=</td>
              <td>{{ skillModifier(stats.skills, stats.attributes, skill.key) }}</td>
            </tr>
          </tbody>
        </table>

        <section class="attacks-section">
          <div class="section-label">
            Attacks
          </div>
          <table class="attacks-table">
            <thead>
              <tr>
                <th>Dam/Type</th>
                <th>Rng</th>
                <th>Hft</th>
                <th>Hnd</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(weapon, i) in attackRows(character)" :key="i" class="attack-row">
                <template v-if="weapon">
                  <td>{{ weaponName(weapon) }} {{ weapon.damage }}/{{ weapon.types }}{{ weapon.enchantedBonus ? ` (${weapon.enchantedBonus})` : '' }}</td>
                  <td>{{ weapon.range }}</td>
                  <td>{{ weapon.heft }}</td>
                  <td>{{ weapon.hands }}</td>
                </template>
                <template v-else>
                  <td colspan="4">
                    <span class="value-line attack-write--full" />
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="inventory-section">
          <div class="section-label">
            Inventory
          </div>
          <div class="inventory-cols">
            <ul>
              <li v-for="(item, i) in nonWeaponInventory(character).slice(0, 6)" :key="`a-${i}`">
                {{ item || ' ' }}
              </li>
              <li v-for="n in Math.max(0, 6 - nonWeaponInventory(character).slice(0, 6).length)" :key="`ab-${n}`">
                <span class="value-line inv-line" />
              </li>
            </ul>
            <ul>
              <li v-for="(item, i) in nonWeaponInventory(character).slice(6, 12)" :key="`b-${i}`">
                {{ item || ' ' }}
              </li>
              <li v-for="n in Math.max(0, 6 - nonWeaponInventory(character).slice(6, 12).length)" :key="`bb-${n}`">
                <span class="value-line inv-line" />
              </li>
            </ul>
          </div>
        </section>

        <section class="defense-section">
          <div class="defense-row">
            <span>Crit Protection</span>
            <span class="value-line">{{ stats.critProtection || '—' }}</span>
          </div>
          <div class="defense-row">
            <span>RES</span>
            <span class="value-line">{{ stats.res }}</span>
          </div>
          <div class="defense-types">
            <span>RES by damage type:</span>
            <span>Cut <span class="value-line inline">{{ stats.resByType.cut }}</span></span>
            <span>Pierce <span class="value-line inline">{{ stats.resByType.pierce }}</span></span>
            <span>Smash <span class="value-line inline">{{ stats.resByType.smash }}</span></span>
          </div>
        </section>
      </section>

      <section class="traits-section">
        <div class="section-label">
          Skill Traits
        </div>
        <ul class="traits-list skill-traits-list">
          <li v-for="trait in SKILL_TRAIT_DEFINITIONS" :key="trait.id" class="trait-row">
            <span class="mark-circle" :class="{ filled: hasSkillTrait(character, trait.id) }" />
            <span class="trait-text">
              <strong>{{ trait.name }}</strong> — {{ trait.description }}
            </span>
          </li>
        </ul>

        <div class="section-label curse-label">
          Curse
        </div>
        <ul class="traits-list curse-list">
          <li
            v-for="boon in CURSE_BOON_DEFINITIONS"
            :key="boon.id"
            class="curse-row"
            :class="{ 'curse-row--reference': boon.id === 8 }"
          >
            <div v-if="isStackableCurseBoon(boon.id)" class="mark-grid">
              <span
                v-for="n in CURSE_BOON_GRID_SIZE"
                :key="n"
                class="mark-circle"
                :class="{ filled: n <= (getCurseBoon(character, boon.id)?.count ?? 0) }"
              />
            </div>
            <span
              v-else-if="boon.id !== 8"
              class="mark-circle"
              :class="{ filled: (getCurseBoon(character, boon.id)?.count ?? 0) > 0 }"
            />
            <span v-else class="mark-spacer" />
            <span class="curse-text">
              <strong>{{ curseBoonTitle(character, boon) }}</strong>
              — {{ boon.description }}
            </span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.tod-sheet {
  --tod-ink: #111;
  --tod-paper: #fff;
  font-family: 'Cabin Sketch', 'Segoe UI', sans-serif;
  color: var(--tod-ink);
  background: var(--tod-paper);
  border: none;
  outline: none;
  padding: 0.75rem 0.9rem;
  font-size: 0.82rem;
  line-height: 1.55;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
  gap: 0.5rem;
}

.header-boxes {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.stat-box {
  border: 2px dashed var(--tod-ink);
  padding: 0.35rem 0.5rem;
  text-align: center;
  min-width: 4rem;
}

.stat-label {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
}

.stat-value--write-in {
  color: #bbb;
}

.crux-die-options {
  display: flex;
  gap: 0.45rem;
  justify-content: center;
  margin-top: 0.25rem;
}

.crux-die-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}

.crux-die-label {
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1;
}

.crux-box .mark-circle {
  margin-top: 0;
}

.sheet-title {
  font-size: 1.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
}

.name-row,
.attrs-row {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  margin-bottom: 0.35rem;
}

.top-band {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 0.35rem;
}

.top-band .vitals-row {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  flex-shrink: 0;
  margin-bottom: 0;
}

.label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.value-line {
  display: inline-block;
  min-width: 1.75rem;
  border-bottom: 1px dashed var(--tod-ink);
  min-height: 1.5em;
  line-height: 1.5;
  padding: 0 0.25rem 0.15rem;
  box-sizing: border-box;
}

.value-line.inline {
  min-width: 1.25rem;
}

.attack-write--full {
  display: block;
  width: 100%;
  min-height: 1.75em;
}

.name-value {
  flex: 1;
  min-width: 8rem;
}

.attrs-row {
  justify-content: space-between;
}

.attr-cell {
  text-align: center;
  flex: 1;
}

.attr-label {
  display: block;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.vitals-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
}

.tests-table {
  flex: 1;
  width: 100%;
  min-width: 0;
  border-collapse: collapse;
  font-size: 0.72rem;
}

.tests-table th {
  text-align: left;
  font-size: 0.72rem;
  text-transform: uppercase;
  font-weight: 700;
  border-bottom: 1px dashed var(--tod-ink);
  padding: 0 0.25rem 0.15rem;
}

.test-cell {
  width: 25%;
  padding: 0.2rem 0.35rem;
  border-bottom: 1px dotted #ccc;
  line-height: 1.35;
  vertical-align: bottom;
}

.test-name {
  display: block;
  font-weight: 700;
  font-size: 0.72rem;
}

.test-formula {
  display: block;
  font-size: 0.62rem;
  font-weight: 400;
  color: #444;
}

.test-mod {
  display: block;
  font-weight: 700;
  font-size: 0.82rem;
  margin-top: 0.1rem;
}

.hp-values {
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
}

.hp-sub {
  font-size: 0.65rem;
  text-transform: uppercase;
}

.hp-current {
  min-width: 1.25rem;
}

.hp-max {
  min-width: 1.25rem;
  border-bottom-style: solid;
}

.hp-sep {
  font-weight: 700;
  margin: 0 0.1rem;
}

.main-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
  flex: 1;
  min-height: 0;
}

.section-label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  border-bottom: 1px dashed var(--tod-ink);
  padding-bottom: 0.2rem;
}

.section-label.center {
  text-align: center;
}

.skills-table,
.attacks-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}

.skills-table th,
.attacks-table th {
  text-align: left;
  font-size: 0.72rem;
  text-transform: uppercase;
  border-bottom: 1px dashed var(--tod-ink);
  padding: 0.2rem 0.25rem;
}

.skills-table td,
.attacks-table td {
  padding: 0.3rem 0.25rem;
  border-bottom: 1px dotted #ccc;
  line-height: 1.5;
  vertical-align: bottom;
}

.attack-row td {
  min-height: 1.75em;
}

.attacks-section,
.inventory-section,
.defense-section {
  margin-top: 0.6rem;
}

.defense-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  margin-bottom: 0.35rem;
  line-height: 1.5;
}

.defense-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  font-size: 0.75rem;
  margin-top: 0.35rem;
  line-height: 1.5;
}

.traits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.traits-list li {
  margin-bottom: 0.35rem;
  font-size: 0.75rem;
  line-height: 1.5;
}

.curse-list .curse-row {
  margin-bottom: 0.6rem;
}

.trait-row,
.curse-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.4rem;
  align-items: start;
}

.mark-circle {
  width: 0.55rem;
  height: 0.55rem;
  border: 1px solid var(--tod-ink);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 0.2em;
  box-sizing: border-box;
}

.mark-circle.filled {
  background: var(--tod-ink);
}

.mark-grid {
  display: grid;
  grid-template-columns: repeat(2, 0.55rem);
  grid-template-rows: repeat(3, 0.55rem);
  gap: 0.15rem;
  margin-top: 0.1em;
}

.mark-spacer {
  width: 0.55rem;
}

.trait-text,
.curse-text {
  min-width: 0;
}

.curse-label {
  margin-top: 0.75rem;
}

.trait-line,
.inv-line {
  display: block;
  width: 100%;
  min-height: 1.5em;
}

.inventory-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.inventory-cols ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.inventory-cols li {
  margin-bottom: 0.45rem;
  font-size: 0.75rem;
  min-height: 1.5em;
  line-height: 1.5;
}
</style>
