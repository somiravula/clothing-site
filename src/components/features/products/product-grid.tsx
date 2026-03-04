"use client";

import { useTransition } from "react";
import { useGetProducts } from "@/hooks/use-get-products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { ProductSkeletonGrid } from "./product-skeleton-grid";
import { EmptyState } from "./empty-state";

interface ProductGridProps {
  view: "grid" | "list";
}

export const ProductGrid = ({ view }: ProductGridProps) => {
  const { data: products, isLoading, isError } = useGetProducts();
  const [isPending] = useTransition();

  if (isLoading && !products) return <ProductSkeletonGrid />;
  if (isError || products?.length === 0)
    return <EmptyState />

  return (
    <section
      className={cn(
        "grid gap-6 transition-all duration-500",

        view === "grid"
          ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1",
        isPending && "opacity-40 pointer-events-none",
      )}
    >
      {products?.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={view}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        />
      ))}
    </section>
  );
};
