const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectToDatabase = require("./Database/ConnectToDatabase");
// const { route } = require("./routes");
const routes = require("./routes/index");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect To DataBase
connectToDatabase();

app.get("/", (req, res) => {
  res.send(` ⚡ Welcome to Multiverse of Madness ⚡`);
});

// Entrance
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`⚡ Server Fire On http://localhost:${PORT}`.cyan);
});
