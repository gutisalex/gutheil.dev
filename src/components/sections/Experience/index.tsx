import { Separator } from "@/components/ui/separator";
import type { Experience as ExperienceType } from "@/lib/content";

type ExperienceProps = {
  experiences: ExperienceType[];
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatDateRange(
  startDate: string,
  endDate?: string,
  isCurrent?: boolean,
): string {
  const start = formatDate(startDate);
  if (isCurrent) {
    return `${start} – Present`;
  }
  if (endDate) {
    const end = formatDate(endDate);
    return `${start} – ${end}`;
  }
  return start;
}

export function Experience({ experiences }: ExperienceProps) {
  const sortedExperiences = [...experiences].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <section id="experience" className="w-full bg-muted/20 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl relative inline-block scroll-fade-in">
          Professional Experience
          <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary rounded-full" />
        </h2>

        <div className="space-y-8 scroll-stagger">
          {sortedExperiences.map((experience, index) => {
            const company = experience.company ?? "";
            const position = experience.position ?? "";
            const location = experience.location ?? "";
            const startDate = experience.startDate
              ? typeof experience.startDate === "string"
                ? experience.startDate
                : new Date(experience.startDate).toISOString().split("T")[0]
              : "";
            const endDate = experience.endDate
              ? typeof experience.endDate === "string"
                ? experience.endDate
                : new Date(experience.endDate).toISOString().split("T")[0]
              : undefined;
            const isCurrent = experience.isCurrent ?? false;
            const description = experience.description ?? "";
            const achievements = experience.achievements ?? undefined;

            return (
              <div
                key={`${experience.company}-${experience.position}-${index}`}
                className="group scroll-slide-up"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                      {position}
                    </h3>
                    <p className="text-lg font-medium text-muted-foreground">
                      {company}
                    </p>
                    <p className="text-sm text-muted-foreground">{location}</p>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground sm:text-right">
                    {formatDateRange(startDate, endDate, isCurrent)}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  {achievements && (
                    <div className="mt-4">
                      <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
                        {achievements
                          .split("\n")
                          .map((achievement) => achievement.trim())
                          .filter((achievement) => achievement.length > 0)
                          .map((achievement) => {
                            // Remove leading "- " if present
                            const cleaned = achievement.replace(/^-\s*/, "");
                            return (
                              <li key={achievement} className="leading-relaxed">
                                {cleaned}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </div>

                {index < sortedExperiences.length - 1 && (
                  <Separator className="mt-8" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
