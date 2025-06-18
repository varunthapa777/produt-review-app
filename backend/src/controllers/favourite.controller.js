import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from "../services/favourite.service.js";

export const addFavouriteController = async (req, res) => {
  try {
    const fav = await addFavourite(req.user._id, req.body.productId);
    res.json(fav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFavouriteController = async (req, res) => {
  try {
    const fav = await removeFavourite(req.user._id, req.body.productId);
    res.json(fav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFavouritesController = async (req, res) => {
  try {
    const fav = await getFavourites(req.user._id);
    res.json(fav);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
