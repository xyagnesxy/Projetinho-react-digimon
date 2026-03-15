import { createContext, useReducer, useContext } from "react";


type Props = {
    children: React.ReactNode;
}
type ActionType ={
  type: "CHANGE_SCREEN",
  payload: "menu" | "selection" | "battle" | "catalog"
}|{
  type: "ADD_DISCOVERED_DIGIMON",
  payload: number
}
type GameStateType = {
  currentScreen: "menu" | "selection" | "battle" | "catalog",
  currentLevel: number,
  discoveredDigimons: number[]
}
type GameContextType={
  gameState: GameStateType,
  gameDispatch: React.Dispatch<ActionType>
}
const GameContext = createContext<GameContextType>({
  gameState: {
    currentScreen: "menu",
    currentLevel: 0,
    discoveredDigimons: []
  },
  gameDispatch: () => {}
});

const gameReducer = (state: GameStateType, action: ActionType): GameStateType  =>{
  switch(action.type){
    case "CHANGE_SCREEN":
      return {
        ...state,
        currentScreen: action.payload
      }
    case "ADD_DISCOVERED_DIGIMON":
      return {
        ...state,
        discoveredDigimons: [...state.discoveredDigimons, action.payload]
      }
    
  }
}


export function GameProvider({ children }: Props) {

  const [gameState, gameDispatch] = useReducer(gameReducer, {
    currentScreen: "menu",
    currentLevel: 0,
    discoveredDigimons: []
  })

  

  return (
    <GameContext.Provider
      value={{gameState, gameDispatch}}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
