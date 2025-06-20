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

try {
  const data = fs.readFileSync(excusesPath, "utf8");
  excuses = JSON.parse(data);
} catch (err) {
  console.error("Erreur lors du chargement des excuses :", err);
}

app.get("/excuses", (req, res) => {
  res.json(excuses);
});

app.post("/excuses", (req, res) => {
  const { http_code, tag, message } = req.body;
  if (http_code && tag && message) {
    const newExcuse = { http_code, tag, message };
    excuses.push(newExcuse);
    fs.writeFileSync(excusesPath, JSON.stringify(excuses, null, 2));
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "Champs manquants" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
