import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface Review {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

interface AddReviewInput {
  productId: string;
  rating: number;
  comment: string;
}

interface UpdateReviewStatusInput {
  reviewId: string;
  status: string;
  productId: string;
}

const addReview = async (review: AddReviewInput): Promise<Review> => {
  const { data } = await axios.post(
    `/api/products/${review.productId}/reviews`,
    review
  );
  return data;
};

export const useAddReview = () => {
  return useMutation<Review, Error, AddReviewInput>({
    mutationFn: addReview,
  });
};

const updateReviewStatus = async (
  review: UpdateReviewStatusInput
): Promise<Review> => {
  console.log(review);
  const { data } = await axios.patch(
    `/api/products/${review.productId}/reviews/${review.reviewId}`,
    { status: review.status }
  );

  return data;
};

export const useUpdateReviewStatus = () => {
  return useMutation<Review, Error, UpdateReviewStatusInput>({
    mutationFn: updateReviewStatus,
  });
};
