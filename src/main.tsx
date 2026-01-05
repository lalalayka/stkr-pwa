import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Remove loading screen
const loader = document.getElementById('loader')
if (loader) {
  loader.style.opacity = '0'
  loader.style.transition = 'opacity 0.3s ease-out'
  setTimeout(() => loader.remove(), 300)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
