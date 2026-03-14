import type { ElementType } from "../../types/ElementType";
import { getTypeModifier } from "./TypeChart";


type DamageParameters = {
    attack: number,
    defense: number,
    power: number,
    attackType: ElementType,
    defenseType: ElementType
}

export function calculateDamage({attack, defense, power, attackType, defenseType}: DamageParameters): number{
    const typeModifier = getTypeModifier(attackType, defenseType);
    const baseDamage = (attack/defense)*power
    const random = 0.9 + Math.random() * 0.2
    return Math.floor(baseDamage * typeModifier * random)
}