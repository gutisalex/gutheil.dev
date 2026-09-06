"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LinkedinIcon } from "@/components/LinkedinIcon";
import { Button } from "@/components/ui/button";
import { revealDuration, revealEase } from "@/lib/motion/constants";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import type { HeroSection } from "@/lib/content";
import { cn, obfuscateEmail } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HeroProps = {
  hero: HeroSection;
  contactEmail: string;
};

export function Hero({ hero, contactEmail }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

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

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      if (prefersReducedMotion) {
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>(
        sectionRef.current.querySelectorAll("[data-hero-item]"),
      );

      gsap.set(items, { opacity: 0, y: 48 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: revealDuration,
        stagger: 0.12,
        ease: revealEase,
        delay: 0.1,
      });

      if (meshRef.current) {
        gsap.to(meshRef.current, {
          y: 72,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      if (profileWrapRef.current) {
        gsap.to(profileWrapRef.current, {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-4 py-24 sm:py-28"
    >
      <div ref={meshRef} className="hero-mesh absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="space-y-6 text-center lg:text-left">
          <p
            data-hero-item
            className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary/80"
          >
            Portfolio
          </p>

          <div data-hero-item className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl">
              {name}
            </h1>
            <p className="text-pretty text-lg font-medium text-muted-foreground sm:text-xl lg:max-w-xl">
              {title}
            </p>
          </div>

          <div
            data-hero-item
            className="flex flex-col items-center gap-1 text-sm text-muted-foreground sm:flex-row sm:justify-center lg:items-start lg:justify-start"
          >
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

          <div
            data-hero-item
            className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start"
          >
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
          <div
            ref={profileWrapRef}
            data-hero-item
            className="mx-auto lg:mx-0"
          >
            <div className="relative">
              <div
                className="absolute -inset-5 bg-linear-to-br from-primary/30 via-primary/15 to-primary/20 blur-3xl dark:from-primary/50 dark:via-primary/25 dark:to-primary/35"
                aria-hidden="true"
              />
              <div className="relative size-48 overflow-hidden rounded-2xl ring-1 ring-border/70 shadow-premium-lg transition-transform duration-300 hover:scale-[1.02] before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-2xl before:ring-1 before:ring-inset before:ring-white/15 dark:ring-primary/35 dark:shadow-[0_0_0_1px_oklch(0.68_0.1_215_/_20%),0_12px_40px_-8px_oklch(0_0_0_/_55%),0_0_48px_-12px_oklch(0.68_0.1_215_/_35%)] sm:size-56 lg:size-64">
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
