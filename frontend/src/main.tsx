import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"

import { Router } from './router.tsx'
import DVDScreensaver from './components/DVDScreensaver.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Router>
    </Router>
  </StrictMode>
)
