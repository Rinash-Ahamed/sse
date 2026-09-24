"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import styles from "./Hero.module.css";

const headlines = [
  { lead: "Built for every", accent: "job site." },
  { lead: "Equipment for", accent: "real work." },
  { lead: "From pour to", accent: "final lift." },
  { lead: "Ready for the", accent: "work ahead." },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timer);
      if (!reducedMotion.matches) {
        timer = setTimeout(() => setHeadlineIndex((index) => (index + 1) % headlines.length), 5200);
      }
    };
    schedule();
    reducedMotion.addEventListener("change", schedule);
    return () => {
      clearTimeout(timer);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, [headlineIndex]);

  useEffect(() => {
    const hero = heroRef.current;
    const scene = sceneRef.current;
    if (!hero || !scene) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hovering = false;

    const reset = () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
      currentX = 0;
      currentY = 0;
      cancelAnimationFrame(frame);
      frame = 0;
      scene.style.transform = "";
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      scene.style.transform = `translate3d(${currentX * 8}px, ${currentY * 6}px, 0) rotateX(${-currentY}deg) rotateY(${currentX * 1.3}deg)`;
      frame = requestAnimationFrame(animate);
    };

    const canAnimate = () => finePointer.matches && !reducedMotion.matches;
    const onEnter = (event: PointerEvent) => {
      if (!canAnimate() || event.pointerType !== "mouse") return;
      hovering = true;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const onMove = (event: PointerEvent) => {
      if (!canAnimate() || event.pointerType !== "mouse") return;
      if (!hovering) onEnter(event);
      const rect = hero.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      targetX = (x - 0.5) * 2;
      targetY = (y - 0.5) * 2;
    };
    const onMediaChange = () => { if (!canAnimate()) reset(); };

    hero.addEventListener("pointerenter", onEnter);
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", reset);
    finePointer.addEventListener("change", onMediaChange);
    reducedMotion.addEventListener("change", onMediaChange);
    return () => {
      reset();
      hero.removeEventListener("pointerenter", onEnter);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", reset);
      finePointer.removeEventListener("change", onMediaChange);
      reducedMotion.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative isolate flex min-h-[620px] items-center overflow-hidden border-b border-line bg-paper sm:min-h-[660px] xl:min-h-[720px]">
      <div aria-hidden="true" className={styles.visual}>
        <div ref={sceneRef} className={styles.scene}>
          <Image src="/images/hero/sse-hero.png" alt="" fill priority sizes="100vw" draggable={false} className={styles.image} />
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-paper/95 via-paper/55 to-transparent" />
      <div className="relative z-30 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:pb-20 sm:pt-32 md:px-8 md:py-24">
        <div className="max-w-xl">
          <p className="label-mono mb-6 text-[10px] text-ink-muted before:mb-4 before:block before:h-px before:w-8 before:bg-accent sm:text-[11px]">
            Construction Equipment &middot; Coimbatore
          </p>
          <h1 className="min-h-[2.08em] font-heading text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
            <span key={headlineIndex} className={styles.headlineFrame}>
              {headlines[headlineIndex].lead}
              <span className={styles.headlineAccent}>{headlines[headlineIndex].accent}</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-muted md:text-lg">
            Construction equipment, repairs and servicing from Shree Sanjay Equipments, Coimbatore.
          </p>
          <div className="relative z-40 mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/products" className="relative inline-flex min-h-12 pointer-events-auto items-center gap-2 rounded-md bg-accent px-6 py-3.5 text-[13px] font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Explore Products <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="relative inline-flex min-h-12 pointer-events-auto items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-[13px] font-medium text-white shadow-[0_4px_14px_rgba(32,36,39,0.18)] transition-colors hover:bg-steel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp Enquiry
            </a>
          </div>
          <div className="relative z-40 mt-5 flex items-center gap-1" role="group" aria-label="Choose a hero headline">
            {headlines.map((headline, index) => (
              <button
                key={headline.accent}
                type="button"
                onClick={() => setHeadlineIndex(index)}
                aria-label={`Show headline ${index + 1}: ${headline.lead} ${headline.accent}`}
                aria-pressed={headlineIndex === index}
                className="group flex h-11 w-10 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span aria-hidden="true" className={`h-1.5 rounded-full transition-all duration-300 ${headlineIndex === index ? "w-8 bg-accent" : "w-5 bg-ink/25 group-hover:bg-ink/50"}`} />
              </button>
            ))}
            <span className="label-mono ml-3 text-[10px] text-ink-muted">0{headlineIndex + 1} / 0{headlines.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
