import React from "react";
import digimons from "../data/digimons.json";
import GameLayout from "../components/GameLayout";
import { useDigimon } from "../context/DigimonContext";
import { useGame } from "../context/GameContext";
import SelectionMenu from "../components/SelectionMenu";

export const SelectionScreen = () => {
  const { selectDigimon } = useDigimon();
  const { goToBattleScreen } = useGame();
  // futuramente, mandar como props, apenas parte de "digimons"
  const handleSelect = (digimon) => {
    selectDigimon(digimon);
    goToBattleScreen();
  };

  return (
    <GameLayout>
      <SelectionMenu digimons={digimons} onSelect={handleSelect} />
    </GameLayout>
  );
};
