import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExcuseDisplay.css';

const ExcuseDisplay = () => {
  const [excuses, setExcuses] = useState([]);
  const [currentExcuse, setCurrentExcuse] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/excuses')
      .then((res) => {
        setExcuses(res.data);
        const random = res.data[Math.floor(Math.random() * res.data.length)];
        setCurrentExcuse(random);
      })
      .catch((err) => {
        console.error('Erreur de chargement des excuses :', err);
      });
  }, []);

  const handleClick = () => {
    if (excuses.length > 0) {
      const random = excuses[Math.floor(Math.random() * excuses.length)];
      setCurrentExcuse(random);
    }
  };

  return (
    <div className="excuse-container">
      <h1>💬 Excuse du jour</h1>
      {currentExcuse ? (
        <>
          <div className="excuse-message">"{currentExcuse.message}"</div>
          <div className="excuse-meta">
            HTTP <strong>{currentExcuse.http_code}</strong> – {currentExcuse.tag}
          </div>
        </>
      ) : (
        <p>Chargement...</p>
      )}
      <button className="excuse-button" onClick={handleClick}>
        Nouvelle excuse 🔁
      </button>
    </div>
  );
};

export default ExcuseDisplay;
