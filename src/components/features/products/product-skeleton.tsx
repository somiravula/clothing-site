import { cn } from "@/lib/utils";

// Base Skeleton animation component
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
      {/* 1. Image Placeholder */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* 2. Content Placeholder */}
      <div className="flex flex-col p-4 space-y-3">
        {/* Brand & Rating Row */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>

        {/* Title */}
        <Skeleton className="h-4 w-3/4" />

        {/* Price & Button Row */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
};
