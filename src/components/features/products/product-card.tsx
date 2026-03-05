"use client";

import { useSession } from "@/lib/auth-client";
import { Heart, Loader2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import React, { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavoriteStore } from "@/store/use-favorite-store";
import type { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
  variant?: "grid" | "list";
}

const ProductCardComponent = ({
  product,
  variant = "grid",
  className,
  style,
  ...props
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
  const isFav = useFavoriteStore((s) => s.isFavorite(product.id));

  const { data: session, isPending } = useSession();
  const isLoggedIn = !!session;

  const handleToggleFav = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isLoggedIn) {
      toast.error("Please login to save favorites");
      return;
    }
      toggleFavorite(product.id);
    },
    [toggleFavorite, product.id, isLoggedIn],
  );

  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-zinc-100 bg-white transition-all duration-500",

        "md:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] md:hover:-translate-y-1",
        variant === "grid" ? "flex-col" : "flex-row h-48 md:h-64",
        className,
      )}
      style={style}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-zinc-50 shrink-0",
          variant === "grid" ? "aspect-[4/5]" : "w-40 md:w-72 h-full",
        )}
      >
        <Link href={`/products/${product.id}`} className="block h-full w-full">
          <Image
            src={product.images[isHovered && product.images[1] ? 1 : 0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <Badge className="bg-white/90 backdrop-blur-md text-black border-none text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-sm">
              New
            </Badge>
          )}
        </div>

        {
          isLoggedIn ? (
            <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-3 right-3 z-20 rounded-full bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-sm hover:bg-white",

            "opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0",
            isFav && "opacity-100 translate-y-0 text-red-500",
          )}
          onClick={handleToggleFav}
        >
          <Heart
            className={cn(
              "h-4 w-4 stroke-[1.5px] transition-colors",
              isFav
                ? "fill-red-500 stroke-red-500"
                : "fill-transparent stroke-zinc-500",
            )}
          />
        </Button>
          ) : isPending ?(
          <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
          ): null
        }
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-zinc-400">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className={cn(
            "mb-2 font-semibold text-zinc-800 hover:text-black transition-colors cursor-pointer",
            variant === "grid"
              ? "line-clamp-1 text-sm"
              : "text-base md:text-xl line-clamp-2",
          )}
        >
          {product.name}
        </Link>

        {variant === "list" && (
          <p className="hidden md:line-clamp-2 text-sm text-zinc-500 mb-4 font-medium">
            Premium selection from {product.brand}.
          </p>
        )}

        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span
              className={cn(
                "font-black tracking-tight",
                variant === "grid" ? "text-base" : "text-xl md:text-2xl",
              )}
            >
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProductCard = React.memo(ProductCardComponent);
