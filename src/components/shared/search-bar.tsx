"use client";

import { Search } from "lucide-react";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useFilters } from "@/hooks/use-filters";

export const SearchBar = () => {
  const { search, setSearch } = useFilters();

  const [_isPending, startTransition] = useTransition();

  return (
    <div className="relative w-full max-w-[300px] group">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 z-10 pointer-events-none" />
        <Input
          placeholder="What are you looking for?"
          value={search || ""}
          onChange={(e) => {
            startTransition(() => {
              setSearch(e.target.value || null);
            });
          }}
          className="w-full h-12 pl-12 pr-4 rounded-xl border-zinc-100 bg-white shadow-sm placeholder:text-zinc-400 focus-visible:ring-zinc-200 transition-all"
        />
      </div>
    </div>
  );
};
