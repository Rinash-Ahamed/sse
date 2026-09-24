"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import type { Product } from "@/lib/products";
import { priceLabel, getCategoryBySlug } from "@/lib/products";
import { productWhatsAppLink } from "@/lib/whatsapp";

export default function ProductInfo({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.category);
  const [showBar, setShowBar] = useState(false);
  const url = `/products/${product.slug}`;
  const waLink = productWhatsAppLink(product.name, url);

  useEffect(() => {
    const titleEl = document.getElementById("product-title");
    if (!titleEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" },
    );
    observer.observe(titleEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="md:sticky md:top-24">
      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-ink">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-ink">
          {category?.name}
        </Link>
      </nav>

      <p className="label-mono text-[11px] text-accent mt-5">{category?.name}</p>
      <h1 id="product-title" className="mt-2 font-heading font-extrabold text-3xl md:text-4xl tracking-tight">
        {product.name}
      </h1>
      <p className="mt-3 text-[15px] text-ink-muted leading-relaxed">{product.shortDescription}</p>

      <p className="mt-6 text-xl font-semibold">{priceLabel(product)}</p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent hover:bg-accent-strong text-white px-6 py-3.5 text-[13px] font-medium transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4" />
          Ask for price on WhatsApp
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-steel/50 hover:bg-surface px-6 py-3.5 text-[13px] font-medium transition-transform hover:-translate-y-0.5"
        >
          <Mail className="h-4 w-4" />
          Send an enquiry
        </Link>
      </div>

      {/* Mobile sticky CTA bar */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur px-4 py-3 flex items-center gap-3 transition-transform duration-300 ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-ink-muted truncate">{priceLabel(product)}</p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-accent hover:bg-accent-strong text-white px-4 py-2.5 text-[12.5px] font-medium shrink-0"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
