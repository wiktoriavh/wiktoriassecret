<script setup lang="ts">
import type { Character } from '~/utils/towerOfDeviltry'
import {
  SKILL_DEFINITIONS,
  skillModifier
} from '~/utils/towerOfDeviltry'

defineProps<{
  character: Character
  variant?: 'accursed' | 'guardian'
}>()

function weapons(character: Character) {
  return character.equipment.filter(item => item.kind === 'weapon')
}

function nonWeaponInventory(character: Character) {
  return character.equipment
    .filter(item => item.kind !== 'weapon')
    .map((item) => {
      if (item.kind === 'armor') return `${item.name} (RES ${item.res})`
      return `${item.name}: ${item.effect}`
    })
}
</script>

<template>
  <div class="tod-sheet">
    <header class="sheet-header">
      <h2 class="sheet-title">
        Tower of Deviltry
      </h2>
      <div class="crux-box">
        <span class="crux-label">Crux Die</span>
        <span class="crux-value">d{{ character.cruxDie }}</span>
      </div>
    </header>

    <div class="name-row">
      <span class="label">Name:</span>
      <span class="value-line name-value">{{ character.name || '' }}</span>
    </div>

    <div class="attrs-row">
      <div v-for="attr in ['bul', 'vit', 'pre', 'apt'] as const" :key="attr" class="attr-cell">
        <span class="attr-label">{{ attr.toUpperCase() }}</span>
        <span class="value-line">{{ character.attributes[attr] }}</span>
      </div>
    </div>

    <div class="hp-spd-row">
      <div class="hp-cell">
        <span class="label">HP</span>
        <div class="hp-values">
          <span class="hp-sub">current</span>
          <span class="value-line hp-current" />
          <span class="hp-sep">/</span>
          <span class="hp-sub">max</span>
          <span class="value-line hp-max">{{ character.hpMax }}</span>
        </div>
      </div>
      <div class="spd-cell">
        <span class="label">SPD</span>
        <span class="value-line">{{ character.spd }}</span>
      </div>
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
              <td>{{ character.skills[skill.key] }}</td>
              <td>+</td>
              <td>{{ character.attributes[skill.attr.toLowerCase() as keyof typeof character.attributes] }}</td>
              <td>=</td>
              <td>{{ skillModifier(character.skills, character.attributes, skill.key) }}</td>
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
                <th>Hit</th>
                <th>Dam/Type</th>
                <th>Rng</th>
                <th>Hft</th>
                <th>Hnd</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(weapon, i) in weapons(character)" :key="i">
                <td class="value-line" />
                <td>{{ weapon.name }} {{ weapon.damage }}/{{ weapon.types }}</td>
                <td>{{ weapon.range }}</td>
                <td>{{ weapon.heft }}</td>
                <td>{{ weapon.hands }}</td>
              </tr>
              <tr v-if="weapons(character).length === 0">
                <td colspan="5" class="empty-row">
                  —
                </td>
              </tr>
              <tr v-if="weapons(character).length === 1">
                <td colspan="5" class="empty-row value-line" />
              </tr>
            </tbody>
          </table>
        </section>

        <section class="defense-section">
          <div class="defense-row">
            <span>Dodge (Athletics)</span>
            <span class="value-line">{{ character.dodge }}</span>
          </div>
          <div class="defense-row">
            <span>Block (Fighting)</span>
            <span class="value-line">{{ character.block }}</span>
          </div>
          <div class="defense-row">
            <span>Crit Protection</span>
            <span class="value-line">{{ character.critProtection || '—' }}</span>
          </div>
          <div class="defense-row">
            <span>RES</span>
            <span class="value-line">{{ character.res }}</span>
          </div>
          <div class="defense-types">
            <span>By type:</span>
            <span>Cut <span class="value-line inline">{{ character.resByType.cut }}</span></span>
            <span>Pierce <span class="value-line inline">{{ character.resByType.pierce }}</span></span>
            <span>Smash <span class="value-line inline">{{ character.resByType.smash }}</span></span>
          </div>
        </section>
      </section>

      <section class="traits-section">
        <div class="section-label">
          Skill Traits
        </div>
        <ul class="traits-list">
          <li v-for="trait in character.skillTraits" :key="trait.id">
            <strong>{{ trait.name }}</strong> — {{ trait.description }}
          </li>
          <li v-for="n in Math.max(0, 10 - character.skillTraits.length)" :key="`blank-${n}`" class="trait-blank">
            <span class="value-line trait-line" />
          </li>
        </ul>
      </section>
    </div>

    <section class="inventory-section">
      <div class="section-label center">
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

    <footer class="sheet-footer">
      <div class="footer-box curse-box">
        <div class="box-content">
          <template v-if="variant === 'guardian' && character.curseBoons.length">
            <p v-for="(boon, i) in character.curseBoons" :key="i" class="boon-line">
              <strong>{{ boon.name }}</strong>: {{ boon.description }}
            </p>
          </template>
          <template v-else-if="variant === 'accursed'">
            <span class="value-line curse-line" />
          </template>
        </div>
        <span class="box-label">Curse</span>
      </div>

      <div v-if="character.enchantedItems.length" class="enchanted-note">
        <p v-for="(item, i) in character.enchantedItems" :key="i">
          Enchanted {{ item.item }}: {{ item.bonus }}
        </p>
      </div>

      <div class="footer-box exp-box">
        <span class="exp-value">{{ character.exp }}</span>
        <span class="box-label">EXP</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.tod-sheet {
  --tod-ink: #111;
  --tod-paper: #fff;
  font-family: 'Cabin Sketch', 'Segoe UI', sans-serif;
  color: var(--tod-ink);
  background: var(--tod-paper);
  border: 3px solid var(--tod-ink);
  outline: 2px dashed var(--tod-ink);
  outline-offset: 4px;
  padding: 1rem 1.25rem;
  font-size: 0.72rem;
  line-height: 1.3;
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.sheet-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
}

.crux-box {
  border: 2px dashed var(--tod-ink);
  padding: 0.35rem 0.5rem;
  text-align: center;
  min-width: 4rem;
}

.crux-label {
  display: block;
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.crux-value {
  font-size: 1.1rem;
  font-weight: 700;
}

.name-row,
.attrs-row,
.hp-spd-row {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 0.6rem;
}

.label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.65rem;
}

.value-line {
  display: inline-block;
  min-width: 1.5rem;
  border-bottom: 1px dashed var(--tod-ink);
  min-height: 1em;
  padding: 0 0.25rem;
}

.value-line.inline {
  min-width: 1rem;
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
  font-size: 0.75rem;
  margin-bottom: 0.15rem;
}

.hp-spd-row {
  gap: 2rem;
}

.hp-values {
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
}

.hp-sub {
  font-size: 0.5rem;
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
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.section-label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.65rem;
  margin-bottom: 0.35rem;
  border-bottom: 1px dashed var(--tod-ink);
  padding-bottom: 0.15rem;
}

.section-label.center {
  text-align: center;
}

.skills-table,
.attacks-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.62rem;
}

.skills-table th,
.attacks-table th {
  text-align: left;
  font-size: 0.55rem;
  text-transform: uppercase;
  border-bottom: 1px dashed var(--tod-ink);
  padding: 0.1rem 0.2rem;
}

.skills-table td,
.attacks-table td {
  padding: 0.15rem 0.2rem;
  border-bottom: 1px dotted #ccc;
}

.attacks-section,
.defense-section {
  margin-top: 0.6rem;
}

.defense-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.6rem;
  margin-bottom: 0.2rem;
}

.defense-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.58rem;
  margin-top: 0.25rem;
}

.traits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.traits-list li {
  margin-bottom: 0.35rem;
  font-size: 0.58rem;
}

.trait-line,
.inv-line,
.curse-line {
  display: block;
  width: 100%;
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
  margin-bottom: 0.3rem;
  font-size: 0.58rem;
  min-height: 1em;
}

.sheet-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
}

.footer-box {
  border: 2px dashed var(--tod-ink);
  min-width: 5rem;
  min-height: 3.5rem;
  position: relative;
  padding: 0.5rem 0.5rem 1.25rem;
}

.box-label {
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
}

.exp-value {
  display: block;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  padding-top: 0.5rem;
}

.curse-box {
  flex: 1;
  max-width: 60%;
}

.boon-line {
  font-size: 0.55rem;
  margin: 0 0 0.25rem;
}

.enchanted-note {
  font-size: 0.55rem;
  flex: 1;
}

.enchanted-note p {
  margin: 0 0 0.2rem;
}

.empty-row {
  color: #999;
}
</style>
