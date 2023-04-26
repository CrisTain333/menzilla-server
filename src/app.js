const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectToDatabase = require("./Database/ConnectToDatabase");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    exposedHeaders: ["Content-Disposition"],
  })
);

// Connect To DataBase
connectToDatabase();

app.get("/", (req, res) => {
  res.send(`Welcome Multiverse of Madness`);
});

app.listen(PORT, () => {
  console.log(`⚡ Server Fire On http://localhost:${PORT}`.cyan);
});
