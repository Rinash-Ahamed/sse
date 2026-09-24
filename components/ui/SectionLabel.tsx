import { cn } from "@/lib/utils";

export default function SectionLabel({
  children,
  number,
  className,
}: {
  children: React.ReactNode;
  number?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 text-ink-muted", className)}>
      {number && <span className="label-mono text-[11px] text-accent">{number}</span>}
      <span className="label-mono text-[11px]">{children}</span>
      <span className="h-px flex-1 max-w-[60px] bg-accent" />
    </div>
  );
}
