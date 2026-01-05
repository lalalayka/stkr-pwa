import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Remove loading screen after minimum 1 second
const loader = document.getElementById('loader')
const startTime = Date.now()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (loader) {
  const elapsed = Date.now() - startTime
  const remainingTime = Math.max(1000 - elapsed, 0)
  
  setTimeout(() => {
    loader.style.opacity = '0'
    loader.style.transition = 'opacity 0.3s ease-out'
    setTimeout(() => loader.remove(), 300)
  }, remainingTime)
}
