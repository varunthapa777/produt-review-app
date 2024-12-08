import express from "express";
import adminController from "../controllers/admin.controller.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";
import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
const router = express.Router();

router.post("/login", adminController.LoginAdmin);
router.get("/logout", adminAuth, adminController.LogoutAdmin);
router.get("/users", adminAuth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});
router.get("/dashboard", adminAuth, adminController.getDashBoardData);
router.get("/reviews", adminController.getReviews);
export default router;
