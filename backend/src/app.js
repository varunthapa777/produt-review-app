import express from "express";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { specs } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import path from "path";

const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
export default app;
