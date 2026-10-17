/**
 * Asventia fonts for Next.js (App Router), self-hosted with next/font/local.
 * Outfit = display (headings, figures). Figtree = everything else. No monospace anywhere.
 *
 * In app/layout.tsx:
 *   import { outfit, figtree } from '@/asventia-brand/lib/fonts';
 *   <html lang="en" className={`${outfit.variable} ${figtree.variable}`}>
 * tokens.css then picks them up through --font-outfit / --font-figtree.
 * Adjust the relative paths below if you move the fonts folder.
 */
import localFont from 'next/font/local';

export const outfit = localFont({
  src: [{ path: '../fonts/Outfit-Variable.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-outfit',
  display: 'swap',
  fallback: ['Avenir Next', 'Century Gothic', 'system-ui', 'sans-serif'],
});

export const figtree = localFont({
  src: [
    { path: '../fonts/Figtree-Variable.woff2', weight: '300 900', style: 'normal' },
    { path: '../fonts/Figtree-Italic-Variable.woff2', weight: '300 900', style: 'italic' },
  ],
  variable: '--font-figtree',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
});
