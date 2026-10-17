// Pre-renders the brand's Estela waves into static SVG files in public/brand/estela/.
// The page loads them as cached images instead of building hundreds of SVG paths in the
// DOM, and nothing is animated. The shapes come from the kit's own component
// (asventia-brand/components/Estela.tsx) and the colours from its tokens.css.
//
// Run after adding or changing a wave:  npm run estela

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const kit = join(root, "asventia-brand");
const tmp = join(root, "node_modules", ".cache", "estela");
const out = join(root, "public", "brand", "estela");

// Every wave the page uses. Lines are monochrome on purpose: the call-to-action blue is
// the only saturated colour on the page, so the accent threads take the line colour.
// Strokes are 1.2px: Chrome draws 1px translucent hairlines with a visible moiré.
const WAVES = {
  "cinta-paper": { variant: "cinta", tone: "paper", width: 1440, height: 224, lines: 36, strokeWidth: 1.2, phase: 0.12 },
  "cinta-inverse": { variant: "cinta", tone: "inverse", width: 1440, height: 224, lines: 36, strokeWidth: 1.2, phase: 0.55 },
  "ondas-paper": { variant: "ondas", tone: "paper", width: 640, height: 360, lines: 24, strokeWidth: 1.2 },
  "eco-inverse": { variant: "eco", tone: "inverse", width: 760, height: 520, scale: 0.85, rings: 15, gap: 14, strokeWidth: 1.2, solid: false },
};

// 1. Transpile the kit's component so Node can run it.
mkdirSync(tmp, { recursive: true });
for (const file of ["Estela.tsx", "logo-paths.ts"]) {
  const source = readFileSync(join(kit, "components", file), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  });
  writeFileSync(
    join(tmp, file.replace(/\.tsx?$/, ".mjs")),
    outputText.replace(/from ["']\.\/logo-paths["']/, 'from "./logo-paths.mjs"'),
  );
}
const { createElement } = await import("react");
const { renderToStaticMarkup } = await import("react-dom/server");
const { Estela } = await import(pathToFileURL(join(tmp, "Estela.mjs")).href);

// 2. Token values from the kit's light theme.
const css = readFileSync(join(kit, "styles", "tokens.css"), "utf8");
const lightTheme = css.slice(css.indexOf(":root"), css.indexOf("}", css.indexOf(":root")));
const token = (name) => {
  const match = lightTheme.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`Token --${name} not found in tokens.css`);
  return match[1].trim();
};
const vars = {
  "--paper": token("paper"),
  "--paper-raised": token("paper-raised"),
  "--ink": token("ink"),
  "--accent": token("ink"),
  "--inverse": token("inverse"),
  "--on-inverse": token("on-inverse"),
  "--accent-inverse": token("on-inverse"),
};
const style = `<style>svg{${Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(";")}}</style>`;

// 3. Render each wave and write it as a standalone file.
mkdirSync(out, { recursive: true });
for (const [name, props] of Object.entries(WAVES)) {
  const markup = renderToStaticMarkup(createElement(Estela, props))
    // standalone file: namespace and intrinsic size (so object-fit: cover can crop it), no inline sizing
    .replace(
      /^<svg[^>]*?style="[^"]*"/,
      `<svg xmlns="http://www.w3.org/2000/svg" width="${props.width}" height="${props.height}"`,
    )
    .replace(/<svg([^>]*)>/, `<svg$1>${style}`);
  writeFileSync(join(out, `${name}.svg`), markup);
  console.log(`${name}.svg  ${(markup.length / 1024).toFixed(0)} KB`);
}
