import React, { useState } from "react";
import axios from "axios";
import "./ExcuseModal.css";

const ExcuseModal = ({ onClose, onExcuseAdded }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) return;

    const newExcuse = {
      http_code: Math.floor(Math.random() * 1000), // Code aléatoire
      tag: "Custom",
      message,
    };

    await axios.post("http://localhost:3001/excuses", newExcuse);
    onExcuseAdded(newExcuse);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Ajouter une excuse</h2>
      <input
        type="text"
        placeholder="Votre excuse..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>Valider</button>
      <button onClick={onClose}>Annuler</button>
    </div>
  );
};

export default ExcuseModal;
