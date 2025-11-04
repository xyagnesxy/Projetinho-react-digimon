import React, { useEffect, useState } from "react";
import { getRandomSubset } from "../utils/random";
import "../screens/SelectionScreen.css"; // reutiliza seu CSS

export default function SelectionMenu({ digimons, onSelect }) {
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [displayedDigimons, setDisplayedDigimons] = useState([]);

  useEffect(() => {
    const randomSet = getRandomSubset(digimons, 6); // 6 digimons aleatórios
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
            <img src={digimon.image} alt={digimon.name} />
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
