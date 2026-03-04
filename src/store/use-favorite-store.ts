import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoriteState {
  items: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (productId: string) => {
        const items = get().items;
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) });
        } else {
          set({ items: [...items, productId] });
        }
      },
      isFavorite: (productId: string) => get().items.includes(productId),
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: "clothing-favorites",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
