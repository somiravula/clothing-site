"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";

export const StockFilter = () => {
  const { inStock, setInStock } = useFilters();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => setInStock(!inStock)}
      className={cn(
        "h-10 w-full justify-start rounded-xl border px-3 text-sm font-semibold",
        inStock
          ? "border-cyan-500 bg-cyan-50 text-cyan-700"
          : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50",
      )}
    >
      <span
        className={cn(
          "mr-2 inline-flex h-4 w-4 items-center justify-center rounded border",
          inStock
            ? "border-cyan-500 bg-cyan-500 text-white"
            : "border-zinc-300",
        )}
      >
        {inStock ? <Check className="h-3 w-3" /> : null}
      </span>
      In stock only
    </Button>
  );
};
