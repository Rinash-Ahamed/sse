import type { Metadata } from "next";
import { Suspense } from "react";
import ProductGridWithParams from "@/components/products/ProductGridWithParams";
import CatalogDownload from "@/components/products/CatalogDownload";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Browse concrete, compaction, lifting, screening, cutting and site equipment from Shree Sanjay Equipments in Coimbatore.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
      <div className="grid items-end gap-7 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <SectionLabel>Equipment</SectionLabel>
          <h1 className="mt-4 font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
            Equipment
          </h1>
          <p className="mt-4 text-[15px] md:text-base text-ink-muted max-w-lg leading-relaxed">
            Browse equipment for concrete work, compaction, lifting, screening,
            cutting and everyday site tasks. Ask us for current prices and availability.
          </p>
        </div>
        <CatalogDownload />
      </div>

      <div className="mt-12">
        <Suspense fallback={null}>
          <ProductGridWithParams />
        </Suspense>
      </div>
    </div>
  );
}
