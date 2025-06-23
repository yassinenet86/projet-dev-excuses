import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExcuseDisplay.css";

const ExcuseDisplay = () => {
  const [excuses, setExcuses] = useState([]);
  const [currentExcuse, setCurrentExcuse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newExcuse, setNewExcuse] = useState({
    message: "",
    http_code: "",
    tag: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/excuses")
      .then((res) => {
        console.log("✅ Excuses reçues :", res.data);
        setExcuses(res.data);

        if (res.data.length > 0) {
          const random = res.data[Math.floor(Math.random() * res.data.length)];
          console.log("✅ Excuse affichée :", random);
          setCurrentExcuse(random);
        } else {
          console.warn("⚠️ Aucune excuse disponible !");
        }
      })
      .catch((err) => {
        console.error("❌ Erreur de chargement des excuses :", err);
      });
  }, []);

  const handleClick = async () => {
    setCurrentExcuse(null);
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 4000 + 1000)
    );

    if (excuses.length > 0) {
      const random = excuses[Math.floor(Math.random() * excuses.length)];
      console.log("✅ Nouvelle excuse sélectionnée :", random);
      setCurrentExcuse(random);
    } else {
      console.warn(
        "⚠️ Impossible de sélectionner une excuse, la liste est vide !"
      );
    }
  };

  const handleAddExcuse = () => {
    axios
      .post("http://localhost:3001/excuses", newExcuse)
      .then((res) => {
        setExcuses([...excuses, res.data.excuse]); // Ajoute l'excuse à la liste
        setShowModal(false);
        setNewExcuse({ message: "", http_code: "", tag: "" });
        console.log("✅ Nouvelle excuse ajoutée :", res.data.excuse);
      })
      .catch((err) => {
        console.error("❌ Erreur lors de l'ajout de l'excuse :", err);
      });
  };

  return (
    <div className="excuse-container">
      <h1 className="fade-in">💬 Excuse du jour</h1>
      {!currentExcuse ? (
        <p>⏳ Chargement...</p>
      ) : (
        <>
          <div className="excuse-message">"{currentExcuse.message}"</div>
          <div className="excuse-meta">
            HTTP <strong>{currentExcuse.http_code}</strong> –{" "}
            {currentExcuse.tag}
          </div>
        </>
      )}
      <button className="excuse-button" onClick={handleClick}>
        🔁 Nouvelle excuse
      </button>
      <button className="excuse-button" onClick={() => setShowModal(true)}>
        ➕ Ajouter une excuse
      </button>

      {showModal && (
        <div className="modal">
          <h2>➕ Ajouter une excuse</h2>
          <input
            type="text"
            placeholder="Message de l'excuse"
            value={newExcuse.message}
            onChange={(e) =>
              setNewExcuse({ ...newExcuse, message: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Code HTTP"
            value={newExcuse.http_code}
            onChange={(e) =>
              setNewExcuse({ ...newExcuse, http_code: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Catégorie"
            value={newExcuse.tag}
            onChange={(e) =>
              setNewExcuse({ ...newExcuse, tag: e.target.value })
            }
          />
          <button onClick={handleAddExcuse}>✅ Ajouter</button>
          <button onClick={() => setShowModal(false)}>❌ Annuler</button>
        </div>
      )}
    </div>
  );
};

export default ExcuseDisplay;
