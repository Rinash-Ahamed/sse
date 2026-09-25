"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getCategoryBySlug, getFeaturedProducts, type Product } from "@/lib/products";
import { productWhatsAppLink } from "@/lib/whatsapp";
import SectionLabel from "@/components/ui/SectionLabel";
import styles from "./FeaturedProducts.module.css";

const featured = getFeaturedProducts();
const showcase = [
  ...featured.filter((product) => product.id === "electric-concrete-mixer"),
  ...featured.filter((product) => product.id !== "electric-concrete-mixer"),
].slice(0, 5);

export default function FeaturedProducts() {
  const reducedMotion = useReducedMotion();
  const experienceRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: experienceRef, offset: ["start start", "end end"] });
  const visualY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-8, 8]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(showcase.length - 1, Math.floor(progress * showcase.length));
    setActiveIndex((current) => current === next ? current : next);
  });

  const activateNode = (index: number) => {
    setActiveIndex(index);
    const experience = experienceRef.current;
    if (!experience) return;
    const top = window.scrollY + experience.getBoundingClientRect().top;
    const distance = Math.max(0, experience.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: top + distance * (index / Math.max(1, showcase.length - 1)),
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  return (
    <section id="featured-equipment" className={styles.section}>
      <div className={styles.heading}>
        <div>
          <SectionLabel>Featured Equipment</SectionLabel>
          <h2 className={styles.title}>Built for the work <span>that matters.</span></h2>
        </div>
        <p className={styles.intro}>Five site-ready machines, selected for the work that keeps a project moving.</p>
      </div>

      <div ref={experienceRef} className={styles.experience}>
        <div className={styles.stickyStage}>
          <ProductNodes products={showcase} activeIndex={activeIndex} progress={scrollYProgress} onSelect={activateNode} />
          <ProductPanel product={showcase[activeIndex]} activeIndex={activeIndex} reducedMotion={Boolean(reducedMotion)} visualY={visualY} />
        </div>
      </div>

      <div className={styles.mobileList}>
        {showcase.map((product, index) => (
          <MobileProductCard key={product.id} product={product} index={index} reducedMotion={Boolean(reducedMotion)} />
        ))}
      </div>

      <div className={styles.footerLink}>
        <Link href="/products" className={styles.allProducts}>
          Browse all equipment <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function ProductNodes({ products, activeIndex, progress, onSelect }: {
  products: Product[];
  activeIndex: number;
  progress: MotionValue<number>;
  onSelect: (index: number) => void;
}) {
  return (
    <div className={styles.nodeArea}>
      <div className={styles.track} aria-hidden="true"><motion.span className={styles.trackFill} style={{ scaleX: progress }} /></div>
      <div className={styles.nodes} role="tablist" aria-label="Featured equipment">
        {products.map((product, index) => {
          const active = activeIndex === index;
          return (
            <button
              key={product.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="featured-product-panel"
              onClick={() => onSelect(index)}
              className={`${styles.nodeButton} ${active ? styles.nodeActive : ""}`}
            >
              <span className={styles.nodeRing} aria-hidden="true" />
              <span className={styles.nodeImage}>
                {product.images?.[0] && <Image src={product.images[0]} alt="" fill sizes="112px" className={styles.nodeProductImage} />}
              </span>
              <span className={styles.nodeName}>{product.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductPanel({ product, activeIndex, reducedMotion, visualY }: {
  product: Product;
  activeIndex: number;
  reducedMotion: boolean;
  visualY: MotionValue<number>;
}) {
  const category = getCategoryBySlug(product.category);
  return (
    <div id="featured-product-panel" role="tabpanel" className={styles.panel}>
      <motion.div className={styles.visual} style={{ y: visualY }}>
        <span className={styles.blueprintRing} aria-hidden="true" />
        <span className={styles.crosshair} aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.id}
            className={styles.largeImage}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.975, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 1.015, y: -6 }}
            transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {product.images?.[0] && (
              <Image src={product.images[0]} alt={product.name} fill quality={85} sizes="(max-width: 1024px) 60vw, 900px" className={styles.largeProductImage} />
            )}
          </motion.div>
        </AnimatePresence>
        <span className={styles.visualIndex} aria-hidden="true">0{activeIndex + 1}</span>
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={product.id}
          className={styles.copy}
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.category}>{category?.shortName ?? "Equipment"}</p>
          <h3>{product.name}</h3>
          <p className={styles.description}>{product.shortDescription}</p>
          <ProductActions product={product} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MobileProductCard({ product, index, reducedMotion }: { product: Product; index: number; reducedMotion: boolean }) {
  const category = getCategoryBySlug(product.category);
  return (
    <motion.article
      className={styles.mobileCard}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.mobileImage}>
        <span className={styles.mobileRing} aria-hidden="true" />
        {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill sizes="86vw" className={styles.largeProductImage} />}
        <span className={styles.mobileIndex}>0{index + 1}</span>
      </div>
      <div className={styles.mobileCopy}>
        <p className={styles.category}>{category?.shortName ?? "Equipment"}</p>
        <h3>{product.name}</h3>
        <p className={styles.description}>{product.shortDescription}</p>
        <ProductActions product={product} />
      </div>
    </motion.article>
  );
}

function ProductActions({ product }: { product: Product }) {
  return (
    <div className={styles.actions}>
      <Link href={`/products/${product.slug}`} className={styles.viewLink}>View Product <ArrowUpRight aria-hidden="true" /></Link>
      <a href={productWhatsAppLink(product.name, `/products/${product.slug}`)} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>
        <MessageCircle aria-hidden="true" /> Enquire
      </a>
    </div>
  );
}
