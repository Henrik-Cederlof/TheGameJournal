import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRoutes from "./routes/games.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Använd routes
app.use("/api", gamesRoutes);

app.listen(3001, () => {
  console.log("Proxy-server igång på http://localhost:3001");
});