import { Box, ShieldCheck, MapPin, Wrench } from "lucide-react";
const items = [
  { icon: Box, title: "Construction Equipment", detail: "Site and Project Solutions" },
  { icon: ShieldCheck, title: "Quality Equipment", detail: "Reliable Performance" },
  { icon: MapPin, title: "Coimbatore, Tamil Nadu", detail: "Local Support" },
  { icon: Wrench, title: "Product Enquiry", detail: "Direct Customer Support" },
];
export default function CapabilityStrip() {
  return <div className="border-b border-line bg-paper"><div className="mx-auto max-w-7xl px-5 md:px-8 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {items.map(({ icon: Icon, title, detail }) => <div key={title} className="flex items-center gap-4 lg:not-first:border-l lg:not-first:pl-6">
      <Icon className="h-9 w-9 shrink-0 text-ink" strokeWidth={1.3} />
      <div><p className="label-mono text-[10px] font-medium">{title}</p><p className="mt-1 text-xs text-ink-muted">{detail}</p></div>
    </div>)}
  </div></div>;
}
