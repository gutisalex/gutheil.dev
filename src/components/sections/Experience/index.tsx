import { SectionHeader } from "@/components/SectionHeader";
import type { Experience as ExperienceType } from "@/lib/content";

type ExperienceProps = {
  experiences: ExperienceType[];
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
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
    <section
      id="experience"
      className="relative w-full border-t border-border/60 bg-muted/30 px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="02 — Experience"
          title="Professional experience"
        />

        <div className="relative scroll-stagger">
          <div
            className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-border sm:block"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {sortedExperiences.map((experience) => {
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
              const experienceKey = `${company}-${position}-${startDate}`;

              return (
                <article
                  key={experienceKey}
                  className="group relative scroll-slide-up sm:pl-10"
                >
                  <div
                    className="absolute left-0 top-2 hidden size-2 -translate-x-1/2 bg-primary ring-4 ring-background sm:block"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-primary">
                        {position}
                      </h3>
                      <p className="text-base font-medium text-foreground/80">
                        {company}
                      </p>
                      {location && (
                        <p className="text-sm text-muted-foreground">
                          {location}
                        </p>
                      )}
                    </div>
                    <time className="shrink-0 font-mono text-xs tabular-nums tracking-wide text-muted-foreground sm:text-right sm:text-sm">
                      {formatDateRange(startDate, endDate, isCurrent)}
                    </time>
                  </div>

                  <div className="mt-5 space-y-4">
                    <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                    {achievements && (
                      <ul className="max-w-3xl space-y-2 border-l border-border/80 pl-4 text-muted-foreground">
                        {achievements
                          .split("\n")
                          .map((achievement) => achievement.trim())
                          .filter((achievement) => achievement.length > 0)
                          .map((achievement) => {
                            const cleaned = achievement.replace(/^-\s*/, "");
                            return (
                              <li
                                key={achievement}
                                className="text-pretty leading-relaxed"
                              >
                                {cleaned}
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
