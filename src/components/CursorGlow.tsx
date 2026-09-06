"use client";

import { useEffect, useRef, useState } from "react";

// Fine-pointer devices only: touch has no hover position to follow, and the
// effect is pure decoration, so it also stays off under reduced motion.
const GLOW_MEDIA_QUERY =
  "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

const FOLLOW_EASE = 0.16;
const SETTLE_THRESHOLD = 0.5;

/**
 * A soft accent spotlight that trails the mouse across the page background.
 * Position updates run on requestAnimationFrame and only touch `transform`
 * and `opacity`, so the layer never triggers layout.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(GLOW_MEDIA_QUERY);
    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const glow = glowRef.current;
    if (!enabled || !glow) {
      return;
    }

    let frame = 0;
    let visible = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const render = () => {
      frame = 0;
      current.x += (target.x - current.x) * FOLLOW_EASE;
      current.y += (target.y - current.y) * FOLLOW_EASE;
      glow.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;

      const settled =
        Math.abs(target.x - current.x) < SETTLE_THRESHOLD &&
        Math.abs(target.y - current.y) < SETTLE_THRESHOLD;

      if (!settled) {
        frame = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        // Appear in place instead of gliding in from the last known spot.
        visible = true;
        current.x = target.x;
        current.y = target.y;
        glow.style.opacity = "1";
      }

      if (!frame) {
        frame = requestAnimationFrame(render);
      }
    };

    const hide = () => {
      visible = false;
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed top-0 left-0 z-0 size-[44rem] opacity-0 transition-opacity duration-700 ease-out will-change-transform"
    />
  );
}
