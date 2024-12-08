import { useState } from "react";
import { motion } from "framer-motion";
import { Product, useReviewsByStatus } from "../../api/queries/adminQueries";
import { useUpdateReviewStatus } from "../../api/mutations/reviewMutaions";
import { useQueryClient } from "@tanstack/react-query";
import RatingStars from "../../components/ui/RatingStars";

const AuditReviewsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { data, error, isLoading } = useReviewsByStatus();
  const updateReviewStatus = useUpdateReviewStatus();
  const queryClient = useQueryClient();

  const handleChange = (index: number) => {
    setSelectedTab(index);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const handleApprove = (reviewId: string, productId: string) => {
    updateReviewStatus.mutate(
      {
        reviewId,
        status: "approved",
        productId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["audit_reviews"],
            exact: true,
          });
        },
      }
    );
    // Add logic to approve the review
  };

  const handleReject = (reviewId: string, productId: string) => {
    updateReviewStatus.mutate(
      {
        reviewId,
        status: "rejected",
        productId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["audit_reviews"],
            exact: true,
          });
        },
      }
    );
  };

  const renderReviews = (products: Product[]) => {
    return products.map((product) => (
      <div key={product._id.productId} className="mb-4">
        <h2 className="text-xl font-semibold dark:text-gray-200">
          {product.productName}
        </h2>
        <div className="flex justify-center my-2 bg-gray-100 p-10 max-w-fit rounded-lg m-auto ">
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-32 h-32 object-contain"
          />
        </div>
        <p className="text-gray-500 mb-2 dark:text-gray-400">
          Price: ₹{product.productPrice}
        </p>
        {product.reviews.map((review) => (
          <motion.div
            key={review.reviewId}
            className="p-2 border rounded mb-2 dark:border-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="dark:text-gray-300 text-2xl font-bold">
              {review.userName}
            </h5>
            <p className="dark:text-gray-300">{review.comment}</p>
            <p className="dark:text-gray-300 flex items-center space-x-4">
              <span>Rating: </span>
              <span className="flex">
                <RatingStars rating={review.rating} />
              </span>
            </p>
            {selectedTab === 0 && (
              <div className="flex space-x-2 mt-2">
                <button
                  className="py-1 px-3 bg-green-500 text-white rounded"
                  onClick={() =>
                    handleApprove(review.reviewId, product._id.productId)
                  }
                >
                  Approve
                </button>
                <button
                  className="py-1 px-3 bg-red-500 text-white rounded"
                  onClick={() =>
                    handleReject(review.reviewId, product._id.productId)
                  }
                >
                  Reject
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    ));
  };

  return (
    <div className="p-4 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">Reviews</h1>
      <div className="flex border-b mb-4 dark:border-gray-600">
        <button
          className={`py-2 px-4 ${
            selectedTab === 0
              ? "border-b-2 border-blue-500 dark:border-blue-300"
              : ""
          } dark:text-gray-300`}
          onClick={() => handleChange(0)}
        >
          Pending
        </button>
        <button
          className={`py-2 px-4 ${
            selectedTab === 1
              ? "border-b-2 border-blue-500 dark:border-blue-300"
              : ""
          } dark:text-gray-300`}
          onClick={() => handleChange(1)}
        >
          Approved
        </button>
        <button
          className={`py-2 px-4 ${
            selectedTab === 2
              ? "border-b-2 border-blue-500 dark:border-blue-300"
              : ""
          } dark:text-gray-300`}
          onClick={() => handleChange(2)}
        >
          Rejected
        </button>
      </div>
      {selectedTab === 0 && renderReviews(data?.pending || [])}
      {selectedTab === 1 && renderReviews(data?.approved || [])}
      {selectedTab === 2 && renderReviews(data?.rejected || [])}
    </div>
  );
};

export default AuditReviewsPage;
