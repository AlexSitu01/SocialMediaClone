import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { Router } from './router.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import App from './App.tsx'
import { Feed } from './routes/Feed.tsx'
import { Login } from './routes/Login.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <Router></Router>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
