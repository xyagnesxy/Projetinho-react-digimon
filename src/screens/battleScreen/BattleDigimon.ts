import digimons from "../../data/digimons";


export type BattleDigimon = {
    id: number,
    name: string,
    type: string,
    hp: number,
    currentHp: number,
    atk: number,
    def: number,
    speed: number,
    attacks: number[]
}

export function createBattleDigimon(id: number): BattleDigimon{
    return {
        id: digimons[id].id,
        name: digimons[id].name,
        type: digimons[id].type,
        hp: digimons[id].hp,
        currentHp: digimons[id].hp,
        atk: digimons[id].atk,
        def: digimons[id].def,
        speed: digimons[id].speed,
        attacks: digimons[id].attacks
    }    
}