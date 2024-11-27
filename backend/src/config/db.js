import mongoose from "mongoose";
import { db } from "./config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db.uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
