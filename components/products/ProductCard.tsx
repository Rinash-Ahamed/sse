import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { priceLabel, getCategoryBySlug } from "@/lib/products";
import { productWhatsAppLink } from "@/lib/whatsapp";
import EquipmentImage from "@/components/ui/EquipmentImage";

export default function ProductCard({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.category);
  const url = `/products/${product.slug}`;

  return (
    <div className="group relative flex h-full min-w-0 flex-col border border-line bg-paper transition-colors hover:border-ink/40">
      <Link href={`/products/${product.slug}`} className="flex min-w-0 flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
          <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.02]">
            <EquipmentImage category={product.category} label={product.name} src={product.images?.[0]} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="label-mono text-[10px] text-ink-muted">{category?.name}</p>
          <h3 className="mt-1.5 font-heading font-semibold text-[15px] tracking-tight leading-snug">
            {product.name}
          </h3>
          <p className="mt-1.5 text-[13px] text-ink-muted line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
          <p className="mt-auto pt-3 text-sm font-medium">{priceLabel(product)}</p>
        </div>
      </Link>

      <div className="flex border-t border-line">
        <Link
          href={`/products/${product.slug}`}
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-2 py-3 text-center text-[12.5px] font-medium leading-tight transition-colors hover:bg-surface"
        >
          View details
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href={productWhatsAppLink(product.name, url)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 border-l border-line px-2 py-3 text-center text-[12.5px] font-medium leading-tight text-accent transition-colors hover:bg-surface"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}
