import type { Digimon } from "../../types/Digimon"
import { getRamdomDigimon } from "./menuFunctions"

type SelectionAction = {
    type: "INIT"
}|{
    type: "SELECT",
    payload: number
}|{
    type: "PREVIEW",
    payload: number
}|{
    type: "UNPREVIEW"
}

type SelectionState = {
    displayedDigimons: Digimon[],
    selectedDigimon: Digimon | undefined
    previewedDigimon: Digimon | undefined
}
export function createInitialSelectionState(): SelectionState{
    return{
        displayedDigimons: getRamdomDigimon(6),
        selectedDigimon: undefined,
        previewedDigimon: undefined
    }
}
export function selectionReducer(state: SelectionState, action: SelectionAction){
    switch(action.type){
        case "INIT":
            return{
                ...state,
                displayedDigimons: getRamdomDigimon(6),
                }
        case "SELECT":
            return{
                ...state,
                selectedDigimon: state.displayedDigimons.find(d=>{
                    return d.id==action.payload
                
                })
            }
        case "PREVIEW":
            return{
                ...state,
                previewedDigimon: state.displayedDigimons.find(d=>{
                    return d.id==action.payload
                })
            }
        case "UNPREVIEW":
            return{
                ...state,
                previewedDigimon: undefined
            }
        default:
            return state
    }
}