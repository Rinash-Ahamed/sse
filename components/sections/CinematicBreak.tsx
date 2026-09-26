import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CinematicBreak() {
  return (
    <section className="overflow-hidden bg-dark-section text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="label-mono text-[11px] text-white/55">Shree Sanjay Equipments</p>
          <h2 className="mt-7 max-w-[12ch] font-heading text-[clamp(2.8rem,5.2vw,5.6rem)] font-extrabold leading-[1.03] tracking-tight">
            Machines made for demanding <span className="text-accent">work.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/65">
            Equipment for the people who build, lift, prepare and finish the site.
          </p>
          <Link href="/products" className="group mt-9 inline-flex min-h-11 items-center gap-3 border-b border-white/65 pb-1 text-sm font-medium transition-colors hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Explore equipment <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
        </div>
        <div className="relative min-w-0 overflow-hidden rounded-[28px] border border-white/15 bg-white/5 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:p-5">
          <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black">
            <video
              autoPlay
              controls
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/hero/sse-hero.png"
              className="h-full w-full object-cover"
              aria-label="Shree Sanjay Equipments in action"
            >
              <source src="/video/sse-video.mp4" type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em]">
            <span className="text-white/65">On site with SSE</span><span className="text-white/45">SSE / 02</span>
          </div>
        </div>
      </div>
    </section>
  );
}
