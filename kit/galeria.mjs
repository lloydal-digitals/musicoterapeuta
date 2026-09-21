// Genera las imágenes de la galería de la landing («Páginas reales del material») a partir del
// kit paginado: cada imagen muestra dos páginas reales, en 4:3, sobre fondo cálido.
// Uso: node galeria.mjs   → ../img/pagina-1.webp … pagina-6.webp (1600×1200)
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, 'dist', 'kit.html');
const IMG = join(__dirname, '..', 'img');

// Cada imagen: dos páginas (por id de elemento o número de página) y un título alt
const GALERIA = [
  { out: 'pagina-1', pages: ['id:r01', 'id:r01+1'], alt: 'Actividad «La lluvia que llega»: ficha y paso a paso' },
  { out: 'pagina-2', pages: ['id:tarjetas+2', 'id:tarjetas+4'], alt: 'Tarjetas musicales: instrumentos y emociones para recortar' },
  { out: 'pagina-3', pages: ['id:cancion-hola-hola', 'id:cancion-mantita'], alt: 'Partituras ilustradas de las canciones originales' },
  { out: 'pagina-4', pages: ['id:eje-6', 'id:m03'], alt: 'Eje Emociones y vínculo: separador y actividad' },
  { out: 'pagina-5', pages: ['id:bonus-c+3', 'id:bonus-c+7'], alt: 'Fichas de ritmo: vagones y patrones para imprimir' },
  { out: 'pagina-6', pages: ['id:bonus-b-marzo-empezamos', 'id:juego-semaforo'], alt: 'Calendario musical anual y juego del semáforo' },
];

const browser = await puppeteer.launch({ executablePath: ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync), headless: true, protocolTimeout: 600000, args: ['--disable-gpu', '--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1.4 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load', timeout: 120000 });
await page.waitForFunction('window.__pagedDone === true', { timeout: 300000, polling: 500 });

// resuelve "id:xxx" o "id:xxx+N" (N páginas después) a un número de página
async function pageNumber(ref) {
  if (!ref.startsWith('id:')) return Number(ref);
  const [id, off] = ref.slice(3).split('+');
  const n = await page.evaluate((id) => {
    const el = document.getElementById(id);
    const pg = el?.closest('.pagedjs_page');
    return pg ? [...document.querySelectorAll('.pagedjs_page')].indexOf(pg) + 1 : null;
  }, id);
  if (!n) throw new Error('no encontré ' + id);
  return n + (Number(off) || 0);
}

async function shot(n) {
  await page.bringToFront(); // con dos pestañas, Chrome headless no renderiza la que está atrás
  const el = await page.$(`.pagedjs_page:nth-of-type(${n})`);
  return 'data:image/png;base64,' + (await el.screenshot({ encoding: 'base64' }));
}

const t0 = Date.now(); const log = (m) => console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", m);
const comp = await browser.newPage();
await comp.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 1 });

for (const g of GALERIA) {
  const nums = []; for (const p of g.pages) nums.push(await pageNumber(p));
  log("páginas " + nums.join("+")); const a = await shot(nums[0]); log("shot a"); const b = await shot(nums[1]); log("shot b");
  await comp.setContent(`<!DOCTYPE html><html><head><style>
    body { margin: 0; width: 1600px; height: 1200px; overflow: hidden; position: relative;
      background: linear-gradient(160deg, #fffaf5 0%, oklch(95% .04 55) 50%, oklch(89% .08 45) 100%); }
    .blob { position: absolute; border-radius: 50%; filter: blur(70px); }
    .b1 { width: 700px; height: 700px; background: oklch(78% .15 75); opacity: .45; top: -250px; right: -200px; }
    .b2 { width: 500px; height: 500px; background: oklch(62% .19 38); opacity: .2; bottom: -200px; left: -150px; }
    img { position: absolute; width: 640px; border-radius: 10px; box-shadow: 0 40px 80px -30px rgba(60,35,25,.55), 0 10px 25px -10px rgba(60,35,25,.3); }
    .a { left: 170px; top: 130px; transform: rotate(-3deg); }
    .b { left: 790px; top: 200px; transform: rotate(2.5deg); }
  </style></head><body><div class="blob b1"></div><div class="blob b2"></div><img class="a" src="${a}"><img class="b" src="${b}"></body></html>`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  log("content"); await new Promise((r) => setTimeout(r, 300));
  await comp.bringToFront();
  const out = join(IMG, `${g.out}.webp`);
  await comp.screenshot({ path: out, type: 'webp', quality: 82 });
  console.log(`${g.out}.webp ← páginas ${nums.join(' + ')}  (${g.alt})`);
}
await browser.close();
