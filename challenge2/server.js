require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = require("./models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to wedding guestbook application." });
  });

require("./routes/admins.routes.js")(app);
require("./routes/guests.routes.js")(app);

const PORT = process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})