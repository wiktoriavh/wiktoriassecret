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

export interface EquipmentOptions {
  mode: EquipmentMode
  rolls: [EquipmentTable, EquipmentTable, EquipmentTable]
}

export type CruxDie = 4 | 6 | 8 | 10

export interface Attributes {
  bul: number
  vit: number
  pre: number
  apt: number
}

export interface Skills {
  alertness: number
  athletics: number
  fighting: number
  medicine: number
  strength: number
  willpower: number
}

export interface SkillTrait {
  id: number
  name: string
  description: string
}

export interface ArmorItem {
  kind: 'armor'
  name: string
  res: string
  penalties: string
}

export interface WeaponItem {
  kind: 'weapon'
  name: string
  damage: string
  types: string
  range: number | string
  heft: number | string
  hands: number | string
}

export interface OtherItem {
  kind: 'other'
  name: string
  effect: string
}

export type EquipmentItem = ArmorItem | WeaponItem | OtherItem

export interface CurseBoon {
  id: number
  name: string
  description: string
}

export interface EnchantedBonus {
  item: string
  bonus: string
}

export interface Character {
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
  enchantedItems: EnchantedBonus[]
  strengthLimit: number
  dodge: number
  block: number
  critProtection: number
  res: string
  resByType: { cut: string, pierce: string, smash: string }
}

export type TerrainCode = '' | 'C' | 'F' | 'E' | 'P' | 'R' | 'W'

export interface TowerLevelMap {
  level: number
  cells: TerrainCode[][]
}

const SKILL_TRAITS: SkillTrait[] = [
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

const CURSE_BOONS: CurseBoon[] = [
  { id: 1, name: 'Bonus Equipment', description: 'Bonus equipment roll.' },
  { id: 2, name: 'Hardy', description: 'Increase HP by a CRUX die roll.' },
  { id: 3, name: 'Mighty', description: '+2 Strength score; raises score limit.' },
  { id: 4, name: 'Enchanted Item', description: 'Random enchanted item grants +1 bonus.' },
  { id: 5, name: 'DREAD WHISPERS', description: 'Spend 1 HP: opposed Willpower vs adjacent enemy, move them 1.' },
  { id: 6, name: 'PROFANE REMEDY', description: 'Spend 2 actions: Medicine test heals HP up to result.' },
  { id: 7, name: 'SHADOW STEP', description: 'Spend 1 action/HP: move, attack; move through one enemy for advantage.' },
  { id: 8, name: 'Combined', description: 'Roll twice more and combine (only 2-4 stack).' }
]

const ENCHANTED_BONUSES = [
  'attack',
  'damage',
  'RES',
  'defense',
  'Alertness',
  'Fighting'
]

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

const WEAPON_TABLE: Omit<WeaponItem, 'kind'>[] = [
  { name: 'Unarmed', damage: 'd4+BUL-2', types: 'S', range: 0, heft: '-', hands: '-' },
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
    const item = WEAPON_TABLE[roll(13) - 1]!
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
    const trait = SKILL_TRAITS[roll(12) - 1]!
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
    block: skillModifier(skills, attributes, 'fighting') + blockBonus,
    critProtection,
    res,
    resByType: { cut, pierce, smash }
  }
}

function equipmentLabel(item: EquipmentItem): string {
  if (item.kind === 'armor') return `${item.name} (RES ${item.res})`
  if (item.kind === 'weapon') return item.name
  return `${item.name}: ${item.effect}`
}

function applyCurseBoon(
  boon: CurseBoon,
  character: Character,
  equipmentOptions: EquipmentOptions
): void {
  switch (boon.id) {
    case 1:
      character.equipment.push(rollEquipmentTable(EQUIPMENT_TABLES[roll(3) - 1]!))
      break
    case 2:
      character.hpMax += roll(character.cruxDie)
      break
    case 3:
      character.skills.strength += 2
      character.strengthLimit = 7
      break
    case 4: {
      const item = character.equipment[roll(character.equipment.length) - 1]
      if (item) {
        const bonus = ENCHANTED_BONUSES[roll(ENCHANTED_BONUSES.length) - 1]!
        character.enchantedItems.push({
          item: equipmentLabel(item),
          bonus: `+1 ${bonus}`
        })
      }
      break
    }
    default:
      break
  }
}

function rollCurseBoons(): CurseBoon[] {
  const boons: CurseBoon[] = []
  const primary = CURSE_BOONS[roll(8) - 1]!

  if (primary.id === 8) {
    const extra1 = CURSE_BOONS[roll(8) - 1]!
    const extra2 = CURSE_BOONS[roll(8) - 1]!
    for (const b of [extra1, extra2]) {
      if (b.id >= 2 && b.id <= 4) boons.push(b)
      else if (b.id !== 8) boons.push(b)
    }
    if (boons.length === 0) boons.push(CURSE_BOONS[1]!)
  } else {
    boons.push(primary)
  }

  return boons
}

function applyAdvancement(character: Character): void {
  const result = roll(6)
  if (result <= 3) {
    const skill = SKILL_KEYS[roll(6) - 1]!
    if (character.skills[skill] < 5) character.skills[skill]++
  } else if (result <= 5) {
    const existing = new Set(character.skillTraits.map(t => t.id))
    let trait = SKILL_TRAITS[roll(12) - 1]!
    let guard = 0
    while (existing.has(trait.id) && guard < 24) {
      trait = SKILL_TRAITS[roll(12) - 1]!
      guard++
    }
    if (!existing.has(trait.id)) character.skillTraits.push(trait)
  } else {
    character.curseBoons.push(...rollCurseBoons())
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
    enchantedItems: [],
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
    applyAdvancement(character)
  }

  if (hasTrait(character.skillTraits, 4)) {
    // hidden strength already applied during accursed gen
  }

  const boons = rollCurseBoons()
  for (const boon of boons) {
    if (boon.id >= 5) {
      character.curseBoons.push(boon)
    } else {
      applyCurseBoon(boon, character, equipmentOptions)
      if (boon.id === 4) character.curseBoons.push(boon)
    }
  }

  const defense = computeDefenseStats(character.skills, character.attributes, character.equipment)
  Object.assign(character, defense)
  character.hpMax = computeHp(character.attributes, character.skillTraits)

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
