/**
 * Asventia logo, inline and in currentColor.
 *   wordmark  "asventia" (default)
 *   lockup    with the "Intelligence in motion" tagline (hero, footer, covers) — min 40px tall
 *   symbol    the "a" alone (favicon, avatar, square spaces) — min 16px
 * Colour: var(--ink) on light grounds, var(--on-inverse) on navy, var(--on-accent) on blue. Nothing else.
 */
import type { CSSProperties } from 'react';
import { MARKS } from './logo-paths';

export type LogoProps = {
  variant?: 'wordmark' | 'lockup' | 'symbol';
  /** Rendered height in px. Wordmark min 20, lockup min 40, symbol min 16. */
  height?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** Accessible name; set to "" when a visible "Asventia" text sits next to it. */
  title?: string;
};

export function Logo({ variant = 'wordmark', height, color, className, style, title = 'Asventia' }: LogoProps) {
  const m = MARKS[variant];
  const h = height ?? (variant === 'symbol' ? 32 : variant === 'lockup' ? 48 : 28);
  return (
    <svg
      viewBox={`0 0 ${m.w} ${m.h}`}
      height={h}
      width={(h * m.w) / m.h}
      className={className}
      style={{ display: 'block', color: color ?? 'var(--ink)', ...style }}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={m.d} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export default Logo;
