# Asventia · kit de marca para la landing

Todo lo del sistema de diseño, listo para un proyecto Next.js: tokens, fuentes, logotipo, la Estela animada, iconos de la web y la imagen para redes. Pensado para que Claude Code lo aplique siguiendo las reglas de `CLAUDE.md`.

## Cómo usarlo (5 minutos)

1. Descomprime y copia la carpeta `asventia-brand/` en la **raíz del repo** de la landing.
2. Abre Claude Code en VS Code desde esa raíz.
3. Copia el texto de `PROMPT.md` y pégalo en Claude Code. Te propondrá un plan antes de tocar nada; apruébalo paso a paso.

A partir de ahí, como el `CLAUDE.md` de la raíz importará `asventia-brand/CLAUDE.md`, cualquier cosa que le pidas después («añade una sección de precios», «haz la página de equipo») saldrá ya con la marca.

## Qué hay dentro

| Ruta | Para qué |
| --- | --- |
| `CLAUDE.md` | Las reglas de marca para Claude Code: color, tipografía, esquinas, patrón, movimiento, voz en inglés. |
| `PROMPT.md` | El prompt de migración, listo para pegar. |
| `styles/tokens.css` | Todos los tokens como variables CSS (tema claro por defecto, `data-theme="dark"` para marino) y las clases `.type-*`. |
| `styles/tailwind-v4.css`, `styles/tailwind-v3.preset.js` | Los mismos tokens como utilidades de Tailwind (`bg-paper`, `text-ink`, `bg-inverse`, `text-accent`, `rounded-sm`…). Usa el que corresponda a tu versión. |
| `styles/components.css` | Estilos de referencia de botones, tarjetas, etiquetas, cifras, bandas y fases (clases `av-`). Opcional. |
| `lib/fonts.ts` | Outfit y Figtree autoalojadas con `next/font/local`. |
| `fonts/` | Los archivos `.woff2` (licencia SIL OFL). |
| `components/Estela.tsx` | La onda de marca (`cinta`, `eco`, `ondas`), animable, con pausa fuera de pantalla y respeto a «reducir movimiento». |
| `components/Logo.tsx` | El logotipo en SVG en línea (`wordmark`, `lockup`, `symbol`). |
| `examples/Hero.tsx` | La cabecera de referencia, con el copy actual de la web. |
| `public/brand/` | Logotipos, avatares y los patrones exportados. |
| `app/` | `icon.svg`, `apple-icon.png`, `opengraph-image.png`, `twitter-image.png`: se copian a `app/` y Next.js los detecta solo. |

## Uso rápido de los componentes

```tsx
import { Estela } from '@/asventia-brand/components/Estela';
import { Logo } from '@/asventia-brand/components/Logo';

// La onda llena a su contenedor: el tamaño lo pone el padre.
<section style={{ position: 'relative', background: 'var(--inverse)' }}>
  <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 230 }} aria-hidden>
    <Estela variant="cinta" tone="inverse" width={1200} height={230} animate period={24} />
  </div>
  …
</section>

<Logo variant="wordmark" height={26} color="var(--on-inverse)" />
```

Si tu proyecto no tiene el alias `@/`, usa rutas relativas.

## Referencia visual

El sistema de diseño completo (libro de marca, componentes, aplicaciones) está en el artifact «Asventia» de claude.ai. Si una duda no la resuelve `CLAUDE.md`, la resuelve el libro de marca.
