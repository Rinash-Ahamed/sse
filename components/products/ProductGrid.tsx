"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, categories, type CategorySlug } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

type FilterValue = CategorySlug | "all";

export default function ProductGrid({ initialCategory = "all" }: { initialCategory?: FilterValue }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>(initialCategory);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "all" || p.category === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by equipment name"
            aria-label="Search equipment"
            className="w-full border-b border-line bg-transparent py-2.5 pl-7 text-sm outline-none placeholder:text-ink-muted focus:border-ink transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip label="All" active={filter === "all"} onClick={() => setFilter("all")} />
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              label={c.shortName}
              active={filter === c.slug}
              onClick={() => setFilter(c.slug)}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-muted label-mono">
        {filtered.length} {filtered.length === 1 ? "RESULT" : "RESULTS"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <p className="text-sm text-ink-muted">
            No equipment found.
            <br />
            Try a different name or category.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3.5 py-1.5 text-[12.5px] font-medium border transition-colors whitespace-nowrap",
        active
          ? "bg-accent text-white border-accent"
          : "border-line text-ink-muted hover:border-ink/40 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
