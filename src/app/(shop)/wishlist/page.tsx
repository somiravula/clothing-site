"use client";

import { ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/features/products/product-card";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/use-get-products";
import { useFavoriteStore } from "@/store/use-favorite-store";

export default function WishlistPage() {
  const { data: products } = useGetProducts();
  const favourites = useFavoriteStore((s) => s.items);
  const wishlistItems = (products ?? []).filter((i) =>
    favourites.includes(i.id),
  );

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="h-24 w-24 bg-zinc-50 rounded-full flex items-center justify-center">
          <Heart className="h-10 w-10 text-zinc-300 stroke-[1.5px]" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Your wishlist is empty
          </h1>
          <p className="text-zinc-500 mt-2">
            Save items you love here to find them easily later.
          </p>
        </div>
        <Link href="/products">
          <Button className="rounded-xl px-8 h-12 font-bold uppercase tracking-widest">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Back to Shop
            </span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            My <br />{" "}
            <span className="italic font-serif opacity-80">Wishlist</span>
          </h1>
        </div>
        <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.2em]">
          {wishlistItems.length} Items Saved
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} variant="grid" />
            <div className="absolute top-2 left-2 z-20">
              <Button
                size="sm"
                className="rounded-full h-8 w-8 p-0 bg-white/90 text-black border border-zinc-100 hover:bg-black hover:text-white"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
