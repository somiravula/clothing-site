"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getProducts } from "@/services/product.service";
import { useFilters } from "./use-filters";

export const useGetProducts = () => {
  const {
    search,
    sort,
    category,
    inStock,
    brands,
    sizes,
    colors,
    minPrice,
    maxPrice,
  } = useFilters();

  const brandsKey = useMemo(() => [...brands].sort().join("|"), [brands]);
  const sizesKey = useMemo(() => [...sizes].sort().join("|"), [sizes]);
  const colorsKey = useMemo(() => [...colors].sort().join("|"), [colors]);

  const filterParams = useMemo(
    () => ({
      search,
      sort,
      category,
      inStock,
      brands: brandsKey ? brandsKey.split("|") : [],
      sizes: sizesKey ? sizesKey.split("|") : [],
      colors: colorsKey ? colorsKey.split("|") : [],
      minPrice,
      maxPrice,
    }),
    [
      search,
      sort,
      category,
      inStock,
      brandsKey,
      sizesKey,
      colorsKey,
      minPrice,
      maxPrice,
    ],
  );

  return useQuery({
    queryKey: [
      "products",
      search,
      sort,
      category,
      inStock,
      brandsKey,
      sizesKey,
      colorsKey,
      minPrice,
      maxPrice,
    ],
    queryFn: () => getProducts(filterParams),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
