import User from "../src/models/User.js";
import express from 'express';


const userGameRouter  = express.Router();

// Lägg till ett spel "add"
userGameRouter.post("/:userId/add", async (req, res) => {
  const game = req.body; 
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user.myGames) user.myGames = [];
    if (!game.gameId && game.id) {
      game.gameId = game.id;
    }
    user.myGames.push(game);
    await user.save();
    res.status(200).send("Game ADDED!");
  } catch (error) {
    console.error("Error adding game:", error);
    res.status(500).send("Error adding game.");
  }
});


// Hämta favvospel från id
userGameRouter.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user?.myGames);
  } catch(error) {
    res.status(500).send(error);
  }
});

userGameRouter.put("/api/:userId/update/:gameId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const game = user?.myGames.gameId(req.params.gameId);
    if(game) {
      Object.assign(game, req.body);
      await user?.save();
      res.status(200).send("Game UPDATED!")
    } else {
      res.status(404).send("Game NOT FOUND!")
    }
  } catch(error) {
    res.status(500).send(error) // Server ISSUES ?
  }
});



// Flytta spel från myGames till Complete
userGameRouter.post("/:gameId", async (req, res) => {
  console.log("Route hit!");
  const { gameId } = req.params;
  console.log("Game ID:", gameId);
  const { userId } = req.body;
  console.log("User ID:", userId);
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const game = user.myGames.find(game => game.gameId.toString() === gameId);
    if (!game) return res.status(404).send("Game not found in myGames list");

    user.myGames = user.myGames.filter(game => game.gameId.toString() !== gameId);
    user.myCompletedGames.push(game);

    await user.save();

    res.status(200).send("Game moved to completed!");
  } catch (error) {
    console.error("Error moving game:", error);
    res.status(500).send("Error moving game.");
  }
});

// Hämta alla spel i Completed
userGameRouter.get("/:gameId/completed", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user?.myCompletedGames);
  } catch(error) {
    res.status(500).send(error);
  }
});
// Hämmta spel i Active
userGameRouter.get("/:gameId/active", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user?.myActiveGames);
  } catch(error) {
    res.status(500).send(error);
  }
});






export default userGameRouter;