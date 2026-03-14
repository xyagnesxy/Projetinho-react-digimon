import type { BattleState } from "./battleState";

export function getTurn(state: BattleState): "player"|"enemy"| "victory" | "defeat" |"none" | "draw"{
    if(state.enemyDigimon.currentHp<=0 &&  state.playerDigimon.currentHp>0){
        return "victory"
    }
    else if(state.playerDigimon.currentHp<=0 && state.enemyDigimon.currentHp>0){
        return "defeat"
    }else if(state.playerDigimon.currentHp<=0 && state.enemyDigimon.currentHp<=0){
        return "draw"
    }else{
        return state.battleTurn=="player"? "enemy": "player"
    }
}