import { Linkedin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { HeroSection } from "@/lib/contentful/queries";

type HeroProps = {
  hero: HeroSection;
};

export function Hero({ hero }: HeroProps) {
  const name = hero.name ?? "";
  const title = hero.title ?? "";
  const location = hero.location ?? "";
  const email = hero.email ?? "";
  const linkedInUrl = hero.linkedInUrl ?? "";
  const profileImage = hero.profileImage;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10" />

      <div className="relative flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        {profileImage?.url && (
          <div className="relative h-48 w-48 overflow-hidden rounded-full sm:h-56 sm:w-56 ring-4 ring-primary/10 dark:ring-primary/20 shadow-lg animate-in fade-in zoom-in duration-700">
            <Image
              src={profileImage.url}
              alt={profileImage.title || name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
            {name}
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl">{title}</p>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center">
            <span>{location}</span>
            <span className="hidden sm:inline">•</span>
            <a
              href={`mailto:${email}`}
              className="hover:text-foreground transition-colors duration-200"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="mt-4 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Linkedin className="h-5 w-5" />
              View LinkedIn Profile
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
