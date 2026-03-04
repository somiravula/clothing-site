import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product } from "@/types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortOptions(): {
  name: string;
  value: string;
  compareFn: (a: Product, b: Product) => number;
}[] {
  return [
    { name: "Featured", value: "featured", compareFn: (_a, _b) => 0 },
    {
      name: "Newest",
      value: "newest",
      compareFn: (a, b) => Number(a.isNew) - Number(b.isNew),
    },
    {
      name: "Price: Low to Hight",
      value: "price-low",
      compareFn: (a, b) => a.price - b.price,
    },
    {
      name: "Price: High to Low",
      value: "price-high",
      compareFn: (a, b) => b.price - a.price,
    },
  ];
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));