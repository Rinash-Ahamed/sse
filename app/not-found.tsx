import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-28 text-center">
      <p className="label-mono text-[11px] text-accent">404</p>
      <h1 className="mt-4 font-heading font-extrabold text-3xl md:text-5xl tracking-tight">
        Equipment not found
      </h1>
      <p className="mt-4 text-sm text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/products"
        className="group mt-8 inline-flex items-center gap-2 rounded-md bg-accent hover:bg-accent-strong text-white px-6 py-3.5 text-[13px] font-medium tracking-tight"
      >
        Browse Products
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
