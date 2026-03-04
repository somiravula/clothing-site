import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

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
          <div className="relative flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">{children}</main>
          </div>

          <Toaster position="bottom-right" expand={false} richColors />
        </Providers>
      </body>
    </html>
  );
}
