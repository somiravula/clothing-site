"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assumed UI primitive
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page

    // Requirement: Size validation
    if (product.sizes.length > 1) {
      toast.info(
        `Please select a size on the product page for ${product.name}`,
      );
      // In a real app, this might trigger a "Quick Add" size-selector popover
      return;
    }

    toast.success(`${product.name} added to cart!`, {
      description: "Optimistic UI update triggered.",
    });
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Image Gallery Segment */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square overflow-hidden"
      >
        <Image
          src={product.images[isHovered && product.images[1] ? 1 : 0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-blue-600">New</Badge>}
          {!product.inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>

        <Button className="absolute top-2 right-2 rounded-full bg-white/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white">
          <Heart className="h-4 w-4 text-foreground" />
        </Button>
      </Link>

      {/* 2. Content Segment */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="mb-2 line-clamp-1 font-medium hover:underline"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Button
            size="sm"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
          >
            <ShoppingCart className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </article>
  );
};
