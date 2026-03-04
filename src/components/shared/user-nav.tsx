"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

// Mock User Data Structure (Matches Better Auth Session)
const MOCK_USER = {
  id: "user_2026_aura",
  name: "Alex Designer",
  email: "alex@aura-apparel.com",
  image: "https://i.pravatar.cc/150?u=aura",
};

export const UserNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate network delay for a "Pro" feel
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      toast.success("Logged in as Alex Designer", {
        description: "Mock Session started successfully.",
      });
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info("Logged out", {
      description: "Session cleared from local state.",
    });
  };

  // --- 1. Logged In State ---
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex flex-col items-end hidden md:flex">
          <span className="text-xs font-bold leading-none">
            {MOCK_USER.name}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {MOCK_USER.email}
          </span>
        </div>

        <div className="h-8 w-8 rounded-full border bg-secondary overflow-hidden">
          <img
            src={MOCK_USER.image}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // --- 2. Logged Out State ---
  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleLogin}
      disabled={isLoading}
      className="min-w-[80px]"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <User className="h-4 w-4 mr-2" />
          Login
        </>
      )}
    </Button>
  );
};
