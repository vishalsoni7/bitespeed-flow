import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Application Entry Point - Main.tsx
 * 
 * This is the entry point for the Bitespeed Flow React application.
 * It handles the initial setup and rendering of the application to the DOM.
 * 
 * Key responsibilities:
 * - Initializes React 18's new concurrent rendering with createRoot
 * - Enables React StrictMode for development-time checks and warnings
 * - Imports global CSS styles from index.css
 * - Renders the main App component to the DOM
 * 
 * StrictMode benefits:
 * - Identifies components with unsafe lifecycles
 * - Warns about legacy string ref API usage
 * - Warns about deprecated findDOMNode usage
 * - Detects unexpected side effects during development
 * - Helps prepare for React's future concurrent features
 */

// Create React root using the new React 18 API for concurrent features
// The exclamation mark asserts that 'root' element exists in index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Main application component with routing and global configurations */}
    <App />
  </StrictMode>,
)
