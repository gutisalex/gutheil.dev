"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { revealDuration, revealEase } from "@/lib/motion/constants";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import type { Experience as ExperienceType } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const sortedExperiences = [...experiences].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current || !timelineRef.current) {
        return;
      }

      const line = timelineRef.current.querySelector<HTMLElement>(
        "[data-timeline-line]",
      );
      const entries = gsap.utils.toArray<HTMLElement>(
        timelineRef.current.querySelectorAll("[data-timeline-entry]"),
      );
      const dots = gsap.utils.toArray<HTMLElement>(
        timelineRef.current.querySelectorAll("[data-timeline-dot]"),
      );

      if (line) {
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.45,
          },
        });
      }

      const header = sectionRef.current.querySelector<HTMLElement>(
        "[data-section-header]",
      );

      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: revealDuration,
            ease: revealEase,
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (entries.length > 0) {
        gsap.set(entries, { opacity: 0, y: 40 });
        gsap.set(dots, { opacity: 0, scale: 0.4 });

        entries.forEach((entry, index) => {
          const dot = dots[index];

          gsap.to(entry, {
            opacity: 1,
            y: 0,
            duration: revealDuration,
            ease: revealEase,
            scrollTrigger: {
              trigger: entry,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          if (dot) {
            gsap.to(dot, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: 0.08,
              ease: "back.out(1.6)",
              scrollTrigger: {
                trigger: entry,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, experiences] },
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full border-t border-border/60 bg-muted/30 px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="02 — Experience"
          title="Professional experience"
        />

        <div ref={timelineRef} className="relative">
          <div
            data-timeline-line
            className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-border sm:block"
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
                  data-timeline-entry
                  className="group relative sm:pl-10"
                >
                  <div
                    data-timeline-dot
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
                      <ul className="max-w-3xl space-y-2 text-muted-foreground">
                        {achievements
                          .split("\n")
                          .map((achievement) => achievement.trim())
                          .filter((achievement) => achievement.length > 0)
                          .map((achievement) => {
                            const cleaned = achievement.replace(/^-\s*/, "");
                            return (
                              <li
                                key={achievement}
                                className="flex gap-3 text-pretty leading-relaxed"
                              >
                                <span
                                  className="mt-[0.65em] size-1 shrink-0 bg-primary/35"
                                  aria-hidden="true"
                                />
                                <span>{cleaned}</span>
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
