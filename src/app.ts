import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import { connectToDatabase } from "./Database/ConnectToDataBase";

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

app.get("/", (req, res) => {
  res.send(`Welcome Multiverse of Madness`);
});

// Connect To Database
connectToDatabase();

// Entry Point
app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`⚡️Server is running at http://localhost:${PORT}`);
});
