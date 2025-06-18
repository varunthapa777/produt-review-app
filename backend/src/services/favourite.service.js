import Favourite from "../models/favourite.model.js";

export const addFavourite = async (userId, productId) => {
  let fav = await Favourite.findOne({ user: userId });
  if (!fav) {
    fav = await Favourite.create({ user: userId, products: [productId] });
    return fav;
  }
  if (!fav.products.includes(productId)) {
    fav.products.push(productId);
    await fav.save();
  }
  return fav;
};

export const removeFavourite = async (userId, productId) => {
  const fav = await Favourite.findOne({ user: userId });
  if (!fav) return null;
  fav.products = fav.products.filter(
    (pid) => pid.toString() !== productId.toString()
  );
  await fav.save();
  return fav;
};

export const getFavourites = async (userId) => {
  return Favourite.findOne({ user: userId }).populate("products");
};
