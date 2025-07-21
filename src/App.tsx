import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import FlowBuilderPage from './pages/FlowBuilderPage';

/**
 * App Component - Main application component that handles routing and global configurations
 * 
 * This is the root component of the Bitespeed Flow application that sets up:
 * - Client-side routing using React Router DOM
 * - Global toast notification system using react-hot-toast
 * - Route definitions for the entire application
 * 
 * Routes:
 * - "/" (root) - Landing page with features showcase and navigation
 * - "/builder" - Interactive flow builder interface for creating chatbot flows
 * 
 * @returns {JSX.Element} The main application component with routing configuration
 */
function App() {
  return (
    <Router>
      {/* Global toast notification container positioned at bottom-right */}
      <Toaster position="bottom-right" />
      
      {/* Application routing configuration */}
      <Routes>
        {/* Home route - displays landing page with app introduction and features */}
        <Route path="/" element={<HomePage />} />
        
        {/* Flow builder route - main application interface for creating chatbot flows */}
        <Route path="/builder" element={<FlowBuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App
