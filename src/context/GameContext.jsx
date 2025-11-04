import { createContext, use, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState("menu"); // tela inicial
  const [level, setLevel] = useState(0)

  const goToSelectionScreen = () => setCurrentScreen("selection");
  const goToBattleScreen = () => {
    setCurrentScreen("battle");
    setLevel(level+1)
  }
  const goToMenuScreen = () => setCurrentScreen("menu");
  
  

  return (
    <GameContext.Provider
      value={{ currentScreen, goToSelectionScreen, goToBattleScreen, goToMenuScreen, level }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
