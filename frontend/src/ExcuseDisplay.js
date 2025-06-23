import React, { useState, useEffect } from "react";

const ExcuseDisplay = () => {
  const [excuses, setExcuses] = useState([]);
  const [excuse, setExcuse] = useState("⏳ Chargement...");
  const [loading, setLoading] = useState(false);

  // Charger les excuses depuis le backend
  useEffect(() => {
    fetch("http://localhost:3001/excuses") // Remplace 5000 par ton port réel
      .then((response) => response.json())
      .then((data) => setExcuses(data))
      .catch((error) => console.error("Erreur de chargement :", error));
  }, []);
  fetch("http://localhost:3001/excuses")
    .then((response) => response.json())
    .then((data) => {
      console.log("✅ Excuses reçues :", data); // Ajoute ce log
      setExcuses(data);
    })
    .catch((error) => console.error("❌ Erreur de chargement :", error));

  // Générer une excuse aléatoire
  const generateExcuse = () => {
    setLoading(true); // Active le loader
    setTimeout(() => {
      if (excuses.length > 0) {
        const randomIndex = Math.floor(Math.random() * excuses.length);
        setExcuse(excuses[randomIndex].message);
      }
      setLoading(false); // Désactive le loader
    }, Math.random() * 4000 + 1000); // Temps de chargement aléatoire entre 1 et 5 sec
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>💬 Excuse du jour</h1>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        {loading ? "⏳ Chargement..." : excuse}
      </p>
      <button onClick={generateExcuse}>🔁 Nouvelle excuse</button>
    </div>
  );
};

export default ExcuseDisplay;
