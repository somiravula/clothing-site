"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export const LayoutToggle = ({ view, onViewChange }: LayoutToggleProps) => {
  return (
    <div className="flex items-center bg-zinc-100 p-1 rounded-xl w-fit">
      <Button
        onClick={() => onViewChange("list")}
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          view === "list"
            ? "bg-white text-black shadow-sm"
            : "text-zinc-400 hover:text-zinc-600",
        )}
      >
        <List className="h-5 w-5 stroke-[2.5px]" />
      </Button>

      <Button
        onClick={() => onViewChange("grid")}
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          view === "grid"
            ? "bg-white text-[#4FB8D1] shadow-sm"
            : "text-zinc-400 hover:text-zinc-600",
        )}
      >
        <LayoutGrid className="h-5 w-5 stroke-[2.5px]" />
      </Button>
    </div>
  );
};
