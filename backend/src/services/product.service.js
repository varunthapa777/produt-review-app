import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import mongoose from "mongoose";

const createProduct = async ({ productDetail, adminDetail }) => {
  const {
    mainImage,
    images,
    name,
    description,
    price,
    brand,
    category,
    buylink,
  } = productDetail;
  const { _id } = adminDetail;
  try {
    const product = new Product({
      mainImage,
      images,
      name,
      description,
      price,
      brand,
      category,
      buylink,
      adminId: _id,
    });

    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

const getProducts = async () => {
  try {
    const products = await Product.find().lean();
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const averageRating = await Review.getAverageRating(product._id);
        return { ...product, averageRating };
      })
    );
    return productsWithRatings;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id).lean();
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductReviews = async (id) => {
  try {
    const reviews = await getReviewsWithUserNames(id);
    console.log(reviews);
    return reviews;
  } catch (error) {
    throw error;
  }
};

const getReviewsWithUserNames = async (productId) => {
  const reviews = await Review.aggregate([
    // Match reviews for the specific productId
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },

    // Perform the lookup to join with the users collection
    {
      $lookup: {
        from: "users", // Collection name of users
        localField: "userId", // Field in reviews
        foreignField: "_id", // Field in users
        as: "userDetails", // The resulting array field
      },
    },

    // Unwind the userDetails array (to make it a single object)
    { $unwind: "$userDetails" },

    // Add projection to include only relevant fields and concatenate fullName
    {
      $project: {
        _id: 1,
        userId: 1,
        productId: 1,
        rating: 1,
        comment: 1,
        helpfulVotes: 1,
        reviewStatus: 1,
        reviewImage: 1,
        createdAt: 1,
        updatedAt: 1,
        userName: {
          $concat: [
            "$userDetails.fullName.firstName",
            " ", // Add a space between first and last name
            "$userDetails.fullName.lastName",
          ],
        },
      },
    },
  ]);

  return reviews;
};

const addProductReview = async ({ userId, productId, review }) => {
  const { rating, comment, reviewImage } = review;

  const existingReview = await Review.findOne({ userId, productId });

  if (existingReview) {
    throw new Error("Review already exists");
  }

  if (!rating || !comment) {
    throw new Error("Rating and comment are required");
  }
  const image = reviewImage ? reviewImage : "";

  try {
    const newReview = new Review({
      userId,
      productId,
      rating,
      comment,
      reviewImage: image,
    });
    await newReview.save();
    return newReview;
  } catch (error) {
    throw error;
  }
};

export default {
  createProduct,
  getProducts,
  getProductById,
  getProductReviews,
  addProductReview,
};
