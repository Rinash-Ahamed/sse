"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Play } from "lucide-react";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import styles from "./Hero.module.css";

const headlines = [
  { lead: "Built for every", accent: "job site." },
  { lead: "Equipment for", accent: "real work." },
  { lead: "From pour to", accent: "final lift." },
  { lead: "Ready for the", accent: "work ahead." },
];

type NetworkConnection = EventTarget & {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensCanvasRef = useRef<HTMLCanvasElement>(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoBlocked, setVideoBlocked] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedData = window.matchMedia("(prefers-reduced-data: reduce)");
    const device = navigator as Navigator & { deviceMemory?: number; connection?: NetworkConnection };
    const connection = device.connection;

    const updateVideoEligibility = () => {
      const slowConnection = connection?.saveData
        || ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")
        || (connection?.downlink !== undefined && connection.downlink < 2.5);
      const lowerEndDevice = device.deviceMemory !== undefined && device.deviceMemory < 4;
      const supportsMp4 = document.createElement("video").canPlayType("video/mp4") !== "";
      const eligible = supportsMp4 && !reducedMotion.matches && !reducedData.matches
        && !slowConnection && !lowerEndDevice && navigator.onLine;
      setCanPlayVideo(eligible);
      if (!eligible) {
        setVideoPlaying(false);
        setVideoBlocked(false);
      }
    };

    updateVideoEligibility();
    reducedMotion.addEventListener("change", updateVideoEligibility);
    reducedData.addEventListener("change", updateVideoEligibility);
    connection?.addEventListener("change", updateVideoEligibility);
    window.addEventListener("online", updateVideoEligibility);
    window.addEventListener("offline", updateVideoEligibility);
    return () => {
      reducedMotion.removeEventListener("change", updateVideoEligibility);
      reducedData.removeEventListener("change", updateVideoEligibility);
      connection?.removeEventListener("change", updateVideoEligibility);
      window.removeEventListener("online", updateVideoEligibility);
      window.removeEventListener("offline", updateVideoEligibility);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!canPlayVideo || !hero || !video) return;

    let inView = true;
    const syncPlayback = () => {
      if (inView && document.visibilityState === "visible") {
        video.defaultMuted = true;
        video.muted = true;
        void video.play().catch((error: unknown) => {
          // React's development effect cleanup and ordinary visibility changes can cancel play().
          // Those AbortErrors should not permanently disable the video.
          if (error instanceof DOMException && error.name === "AbortError") return;
          setVideoBlocked(true);
        });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(hero);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [canPlayVideo]);

  const playVideoManually = () => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    void video.play()
      .then(() => setVideoBlocked(false))
      .catch(() => setVideoBlocked(true));
  };

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
    const video = videoRef.current;
    const lens = lensRef.current;
    const canvas = lensCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!videoPlaying || !hero || !video || !lens || !canvas || !context) return;

    const lensSize = 160;
    const viewportSize = 142;
    const zoom = 1.2;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(viewportSize * pixelRatio);
    canvas.height = Math.round(viewportSize * pixelRatio);
    context.imageSmoothingQuality = "high";

    let frame = 0;
    let lastPaint = 0;
    let pointerX = 0;
    let pointerY = 0;
    let heroRect = hero.getBoundingClientRect();

    const paint = (time: number) => {
      if (time - lastPaint >= 32 && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && video.videoWidth) {
        const videoRect = video.getBoundingClientRect();
        const scale = Math.max(videoRect.width / video.videoWidth, videoRect.height / video.videoHeight);
        const offsetX = (videoRect.width - video.videoWidth * scale) / 2;
        const offsetY = (videoRect.height - video.videoHeight * scale) / 2;
        const videoX = heroRect.left + pointerX - videoRect.left;
        const videoY = heroRect.top + pointerY - videoRect.top;
        const sampleSize = viewportSize / zoom / scale;
        const sourceX = Math.min(video.videoWidth - sampleSize, Math.max(0, (videoX - offsetX) / scale - sampleSize / 2));
        const sourceY = Math.min(video.videoHeight - sampleSize, Math.max(0, (videoY - offsetY) / scale - sampleSize / 2));
        context.drawImage(video, sourceX, sourceY, sampleSize, sampleSize, 0, 0, canvas.width, canvas.height);
        lens.style.opacity = "1";
        lastPaint = time;
      }
      frame = requestAnimationFrame(paint);
    };

    const hide = () => {
      lens.style.opacity = "0";
      cancelAnimationFrame(frame);
      frame = 0;
      lastPaint = 0;
    };

    const onMove = (event: PointerEvent) => {
      heroRect = hero.getBoundingClientRect();
      pointerX = event.clientX - heroRect.left;
      pointerY = event.clientY - heroRect.top;
      const videoRect = video.getBoundingClientRect();
      const visibleVideoStart = videoRect.left - heroRect.left + videoRect.width * 0.22;
      if (event.pointerType !== "mouse" || pointerX < Math.max(heroRect.width * 0.54, visibleVideoStart)) {
        hide();
        return;
      }

      const lensX = Math.min(heroRect.width - lensSize / 2 - 16, Math.max(lensSize / 2 + 16, pointerX));
      const lensY = Math.min(heroRect.height - lensSize / 2 - 16, Math.max(lensSize / 2 + 16, pointerY));
      lens.style.transform = `translate3d(${lensX - lensSize / 2}px, ${lensY - lensSize / 2}px, 0)`;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("blur", hide);
    return () => {
      hide();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("blur", hide);
    };
  }, [videoPlaying]);

  return (
    <section ref={heroRef} className="relative isolate flex min-h-[620px] items-center overflow-hidden border-b border-line bg-paper sm:min-h-[660px] xl:min-h-[720px]">
      <div aria-hidden="true" className={styles.visual}>
        <div className={styles.scene}>
          <Image src="/images/hero/sse-hero.png" alt="" fill priority sizes="100vw" draggable={false} className={styles.image} />
          {canPlayVideo && (
            <video
              ref={videoRef}
              data-hero-video
              className={`${styles.video} ${videoPlaying ? styles.videoVisible : ""}`}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              poster="/images/hero/sse-hero.png"
              onPlaying={() => { setVideoPlaying(true); setVideoBlocked(false); }}
              onError={() => { setVideoPlaying(false); setVideoBlocked(false); setCanPlayVideo(false); }}
              onPause={() => setVideoPlaying(false)}
            >
              <source src="/images/hero/hero-video.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-paper/95 via-paper/55 to-transparent" />
      {videoPlaying && (
        <div ref={lensRef} className={styles.lens} aria-hidden="true">
          <canvas ref={lensCanvasRef} className={styles.lensCanvas} />
          <span className={styles.lensFocus} />
          <span className={styles.lensAccent} />
        </div>
      )}
      {canPlayVideo && videoBlocked && !videoPlaying && (
        <button
          type="button"
          onClick={playVideoManually}
          className="absolute bottom-5 right-5 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/80 bg-paper/95 px-4 text-xs font-semibold text-ink shadow-lg transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:bottom-7 sm:right-7"
          aria-label="Play hero video"
        >
          <Play className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
          Play video
        </button>
      )}
      <div className="relative z-30 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:pb-20 sm:pt-32 md:px-8 md:py-24">
        <div className="max-w-xl">
          <p className="label-mono mb-6 text-[10px] text-ink-muted before:mb-4 before:block before:h-px before:w-8 before:bg-accent sm:text-[11px]">
            Construction Equipment &middot; Coimbatore &middot; Since 2004
          </p>
          <h1 className="min-h-[2.08em] font-heading text-[clamp(2.25rem,10vw,2.6rem)] font-extrabold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
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
          </div>
        </div>
      </div>
    </section>
  );
}
