"use client";

import { SearchX, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";
import { ClearFilters } from "./clear-filters";

export const EmptyState = () => {
  const { search } = useFilters();

  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 animate-in fade-in zoom-in-95 duration-500">
      {/* 1. Glassmorphic Icon Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-100/50 blur-3xl rounded-full" />
        <div className="relative h-24 w-24 rounded-[32px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-white flex items-center justify-center">
          <SearchX className="h-10 w-10 text-cyan-500" strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-rose-50 border-4 border-white flex items-center justify-center shadow-sm">
          <ShoppingBag className="h-4 w-4 text-rose-500" />
        </div>
      </div>

      {/* 2. High-Contrast Typography */}
      <div className="text-center max-w-sm space-y-3">
        <h3 className="text-2xl font-black tracking-tight text-zinc-900">
          No matches found
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed">
          We couldn't find anything for{" "}
          <span className="font-bold text-zinc-800">
            "{search || "these filters"}"
          </span>
          . Try adjusting your filters or search for something more general.
        </p>
      </div>

      {/* 3. Action Island */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <ClearFilters />

        <Button
          variant="outline"
          className="rounded-full border-zinc-200 px-8 py-6 text-sm font-bold hover:bg-zinc-50 transition-all"
        >
          Contact Support
        </Button>
      </div>

      {/* 4. Subtle Hint */}
      <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">
        Stella Curated Apparel
      </p>
    </div>
  );
};
