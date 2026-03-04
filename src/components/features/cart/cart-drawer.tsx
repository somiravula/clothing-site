"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"; // Using Radix/Shadcn Sheet for the Drawer
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const CartDrawer = () => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5 text-foreground" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* 1. Explicit Background and Border for visibility */}
      <SheetContent className="flex w-full flex-col bg-background border-l shadow-xl sm:max-w-lg">
        <SheetHeader className="px-1 border-b pb-4">
          <SheetTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
            Shopping Bag
            <span className="text-sm font-normal text-muted-foreground">
              ({itemCount} items)
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* 2. Scrollable Item Area */}
        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">
                Your bag is empty
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4"
                >
                  <div className="relative h-20 w-20 flex-none rounded-lg overflow-hidden border bg-muted">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold leading-none text-foreground">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.selectedSize}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground">
                        ${item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md h-8 px-1 bg-muted/20">
                        <Button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              item.selectedSize,
                            )
                          }
                          className="p-1 hover:text-black transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 text-xs font-bold">
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
                          className="p-1 hover:text-black transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        onClick={() => removeItem(item.id, item.selectedSize)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Footer with Subtotal (Fixed at bottom) */}
        {items.length > 0 && (
          <SheetFooter className="border-t pt-6">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-foreground">Subtotal</span>
                <span className="text-foreground">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Link href="/cart" className="w-full block">
                <Button
                  className="w-full py-6 text-base font-bold"
                  variant="default"
                >
                  View Full Cart
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
