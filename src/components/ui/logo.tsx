"use client";

// Official outlines from the brand kit (asventia-brand/components/logo-paths.ts).
// Both shapes use currentColor so they follow the surrounding text colour.

import { MARKS } from "@brand/components/logo-paths";

type Props = { className?: string; title?: string };

export const WORDMARK = MARKS.wordmark;
export const MARK = MARKS.symbol;

export function Wordmark({ className, title = "Asventia" }: Props) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK.w} ${WORDMARK.h}`}
      className={className}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      <path fillRule="evenodd" d={WORDMARK.d} />
    </svg>
  );
}

export function Mark({ className, title }: Props) {
  return (
    <svg
      viewBox={`0 0 ${MARK.w} ${MARK.h}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      <path fillRule="evenodd" d={MARK.d} />
    </svg>
  );
}
