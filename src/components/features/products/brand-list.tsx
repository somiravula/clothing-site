"use client";

import { Check, Search } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRANDS } from "@/constants/brands";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";

export const BrandList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { brands, setBrands } = useFilters();

  const filteredBrands = BRANDS.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (brandName: string) => {
    const isSelected = brands.includes(brandName);
    const nextBrands = isSelected
      ? brands.filter((b) => b !== brandName)
      : [...brands, brandName];

    setBrands(nextBrands.length ? nextBrands : []);
  };

  return (
    <div className="flex flex-col gap-y-1 pt-1">
      <div className="relative mb-4 px-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
        <Input
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9 pl-9 text-xs bg-zinc-50 border-none rounded-lg focus-visible:ring-1 focus-visible:ring-zinc-200 placeholder:text-zinc-400 shadow-none"
        />
      </div>

      <div className="flex flex-col gap-y-0.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-200">
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => {
            const isActive = brands.includes(brand.name);

            return (
              <Button
                key={brand.name}
                variant="ghost"
                onClick={() => handleSelect(brand.name)}
                className={cn(
                  "w-full justify-start h-auto py-2 px-2 hover:bg-zinc-50 transition-all rounded-md",
                  isActive ? "bg-zinc-50/50" : "bg-transparent",
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "relative h-6 w-10 transition-opacity",
                        isActive ? "opacity-100" : "opacity-60",
                      )}
                    >
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={cn(
                          "text-sm transition-colors",
                          isActive
                            ? "font-semibold text-zinc-900"
                            : "text-zinc-500",
                        )}
                      >
                        {brand.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium tabular-nums">
                        {brand.count}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <Check className="h-4 w-4 text-[#52B6D3] stroke-[3px] shrink-0" />
                  )}
                </div>
              </Button>
            );
          })
        ) : (
          <p className="text-[10px] text-zinc-400 text-center py-4">
            No brands match your search.
          </p>
        )}
      </div>
    </div>
  );
};
