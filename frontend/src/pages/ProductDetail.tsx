import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { useProductById } from "../api/queries/productQueries";
import toast from "react-hot-toast";
import { useReviewsById } from "../api/queries/reviewQueries";
import { useAddReview } from "../api/mutations/reviewMutaions";
import { useQueryClient } from "@tanstack/react-query";
import getRelativeTime from "../utils/getRelativeTime";
import RatingStars from "../components/ui/RatingStars";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProductById(id as string);
  const {
    data: reviews,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useReviewsById(id as string);
  const addReviewMutation = useAddReview();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const queryClient = useQueryClient();

  if (isLoading || reviewLoading) {
    return <p>Loading...</p>;
  }

  if (isError || reviewError) {
    return <p>Something went wrong</p>;
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </>
    );
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitReview = () => {
    // Handle review submission logic here
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (comment.trim() === "") {
      toast.error("Please enter a comment");
      return;
    }

    addReviewMutation.mutate(
      { productId: id as string, rating, comment },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully");
          setRating(0);
          setComment("");
          queryClient.invalidateQueries({
            queryKey: ["review", id],
            exact: true,
          });
        },
        onError: () => {
          toast.error("Failed to submit review");
        },
      }
    );
    console.log("Rating:", rating);
    console.log("Comment:", comment);
  };

  const calculateAverageRating = (reviews: { rating: number }[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating(reviews || []);

  console.log(product);
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col-reverse md:flex-row py-10 px-5 bg-gray-100 pt-4 rounded-lg border border-5">
            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible">
              {product?.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product?.name}
                  className="w-20 h-20 bg-white object-contain border hover:border-blue-800 rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
            <img
              src={selectedImage || product?.mainImage}
              alt={product?.name}
              className="w-full h-64 object-contain rounded-lg mb-4 md:mt-0 md:ml-4"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {product?.name}
            </h1>
            <div className="mt-4">
              <p className="text-xl text-gray-600 dark:text-gray-400 font-bold">
                ₹{product?.price}
              </p>
              <div className="flex items-center mt-2">
                <RatingStars rating={averageRating} />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              <strong>Brand:</strong> {product?.brand}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              <strong>Category:</strong> {product?.category}
            </p>
            <br />
            <a
              className="dark:text-white dark:bg-blue-800 dark:hover:bg-blue-900 bg-blue-400 hover:bg-blue-500 px-4 py-4 rounded-md"
              href={product?.buylink}
            >
              Buy Link
            </a>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Description
          </h2>
          <p className="mt-4 text-gray-800 dark:text-gray-200">
            {product?.description}
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Reviews
          </h2>
          {reviews?.length ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  {getRelativeTime(new Date(review.createdAt))}
                </p>
                <p>
                  <strong className="dark:text-white">{review.userName}</strong>{" "}
                  {review.reviewStatus === "approved" ? (
                    <FcApproval className="text-green-500 inline-block text-2xl" />
                  ) : (
                    ""
                  )}
                </p>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 text-gray-800 dark:text-gray-200">
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              No reviews yet.
            </p>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Write a Review
          </h2>
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`cursor-pointer text-3xl ${
                    index < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(index + 1)}
                />
              ))}
            </div>
            <textarea
              className="w-full mt-4 p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
              rows={4}
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={handleSubmitReview}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
