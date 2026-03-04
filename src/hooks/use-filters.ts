import {
  useQueryState,
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs";

/**
 * Custom hook to manage product filtering logic via URL parameters.
 * Uses 'nuqs' for type-safe, synchronized state.
 */
export const useFilters = () => {
  // 1. Define individual states with specialized parsers
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 300 }),
  );

  const [category, setCategory] = useQueryState("category", parseAsString);

  const [inStock, setInStock] = useQueryState(
    "stock",
    parseAsBoolean.withDefault(false),
  );

  // 2. Define groupable states (Multi-select filters)
  const [filters, setFilters] = useQueryStates(
    {
      brands: parseAsArrayOf(parseAsString).withDefault([]),
      sizes: parseAsArrayOf(parseAsString).withDefault([]),
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
    },
    {
      shallow: false, // Ensures Server Components re-run when these change
    },
  );

  // 3. Helper to clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory(null);
    setInStock(false);
    setFilters({
      brands: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
    });
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    inStock,
    setInStock,
    ...filters,
    setFilters,
    clearFilters,
    // Derived state for the UI
    hasActiveFilters: Boolean(
      search || category || filters.brands.length > 0 || filters.minPrice,
    ),
  };
};
