"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { HeroBanner } from "@/components/features/home/hero-banner";
import { FilterAccordion } from "@/components/features/products/filter-accordion";
import { MobileFilters } from "@/components/features/products/mobile-filters";
import { ProductGrid } from "@/components/features/products/product-grid";
import { ProductSort } from "@/components/features/products/product-sort";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/use-get-products";
import { cn } from "@/lib/utils";

export default function ProductListingPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const { data, isLoading } = useGetProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />

      <div className="container mx-auto px-4 py-12">
        <MobileFilters />

        <div className="flex flex-col md:flex-row gap-12">
          <aside className="hidden md:block w-72 shrink-0">
            <div className="flex justify-between items-center mb-6 pb-4">
              <h2 className="font-bold uppercase tracking-widest text-xs">
                Filter
              </h2>
              <Button
                variant="ghost"
                className="text-[10px] font-bold text-cyan-500 uppercase"
              >
                Advanced
              </Button>
            </div>
            <FilterAccordion />
          </aside>

          <Separator className="bg-zinc-100" />

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              {/* <div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Clothing
                </h3>
                <p className="text-xs text-zinc-400 font-medium">
                  <div className="flex items-center gap-2">
                    {isLoading ? (
                      <div className="h-5 w-24 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                    ) : (
                      <span className="text-sm font-medium">
                        {(data?.length ?? 0) || 'No'} results found. 
                      </span>
                    )}
                  </div>
                </p>
              </div> */}

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center bg-zinc-100 p-1 rounded-xl shadow-inner">
                  <Button
                    onClick={() => setView("list")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      view === "list"
                        ? "text-cyan-500 bg-white"
                        : "text-zinc-400 bg-transparent",
                      "shadow-none",
                    )}
                  >
                    <List className="h-4 w-4 stroke-[2.5px]" />
                  </Button>
                  <Button
                    onClick={() => setView("grid")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      view === "grid"
                        ? "text-cyan-500 bg-white"
                        : "text-zinc-400 bg-transparent",
                      "shadow-none",
                    )}
                  >
                    <LayoutGrid className="h-4 w-4 stroke-[2.5px]" />
                  </Button>
                </div>

                <ProductSort />
              </div>
            </div>

            <ProductGrid view={view} />
          </main>
        </div>
      </div>
    </div>
  );
}
