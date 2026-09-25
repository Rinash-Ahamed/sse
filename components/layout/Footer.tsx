import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { categories } from "@/lib/products";
import { generalWhatsAppLink } from "@/lib/whatsapp";

const footerLink = "w-fit text-sm text-white/65 transition-colors hover:text-white focus-visible:text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-7 border-b border-white/15 py-12 lg:flex-row lg:items-end lg:justify-between md:py-16">
          <div className="min-w-0">
            <p className="label-mono text-[11px] text-white/50">Let&apos;s get to work</p>
            <h2 className="mt-3 max-w-xl font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              The right equipment starts with a conversation.
            </h2>
          </div>
          <a
            href={generalWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit shrink-0 items-center justify-center gap-3 rounded-md bg-accent px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            Enquire on WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="grid gap-x-8 gap-y-12 py-12 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,.7fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:py-16">
          <div className="max-w-sm">
            <Link href="/" aria-label="Shree Sanjay Equipments home" className="inline-block rounded-md bg-paper px-4 py-2">
              <Image src="/images/brand/logo-full.png" alt="Shree Sanjay Equipments" width={300} height={225} className="h-auto w-48" unoptimized />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              Based in Coimbatore since 2004. Construction equipment, repairs and servicing for the work ahead.
            </p>
          </div>

          <div>
            <h3 className="label-mono mb-5 text-[11px] text-white/45">Explore</h3>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              <Link href="/products" className={footerLink}>Products</Link>
              <Link href="/#services" className={footerLink}>Repairs &amp; Servicing</Link>
              <Link href="/about" className={footerLink}>About Us</Link>
              <Link href="/contact" className={footerLink}>Contact</Link>
            </nav>
          </div>

          <div>
            <h3 className="label-mono mb-5 text-[11px] text-white/45">Equipment</h3>
            <nav aria-label="Equipment categories" className="flex flex-col gap-3">
              {categories.map((category) => (
                <Link key={category.slug} href={`/products?category=${category.slug}`} className={footerLink}>
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="label-mono mb-5 text-[11px] text-white/45">Get in touch</h3>
            <div className="flex flex-col gap-4 text-sm text-white/65">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919842230721" className="hover:text-white">+91 98422 30721</a>
                  <a href="tel:+919842106090" className="hover:text-white">+91 98421 06090</a>
                </div>
              </div>
              <a href="mailto:sanjayequipments@gmail.com" className="flex items-start gap-3 break-all hover:text-white">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
                sanjayequipments@gmail.com
              </a>
              <Link href="/contact" className="flex items-start gap-3 hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
                <span>Avinashi Road, Coimbatore<br />Tamil Nadu 641062</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Shree Sanjay Equipments. All rights reserved.</p>
          <a
            href="https://www.instagram.com/shreesanjayequipments?stkn=dmkzODBseGN5eWVy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 transition-colors hover:text-white"
          >
            <InstagramIcon className="h-4 w-4" /> Instagram <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
