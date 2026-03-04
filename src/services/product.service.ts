import type { useFilters } from "@/hooks/use-filters";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { sortOptions } from "@/lib/utils";
import type { Product } from "@/types/product";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
type Filters = Pick<ReturnType<typeof useFilters>, 'brands' | 'category' | 'inStock' | 'minPrice' | 'maxPrice' | 'search' | 'sort' | 'sizes'>

export const getProductById = (id: string) => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};

export const getProducts = async (
    filters: Filters
  ): Promise<Product[]> => {
    await delay(800);
  
    if (Math.random() < 0.05) {
      throw new Error("Failed to fetch products. Please try again.");
    }
  
    const results = MOCK_PRODUCTS.filter((product) => {
      if (filters.category && product.category !== filters.category)
        return false;
      if (filters.inStock && !product.inStock) return false;
      if (
        filters.brands &&
        filters.brands.length > 0 &&
        !filters.brands.includes(product.brand)
      )
        return false;
      if (filters.minPrice != null && product.price < filters.minPrice)
        return false;
      if (filters.maxPrice != null && product.price > filters.maxPrice)
        return false;
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