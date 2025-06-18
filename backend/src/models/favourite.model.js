import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Favourite = mongoose.model("Favourite", favouriteSchema);
export default Favourite;
