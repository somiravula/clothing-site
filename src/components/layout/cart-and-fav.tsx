"use client";

import { Heart, Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/use-cart-store";
import { useFavoriteStore } from "@/store/use-favorite-store";
import { useSession } from "@/lib/auth-client";

export const CartAndFav = () => {
  const count = useCartStore((s) => s.items.length);
  const favCount = useFavoriteStore((s) => s.items.length);
  const { data: session, isPending } = useSession();
  const isLoggedIn = !!session;

  return (
    <>
      <Link
        href="/cart"
        aria-label="Open cart"
        className="group relative cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ShoppingCart className="h-7 w-7 text-zinc-400 stroke-[1.2px]" />
        <span className="absolute -top-1 -right-2 bg-[#F26464] text-white text-[9px] font-bold h-4 w-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      </Link>

      {isLoggedIn ? (
        <Link
          href="/wishlist"
          aria-label="Open wishlist"
          className="group relative cursor-pointer hover:opacity-70 transition-opacity"
        >
          <Heart className="h-7 w-7 text-zinc-400 stroke-[1.2px]" />
          <span className="absolute -top-1 -right-2 bg-[#F26464] text-white text-[9px] font-bold h-4 w-5 flex items-center justify-center rounded-full">
            {favCount}
          </span>
        </Link>
      ) : isPending ? (
        <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
      ) : null}
    </>
  );
};
