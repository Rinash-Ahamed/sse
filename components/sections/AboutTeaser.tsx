import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { RevealHeading, LineReveal } from "@/components/ui/RevealText";

export default function AboutTeaser() {
  return (
    <section className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <SectionLabel number="06">About</SectionLabel>
          <RevealHeading
            as="h2"
            className="mt-4 font-heading font-extrabold text-3xl md:text-4xl tracking-tight leading-[1.1]"
          >
            Practical equipment.
            <br />
            Straightforward support.
          </RevealHeading>
        </div>
        <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
          <LineReveal className="mb-6 hidden md:block" />
          <p className="text-[15px] md:text-base text-ink-muted leading-relaxed max-w-lg">
            Shree Sanjay Equipments is based on Avinashi Road, Coimbatore and
            supplies construction machinery, site equipment and related
            tools for practical construction requirements, with repair and
            servicing support. We work directly
            with customers through phone, WhatsApp and email enquiries.
          </p>
          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 text-[13px] font-medium border-b border-ink pb-0.5 w-fit"
          >
            More about us
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
