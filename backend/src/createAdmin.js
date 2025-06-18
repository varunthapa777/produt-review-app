import mongoose from "mongoose";
import Admin from "./models/admin.model.js";
import connectDB from "./config/db.js";

// Connect to MongoDB
connectDB();

export async function createSuperAdmin() {
  try {
    const admin = await Admin.create({
      username: "admin",
      password: "admin", // will be hashed automatically
      role: "super_admin",
    });
    console.log("Super admin created:", admin);
    process.exit(0);
  } catch (error) {
    console.error("Error creating super admin:", error.message);
    process.exit(1);
  }
}
