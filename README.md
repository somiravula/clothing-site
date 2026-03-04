# Aura | Modern Clothing E-Commerce (2026)

A high-performance, frontend-first clothing storefront built with the **Next.js 15 App Router**. This project demonstrates senior-level architectural patterns, including stateless authentication, reactive URL state, and optimized client-side persistence.

---

## 🏗 Architectural Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.2+ | Utilizing React 19, Server Actions, and the Node.js Middleware runtime. |
| **Styling** | Tailwind CSS v4 | CSS-native engine (Rust-based) for zero-runtime overhead and instant builds. |
| **Auth** | Better Auth | Stateless JWT-based session management. No database required for this evaluation. |
| **State** | Zustand + nuqs | URL-synced filters for SEO/Shareability and Persisted storage for Cart logic. |
| **Data Fetching** | TanStack Query | Managed caching, automatic refetching, and robust error/loading state handling. |

---

## 🚀 Key Technical Decisions

### 1. Stateless Authentication (Better Auth)
Instead of a manual `js-cookie` implementation, we utilize **Better Auth** in stateless mode. This provides:
* **Security:** HttpOnly, Secure, and SameSite cookie management handled natively.
* **Developer Experience:** Full TypeScript safety for sessions without database overhead.

### 2. The "URL as Single Source of Truth"
Using `nuqs`, every filter interaction (price, brand, search) is mirrored in the URL. This allows users to share specific filtered views and ensures the UI remains consistent after a hard refresh.

### 3. Service Layer Abstraction
All data fetching is abstracted into a `src/services` layer. This simulates real-world API interactions, including artificial latency and random failure injection to demonstrate resilient UI error handling.

### 4. Optimized UI Components
* **Vaul:** Gesture-driven drawer for the cart to provide a mobile-native experience.
* **CVA (Class Variance Authority):** Type-safe UI primitives to prevent "prop-drilling" of styles.
* **Next.js Image:** Automatic WebP/AVIF optimization and lazy loading for high-res product photos.

---

## 📁 Folder Structure

Used the `src/` directory to separate infrastructure (configs) from application logic.
* `src/app`: Routes and global layouts.
* `src/components/features`: Domain-specific components (Cart, ProductGrid).
* `src/components/ui`: Shared atomic components (Button, Input).
* `src/hooks`: Custom logic hooks (useFilters).
* `src/store`: Client-side state (Zustand).

---

## 🛠 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install