import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";

/**
 * Custom hook to manage product filtering logic via URL parameters.
 * Uses 'nuqs' for type-safe, synchronized state.
 */
export const useFilters = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 300 }),
  );

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("featured"),
  );

  const [category, setCategory] = useQueryState("category", parseAsString);

  const [inStock, setInStock] = useQueryState(
    "stock",
    parseAsBoolean.withDefault(false),
  );

  const [brands, setBrands] = useQueryState(
    "brands",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [filters, setFilters] = useQueryStates(
    {
      sizes: parseAsArrayOf(parseAsString).withDefault([]),
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
    },
    {
      shallow: false,
    },
  );

  const clearFilters = () => {
    setSearch("");
    setCategory(null);
    setInStock(false);
    setBrands([]);
    setFilters({
      sizes: [],
      minPrice: null,
      maxPrice: null,
    });
    setSort("featured");
  };

  return {
    search,
    setSearch,
    sort,
    setSort,
    brands,
    setBrands,
    category,
    setCategory,
    inStock,
    setInStock,
    ...filters,
    setFilters,
    clearFilters,

    hasActiveFilters: Boolean(
      search || category || brands.length > 0 || filters.minPrice,
    ),
  };
};
