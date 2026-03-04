'use client';

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/hooks/use-filters";

export const ClearFilters = () => {
  const { clearFilters } = useFilters();

  const resetFilters = () => {
    clearFilters();
  };

  return (
    <Button
      onClick={resetFilters}
      className="rounded-full bg-zinc-900 px-8 py-6 text-sm font-bold hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-500/10"
    >
      <RotateCcw className="mr-2 h-4 w-4" />
      Clear All Filters
    </Button>
  );
};
