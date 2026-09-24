"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/products";
import EquipmentImage from "@/components/ui/EquipmentImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealHeading } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
      <SectionLabel number="02">Product Categories</SectionLabel>
      <RevealHeading
        as="h2"
        className="mt-4 font-heading font-extrabold text-3xl md:text-5xl tracking-tight max-w-xl"
      >
        Equipment for the work ahead.
      </RevealHeading>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className={cn(large && "md:col-span-2 md:row-span-2")}
    >
      <Link
        href={`/products?category=${category.slug}`}
        className="group relative block border border-line overflow-hidden bg-surface"
      >
        <div className={cn("relative", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
          <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.025]">
            <EquipmentImage category={category.slug} label={category.name} categoryPreview />
          </div>
          <span className="absolute top-4 left-4 label-mono text-[10px] text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity">
            {category.number}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-line px-5 py-4 transition-colors group-hover:border-ink/40">
          <div>
            <p className="font-heading font-semibold text-sm md:text-base tracking-tight">
              {category.name}
            </p>
            {large && (
              <p className="text-xs text-ink-muted mt-1 max-w-xs hidden md:block">
                {category.description}
              </p>
            )}
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>
    </motion.div>
  );
}
