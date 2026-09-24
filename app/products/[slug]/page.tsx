import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductBySlug, products, priceLabel } from "@/lib/products";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductCard from "@/components/products/ProductCard";
import { products as allProducts } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? product.shortDescription,
    brand: {
      "@type": "Brand",
      name: product.brand ?? "Shree Sanjay Equipments",
    },
    ...(product.priceStatus === "confirmed" && product.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.shreesanjayequipments.com/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://www.shreesanjayequipments.com/products" },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20 pb-28 md:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        <div className="md:col-span-7">
          <ProductGallery key={product.slug} category={product.category} name={product.name} images={product.images} />
        </div>
        <div className="md:col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7 space-y-12">
          {product.description && (
            <section>
              <h2 className="label-mono text-[11px] text-ink-muted mb-3">Overview</h2>
              <p className="text-[15px] leading-relaxed text-ink">{product.description}</p>
            </section>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <section>
              <h2 className="label-mono text-[11px] text-ink-muted mb-3">Technical Specifications</h2>
              <dl className="border-t border-line">
                {product.specifications.map((s) => (
                  <div key={s.label} className="flex justify-between py-3 border-b border-line text-sm">
                    <dt className="text-ink-muted">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {product.features && product.features.length > 0 && (
            <section>
              <h2 className="label-mono text-[11px] text-ink-muted mb-3">Features</h2>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.applications && product.applications.length > 0 && (
            <section>
              <h2 className="label-mono text-[11px] text-ink-muted mb-3">Applications</h2>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((a) => (
                  <span key={a} className="border border-line px-3 py-1.5 text-xs text-ink-muted">
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="border border-line p-6 md:p-8 bg-surface">
            <p className="font-heading font-semibold text-lg tracking-tight">
              Interested in the {product.name}?
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              {priceLabel(product)}. Reach out for full details and current
              availability.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium border-b border-ink pb-0.5"
            >
              Send an Enquiry
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 md:mt-28 border-t border-line pt-14">
          <h2 className="font-heading font-bold text-2xl tracking-tight mb-8">Related Equipment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
