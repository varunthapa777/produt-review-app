import http from "http";
import { app as config } from "./config/config.js";
import app from "./app.js";
import connectDB from "./config/db.js";

const { port } = config;

const server = http.createServer(app);
const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

startServer();
