import { Phone, Mail, MapPin } from "lucide-react";
import LocationMap from "@/components/contact/LocationMap";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ContactPreview() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-24">
        <SectionLabel>Visit or contact us</SectionLabel>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-start">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <MapPin className="h-5 w-5 text-accent" />
              <p className="mt-3 text-sm leading-relaxed">
                52/1, Avinashi Road, R.G. Pudur,
                <br />
                Chinniampalayam Post,
                <br />
                Coimbatore - 641062, Tamil Nadu
              </p>
            </div>
            <div>
              <Phone className="h-5 w-5 text-accent" />
              <p className="mt-3 text-sm">
                <a href="tel:+919842230721" className="hover:text-accent">+91 98422 30721</a>
                <br />
                <a href="tel:+919842106090" className="hover:text-accent">+91 98421 06090</a>
              </p>
            </div>
            <div>
              <Mail className="h-5 w-5 text-accent" />
              <p className="mt-3 text-sm">
                <a href="mailto:sanjayequipments@gmail.com" className="break-all hover:text-accent">
                  sanjayequipments@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="w-full max-w-[520px] lg:max-w-none">
            <LocationMap compact />
          </div>
        </div>
      </div>
    </section>
  );
}
