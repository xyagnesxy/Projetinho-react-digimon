import React, { useEffect, useState } from "react";
import { getRandomSubset } from "../utils/random";
import "../screens/SelectionScreen.css"; // reutiliza seu CSS
import { useGame } from "../context/GameContext";


export default function SelectionMenu({ digimons, onSelect }) {
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [displayedDigimons, setDisplayedDigimons] = useState([]);
  const {level} = useGame()
  useEffect(() => {
    const randomSet = getRandomSubset(digimons, 6, level); // 6 digimons aleatórios
    setDisplayedDigimons(randomSet);
  }, [digimons]);

  return (
    <div className="selection-screen">
      <h1>Selecione seu Digimon</h1>

      <div className="digimon-grid">
        {displayedDigimons.map((digimon) => (
          <div
            key={digimon.id}
            className={`digimon-card ${
              selectedDigimon?.id === digimon.id ? "selected" : ""
            }`}
            onClick={() => setSelectedDigimon(digimon)}
          >
            {/*o src contem um new url porque o vercel não identificaria no momento de build que deveria processar se fosse uma string dinâmica */}
            <img src={new URL(`../..`+digimon.image, import.meta.url).href} alt={digimon.name} />
            <div className="digimon-name">{digimon.name}</div>
          </div>
        ))}
      </div>

      {selectedDigimon && (
        <div className="selected-preview">
          <h2>{selectedDigimon.name}</h2>
          <img src={selectedDigimon.image} alt={selectedDigimon.name} />
        </div>
      )}

      <button
        className="confirm-button"
        onClick={() => selectedDigimon && onSelect(selectedDigimon)}
      >
        Confirmar
      </button>
    </div>
  );
}
