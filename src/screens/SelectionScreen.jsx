import React, { useState } from "react";
import digimons from "../data/digimons.ts";

import { useDigimon } from "../context/DigimonContext";
import { useGame } from "../context/GameContext";
import { usePlayer} from "../context/PlayerContext";
import "../styles/utils.css"
import styles from "./SelectionScreen.module.css";



export const SelectionScreen = () => {
  
  const {gameDispatch} = useGame()
  const {playerDispatch} = usePlayer()
 
  const displayedDigimons = digimons.slice(0,6)
  const [selectedDigimon, setSelectedDigimon] = useState(null)
  
  return (
    
      <div className={`${styles['selection-screen']} game-layout`}>
      <h1>Selecione seu Digimon</h1>

      <div className={styles['digimon-grid']}>
        {displayedDigimons.map((digimon, index) => (
          
          <div
            key= {index}
            className={styles['digimon-card']}
            onClick={() => {setSelectedDigimon(digimon.id)}}
          >
            {/*o src contem um new url porque o vercel não identificaria no momento de build que deveria processar se fosse uma string dinâmica */}
            <img src={digimon.image} alt={digimon.name}  />
            <div className={styles['digimon-name']}>{digimon.name}</div>
          </div>
        ))}
      </div>

      {selectedDigimon!==null && (
        
        <div className={styles['selected-preview']}>
          <h2>{digimons[selectedDigimon].name}</h2>
          <img src={digimons[selectedDigimon].image} alt={selectedDigimon.name} />
        </div>
      )}

      <button
        className={styles['confirm-button']}
        onClick={() => {gameDispatch({type: "CHANGE_SCREEN", payload: "battle"}); playerDispatch({type: "SELECT_DIGIMON", payload: digimons[selectedDigimon].id}) }}
      >
        Confirmar
      </button>
    </div>
      
  );
};
