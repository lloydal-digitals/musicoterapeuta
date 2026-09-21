// Bonus C — Fichas de ritmo. Genera las tarjetas como SVG inline.
// Tres niveles + percusión corporal. Cada nivel tiene "vagones" (una figura por ficha,
// para El tren de los ritmos R05) y "patrones" (4 pulsos por ficha, para Eco rítmico R03).

const CLAY = 'oklch(62% .19 38)';
const COCOA = 'oklch(30% .06 50)';
const CLOUD = 'oklch(80% .02 250)';

// ---------- dibujos (viewBox 0 0 100 100) ----------
const gota = (x, y, s, fill = CLAY) =>
  `<path transform="translate(${x} ${y}) scale(${s})" fill="${fill}" d="M0 -32 C0 -32 -24 2 -24 14 a24 24 0 0 0 48 0 C24 2 0 -32 0 -32Z"/>`;
const nube = (x, y, s) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="${CLOUD}"><circle cx="-16" cy="6" r="14"/><circle cx="2" cy="-4" r="18"/><circle cx="20" cy="6" r="14"/><rect x="-16" y="6" width="36" height="14"/></g>`;
const cabeza = (x, y, hueca = false) =>
  `<ellipse cx="${x}" cy="${y}" rx="9" ry="6.5" transform="rotate(-20 ${x} ${y})" fill="${hueca ? '#fff' : COCOA}" stroke="${COCOA}" stroke-width="${hueca ? 3 : 0}"/>`;
const plica = (x, y1, y2) => `<rect x="${x - 1.5}" y="${Math.min(y1, y2)}" width="3" height="${Math.abs(y2 - y1)}" fill="${COCOA}"/>`;
const barra = (x1, x2, y, n = 1) => {
  let s = '';
  for (let i = 0; i < n; i++) s += `<rect x="${x1 - 1.5}" y="${y + i * 9}" width="${x2 - x1 + 3}" height="5.5" fill="${COCOA}"/>`;
  return s;
};
const corchete = (x, y) =>
  `<path d="M${x} ${y} c 0 12 12 14 12 28 c 0 6 -3 10 -6 12 c 4 -8 2 -14 -6 -22 Z" fill="${COCOA}"/>`;
// Silencio de negra (aproximación del glifo)
const silNegra = (x, y, s = 1) =>
  `<path transform="translate(${x} ${y}) scale(${s})" fill="${COCOA}" d="M-6 -34 L12 -10 L2 2 L14 18 C6 12 -4 14 -2 26 C-12 18 -10 6 2 8 L-10 -8 L2 -22 Z"/>`;
// Silencio de corchea
const silCorchea = (x, y) =>
  `<g fill="${COCOA}"><circle cx="${x - 8}" cy="${y - 14}" r="5"/><path d="M${x - 8} ${y - 9} c 6 4 12 2 16 -6 L${x - 2} ${y + 22} L${x - 8} ${y + 22} L${x + 1} ${y - 10} c -3 3 -7 3 -9 1 Z"/></g>`;

// ---------- figuras por nivel ----------
// Cada figura: { id, nombre, silaba, svg (dibujo centrado en 50,50), dur (en pulsos) }
const FIG = {
  // Nivel 1 — gotas
  n1_ta:   { id: 'n1_ta',   nombre: 'Una gota',     silaba: 'ta',    dur: 1, svg: gota(50, 58, 1.1) },
  n1_titi: { id: 'n1_titi', nombre: 'Dos gotitas',  silaba: 'ti-ti', dur: 1, svg: gota(34, 58, .72) + gota(66, 58, .72) },
  n1_sh:   { id: 'n1_sh',   nombre: 'Nube',         silaba: 'sh',    dur: 1, svg: nube(50, 52, 1.1) },
  // Nivel 2 — negra, corcheas, silencio
  n2_ta:   { id: 'n2_ta',   nombre: 'Negra',              silaba: 'ta',    dur: 1, svg: cabeza(44, 70) + plica(52, 68, 22) },
  n2_titi: { id: 'n2_titi', nombre: 'Dos corcheas',       silaba: 'ti-ti', dur: 1, svg: cabeza(32, 70) + cabeza(62, 70) + plica(40, 68, 22) + plica(70, 68, 22) + barra(40, 70, 22) },
  n2_sh:   { id: 'n2_sh',   nombre: 'Silencio de negra',  silaba: 'sh',    dur: 1, svg: silNegra(50, 54, 1.05) },
  // Nivel 3 — agrega blanca, corchea+silencio, cuatro semicorcheas
  n3_taa:  { id: 'n3_taa',  nombre: 'Blanca',                 silaba: 'ta-a',        dur: 2, svg: cabeza(44, 70, true) + plica(52, 68, 22) },
  n3_ti_:  { id: 'n3_ti_',  nombre: 'Corchea y silencio',     silaba: 'ti sh',       dur: 1, svg: cabeza(30, 70) + plica(38, 68, 24) + corchete(38, 24) + silCorchea(72, 52) },
  n3_tiri: { id: 'n3_tiri', nombre: 'Cuatro semicorcheas',    silaba: 'ti-ri-ti-ri', dur: 1, svg: [20, 40, 60, 80].map((x) => cabeza(x, 70) + plica(x + 8, 68, 22)).join('') + barra(28, 88, 22, 2) },
};

// ---------- patrones (para Eco rítmico y Tren) ----------
const PATRONES = {
  1: [
    ['n1_ta', 'n1_ta', 'n1_ta', 'n1_ta'],
    ['n1_ta', 'n1_ta', 'n1_sh', 'n1_ta'],
    ['n1_ta', 'n1_sh', 'n1_ta', 'n1_sh'],
    ['n1_titi', 'n1_ta', 'n1_ta', 'n1_ta'],
    ['n1_ta', 'n1_titi', 'n1_ta', 'n1_sh'],
    ['n1_titi', 'n1_titi', 'n1_ta', 'n1_sh'],
  ],
  2: [
    ['n2_ta', 'n2_ta', 'n2_ta', 'n2_ta'],
    ['n2_ta', 'n2_ta', 'n2_sh', 'n2_ta'],
    ['n2_ta', 'n2_sh', 'n2_ta', 'n2_sh'],
    ['n2_titi', 'n2_ta', 'n2_ta', 'n2_ta'],
    ['n2_ta', 'n2_titi', 'n2_ta', 'n2_sh'],
    ['n2_titi', 'n2_titi', 'n2_ta', 'n2_sh'],
  ],
  3: [
    ['n2_ta', 'n2_titi', 'n3_taa'],
    ['n3_ti_', 'n2_ta', 'n3_ti_', 'n2_ta'],
    ['n3_tiri', 'n2_ta', 'n2_titi', 'n2_ta'],
    ['n2_titi', 'n3_tiri', 'n2_ta', 'n2_sh'],
    ['n3_taa', 'n3_ti_', 'n2_titi'],
    ['n3_tiri', 'n3_tiri', 'n3_taa'],
  ],
};

// Vagones: cuántas copias de cada figura por nivel (12 por página)
const VAGONES = {
  1: [['n1_ta', 6], ['n1_titi', 3], ['n1_sh', 3]],
  2: [['n2_ta', 6], ['n2_titi', 3], ['n2_sh', 3]],
  3: [['n2_ta', 3], ['n2_titi', 3], ['n3_taa', 2], ['n3_ti_', 2], ['n3_tiri', 2]],
};

// Percusión corporal (R06): 4 pulsos, cada uno con íconos
const CORPORAL = [
  { nombre: 'Capa 1 · Pies', silabas: 'ta ta ta ta', pulsos: [['👣'], ['👣'], ['👣'], ['👣']] },
  { nombre: 'Capa 2 · Muslos', silabas: 'ta ti-ti ta ti-ti', pulsos: [['🦵'], ['🦵', '🦵'], ['🦵'], ['🦵', '🦵']] },
  { nombre: 'Capa 3 · Palmas', silabas: 'sh ta sh ta', pulsos: [[], ['👏'], [], ['👏']] },
  { nombre: 'Extra · Pecho y palmas', silabas: 'ta ta ti-ti ta', pulsos: [['✊'], ['✊'], ['👏', '👏'], ['👏']] },
  { nombre: 'Extra · Chasquido', silabas: 'sh ti-ti sh ta', pulsos: [[], ['👌', '👌'], [], ['👌']] },
  { nombre: 'Extra · Todo el cuerpo', silabas: 'ta ta ta sh', pulsos: [['👣'], ['🦵'], ['👏'], []] },
];

// ---------- render ----------
const svgFig = (f, cls = '') => `<svg class="fig ${cls}" viewBox="0 0 100 100" aria-label="${f.nombre}">${f.svg}</svg>`;

function vagon(f, nivel) {
  return `<div class="ficha-card vagon n${nivel}">
    ${svgFig(f)}
    <div class="lbl"><b>${f.silaba}</b><small>${f.nombre}</small></div>
    <span class="tag">Nivel ${nivel}</span>
  </div>`;
}

function patron(figs, nivel, idx) {
  const cells = figs.map((id) => {
    const f = FIG[id];
    return `<div class="beat" style="flex:${f.dur}">${svgFig(f)}<small>${f.silaba}</small></div>`;
  }).join('');
  return `<div class="ficha-card patron n${nivel}">
    <div class="beats">${cells}</div>
    <div class="pulsos">${'<span></span>'.repeat(4)}</div>
    <span class="tag">Nivel ${nivel} · Patrón ${idx + 1}</span>
  </div>`;
}

function corporal(c, idx) {
  const cells = c.pulsos.map((icos) => `<div class="beat"><div class="icos n${icos.length}">${icos.length ? icos.map((i) => `<span>${i}</span>`).join('') : '<span class="rest">○</span>'}</div></div>`).join('');
  return `<div class="ficha-card patron corp">
    <div class="beats">${cells}</div>
    <div class="pulsos">${'<span></span>'.repeat(4)}</div>
    <div class="lbl"><b>${c.silabas}</b><small>${c.nombre}</small></div>
    <span class="tag">Percusión corporal · ${idx + 1}</span>
  </div>`;
}

const page = (titulo, sub, inner, cls = '') => `
<section class="ficha-page ${cls}">
  <header class="ficha-head"><h2>${titulo}</h2><p>${sub}</p></header>
  <div class="ficha-grid">${inner}</div>
  <p class="ficha-foot">Bonus C · Fichas de ritmo · Imprimir en cartulina o papel grueso y recortar por las líneas</p>
</section>`;

export function bonusFichasHtml() {
  let out = `
<section class="divider bonus" id="bonus-c" style="--eje:${CLAY}">
  <span class="bignum">C</span>
  <div class="divider-inner">
    <span class="ico-circle">🎁</span>
    <p class="kicker">Bonus C</p>
    <h1>Fichas de ritmo</h1>
    <p class="desc">Tres niveles de lectura rítmica y fichas de percusión corporal. Se usan en <b>Eco rítmico (R03)</b>, <b>El tren de los ritmos (R05)</b>, <b>Percusión corporal por capas (R06)</b> y <b>Rap de la sala (V05)</b>.</p>
    <table class="toc"><tbody>
      <tr><td class="code">N1</td><td><b>Nivel 1 · Gotas y nubes</b> — grafía figurativa: una gota = «ta», dos gotitas = «ti-ti», nube = silencio</td><td>4–5 años</td></tr>
      <tr><td class="code">N2</td><td><b>Nivel 2 · Negras y corcheas</b> — los mismos ritmos, escritos como los escriben los músicos</td><td>6–8 años</td></tr>
      <tr><td class="code">N3</td><td><b>Nivel 3 · Blancas y semicorcheas</b> — figuras nuevas y patrones más largos</td><td>7–8 años</td></tr>
      <tr><td class="code">PC</td><td><b>Percusión corporal</b> — pies, muslos, palmas: las capas de R06 y tres extra</td><td>6–8 años</td></tr>
    </tbody></table>
  </div>
</section>

<section class="ficha-page intro">
  <header class="ficha-head"><h2>Cómo usar las fichas</h2><p>Dos tipos de ficha, dos usos</p></header>
  <div class="ficha-intro">
    <div>
      <h3>Vagones (una figura por ficha)</h3>
      <p>Son las piezas de <b>El tren de los ritmos (R05)</b>. Se ponen en fila y se leen de izquierda a derecha, un pulso por ficha, marcando el pulso con el pie. Cambiar un vagón cambia el tren. Imprimí varias copias del nivel que uses: cuantos más vagones, más trenes posibles.</p>
      <h3>Patrones (cuatro pulsos por ficha)</h3>
      <p>Son los ecos de <b>Eco rítmico (R03)</b> ya escritos. Después de hacer un patrón con palmas, mostrá la ficha: «esto que hicimos se puede dibujar». Los puntos de abajo marcan los cuatro pulsos; pasá el dedo por ellos mientras leen.</p>
    </div>
    <div>
      <h3>Los tres niveles</h3>
      <p><b>Nivel 1</b> usa gotas y nubes: cualquier chico de 4 lo lee sin explicación. <b>Nivel 2</b> escribe exactamente los mismos ritmos con negras, corcheas y silencios: poné las dos versiones lado a lado y el pasaje es inmediato. <b>Nivel 3</b> agrega blancas (dos pulsos), corchea con silencio y semicorcheas, para los que van rápido.</p>
      <h3>Las sílabas</h3>
      <p>Cada figura tiene una sílaba para decirla mientras se toca: <b>ta</b> (un golpe), <b>ti-ti</b> (dos rápidos), <b>sh</b> (silencio), <b>ta-a</b> (largo), <b>ti-ri-ti-ri</b> (cuatro muy rápidos). Decir y tocar a la vez es lo que hace que el ritmo se fije.</p>
      <h3>Impresión</h3>
      <p>Cartulina o papel de 180 g o más. Recortar por las líneas. Si podés, plastificar: los vagones se usan mucho.</p>
    </div>
  </div>
  <p class="ficha-foot">Bonus C · Fichas de ritmo</p>
</section>`;

  for (const nivel of [1, 2, 3]) {
    const vag = VAGONES[nivel].flatMap(([id, n]) => Array.from({ length: n }, () => vagon(FIG[id], nivel))).join('');
    out += page(`Nivel ${nivel} · Vagones`, 'Una figura por ficha · para El tren de los ritmos (R05)', vag, 'grid-3');
    const pats = PATRONES[nivel].map((p, i) => patron(p, nivel, i)).join('');
    out += page(`Nivel ${nivel} · Patrones`, 'Cuatro pulsos por ficha · para Eco rítmico (R03)', pats, 'grid-2');
  }
  out += page('Percusión corporal', 'Las tres capas de R06 y tres patrones extra · 👣 pies · 🦵 muslos · 👏 palmas · ✊ pecho · 👌 chasquido', CORPORAL.map(corporal).join(''), 'grid-2');
  return out;
}
