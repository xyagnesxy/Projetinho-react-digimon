import './App.css'
import {MenuScreen} from './screens/MenuScreen.tsx'
import {BattleScreen} from './screens/battleScreen/BattleScreen'
import {SelectionScreen} from './screens/selectionScreen/SelectionScreen.tsx'
import { useGame } from './context/GameContext'
import { CatalogScreen } from './screens/catalogScreen/CatalogScreen.tsx'

function App() {

  const {gameState} = useGame()
  


  switch(gameState.currentScreen){
    case "menu":
      return(<MenuScreen/>);
    case "selection":
      return(<SelectionScreen/>);
    case "battle":
      return(<BattleScreen/>);
    case "catalog":
      return <CatalogScreen/>
    default:
      return(<MenuScreen/>)
        
  }

}

export default App
