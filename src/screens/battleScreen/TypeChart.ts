import type {ElementType} from "../../types/ElementType";

export const typeChart : Record<ElementType, Partial<Record<ElementType, number>>> = {
    fire:{
        plant: 2,
        ice: 2,
        water: 0.5
    },
    water:{
        fire: 2

    },
    wind: {

    },
    earth: {

    },
    dark: {

    },
    light: {

    },
    electric: {
        metal: 2
    },
    ice: {
        fire: 0.5
    },
    plant: {

    },
    metal: {

    },
    normal:{
        
    }
}


export function getTypeModifier(attacking: ElementType, defender: ElementType){
    return typeChart[attacking]?.[defender]?? 1 

}