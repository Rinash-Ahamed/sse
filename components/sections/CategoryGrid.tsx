"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/products";
import EquipmentImage from "@/components/ui/EquipmentImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealHeading } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
      <SectionLabel>Product Categories</SectionLabel>
      <RevealHeading
        as="h2"
        className="mt-4 font-heading font-extrabold text-3xl md:text-5xl tracking-tight max-w-xl"
      >
        Equipment for the work ahead.
      </RevealHeading>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
        {categories.map((cat, i) => (
          <CategoryCard key={cat.slug} category={cat} large={i === 0} index={i} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  large,
  index,
}: {
  category: (typeof categories)[number];
  large?: boolean;
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, clipPath: "inset(0 0 18% 0 round 10px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 10px)" }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={cn("category-reveal min-w-0", large && "xl:col-span-2 xl:row-span-2")}
    >
      <Link
        href={`/products?category=${category.slug}`}
        className={cn("group relative block overflow-hidden rounded-lg border border-line bg-surface shadow-[0_4px_18px_rgba(32,36,39,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_14px_36px_rgba(32,36,39,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent", large && "xl:flex xl:h-full xl:flex-col")}
      >
        <div className={cn("relative aspect-[4/3]", large && "xl:aspect-auto xl:min-h-[260px] xl:flex-1")}>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
            <EquipmentImage category={category.slug} label={category.name} categoryPreview />
          </div>
          <span className="absolute top-4 left-4 rounded-sm bg-paper/90 px-2 py-1 label-mono text-[10px] text-ink-muted backdrop-blur-sm">
            {category.number}
          </span>
        </div>
        <div className="relative flex min-w-0 items-center justify-between gap-3 border-t border-line px-5 py-4">
          <div className="min-w-0">
            <p className="font-heading font-semibold text-sm md:text-base tracking-tight">
              {category.name}
            </p>
            {large && (
              <p className="mt-1 hidden max-w-xs text-xs text-ink-muted xl:block">
                {category.description}
              </p>
            )}
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-white">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        </div>
      </Link>
    </motion.div>
  );
}
