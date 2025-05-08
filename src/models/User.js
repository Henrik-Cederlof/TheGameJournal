import mongoose from "mongoose";
const GameSchema = new mongoose.Schema({
  gameId: { type: Number, required: true },
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  cover: {
    url: { type: String, required: true },
  },
  isCompleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  personalNote: { type: String, default: "" },
  addedDate: { type: Date, default: Date.now },
  platforms: [
    {
      name: { type: String, required: true },
      abbreviation: { type: String, required: true },
      platform_logo: {
        url: { type: String, required: true },
      },
    },
  ],
});

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  myGames: [GameSchema],
  myActiveGames: [GameSchema],
  myCompletedGames: [GameSchema]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
