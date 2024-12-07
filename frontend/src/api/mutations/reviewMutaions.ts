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
