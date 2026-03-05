import { CartPageClient } from "@/components/features/cart/cart-page-client";
import { requireAuth } from "@/lib/auth-guard";

export default async function CartPage() {
  await requireAuth("/cart");
  return <CartPageClient />;
}
