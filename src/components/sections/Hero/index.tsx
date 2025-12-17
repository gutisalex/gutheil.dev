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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16"
    >
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        {profileImage?.url && (
          <div className="relative h-48 w-48 overflow-hidden rounded-full sm:h-56 sm:w-56">
            <Image
              src={profileImage.url}
              alt={profileImage.title || name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {name}
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl">{title}</p>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center">
            <span>{location}</span>
            <span className="hidden sm:inline">•</span>
            <a
              href={`mailto:${email}`}
              className="hover:text-foreground transition-colors"
            >
              {email}
            </a>
          </div>
        </div>

        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="mt-4 flex items-center gap-2">
            <Linkedin className="h-5 w-5" />
            View LinkedIn Profile
          </Button>
        </a>
      </div>
    </section>
  );
}
