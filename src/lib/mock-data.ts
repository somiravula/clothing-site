import type { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Heavyweight Tee",
    brand: "Aura Essentials",
    category: "tops",
    price: 45,
    originalPrice: 60,
    images: ["/products/photo-01.webp", "/products/photo-01.webp"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    name: "Raw Denim Slim Fit",
    brand: "Indigo Co.",
    category: "bottoms",
    price: 120,
    images: ["/products/photo-02.webp", "/products/photo-02.webp"],
    sizes: ["30", "32", "34"],
    isNew: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Technical Shell Jacket",
    brand: "Aura Performance",
    category: "outerwear",
    price: 210,
    originalPrice: 295,
    images: ["/products/photo-03.webp", "/products/photo-03.webp"],
    sizes: ["M", "L"],
    isNew: false,
    inStock: false, // This will test our "Out of Stock" badge
    rating: 4.9,
    reviewCount: 42,
  },
  // Add 3-5 more items here to make the grid look full!
];
