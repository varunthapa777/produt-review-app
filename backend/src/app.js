import express from "express";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import { specs } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
