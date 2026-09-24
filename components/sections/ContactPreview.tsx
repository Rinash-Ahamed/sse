import { Phone, Mail, MapPin } from "lucide-react";
import LocationMap from "@/components/contact/LocationMap";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ContactPreview() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-24">
        <SectionLabel number="07">Visit or Reach Us</SectionLabel>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
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
              <a href="mailto:sanjayequipments@gmail.com" className="hover:text-accent break-all">
                sanjayequipments@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-10"><LocationMap /></div>
      </div>
    </section>
  );
}
