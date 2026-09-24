import type { Metadata } from "next";
import { Suspense } from "react";
import ProductGridWithParams from "@/components/products/ProductGridWithParams";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Explore construction equipment, site machinery, compaction solutions and power tools from Shree Sanjay Equipments, Coimbatore.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
      <SectionLabel>Equipment</SectionLabel>
      <h1 className="mt-4 font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
        Equipment
      </h1>
      <p className="mt-4 text-[15px] md:text-base text-ink-muted max-w-lg leading-relaxed">
        Explore construction equipment, site machinery, compaction solutions
        and power tools.
      </p>

      <div className="mt-12">
        <Suspense fallback={null}>
          <ProductGridWithParams />
        </Suspense>
      </div>
    </div>
  );
}
