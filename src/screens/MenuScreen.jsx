import React from 'react'
import './MenuScreen.module.css'
import { MenuButton } from '../components/MenuButton'
import {useGame} from '../context/GameContext'
import "../styles/utils.css"

export const MenuScreen = () => {
  
    const {gameDispatch} = useGame()
    
  return (
    
          <div className="menu-screen game-layout">
            <h1 className='menu-title'>Projetinho Digimon</h1>

            <div className='menu-buttons'>
                <MenuButton text='Começar' onClick={()=>gameDispatch({type: "CHANGE_SCREEN", payload: "selection"})}/>
            </div>

            
             
        
            </div>
    
  )
}
