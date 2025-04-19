// src/pages/HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Optional, or keep styling in App.css

function HomePage() {
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (year.trim() === '') {
      alert("Please enter a year!");
      return;
    }

    navigate(`/year/${year}`);
  };

  return (
    <div className="app-container">
      <h1>📚 Flashback Reader</h1>
      <p>Type a year to travel back in time 🔮</p>

      <div className="input-group">
        <input
          type="number"
          placeholder="e.g. 1984"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={handleGoBack}>Take Me Back</button>
      </div>
    </div>
  );
}

export default HomePage;
