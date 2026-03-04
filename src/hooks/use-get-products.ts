"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import { useFilters } from "./use-filters";

export const useGetProducts = () => {
  const filters = useFilters();

  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });
};
