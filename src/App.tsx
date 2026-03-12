import { use, useState } from 'react'
import './App.css'
import {MenuScreen} from './screens/MenuScreen'
import {BattleScreen} from './screens/battleScreen/BattleScreen'
import {SelectionScreen} from './screens/SelectionScreen'
import { useGame } from './context/GameContext'

function App() {

  const {gameState} = useGame()
  


  switch(gameState.currentScreen){
    case "menu":
      return(<MenuScreen/>);
    case "selection":
      return(<SelectionScreen/>);
    case "battle":
      return(<BattleScreen/>);
    default:
      return(<MenuScreen/>)
        
  }

}

export default App
