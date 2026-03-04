"use client";

import { useFilters } from "@/hooks/use-filters";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

// Mock data for filter options - in a real app, these might come from an API
const CATEGORIES = [
  { label: "All Tops", value: "tops" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Accessories", value: "accessories" },
];

const BRANDS = [
  "Aura Essentials",
  "Indigo Co.",
  "Aura Performance",
  "Urban Loft",
];

export const FilterSidebar = () => {
  const {
    category,
    setCategory,
    brands,
    setFilters,
    inStock,
    setInStock,
    clearFilters,
    hasActiveFilters,
  } = useFilters();

  const toggleBrand = (brand: string) => {
    const nextBrands = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand];
    setFilters({ brands: nextBrands });
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Clear Action */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Filters
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* 2. Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase">
          Category
        </h4>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.value}
              onClick={() =>
                setCategory(cat.value === category ? null : cat.value)
              }
              className={`text-left text-sm transition-colors hover:text-black ${
                category === cat.value
                  ? "font-bold text-black"
                  : "text-muted-foreground"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 3. Brand Multi-select */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase">
          Brands
        </h4>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((brand) => {
            const isActive = brands.includes(brand);
            return (
              <Badge
                key={brand}
                variant={isActive ? "default" : "outline"}
                className="cursor-pointer px-3 py-1"
                onClick={() => toggleBrand(brand)}
              >
                {brand}
                {isActive && <X className="ml-1 h-3 w-3" />}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* 4. Availability Toggle */}
      <div className="pt-4 border-t">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-black"
          />
          <span className="text-sm font-medium">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};
