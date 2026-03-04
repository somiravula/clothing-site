"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilters } from "@/hooks/use-filters";
import { getProducts } from "@/services/product.service";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skeleton";
import { Button } from "@/components/ui/button";

export const ProductGrid = () => {
  const { brands, minPrice, maxPrice, category, search, inStock } =
    useFilters();

  // The Query Key is a dependency array. When filters change, refetch triggers.
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      "products",
      { brands, minPrice, maxPrice, category, search, inStock },
    ],
    queryFn: () =>
      getProducts({
        brand: brands,
        minPrice: minPrice ?? undefined,
        maxPrice: maxPrice ?? undefined,
        category: category ?? undefined,
        search,
        inStock,
      }),
    retry: 1, // Don't annoy the user with infinite retries on simulated errors
  });

  // 1. Loading State (Skeletons)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map(() => (
          <ProductSkeleton key={crypto.randomUUID()} />
        ))}
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-lg font-semibold text-red-600">
          Something went wrong
        </h3>
        <p className="text-muted-foreground mb-4">{(error as Error).message}</p>
        <Button onClick={() => refetch()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  // 3. Empty State
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  // 4. Success State
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
