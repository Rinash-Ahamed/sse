"use client";

import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import { categories, type CategorySlug } from "@/lib/products";

type FilterValue = CategorySlug | "all";

export default function ProductGridWithParams() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const normalizedCategory = requestedCategory === "concrete-vibration"
    ? "concrete-equipment"
    : requestedCategory;
  const category: FilterValue = categories.some(({ slug }) => slug === normalizedCategory)
    ? normalizedCategory as CategorySlug
    : "all";

  // Remount ProductGrid whenever the URL's category param changes, so the
  // selected category always reflects navigation (e.g. from the
  // homepage category grid) without syncing state inside an effect.
  return <ProductGrid key={category} initialCategory={category} />;
}
