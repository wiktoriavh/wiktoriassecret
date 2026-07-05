export type AttributeKey = 'bul' | 'vit' | 'pre' | 'apt'

export type SkillKey =
  | 'alertness'
  | 'athletics'
  | 'fighting'
  | 'medicine'
  | 'strength'
  | 'willpower'

export type EquipmentTable = 'armor' | 'weapon' | 'other'

export type EquipmentMode = 'random' | 'manual'

export type EquipmentOptions = {
  mode: EquipmentMode
  rolls: [EquipmentTable, EquipmentTable, EquipmentTable]
}

export type CruxDie = 4 | 6 | 8 | 10

export const CRUX_DIE_STEPS: CruxDie[] = [4, 6, 8, 10]

export type Attributes = {
  bul: number
  vit: number
  pre: number
  apt: number
}

export type Skills = {
  alertness: number
  athletics: number
  fighting: number
  medicine: number
  strength: number
  willpower: number
}

export type SkillTrait = {
  id: number
  name: string
  description: string
}

export type ArmorItem = {
  kind: 'armor'
  name: string
  res: string
  penalties: string
  enchantedBonus?: string
}

export type WeaponItem = {
  kind: 'weapon'
  name: string
  damage: string
  types: string
  range: number | string
  heft: number | string
  hands: number | string
  enchantedBonus?: string
}

export type OtherItem = {
  kind: 'other'
  name: string
  effect: string
  enchantedBonus?: string
}

export type EquipmentItem = ArmorItem | WeaponItem | OtherItem

export type CurseBoon = {
  id: number
  name: string
  description: string
  count: number
  rolls?: number[]
}

export type Character = {
  name: string
  attributes: Attributes
  hpMax: number
  spd: number
  skills: Skills
  skillTraits: SkillTrait[]
  equipment: EquipmentItem[]
  inventory: string[]
  cruxDie: CruxDie
  exp: number
  curse: number
  curseBoons: CurseBoon[]
  curseHpBonus: number
  strengthLimit: number
  dodge: number
  block: number
  critProtection: number
  res: string
  resByType: { cut: string, pierce: string, smash: string }
}

export type TerrainCode = '' | 'C' | 'F' | 'E' | 'P' | 'R' | 'W'

export type TowerLevelMap = {
  level: number
  cells: TerrainCode[][]
}

export const SKILL_TRAIT_DEFINITIONS: SkillTrait[] = [
  { id: 1, name: 'BASH', description: 'Move enemy 1 cell on high Smash damage vs BUL.' },
  { id: 2, name: 'DUAL-WIELD', description: 'Free attack each turn with weapon in each hand.' },
  { id: 3, name: 'FERAL STRIKE', description: 'Free unarmed attack each turn.' },
  { id: 4, name: 'HIDDEN STRENGTH', description: '+1 to a single attribute.' },
  { id: 5, name: 'JADE', description: 'RES cannot reduce your damage below 1.' },
  { id: 6, name: 'LEAD', description: 'Dodge adjacent attacker by 5+: move them adjacent.' },
  { id: 7, name: 'LIMBER DEFENSE', description: 'Free brace once per turn if you moved.' },
  { id: 8, name: 'OPPORTUNIST', description: 'Advantage on opposed CRUX tests if initiative +5.' },
  { id: 9, name: 'RESILIENT', description: 'Add BUL again when calculating HP.' },
  { id: 10, name: 'RIPOSTE', description: 'Free attack when you block by 5+.' },
  { id: 11, name: 'WALLOP', description: 'Add HFT to damage if attack is aimed.' },
  { id: 12, name: 'WARDANCER', description: 'Move 1 increment before or after an attack.' }
]

export const CURSE_BOON_DEFINITIONS: CurseBoon[] = [
  { id: 1, name: 'Bonus Equipment', description: 'Bonus equipment roll.', count: 1 },
  { id: 2, name: 'Hardy', description: 'Increase HP by a CRUX die roll.', count: 1 },
  { id: 3, name: 'Mighty', description: '+2 Strength score; raises score limit (normally 5).', count: 1 },
  { id: 4, name: 'Enchanted Item', description: 'Random enchanted item grants +1 bonus (attack, damage, RES, et cetera).', count: 1 },
  { id: 5, name: 'DREAD WHISPERS', description: 'Spend 1 HP at end of turn: opposed Willpower vs adjacent enemy, move them 1 increment if you win.', count: 1 },
  { id: 6, name: 'PROFANE REMEDY', description: 'Spend 2 actions: Medicine test heals lost HP up to the result.', count: 1 },
  { id: 7, name: 'SHADOW STEP', description: 'Spend 1 action/HP: move and attack; move through one enemy for advantage.', count: 1 },
  { id: 8, name: 'Combined', description: 'Roll twice more and combine (only 2–4 stack).', count: 1 }
]

const ENCHANTED_BONUSES_BY_KIND: Record<EquipmentItem['kind'], string[]> = {
  weapon: ['attack', 'damage'],
  armor: ['RES'],
  other: []
}

function enchantedBonusesForItem(item: EquipmentItem): string[] {
  if (item.kind === 'weapon' || item.kind === 'armor') {
    return ENCHANTED_BONUSES_BY_KIND[item.kind]
  }
  if (item.name === 'Shield') return ['defense']
  if (item.name === 'Full Helm' || item.name === 'Helmet') return ['Alertness']
  return []
}

function applyEnchantedBonusToCharacter(character: Character, bonus: string): void {
  if (bonus === 'Alertness') character.skills.alertness++
  if (bonus === 'Fighting') character.skills.fighting++
}

function enchantRandomEquipmentItem(character: Character): void {
  const enchantable = character.equipment.filter(item => enchantedBonusesForItem(item).length > 0)
  if (enchantable.length === 0) return

  const item = enchantable[roll(enchantable.length) - 1]!
  const bonuses = enchantedBonusesForItem(item)
  const bonus = bonuses[roll(bonuses.length) - 1]!
  item.enchantedBonus = `+1 ${bonus}`
  applyEnchantedBonusToCharacter(character, bonus)
}

const NOBLE_NAMES = [
  'Aldric Blackmere',
  'Beatrix Thornwall',
  'Cedric Ashford',
  'Delphine Ravenscar',
  'Edmund Greymoor',
  'Fiora Nightingale',
  'Gareth Holloway',
  'Helena Drakenfeld',
  'Isembard Voss',
  'Jocelyn Whitmore',
  'Kaelen Stormhart',
  'Lysandra Fenwick',
  'Mortimer Crowe',
  'Nerissa Vale',
  'Oswin Grimshaw',
  'Petronella Sable',
  'Quentin Ashveil',
  'Rosalind Harrow',
  'Silas Wyrmwood',
  'Theron Blackwell',
  'Ulric Thornmere',
  'Vivienne Duskfall',
  'Wulfric Ironmark',
  'Xanthe Mourning',
  'Yorick Bramble',
  'Zelda Nightspire'
]

const SKILL_KEYS: SkillKey[] = [
  'alertness',
  'athletics',
  'fighting',
  'medicine',
  'strength',
  'willpower'
]

const SKILL_ATTR: Record<SkillKey, AttributeKey> = {
  alertness: 'pre',
  athletics: 'vit',
  fighting: 'vit',
  medicine: 'apt',
  strength: 'bul',
  willpower: 'pre'
}

const EXP_MILESTONES: { exp: number, type: 'advancement' | 'crux', crux?: CruxDie }[] = [
  { exp: 2, type: 'advancement' },
  { exp: 4, type: 'crux', crux: 6 },
  { exp: 5, type: 'advancement' },
  { exp: 8, type: 'advancement' },
  { exp: 11, type: 'advancement' },
  { exp: 14, type: 'advancement' },
  { exp: 18, type: 'advancement' },
  { exp: 20, type: 'crux', crux: 8 },
  { exp: 22, type: 'advancement' },
  { exp: 26, type: 'advancement' },
  { exp: 30, type: 'advancement' },
  { exp: 34, type: 'advancement' },
  { exp: 39, type: 'advancement' },
  { exp: 44, type: 'advancement' },
  { exp: 45, type: 'crux', crux: 10 },
  { exp: 50, type: 'advancement' }
]

const ARMOR_TABLE: Omit<ArmorItem, 'kind'>[] = [
  { name: 'Leather', res: '2', penalties: 'Smash +2' },
  { name: 'Mail', res: '4', penalties: 'Cut +2, Smash -2 / Athletics & SPD -1' },
  { name: 'Piecemeal', res: 'd4', penalties: 'Athletics -1' },
  { name: 'Plate', res: '5', penalties: 'Cut & Pierce +2 / Athletics & SPD -2' }
]

const UNARMED_WEAPON: WeaponItem = {
  kind: 'weapon',
  name: 'Unarmed',
  damage: 'd4+BUL-2',
  types: 'S',
  range: 0,
  heft: '-',
  hands: '-'
}

const WEAPON_TABLE: Omit<WeaponItem, 'kind'>[] = [
  { name: 'Axe', damage: 'd10+BUL', types: 'C', range: 1, heft: 3, hands: 1 },
  { name: 'Dagger', damage: 'd4+BUL', types: 'P', range: 0, heft: 1, hands: 1 },
  { name: 'Flail', damage: 'd8+BUL', types: 'S', range: 2, heft: 3, hands: 1 },
  { name: 'Great Axe', damage: 'd12+BUL', types: 'C', range: 1, heft: 4, hands: 2 },
  { name: 'Mace', damage: 'd6+BUL', types: 'S', range: 1, heft: 2, hands: 1 },
  { name: 'Maul', damage: 'd10+BUL', types: 'S', range: 1, heft: 4, hands: 2 },
  { name: 'Polearm', damage: 'd8+BUL', types: 'C, P, S', range: 2, heft: 3, hands: 2 },
  { name: 'Spear', damage: 'd6+BUL', types: 'P', range: 2, heft: 2, hands: 1 },
  { name: 'Sword', damage: 'd8+BUL', types: 'C, P', range: 1, heft: 2, hands: 1 },
  { name: 'Warhammer', damage: 'd8+BUL', types: 'S', range: 1, heft: 3, hands: 1 },
  { name: 'Whip', damage: 'd4', types: 'C', range: 3, heft: 1, hands: 1 },
  { name: 'Zweihander', damage: 'd10+BUL', types: 'C, P', range: 1, heft: 3, hands: 2 }
]

const OTHER_TABLE: Omit<OtherItem, 'kind'>[] = [
  { name: 'Full Helm', effect: 'Crit Protection 2, Alertness -2' },
  { name: 'Helmet', effect: 'Crit Protection 1, Alertness -1' },
  { name: 'Elixir', effect: 'Single use (1 action), heals d20 HP' },
  { name: 'Shield', effect: '+1 to defense tests, HFT 2, HND 1' }
]

const EQUIPMENT_TABLES: EquipmentTable[] = ['armor', 'weapon', 'other']

export function roll(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

export function rollD20Attribute(): number {
  const result = roll(20)
  if (result <= 5) return 1
  if (result <= 13) return 2
  if (result <= 17) return 3
  if (result <= 19) return 4
  return 5
}

export function randomName(): string {
  return NOBLE_NAMES[roll(NOBLE_NAMES.length) - 1]!
}

export function skillModifier(
  skills: Skills,
  attributes: Attributes,
  skill: SkillKey
): number {
  return skills[skill] + attributes[SKILL_ATTR[skill]]
}

export function unarmedAttack(): WeaponItem {
  return { ...UNARMED_WEAPON }
}

export function defaultEquipmentOptions(): EquipmentOptions {
  return {
    mode: 'random',
    rolls: ['armor', 'weapon', 'other']
  }
}

export function rollEquipmentTable(table: EquipmentTable): EquipmentItem {
  if (table === 'armor') {
    const item = ARMOR_TABLE[roll(4) - 1]!
    return { kind: 'armor', ...item }
  }
  if (table === 'weapon') {
    const item = WEAPON_TABLE[roll(12) - 1]!
    return { kind: 'weapon', ...item }
  }
  const item = OTHER_TABLE[roll(4) - 1]!
  return { kind: 'other', ...item }
}

export function generateEquipment(options: EquipmentOptions): EquipmentItem[] {
  return [0, 1, 2].map((index) => {
    const table = options.mode === 'random'
      ? EQUIPMENT_TABLES[roll(3) - 1]!
      : options.rolls[index]!
    return rollEquipmentTable(table)
  })
}

function rollSkillTraits(count: number): SkillTrait[] {
  const traits: SkillTrait[] = []
  while (traits.length < count) {
    const trait = SKILL_TRAIT_DEFINITIONS[roll(12) - 1]!
    if (!traits.some(t => t.id === trait.id)) {
      traits.push(trait)
    }
  }
  return traits
}

function rollSkills(): Skills {
  const skills: Skills = {
    alertness: 0,
    athletics: 0,
    fighting: 0,
    medicine: 0,
    strength: 0,
    willpower: 0
  }
  for (let i = 0; i < 5; i++) {
    const key = SKILL_KEYS[roll(6) - 1]!
    skills[key]++
  }
  return skills
}

function parseExpAtLevel(exp: number): { advancements: number, cruxDie: CruxDie } {
  let advancements = 0
  let cruxDie: CruxDie = 4
  for (const milestone of EXP_MILESTONES) {
    if (exp >= milestone.exp) {
      if (milestone.type === 'advancement') advancements++
      if (milestone.type === 'crux' && milestone.crux) cruxDie = milestone.crux
    }
  }
  return { advancements, cruxDie }
}

function applyHiddenStrength(attributes: Attributes): Attributes {
  const keys: AttributeKey[] = ['bul', 'vit', 'pre', 'apt']
  const key = keys[roll(4) - 1]!
  return { ...attributes, [key]: attributes[key] + 1 }
}

function hasTrait(traits: SkillTrait[], id: number): boolean {
  return traits.some(t => t.id === id)
}

function computeHp(attributes: Attributes, traits: SkillTrait[]): number {
  let hp = attributes.bul + attributes.vit + attributes.pre + attributes.apt
  if (hasTrait(traits, 9)) hp += attributes.bul
  return hp
}

function enchantedDefenseBonus(equipment: EquipmentItem[]): number {
  return equipment.filter(item => item.enchantedBonus && /\+1 defense/i.test(item.enchantedBonus)).length
}

function computeDefenseStats(skills: Skills, attributes: Attributes, equipment: EquipmentItem[]) {
  let critProtection = 0
  let blockBonus = 0
  let res = '-'
  let cut = '-'
  let pierce = '-'
  let smash = '-'

  for (const item of equipment) {
    if (item.kind === 'armor') {
      res = item.res
      if (item.name === 'Leather') smash = '+2'
      if (item.name === 'Mail') {
        cut = '+2'
        smash = '-2'
      }
      if (item.name === 'Plate') {
        cut = '+2'
        pierce = '+2'
      }
    }
    if (item.kind === 'other') {
      const match = item.effect.match(/Crit Protection (\d)/)
      if (match) critProtection += Number(match[1])
      if (item.name === 'Shield') blockBonus += 1
    }
  }

  return {
    dodge: skillModifier(skills, attributes, 'athletics'),
    block: skillModifier(skills, attributes, 'fighting') + blockBonus + enchantedDefenseBonus(equipment),
    critProtection,
    res,
    resByType: { cut, pierce, smash }
  }
}

export function resolveCharacterSheetStats(character: Character) {
  const defense = computeDefenseStats(
    character.skills,
    character.attributes,
    character.equipment
  )

  return {
    attributes: character.attributes,
    skills: character.skills,
    hpMax: computeHp(character.attributes, character.skillTraits) + (character.curseHpBonus ?? 0),
    spd: character.spd,
    strengthLimit: character.strengthLimit,
    initiative: skillModifier(character.skills, character.attributes, 'alertness'),
    attack: skillModifier(character.skills, character.attributes, 'fighting'),
    ...defense
  }
}

export function recomputeCharacterStats(character: Character): void {
  Object.assign(character, resolveCharacterSheetStats(character))
}

export function equipmentDisplayLabel(item: EquipmentItem): string {
  const prefix = item.enchantedBonus ? 'Enchanted ' : ''
  let label: string
  if (item.kind === 'armor') label = `${item.name} (RES ${item.res})`
  else if (item.kind === 'weapon') label = item.name
  else label = `${item.name}: ${item.effect}`
  if (item.enchantedBonus) label += ` (${item.enchantedBonus})`
  return prefix + label
}

function equipmentLabel(item: EquipmentItem): string {
  return equipmentDisplayLabel(item)
}

function rollExplodingCurseTable(diceCount: number): number[] {
  const results: number[] = []
  const queue: number[] = Array.from({ length: diceCount }, () => roll(8))

  while (queue.length > 0) {
    const value = queue.shift()!
    if (value === 8) {
      queue.push(roll(8), roll(8))
    } else {
      results.push(value)
    }
  }

  return results
}

type RolledCurseBoon = {
  id: number
  count: number
}

function rollCurseBoons(): RolledCurseBoon[] {
  const primary = roll(8)

  if (primary !== 8) {
    return [{ id: primary, count: 1 }]
  }

  const counts = new Map<number, number>()
  for (const id of rollExplodingCurseTable(2)) {
    counts.set(id, (counts.get(id) ?? 0) + 1)
  }

  return Array.from(counts, ([id, count]) => ({ id, count }))
}

const CURSE_SKILL_IDS = new Set([5, 6, 7])
const STACKABLE_CURSE_IDS = new Set([2, 3, 4])

export const CURSE_BOON_GRID_SIZE = 6

export function hasSkillTrait(character: Character, traitId: number): boolean {
  return character.skillTraits.some(trait => trait.id === traitId)
}

export function getCurseBoon(character: Character, boonId: number): CurseBoon | undefined {
  return character.curseBoons.find(boon => boon.id === boonId)
}

export function isStackableCurseBoon(boonId: number): boolean {
  return boonId >= 1 && boonId <= 4
}

export function curseBoonTally(count: number): string {
  if (count < 1) return ''

  const groups: string[] = []
  let remaining = count

  while (remaining > 0) {
    const groupSize = Math.min(5, remaining)
    groups.push('|'.repeat(groupSize))
    remaining -= groupSize
  }

  return groups.join(' ')
}

export function curseBoonName(boon: CurseBoon): string {
  let label = boon.name
  if (boon.rolls?.length) {
    label += ` (${boon.rolls.join(', ')})`
  }
  return label
}

export function curseBoonLabel(boon: CurseBoon): string {
  const tally = curseBoonTally(boon.count)
  const name = curseBoonName(boon)
  return tally ? `${tally} ${name}` : name
}

function mergeCurseBoonEntry(character: Character, entry: CurseBoon): void {
  const existing = character.curseBoons.find(b => b.id === entry.id)
  if (existing) {
    existing.count += entry.count
    if (entry.rolls?.length) {
      existing.rolls = [...(existing.rolls ?? []), ...entry.rolls]
    }
  } else {
    character.curseBoons.push({
      ...entry,
      rolls: entry.rolls?.length ? [...entry.rolls] : undefined
    })
  }
}

function mechanicalApplyCount(id: number, count: number): number {
  if (CURSE_SKILL_IDS.has(id)) return 0
  if (STACKABLE_CURSE_IDS.has(id)) return count
  if (id === 1) return Math.min(1, count)
  return 0
}

function applyCurseBoonCount(
  character: Character,
  id: number,
  count: number
): CurseBoon {
  const template = CURSE_BOON_DEFINITIONS.find(b => b.id === id)!
  const entry: CurseBoon = { ...template, count }
  const applies = mechanicalApplyCount(id, count)

  switch (id) {
    case 1:
      for (let i = 0; i < applies; i++) {
        character.equipment.push(rollEquipmentTable(EQUIPMENT_TABLES[roll(3) - 1]!))
      }
      break
    case 2: {
      const rolls: number[] = []
      for (let i = 0; i < applies; i++) {
        const hpRoll = roll(character.cruxDie)
        rolls.push(hpRoll)
        character.curseHpBonus += hpRoll
      }
      entry.rolls = rolls
      break
    }
    case 3:
      character.skills.strength += 2 * applies
      character.strengthLimit = 7
      break
    case 4:
      for (let i = 0; i < applies; i++) {
        enchantRandomEquipmentItem(character)
      }
      break
    default:
      break
  }

  return entry
}

function applyRolledCurseBoons(
  character: Character,
  rolled: RolledCurseBoon[]
): void {
  for (const { id, count } of rolled) {
    if (id === 8) continue
    const entry = applyCurseBoonCount(character, id, count)
    mergeCurseBoonEntry(character, entry)
  }
}

function applyAdvancement(character: Character, equipmentOptions: EquipmentOptions): void {
  const result = roll(6)
  if (result <= 3) {
    const skill = SKILL_KEYS[roll(6) - 1]!
    const limit = skill === 'strength' ? character.strengthLimit : 5
    if (character.skills[skill] < limit) character.skills[skill]++
  } else if (result <= 5) {
    const existing = new Set(character.skillTraits.map(t => t.id))
    let trait = SKILL_TRAIT_DEFINITIONS[roll(12) - 1]!
    let guard = 0
    while (existing.has(trait.id) && guard < 24) {
      trait = SKILL_TRAIT_DEFINITIONS[roll(12) - 1]!
      guard++
    }
    if (!existing.has(trait.id)) character.skillTraits.push(trait)
  } else {
    applyRolledCurseBoons(character, rollCurseBoons())
  }
}

export function generateAccursed(
  equipmentOptions: EquipmentOptions = defaultEquipmentOptions()
): Character {
  let attributes: Attributes = {
    bul: rollD20Attribute(),
    vit: rollD20Attribute(),
    pre: rollD20Attribute(),
    apt: rollD20Attribute()
  }

  const skillTraits = rollSkillTraits(2)
  if (hasTrait(skillTraits, 4)) {
    attributes = applyHiddenStrength(attributes)
  }

  const skills = rollSkills()
  const equipment = generateEquipment(equipmentOptions)
  const defense = computeDefenseStats(skills, attributes, equipment)

  const inventorySlots = attributes.bul + skills.strength + 2
  const inventory = equipment.map(equipmentLabel)
  while (inventory.length < Math.min(inventorySlots, 12)) {
    inventory.push('')
  }

  return {
    name: '',
    attributes,
    hpMax: computeHp(attributes, skillTraits),
    spd: attributes.bul + attributes.vit,
    skills,
    skillTraits,
    equipment,
    inventory,
    cruxDie: 4,
    exp: 0,
    curse: 0,
    curseBoons: [],
    curseHpBonus: 0,
    strengthLimit: 5,
    ...defense
  }
}

export function generateGuardian(
  towerLevel: number,
  equipmentOptions: EquipmentOptions = defaultEquipmentOptions()
): Character {
  const level = Math.min(51, Math.max(1, towerLevel))
  const character = generateAccursed(equipmentOptions)
  const { advancements, cruxDie } = parseExpAtLevel(level)

  character.exp = level
  character.cruxDie = cruxDie

  for (let i = 0; i < advancements; i++) {
    applyAdvancement(character, equipmentOptions)
  }

  if (hasTrait(character.skillTraits, 4)) {
    // hidden strength already applied during accursed gen
  }

  applyRolledCurseBoons(character, rollCurseBoons())
  recomputeCharacterStats(character)

  return character
}

function rollTerrain(): TerrainCode {
  const result = roll(10)
  if (result === 1) return 'C'
  if (result === 2) return 'F'
  if (result === 3) return 'E'
  if (result === 4) return 'P'
  if (result === 5) return 'R'
  if (result === 6) return 'W'
  return ''
}

export function generateTowerMap(level: number): TowerLevelMap {
  const cells: TerrainCode[][] = Array.from({ length: 6 }, () =>
    Array.from({ length: 6 }, () => '' as TerrainCode)
  )

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const isAccursedStart = row === 5 && col === 5
      const isGuardianStart = row === 0 && col === 0
      if (!isAccursedStart && !isGuardianStart) {
        cells[row]![col] = rollTerrain()
      }
    }
  }

  return { level: Math.min(51, Math.max(1, level)), cells }
}

export const TERRAIN_LEGEND: Record<string, string> = {
  C: 'Chasm',
  F: 'Fire',
  E: 'Elevation',
  P: 'Pillars',
  R: 'Rubble',
  W: 'Water',
  '': 'Regular floor'
}

export const SKILL_DEFINITIONS: { key: SkillKey, label: string, attr: string }[] = [
  { key: 'alertness', label: 'Alertness', attr: 'PRE' },
  { key: 'athletics', label: 'Athletics', attr: 'VIT' },
  { key: 'fighting', label: 'Fighting', attr: 'VIT' },
  { key: 'medicine', label: 'Medicine', attr: 'APT' },
  { key: 'strength', label: 'Strength', attr: 'BUL' },
  { key: 'willpower', label: 'Willpower', attr: 'PRE' }
]
