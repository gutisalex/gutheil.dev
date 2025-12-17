import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/lib/contentful/queries";

type SkillsProps = {
  skillCategories: SkillCategory[];
};

export function Skills({ skillCategories }: SkillsProps) {
  const sortedCategories = [...skillCategories].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <section id="skills" className="w-full bg-muted/30 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl relative inline-block">
          Technical Skills
          <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary rounded-full" />
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {sortedCategories.map((category) => {
            const categoryName = category.categoryName ?? "";
            const skills = category.skills?.filter((s): s is string => s !== null) ?? [];

            return (
              <div key={category.sys.id} className="space-y-3 group">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                  {categoryName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-200 cursor-default"
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
