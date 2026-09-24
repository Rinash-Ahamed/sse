"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/products";
import { categoryImages } from "@/components/ui/EquipmentImage";
import SectionLabel from "@/components/ui/SectionLabel";
import styles from "./CategoryGrid.module.css";

const categoryTitles: Record<string, string> = {
  cutting: "Cutting Equipment",
  "site-equipment": "Material Handling",
};

export default function CategoryGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Our Equipment</SectionLabel>
            <h2 className="mt-5 max-w-[18ch] overflow-hidden font-heading text-[clamp(2.5rem,4.5vw,4.8rem)] font-extrabold leading-[1.04] tracking-tight">
              <motion.span className="block" initial={reducedMotion ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>Equipment for every stage</motion.span>
              <motion.span className="block" initial={reducedMotion ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}>of the site.</motion.span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">Choose a category to explore the machines used across the job site.</p>
        </div>

        <div className={styles.grid}>
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              className={`${styles.tile} ${index === 0 ? styles.heroTile : ""} ${index === categories.length - 1 ? styles.lastTile : ""}`}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/products?category=${category.slug}`} className={styles.link} aria-label={`Explore ${categoryTitles[category.slug] ?? category.name}`}>
                <div className={styles.imageWrap}>
                  <Image
                    src={categoryImages[category.slug]}
                    alt=""
                    fill
                    quality={85}
                    sizes={index === 0 ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px" : "(max-width: 768px) 50vw, (max-width: 1280px) 50vw, 420px"}
                    className={styles.image}
                  />
                </div>
                <span className={styles.shade} aria-hidden="true" />
                <span className={styles.number}>{category.number}</span>
                <span className={styles.bottom}>
                  <span className={styles.title}>{categoryTitles[category.slug] ?? category.name}</span>
                  <ArrowUpRight className={styles.arrow} size={24} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
