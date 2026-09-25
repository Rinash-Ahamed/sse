"use client";

import { useState } from "react";
import Image from "next/image";
import EquipmentImage from "@/components/ui/EquipmentImage";
import type { CategorySlug } from "@/lib/products";
import styles from "./ProductGallery.module.css";

export default function ProductGallery({ category, name, images = [] }: {
  category: CategorySlug;
  name: string;
  images?: string[];
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className={styles.stage}>
        {current ? (
          <div key={current} className={styles.imageFrame}>
            <Image src={current} alt={name} fill quality={85} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 760px" className={styles.image} priority />
          </div>
        ) : (
          <EquipmentImage category={category} label={name} />
        )}
        <span className={styles.topline} aria-hidden="true"><span>Equipment / {category.replaceAll("-", " ")}</span><span>SSE</span></span>
        <span className={styles.corner} aria-hidden="true" />
        {images.length > 1 && <span className={styles.counter} aria-live="polite">View {String(active + 1).padStart(2, "0")} <span>/</span> {String(images.length).padStart(2, "0")}</span>}
      </div>

      {images.length > 1 && (
        <div className={styles.filmstrip} role="group" aria-label="Choose product image">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${name} image ${index + 1} of ${images.length}`}
              aria-pressed={active === index}
              className={`${styles.thumb} ${active === index ? styles.thumbActive : ""}`}
            >
              <span className={styles.thumbImage}><Image src={src} alt="" fill sizes="96px" className="object-contain mix-blend-multiply" /></span>
              <span className={styles.thumbIndex}>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
