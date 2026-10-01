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

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#+";

/** Decodes a string left to right with a short trail of random glyphs. */
export function useScramble(text: string, active: boolean, charsPerFrame = 0.9) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let frame = 0;
    const tick = () => {
      frame += 1;
      const revealed = Math.min(text.length, Math.floor(frame * charsPerFrame));
      let s = text.slice(0, revealed);
      for (let i = revealed; i < Math.min(text.length, revealed + 5); i++) {
        s += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, active, charsPerFrame]);

  return active ? out : text;
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

/** Calls back on an interval while `running` is true. */
export function useInterval(callback: () => void, ms: number, running: boolean) {
  const tick = useEffectEvent(callback);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => tick(), ms);
    return () => window.clearInterval(id);
  }, [ms, running]);
}
