"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { Menu, X, Phone, ArrowUpRight, ArrowRight, Home, Package, Building2, Wrench, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { generalWhatsAppLink } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Home", icon: Home, description: "Discover Shree Sanjay Equipments" },
  { href: "/products", label: "Products", icon: Package, description: "Find equipment for your next project" },
  { href: "/about", label: "About", icon: Building2, description: "Get to know our team" },
  { href: "/#services", label: "Services", icon: Wrench, description: "Equipment repairs and servicing" },
  { href: "/contact", label: "Contact", icon: Mail, description: "Talk to us about your requirements" },
];
const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function Brand({ onClick }: { onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <Link href="/" aria-label="Shree Sanjay Equipments home" onClick={onClick} className={cn("flex min-w-0 shrink-0 items-center gap-1.5 rounded-md sm:gap-2", focusStyle)}>
      <Image src="/images/brand/logo-mark.png" alt="" width={48} height={48} className="h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12" unoptimized priority />
      <span className="relative font-heading leading-tight">
        <span className="block text-[11px] font-extrabold tracking-tight text-accent sm:text-base">SHREE SANJAY</span>
        <span className="mt-1 block text-[8px] font-semibold tracking-[0.2em] text-ink sm:text-[10px] sm:tracking-[0.22em]">EQUIPMENTS</span>
        <span className="absolute left-0 top-full mt-0.5 block whitespace-nowrap text-[6px] font-semibold tracking-[0.24em] text-ink-muted sm:text-[8px] sm:tracking-[0.28em]">SINCE 2004</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    if (href !== "/" || pathname !== "/") return;

    event.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(window.history.state, "", "/");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    });
  }

  function isActive(href: string) {
    if (href.includes("#")) return pathname === "/" && hash === href.slice(1);
    if (href === "/") return pathname === "/" && hash !== "#services";
    return pathname === href || pathname.startsWith(href + "/");
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    const toggle = toggleRef.current;
    if (!dialog || !open) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    const onHistory = () => setOpen(false);
    desktop.addEventListener("change", onResize);
    window.addEventListener("popstate", onHistory);
    return () => {
      desktop.removeEventListener("change", onResize);
      window.removeEventListener("popstate", onHistory);
      document.body.style.overflow = previousOverflow;
      dialog.close();
      if (!desktop.matches) toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header data-site-header className={cn("sticky top-3 z-50 mx-3 translate-z-0 rounded-2xl border border-white/80 bg-paper/96 shadow-[0_12px_40px_rgba(32,36,39,0.13)] xl:mx-4", pathname === "/" && "-mb-18 sm:-mb-20")}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-2 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:px-8 xl:px-10">
        <Brand onClick={(event) => handleNavigation(event, "/")} />
        <nav aria-label="Main navigation" className="hidden items-center gap-2 rounded-full border border-line/70 bg-white/55 p-1 xl:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} scroll={!href.includes("#")} onClick={(event) => handleNavigation(event, href)} aria-current={isActive(href) ? (href.includes("#") ? "location" : "page") : undefined} className={cn("inline-flex min-h-10 items-center rounded-full px-5 text-[13px] font-semibold transition-colors hover:text-accent", focusStyle, isActive(href) ? "bg-paper text-accent shadow-sm" : "text-ink-muted")}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a href="tel:+919842230721" aria-label="Call Shree Sanjay Equipments" className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-accent transition-colors hover:bg-surface sm:hidden", focusStyle)}><Phone className="h-[18px] w-[18px]" aria-hidden="true" /></a>
          <Link href="/contact#enquiry" scroll={false} className={cn("hidden min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-[13px] font-semibold text-white shadow-[0_7px_18px_rgba(176,0,24,0.2)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong xl:inline-flex", focusStyle)}>Get a Quote <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          <button ref={toggleRef} type="button" className={cn("inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-ink px-3 text-sm font-medium text-white transition-colors hover:bg-accent xl:hidden", focusStyle)} onClick={() => setOpen(true)} aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation">
            <Menu className="h-5 w-5" aria-hidden="true" /><span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </div>
      <dialog ref={dialogRef} id="mobile-navigation" aria-labelledby="navigation-title" onCancel={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }} onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }} className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-[440px] border-0 bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/45 backdrop:backdrop-blur-sm">
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-5">
            <Brand onClick={(event) => handleNavigation(event, "/")} />
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close navigation menu" className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line hover:bg-surface", focusStyle)}><X className="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-6">
            <h2 id="navigation-title" className="label-mono mb-4 text-[10px] text-ink-muted">Explore Shree Sanjay</h2>
            <nav aria-label="Mobile and tablet navigation" className="space-y-1">
              {links.map(({ href, label, icon: Icon, description }) => (
                <Link key={href} href={href} scroll={!href.includes("#")} onClick={(event) => handleNavigation(event, href)} aria-current={isActive(href) ? (href.includes("#") ? "location" : "page") : undefined} className={cn("group flex min-h-[68px] items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-surface", focusStyle, isActive(href) && "bg-accent/7")}>
                  <span className={cn("inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md", isActive(href) ? "bg-accent text-white" : "border border-line bg-paper text-accent")}><Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1"><span className={cn("block text-sm font-semibold", isActive(href) && "text-accent")}>{label}</span><span className="mt-1 block text-[11px] leading-relaxed text-ink-muted">{description}</span></span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted group-hover:text-accent" aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <div className="mt-6 border-t border-line pt-6">
              <p className="text-sm font-semibold">Let&apos;s get your job moving.</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">Equipment enquiries, repairs and servicing.</p>
              <Link href="/contact#enquiry" scroll={false} onClick={() => setOpen(false)} className={cn("mt-4 flex min-h-12 items-center justify-between rounded-md bg-accent px-4 text-sm font-medium text-white hover:bg-accent-strong", focusStyle)}>Get a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href="tel:+919842230721" className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line text-xs font-medium hover:bg-surface", focusStyle)}><Phone className="h-4 w-4 text-accent" aria-hidden="true" />Call Us</a>
                <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-line text-xs font-medium hover:bg-surface", focusStyle)}><MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
