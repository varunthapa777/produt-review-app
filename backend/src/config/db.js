import mongoose from "mongoose";
import { dbConfig } from "./config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbConfig.uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
