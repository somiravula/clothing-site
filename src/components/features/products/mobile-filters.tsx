"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceRangeSelector } from "@/components/ui/price-range-selector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFilters } from "@/hooks/use-filters";
import { BrandList } from "./brand-list";
import { ColorFilter } from "./color-filter";
import { SizeFilter } from "./size-filter";
import { StockFilter } from "./stock-filter";

export const MobileFilters = () => {
  const { clearFilters } = useFilters();

  return (
    <div className="mb-4 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex h-12 w-full items-center justify-between rounded-full border-zinc-200"
          >
            <span className="text-sm font-bold">Filters</span>
            <Filter className="h-4 w-4 text-zinc-500" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="border-b pb-4 text-left">
            <SheetTitle className="text-xl font-black uppercase tracking-tight">
              Filters
              <div>
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="cursor-pointer gap-2 p-0 text-[10px] font-black uppercase tracking-widest text-zinc-400 transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="h-full overflow-y-auto pb-20 py-6">
            <div className="mb-8">
              <h3 className="mb-4 px-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                Availability
              </h3>
              <StockFilter />
            </div>

            <Separator className="bg-zinc-100" />

            <div className="my-8">
              <h3 className="mb-4 px-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                Brands
              </h3>
              <BrandList />
            </div>

            <Separator className="bg-zinc-100" />

            <div className="my-8">
              <h3 className="mb-4 px-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                Size
              </h3>
              <SizeFilter />
            </div>

            <Separator className="bg-zinc-100" />

            <div className="my-8">
              <h3 className="mb-4 px-1 text-xs font-black uppercase tracking-widest text-zinc-400">
                Color
              </h3>
              <ColorFilter />
            </div>

            <Separator className="bg-zinc-100" />

            <div className="mt-8">
              <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Price Range
              </h3>
              <PriceRangeSelector />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
