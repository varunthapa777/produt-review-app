import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addFavourite = async (productId: string) => {
  const response = await axios.post("/api/favourites/add", { productId });
  return response.data;
};

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
    onError: (error) => {
      console.error("Error adding favourite:", error);
    },
  });
};

const removeFavourite = async (productId: string) => {
  const response = await axios.post("/api/favourites/remove", { productId });
  return response.data;
};

export const useRemoveFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
    onError: (error) => {
      console.error("Error removing favourite:", error);
    },
  });
};
