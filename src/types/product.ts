export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  isNew: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
};

export type ProductFilterParams = {
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  inStock?: boolean;
  size?: string[];
  search?: string;
  page?: number;
};
