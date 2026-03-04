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

export const MobileFilters = () => {
  const { clearFilters } = useFilters();
  return (
    <div className="lg:hidden mb-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-between rounded-full h-12 border-zinc-200"
          >
            <span className="text-sm font-bold">Filters</span>
            <Filter className="h-4 w-4 text-zinc-500" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader className="text-left border-b pb-4">
            <SheetTitle className="text-xl font-black uppercase tracking-tight">
              Filters
              <div>
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-400 hover:text-red-500 transition-colors cursor-pointer uppercase p-0"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="py-6 overflow-y-auto h-full pb-20">
            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 px-1">
                Brands
              </h3>
              <BrandList />
            </div>
            <Separator className="bg-zinc-100" />
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">
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
