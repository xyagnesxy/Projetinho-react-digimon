import { getTypeModifier } from "./TypeChart";
import  type { Element } from "../../types/Element";


type DamageParameters = {
    attack: number,
    defense: number,
    power: number,
    attackType: Element,
    defenseType: Element
}

export function calculateDamage({attack, defense, power, attackType, defenseType}: DamageParameters){
    const typeModifier = getTypeModifier(attackType, defenseType);
    const baseDamage = (attack/defense)*power
    const random = 0.9 + Math.random() * 0.2
    return Math.floor(baseDamage * typeModifier * random)
}