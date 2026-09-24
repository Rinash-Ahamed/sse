import Image from "next/image";
import MachinePlaceholder from "@/components/ui/MachinePlaceholder";
import type { CategorySlug } from "@/lib/products";
const categoryImages: Partial<Record<CategorySlug, string>> = {
  "concrete-vibration": "/images/products/12.png", compaction: "/images/products/10.png",
  "material-lifting": "/images/products/9.png", screening: "/images/products/5.png",
  cutting: "/images/products/4.png", "site-equipment": "/images/products/7.png",
};
export default function EquipmentImage({ category, label, src, categoryPreview = false }: {
  category: CategorySlug; label: string; src?: string; categoryPreview?: boolean;
}) {
  const image = src ?? (categoryPreview ? categoryImages[category] : undefined);
  if (!image) return <MachinePlaceholder category={category} label={label} />;
  return <div className="relative h-full w-full bg-paper"><Image src={image} alt={label} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px" className="object-contain" /></div>;
}
