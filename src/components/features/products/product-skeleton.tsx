import { cn } from "@/lib/utils";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary/50", className)}
      {...props}
    />
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-background p-0">
      <Skeleton className="aspect-square w-full rounded-none" />

      <div className="flex flex-col p-4 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>

        <Skeleton className="h-4 w-3/4" />

        <div className="mt-auto flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
};
