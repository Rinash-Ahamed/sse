import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Settings2, Wrench } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Since 2004, Shree Sanjay Equipments has been based in Coimbatore. Explore our construction equipment, repair and servicing support.",
};

const support = [
  {
    icon: Settings2,
    title: "Find the right machine",
    description: "From concrete mixers and compactors to lifting and screening equipment, start with what the job needs.",
  },
  {
    icon: Wrench,
    title: "Keep it working",
    description: "Need a repair or routine service? Tell us about the machine and we can discuss the support available.",
  },
  {
    icon: MessageCircle,
    title: "Talk to a real person",
    description: "Ask about availability, specifications or pricing directly by phone, WhatsApp or email.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-7xl lg:min-h-[650px] lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-16 md:px-8 md:py-24 lg:pr-12">
            <SectionLabel>About Shree Sanjay Equipments</SectionLabel>
            <h1 className="mt-6 max-w-xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Built around the work <span className="text-accent">you do.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
              Based in Coimbatore since 2004, we know every site brings a different challenge. We help customers find construction equipment for the job and offer repair and servicing support when machines need attention.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="group inline-flex items-center gap-3 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong">
                Explore Equipment <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-md border border-ink/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-surface">
                Talk to Us <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="group relative min-h-[360px] overflow-hidden rounded-2xl bg-surface lg:min-h-full">
            <Image
              src="/images/about.png"
              alt="Concrete mixer, power trowel, screening equipment and wheelbarrow in a workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-md border border-white/70 bg-paper/95 px-5 py-4 shadow-lg backdrop-blur-sm sm:bottom-8 sm:left-8 sm:right-auto">
              <MapPin className="h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="label-mono text-[10px] text-ink-muted">Find us in</p>
                <p className="mt-1 text-sm font-bold">Avinashi Road, Coimbatore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <SectionLabel>What we do</SectionLabel>
            <h2 className="mt-5 max-w-md font-heading text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Equipment is only part of the answer.
            </h2>
          </div>
          <div className="max-w-xl self-end space-y-5 text-base leading-relaxed text-ink-muted">
            <p>
              A machine has to fit the work in front of you. Our range covers concrete mixing, compaction, material lifting, screening, cutting and general site equipment.
            </p>
            <p>
              We also take enquiries for equipment repairs and servicing. Share what you are using and what you need help with, and our team can discuss the next step with you.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {support.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-paper p-7 md:p-8">
              <div className="flex items-start justify-between">
                <Icon className="h-9 w-9 text-accent" strokeWidth={1.4} />
              </div>
              <h3 className="mt-8 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:px-8 md:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>Visit or enquire</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold tracking-tight md:text-4xl">Tell us what you are working on.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted md:text-base">
              Visit us at 52/1, Avinashi Road, R.G. Pudur, Chinniampalayam Post, Coimbatore 641062, or send your equipment requirement directly.
            </p>
          </div>
          <Link href="/contact" className="group inline-flex w-fit shrink-0 items-center gap-3 border-b border-ink pb-1 text-sm font-semibold">
            Contact our team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
