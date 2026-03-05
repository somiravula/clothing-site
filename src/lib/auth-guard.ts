import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type UserRole } from "@/lib/auth";

const ROLE_LEVEL: Record<UserRole, number> = {
  user: 1,
  admin: 2,
};

const ADMIN_EMAILS = new Set(
  (process.env.AUTH_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);

const getDefaultCallbackUrl = async () => {
  const h = await headers();
  const pathname = h.get("x-pathname") || "/products";
  const search = h.get("x-search") || "";
  return `${pathname}${search}`;
};

const getEffectiveRole = (
  session: Awaited<ReturnType<typeof getServerSession>>,
) => {
  if (!session) {
    return "user" as const;
  }

  const email = session.user.email.toLowerCase();
  if (ADMIN_EMAILS.has(email)) {
    return "admin" as const;
  }

  return (session.user.role as UserRole | undefined) ?? "user";
};

export const getServerSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const requireAuth = async (callbackUrl?: string) => {
  const session = await getServerSession();

  if (!session) {
    const resolvedCallback = callbackUrl || (await getDefaultCallbackUrl());
    const encodedCallback = encodeURIComponent(resolvedCallback || "/products");
    redirect(`/login?callbackUrl=${encodedCallback}`);
  }

  return session;
};

export const requireRole = async (role: UserRole, callbackUrl?: string) => {
  const session = await requireAuth(callbackUrl);
  const userRole = getEffectiveRole(session);

  if (ROLE_LEVEL[userRole] < ROLE_LEVEL[role]) {
    redirect("/products");
  }

  return session;
};
