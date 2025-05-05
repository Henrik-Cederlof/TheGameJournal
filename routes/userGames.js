import User from "../src/models/User.js";
import express from 'express';


const userGameRouter  = express.Router();

// Lägg till ett spel "add"
// Lägg till ett spel "add"
userGameRouter.post("/:userId/add", async (req, res) => {
  const game = req.body; // ⬅️ Ta hela objektet direkt
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    console.log("Game to add:", game);

    if (!user.myGames) user.myGames = [];
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

userGameRouter.put("/:userId/update/:gameId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const game = user?.myGames.id(req.params.gameId);
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


userGameRouter.delete("/:userId/delete/:gameId", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId, {
      $pull: { myGames: { _id: req.params.gameId } }
    });
    res.status(200).send("Game REMOVED!")
  } catch(error) {
    res.status(500).send(error)
  }
});


export default userGameRouter;