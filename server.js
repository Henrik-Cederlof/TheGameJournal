import express from "express"; // Importera express för att skapa servern
import cors from "cors"; // Importera cors för att hantera CORS-policy
import dotenv from "dotenv"; // Laddar in miljövariabler
import authRoutes from "./routes/authRoutes.js"; // Importera routes för autentisering
import gamesRoutes from "./routes/games.js"; // Importera routes för spel
import connectDB from "./mongoDB.js"; // Importera connectDB-funktionen
import userGameRouter from "./routes/userGames.js";
// Laddar in miljövariabler från .env-filen
dotenv.config(); 
// Serverns instans av express
const app = express(); 
// Låter frontend-anrop komma till servern
app.use(cors()); 
 // Låter servern ta emot JSON-data
app.use(express.json());

connectDB();


// Routes för att hantera API-anrop. Se mapp "routes"
app.use("/api", gamesRoutes); 
app.use("/api/userGames", userGameRouter)
app.use("/api/auth", authRoutes);

 // Starta och lyssna till servern på port 3001   
app.listen(3001, () => { 
  console.log("Proxy-server igång på http://localhost:3001");
});