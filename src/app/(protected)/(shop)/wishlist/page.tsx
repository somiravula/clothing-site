import { WishlistPageClient } from "@/components/features/wishlist/wishlist-page-client";
import { requireAuth } from "@/lib/auth-guard";

export default async function WishlistPage() {
  await requireAuth("/wishlist");
  return <WishlistPageClient />;
}
