"use client";
import { useState } from "react";
import Image from "next/image";
import EquipmentImage from "@/components/ui/EquipmentImage";
import type { CategorySlug } from "@/lib/products";
export default function ProductGallery({ category, name, images = [] }: {
  category: CategorySlug; name: string; images?: string[];
}) {
  const [active, setActive] = useState(0);
  return <div>
    <div className="border border-line overflow-hidden rounded-lg"><div className="relative aspect-[4/3] md:aspect-[5/4]">
      <EquipmentImage category={category} label={name} src={images[active] ?? images[0]} />
    </div></div>
    {images.length > 1 && <div className="mt-3 flex gap-3" aria-label="Product images">
      {images.map((src, index) => <button key={src} type="button" onClick={() => setActive(index)} aria-label={name + " image " + (index + 1)} aria-pressed={active === index} className={"relative h-20 w-20 overflow-hidden rounded-md border-2 " + (active === index ? "border-accent" : "border-line")}>
        <Image src={src} alt="" fill sizes="80px" className="object-contain" />
      </button>)}
    </div>}
  </div>;
}
