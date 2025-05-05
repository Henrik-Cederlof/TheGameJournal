import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gamingUsers", {
      
    });
    console.log("Ansluten till databas:", mongoose.connection.name);

    console.log("MongoDB server connected!! Yay");
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
