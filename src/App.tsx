import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import FlowBuilderPage from './pages/FlowBuilderPage';

function App() {
  return (
    <Router>
      <Toaster  position="bottom-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<FlowBuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App
