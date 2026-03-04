"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { useFilters } from "@/hooks/use-filters";
import { useGetProducts } from "@/hooks/use-get-products";
import { cn } from "@/lib/utils";

export const PriceRangeSelector = () => {
  const { minPrice, maxPrice, setFilters } = useFilters();
  const { data: products } = useGetProducts();

  const MAX_LIMIT = 500;
  const BUCKET_COUNT = 15;
  const BUCKET_SIZE = MAX_LIMIT / BUCKET_COUNT;

  const initialMin = typeof minPrice === "number" ? minPrice : 0;
  const initialMax = typeof maxPrice === "number" ? maxPrice : MAX_LIMIT;

  const [displayValues, setDisplayValues] = React.useState<number[]>([
    initialMin,
    initialMax,
  ]);

  React.useEffect(() => {
    setDisplayValues([initialMin, initialMax]);
  }, [initialMin, initialMax]);

  const histogramData = React.useMemo(() => {
    if (!products || products.length === 0) return Array(BUCKET_COUNT).fill(10);
    const counts = Array(BUCKET_COUNT).fill(0);
    products.forEach((p) => {
      const idx = Math.min(Math.floor(p.price / BUCKET_SIZE), BUCKET_COUNT - 1);
      counts[idx]++;
    });
    const maxCount = Math.max(...counts);
    return counts.map((c) => (c / maxCount) * 100);
  }, [products, BUCKET_SIZE]);

  return (
    <div className="space-y-6 pt-2">
      <div className="flex items-end justify-between h-12 w-full gap-1 px-1">
        {histogramData.map((height, i) => {
          const bucketStart = i * BUCKET_SIZE;
          const isActive =
            bucketStart >= displayValues[0] && bucketStart < displayValues[1];
          return (
            <button
              key={`${Math.floor(bucketStart)}-${Math.floor(bucketStart + BUCKET_SIZE)}`}
              type="button"
              onClick={() => {
                const range = [
                  Math.floor(bucketStart),
                  Math.floor(bucketStart + BUCKET_SIZE),
                ];
                setDisplayValues(range);
                setFilters({ minPrice: range[0], maxPrice: range[1] });
              }}
              className={cn(
                "flex-1 rounded-t-sm transition-colors duration-200 cursor-pointer outline-none",
                isActive ? "bg-cyan-500" : "bg-zinc-200",
              )}
              style={{ height: `${Math.max(height, 8)}%` }}
            />
          );
        })}
      </div>
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={displayValues}
        max={MAX_LIMIT}
        min={0}
        step={1}
        onValueChange={(vals) => setDisplayValues(vals)}
        onValueCommit={(vals) =>
          setFilters({ minPrice: vals[0], maxPrice: vals[1] })
        }
      >
        <SliderPrimitive.Track className="bg-zinc-100 relative grow rounded-full h-[2px]">
          <SliderPrimitive.Range className="absolute bg-cyan-500 rounded-full h-full" />
        </SliderPrimitive.Track>
        {displayValues.map((value) => (
          <SliderPrimitive.Thumb
            key={`${value}`}
            className="block w-4 h-4 bg-white border-2 border-cyan-500 rounded-full focus:outline-none transition-transform cursor-pointer shadow-md hover:scale-110 active:scale-125"
          />
        ))}
      </SliderPrimitive.Root>

      <div className="flex items-center gap-3">
        {[
          { label: "Min Price", id: "min-price-input", idx: 0 },
          { label: "Max Price", id: "max-price-input", idx: 1 },
        ].map((input) => (
          <div key={input.id} className="flex-1">
            <label
              htmlFor={input.id}
              className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-1.5 block cursor-pointer"
            >
              {input.label}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                $
              </span>
              <input
                id={input.id}
                type="number"
                value={displayValues[input.idx]}
                className="w-full h-10 rounded-xl border border-zinc-100 bg-zinc-50/50 pl-7 pr-2 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const nextValues = [...displayValues];
                  nextValues[input.idx] = val;
                  setDisplayValues(nextValues);
                  setFilters({
                    minPrice: nextValues[0],
                    maxPrice: nextValues[1],
                  });
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
