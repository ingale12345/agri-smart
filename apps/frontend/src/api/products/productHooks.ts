import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./products.api";

export const getAllProducts = () => {
  return useQuery({ queryKey: ["get-products"], queryFn: fetchProducts });
};
