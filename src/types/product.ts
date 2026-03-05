import type { ProductColor } from "@/constants/colors";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  isNew: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
};
