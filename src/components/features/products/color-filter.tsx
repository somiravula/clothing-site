"use client";

import { Button } from "@/components/ui/button";
import { COLOR_OPTIONS } from "@/constants/colors";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";

export const ColorFilter = () => {
  const { colors, setFilters } = useFilters();

  const onToggleColor = (color: string) => {
    const isSelected = colors.includes(color);
    const nextColors = isSelected
      ? colors.filter((c) => c !== color)
      : [...colors, color];

    setFilters({
      colors: nextColors,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {COLOR_OPTIONS.map((color) => {
        const active = colors.includes(color.value);

        return (
          <Button
            key={color.value}
            type="button"
            variant="ghost"
            onClick={() => onToggleColor(color.value)}
            className={cn(
              "h-9 w-9 rounded-full p-0 ring-2 ring-transparent transition",
              active && "ring-cyan-500",
            )}
            title={color.label}
            aria-label={color.label}
          >
            <span
              className={cn(
                "block h-7 w-7 rounded-full",
                "border" in color && color.border && "border border-zinc-200",
              )}
              style={{ backgroundColor: color.hex }}
            />
          </Button>
        );
      })}
    </div>
  );
};
