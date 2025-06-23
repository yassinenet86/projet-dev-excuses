const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const excusesPath = path.join(__dirname, "excuses.json");
let excuses = [];

// Chargement des excuses depuis le fichier JSON
try {
  const data = fs.readFileSync(excusesPath, "utf8");
  excuses = JSON.parse(data);
  console.log("✅ Excuses chargées :", excuses);
} catch (err) {
  console.error("❌ Erreur lors du chargement des excuses :", err);
}

// Route pour récupérer toutes les excuses
app.get("/excuses", (req, res) => {
  res.json(excuses);
});

// Route pour ajouter une nouvelle excuse
app.post("/excuses", (req, res) => {
  const { http_code, tag, message } = req.body;

  if (!http_code || !tag || !message) {
    return res
      .status(400)
      .json({ success: false, error: "⚠️ Champs manquants" });
  }

  const newExcuse = { http_code, tag, message };
  excuses.push(newExcuse);

  try {
    fs.writeFileSync(excusesPath, JSON.stringify(excuses, null, 2));
    console.log("✅ Nouvelle excuse ajoutée :", newExcuse);
    res.status(201).json({ success: true, excuse: newExcuse });
  } catch (err) {
    console.error("❌ Erreur lors de l'enregistrement de l'excuse :", err);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// Route de test
app.get("/test", (req, res) => {
  res.send("✅ Serveur Express fonctionne !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
