import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LoginsContextProvider } from './context/LoginContext.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <LoginsContextProvider>
        <App />
      </LoginsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
