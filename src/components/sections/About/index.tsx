import { ScrollRevealGroup } from "@/components/motion/ScrollRevealGroup";
import { SectionHeader } from "@/components/SectionHeader";
import type { AboutSection } from "@/lib/content";

type AboutProps = {
  about: AboutSection;
};

export function About({ about }: AboutProps) {
  const title = about.title ?? "";
  const summary = about.summary ?? "";

  return (
    <section
      id="about"
      className="relative w-full border-t border-border/60 px-4 py-20 sm:py-28"
    >
      <ScrollRevealGroup className="mx-auto max-w-6xl">
        <div data-reveal>
          <SectionHeader label="01 — About" title={title} />
        </div>
        <p
          data-reveal
          className="max-w-3xl text-pretty text-lg leading-[1.75] text-muted-foreground whitespace-pre-line sm:text-xl"
        >
          {summary}
        </p>
      </ScrollRevealGroup>
    </section>
  );
}
