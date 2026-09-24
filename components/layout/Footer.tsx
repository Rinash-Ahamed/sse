import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { categories } from "@/lib/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="Shree Sanjay Equipments home"><Image src="/images/brand/logo-full.png" alt="Shree Sanjay Equipments" width={300} height={216} className="w-60 h-auto" /></Link>
          <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-xs">
            Construction equipment, repairs and servicing in Coimbatore, Tamil Nadu.
          </p>
        </div>

        <div>
          <p className="label-mono text-[11px] text-ink-muted mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/products" className="hover:text-accent transition-colors">Products</Link></li>
            <li><Link href="/#services" className="hover:text-accent transition-colors">Repair &amp; Servicing</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
            <li><Link href="/#applications" className="hover:text-accent transition-colors">Applications</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-mono text-[11px] text-ink-muted mb-4">Equipment</p>
          <ul className="space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className="hover:text-accent transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-mono text-[11px] text-ink-muted mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-ink-muted">
            <li className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              <span>
                <a href="tel:+919842230721" className="hover:text-ink">+91 98422 30721</a>
                <br />
                <a href="tel:+919842106090" className="hover:text-ink">+91 98421 06090</a>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              <a href="mailto:sanjayequipments@gmail.com" className="hover:text-ink break-all">
                sanjayequipments@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
              <span>Coimbatore, Tamil Nadu</span>
            </li>
            <li className="flex items-start gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/shreesanjayequipments?stkn=dmkzODBseGN5eWVy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                <InstagramIcon className="h-4 w-4 text-accent" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-muted">
          <p>© {year} Shree Sanjay Equipments. All Rights Reserved.</p>
          <p className="label-mono text-[10px]">COIMBATORE · TAMIL NADU · INDIA</p>
        </div>
      </div>
    </footer>
  );
}
