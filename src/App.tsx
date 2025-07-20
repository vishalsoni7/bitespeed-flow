import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlowBuilderPage from './pages/FlowBuilderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<FlowBuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App
