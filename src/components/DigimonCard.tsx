import digimons from "../data/digimons.ts";
import type { Digimon } from "../types/Digimon";
import styles from "./DigimonCard.module.css"

type Props = {
    digimonId: number
}




export const DigimonCard = ({digimonId}: Props)=>{


    const digimon: Digimon = digimons.find(d=>{
        return d.id==digimonId
    }) as Digimon




    return(


        <div className={styles['digimon-card']}>

            <img src={digimon.image} alt={digimon.name}  />
            <div className={styles['digimon-name']}>{digimon.name}</div>
        </div>
    )
}