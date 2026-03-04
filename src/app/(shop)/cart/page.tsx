"use client";

import {
  ArrowRight,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart-store";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="h-24 w-24 rounded-full bg-zinc-50 flex items-center justify-center mb-8 border border-zinc-100">
          <ShoppingBag className="h-10 w-10 text-zinc-300 stroke-[1.5px]" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
          Your cart is empty
        </h1>
        <p className="text-zinc-500 mb-8 max-w-sm font-medium">
          Looks like you haven't added anything yet. Quality over quantity, but
          none is too little!
        </p>
        <Link href="/products">
          <Button
            size="lg"
            className="rounded-xl px-10 h-14 font-bold uppercase tracking-widest shadow-xl hover:shadow-black/10 transition-all"
          >
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12">
        <Link
          href="/products"
          className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors mb-6 group w-fit"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Continue Shopping
          </span>
        </Link>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
          Shopping <br />{" "}
          <span className="italic font-serif opacity-80">Bag</span>
          <span className="text-xl md:text-2xl font-light text-zinc-300 ml-4 font-sans">
            ({items.length})
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="flex flex-col sm:flex-row gap-8 pb-8 border-b border-zinc-100 last:border-0"
            >
              <div className="relative h-40 w-40 flex-none rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col py-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      {item.brand}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 mt-1 uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-zinc-500 mt-2 bg-zinc-100 w-fit px-3 py-1 rounded-full uppercase">
                      Size: {item.selectedSize}
                    </p>
                  </div>
                  <p className="text-xl font-black font-sans">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border border-zinc-200 rounded-xl px-1 h-11">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1,
                          item.selectedSize,
                        )
                      }
                      className="h-9 w-9 rounded-lg hover:bg-zinc-100 cursor-pointer disabled:opacity-20"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 text-sm font-black w-10 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1,
                          item.selectedSize,
                        )
                      }
                      className="h-9 w-9 rounded-lg hover:bg-zinc-100 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => removeItem(item.id, item.selectedSize)}
                    className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-400 hover:text-red-500 transition-colors cursor-pointer uppercase p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 sticky top-24">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8">
              Summary
            </h2>

            <div className="space-y-6">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-zinc-500 uppercase tracking-tight">
                  Subtotal
                </span>
                <span className="font-black text-zinc-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-zinc-500 uppercase tracking-tight">
                  Shipping
                </span>
                <span className="text-emerald-600 font-black uppercase text-[10px] tracking-widest italic underline decoration-2 underline-offset-4">
                  Complimentary
                </span>
              </div>

              <div className="pt-6 border-t border-zinc-200 flex justify-between items-end">
                <span className="text-sm font-bold uppercase tracking-tight">
                  Total
                </span>
                <span className="text-3xl font-black tracking-tighter">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button className="w-full h-16 mt-10 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:-translate-y-1 transition-all cursor-pointer">
              Checkout Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 opacity-30 grayscale">
              <span className="text-[9px] font-black uppercase italic tracking-tighter">
                Visa
              </span>
              <span className="text-[9px] font-black uppercase italic tracking-tighter">
                Mastercard
              </span>
              <span className="text-[9px] font-black uppercase italic tracking-tighter">
                Apple Pay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
