"use client";

import { useInView } from "motion/react";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Tag = "div" | "section" | "p" | "span" | "ul" | "ol" | "li" | "h2" | "h3" | "figure" | "header";

type RevealProps = {
  as?: Tag;
  id?: string;
  variant?: "up" | "fade" | "clip" | "lines";
  delay?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Marks its element as revealed once it scrolls into view. The visual
 * transition lives in globals.css so content stays visible without JS.
 */
export function Reveal({
  as = "div",
  id,
  variant = "up",
  delay = 0,
  amount = 0.2,
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px -6% 0px" });
  const Tag = as as ElementType;

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal={variant}
      data-in={inView ? "" : undefined}
      style={{ ...style, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Heading whose lines rise out of a mask, one after another. */
export function Lines({
  as = "h2",
  id,
  lines,
  className,
  delay = 0,
}: {
  as?: "h2" | "h3" | "p";
  id?: string;
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal as={as} id={id} variant="lines" delay={delay} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span style={{ "--line-index": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Reveal>
  );
}
