import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { DigimonProvider } from './context/DigimonContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
<DigimonProvider>
  <App />
</DigimonProvider>
  
  </StrictMode>,
)
