
import { createContext, useContext, useReducer } from "react";
import type {Player} from "../types/Player";
//import type {Digimon} from "../types/Digimon";
//import digimons from "../data/digimons.json";

type Props = {
    children: React.ReactNode
}
type PlayerState = {
    player: Player
}
type PlayerAction = {
    type: "SELECT_DIGIMON",
    payload: number
}
type PlayerContextType = {
    playerState: PlayerState,
    playerDispatch: React.Dispatch<PlayerAction>
}
const initialPlayerState: PlayerState = {
    player: {
        digimonId: 0
    }
}
const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case "SELECT_DIGIMON":
            return {
                ...state,
                player:{
                    ...state.player,
                    digimonId: action.payload
                }
            }
    }
}


const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: Props){
    const [playerState, playerDispatch] = useReducer(playerReducer, initialPlayerState)


    return(
        <PlayerContext.Provider value={{playerState, playerDispatch}}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    
    const context = useContext(PlayerContext)
    if(!context){
        throw new Error("usePlayer must be used inside a PlayerProvider")
    }
    return context
}