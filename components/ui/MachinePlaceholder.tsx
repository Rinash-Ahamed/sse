import { cn } from "@/lib/utils";
import {
  Settings2,
  Wrench,
  Layers,
  Waves,
  Filter,
  Scissors,
  Package,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import type { CategorySlug } from "@/lib/products";

const iconByCategory: Record<CategorySlug, LucideIcon> = {
  "concrete-vibration": Waves,
  compaction: Layers,
  "material-lifting": Package,
  screening: Filter,
  cutting: Scissors,
  "site-equipment": Wrench,
  "power-tools": Hammer,
};

export default function MachinePlaceholder({
  category,
  label,
  className,
  dense = false,
}: {
  category: CategorySlug;
  label: string;
  className?: string;
  dense?: boolean;
}) {
  const Icon = iconByCategory[category] ?? Settings2;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-surface",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        aria-hidden
      >
        <defs>
          <pattern id={`grid-${category}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${category})`} className="text-steel" />
      </svg>

      {/* corner ticks */}
      <span className="absolute top-3 left-3 h-3 w-3 border-t border-l border-ink/25" />
      <span className="absolute top-3 right-3 h-3 w-3 border-t border-r border-ink/25" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-ink/25" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-ink/25" />

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
        <Icon
          strokeWidth={1.25}
          className={cn("text-steel/70", dense ? "h-8 w-8" : "h-12 w-12 md:h-16 md:w-16")}
        />
        {!dense && (
          <p className="label-mono text-[10px] text-ink-muted max-w-[220px]">
            {label} · Photograph to be added
          </p>
        )}
      </div>
    </div>
  );
}
