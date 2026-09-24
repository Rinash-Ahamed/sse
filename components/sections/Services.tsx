import Link from "next/link";
import { ArrowRight, Settings2, Wrench } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { serviceWhatsAppLink } from "@/lib/whatsapp";

const services = [
  {
    title: "Equipment Repairs",
    icon: Wrench,
    description: "Having trouble with your equipment? Share the machine details and the issue with our team to discuss repair options.",
  },
  {
    title: "Equipment Servicing",
    icon: Settings2,
    description: "Keep equipment maintenance on your schedule. Contact us with your machine details to discuss servicing requirements and availability.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <SectionLabel>Repair &amp; Servicing</SectionLabel>
        <div className="mt-4 grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight md:text-5xl">
            Support beyond the sale.
          </h2>
          <p className="text-[15px] leading-relaxed text-ink-muted md:text-base">
            Shree Sanjay Equipments also provides equipment repair and servicing
            in Coimbatore. Tell us what you use and what support you need.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map(({ title, icon: Icon, description }) => (
            <div key={title} className="rounded-lg border border-line bg-paper p-6 md:p-8">
              <Icon className="h-9 w-9 text-accent" strokeWidth={1.4} />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">{description}</p>
              <a href={serviceWhatsAppLink(title)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong">
                Enquire on WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
        <Link href="/contact#enquiry" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong">
          Send a service enquiry <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
