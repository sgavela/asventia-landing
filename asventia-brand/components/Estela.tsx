'use client';

/**
 * Estela — Asventia's wave system, drawn from the bowl and tail of the logo's "a".
 *
 *   cinta  a ribbon of hairlines that twists and tapers to a point (default; hero, covers)
 *   eco    contour echoes of the "a" itself (pure brand moments: social, closing slides)
 *   ondas  stacked signal lines with a swell travelling through them (product, data)
 *
 * The SVG fills its parent (width/height 100%) and crops like `object-fit: cover`;
 * `width`/`height` only set the drawing's proportions. Size and position it with the parent.
 * Colours come from the tokens in tokens.css, so it follows the theme.
 *
 * Motion: `animate` moves cinta/ondas in a slow loop (`period` seconds). It pauses when
 * off-screen or in a background tab, and stays still under prefers-reduced-motion.
 */

import { useEffect, useId, useMemo, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { MARKS } from './logo-paths';

type Variant = 'cinta' | 'eco' | 'ondas';
type Tone = 'paper' | 'raised' | 'inverse' | 'accent';

export type EstelaProps = {
  variant?: Variant;
  /** The ground it sits on. */
  tone?: Tone;
  /** Drawing proportions (not the rendered size). */
  width?: number;
  height?: number;
  /** Line count for cinta / ondas. */
  lines?: number;
  /** 0–1: another take of the same form. */
  phase?: number;
  flip?: boolean;
  strokeWidth?: number;
  animate?: boolean;
  /** Seconds per loop when animated. */
  period?: number;
  /** eco only */
  scale?: number;
  x?: number;
  y?: number;
  rings?: number;
  gap?: number;
  /** eco only: false draws the "a" as an outline. */
  solid?: boolean;
  className?: string;
  style?: CSSProperties;
};

const TONES: Record<Tone, { line: string; accent: string; ground: string; fill: string }> = {
  paper: { line: 'var(--ink)', accent: 'var(--accent)', ground: 'var(--paper)', fill: 'var(--accent)' },
  raised: { line: 'var(--ink)', accent: 'var(--accent)', ground: 'var(--paper-raised)', fill: 'var(--accent)' },
  inverse: { line: 'var(--on-inverse)', accent: 'var(--accent-inverse)', ground: 'var(--inverse)', fill: 'var(--accent-inverse)' },
  accent: { line: 'var(--on-accent)', accent: 'var(--inverse)', ground: 'var(--accent)', fill: 'var(--on-accent)' },
};

type Line = { d: string; o: number; c: 'line' | 'accent' };

const TAU = 6.2832;
const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function pathFrom(pts: Array<[number, number]>): string {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += `Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const l = pts[pts.length - 1];
  return `${d}L${l[0].toFixed(1)} ${l[1].toFixed(1)}`;
}

function cintaLines(W: number, H: number, phase: number, n?: number, flip?: boolean): Line[] {
  const N = n ?? 56;
  const S = 72;
  const out: Line[] = [];
  const ribbons = [
    { n: N, k: 0, op: 1, cy: 0.7, rise: 0.34, spread: 0.2, floor: 0.035, twist: 1.35, wob: 0.07 },
    { n: Math.round(N * 0.5), k: 1.7, op: 0.42, cy: 0.58, rise: 0.12, spread: 0.13, floor: 0.02, twist: -0.9, wob: 0.09 },
  ];
  ribbons.forEach((r, ri) => {
    for (let i = 0; i < r.n; i++) {
      const t = r.n === 1 ? 0 : (i / (r.n - 1)) * 2 - 1;
      const pts: Array<[number, number]> = [];
      for (let s = 0; s <= S; s++) {
        const u = -0.04 + (s / S) * 1.08;
        const c = H * (r.cy - r.rise * smooth(-0.1, 1.05, u) + r.wob * Math.sin(TAU * (0.75 * u + phase + r.k * 0.13)));
        const w = H * (r.spread * (1 - 0.7 * smooth(0.05, 1.0, u)) + r.floor);
        const th = 3.1416 * (r.twist * u + 0.35 * Math.sin(TAU * (0.4 * u + phase + r.k * 0.2)));
        let y = c + w * t * Math.cos(th);
        if (flip) y = H - y;
        pts.push([u * W, y]);
      }
      const face = 1 - Math.abs(t);
      out.push({ d: pathFrom(pts), o: (0.16 + 0.62 * Math.pow(face, 0.6)) * r.op, c: ri === 0 && i % 9 === 4 ? 'accent' : 'line' });
    }
  });
  return out;
}

function ondasLines(W: number, H: number, phase: number, n?: number): Line[] {
  const M = n ?? 30;
  const S = 96;
  const out: Line[] = [];
  for (let j = 0; j < M; j++) {
    const v = M === 1 ? 0.5 : j / (M - 1);
    const g = Math.exp(-Math.pow((v - 0.55) / 0.28, 2));
    const pts: Array<[number, number]> = [];
    for (let s = 0; s <= S; s++) {
      const u = -0.02 + (s / S) * 1.04;
      const env = Math.exp(-Math.pow((u - 0.62 - 0.06 * Math.sin(TAU * phase)) / 0.24, 2));
      const a = H * 0.11 * env * (0.3 + g);
      const y = H * (0.08 + 0.84 * v) + a * Math.sin(TAU * (1.6 * u - phase) + v * 2.4) - H * 0.07 * env * g;
      pts.push([u * W, y]);
    }
    out.push({ d: pathFrom(pts), o: 0.18 + 0.6 * g, c: j === Math.round(M * 0.55) ? 'accent' : 'line' });
  }
  return out;
}

export function Estela({
  variant = 'cinta',
  tone = 'paper',
  width: W = 960,
  height: H = 540,
  lines,
  phase = 0,
  flip,
  strokeWidth = 1,
  animate = false,
  period = 24,
  scale,
  x,
  y,
  rings = 22,
  gap = 16,
  solid = true,
  className,
  style,
}: EstelaProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const col = TONES[tone];

  const initial = useMemo(
    () => (variant === 'eco' ? [] : variant === 'ondas' ? ondasLines(W, H, phase, lines) : cintaLines(W, H, phase, lines, flip)),
    [variant, W, H, phase, lines, flip],
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!animate || variant === 'eco' || !svg) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const paths = Array.from(svg.querySelectorAll<SVGPathElement>('path[data-l]'));
    let raf = 0;
    let visible = true;
    let elapsed = 0;
    let last: number | null = null;
    let lastDraw = 0;
    const ms = period * 1000;

    const tick = (ts: number) => {
      if (last !== null) elapsed += ts - last;
      last = ts;
      if (ts - lastDraw > 33) {
        lastDraw = ts;
        const p = phase + (elapsed % ms) / ms;
        const next = variant === 'ondas' ? ondasLines(W, H, p, lines) : cintaLines(W, H, p, lines, flip);
        for (let i = 0; i < paths.length && i < next.length; i++) paths[i].setAttribute('d', next[i].d);
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || reduce.matches || !visible || document.hidden) return;
      last = null;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => (reduce.matches || !visible || document.hidden ? stop() : start());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(svg);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
    };
  }, [animate, variant, W, H, phase, lines, flip, period]);

  let body: ReactNode;
  if (variant === 'eco') {
    const m = MARKS.symbol;
    const k = scale ?? (H * 0.78) / m.h;
    const ox = x ?? W - m.w * k - H * 0.16;
    const oy = y ?? (H - m.h * k) / 2;
    const g = gap / k;
    const w = strokeWidth / k;
    const ref = `#${uid}-a`;
    const ringEls: ReactNode[] = [];
    for (let r = rings; r >= 1; r--) {
      ringEls.push(
        <use key={`o${r}`} href={ref} fill="none" strokeLinejoin="round" strokeWidth={2 * r * g + w}
          style={{ stroke: col.line }} strokeOpacity={+(0.08 + 0.7 * Math.pow(1 - r / (rings + 1), 1.6)).toFixed(3)} />,
        <use key={`i${r}`} href={ref} fill="none" strokeLinejoin="round" strokeWidth={2 * r * g - w} style={{ stroke: col.ground }} />,
      );
    }
    body = (
      <>
        <defs>
          <path id={`${uid}-a`} d={m.d} />
        </defs>
        <g transform={`translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${k.toFixed(4)})`} fillRule="evenodd">
          {ringEls}
          <use href={ref} strokeWidth={solid ? 0 : w * 1.5}
            style={solid ? { fill: col.fill } : { fill: col.ground, stroke: col.accent }} />
        </g>
      </>
    );
  } else {
    body = initial.map((l, i) => (
      <path key={i} data-l="1" d={l.d} fill="none" strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke"
        style={{ stroke: l.c === 'accent' ? col.accent : col.line }}
        strokeOpacity={+(l.c === 'accent' ? Math.min(1, l.o + 0.25) : l.o).toFixed(3)} />
    ));
  }

  return (
    <svg ref={svgRef} className={className} style={{ display: 'block', width: '100%', height: '100%', ...style }}
      viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}

export default Estela;
