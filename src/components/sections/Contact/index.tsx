import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSection } from "@/lib/content";

// LinkedIn icon component (replacement for deprecated lucide-react Linkedin icon)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type ContactProps = {
  hero: HeroSection;
};

export function Contact({ hero }: ContactProps) {
  const email = hero.email ?? "";
  const linkedInUrl = hero.linkedInUrl ?? "";

  return (
    <section
      id="contact"
      className="relative w-full bg-muted/30 px-4 py-16 sm:py-24 overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent dark:from-primary/10" />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl relative inline-block scroll-fade-in">
          Get In Touch
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-12 bg-primary rounded-full" />
        </h2>
        <p className="mb-8 text-lg text-muted-foreground scroll-slide-up">
          I&apos;m always open to discussing new opportunities and interesting
          projects. Feel free to reach out!
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row scroll-slide-up">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <LinkedinIcon className="h-5 w-5" />
              Connect on LinkedIn
            </Button>
          </a>
          <a href={`mailto:${email}`}>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
            >
              <Mail className="h-5 w-5" />
              Send Email
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
