// Sección 7 — Tarjetas musicales. 12 por hoja A4, para imprimir y recortar.
import { em } from './emoji.mjs';

const COCOA = 'oklch(30% .06 50)';
const CLAY = 'oklch(62% .19 38)';
const HONEY = 'oklch(78% .15 75)';
const LEAF = 'oklch(62% .15 145)';

// Instrumentos que no tienen emoji: dibujos simples
export const SVG = {
  claves: `<svg class="fig" viewBox="0 0 100 100"><g stroke="${COCOA}" stroke-width="2" fill="oklch(70% .1 70)"><rect x="12" y="44" width="76" height="12" rx="6" transform="rotate(-28 50 50)"/><rect x="12" y="44" width="76" height="12" rx="6" transform="rotate(28 50 50)"/></g></svg>`,
  pandero: `<svg class="fig" viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="oklch(93% .03 70)" stroke="oklch(62% .1 60)" stroke-width="9"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${50 + 38 * Math.cos((a * Math.PI) / 180)}" cy="${50 + 38 * Math.sin((a * Math.PI) / 180)}" r="5" fill="${HONEY}" stroke="${COCOA}" stroke-width="1.5"/>`).join('')}</svg>`,
  triangulo: `<svg class="fig" viewBox="0 0 100 100"><path d="M50 14 L88 80 L18 80 L50 26" fill="none" stroke="oklch(75% .02 80)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 20 v-6" stroke="${COCOA}" stroke-width="3"/><rect x="60" y="40" width="5" height="36" rx="2.5" fill="${COCOA}" transform="rotate(-30 62 58)"/></svg>`,
  xilofono: `<svg class="fig" viewBox="0 0 100 100"><rect x="10" y="30" width="80" height="44" rx="6" fill="oklch(70% .1 70)"/>${['oklch(62% .19 38)', 'oklch(75% .17 60)', 'oklch(85% .16 90)', 'oklch(62% .15 145)', 'oklch(60% .13 235)', 'oklch(56% .16 295)'].map((c, i) => `<rect x="${16 + i * 12}" y="${22 + i * 2.5}" width="9" height="${60 - i * 5}" rx="3" fill="${c}" stroke="${COCOA}" stroke-width="1.5"/>`).join('')}</svg>`,
  sonajero: `<svg class="fig" viewBox="0 0 100 100"><circle cx="50" cy="36" r="22" fill="${CLAY}"/><circle cx="42" cy="28" r="6" fill="#fff" opacity=".5"/><rect x="45" y="56" width="10" height="34" rx="5" fill="oklch(70% .1 70)" stroke="${COCOA}" stroke-width="1.5"/><circle cx="50" cy="90" r="7" fill="${HONEY}" stroke="${COCOA}" stroke-width="1.5"/></svg>`,
};

// Categorías: color de fondo, etiqueta y tarjetas {n: nombre, e: emoji o svg, s: subtítulo}
export const CATS = [
  { id: 'instrumentos', tag: 'Instrumento', color: 'oklch(62% .15 150)', uso: 'Detective de instrumentos (E06) · Director de orquesta (C04)', cards: [
    { n: 'Tambor', e: '🥁', s: 'se golpea' }, { n: 'Claves', svg: 'claves', s: 'se golpean' }, { n: 'Maracas', e: '🪇', s: 'se sacuden' },
    { n: 'Pandero', svg: 'pandero', s: 'se sacude y se golpea' }, { n: 'Triángulo', svg: 'triangulo', s: 'se golpea' }, { n: 'Xilófono', svg: 'xilofono', s: 'se golpea' },
    { n: 'Campanita', e: '🔔', s: 'se sacude' }, { n: 'Flauta', e: '🪈', s: 'se sopla' }, { n: 'Trompeta', e: '🎺', s: 'se sopla' },
    { n: 'Saxofón', e: '🎷', s: 'se sopla' }, { n: 'Acordeón', e: '🪗', s: 'se sopla (con fuelle)' }, { n: 'Guitarra', e: '🎸', s: 'se pulsa' },
    { n: 'Banjo', e: '🪕', s: 'se pulsa' }, { n: 'Violín', e: '🎻', s: 'se frota' }, { n: 'Piano', e: '🎹', s: 'se golpea (por dentro)' },
  ] },
  { id: 'objetos', tag: 'Objeto sonoro', color: 'oklch(58% .13 235)', uso: 'La caja de los sonidos (E01)', cards: [
    { n: 'Llaves', e: '🔑', s: 'tintinean' }, { n: 'Papel', e: '📄', s: 'cruje' }, { n: 'Frasco con arroz', e: '🫙', s: 'shhh, shhh' },
    { n: 'Sonajero', svg: 'sonajero', s: 'suena al sacudir' }, { n: 'Cuchara', e: '🥄', s: 'golpea' }, { n: 'Olla', e: '🍳', s: 'resuena' },
  ] },
  { id: 'animales', tag: 'Grave ↔ agudo', color: 'oklch(62% .19 38)', uso: '¿Grave o agudo? (E04)', cards: [
    { n: 'Elefante', e: '🐘', s: 'muy grave · pesado' }, { n: 'Oso', e: '🐻', s: 'grave' }, { n: 'Gato', e: '🐱', s: 'medio' },
    { n: 'Pajarito', e: '🐦', s: 'agudo · liviano' }, { n: 'Ratón', e: '🐭', s: 'muy agudo' },
  ] },
  { id: 'tempo', tag: 'Tempo', color: 'oklch(68% .16 70)', uso: 'Tortuga y conejo (C02)', cards: [
    { n: 'Tortuga', e: '🐢', s: 'lento' }, { n: 'Conejo', e: '🐇', s: 'rápido' },
  ] },
  { id: 'dinamicas', tag: 'Dinámica', color: 'oklch(60% .17 345)', uso: 'Susurro, voz, grito (V04)', cards: [
    { n: 'Susurro', e: '🤫', s: 'muy suave' }, { n: 'Voz normal', e: '🗣️', s: 'medio' }, { n: 'Fuerte', e: '📣', s: 'muy fuerte' },
  ] },
  { id: 'emociones', tag: 'Emoción', color: 'oklch(56% .16 295)', uso: '¿Cómo suena mi emoción? (M03)', cards: [
    { n: 'Alegría', e: '😄', s: '¿cómo suena?' }, { n: 'Enojo', e: '😠', s: '¿cómo suena?' }, { n: 'Tristeza', e: '😢', s: '¿cómo suena?' }, { n: 'Calma', e: '😌', s: '¿cómo suena?' },
  ] },
  { id: 'gestos', tag: 'Gesto de dirección', color: 'oklch(68% .16 70)', uso: 'Director de orquesta (C04)', cards: [
    { n: 'Empezar', e: '👐', s: 'manos que se abren' }, { n: 'Parar', e: '✊', s: 'puño cerrado' }, { n: 'Fuerte', e: '🙌', s: 'brazos bien abiertos' }, { n: 'Suave', e: '🤲', s: 'manos juntas, cerca' },
  ] },
  { id: 'lluvia', tag: 'La lluvia', color: 'oklch(58% .13 235)', uso: 'La lluvia que llega (R01)', cards: [
    { n: 'Gotitas', e: '💧', s: 'suave' }, { n: 'Tormenta', e: '☁️', s: 'fuerte' }, { n: 'Salió el sol', e: '☀️', s: 'silencio' },
  ] },
];

function card(c, cat) {
  const fig = c.svg ? SVG[c.svg] : em(c.e, 'fig');
  return `<div class="ficha-card tarjeta" style="--cat:${cat.color}">
    <span class="tag">${cat.tag}</span>
    <div class="fig-wrap">${fig}</div>
    <div class="lbl"><b>${c.n}</b><small>${c.s}</small></div>
  </div>`;
}

export function seccionTarjetasHtml() {
  const all = CATS.flatMap((cat) => cat.cards.map((c) => card(c, cat)));
  const pages = [];
  for (let i = 0; i < all.length; i += 12) pages.push(all.slice(i, i + 12));
  const total = all.length;

  let out = `
<section class="divider" id="tarjetas" style="--eje:oklch(62% .19 38)">
  <span class="bignum">7</span>
  <div class="divider-inner">
    <span class="ico-circle">🃏</span>
    <p class="kicker">Sección 7</p>
    <h1>Tarjetas musicales</h1>
    <p class="desc">${total} tarjetas para imprimir y recortar: instrumentos, objetos sonoros, animales por altura, tempo, dinámicas, emociones, gestos de dirección y la lluvia. Son el apoyo visual de ocho actividades del kit.</p>
    <table class="toc"><tbody>
      ${CATS.map((cat) => `<tr><td class="code" style="color:${cat.color}">${cat.cards.length}</td><td><b>${cat.tag}</b> — ${cat.uso}</td></tr>`).join('')}
    </tbody></table>
  </div>
</section>

<section class="ficha-page intro">
  <header class="ficha-head"><h2>Cómo usar las tarjetas</h2><p>Sección 7 · ${total} tarjetas</p></header>
  <div class="ficha-intro">
    <div>
      <h3>Para qué sirven</h3>
      <p>Las tarjetas dan una <b>respuesta sin palabras</b>: el niño que todavía no nombra puede señalar. Y dan una <b>consigna sin palabras</b>: el adulto que muestra la tarjeta de «suave» no interrumpe la música para hablar. Cada categoría está pensada para una actividad, pero todas se pueden mezclar.</p>
      <h3>Por categoría</h3>
      <p><b>Instrumentos:</b> para reconocer por el timbre (E06) y para dirigir por grupos (C04). El subtítulo dice cómo se produce el sonido: golpear, sacudir, soplar, pulsar, frotar. Sirve para clasificarlos.</p>
      <p><b>Objetos sonoros:</b> para adivinar qué sonó en la caja (E01). Poné a la vista solo las tarjetas de los objetos que están en juego.</p>
      <p><b>Grave ↔ agudo:</b> cinco animales ordenados de grave a agudo (E04). Empezá con los dos extremos y sumá los del medio.</p>
    </div>
    <div>
      <p><b>Tempo:</b> tortuga y conejo (C02). También sirven para cualquier momento en que quieras pedir «más lento» o «más rápido» sin hablar.</p>
      <p><b>Dinámicas:</b> susurro, voz normal, fuerte (V04). Pegadas en la pared, regulan el volumen de la sala todo el año.</p>
      <p><b>Emociones:</b> alegría, enojo, tristeza, calma (M03). También para el «check-in» musical del inicio de cada encuentro.</p>
      <p><b>Gestos de dirección:</b> los cuatro gestos de la orquesta (C04), para recordarlos mientras se aprenden.</p>
      <p><b>La lluvia:</b> gotitas, tormenta y sol marcan la intensidad en R01.</p>
      <h3>Impresión</h3>
      <p>Cartulina o papel de 180 g o más, a color. Recortar por las líneas de puntos. Si vas a usarlas mucho (y las vas a usar), plastificalas o guardalas en fundas. Un sobre por categoría ayuda a encontrarlas rápido.</p>
    </div>
  </div>
  <p class="ficha-foot">Sección 7 · Tarjetas musicales</p>
</section>`;

  pages.forEach((cards, i) => {
    out += `
<section class="ficha-page grid-3 tarjetas-page">
  <header class="ficha-head"><h2>Tarjetas musicales</h2><p>Hoja ${i + 1} de ${pages.length} · imprimir en cartulina y recortar</p></header>
  <div class="ficha-grid">${cards.join('')}</div>
  <p class="ficha-foot">Sección 7 · Tarjetas musicales · Hoja ${i + 1}</p>
</section>`;
  });
  return out;
}
