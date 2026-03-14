import attacks from "../../data/attacks";
import digimons from "../../data/digimons";
import { createBattleDigimon } from "./BattleDigimon";
import { calculateDamage } from "./damage";
import { getTurn } from "./getTurn";
import type { BattleState } from "./battleState";

type BattleAction = {
  type: "ATTACK",
  attacker: number,
  defender: number,
  attackId: number
}|{
    type: "INIT",
    payload: number
}|{
    type: "OPEN_ATTACK_MENU",
    payload: boolean
}|{
    type: "OPEN_BATTLE_MENU",
    payload: boolean
}

export function createInitialBattleState(playerId: number, enemyId: number): BattleState{
  return{
    playerDigimon: createBattleDigimon(playerId),
    enemyDigimon: createBattleDigimon(enemyId),
    battleTurn: "player",
    isMenuOpen: true,
    isAttackMenuOpen: false
  }
}

export function battleReducer(state: BattleState, action: BattleAction){
  switch(action.type){
    case "ATTACK":
      const nextState = {
        ...state,
        playerDigimon: {
          ...state.playerDigimon,
          currentHp: state.battleTurn=="enemy"? state.playerDigimon.currentHp - calculateDamage({attack: digimons[action.attacker].atk, defense: digimons[action.defender].def, power: attacks[action.attackId].power, attackType: attacks[action.attackId].type, defenseType: digimons[action.defender].type}): state.playerDigimon.currentHp 
        },
        enemyDigimon: {
          ...state.enemyDigimon,
          currentHp: state.battleTurn=="player"? state.enemyDigimon.currentHp - calculateDamage({attack: digimons[action.attacker].atk, defense: digimons[action.defender].def, power: attacks[action.attackId].power, attackType: attacks[action.attackId].type, defenseType: digimons[action.defender].type}): state.enemyDigimon.currentHp
        }, 
      }
      return {
        ...nextState,
        battleTurn: getTurn(nextState)
      }
    case "OPEN_ATTACK_MENU":
        return{
            ...state,
            isAttackMenuOpen: action.payload
        }
    case "OPEN_BATTLE_MENU":
        return{
            ...state,
            isMenuOpen: action.payload
        }
    default:
      return state
  }
}


