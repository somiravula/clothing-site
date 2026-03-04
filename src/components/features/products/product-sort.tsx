"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/hooks/use-filters";
import { sortOptions } from "@/lib/utils";

export const ProductSort = () => {
  const { sort, setSort } = useFilters();

  return (
    <Select
      value={sort || "featured"}
      onValueChange={(v: string) => setSort(v)}
    >
      <SelectTrigger className="w-[180px] h-10 border-zinc-200 bg-white rounded-full px-4 text-xs font-bold uppercase tracking-wider">
        <span className="text-zinc-400 mr-2 font-normal">Sort by:</span>
        <SelectValue placeholder={sort || "Featured"} />
      </SelectTrigger>

      <SelectContent className="bg-white border-zinc-100 shadow-xl z-[60] min-w-[200px] rounded-xl overflow-hidden">
        {sortOptions().map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="py-3 text-xs font-bold uppercase cursor-pointer focus:bg-zinc-50"
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
