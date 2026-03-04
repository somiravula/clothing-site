'use client';

import { useQueryState } from 'nuqs';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from '../ui/button';

export const SearchBar = () => {
  // 1. Sync 'search' key in URL with the input value
  // shallow: false ensures it triggers a server-side re-render/refetch
  const [search, setSearch] = useQueryState('search', {
    shallow: false,
    throttleMs: 500, // Debounce: Wait 500ms after typing before updating URL
    clearOnDefault: true,
  });

  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative w-full max-w-[300px] group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors">
        <Search className={cn("h-4 w-4", isPending && "animate-pulse")} />
      </div>
      
      <Input
        placeholder="Search products..."
        value={search || ''}
        onChange={(e) => {
          startTransition(() => {
            setSearch(e.target.value || null);
          });
        }}
        className="pl-10 pr-10 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-black transition-all"
      />

      {search && (
        <Button
          onClick={() => setSearch(null)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};