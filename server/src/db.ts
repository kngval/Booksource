import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectToDb() {
  const uri: string = process.env.MONGO_URI as string;
  if (!uri) throw new Error("Missing URI Variable");
  try {
    const client = await mongoose.connect(uri);
    console.log(`Connected to Database: ${client.connection.host}`);
  } catch (error) {
    console.error("Error connecting to mongodb : ", error);
    throw error;
  }
}
