// Íconos: reemplaza los emoji del HTML por SVG de Twemoji (CC BY 4.0), en un sprite único.
// Así el PDF se ve igual en Windows, Mac o Linux, y no depende de la fuente de emoji del sistema.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), 'node_modules', '@twemoji', 'svg');
const RE = /\p{Extended_Pictographic}(?:️|⃣|[\u{1F3FB}-\u{1F3FF}]|‍\p{Extended_Pictographic}️?)*|[\u{1F1E6}-\u{1F1FF}]{2}/gu;

const cache = new Map(); // id → contenido interno del svg (sin el tag <svg>)

function fileFor(emoji) {
  const cps = [...emoji].map((c) => c.codePointAt(0).toString(16));
  const a = join(DIR, cps.join('-') + '.svg');
  if (existsSync(a)) return a;
  const b = join(DIR, cps.filter((c) => c !== 'fe0f').join('-') + '.svg');
  return existsSync(b) ? b : null;
}

function idFor(emoji) {
  return 'em-' + [...emoji].map((c) => c.codePointAt(0).toString(16)).filter((c) => c !== 'fe0f').join('-');
}

/** Registra un emoji en el sprite y devuelve el <svg><use> para insertarlo. */
export function em(emoji, cls = 'em') {
  const id = idFor(emoji);
  if (!cache.has(id)) {
    const f = fileFor(emoji);
    if (!f) return emoji; // no existe en Twemoji: se deja el carácter
    const src = readFileSync(f, 'utf8');
    const inner = src.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    const vb = src.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 36 36';
    cache.set(id, { inner, vb });
  }
  return `<svg class="${cls}" role="img" aria-label="${emoji}"><use href="#${id}"/></svg>`;
}

/** Reemplaza todos los emoji que aparezcan en texto (fuera de tags) por SVG. */
export function emojify(html) {
  return html.split(/(<[^>]+>)/).map((part, i) => (i % 2 === 1 ? part : part.replace(RE, (m) => em(m)))).join('');
}

/** El sprite con todos los símbolos usados. Va una vez al principio del <body>. */
export function sprite() {
  const syms = [...cache.entries()].map(([id, { inner, vb }]) => `<symbol id="${id}" viewBox="${vb}">${inner}</symbol>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${syms}</svg>`;
}
