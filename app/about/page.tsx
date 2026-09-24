import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Shree Sanjay Equipments is based on Avinashi Road, Coimbatore and supplies construction machinery, site equipment and related tools, with repair and servicing support.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-4 font-heading font-extrabold text-4xl md:text-6xl tracking-tight max-w-2xl leading-[1.05]">
        Practical equipment. Straightforward support.
      </h1>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <p className="text-[15px] md:text-base text-ink-muted leading-relaxed">
            Shree Sanjay Equipments is based on Avinashi Road, Coimbatore and
            supplies construction machinery, site equipment and related
            tools for practical construction requirements. Our contact
            person, M. Suseendrarajan, and our team work directly with
            customers on the phone, on WhatsApp and by email.
          </p>
          <p className="mt-5 text-[15px] md:text-base text-ink-muted leading-relaxed">
            We supply equipment across concrete and vibration, compaction,
            material lifting, screening, cutting and general site
            equipment, along with construction power tools. Shree Sanjay
            Equipments also appears in the official HiKOKI India dealer
            directory.
          </p>
          <p className="mt-5 text-[15px] md:text-base text-ink-muted leading-relaxed">
            We also provide equipment repairs and servicing. Share your machine
            details and the issue or maintenance requirement with our team to
            discuss the available support.
          </p>
          <p className="mt-5 text-[15px] md:text-base text-ink-muted leading-relaxed">
            For current availability, specifications and pricing on any
            piece of equipment, reach out directly — our team will help you
            identify what suits the job.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={generalWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent hover:bg-accent-strong text-white px-6 py-3.5 text-[13px] font-medium tracking-tight transition-transform hover:-translate-y-0.5"
            >
              WhatsApp Us
            </a>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-md border border-steel/50 hover:bg-surface px-6 py-3.5 text-[13px] font-medium tracking-tight transition-transform hover:-translate-y-0.5"
            >
              Browse Equipment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <div className="border border-line p-6">
            <p className="label-mono text-[11px] text-ink-muted mb-4">Details</p>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-ink-muted">Location</dt>
                <dd className="mt-1">
                  52/1, Avinashi Road, R.G. Pudur, Chinniampalayam Post,
                  Coimbatore - 641062, Tamil Nadu, India
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Phone</dt>
                <dd className="mt-1">
                  <a href="tel:+919842230721" className="hover:text-accent">+91 98422 30721</a>
                  <br />
                  <a href="tel:+919842106090" className="hover:text-accent">+91 98421 06090</a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Email</dt>
                <dd className="mt-1">
                  <a href="mailto:sanjayequipments@gmail.com" className="hover:text-accent break-all">
                    sanjayequipments@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
