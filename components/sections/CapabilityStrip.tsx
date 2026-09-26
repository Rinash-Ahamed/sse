"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Box, MapPin, MessageCircle, Wrench } from "lucide-react";
import styles from "./CapabilityStrip.module.css";

const items = [
  { href: "/products", icon: Box, title: "Construction Equipment", detail: "Machines for site work" },
  { href: "/contact#enquiry", icon: MessageCircle, title: "Equipment Enquiries", detail: "Ask about price and availability" },
  { href: "/contact#location", icon: MapPin, title: "Coimbatore, Tamil Nadu", detail: "Visit us on Avinashi Road" },
  { href: "/#services", icon: Wrench, title: "Repairs & Servicing", detail: "Discuss support for your machine" },
];

export default function CapabilityStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <section aria-label="How we can help" className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-2 sm:gap-4 md:px-8 xl:grid-cols-4">
        {items.map(({ href, icon: Icon, title, detail }, index) => (
          <motion.div
            key={title}
            initial={reducedMotion ? false : { opacity: 0, y: 24, clipPath: "inset(0 0 16% 0 round 12px)" }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 12px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
            className="capability-reveal"
          >
            <Link
              href={href}
              scroll={!href.includes("#")}
              aria-label={`${title}: ${detail}`}
              className={`${styles.card} group relative flex min-h-24 items-center gap-4 overflow-hidden rounded-xl border border-line bg-surface/40 px-4 py-4 transition-colors hover:border-accent/35 hover:bg-surface/75 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent`}
            >
              <span className={`${styles.iconFrame} flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 text-accent`}>
                <Icon className={`${styles.icon} h-6 w-6`} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label-mono block text-[10px] font-semibold leading-relaxed">{title}</span>
                <span className="mt-1 block text-xs leading-snug text-ink-muted">{detail}</span>
              </span>
              <ArrowUpRight className={`${styles.arrow} h-4 w-4 shrink-0 text-ink-muted`} aria-hidden="true" />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
