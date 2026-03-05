import { requireRole } from "@/lib/auth-guard";

export default async function AdminPage() {
  const session = await requireRole("admin", "/admin");

  return (
    <main className="container mx-auto px-4 py-16">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
        Authorization Verified
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight">Admin Console</h1>
      <p className="mt-4 max-w-2xl text-zinc-600">
        Signed in as <span className="font-bold">{session.user.email}</span>{" "}
        with role{" "}
        <span className="font-bold">{String(session.user.role ?? "user")}</span>
        .
      </p>
    </main>
  );
}
