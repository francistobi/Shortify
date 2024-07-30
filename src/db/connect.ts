import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url= "mongodb+srv://frobigwe305:ebukaobigwe360@scissors.onjozd1.mongodb.net/?retryWrites=true&w=majority&appName=SCISSORS"

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    throw error;
  }
};
