"use client";

import { useEffect } from "react";

const MAX_TILT_DEG = 5;

/**
 * Drives the cursor spotlight and 3D tilt on every MUI Card by writing CSS variables
 * (`--mouse-x`, `--mouse-y`, `--tilt-x`, `--tilt-y`) that the Card theme override consumes.
 * Only runs on devices with a precise pointer; tilt is skipped for reduced-motion users.
 */
export default function CardEffects() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeCard: HTMLElement | null = null;
    let frame = 0;

    const resetTilt = (card: HTMLElement) => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    };

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = event.target instanceof Element ? event.target : null;
        const card = target?.closest<HTMLElement>(".MuiCard-root") ?? null;

        if (activeCard && activeCard !== card) resetTilt(activeCard);
        activeCard = card;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        if (!reducedMotion) {
          card.style.setProperty("--tilt-x", `${(0.5 - y / rect.height) * MAX_TILT_DEG}deg`);
          card.style.setProperty("--tilt-y", `${(x / rect.width - 0.5) * MAX_TILT_DEG}deg`);
        }
      });
    };

    const onPointerLeaveWindow = () => {
      if (activeCard) resetTilt(activeCard);
      activeCard = null;
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveWindow);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeaveWindow);
    };
  }, []);

  return null;
}
