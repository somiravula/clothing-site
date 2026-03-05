"use client";

import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";

const SIZE_OPTIONS = ["XXS", "XS", "S", "M", "L", "XL", "XXL"] as const;

export const SizeFilter = () => {
  const { sizes, setFilters } = useFilters();

  const onToggleSize = (size: string) => {
    const isSelected = sizes.includes(size);
    const nextSizes = isSelected
      ? sizes.filter((s) => s !== size)
      : [...sizes, size];

    setFilters({
      sizes: nextSizes,
    });
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {SIZE_OPTIONS.map((size) => {
        const active = sizes.includes(size);

        return (
          <Button
            key={size}
            type="button"
            variant="ghost"
            onClick={() => onToggleSize(size)}
            className={cn(
              "h-11 rounded-xl border text-sm font-semibold",
              active
                ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
            )}
          >
            {size}
          </Button>
        );
      })}
    </div>
  );
};
