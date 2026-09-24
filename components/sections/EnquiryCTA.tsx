"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export default function EnquiryCTA() {
  return (
    <section className="relative border-t border-line overflow-hidden bg-ink text-paper">
      <motion.svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <pattern id="cta-grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M 34 0 L 0 0 0 34" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </motion.svg>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28 text-center">
        <p className="label-mono text-[11px] text-paper/60">Need help choosing?</p>
        <h2 className="mt-4 font-heading font-extrabold text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto">
          Tell us what the job requires.
        </h2>
        <p className="mt-5 text-paper/70 text-[15px] md:text-base max-w-lg mx-auto leading-relaxed">
          Share your requirement and we&apos;ll help you identify the
          suitable equipment.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={generalWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-accent hover:bg-accent-strong text-white px-6 py-3.5 text-[13px] font-medium tracking-tight transition-transform hover:-translate-y-0.5"
          >
            WhatsApp Us
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-paper/40 px-6 py-3.5 text-[13px] font-medium tracking-tight transition-all hover:border-paper hover:-translate-y-0.5"
          >
            Send an Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
