import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { specs } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import path from "path";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import productRoute from "./routes/product.route.js";
import fileRoute from "./routes/file.route.js";
import multer from "multer";
import favouriteRoutes from "./routes/favourite.route.js";

const __dirname = path.resolve();
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/products", productRoute);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/files", fileRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});
export default app;
