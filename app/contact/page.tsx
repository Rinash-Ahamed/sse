import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, Navigation } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import SectionLabel from "@/components/ui/SectionLabel";
import LocationMap from "@/components/contact/LocationMap";
import ContactForm from "@/components/contact/ContactForm";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shree Sanjay Equipments, Coimbatore — call, WhatsApp or send an enquiry for construction equipment, repairs and servicing.",
};

const GOOGLE_LOCATION = "https://share.google/YZLdzzSvJ0YSF4a0L";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-4 font-heading font-extrabold text-4xl md:text-6xl tracking-tight">
        Get in Touch
      </h1>
      <p className="mt-4 text-[15px] md:text-base text-ink-muted max-w-lg leading-relaxed">
        Call, WhatsApp or send us your requirement — our team will get back
        to you with the latest pricing and details.
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="font-heading font-bold text-xl tracking-tight">SHREE SANJAY EQUIPMENTS</p>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            52/1, Avinashi Road, R.G. Pudur,
            <br />
            Chinniampalayam Post,
            <br />
            Coimbatore - 641062, Tamil Nadu, India
          </p>

          <dl className="mt-8 space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <dd>
                <a href="tel:+919842230721" className="hover:text-accent">+91 98422 30721</a>
                <br />
                <a href="tel:+919842106090" className="hover:text-accent">+91 98421 06090</a>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <dd>
                <a href="mailto:sanjayequipments@gmail.com" className="hover:text-accent break-all">
                  sanjayequipments@gmail.com
                </a>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <InstagramIcon className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <dd>
                <a
                  href="https://www.instagram.com/shreesanjayequipments?stkn=dmkzODBseGN5eWVy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  Instagram
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="tel:+919842230721"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-steel/50 hover:bg-surface px-4 py-3 text-[13px] font-medium"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={generalWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent hover:bg-accent-strong text-white px-4 py-3 text-[13px] font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={GOOGLE_LOCATION}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-steel/50 hover:bg-surface px-4 py-3 text-[13px] font-medium"
            >
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </div>

          <div className="mt-8">
            <LocationMap />
          </div>
        </div>

        <div id="enquiry" className="md:col-span-7 scroll-mt-24">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
