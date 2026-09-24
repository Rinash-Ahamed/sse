"use client";

import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import type { CategorySlug } from "@/lib/products";

type FilterValue = CategorySlug | "all";

export default function ProductGridWithParams() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const category = requestedCategory === "concrete-vibration"
    ? "concrete-equipment"
    : (requestedCategory as FilterValue) || "all";

  // Remount ProductGrid whenever the URL's category param changes, so the
  // filter chip selection always reflects navigation (e.g. from the
  // homepage category grid) without syncing state inside an effect.
  return <ProductGrid key={category} initialCategory={category} />;
}
