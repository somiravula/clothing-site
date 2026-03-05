import type { useFilters } from "@/hooks/use-filters";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { sortOptions } from "@/lib/utils";
import type { Product } from "@/types/product";

type Filters = Pick<
  ReturnType<typeof useFilters>,
  | "brands"
  | "category"
  | "inStock"
  | "minPrice"
  | "maxPrice"
  | "search"
  | "sort"
  | "sizes"
  | "colors"
>;

type ProductColorValue = Product["colors"][number];

export const getProductById = (id: string) => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};

export const getProducts = async (filters: Filters): Promise<Product[]> => {
  const results = MOCK_PRODUCTS.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.inStock && !product.inStock) return false;

    if (
      filters.brands &&
      filters.brands.length > 0 &&
      !filters.brands.includes(product.brand)
    ) {
      return false;
    }

    if (
      filters.sizes &&
      filters.sizes.length > 0 &&
      !filters.sizes.some((size) => product.sizes.includes(size))
    ) {
      return false;
    }

    if (
      filters.colors &&
      filters.colors.length > 0 &&
      !filters.colors.some((color) =>
        product.colors.includes(color as ProductColorValue),
      )
    ) {
      return false;
    }

    if (filters.minPrice != null && product.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice != null && product.price > filters.maxPrice) {
      return false;
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const sortFn = sortOptions().find(
    (i) => i.value === (filters.sort ?? ""),
  )?.compareFn;

  if (sortFn) {
    return results.sort(sortFn);
  }

  return results;
};
