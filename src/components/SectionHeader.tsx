import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  label,
  title,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      data-section-header
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      <p
        className={cn(
          "mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80",
          align === "center" && "mx-auto",
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          align === "center" && "mx-auto max-w-2xl",
        )}
      >
        {title}
      </h2>
    </header>
  );
}
