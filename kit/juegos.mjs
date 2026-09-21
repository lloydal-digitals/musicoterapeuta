// Sección 8 — Juegos imprimibles, y Sección 10 — Planificador. Hojas generadas por código.
import { em } from './emoji.mjs';
import { CATS, SVG } from './tarjetas.mjs';

const page = (id, titulo, sub, inner, foot = 'Sección 8 · Juegos imprimibles') => `
<section class="ficha-page juego"${id ? ` id="${id}"` : ''}>
  <header class="ficha-head"><h2>${titulo}</h2><p>${sub}</p></header>
  ${inner}
  <p class="ficha-foot">${foot}</p>
</section>`;

const lines = (n, cls = '') => Array.from({ length: n }, () => `<div class="wline ${cls}"></div>`).join('');
const boxes = (n) => Array.from({ length: n }, () => '<span class="chk"></span>').join('');

// ---- 8.1 Nombres rítmicos (R04) ----
function nombresRitmicos() {
  const cards = Array.from({ length: 8 }, () => `
    <div class="ficha-card name-card">
      <span class="tag">Nombres rítmicos</span>
      <p class="lbl-small">Me llamo</p>
      <div class="wline big"></div>
      <p class="lbl-small">Mi nombre tiene estas palmas (pintá una por sílaba)</p>
      <div class="dots-row">${'<span class="dot"></span>'.repeat(5)}</div>
    </div>`).join('');
  return page('juego-nombres', 'Nombres rítmicos', 'Para Mi nombre tiene ritmo (R04) · una tarjeta por niño', `
    <p class="juego-hint">${em('👏')} Escribí el nombre en letras grandes. Después de palmearlo, el niño pinta una gota por cada palma. Las tarjetas se ordenan en fila para armar el «tren de nombres».</p>
    <div class="ficha-grid grid-2-4">${cards}</div>`);
}

// ---- 8.2 Safari sonoro (E03) ----
function safariSonoro() {
  const rows = Array.from({ length: 6 }, (_, i) => `
    <tr>
      <td class="draw"><span class="n">${i + 1}</span></td>
      <td class="c">${boxes(1)}</td><td class="c">${boxes(1)}</td><td class="c">${boxes(1)}</td><td class="c">${boxes(1)}</td><td class="c">${boxes(1)}</td>
    </tr>`).join('');
  return page('juego-safari', 'Safari sonoro', 'Para Safari sonoro (E03) · hoja de registro', `
    <div class="juego-top">
      <div class="juego-big">${em('🧭')}</div>
      <div>
        <p class="juego-hint"><b>Explorador/a:</b> <span class="wline inline"></span></p>
        <p class="juego-hint">Caminá despacio, en silencio. Cuando caces un sonido, dibujalo (no el objeto: <i>cómo suena</i>) y marcá cómo era.</p>
      </div>
    </div>
    <table class="juego-table safari">
      <thead><tr><th>Sonido que cacé (dibujalo)</th><th>${em('🔊')}<br>fuerte</th><th>${em('🔈')}<br>suave</th><th>➖<br>largo</th><th>•<br>corto</th><th>${em('💛')}<br>me gustó</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="juego-hint">Mi sonido favorito fue: <span class="wline inline long"></span></p>`);
}

// ---- 8.3 Mapa sonoro (E05) ----
function mapaSonoro() {
  return page('juego-mapa', 'Mapa sonoro', 'Para Mapa sonoro (E05) · dibujá los sonidos donde los escuchaste', `
    <div class="juego-top">
      <p class="juego-hint"><b>Lugar:</b> <span class="wline inline"></span> &nbsp; <b>Nombre:</b> <span class="wline inline"></span></p>
    </div>
    <div class="mapa">
      <svg viewBox="0 0 400 400" class="mapa-svg">
        <circle cx="200" cy="200" r="190" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>
        <circle cx="200" cy="200" r="125" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>
        <circle cx="200" cy="200" r="60" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 6"/>
        <line x1="200" y1="10" x2="200" y2="390" stroke="var(--border)" stroke-width="1.5"/>
        <line x1="10" y1="200" x2="390" y2="200" stroke="var(--border)" stroke-width="1.5"/>
        <circle cx="200" cy="200" r="26" fill="oklch(62% .19 38)"/>
        <text x="200" y="207" text-anchor="middle" font-family="Fraunces, serif" font-weight="800" font-size="18" fill="#fff">yo</text>
        <text x="200" y="30" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="12" fill="oklch(50% .04 50)">ADELANTE</text>
        <text x="200" y="382" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="12" fill="oklch(50% .04 50)">ATRÁS</text>
        <text x="28" y="196" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="12" fill="oklch(50% .04 50)" transform="rotate(-90 28 196)">IZQUIERDA</text>
        <text x="372" y="196" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="12" fill="oklch(50% .04 50)" transform="rotate(90 372 196)">DERECHA</text>
        <text x="215" y="150" font-family="Nunito, sans-serif" font-weight="700" font-size="9" fill="oklch(70% .03 50)">cerca</text>
        <text x="215" y="85" font-family="Nunito, sans-serif" font-weight="700" font-size="9" fill="oklch(70% .03 50)">lejos</text>
      </svg>
    </div>
    <div class="legend">
      <b>Cómo dibujar un sonido</b>
      <span>grande = fuerte</span><span>chiquito = suave</span><span>línea larga = largo</span><span>punto = corto</span><span>arriba = agudo</span><span>abajo = grave</span>
    </div>`);
}

// ---- 8.4 Semáforo musical (C06) ----
function semaforo() {
  const c = (color, emoji, t, s) => `
    <div class="sem-card" style="--c:${color}">
      <div class="sem-light">${em(emoji, 'fig')}</div>
      <div><b>${t}</b><small>${s}</small></div>
    </div>`;
  return page('juego-semaforo', 'Semáforo musical', 'Para Semáforo musical (C06) · recortar las tres tarjetas', `
    <p class="juego-hint">Mostrá una tarjeta por vez, bien alta. Cambiá cada vez más rápido. Después, cambiá las reglas: lo que era verde ahora es rojo.</p>
    <div class="sem-grid">
      ${c('oklch(60% .2 25)', '🔴', 'Estatua', 'Todo el cuerpo quieto. Ni un dedo.')}
      ${c('oklch(82% .17 90)', '🟡', 'Cámara lenta', 'Caminar lo más despacio que puedas.')}
      ${c('oklch(62% .15 145)', '🟢', 'Caminar al pulso', 'Un paso por cada golpe.')}
    </div>`);
}

// ---- 8.5 Etiquetas para mi instrumento (I03) ----
function etiquetas() {
  const cards = Array.from({ length: 6 }, () => `
    <div class="ficha-card label-card">
      <span class="tag">Mi instrumento</span>
      <p class="lbl-small">Este instrumento se llama</p><div class="wline big"></div>
      <p class="lbl-small">Lo hizo</p><div class="wline"></div>
      <p class="lbl-small">Adentro tiene</p><div class="wline"></div>
      <p class="lbl-small">Suena &nbsp; ${boxes(1)} suave &nbsp; ${boxes(1)} fuerte &nbsp; · &nbsp; ${boxes(1)} grave &nbsp; ${boxes(1)} agudo</p>
    </div>`).join('');
  return page('juego-etiquetas', 'Etiquetas para mi instrumento', 'Para Cotidiáfonos (I03) · una etiqueta por instrumento construido', `
    <p class="juego-hint">${em('🪇')} Se completa después de construir, y se pega en el instrumento o va a la carpeta. Lo que dice «adentro tiene» es la explicación de por qué suena así.</p>
    <div class="ficha-grid grid-2-3">${cards}</div>`);
}

// ---- 8.6 Ficha del detective (E06) ----
function detective() {
  const instr = CATS.find((c) => c.id === 'instrumentos').cards;
  const cells = instr.map((c) => `
    <div class="det-cell">
      <span class="chk"></span>
      <div class="det-fig">${c.svg ? SVG[c.svg] : em(c.e, 'fig')}</div>
      <b>${c.n}</b>
    </div>`).join('');
  return page('juego-detective', 'Ficha del detective', 'Para Detective de instrumentos (E06) · marcá el sospechoso', `
    <div class="juego-top">
      <div class="juego-big">${em('🔍')}</div>
      <div><p class="juego-hint"><b>Detective:</b> <span class="wline inline"></span></p><p class="juego-hint">Escuchá con atención. Cuando termine el sonido, marcá qué instrumento fue. Si sonaron dos, marcá los dos.</p></div>
    </div>
    <p class="lbl-small">Caso 1</p><div class="det-grid">${cells}</div>
    <p class="lbl-small">Caso 2</p><div class="det-grid">${cells}</div>
    <p class="juego-hint" style="margin-top:3mm">Casos resueltos: acerté <span class="wline inline short"></span> de <span class="wline inline short"></span></p>`);
}

// ---- 8.7 Partitura en blanco / garabatos (I06, M06) ----
function partituraBlanco() {
  const staff = (n) => `
    <div class="staff">
      <span class="staff-n">${n}</span>
      <div class="staff-line"></div>
    </div>`;
  return page('juego-partitura', 'Partitura de garabatos', 'Para Partitura de garabatos (I06) y La canción de nuestro grupo (M06)', `
    <p class="juego-hint"><b>Título:</b> <span class="wline inline long"></span> &nbsp; <b>Compositor/a:</b> <span class="wline inline"></span></p>
    <p class="juego-hint">Se lee de izquierda a derecha, al pulso. Dibujá cada sonido donde suena: grande si es fuerte, chiquito si es suave, largo si dura, un punto si es corto.</p>
    ${[1, 2, 3, 4].map(staff).join('')}
    <div class="legend legend-box"><b>Mis símbolos</b><span>______ = ______</span><span>______ = ______</span><span>______ = ______</span><span>______ = ______</span></div>`);
}

export function seccionJuegosHtml() {
  return `
<section class="divider" id="juegos" style="--eje:oklch(58% .13 235)">
  <span class="bignum">8</span>
  <div class="divider-inner">
    <span class="ico-circle">🧩</span>
    <p class="kicker">Sección 8</p>
    <h1>Juegos imprimibles</h1>
    <p class="desc">Siete hojas listas para imprimir que acompañan actividades concretas del kit. Cada una dice en qué actividad se usa.</p>
    <table class="toc"><tbody>
      <tr><td class="code">8.1</td><td><b>Nombres rítmicos</b> — tarjetas de nombre con gotas para pintar</td><td>R04</td></tr>
      <tr><td class="code">8.2</td><td><b>Safari sonoro</b> — hoja de registro del explorador</td><td>E03</td></tr>
      <tr><td class="code">8.3</td><td><b>Mapa sonoro</b> — el «yo» en el centro y el espacio alrededor</td><td>E05</td></tr>
      <tr><td class="code">8.4</td><td><b>Semáforo musical</b> — tres tarjetas grandes de color</td><td>C06</td></tr>
      <tr><td class="code">8.5</td><td><b>Etiquetas para mi instrumento</b></td><td>I03</td></tr>
      <tr><td class="code">8.6</td><td><b>Ficha del detective</b> — los sospechosos para marcar</td><td>E06</td></tr>
      <tr><td class="code">8.7</td><td><b>Partitura de garabatos</b> — líneas de tiempo para componer</td><td>I06 · M06</td></tr>
    </tbody></table>
  </div>
</section>
${nombresRitmicos()}${safariSonoro()}${mapaSonoro()}${semaforo()}${etiquetas()}${detective()}${partituraBlanco()}`;
}

// ---------- Sección 10 · Planificador ----------
function planificador(num) {
  const row = (t) => `<tr><td class="stage-cell">${t}</td><td></td><td class="min"></td><td></td></tr>`;
  return page('plan-clase', 'Planificador de clase o sesión', `Sección ${num} · una hoja por encuentro`, `
    <div class="plan-head">
      <p><b>Fecha:</b> <span class="wline inline short"></span></p>
      <p><b>Grupo / niño:</b> <span class="wline inline"></span></p>
      <p><b>Edad:</b> <span class="wline inline short"></span></p>
    </div>
    <p class="juego-hint"><b>Objetivo de hoy:</b> <span class="wline inline long"></span></p>
    <table class="juego-table plan">
      <thead><tr><th>Momento</th><th>Actividad (código y nombre)</th><th>Min</th><th>Materiales</th></tr></thead>
      <tbody>${row('Apertura')}${row('Desarrollo')}${row('Desarrollo')}${row('Cierre')}</tbody>
    </table>
    <p class="juego-hint"><b>Qué observar hoy</b> (elegí una o dos cosas de la tabla «Qué observar» de la actividad):</p>
    ${lines(2)}
    <p class="juego-hint"><b>Cómo salió:</b></p>
    ${lines(4)}
    <p class="juego-hint"><b>Para la próxima:</b></p>
    ${lines(2)}`, `Sección ${num} · Planificador`);
}

function observacion(num) {
  const rows = Array.from({ length: 7 }, () => '<tr><td></td><td></td><td></td><td></td></tr>').join('');
  return page('plan-observacion', 'Hoja de observación', `Sección ${num} · registro por niño a lo largo del tiempo`, `
    <div class="plan-head">
      <p><b>Niño/a:</b> <span class="wline inline"></span></p>
      <p><b>Edad:</b> <span class="wline inline short"></span></p>
      <p><b>Período:</b> <span class="wline inline"></span></p>
    </div>
    <table class="juego-table obs">
      <thead><tr><th>Fecha</th><th>Actividad</th><th>Qué observé</th><th>Próxima vez</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="juego-hint">Anotá lo que viste, no lo que esperabas ver. Una línea por encuentro alcanza; con el tiempo, esta hoja cuenta una historia.</p>`, `Sección ${num} · Planificador`);
}

export function seccionPlanificadorHtml(num = '10') {
  return `
<section class="divider" id="planificador" style="--eje:oklch(60% .15 150)">
  <span class="bignum">${num}</span>
  <div class="divider-inner">
    <span class="ico-circle">📝</span>
    <p class="kicker">Sección ${num}</p>
    <h1>Planificador</h1>
    <p class="desc">Dos hojas para el adulto: una para armar cada clase o sesión con la estructura apertura–desarrollo–cierre, y otra para registrar lo que observás en cada niño a lo largo del tiempo. Imprimí las que necesites.</p>
    <table class="toc"><tbody>
      <tr><td class="code">${num}.1</td><td><b>Planificador de clase o sesión</b> — una hoja por encuentro</td><td></td></tr>
      <tr><td class="code">${num}.2</td><td><b>Hoja de observación</b> — una hoja por niño</td><td></td></tr>
    </tbody></table>
  </div>
</section>
${planificador(num)}${observacion(num)}`;
}
