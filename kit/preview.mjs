// Captura páginas del kit paginado como PNG para revisarlas.
// Uso: node preview.mjs 1 2 5 12      → dist/preview/p001.png, p002.png, ...
//      node preview.mjs id:r01        → la página donde empieza el elemento #r01
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, 'dist', 'kit.html');
const out = join(__dirname, 'dist', 'preview');
if (!existsSync(out)) mkdirSync(out, { recursive: true });

const candidates = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];
const browser = await puppeteer.launch({ executablePath: candidates.find(existsSync), headless: true, args: ['--disable-gpu', '--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1.2 });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load', timeout: 120000 });
await page.waitForFunction('window.__pagedDone === true', { timeout: 300000, polling: 500 });

const args = process.argv.slice(2);
const nums = [];
for (const a of args) {
  if (a.startsWith('id:')) {
    const n = await page.evaluate((id) => {
      const el = document.getElementById(id);
      const pg = el?.closest('.pagedjs_page');
      return pg ? [...document.querySelectorAll('.pagedjs_page')].indexOf(pg) + 1 : null;
    }, a.slice(3));
    if (n) nums.push(n); else console.error('no encontré', a);
  } else nums.push(Number(a));
}
for (const n of nums) {
  const el = await page.$(`.pagedjs_page:nth-of-type(${n})`);
  if (!el) { console.error('no existe la página', n); continue; }
  const file = join(out, `p${String(n).padStart(3, '0')}.png`);
  await el.screenshot({ path: file });
  console.log(file);
}
await browser.close();
