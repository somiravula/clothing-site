import { ProductGrid } from "@/components/features/products/product-grid";
import { FilterSidebar } from "@/components/features/products/filter-sidebar";

export default function ProductListingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar - Desktop (hidden on mobile for now) */}
        <aside className="hidden w-64 shrink-0 md:block">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
}
