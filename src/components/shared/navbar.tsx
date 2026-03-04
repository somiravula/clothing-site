import { SearchBar } from "./search-bar";
import Link from "next/link";
import { CartDrawer } from "@/components/features/cart/cart-drawer";
import { UserNav } from "./user-nav";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="text-xl font-black tracking-tighter">AURA</Link>
        
        {/* The Search Bar takes center stage */}
        <div className="hidden md:flex flex-1 justify-center">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};