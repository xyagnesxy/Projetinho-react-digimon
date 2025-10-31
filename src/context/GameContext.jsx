import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentScreen, setCurrentScreen] = useState("menu"); // tela inicial

  const goToSelection = () => setCurrentScreen("selection");
  const goToBattle = () => setCurrentScreen("battle");
  const goToMenu = () => setCurrentScreen("menu");

  return (
    <GameContext.Provider
      value={{ currentScreen, goToSelection, goToBattle, goToMenu }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
