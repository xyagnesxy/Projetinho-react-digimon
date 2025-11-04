import { use, useState } from 'react'
import './App.css'
import {MenuScreen} from './screens/MenuScreen'
import {BattleScreen} from './screens/BattleScreen'
import {SelectionScreen} from './screens/SelectionScreen'
import { useGame } from './context/GameContext'

function App() {

  const {currentScreen} = useGame()



  switch(currentScreen){
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
