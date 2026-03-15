import { useGame } from "../context/GameContext.tsx";
import digimons from "../data/digimons.ts";
import type { Digimon } from "../types/Digimon";
import styles from "./DigimonCard.module.css"

type Props = {
    digimonId: number
}




export const DigimonCard = ({digimonId}: Props)=>{

    const {gameState} = useGame()
    const digimon: Digimon = digimons.find(d=>{
        return d.id==digimonId
    }) as Digimon
    const isUnlocked = gameState.discoveredDigimons.includes(digimonId)
    console.log("a includes pra o digimon de id: ", digimonId, "é: ", gameState.discoveredDigimons.includes(digimonId))
    console.log(isUnlocked)
    



    return(


        <div className={`${styles['digimon-card']} ${isUnlocked ? styles['unlocked'] : styles['locked']}`}>

            <img src={digimon.image} alt={digimon.name}  />
            <div className={`${styles['digimon-name']}`}>{digimon.name}</div>
        </div>
    )
}