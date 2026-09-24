import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealHeading } from "@/components/ui/RevealText";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Featured Equipment</SectionLabel>
            <RevealHeading
              as="h2"
              className="mt-4 font-heading font-extrabold text-3xl md:text-5xl tracking-tight"
            >
              Explore our equipment
            </RevealHeading>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-[13px] font-medium border-b border-ink pb-0.5"
          >
            View all equipment
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
