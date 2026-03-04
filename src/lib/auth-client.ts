import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // In 2026, Better Auth detects your base URL automatically,
  // but we can be explicit for reliability.
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});
