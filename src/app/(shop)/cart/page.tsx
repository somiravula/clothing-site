"use client";

import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();

  // 1. Empty State - High Visibility
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your cart is empty
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet. Explore our
          latest arrivals to get started.
        </p>
        <Link href="/products">
          <Button size="lg" className="rounded-full px-8">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-background min-h-[80vh]">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-10">
        Shopping Cart{" "}
        <span className="text-muted-foreground font-normal">
          ({items.length})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* --- LEFT: Item List (8 Cols) --- */}
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              className="flex flex-col sm:flex-row gap-6 p-6 border rounded-2xl bg-white shadow-sm transition-hover hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative h-32 w-32 flex-none rounded-xl overflow-hidden bg-muted border">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-foreground leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mt-1">
                      {item.brand} • Size:{" "}
                      <span className="text-foreground">
                        {item.selectedSize}
                      </span>
                    </p>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  {/* Quantity Toggle */}
                  <div className="flex items-center border rounded-full bg-muted/30 p-1">
                    <Button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1,
                          item.selectedSize,
                        )
                      }
                      className="p-1.5 hover:bg-white rounded-full transition-all disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 text-sm font-bold w-10 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1,
                          item.selectedSize,
                        )
                      }
                      className="p-1.5 hover:bg-white rounded-full transition-all"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    onClick={() => removeItem(item.id, item.selectedSize)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    REMOVE
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- RIGHT: Summary (4 Cols) --- */}
        <div className="lg:col-span-4">
          <div className="p-8 border rounded-2xl bg-zinc-50/50 sticky top-24 space-y-6">
            <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Shipping</span>
                <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest bg-emerald-50 px-2 py-0.5 rounded">
                  Free
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span className="text-foreground font-medium">$0.00</span>
              </div>

              <div className="border-t border-dashed pt-4 flex justify-between text-xl font-black text-foreground">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full h-14 rounded-full text-lg font-bold shadow-lg shadow-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="pt-4 flex items-center justify-center gap-4 grayscale opacity-50">
              <span className="text-[10px] font-bold tracking-tighter text-muted-foreground uppercase italic">
                Visa
              </span>
              <span className="text-[10px] font-bold tracking-tighter text-muted-foreground uppercase italic">
                Mastercard
              </span>
              <span className="text-[10px] font-bold tracking-tighter text-muted-foreground uppercase italic">
                Apple Pay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
