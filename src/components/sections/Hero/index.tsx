"use client";

import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkedinIcon } from "@/components/LinkedinIcon";
import { Button } from "@/components/ui/button";
import type { HeroSection } from "@/lib/content";
import { cn, obfuscateEmail } from "@/lib/utils";

type HeroProps = {
  hero: HeroSection;
  contactEmail: string;
};

export function Hero({ hero, contactEmail }: HeroProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const name = hero.name ?? "";
  const title = hero.title ?? "";
  const location = hero.location ?? "";
  const email = contactEmail;
  const linkedInUrl = hero.linkedInUrl ?? "";
  const profileImage = hero.profileImage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 py-24 sm:py-28"
    >
      <div className="hero-mesh absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="space-y-6 text-center lg:text-left">
          <p className="animate-in fade-in font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary/80 duration-700">
            Portfolio
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4 duration-700 delay-150">
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl">
              {name}
            </h1>
            <p className="text-pretty text-lg font-medium text-muted-foreground sm:text-xl lg:max-w-xl">
              {title}
            </p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-1 text-sm text-muted-foreground duration-700 delay-200 sm:flex-row sm:justify-center lg:items-start lg:justify-start">
            <span>{location}</span>
            {email && (
              <>
                <span className="hidden sm:inline text-border">/</span>
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-xs tracking-wide transition-colors duration-200 hover:text-foreground sm:text-sm"
                >
                  {obfuscateEmail(email)}
                </a>
              </>
            )}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center gap-3 pt-2 duration-700 delay-300 sm:flex-row sm:justify-center lg:justify-start">
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="min-w-44 gap-2 shadow-premium">
                <LinkedinIcon className="size-4" />
                LinkedIn
              </Button>
            </a>
            <a href="/api/resume/download" download="Alexander_Gutheil_CV.pdf">
              <Button
                size="lg"
                variant="outline"
                className="min-w-44 gap-2 shadow-premium"
              >
                <Download className="size-4" />
                Download CV
              </Button>
            </a>
          </div>
        </div>

        {profileImage?.url && (
          <div className="animate-in fade-in zoom-in mx-auto duration-700 lg:mx-0">
            <div className="relative">
              <div className="absolute -inset-3 bg-linear-to-br from-primary/20 via-transparent to-primary/10 blur-2xl" />
              <div className="relative size-48 overflow-hidden ring-1 ring-foreground/10 shadow-premium-lg sm:size-56 lg:size-64">
                <Image
                  src={profileImage.url}
                  alt={profileImage.title || name}
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <a
        href="#about"
        className={cn(
          "absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-all duration-300 hover:text-foreground",
          isScrolled ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ArrowDown className="size-5 animate-pulse-slow" />
      </a>
    </section>
  );
}
