// Genera el anuncio en video 9:16 (1080x1920) a partir de las páginas reales del kit.
// Los textos y el fondo se renderizan en Chrome (mismas tipografías que la landing) y
// ffmpeg compone el movimiento. Uso: node video.mjs  → dist/anuncio.mp4 (sin audio)
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PREV = join(__dirname, 'dist', 'preview');
const IMG = join(__dirname, '..', 'img');
const OUT = join(__dirname, 'dist', 'video');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const FFMPEG = [
  'C:/Users/bauti/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg.exe',
  'ffmpeg',
].find((p) => p === 'ffmpeg' || existsSync(p));
const ff = (args) => execFileSync(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });
const FFPROBE = FFMPEG.replace(/ffmpeg(\.exe)?$/, 'ffprobe$1');

// Encaja la imagen dentro de la caja sin recortarla y devuelve medidas pares
// (libx264 las necesita). Calcularlas acá evita los redondeos de `pad`.
function encajar(file, cajaW, cajaH) {
  const [w, h] = execFileSync(FFPROBE, ['-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file])
    .toString().trim().split(',').map(Number);
  const k = Math.min(cajaW / w, cajaH / h);
  return { w: Math.floor(w * k / 2) * 2, h: Math.floor(h * k / 2) * 2 };
}

const W = 1080, H = 1920, FPS = 30;

// Las escenas del guion. `img` es la imagen de fondo de la escena; `dur` en segundos.
const ESCENAS = [
  { id: 's1', dur: 3, img: join(IMG, 'hero-mockup.webp'), titulo: 'Convertí la clase de música en <em>juego</em>' },
  { id: 's2', dur: 3, img: join(PREV, 'p011.png'), titulo: '36 actividades <em>listas</em> para aplicar' },
  { id: 's3', dur: 2, img: join(PREV, 'p142.png'), titulo: '🎨 Tarjetas ilustradas' },
  { id: 's4', dur: 2, img: join(PREV, 'p147.png'), titulo: '🧩 Juegos para imprimir' },
  { id: 's5', dur: 2, img: join(PREV, 'p155.png'), titulo: '📖 Partituras para principiantes' },
  { id: 's6', dur: 3, flip: ['p010', 'p011', 'p049', 'p090', 'p112', 'p142', 'p147', 'p155', 'p165', 'p178'], titulo: '<b>185 páginas</b>' },
  { id: 's7', dur: 3, trio: ['bonus-canciones', 'bonus-calendario', 'bonus-fichas-ritmo'], titulo: '🎁 Los 3 bonos, <em>gratis</em>' },
  { id: 's8', dur: 2, img: join(IMG, 'mockup-completo.webp'), titulo: 'Acceso de por vida', pie: '🔒 7 días de garantía' },
  { id: 's9', dur: 2, cta: true, titulo: 'Tocá <em>“Más información”</em>', pie: 'Kit Musicalización Encantada' },
];

// ---------- 1. Fondo y textos, renderizados en Chrome ----------
const CSS = `
  * { box-sizing: border-box; margin: 0; }
  body { width: ${W}px; height: ${H}px; font-family: Nunito, sans-serif; }
  .fondo { width: 100%; height: 100%; background: linear-gradient(160deg, #fffaf5 0%, oklch(95% .04 55) 45%, oklch(88% .08 45) 100%); }
  .capa { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 190px 70px 300px; text-align: center; }
  h1 { font-family: Fraunces, serif; font-size: 96px; line-height: 1.08; font-weight: 800; color: oklch(30% .06 50); letter-spacing: -.015em;
       text-shadow: 0 2px 18px rgba(255,250,245,.9); }
  h1 em { font-style: italic; color: oklch(58% .2 38); }
  h1 b { display: block; font-size: 150px; color: oklch(58% .2 38); }
  .pie { font-size: 52px; font-weight: 800; color: oklch(38% .06 50); text-shadow: 0 2px 14px rgba(255,250,245,.9); }
  .cta .flecha { font-size: 130px; }
`;

const browser = await puppeteer.launch({
  executablePath: ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync),
  headless: true, args: ['--disable-gpu', '--no-sandbox', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

async function render(html, file, transparente) {
  await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,800;1,9..144,800&family=Nunito:wght@700;800&display=swap"><style>${CSS}</style></head><body>${html}</body></html>`, { waitUntil: 'load', timeout: 60000 });
  await page.evaluateHandle('document.fonts.ready');
  await page.screenshot({ path: file, omitBackground: !!transparente });
  return file;
}

const bg = await render('<div class="fondo"></div>', join(OUT, 'fondo.png'));
for (const e of ESCENAS) {
  const pie = e.pie ? `<p class="pie">${e.pie}</p>` : '<p></p>';
  const flecha = e.cta ? '<p class="pie flecha">👇</p>' : '';
  e.txt = await render(`<div class="capa ${e.cta ? 'cta' : ''}"><h1>${e.titulo}</h1>${flecha}${pie}</div>`, join(OUT, `txt-${e.id}.png`), true);
}
await browser.close();
console.log('textos listos');

// ---------- 2. Un clip por escena ----------
// La imagen ocupa la franja central (fuera de las zonas que tapa la interfaz de Reels)
// y hace un zoom lento; el texto se superpone quieto, con fade de entrada.
const CAJA_W = 880, CAJA_H = 1060, CAJA_Y = 470;
const ZOOM = (dur, m) => `zoompan=z='min(1.12,1+0.12*on/${Math.round(dur * FPS)})':d=${Math.round(dur * FPS)}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${m.w}x${m.h}:fps=${FPS}`;
const FADE = (dur) => `fade=t=in:st=0:d=0.35,fade=t=out:st=${(dur - 0.3).toFixed(2)}:d=0.3`;

const clips = [];
for (const e of ESCENAS) {
  const out = join(OUT, `${e.id}.mp4`);
  const n = Math.round(e.dur * FPS);

  if (e.flip) {
    // Pasada rápida: una página cada 0.3 s. Van como entradas separadas y se
    // escalan todas al mismo tamaño porque el PDF no da páginas idénticas.
    const paso = (e.dur / e.flip.length).toFixed(3);
    const mf = encajar(join(PREV, e.flip[0] + '.png'), CAJA_W, CAJA_H);
    const ins = e.flip.flatMap((p) => ['-loop', '1', '-t', paso, '-i', join(PREV, p + '.png')]);
    const esc = e.flip.map((_, i) => `[${i + 1}:v]scale=${mf.w}:${mf.h},setsar=1,fps=${FPS}[f${i}]`).join(';');
    const refs = e.flip.map((_, i) => `[f${i}]`).join('');
    ff(['-loop', '1', '-t', String(e.dur), '-i', bg, ...ins, '-loop', '1', '-t', String(e.dur), '-i', e.txt,
      '-filter_complex',
      `${esc};${refs}concat=n=${e.flip.length}:v=1:a=0[p];` +
      `[0:v][p]overlay=(W-w)/2:${CAJA_Y + Math.round((CAJA_H - mf.h) / 2)}:shortest=1[a];` +
      `[a][${e.flip.length + 1}:v]overlay=0:0,${FADE(e.dur)},format=yuv420p[v]`,
      '-map', '[v]', '-r', String(FPS), '-frames:v', String(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out]);
  } else if (e.trio) {
    // Los tres bonos, uno al lado del otro
    const ins = e.trio.flatMap((b) => ['-loop', '1', '-t', String(e.dur), '-i', join(IMG, b + '.webp')]);
    ff(['-loop', '1', '-t', String(e.dur), '-i', bg, ...ins, '-loop', '1', '-t', String(e.dur), '-i', e.txt,
      '-filter_complex',
      `[1:v]scale=380:380,setsar=1[b1];[2:v]scale=380:380,setsar=1[b2];[3:v]scale=380:380,setsar=1[b3];` +
      `[b1][b2][b3]hstack=inputs=3[fila];` +
      `[0:v][fila]overlay=(W-w)/2:820:shortest=1[a];[a][4:v]overlay=0:0,${FADE(e.dur)},fps=${FPS},format=yuv420p[v]`,
      '-map', '[v]', '-r', String(FPS), '-frames:v', String(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out]);
  } else if (e.cta) {
    ff(['-loop', '1', '-t', String(e.dur), '-i', bg, '-loop', '1', '-t', String(e.dur), '-i', e.txt,
      '-filter_complex', `[0:v][1:v]overlay=0:0,${FADE(e.dur)},fps=${FPS},format=yuv420p[v]`,
      '-map', '[v]', '-r', String(FPS), '-frames:v', String(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out]);
  } else {
    const m = encajar(e.img, CAJA_W, CAJA_H);
    ff(['-loop', '1', '-t', String(e.dur), '-i', bg, '-loop', '1', '-t', String(e.dur), '-i', e.img, '-loop', '1', '-t', String(e.dur), '-i', e.txt,
      '-filter_complex',
      `[1:v]scale=${m.w}:${m.h},setsar=1,${ZOOM(e.dur, m)}[p];` +
      `[0:v][p]overlay=(W-w)/2:${CAJA_Y + Math.round((CAJA_H - m.h) / 2)}:shortest=1[a];[a][2:v]overlay=0:0,${FADE(e.dur)},format=yuv420p[v]`,
      '-map', '[v]', '-r', String(FPS), '-frames:v', String(n), '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out]);
  }
  clips.push(out);
  console.log('clip', e.id);
}

// ---------- 3. Unir todo ----------
const lista = join(OUT, 'clips.txt');
writeFileSync(lista, clips.map((c) => `file '${c.replace(/\\/g, '/')}'`).join('\n'));
const final = join(__dirname, 'dist', 'anuncio.mp4');
ff(['-f', 'concat', '-safe', '0', '-i', lista, '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', final]);
console.log('listo →', final);
