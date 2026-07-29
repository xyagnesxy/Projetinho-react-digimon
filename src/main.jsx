import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { DigimonProvider } from './context/DigimonContext.jsx'
import { GameProvider } from './context/GameContext.js'
import { PlayerProvider } from './context/PlayerContext.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <PlayerProvider>
        <DigimonProvider>
          <App />
        </DigimonProvider>
      </PlayerProvider>

    </GameProvider>
  
  </StrictMode>,
)
