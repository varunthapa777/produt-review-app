import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  mainImage: string;
  images: string[];
  brand: string;
  category: string;
  buyLink: string;
  averageRating: number;
}

const getProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("/api/products");
  console.log("Data :", data);
  return data as Product[];
};

const getProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log("Data :", data);
  return data as Product;
};
export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProductById = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
};
