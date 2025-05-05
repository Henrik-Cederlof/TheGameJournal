import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cover: { 
    url: { type: String, required: true }, 
  },
  completionist: { type: Boolean, default: false },
  personalNote: { type: String, default: "" },
  addedDate: { type: Date, default: Date.now },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});
const CompletedSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cover: { 
    url: { type: String, required: true }, 
  },
  completionist: { type: Boolean, default: true },
  personalNote: { type: String, default: "" },
  addedDate: { type: Date, default: Date.now },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  myGames: [GameSchema],
  myCompletedGames: [CompletedSchema]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
