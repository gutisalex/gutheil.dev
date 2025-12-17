import type { AboutSection } from "@/lib/contentful/queries";

type AboutProps = {
  about: AboutSection;
};

export function About({ about }: AboutProps) {
  const title = about.title ?? "";
  const summary = about.summary ?? "";

  return (
    <section id="about" className="w-full bg-muted/30 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-0 h-1 w-12 bg-primary rounded-full" />
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
          {summary}
        </p>
      </div>
    </section>
  );
}
