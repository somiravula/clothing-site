"use client";

import {
  ArrowLeft,
  Heart,
  Info,
  ShieldCheck,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProductById } from "@/services/product.service";
import { useCartStore } from "@/store/use-cart-store";
import { useFavoriteStore } from "@/store/use-favorite-store";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const product = getProductById(id as string);
  const isFav = useFavoriteStore((s) =>
    product ? s.isFavorite(product.id) : false,
  );
  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);

  const handleToggleFav = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (product) {
        toggleFavorite(product.id);
      }
    },
    [toggleFavorite, product],
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter">
          Product not found
        </h2>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mt-4 font-bold uppercase tracking-widest underline underline-offset-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first", {
        className: "bg-black text-white rounded-xl font-bold",
      });
      return;
    }
    addItem(product, selectedSize);
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${selectedSize}`,
      icon: <ShoppingBag className="h-4 w-4" />,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <Link
          href="/products"
          className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black mb-12 group transition-colors"
        >
          <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
          Collection / {product.brand}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-50 border border-zinc-100 group">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              {product.isNew && (
                <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-black border-none text-[10px] font-black uppercase tracking-widest px-4 py-1.5 shadow-sm">
                  New Arrival
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((img, i) => (
                <div
                  key={`${img}${i * 1}`}
                  className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-zinc-50 border border-zinc-100"
                >
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-100">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-zinc-900">
                    {product.rating}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-3xl font-black tracking-tight">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-zinc-300 line-through font-medium">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-8 text-zinc-500 leading-relaxed font-medium text-sm">
              Designed with the "Simple is More" philosophy. This piece features
              premium craftsmanship and a silhouette that transcends seasonal
              trends. Perfect for a refined minimalist wardrobe.
            </p>

            <div className="mt-12 space-y-6 pt-8 border-t border-zinc-100">
              <div className="flex justify-between items-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  Select Size
                </p>
                <Button className="text-[10px] uppercase font-black text-zinc-900 border-b border-zinc-900 cursor-pointer text-white">
                  Size Guide
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <Button
                      key={size}
                      variant="ghost"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-14 w-14 rounded-2xl border transition-all duration-300 font-bold text-sm cursor-pointer text-white",
                        isSelected
                          ? "bg-black text-white border-black shadow-xl shadow-black/10 scale-105"
                          : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-900 hover:text-zinc-900",
                      )}
                    >
                      {size}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-12">
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 h-16 text-xs font-black uppercase tracking-[0.2em] rounded-2xl bg-black text-white hover:bg-zinc-800 transition-all shadow-2xl shadow-black/10 cursor-pointer"
                  onClick={handleAddToCart}
                >
                  Add to Bag
                  <ShoppingBag className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-16 w-16 rounded-2xl border-zinc-100 hover:bg-zinc-50 cursor-pointer"
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
              </div>

              <div className="flex items-center justify-center gap-6 py-4 border-t border-zinc-50 mt-4">
                <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3" />
                  Secured
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
                  <Info className="h-3 w-3" />
                  Sustainable
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
