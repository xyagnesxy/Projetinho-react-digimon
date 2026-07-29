import type {BattleDigimon} from "./BattleDigimon";


export type BattleState = {
  playerDigimon: BattleDigimon,
  enemyDigimon: BattleDigimon,
  battleTurn: "player" | "enemy" | "victory" | "defeat" | "none" | "draw",
  isMenuOpen: boolean,
  isAttackMenuOpen: boolean
}