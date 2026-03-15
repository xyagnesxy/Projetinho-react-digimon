import { useReducer } from "react";
import { useGame } from "../../context/GameContext.tsx";
import { usePlayer} from "../../context/PlayerContext.tsx";
import  "../../styles/utils.css"
import styles from "./SelectionScreen.module.css";
import { selectionReducer, createInitialSelectionState } from "./SelectionReducer.ts";
import { DigimonCard } from "../../components/DigimonCard.tsx";

export const SelectionScreen = () => {
  
  const {gameDispatch} = useGame()
  const {playerDispatch} = usePlayer()
  const [selectionState, selectionDispatch] = useReducer(selectionReducer, createInitialSelectionState())
 
  return (
    
      <div className={`${styles['selection-screen']} game-layout}`}>
      <h1>Selecione seu Digimon</h1>

      <div className={"digimon-grid"}>
        {selectionState.displayedDigimons.map((digimon, index) => (
          
          <div
            key= {index}
            onClick={() => {selectionDispatch({type: "SELECT", payload: digimon.id}); selectionDispatch({type: "PREVIEW", payload: digimon.id})}}
            >            
            <DigimonCard digimonId={digimon.id} />
          </div>
        ))}
      </div>

      {selectionState.previewedDigimon && (
        
        <div className={'selected-preview'}>
          <h2>{selectionState.previewedDigimon.name}</h2>
          <img src={selectionState.previewedDigimon.image} alt={selectionState.previewedDigimon.name} />
        </div>
      )}

      <button
        className={'confirm-button'}
        onClick={() => {
            gameDispatch({type: "CHANGE_SCREEN", payload: "battle"}); playerDispatch({type: "SELECT_DIGIMON", payload:selectionState.selectedDigimon?.id}) }
          
        }
      >
        Confirmar
      </button>
    </div>
      
  );
};
