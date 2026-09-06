import { LinkedinIcon } from "@/components/LinkedinIcon";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import type { HeroSection } from "@/lib/content";
import { ContactForm } from "./ContactForm";

type ContactProps = {
  hero: HeroSection;
};

export function Contact({ hero }: ContactProps) {
  const linkedInUrl = hero.linkedInUrl ?? "";

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-border/60 px-4 py-20 sm:py-28"
    >
      <div className="hero-mesh absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          label="05 — Contact"
          title="Get in touch"
          align="center"
        />
        <p className="scroll-slide-up mx-auto mb-10 max-w-2xl text-pretty text-center text-lg text-muted-foreground">
          Open to new opportunities and interesting projects. Send a message or
          connect on LinkedIn.
        </p>

        <div className="scroll-slide-up mx-auto mb-10 max-w-xl surface-elevated p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="scroll-slide-up text-center">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="mx-auto gap-2 shadow-premium"
            >
              <LinkedinIcon className="size-4" />
              Connect on LinkedIn
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
