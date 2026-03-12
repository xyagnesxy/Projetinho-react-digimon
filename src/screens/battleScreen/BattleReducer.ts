import type {BattleDigimon} from "./BattleDigimon";
import { createBattleDigimon } from "./BattleDigimon";
type BattleAction = {
  type: "ATTACK",
  payload: number
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
type BattleState = {
  playerDigimon: BattleDigimon,
  enemyDigimon: BattleDigimon,
  isPlayerTurn: boolean,
  isMenuOpen: boolean,
  isAttackMenuOpen: boolean
}
export function createInitialBattleState(playerId: number, enemyId: number): BattleState{
  return{
    playerDigimon: createBattleDigimon(playerId),
    enemyDigimon: createBattleDigimon(enemyId),
    isPlayerTurn: true,
    isMenuOpen: true,
    isAttackMenuOpen: false
  }
}

export function battleReducer(state: BattleState, action: BattleAction){
  switch(action.type){
    case "ATTACK":
      return {
        ...state,
        enemyDigimon: {
          ...state.enemyDigimon,
          currentHp: state.enemyDigimon.currentHp - action.payload
        }
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


