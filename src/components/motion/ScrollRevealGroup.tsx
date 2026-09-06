"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useRef } from "react";
import {
  revealDuration,
  revealEase,
  revealStagger,
  revealYOffset,
} from "@/lib/motion/constants";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  start?: string;
};

export function ScrollRevealGroup({
  children,
  className,
  stagger = revealStagger,
  start = "top 82%",
}: ScrollRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !containerRef.current) {
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>(
        containerRef.current.querySelectorAll("[data-reveal]"),
      );

      if (items.length === 0) {
        return;
      }

      gsap.set(items, { opacity: 0, y: revealYOffset });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: revealDuration,
        stagger,
        ease: revealEase,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, stagger, start] },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
