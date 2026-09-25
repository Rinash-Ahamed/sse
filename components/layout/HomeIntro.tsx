"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./HomeIntro.module.css";

const STORAGE_KEY = "sse-intro-seen";
const MIN_DURATION = 1400;
const MAX_DURATION = 2600;
const EXIT_DURATION = 420;

export default function HomeIntro() {
  const startedRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const initialStyle = document.getElementById("sse-intro-initial");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      initialStyle?.remove();
      return;
    }

    try {
      if (sessionStorage.getItem(STORAGE_KEY) && !initialStyle && !startedRef.current) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      initialStyle?.remove();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    startedRef.current = true;
    document.body.style.overflow = "hidden";
    setVisible(true);
    setExiting(false);

    let finishTimer: ReturnType<typeof setTimeout>;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setExiting(true);
      finishTimer = setTimeout(() => {
        setVisible(false);
        startedRef.current = false;
        initialStyle?.remove();
        document.body.style.overflow = previousOverflow;
      }, EXIT_DURATION);
    };

    const minimumTimer = setTimeout(() => {
      const video = document.querySelector<HTMLVideoElement>("video[data-hero-video]");
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
      document.querySelector<HTMLVideoElement>("video[data-hero-video]")?.removeEventListener("playing", finish);
      initialStyle?.remove();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div id="sse-home-intro" className={`${styles.overlay} ${visible ? styles.visible : ""} ${exiting ? styles.exiting : ""}`} role="status" aria-label="Opening Shree Sanjay Equipments">
      <span className={styles.topLabel}>Shree Sanjay Equipments <span>/</span> Coimbatore</span>
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
