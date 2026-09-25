"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getCategoryBySlug, getFeaturedProducts, priceLabel, type Product } from "@/lib/products";
import { productWhatsAppLink } from "@/lib/whatsapp";
import SectionLabel from "@/components/ui/SectionLabel";
import styles from "./FeaturedProducts.module.css";

const featured = getFeaturedProducts();
const showcase = [
  ...featured.filter((product) => product.id === "electric-concrete-mixer"),
  ...featured.filter((product) => product.id !== "electric-concrete-mixer"),
];

export default function FeaturedProducts() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="featured-equipment" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 pt-14 md:px-8 md:pt-20">
        <div className="grid items-end gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] lg:gap-16">
          <div>
            <SectionLabel>Featured Equipment</SectionLabel>
            <h2 className="mt-5 overflow-hidden font-heading text-[clamp(2.7rem,5vw,5.1rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
              <motion.span className="block" initial={reducedMotion ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>Built for the work</motion.span>
              <motion.span className="block text-accent" initial={reducedMotion ? false : { y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}>that matters.</motion.span>
            </h2>
          </div>
          <p className="max-w-sm pb-1 text-[15px] leading-relaxed text-ink-muted lg:justify-self-end">
            Explore construction equipment for practical site requirements.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        {showcase.map((product, index) => (
          <FeaturedRow key={product.id} product={product} index={index} reducedMotion={Boolean(reducedMotion)} />
        ))}
        <div className="flex justify-end border-t border-line pt-8">
          <Link href="/products" className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-sm font-semibold transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            Browse all equipment <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedRow({ product, index, reducedMotion }: { product: Product; index: number; reducedMotion: boolean }) {
  const category = getCategoryBySlug(product.category);
  const number = String(index + 1).padStart(2, "0");
  const visualFirst = index % 2 === 1;
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const animate = () => {
    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.13;
    current.y += (target.y - current.y) * 0.13;
    if (imageRef.current) imageRef.current.style.transform = `translate3d(${current.x * 7}px, ${current.y * 5}px, 0)`;
    if (graphicRef.current) graphicRef.current.style.transform = `translate3d(${-current.x * 2.5}px, ${-current.y * 2.5}px, 0)`;
    if (lightRef.current) lightRef.current.style.transform = `translate3d(${target.x * 28}px, ${target.y * 20}px, 0)`;
    if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.01) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      frameRef.current = 0;
      if (imageRef.current) imageRef.current.style.willChange = "auto";
    }
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || window.innerWidth < 1024) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };
    if (imageRef.current) imageRef.current.style.willChange = "transform";
    if (!frameRef.current) frameRef.current = requestAnimationFrame(animate);
  };

  const onPointerLeave = () => {
    targetRef.current = { x: 0, y: 0 };
    if (!frameRef.current) frameRef.current = requestAnimationFrame(animate);
  };

  return (
    <article className={`${styles.row} ${visualFirst ? styles.rowReverse : ""} ${index === 0 ? styles.firstRow : ""}`}>
      <motion.div
        className={styles.copy}
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="label-mono text-[11px] font-semibold text-accent">Featured / {number} <span className="ml-3 text-ink-muted">{category?.shortName}</span></p>
        <h3 className="mt-5 max-w-[14ch] font-heading text-[clamp(2rem,3.5vw,4.1rem)] font-extrabold leading-[1.06] tracking-tight">{product.name}</h3>
        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-muted">{product.shortDescription}</p>
        <p className="mt-7 text-sm font-semibold text-ink">{priceLabel(product)}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link href={`/products/${product.slug}`} className="group inline-flex min-h-11 items-center gap-2 border-b border-ink pb-1 text-[13px] font-semibold hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            View equipment <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
          <a href={productWhatsAppLink(product.name, `/products/${product.slug}`)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-accent hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp enquiry
          </a>
        </div>
      </motion.div>

      <div ref={stageRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={styles.stage}>
        <div ref={graphicRef} className={styles.engineering} aria-hidden="true" />
        <span className={styles.bigNumber} aria-hidden="true">{number}</span>
        <div ref={lightRef} className={styles.light} aria-hidden="true" />
        <motion.div
          className={styles.imageReveal}
          initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 1.035, clipPath: "inset(0 0 100% 0)" }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div ref={imageRef} className={styles.imageMotion}>
            {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill quality={85} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 760px" className={styles.productImage} />}
          </div>
        </motion.div>
        <span className={styles.stageLine} aria-hidden="true" />
      </div>
    </article>
  );
}
