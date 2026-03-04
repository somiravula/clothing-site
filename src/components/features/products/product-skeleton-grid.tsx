import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`${i * 1}`} className="space-y-4">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl bg-zinc-100" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3 bg-zinc-100" />
            <Skeleton className="h-4 w-1/2 bg-zinc-100" />
            <Skeleton className="h-6 w-1/4 bg-zinc-100 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
};
