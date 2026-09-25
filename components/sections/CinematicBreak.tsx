import Image from "next/image";
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
        <div className="group relative min-w-0 overflow-hidden rounded-[28px] border border-white/15 bg-paper p-3 shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:p-5">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-paper">
            <Image
              src="/images/products/featured/electric-concrete-mixer.png"
              alt="Electric concrete mixer"
              fill
              quality={85}
              sizes="(max-width: 1024px) 100vw, 650px"
              className="object-contain p-[5%] drop-shadow-[0_24px_24px_rgba(32,36,39,0.2)] transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-ink/15 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            <span>Electric Concrete Mixer</span><span>SSE / 01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
