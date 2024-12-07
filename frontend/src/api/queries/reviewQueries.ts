import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Review {
  _id: string;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  userName: string;
}

const getReviewsById = async (id: string): Promise<Review[]> => {
  const { data } = await axios.get(`/api/products/${id}/reviews`);
  return data;
};

export const useReviewsById = (id: string) => {
  return useQuery<Review[], Error>({
    queryKey: ["review", id],
    queryFn: () => getReviewsById(id),
  });
};
