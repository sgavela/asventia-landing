"use client";

import { useEffect, useEffectEvent, useState, useSyncExternalStore } from "react";

/**
 * Steps through a fixed timeline. Each entry is how long (ms) to hold that
 * step before moving on. Remount the component (via `key`) to replay.
 */
export function useSequence(
  durations: readonly number[],
  playing: boolean,
  onDone?: () => void,
) {
  const [step, setStep] = useState(0);
  const finish = useEffectEvent(() => onDone?.());

  useEffect(() => {
    if (!playing) return;
    if (step >= durations.length) {
      finish();
      return;
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), durations[step]);
    return () => window.clearTimeout(t);
  }, [playing, step, durations]);

  return step;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Hydration-safe reduced-motion flag: false for the server render and the
 * hydration pass, then the real preference. (motion's useReducedMotion reads
 * it during the first client render, which mismatches the server HTML.)
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
