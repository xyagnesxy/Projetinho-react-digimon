import {MenuButton} from "../../components/MenuButton.tsx"
import { DigimonCard} from "../../components/DigimonCard.tsx"
import { useGame } from "../../context/GameContext"
import digimons from "../../data/digimons.ts"
import "../../styles/utils.css"
import styles from "./CatalogScreen.module.css"

export const CatalogScreen = ()=>{


    const {gameDispatch} = useGame()
    


    return(
        < div className={` game-layout ${styles["catalog"]}`}>
        <div className={`${styles["catalog-grid"]} ` } >
                {
                    digimons.map((d, index) => {
                        
                        return  <div key={index} className={styles["catalog-itens"]}>
                                    <DigimonCard digimonId={d.id}/>
                                        <div className={styles['catalog-evolutions']}>
                                        {
                                            d.evolutions &&(
                                                d.evolutions.map((e, index)=>{
                                                    return  <div key={index} className={styles['catalog-evolution']}>
                                                                <DigimonCard digimonId={e.to}/>
                                                            </div>
                                                })
                                            )

                                            
                                        }
                                        </div>
                                    
                                </div>
                        
                    })
                }
                
        </div>
        <MenuButton text="voltar" onClick={()=>gameDispatch({type: "CHANGE_SCREEN", payload: "menu"})}/>
        </div>
    )
}