import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["italic", "normal"],
});

export const metadata = {
  title: "Stella | Premium Fashion 2026",
  description: "High-performance editorial e-commerce experience.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "scroll-smooth antialiased",
        inter.variable,
        playfair.variable,
      )}
    >
      <body className="min-h-screen bg-white font-sans text-zinc-950">
        <Providers>
          {children}
          <Toaster position="bottom-right" expand={false} richColors />
        </Providers>
      </body>
    </html>
  );
}
