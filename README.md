## Stella — Clothing E‑Commerce (Frontend)

Small Next.js demo storefront built for UI/feature work and experiments.

**Quick summary**

- **No backend**: the app uses in-repo mock data (`src/lib/mock-data.ts`).
- **Frameworks**: Next.js 15 (App Router), React 19, TypeScript.
- **URL state management**: `nuqs` (query state for filters/search/sort).
- **Client state**: `zustand` (cart + favorites persisted to localStorage).
- **Server state / fetching**: `@tanstack/react-query` used to fetch/cache product results (mocked).
- **UI/Design tooling**: `tailwind-merge`, `clsx`, `class-variance-authority` (CVA), Radix UI primitives, `lucide-react`, and `sonner` for toasts.
- **Code quality**: `biome` for linting + formatting.

**Important**: this repository is a frontend-only demo — no real backend or API is implemented.

**Project structure (high level)**

- `src/app` — Next App Router pages and layout
- `src/components` — UI atoms, primitives and feature components
- `src/hooks` — URL-driven filter hook and client helpers
- `src/store` — `zustand` stores (cart, favorites)
- `src/lib` — mock data + small utilities
- `src/services` — data access helpers (operate on mock data)

**Scripts**

- `pnpm dev` — run the dev server (Next dev with turbopack)
- `pnpm build` — production build (runs TypeScript checking as part of the build)
- `pnpm start` — start the built server
- `pnpm lint` — run Biome lint checks (`biome check`)
- `pnpm format` — autoformat/fix safe issues (`biome format --write`)
- `pnpm format:imports` — attempt to auto-fix import ordering / unused imports (uses Biome unsafe fixes)

Recommended manual typecheck (not added as an npm script):

```bash
pnpm tsc --noEmit
```

This will run TypeScript's compiler with `noEmit` and show any implicit `any` or type errors.

**Local development**

1. Install dependencies:

```bash
pnpm install
```

2. Start dev server:

```bash
pnpm dev
```

3. Use the UI to exercise product listing, filtering, sorting, add-to-cart and wishlist flows (all operate against in-memory/mock data).

**Notes / implementation details**

- Filters/search/sort are URL-driven using `nuqs` so the product listing is bookmarkable and shareable.
- Product queries are served from `src/services/product.service.ts` using the mock product set in `src/lib/mock-data.ts` — sorting and filtering are performed in that helper.
- Cart and favorites are in `src/store` and persisted to `localStorage` via `zustand`'s `persist` middleware.
- UI primitives (selects, sliders, sheets, accordions) are Radix-based components composed under `src/components/ui`.
- Formatting and linting use `biome`; run `pnpm format` then `pnpm lint` and fix remaining warnings manually as needed.

**Placeholders**


- Demo video (Desktop): [https://www.loom.com/share/1f0b601ec8d04bfb883ef2fdd81ea3a9](https://www.loom.com/share/1f0b601ec8d04bfb883ef2fdd81ea3a9)
- Demo video (Mobile): [https://www.loom.com/share/ce31a761dd7347f78f48022eb78bebbe](https://www.loom.com/share/ce31a761dd7347f78f48022eb78bebbe)


