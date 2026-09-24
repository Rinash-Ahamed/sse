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
    <div className={cn("flex min-w-0 items-center gap-3 text-ink-muted", className)}>
      {number && <span className="label-mono text-[11px] text-accent">{number}</span>}
      <span className="label-mono min-w-0 text-[11px]">{children}</span>
      <span className="hidden h-px w-8 shrink-0 bg-accent sm:block" />
    </div>
  );
}
