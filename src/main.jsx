import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { DigimonProvider } from './context/DigimonContext.jsx'
import { GameProvider } from './context/GameContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <DigimonProvider>
        <App />
      </DigimonProvider>

    </GameProvider>
  
  </StrictMode>,
)
