"use client";

import { AnimatePresence, m } from "motion/react";
import type { ReactNode } from "react";
import { Check } from "@/components/ui/icons";

export const EASE = [0.22, 1, 0.36, 1] as const;

export type SimProps = {
  playing: boolean;
  instant: boolean;
  onDone: () => void;
};

/** Mounts children with a short rise once `show` turns true. */
export function Appear({
  show,
  children,
  className,
  y = 10,
  delay = 0,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <m.div
          className={className}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, delay, ease: EASE }}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function TypingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 bg-current"
          style={{ animation: `dots 1.1s ${i * 0.16}s infinite var(--ease-in-out-quart)`}}
        />
      ))}
    </span>
  );
}

/** A check line that sits pending (hollow) until `done`. */
export function CheckLine({
  done,
  children,
  tone = "dark",
}: {
  done: boolean;
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 grid size-4 shrink-0 place-items-center transition-colors duration-500 ${
          done
            ? "bg-white text-ink"
            : tone === "dark"
              ? "ring-1 ring-white/25 ring-inset"
              : "ring-1 ring-ink/20 ring-inset"
        }`}
      >
        {done && <Check className="size-2.5" strokeWidth={3} />}
      </span>
      <span
        className={`text-[0.84rem] leading-snug transition-colors duration-500 ${
          tone === "dark" ? (done ? "text-white/90" : "text-white/55") : done ? "text-ink" : "text-muted"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "strong" | "outline" }) {
  const tones = {
    neutral: "bg-white/8 text-white/70",
    strong: "bg-white text-ink",
    outline: "text-white ring-1 ring-white/40 ring-inset",
  };
  return (
    <span className={`label inline-flex items-center gap-1.5 px-2 py-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return <p className="label text-white/55">{children}</p>;
}
