"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./HomeIntro.module.css";

const MIN_DURATION = 1400;
const MAX_DURATION = 2600;
const EXIT_DURATION = 420;

export default function HomeIntro() {
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
    const initialStyle = document.getElementById("sse-intro-initial");
    if (!initialStyle) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      initialStyle.remove();
      return;
    }

    const overlay = document.getElementById("sse-home-intro");
    if (previousOverflowRef.current === null) previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let finishTimer: ReturnType<typeof setTimeout>;
    let video: HTMLVideoElement | null = null;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      overlay?.classList.add(styles.exiting);
      finishTimer = setTimeout(() => {
        initialStyle.remove();
        document.body.style.overflow = previousOverflowRef.current ?? "";
      }, EXIT_DURATION);
    };

    const minimumTimer = setTimeout(() => {
      video = document.querySelector<HTMLVideoElement>("video[data-hero-video]");
      if (!video || (!video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA)) {
        finish();
      } else {
        video.addEventListener("playing", finish, { once: true });
      }
    }, MIN_DURATION);
    const maximumTimer = setTimeout(finish, MAX_DURATION);

    return () => {
      clearTimeout(minimumTimer);
      clearTimeout(maximumTimer);
      clearTimeout(finishTimer);
      video?.removeEventListener("playing", finish);
      cleanupTimerRef.current = setTimeout(() => {
        initialStyle.remove();
        document.body.style.overflow = previousOverflowRef.current ?? "";
      }, 0);
    };
  }, []);

  return (
    <div id="sse-home-intro" className={styles.overlay} role="status" aria-label="Opening Shree Sanjay Equipments">
      <span className={styles.topLabel}>Shree Sanjay Equipments <span>/</span> Since 2004</span>
      <span className={styles.watermark} aria-hidden="true">SSE</span>
      <div className={styles.center}>
        <div className={styles.logoWrap}>
          <Image src="/images/brand/logo-full.png" alt="Shree Sanjay Equipments" width={420} height={304} className={styles.logo} priority />
        </div>
        <span className={styles.tagline}>Built for every job site.</span>
      </div>
      <div className={styles.bottom} aria-hidden="true">
        <span>Equipment <span className={styles.dot} /> Repairs <span className={styles.dot} /> Service</span>
        <span>Built for real work</span>
      </div>
      <span className={styles.progress} aria-hidden="true" />
    </div>
  );
}
