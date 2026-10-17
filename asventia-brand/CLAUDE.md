# Asventia brand — rules for this codebase

Everything visual on this site follows the Asventia design system. This folder (`asventia-brand/`) is the source of truth in code. When a rule here conflicts with existing code, the rule wins: change the code.

## Files

- `styles/tokens.css` — every colour, spacing step, radius, shadow and type style as CSS variables. Import once, globally. Light is the default; `data-theme="dark"` switches to the navy theme.
- `styles/tailwind-v4.css` / `styles/tailwind-v3.preset.js` — the same tokens as Tailwind utilities (`bg-paper`, `text-ink`, `bg-inverse`, `text-accent`, `border-line`, `rounded-sm`, `font-display`…).
- `styles/components.css` — reference styles (`av-` classes) for buttons, cards, badges, stats, bands, phases. Use them or match them exactly.
- `lib/fonts.ts` — Outfit and Figtree via `next/font/local`.
- `components/Estela.tsx` — the brand's wave pattern. `components/Logo.tsx` — the logo, inline.
- `public/brand/` — logo, avatar and pattern files. `app/` — icon, apple icon and Open Graph images.
- `examples/Hero.tsx` — the reference hero.

## Never

- Hard-code a hex value, font name, radius or shadow in a component. Use the variables or the Tailwind tokens.
- Use a monospace font anywhere (no JetBrains Mono, Geist Mono, IBM Plex Mono, `font-mono`, `<code>` styling for labels). Codes and figures use Figtree with `font-variant-numeric: tabular-nums`.
- Round surfaces. Cards, panels, sections, images, bands and colour blocks are square (`radius-none`). Only controls (buttons, inputs, badges, checkboxes) get `radius-sm` = 2px. Pills and circles are not part of the brand (except an avatar cropped by a social network).
- Use gradients, glows, glassmorphism, blur, coloured shadows, purple, emoji, or decorative shadows on cards at rest.
- Use the old palette (warm paper, terracotta/"teja", black #15161a) or Poppins/Inter.

## Colour

Three colours make the brand: white (`--paper`, `--paper-raised`), navy (`--ink`, `--inverse` = #0b1b2e) and electric blue (`--accent` = #1f44e0). Roughly 70 % white, 25 % navy, 5 % blue.

- Text: `--ink` primary, `--ink-soft` secondary, `--ink-muted` eyebrows, labels and captions. On navy: `--on-inverse`, `--on-inverse-muted`; hairlines on navy: `--line-inverse`.
- `--accent` marks the one action that matters on the screen and the point where a person decides. One accent button per view. On navy, highlighted words or figures use `--accent-inverse`.
- `--accent-soft` is the ground of the one highlighted card in a group. `--support` (steel) is for secondary data series and colour blocks, never text.
- Status: `--positive`, `--warning`, `--negative`, each on its `-soft`, always with a word or icon. Status never uses the brand blue.
- Every text pair named in tokens.css meets WCAG AA in both themes. Do not invent new pairs.

## Type

- Outfit (`--font-display`) for headings and big figures; Figtree (`--font-text`) for everything else.
- Weight is the emphasis: section headings are weight 400 with the key idea in 600 (`<h2>Six minutes an order <strong>adds up to a full-time job.</strong></h2>`). Never emphasise with colour or italics.
- Eyebrow above each heading: `.type-eyebrow` (uppercase, tracked, Figtree 600) with a 24×2px rule before it.
- Use the `.type-*` classes from tokens.css (display-xl/lg/md, heading-lg/md/sm, metric, lead, body, small, caption, eyebrow, label, data). Body copy 45–75 characters per line, left-aligned.

## Layout

- 4px spacing scale (`--space-1` … `--space-24`). Card padding `--space-6`, gap between cards `--space-3`, between blocks `--space-8`, between page sections `--space-24`.
- Separate surfaces with 1px `--line` borders or a change of ground, not shadows. `--shadow-float` only for things that float (menus, a product mock over a photo).
- 12-column grid, left-aligned content. One idea per section; one navy (`--inverse`) panel per view.
- Focus: every interactive element shows `--focus-ring` on `:focus-visible`.

## Logo

Use `<Logo />` (inline SVG, currentColor) or the files in `public/brand/`. `--ink` on light grounds, `--on-inverse` on navy, `--on-accent` on blue. Minimum heights: wordmark 20px, lockup 40px, symbol 16px. Clear space = the height of the "a". Never redraw, stretch, outline, shadow or recolour it otherwise.

## Pattern: Estela

`<Estela />` is the brand pattern, drawn from the logo's "a": `cinta` (ribbon, the default), `eco` (contour echoes of the "a"), `ondas` (stacked waves for data/product).

- It fills its parent and crops like `object-fit: cover`: wrap it in a positioned box and size the box. `tone` must match the ground (`inverse` on navy, `paper` on white).
- Never behind text: give it its own band or side. At most a third of a section that has text.
- One form per section. Only the hero animates (`animate`, `period` 16–30 s); everywhere else it is static. The component already pauses off-screen and respects `prefers-reduced-motion`.
- No extra colours, gradients or glows on it. The `ondas`/`cinta` lines are 1px.

## Motion

Slow, continuous and forwards (left to right). UI transitions 150–250 ms with `--ease-out`; no bounces, no parallax gimmicks, no entrance animations on every block. Respect `prefers-reduced-motion`.

## Icons

Lucide (`lucide-react`), `strokeWidth={2}`, 16/20/24px, coloured with the text they sit next to, always beside a word. Third-party logos (WhatsApp, ERPs, AI providers) only from their official files.

## Voice (the site is in British English)

- Short sentences, verb first, present tense: "Agents draft, people approve." "Start small. Validate accuracy. Scale with control. Run everything."
- Concrete before abstract: "orders from WhatsApp written into your ERP", not "intelligent omnichannel automation".
- Honest numbers: every figure carries its maths or condition ("18,000 orders × 6 min ÷ 60"), and estimates are labelled ("a starting hypothesis, not a promise").
- Headlines state the conclusion. Sentence case for headings and buttons; uppercase only in eyebrows and labels.
- No exclamation marks, emoji, superlatives ("revolutionary", "leading"), AI jargon ("AI-powered", "cutting-edge", "disruptive") or promises to replace people.
- Lists with a middle dot: "WhatsApp · Phone · Email". Processes with an arrow: "Read → check → confirm → post".
- Primary CTA: "Book a 30-minute call". Never "Get started", "Request a free demo" or "Learn more".
- The tagline "Intelligence in motion" stays in English and is never used as a headline.

## Metadata

`themeColor: '#0b1b2e'` in the viewport export. Icons and social images come from `asventia-brand/app/` (copy them into `app/`).
