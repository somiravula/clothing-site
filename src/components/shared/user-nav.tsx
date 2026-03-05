"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Loader2, LogOut, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilters } from "@/hooks/use-filters";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";
import { useFavoriteStore } from "@/store/use-favorite-store";
import { Button } from "../ui/button";

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0]?.slice(0, 2).toUpperCase() || "US";
  }
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
};

export const UserNav = () => {
  const { data: session, isPending } = useSession();
  const isLoggedIn = Boolean(session);
  const { clearFavorites } = useFavoriteStore();
  const { clearCart } = useCartStore();
  const { clearFilters } = useFilters();
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();

  const displayName = session?.user.name || "User";
  const displayEmail = session?.user.email || "";
  const displayImage = session?.user.image || "";
  const initials = getInitials(displayName);

  const handleAuthAction = () => {
    const callbackUrl = encodeURIComponent(pathname || "/products");
    router.push(`/login?callbackUrl=${callbackUrl}`);
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.info("Logged out", {
            description: "Come back soon!",
          });
          clearFavorites();
          clearCart();
          clearFilters();
          queryClient.clear();
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "flex items-center gap-2 outline-none group h-10 px-2",
            "bg-transparent hover:bg-zinc-100 text-black shadow-none border-none transition-all",
            "focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          )}
        >
          {isLoggedIn ? (
            <Avatar className="h-8 w-8 border-2 border-transparent group-hover:border-cyan-500 transition-all">
              <AvatarImage src={displayImage} alt={displayName} />
              <AvatarFallback className="bg-cyan-500 text-white text-[10px] font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200">
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
              ) : (
                <User className="h-4 w-4 text-zinc-600" />
              )}
            </div>
          )}

          {isLoggedIn && (
            <span className="hidden md:block text-sm font-bold truncate max-w-[140px]">
              {displayName.split(" ")[0]}
            </span>
          )}

          <ChevronDown className="h-3 w-3 text-zinc-400" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-72 p-2 rounded-[24px] border-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95"
      >
        {isLoggedIn ? (
          <>
            <div className="px-4 py-4 mb-2 bg-zinc-50 rounded-[20px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                Welcome Back!
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-zinc-900 leading-none">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {displayEmail}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-zinc-50 outline-none border-none">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-bold">Settings</span>
              </DropdownMenuItem>

              <div className="my-2 border-t border-zinc-100 mx-2" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-rose-500 hover:bg-rose-50 transition-all outline-none border-none"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-bold">Sign Out</span>
              </DropdownMenuItem>
            </div>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Account
            </DropdownMenuLabel>
            <div className="space-y-1">
              <DropdownMenuItem
                onClick={handleAuthAction}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-cyan-50 text-cyan-600 outline-none border-none"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-bold">Log In</span>
              </DropdownMenuItem>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
