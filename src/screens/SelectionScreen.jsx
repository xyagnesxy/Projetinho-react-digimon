import React, { useState } from "react";
import digimons from "../data/digimons.json";
import "./SelectionScreen.css";
import  {useDigimon} from "../context/DigimonContext";

export default function SelectionScreen() {

    const [selectedDigimon, setSelectedDigimon] = useState(null);
    const {selectDigimon1} = useDigimon();


  const handleSelect = () => {
    if(selectedDigimon){
        selectDigimon1(selectedDigimon)
        console.log(`digimon escolhido: ${selectedDigimon.name}`)
    }
    else{
        alert("Escollha um digimon antes de confirmar")
    }
    
  };



  return (
    <div className="selection-screen">
      <h1>Selecione seu Digimon</h1>

      <div className="digimon-grid">
        {digimons.map((digimon) => (
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

      <button className="confirm-button" onClick={handleSelect}>
        Confirmar
      </button>
    </div>
  );
}
