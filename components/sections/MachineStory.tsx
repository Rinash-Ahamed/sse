"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import EquipmentImage from "@/components/ui/EquipmentImage";
import SectionLabel from "@/components/ui/SectionLabel";
import type { CategorySlug } from "@/lib/products";

const blocks: { number: string; title: string; body: string; category: CategorySlug }[] = [
  {
    number: "01",
    title: "Compaction",
    body: "Designed for demanding site work.",
    category: "compaction",
  },
  {
    number: "02",
    title: "Material Handling",
    body: "Equipment for moving material efficiently.",
    category: "material-lifting",
  },
  {
    number: "03",
    title: "Screening",
    body: "Practical site equipment for material preparation.",
    category: "screening",
  },
];

function Block({
  block,
  onActive,
}: {
  block: (typeof blocks)[number];
  onActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div ref={ref} className="min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center">
      <span className="label-mono text-[11px] text-accent">{block.number}</span>
      <p className="label-mono text-xs text-ink-muted mt-2">{block.title.toUpperCase()}</p>
      <p className="mt-3 font-heading font-semibold text-2xl md:text-3xl tracking-tight max-w-sm">
        {block.body}
      </p>
    </div>
  );
}

export default function MachineStory() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <SectionLabel number="04">Built For The Site</SectionLabel>

        {/* Desktop: sticky image + scrolling blocks */}
        <div className="mt-10 hidden md:grid grid-cols-12 gap-10">
          <div className="col-span-5 sticky top-24 self-start h-[60vh]">
            <div className="relative h-full w-full border border-line overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <EquipmentImage category={blocks[active].category} label={blocks[active].title} categoryPreview />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="col-span-7">
            {blocks.map((b, i) => (
              <Block key={b.number} block={b} onActive={() => setActive(i)} />
            ))}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="mt-8 md:hidden flex flex-col gap-8">
          {blocks.map((b) => (
            <div key={b.number} className="border border-line overflow-hidden">
              <div className="aspect-[4/3] relative">
                <EquipmentImage category={b.category} label={b.title} categoryPreview />
              </div>
              <div className="p-5">
                <span className="label-mono text-[11px] text-accent">{b.number}</span>
                <p className="label-mono text-xs text-ink-muted mt-2">{b.title.toUpperCase()}</p>
                <p className="mt-2 font-heading font-semibold text-xl tracking-tight">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
