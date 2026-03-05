import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";

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
      colors: parseAsArrayOf(parseAsString).withDefault([]),
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
      colors: [],
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
      search ||
        category ||
        inStock ||
        brands.length > 0 ||
        filters.sizes.length > 0 ||
        filters.colors.length > 0 ||
        filters.minPrice != null ||
        filters.maxPrice != null,
    ),
  };
};
