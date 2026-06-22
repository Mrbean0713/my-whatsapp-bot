app.get("/", (req, res) => {
    res.send("Bot WhatsApp actif");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Serveur actif sur le port " + PORT);
});
const express = require("express");
const app = express();
console.log("Bot lancé");

setInterval(() => {
  console.log("Je tourne toujours");
}, 60000);

"dependencies": {
  "@whiskeysockets/baileys": "latest",
  "express": "latest"
}
