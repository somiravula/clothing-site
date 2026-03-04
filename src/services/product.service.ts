// import type { Product, ProductFilterParams } from "@/types/product";

import type { Product, ProductFilterParams } from "@/types/product";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

// Simulated delay helper
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getProducts = async (
  params: ProductFilterParams,
): Promise<Product[]> => {
  await delay(800); // Artificial network latency

  // Simulated occasional error (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Failed to fetch products. Please try again.");
  }

  // In a real scenario, this would be a fetch() to an endpoint
  // For now, we filter our mock data array based on the params
  return MOCK_PRODUCTS.filter((product) => {
    // Category Filter
    if (params.category && product.category !== params.category) return false;

    // Stock Filter
    if (params.inStock && !product.inStock) return false;

    // Brand Filter (Multi-select)
    if (
      params.brand &&
      params.brand.length > 0 &&
      !params.brand.includes(product.brand)
    )
      return false;

    // Price Range Filter
    if (params.minPrice && product.price < params.minPrice) return false;
    if (params.maxPrice && product.price > params.maxPrice) return false;

    // Search Filter (Case-insensitive)
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
};
export const getProductById = (id: string) => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};
