import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { requireAuth } from "@/lib/auth-guard";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
