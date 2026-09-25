"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { products, categories, type CategorySlug } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import styles from "./ProductGrid.module.css";

type FilterValue = CategorySlug | "all";

const filters: { value: FilterValue; label: string; count: number }[] = [
  { value: "all", label: "All Equipment", count: products.length },
  ...categories.map((category) => ({
    value: category.slug,
    label: category.shortName,
    count: products.filter((product) => product.category === category.slug).length,
  })),
];

export default function ProductGrid({ initialCategory = "all" }: { initialCategory?: FilterValue }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>(initialCategory);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = filter === "all" || product.category === filter;
      const matchesQuery = !search ||
        product.name.toLowerCase().includes(search) ||
        product.shortDescription.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);
      return matchesCategory && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.topline}>
          <p className="label-mono text-[10px] font-semibold text-ink-muted">Equipment Index <span className="mx-2 text-accent">/</span> Select a category</p>
          <div className={styles.search}>
            <Search className="h-[18px] w-[18px] shrink-0 text-ink-muted" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search equipment"
              aria-label="Search equipment"
              className={styles.searchInput}
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className={styles.clear}><X className="h-4 w-4" aria-hidden="true" /></button>}
          </div>
        </div>
        <div className={styles.rail} role="group" aria-label="Filter equipment by category">
          {filters.map(({ value, label, count }, index) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={`${styles.option} ${filter === value ? styles.active : ""}`}
            >
              <span className={styles.optionIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.optionLabel}>{label}</span>
              <span className={styles.optionCount}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.resultBar} aria-live="polite">
        <p className="label-mono text-[10px] text-ink-muted">{filtered.length} {filtered.length === 1 ? "result" : "results"}</p>
        <span className={styles.resultLine} aria-hidden="true" />
        <p className="label-mono text-[10px] text-accent">{filters.find((item) => item.value === filter)?.label}</p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="border-b border-line py-20 text-center">
          <p className="font-heading text-xl font-semibold">No equipment found.</p>
          <p className="mt-2 text-sm text-ink-muted">Try a different search or category.</p>
          <button type="button" onClick={() => { setFilter("all"); setQuery(""); }} className="mt-5 border-b border-accent pb-1 text-sm font-medium text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Show all equipment</button>
        </div>
      )}
    </div>
  );
}
