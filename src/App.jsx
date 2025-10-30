import { useState } from 'react'
import './App.css'
import SelectionScreen from './screens/SelectionScreen'

function App() {
  const [selectedDigimon, setSelectedDigimon] = useState(null)

  const handleSelect = (digimon) => {
    setSelectedDigimon(digimon)
    alert(`vc escollheu o ${digimon.name}`)
  }


  const startGame = () => {
    alert("começou o jogo")
  }

  return (

            <div className="app-container">
              {!selectedDigimon ? (
                <SelectionScreen/>
              ) : (<div>
                <h1>seu digimon: {selectedDigimon.name}</h1>
              </div>)}
        
            </div>

  )
}

export default App
