"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let correctionTimer: ReturnType<typeof setTimeout> | undefined;
    let frame: number | undefined;

    const targetPosition = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return null;
      const target = document.getElementById(hash);
      if (!target) return null;
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      const offset = (header?.getBoundingClientRect().bottom ?? 84) + 12;
      return Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
    };

    const scrollToTarget = (smooth: boolean) => {
      const top = targetPosition();
      if (top === null || Math.abs(window.scrollY - top) < 2) return;
      if (smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top });
      root.style.scrollBehavior = previousBehavior;
    };

    const schedule = () => {
      if (frame) cancelAnimationFrame(frame);
      if (correctionTimer) clearTimeout(correctionTimer);
      frame = requestAnimationFrame(() => scrollToTarget(true));
      correctionTimer = setTimeout(() => scrollToTarget(false), 700);
    };

    schedule();
    window.addEventListener("hashchange", schedule);
    return () => {
      window.removeEventListener("hashchange", schedule);
      if (frame) cancelAnimationFrame(frame);
      if (correctionTimer) clearTimeout(correctionTimer);
    };
  }, [pathname]);

  return null;
}
