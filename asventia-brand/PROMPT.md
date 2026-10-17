Pega este texto en Claude Code (VS Code) desde la raíz del repo de la landing, con la carpeta `asventia-brand/` ya copiada en la raíz.

---

Vamos a migrar la landing a la nueva identidad de Asventia. Todo lo que necesitas está en `asventia-brand/`: lee primero `asventia-brand/CLAUDE.md` (son las reglas de marca y mandan sobre el código actual) y `asventia-brand/README.md`. Antes de tocar nada, revisa cómo está montado el proyecto (versión de Next.js, App Router o Pages, Tailwind v3/v4 o CSS propio, dónde están los estilos globales y los componentes) y propónme un plan corto por pasos. No empieces a editar hasta que te lo apruebe.

Pasos que espero en el plan:

1. **Base:** añade `@asventia-brand/CLAUDE.md` al `CLAUDE.md` de la raíz (créalo si no existe) para que las reglas se apliquen siempre. Importa `asventia-brand/styles/tokens.css` en los estilos globales. Si usamos Tailwind, conecta `tailwind-v4.css` o `tailwind-v3.preset.js` según la versión.
2. **Fuentes:** configura Outfit y Figtree con `asventia-brand/lib/fonts.ts` en `app/layout.tsx` y elimina las fuentes que haya ahora (Poppins, Inter, cualquier monoespaciada).
3. **Colores, radios y tipografía:** sustituye en todos los componentes los colores, radios, sombras y tamaños escritos a mano por los tokens. Superficies a escuadra, 2px solo en controles. Elimina cualquier uso de `font-mono`.
4. **Hero:** rehaz el hero sobre fondo marino con la `Estela` en forma de `cinta` animada en una franja inferior, tomando `asventia-brand/examples/Hero.tsx` como referencia y manteniendo nuestro copy y nuestro formulario.
5. **Resto de secciones:** aplica la marca sección por sección (agentes, la cuenta, despliegue, equipo, CTA, footer). Un panel marino por sección como mucho, un solo botón azul por vista, antetítulo con filete en cada titular, cifras con su cuenta al lado. Usa la `Estela` estática (`eco` u `ondas`) solo donde aporte y nunca detrás de texto.
6. **Logos y metadatos:** usa `<Logo />` en cabecera y footer; copia `asventia-brand/app/icon.svg`, `apple-icon.png`, `opengraph-image.png` y `twitter-image.png` a `app/` (sustituyendo los actuales) y pon `themeColor: '#0b1b2e'`.
7. **Comprobación:** `npm run build` y lint sin errores; revisa en 1280px y 390px; comprueba el foco con teclado y que con «reducir movimiento» la onda se queda quieta. Haz una pasada final buscando hex sueltos, `rounded-*` en superficies, `font-mono` y colores que no sean tokens.

Trabaja en una rama nueva, haz un commit por paso y enséñame el resultado de cada uno antes de seguir.
