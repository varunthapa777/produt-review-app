import { Router } from "express";
import {
  addFavouriteController,
  removeFavouriteController,
  getFavouritesController,
} from "../controllers/favourite.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add", authUser, addFavouriteController);
router.post("/remove", authUser, removeFavouriteController);
router.get("/", authUser, getFavouritesController);

export default router;
