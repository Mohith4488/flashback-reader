// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlashbackPage from './pages/FlashbackPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/year/:selectedYear" element={<FlashbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
