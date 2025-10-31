import React from 'react'
import './MenuScreen.css'
import { MenuButton } from '../components/MenuButton'
import {useGame} from '../context/GameContext'
import GameLayout from '../components/GameLayout'

export const MenuScreen = () => {
    const {goToSelection} = useGame()
  return (
    <GameLayout>
          <div className="menu-screen">
            <h1 className='menu-title'>Projetinho Digimon</h1>

            <div className='menu-buttons'>
                <MenuButton text='Começar' onClick={()=>goToSelection()}/>
            </div>
            
             
        
            </div>
    </GameLayout>
  )
}
