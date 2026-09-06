import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/lib/content";

type SkillsProps = {
  skillCategories: SkillCategory[];
};

export function Skills({ skillCategories }: SkillsProps) {
  const sortedCategories = [...skillCategories].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <section
      id="skills"
      className="relative w-full border-t border-border/60 px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader label="03 — Skills" title="Technical skills" />

        <div className="grid gap-6 sm:grid-cols-2 scroll-stagger">
          {sortedCategories.map((category) => {
            const categoryName = category.categoryName ?? "";
            const skills =
              category.skills?.filter((s): s is string => s !== null) ?? [];

            return (
              <div
                key={category.categoryName}
                className="group scroll-slide-up surface-elevated p-6 transition-all duration-300 hover:shadow-premium"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/90 transition-colors duration-200 group-hover:text-primary">
                  {categoryName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-default bg-background/80 font-normal transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
