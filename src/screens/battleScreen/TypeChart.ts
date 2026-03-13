import type {Element} from "../../types/Element";

export const typeChart : Record<Element, Partial<Record<Element, number>>> = {
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


export function getTypeModifier(attacking: Element, defender: Element){
    return typeChart[attacking]?.[defender]?? 1 

}