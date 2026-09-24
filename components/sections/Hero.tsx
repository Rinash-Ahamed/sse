"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

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
      <div className="relative z-30 mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="max-w-xl">
          <p className="label-mono mb-6 text-[10px] text-ink-muted before:mb-4 before:block before:h-px before:w-8 before:bg-accent sm:text-[11px]">
            Construction Equipment &middot; Coimbatore
          </p>
          <h1 className="font-heading text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
            Built for every<br /><span className="text-accent">job site.</span>
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
        </div>
      </div>
    </section>
  );
}
