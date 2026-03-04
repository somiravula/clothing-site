import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id && item.selectedSize === size,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id && item.selectedSize === size
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...currentItems,
              { ...product, quantity: 1, selectedSize: size },
            ],
          });
        }
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === productId && item.selectedSize === size),
          ),
        });
      },

      updateQuantity: (productId, quantity, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity }
              : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "clothing-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
