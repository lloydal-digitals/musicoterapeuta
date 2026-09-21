// Convierte imágenes (png/jpg) a WebP con Chrome. Uso: node convertir.mjs ../img/clienta1.png [ancho]
import { existsSync, readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import puppeteer from 'puppeteer-core';

const [, , src, w = '900'] = process.argv;
if (!src) { console.error('uso: node convertir.mjs <imagen> [ancho]'); process.exit(1); }
const file = resolve(src);
const width = Number(w);
const data = `data:image/${extname(file).slice(1) === 'jpg' ? 'jpeg' : extname(file).slice(1)};base64,${readFileSync(file).toString('base64')}`;

const browser = await puppeteer.launch({ executablePath: ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync), headless: true });
const page = await browser.newPage();
await page.setContent(`<img id="i" src="${data}" style="display:block">`, { waitUntil: 'load' });
const { nw, nh } = await page.evaluate(() => { const i = document.getElementById('i'); return { nw: i.naturalWidth, nh: i.naturalHeight }; });
const height = Math.round((nh / nw) * width);
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.evaluate((w) => { const i = document.getElementById('i'); i.style.width = w + 'px'; document.body.style.margin = 0; }, width);
const out = file.replace(/\.(png|jpe?g)$/i, '.webp');
await page.screenshot({ path: out, type: 'webp', quality: 84, clip: { x: 0, y: 0, width, height } });
await browser.close();
console.log(`${out}  (${width}×${height})`);
