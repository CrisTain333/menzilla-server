const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./Database/ConnectToDatabase");
// const { route } = require("./routes");
const routes = require("./routes/index");

const app = express();
const server = require("http").createServer(app);
const socketIO = require("socket.io");
export const io = socketIO(server);
dotenv.config();
const PORT = process.env.PORT || 8000;
const path = require("path");

app.use(express.json());
app.use(
  bodyParser.urlencoded({ extended: true, limit: "50mb" })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Serve uploaded images
// app.use(express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Connect To DataBase
connectToDatabase();

app.get("/", async (req, res) => {
  res.send(`⚡ Welcome to Multiverse of Madness ⚡`);
});

// Entrance
app.use("/api/v1", routes);



app.listen(PORT, () => {
  console.log(
    `⚡ Server Fire On http://localhost:${PORT}`.cyan
  );
});
