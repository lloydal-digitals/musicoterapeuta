// Genera dist/kit.html y dist/kit.pdf a partir de ../contenido/
// Uso:  npm run build        → HTML + PDF (usa Chrome/Edge headless)
//       npm run html         → solo HTML (para revisar en el navegador)
// La paginación (números de página, índice, encabezados) la hace Paged.js dentro del HTML.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { load as yamlLoad } from 'js-yaml';
import { marked } from 'marked';
import { bonusFichasHtml } from './fichas.mjs';
import { seccionTarjetasHtml } from './tarjetas.mjs';
import { seccionJuegosHtml, seccionPlanificadorHtml } from './juegos.mjs';
import { seccionPartiturasHtml } from './partituras.mjs';
import { emojify, sprite } from './emoji.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = join(ROOT, 'contenido', 'actividades');
const DIST = join(__dirname, 'dist');
const HTML_ONLY = process.argv.includes('--html-only');

const BRAND = 'Musicalización Encantada';
const DOMAIN = 'musicalizacioninfantil.com';
const YEAR = new Date().getFullYear();

const EJES = {
  1: { nombre: 'Ritmo y pulso', ico: '🥁', color: 'oklch(62% .19 38)', desc: 'Pulso, tempo, patrones y lectura rítmica. La base motriz y de atención de todo lo demás: el pulso ordena el cuerpo.' },
  2: { nombre: 'Escucha y exploración sonora', ico: '👂', color: 'oklch(58% .13 235)', desc: 'Timbre, altura, intensidad, duración, sonido y silencio. Escuchar con atención es una habilidad que se entrena, y sirve para la música y para el lenguaje.' },
  3: { nombre: 'Voz y canto', ico: '🎤', color: 'oklch(60% .17 345)', desc: 'Exploración vocal, canciones y lenguaje. Cantar amplía el vocabulario, la memoria y la confianza. Y no hace falta afinar.' },
  4: { nombre: 'Cuerpo y movimiento', ico: '💃', color: 'oklch(68% .16 70)', desc: 'Expresión corporal, coordinación y contrastes. La música se entiende primero con el cuerpo: moverse es escuchar.' },
  5: { nombre: 'Instrumentos y creación', ico: '🎸', color: 'oklch(60% .15 150)', desc: 'Explorar, construir y componer. El niño como productor de música, no solo como oyente.' },
  6: { nombre: 'Emociones y vínculo', ico: '💛', color: 'oklch(56% .16 295)', desc: 'Regulación, expresión emocional, rituales y cooperación. Lo que la música hace mejor que nada: calmar, expresar, unir.' },
};
const CTX = { aula: '🏫 Aula', consultorio: '🩺 Consultorio', casa: '🏠 Casa' };
const H2_ICO = {
  'por qué funciona': '💡', 'antes de empezar': '🧰', 'paso a paso': '👣',
  'variantes': '🔀', 'en cada contexto': '📍', 'qué observar': '🔍', 'si no sale': '🛟',
};

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Un ítem YAML como "- Opcional: pandero" llega como objeto {Opcional: 'pandero'}: lo volvemos a texto.
const asText = (x) => (x && typeof x === 'object' && !Array.isArray(x))
  ? Object.entries(x).map(([k, v]) => `${k}: ${v ?? ''}`).join(', ')
  : String(x ?? '');
const inline = (s) => marked.parseInline(asText(s));

// Permite escribir "Opcional: pandero" o "cazar sonidos: en el patio" en el frontmatter
// sin comillas: cualquier valor de texto que contenga ": " se entrecomilla antes de parsear.
function sanitizeYaml(src) {
  return src.split(/\r?\n/).map((line) => {
    const m = line.match(/^(\s*(?:-|[\w_]+:)\s+)(.*)$/);
    if (!m) return line;
    const [, head, val] = m;
    if (!val.includes(': ') || /^["'\[{]/.test(val)) return line;
    return head + JSON.stringify(val);
  }).join('\n');
}

function parseFile(path) {
  const raw = readFileSync(path, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`Sin frontmatter: ${path}`);
  const meta = yamlLoad(sanitizeYaml(m[1]));
  const body = m[2];
  return { meta, body };
}

// Renderer: h1 título de página (presentación), h2 con ícono, h3 como "etapa"
const renderer = new marked.Renderer();
renderer.heading = function ({ text, depth, tokens }) {
  const inner = this.parser.parseInline(tokens);
  if (depth === 1) return `<h1 class="doc-title">${inner}</h1>\n`;
  if (depth === 2) {
    const key = text.toLowerCase().trim();
    const ico = H2_ICO[key] ?? '';
    return `<h2 class="sec">${ico ? `<span class="ico">${ico}</span>` : ''}<span>${inner}</span></h2>\n`;
  }
  if (depth === 3) {
    const ctx = /^🏫/.test(text) ? ' aula' : /^🩺/.test(text) ? ' consultorio' : /^🏠/.test(text) ? ' casa' : '';
    return `<h3 class="stage${ctx}">${inner}</h3>\n`;
  }
  return `<h${depth}>${inner}</h${depth}>\n`;
};
// Listas numeradas: el número va como atributo (los pasos siguen contando entre apertura,
// desarrollo y cierre, y Paged.js no toca los contadores CSS al partir páginas).
renderer.list = function (token) {
  if (!token.ordered) return `<ul>${token.items.map((it) => this.listitem(it)).join('')}</ul>
`;
  let n = Number(token.start) || 1;
  const items = token.items.map((it) => this.listitem(it).replace(/^<li/, `<li data-n="${n++}"`)).join('');
  return `<ol>${items}</ol>
`;
};
marked.use({ renderer, gfm: true, breaks: true }); // breaks: saltos de línea en letras de canciones

// ---------- piezas ----------
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Motivo decorativo: ondas sonoras + "notas" (círculos) en la paleta
function artSvg(color = 'currentColor') {
  return `<svg class="art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
    <circle cx="300" cy="300" r="34" fill="var(--clay)"/>
    <path d="M300 220a80 80 0 0 1 80 80" stroke="var(--honey)" stroke-width="14" stroke-linecap="round"/>
    <path d="M300 172a128 128 0 0 1 128 128" stroke="var(--leaf)" stroke-width="14" stroke-linecap="round" opacity=".85"/>
    <path d="M300 124a176 176 0 0 1 176 176" stroke="var(--clay)" stroke-width="14" stroke-linecap="round" opacity=".55"/>
    <circle cx="96" cy="120" r="16" fill="var(--honey)"/>
    <circle cx="148" cy="88" r="14" fill="var(--leaf)"/>
    <circle cx="60" cy="230" r="11" fill="var(--clay)" opacity=".7"/>
    <circle cx="200" cy="150" r="6" fill="var(--cocoa)" opacity=".5"/>
    <path d="M96 120V44l52-14v58" stroke="var(--cocoa)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function cover(count) {
  return `
<section class="cover" id="portada">
  <div class="blob b1"></div><div class="blob b2"></div>
  <header class="cover-top"><span class="brand"><i>🎵</i>${BRAND}</span><span class="dom">${DOMAIN}</span></header>
  <div class="cover-main">
    <p class="kicker">Kit de actividades musicales</p>
    <h1>Musicalización<br><em>Encantada</em></h1>
    <p class="sub">${count} actividades listas para el aula, el consultorio y la casa. Organizadas por edad, con objetivo pedagógico claro y paso a paso.</p>
    <ul class="stats">
      <li><b>${count}</b><span>actividades</span></li>
      <li><b>6</b><span>ejes</span></li>
      <li><b>2–8</b><span>años</span></li>
      <li><b>3</b><span>contextos</span></li>
    </ul>
    <ul class="ctx"><li>🏫 Aula</li><li>🩺 Consultorio</li><li>🏠 Casa</li></ul>
  </div>
  ${artSvg()}
  <footer class="cover-bottom"><span>Para docentes, musicoterapeutas y familias</span><span>Edición ${YEAR}</span></footer>
</section>`;
}

function backCover() {
  return `
<section class="back">
  <div class="back-inner">
    <span class="brand"><i>🎵</i>${BRAND}</span>
    <h2>La próxima clase, sesión o tarde en familia puede ser la más especial de todas.</h2>
    <p>Gracias por elegir este material. Si tenés dudas, sugerencias o querés contarnos cómo lo usás, escribinos: cada historia nos ayuda a mejorar el kit.</p>
    <p class="dom">${DOMAIN}</p>
    <p class="legal">© ${YEAR} ${BRAND}. Todos los derechos reservados. Este material es de uso personal y profesional del comprador: podés imprimirlo todas las veces que quieras para tu aula, consultorio u hogar. No está permitido compartirlo, revenderlo ni publicarlo, total o parcialmente.<br>Íconos: Twemoji © Twitter y colaboradores, licencia CC BY 4.0. Tipografías: Fraunces y Nunito (SIL Open Font License).</p>
  </div>
</section>`;
}

function ejeDivider(num, acts) {
  const eje = EJES[num];
  const rows = acts.map(({ meta }) => `
    <li><a href="#${slug(meta.codigo)}">
      <span class="code">${esc(meta.codigo)}</span>
      <span class="t"><b>${esc(meta.titulo)}</b><small>${inline(meta.objetivo)}</small></span>
      <span class="age">${esc(meta.edad)}</span>
    </a></li>`).join('');
  return `
<section class="divider" id="eje-${num}" style="--eje:${eje.color}">
  <span class="bignum">0${num}</span>
  <div class="divider-inner">
    <span class="ico-circle">${eje.ico}</span>
    <p class="kicker">Eje ${num} de 6</p>
    <h1>${esc(eje.nombre)}</h1>
    <p class="desc">${esc(eje.desc)}</p>
    <ul class="divider-list">${rows}</ul>
  </div>
</section>`;
}

function activityHtml({ meta, body }) {
  const eje = EJES[meta.eje_num] ?? { nombre: meta.eje, ico: '🎵', color: 'var(--clay)' };
  const list = (arr) => (arr ?? []).map((x) => `<li>${inline(x)}</li>`).join('');
  return `
<article class="act" id="${slug(meta.codigo)}" style="--eje:${eje.color}">
  <header class="act-head">
    <div class="act-kicker"><span class="code">${esc(meta.codigo)}</span><span class="eje">${eje.ico} Eje ${meta.eje_num} · ${esc(eje.nombre)}</span></div>
    <h1>${esc(meta.titulo)}</h1>
    <p class="resumen">${inline(meta.resumen)}</p>
    <ul class="badges">
      <li><b>Edad</b>${esc(meta.edad)}</li>
      <li><b>Duración</b>${esc(meta.duracion)}</li>
      <li><b>Formato</b>${esc(meta.formato)}</li>
      <li><b>Contexto</b>${(meta.contextos ?? []).map((c) => CTX[c] ?? c).join(' · ')}</li>
    </ul>
  </header>

  <div class="ficha">
    <div class="box obj">
      <h4>🎯 Objetivo</h4>
      <p class="main">${inline(meta.objetivo)}</p>
      ${meta.objetivos_secundarios?.length ? `<p class="lbl">También trabaja</p><ul>${list(meta.objetivos_secundarios)}</ul>` : ''}
    </div>
    <div class="box mat">
      <h4>🧺 Materiales</h4>
      <ul>${list(meta.materiales)}</ul>
      ${meta.enlaza?.length ? `<p class="lbl">Se conecta con</p><ul class="link">${list(meta.enlaza)}</ul>` : ''}
    </div>
  </div>

  <div class="body">${marked.parse(body)}</div>
</article>`;
}

// Sección 0: presentación. Cada bloque separado por una línea "---" es una página.
function presentacionHtml() {
  const p = join(ROOT, 'contenido', '00-presentacion.md');
  if (!existsSync(p)) return '';
  const pages = readFileSync(p, 'utf8').split(/\r?\n---\r?\n/);
  return pages.map((md, i) => `<section class="doc"${i === 0 ? ' id="presentacion"' : ''}>${marked.parse(md)}</section>`).join('\n');
}

// Documento markdown con páginas separadas por "---" y un separador de sección al inicio
function docSectionHtml(file, { id, num, ico, kicker, titulo, desc, color, cls = '', transform = null }) {
  const p = join(ROOT, 'contenido', file);
  if (!existsSync(p)) return '';
  const pages = readFileSync(p, 'utf8').split(/\r?\n---\r?\n/);
  const titleOf = (md) => md.match(/^# (.+)$/m)?.[1] ?? '';
  const temaOf = (md) => md.match(/\*\*Tema(?: del mes)?:\*\* \*?([^*\n]+)/)?.[1] ?? '';
  const rows = pages.slice(1).map((md) => { const t = titleOf(md); return `<li><a href="#${id}-${slug(t)}"><span class="code">${t.split(' ')[0].slice(0, 3)}</span><span class="t"><b>${t}</b><small>${temaOf(md)}</small></span></a></li>`; }).join('');
  const divider = `
<section class="divider" id="${id}" style="--eje:${color}">
  <span class="bignum">${num}</span>
  <div class="divider-inner">
    <span class="ico-circle">${ico}</span>
    <p class="kicker">${kicker}</p>
    <h1>${titulo}</h1>
    <p class="desc">${desc}</p>
    <ul class="divider-list">${rows}</ul>
  </div>
</section>`;
  return divider + pages.map((md, i) => `<section class="doc${i > 0 ? ' ' + cls : ''}" id="${id}-${slug(titleOf(md))}" style="--eje:${color}">${i > 0 && transform ? transform(marked.parse(md)) : marked.parse(md)}</section>`).join('');
}

// Calendario: convierte los párrafos "Tema / Fechas / Canción / Reto / Familias" en cajas
const CAL_ICO = { 'Tema del mes': '🎯', 'Tema': '🎯', 'Fechas': '📅', 'Canción del mes': '🎵', 'Canción del verano': '🎵', 'Reto del mes': '🏁', 'Para las familias': '🏠', 'Para febrero': '🎉' };
function calendarTransform(html) {
  html = html.replace(/<p><strong>(Tema del mes|Tema|Fechas):<\/strong>([\s\S]*?)<\/p>/g, (m, k, v) => `<div class="cal-meta"><b>${CAL_ICO[k]} ${k}</b><span>${v.trim()}</span></div>`);
  html = html.replace(/<p><strong>(Canción del mes|Canción del verano|Reto del mes|Para las familias|Para febrero):<\/strong>([\s\S]*?)<\/p>/g, (m, k, v) => `<div class="cal-box"><b>${CAL_ICO[k]} ${k}</b><p>${v.trim()}</p></div>`);
  html = html.replace(/(?:<div class="cal-box">[\s\S]*?<\/div>\s*){2,}/g, (m) => `<div class="cal-grid">${m}</div>`);
  return html;
}

// Índice con números de página (los resuelve Paged.js con target-counter)
function tocHtml(byEje) {
  const ejes = [...byEje.entries()].sort((a, b) => a[0] - b[0]).map(([num, list]) => `
    <li class="toc-eje" style="--eje:${EJES[num].color}">
      <a href="#eje-${num}"><span class="ico">${EJES[num].ico}</span><b>Eje ${num} · ${esc(EJES[num].nombre)}</b></a>
      <ul>${list.map(({ meta }) => `<li><a href="#${slug(meta.codigo)}"><span class="code">${esc(meta.codigo)}</span><span>${esc(meta.titulo)}</span><span class="age">${esc(meta.edad)}</span></a></li>`).join('')}</ul>
    </li>`).join('');
  return `
<section class="doc toc" id="indice">
  <h1 class="doc-title">Contenido</h1>
  <ul class="toc-list">
    <li class="toc-top"><a href="#presentacion"><b>Cómo usar este kit</b></a></li>
    ${ejes}
    <li class="toc-top" style="--eje:oklch(62% .19 38)"><a href="#tarjetas"><span class="ico">🃏</span><b>Sección 7 · Tarjetas musicales</b></a></li>
    <li class="toc-top" style="--eje:oklch(58% .13 235)"><a href="#juegos"><span class="ico">🧩</span><b>Sección 8 · Juegos imprimibles</b></a></li>
    <li class="toc-top" style="--eje:oklch(60% .17 345)"><a href="#partituras"><span class="ico">🎼</span><b>Sección 9 · Partituras ilustradas</b></a></li>
    <li class="toc-top" style="--eje:oklch(60% .15 150)"><a href="#planificador"><span class="ico">📝</span><b>Sección 10 · Planificador</b></a></li>
    <li class="toc-top" style="--eje:oklch(68% .16 70)"><a href="#bonus-b"><span class="ico">🗓️</span><b>Bonus B · Calendario musical anual</b></a></li>
    <li class="toc-top" style="--eje:var(--clay)"><a href="#bonus-c"><span class="ico">🎁</span><b>Bonus C · Fichas de ritmo</b></a></li>
  </ul>
</section>`;
}

// ---------- build ----------
const files = readdirSync(SRC).filter((f) => f.endsWith('.md')).sort();
const acts = files.map((f) => parseFile(join(SRC, f)));
const byEje = new Map();
for (const a of acts) {
  const k = a.meta.eje_num;
  if (!byEje.has(k)) byEje.set(k, []);
  byEje.get(k).push(a);
}

let main = cover(acts.length);
main += tocHtml(byEje);
main += presentacionHtml();
for (const [num, list] of [...byEje.entries()].sort((a, b) => a[0] - b[0])) {
  main += ejeDivider(num, list);
  main += list.map(activityHtml).join('\n');
}
main += seccionTarjetasHtml();
main += seccionJuegosHtml();
main += seccionPartiturasHtml();
main += seccionPlanificadorHtml();
main += docSectionHtml('bonus-b-calendario.md', { id: 'bonus-b', num: 'B', ico: '🗓️', kicker: 'Bonus B', titulo: 'Calendario musical anual', desc: 'Las 36 actividades repartidas a lo largo del año escolar, mes a mes, con una canción, un reto y una propuesta para las familias cada mes.', color: 'oklch(68% .16 70)', cls: 'cal', transform: calendarTransform });
main += bonusFichasHtml();
main += backCover();
const bodyHtml = emojify(main); // todos los emoji → íconos Twemoji (SVG)
// el sprite se arma después de saber qué íconos se usaron, y va dentro de la portada para no generar una página
main = bodyHtml.replace('<section class="cover" id="portada">', '<section class="cover" id="portada">' + sprite());

const css = readFileSync(join(__dirname, 'kit.css'), 'utf8');
const paged = readFileSync(join(__dirname, 'node_modules', 'pagedjs', 'dist', 'paged.polyfill.js'), 'utf8');
const abcjs = readFileSync(join(__dirname, 'node_modules', 'abcjs', 'dist', 'abcjs-basic-min.js'), 'utf8');
const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>Kit ${BRAND}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
<style>${css}</style>
</head>
<body>
${main}
<script>${abcjs}</script>
<script>
// Dibuja las partituras (abcjs) antes de que Paged.js pagine
function renderScores() {
  document.querySelectorAll('.abc[data-abc]').forEach((el) => {
    ABCJS.renderAbc(el, el.dataset.abc, {
      responsive: 'resize', staffwidth: 700, add_classes: true, paddingtop: 0, paddingbottom: 0, paddingleft: 0, paddingright: 0,
      format: { vocalfont: 'Nunito 13', gchordfont: 'Nunito bold 12', annotationfont: 'Nunito 11', tempofont: 'Nunito 11', vocalspace: 6 },
    });
    el.querySelectorAll('.abcjs-title, .abcjs-tempo').forEach((t) => t.remove());
  });
}
window.PagedConfig = { before: async () => { renderScores(); await document.fonts.ready; }, after: () => { window.__pagedDone = true; } };
</script>
<script>${paged}</script>
</body>
</html>`;

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });
const htmlPath = join(DIST, 'kit.html');
writeFileSync(htmlPath, html, 'utf8');
console.log(`HTML → ${htmlPath}  (${acts.length} actividades)`);

if (HTML_ONLY) process.exit(0);

// ---------- PDF: Chrome/Edge controlado con puppeteer-core (espera a que Paged.js termine) ----------
const candidates = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const browserPath = candidates.find(existsSync);
if (!browserPath) { console.error('No encontré Chrome ni Edge. Abrí dist/kit.html en el navegador y usá Imprimir → Guardar como PDF.'); process.exit(1); }

const puppeteer = (await import('puppeteer-core')).default;
const browser = await puppeteer.launch({ executablePath: browserPath, headless: true, args: ['--disable-gpu', '--no-sandbox'] });
const page = await browser.newPage();
page.on('pageerror', (e) => console.error('[página]', e.message));
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load', timeout: 120000 });
// PagedConfig.after (en el HTML) marca window.__pagedDone cuando termina de paginar
await page.waitForFunction('window.__pagedDone === true', { timeout: 300000, polling: 500 });
await page.evaluateHandle('document.fonts.ready');
const pages = await page.evaluate(() => document.querySelectorAll('.pagedjs_page').length);
const pdfPath = join(DIST, 'kit.pdf');
await page.pdf({ path: pdfPath, preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false });
await browser.close();
console.log(`PDF  → ${pdfPath}  (${pages} páginas)`);
