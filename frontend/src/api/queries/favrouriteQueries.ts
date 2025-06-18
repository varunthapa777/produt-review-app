import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "./productQueries";

export interface FavouriteResponse {
  _id: string;
  user: string;
  products: Product[];
  __v?: number;
}

const getFavourite = async () => {
  const response = await axios.get("/api/favourites");
  return response.data as FavouriteResponse;
};

export const useGetFavourite = () => {
  return useQuery<FavouriteResponse>({
    queryKey: ["favourites"],
    queryFn: getFavourite,
  });
};
