import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LoginsContextProvider } from './context/loginsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginsContextProvider>
      <App />
    </LoginsContextProvider>
  </StrictMode>,
)
