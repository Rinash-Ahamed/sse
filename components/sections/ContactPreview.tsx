import { Phone, Mail, MapPin } from "lucide-react";
import LocationMap from "@/components/contact/LocationMap";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ContactPreview() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[var(--container-7xl)] px-5 py-20 md:px-8 md:py-24">
        <SectionLabel>Visit or contact us</SectionLabel>
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-10">
          <div className="overflow-hidden rounded-[24px] border border-line bg-white/35">
            <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4 p-5 sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/15 bg-accent/5">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <div className="min-w-0 pt-1">
                <p className="label-mono text-[10px] text-ink-muted">Visit us</p>
                <address className="mt-2 text-sm not-italic leading-relaxed text-ink">
                  52/1, Avinashi Road, R.G. Pudur,<br />
                  Chinniampalayam Post,<br />
                  Coimbatore - 641062, Tamil Nadu
                </address>
              </div>
            </div>
            <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4 border-t border-line p-5 sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/15 bg-accent/5">
                <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <div className="min-w-0 pt-1">
                <p className="label-mono text-[10px] text-ink-muted">Call us</p>
                <p className="mt-2 flex flex-col items-start text-sm leading-relaxed">
                <a href="tel:+919842230721" className="hover:text-accent">+91 98422 30721</a>
                <a href="tel:+919842106090" className="hover:text-accent">+91 98421 06090</a>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4 border-t border-line p-5 sm:p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/15 bg-accent/5">
                <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <div className="min-w-0 pt-1">
                <p className="label-mono text-[10px] text-ink-muted">Email us</p>
                <a href="mailto:sanjayequipments@gmail.com" className="mt-2 block break-words text-sm leading-relaxed hover:text-accent">
                  sanjayequipments@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="h-full w-full overflow-hidden rounded-[24px] [&>div]:h-full [&>div]:rounded-[24px] [&_iframe]:h-full [&_iframe]:min-h-[290px]">
            <LocationMap compact />
          </div>
        </div>
      </div>
    </section>
  );
}
