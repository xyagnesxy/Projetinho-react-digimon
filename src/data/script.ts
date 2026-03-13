
//import fs from "fs"
import digimons from "./digimons.json" with {type: 'json'}
import ataques from "./attacks.json" with {type: 'json'}

import type { Digimon } from "../types/Digimon"
//const attacksJson = JSON.parse(fs.readFileSync("./attacks.json", "utf-8"))
//const listaDigimons = JSON.parse(fs.readFileSync("./digimons.json", "utf-8"))
//const listaAtaques = JSON.parse(fs.readFileSync("./attacks.json", "utf-8"))

type Archetype = "balanced" | "striker" | "speed" | "tank" | "defender"



type Stats = {
  hp: number
  atk: number
  def: number
  speed: number
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const levelBase = {
  1: {
    hp: [70, 85],
    atk: [18, 22],
    def: [13, 17],
    speed: [11, 15]
  },
  2: {
    hp: [110, 130],
    atk: [28, 35],
    def: [23, 30],
    speed: [18, 26]
  }
}

const archetypeModifiers: Record<Archetype, Stats> = {
  balanced: { hp: 0, atk: 0, def: 0, speed: 0 },
  striker: { hp: -10, atk: 10, def: -5, speed: 3 },
  speed: { hp: -10, atk: 5, def: -5, speed: 10 },
  tank: { hp: 30, atk: -5, def: 5, speed: -6 },
  defender: { hp: 10, atk: -6, def: 15, speed: -4 }
}

function generateStats(digimon: Digimon): Stats {

  const base = levelBase[digimon.level as 1 | 2]

  const stats = {
    hp: randomBetween(base.hp[0], base.hp[1]),
    atk: randomBetween(base.atk[0], base.atk[1]),
    def: randomBetween(base.def[0], base.def[1]),
    speed: randomBetween(base.speed[0], base.speed[1])
  }

  const mod: Stats = archetypeModifiers[digimon.archetype]

  return {
    hp: stats.hp + mod.hp,
    atk: stats.atk + mod.atk,
    def: stats.def + mod.def,
    speed: stats.speed + mod.speed
  }
}

const digimonsWithStats = digimons.map(d => ({
  ...d,
  ...generateStats(d as Digimon) 
}))

console.log(JSON.stringify(digimonsWithStats, null, 2))