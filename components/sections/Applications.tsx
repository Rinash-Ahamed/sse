import SectionLabel from "@/components/ui/SectionLabel";
import { RevealHeading, FadeUp } from "@/components/ui/RevealText";
import EquipmentImage from "@/components/ui/EquipmentImage";
import type { CategorySlug } from "@/lib/products";

const applications: { name: string; category: CategorySlug }[] = [
  { name: "Concrete Work", category: "concrete-vibration" },
  { name: "Site Compaction", category: "compaction" },
  { name: "Material Lifting", category: "material-lifting" },
  { name: "Sand Screening", category: "screening" },
  { name: "Paver & Surface Work", category: "cutting" },
  { name: "General Construction", category: "site-equipment" },
];

export default function Applications() {
  return (
    <section id="applications" className="border-t border-line scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <SectionLabel>Applications</SectionLabel>
        <RevealHeading as="h2" className="mt-4 font-heading font-extrabold text-3xl md:text-5xl tracking-tight">
          Where the equipment gets to work
        </RevealHeading>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {applications.map((a, i) => (
            <FadeUp key={a.name} delay={(i % 3) * 0.06}>
              <div className="group border border-line overflow-hidden">
                <div className="relative aspect-square">
                  <EquipmentImage category={a.category} label={a.name} categoryPreview />
                </div>
                <div className="px-4 py-3 border-t border-line">
                  <p className="text-[13px] md:text-sm font-medium tracking-tight">{a.name}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
