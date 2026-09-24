import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { priceLabel, getCategoryBySlug } from "@/lib/products";
import { productWhatsAppLink } from "@/lib/whatsapp";
import EquipmentImage from "@/components/ui/EquipmentImage";

export default function ProductCard({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.category);
  const url = `/products/${product.slug}`;

  return (
    <article className="group flex min-w-0 flex-col">
      <Link href={url} className="flex min-w-0 flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-ink/10 bg-paper">
          <div className="absolute inset-0 scale-[1.03] transition-transform duration-500 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
            {product.images?.[0] ? (
              <Image src={product.images[0]} alt={product.name} fill quality={85} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-contain mix-blend-multiply" />
            ) : (
              <EquipmentImage category={product.category} label={product.name} />
            )}
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(246,244,239,.15),transparent_15%,transparent_85%,rgba(246,244,239,.2))]" />
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <p className="label-mono text-[10px] font-medium text-accent">{category?.name}</p>
          <h3 className="mt-2 font-heading text-lg font-bold leading-snug tracking-tight transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">{product.name}</h3>
          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <p className="text-sm text-ink-muted">{priceLabel(product)}</p>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" aria-hidden="true" />
          </div>
        </div>
      </Link>
      <a href={productWhatsAppLink(product.name, url)} target="_blank" rel="noopener noreferrer" className="mt-4 self-start border-b border-accent/50 pb-1 text-xs font-medium text-accent transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
        Ask on WhatsApp
      </a>
    </article>
  );
}
