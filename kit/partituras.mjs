// Sección 9 — Partituras ilustradas. Las melodías están en notación ABC y las dibuja abcjs
// dentro del navegador antes de paginar. Las 5 originales son composiciones del kit;
// «Martinillo» es de dominio público (Frère Jacques).
import { em } from './emoji.mjs';

export const CANCIONES = [
  {
    id: 'hola-hola', titulo: 'Hola, hola', tipo: 'Canción original · bienvenida', ico: '👋',
    usa: 'Canción de bienvenida (V01) · Canción con huecos (V03)', tempo: 'Alegre, ♩ = 100', caracter: 'Con energía, mirando a los chicos. En el verso de cada nombre, más lento.',
    abc: `X:1
T:Hola, hola
M:4/4
L:1/8
Q:1/4=100
K:C
"C"G2 E2 G2 E2 | "G7"G2 A2 G2 E2 | "C"G2 E2 G2 E2 | "G7"G G A A "C"G G E2 |
w: Ho-la, ho-la, ¿có-mo es-tán? Ho-la, ho-la, ya lle-gó la mú-si-ca.
"C"G2 E2 G2 E2 | "G7"G2 A2 G2 E2 | "F"E G A c "C"A2 G2 | "G7"D2 "C"C6 |]
w: Ho-la, ho-la, ¿có-mo es-tán? Va-mos a can-tar y~a ju-gar.`,
    letra: ['Hola, hola, ¿cómo están?', 'Hola, hola, ya llegó la música.', 'Hola, hola, ¿cómo están?', 'Vamos a cantar y a jugar.', '', 'Hola, Sofía, ¿cómo estás?', 'Hola, Sofía, qué bueno que llegaste.'],
    tips: ['Los dos primeros compases son sol–mi, el intervalo que los chicos cantan solos: por eso lo van a repetir enseguida.', 'Para el verso con nombre, cantá los primeros dos compases con «Hola, [nombre], ¿cómo estás?» y repetí con «qué bueno que llegaste».', 'Si acompañás con guitarra, alcanza con Do y Sol7. El Fa del compás 7 es opcional.'],
  },
  {
    id: 'chau-chau', titulo: 'Chau, chau', tipo: 'Canción original · despedida', ico: '👋',
    usa: 'Canción de despedida (M02)', tempo: 'Tranquila, ♩ = 84', caracter: 'Cada vez más suave. La última frase, casi en susurro.',
    abc: `X:2
T:Chau, chau
M:4/4
L:1/8
Q:1/4=84
K:C
"C"G4 E4 | E2 G G A G "G7"E2 | "C"G4 E4 | G A A G "G7"E2 D2 |
w: Chau, chau, la mú-si-ca se va, chau, chau, ma-ña-na vol-ve-rá.
"C"c c A A G G E2 | "F"c c A A "C"G2 E2 | "C"G2 E2 "G7"D4 | D D E E "G7"D D "C"C2 |]
w: Hoy to-ca-mos el tam-bor, hoy can-ta-mos tam-bién, chau, chau, chau, has-ta la pró-xi-ma vez.`,
    letra: ['Chau, chau, la música se va,', 'chau, chau, mañana volverá.', 'Hoy tocamos el tambor, hoy cantamos también,', 'chau, chau, chau, hasta la próxima vez.', '', 'Chau, Sofía, chau, chau,', 'hasta la próxima vez.'],
    tips: ['El verso «hoy tocamos el tambor» cambia cada vez según lo que hicieron: «hoy hicimos la lluvia», «hoy pasamos la pelota». Mantené el ritmo y cambiá las palabras.', 'Empieza igual que «Hola, hola» (sol–mi) a propósito: los chicos reconocen que es el mismo ritual, dado vuelta.', 'Bajá el volumen en cada compás. El «chau, chau, chau» del compás 7 puede ser solo gesto, sin voz.'],
  },
  {
    id: 'llueve-llueve', titulo: 'Llueve, llueve', tipo: 'Canción original · la lluvia', ico: '🌧️',
    usa: 'La lluvia que llega (R01)', tempo: 'Moderada, ♩ = 92', caracter: 'De muy suave a muy fuerte. Cada línea un poco más fuerte que la anterior.',
    abc: `X:3
T:Llueve, llueve
M:4/4
L:1/8
Q:1/4=92
K:C
"C"E2 G2 E2 G2 | G G A A "G7"G2 E2 | "C"E2 G2 E2 G2 | A A G G "G7"E2 "C"C2 |
w: Llue-ve, llue-ve, go-ti-ta~a go-ti-ta, llue-ve, llue-ve, so-bre mi ma-ni-to.
"C"G2 A2 G2 A2 | "F"A A c c "C"A2 G2 | "C"G2 A2 c2 c2 | "G7"c c d d "C"e2 c2 |]
w: Llue-ve, llue-ve, ca-da vez más fuer-te, llue-ve, llue-ve… ¡y lle-gó el true-no!`,
    letra: ['Llueve, llueve, gotita a gotita,', 'llueve, llueve, sobre mi manito.', 'Llueve, llueve, cada vez más fuerte,', 'llueve, llueve… ¡y llegó el trueno!'],
    tips: ['La primera mitad se mueve entre mi y sol (gotitas); la segunda sube a la y do (la lluvia crece). El cuerpo sigue lo mismo: dedos, palmas, pies.', 'En «¡y llegó el trueno!» hacé el golpe fuerte en el último do. Después, cantala entera al revés: de fuerte a susurro, para que se vaya la tormenta.', 'Con los más chiquitos, cantá solo la primera mitad. Es una canción completa en sí misma.'],
  },
  {
    id: 'pasa-la-pelota', titulo: 'Pasa la pelota', tipo: 'Canción original · pulso', ico: '⚽',
    usa: 'Pasar la pelota al pulso (R02)', tempo: 'Lenta y pareja, ♩ = 66', caracter: 'Cada negra es un pulso: la pelota cambia de mano en cada uno. No acelerar.',
    abc: `X:4
T:Pasa la pelota
M:4/4
L:1/8
Q:1/4=66
K:C
"C"C C E E G2 E2 | "G7"G G E E "C"C4 | "C"C C E E G2 E2 | "G7"G G A A G2 D2 |
w: Pa-sa la pe-lo-ta, pa-sa, pa-sa ya. Pa-sa la pe-lo-ta, ¿a quién le va~a lle-gar?
"C"C C E E G2 E2 | "G7"G G E E D4 | "C"C C E E G2 E2 | "G7"D D E E D2 "C"C2 |]
w: Pa-sa la pe-lo-ta, pa-sa sin pa-rar. Pa-sa la pe-lo-ta… ¡y~a-cá se va~a que-dar!`,
    letra: ['Pasa la pelota, pasa, pasa ya.', 'Pasa la pelota, ¿a quién le va a llegar?', 'Pasa la pelota, pasa sin parar.', 'Pasa la pelota… ¡y acá se va a quedar!'],
    tips: ['Es un do–mi–sol: la escala más simple. Lo importante no es la melodía sino el pulso, que tiene que ser de reloj.', 'Marcá cada negra con el pandero mientras cantás. Si la pelota se atrasa, no frenes: la canción sigue y la pelota alcanza.', 'En «¡y acá se va a quedar!» la pelota se queda con quien la tenga. Ese niño hace el sonido de cierre.'],
  },
  {
    id: 'mantita', titulo: 'Mantita', tipo: 'Canción original · calma', ico: '🌙',
    usa: 'La mantita de sonidos (M01) · cierre de cualquier encuentro', tempo: 'Muy lenta, ♩ = 66, en 3', caracter: 'En susurro cantado. Como una canción de cuna.',
    abc: `X:5
T:Mantita
M:3/4
L:1/4
Q:1/4=66
K:C
"C"G E E | G E E | "F"A G E | "G7"F E D |
w: Man-ti-ta, man-ti-ta, que lle-ga la cal-ma,
"C"G E E | G E E | "F"A G E | "G7"E D "C"C |
w: man-ti-ta, man-ti-ta, des-can-sa mi cuer-po.
"C"E G G | "F"A G E | "C"G F E | "G7"F E D |
w: Los so-ni-dos ca-en, des-pa-cio, des-pa-cio,
"C"E G G | "F"A G E | "G7"D E D | D "C"C2 |]
w: y yo me que-do quie-to, quie-to, quie-to.`,
    letra: ['Mantita, mantita, que llega la calma,', 'mantita, mantita, descansa mi cuerpo.', 'Los sonidos caen, despacio, despacio,', 'y yo me quedo quieto, quieto, quieto.', '', 'Mantita, mantita, descansa Tomás.'],
    tips: ['Está en 3/4, como las canciones de cuna: el balanceo ayuda a bajar. Podés mecer el shaker en cada primer tiempo.', 'Cambiá «mi cuerpo» por el nombre del niño: «descansa Tomás». Es un regalo, y a esta edad lo piden.', 'La última vuelta, sin letra: solo «mmm» con la melodía, cada vez más suave, hasta que se apaga.'],
  },
  {
    id: 'martinillo', titulo: 'Martinillo', tipo: 'Tradicional · canon a dos voces', ico: '🔔',
    usa: 'Canon sencillo (V06)', tempo: 'Moderada, ♩ = 100', caracter: 'La segunda voz entra cuando la primera termina el primer sistema (compás 3).',
    abc: `X:6
T:Martinillo
M:4/4
L:1/4
Q:1/4=100
K:C
"C"C D E C | C D E C | E F G2 | E F G2 |
w: Mar-ti-ni-llo, Mar-ti-ni-llo, ¿dón-de~es-tás? ¿dón-de~es-tás?
"C"G/A/ G/F/ E C | G/A/ G/F/ E C | C "G7"G, "C"C2 | C "G7"G, "C"C2 |]
w: To-ca la cam-pa-na, to-ca la cam-pa-na, din, don, dan; din, don, dan.`,
    letra: ['Martinillo, Martinillo,', '¿dónde estás? ¿dónde estás?', 'Toca la campana, toca la campana,', 'din, don, dan; din, don, dan.'],
    tips: ['Cuatro frases de dos compases. El canon funciona porque cada frase «encaja» armónicamente con la siguiente: cuando el grupo B canta la frase 1, el grupo A está en la frase 2.', 'Marcá con los dedos en qué frase están (1, 2, 3, 4) las primeras veces. Después, solos.', 'El «din, don, dan» final del segundo grupo queda solo: es la prueba de que sostuvieron la voz.'],
  },
];

// Canciones tradicionales para «Canción con huecos» (V03): letra con las palabras del hueco marcadas
const TRADICIONALES = [
  { titulo: 'Arroz con leche', letra: 'Arroz con leche, me quiero **casar**, / con una señorita de San **Nicolás**, / que sepa coser, que sepa **bordar**, / que sepa abrir la puerta para ir a **jugar**.' },
  { titulo: 'Que llueva', letra: 'Que llueva, que llueva, la vieja está en la **cueva**, / los pajaritos cantan, las nubes se **levantan**, / ¡que sí!, ¡que no!, que caiga un **chaparrón**.' },
  { titulo: 'Aserrín, aserrán', letra: 'Aserrín, aserrán, los maderos de San **Juan**, / piden pan, no les **dan**, / piden queso, les dan **hueso**, / y les cortan el **pescuezo**.' },
  { titulo: 'Estaba la paloma blanca', letra: 'Estaba la paloma **blanca** / sentada en el verde **limón**, / con el pico cortaba la **rama**, / con la rama cortaba la **flor**.' },
  { titulo: 'Arrorró mi niño', letra: 'Arrorró mi niño, arrorró mi **sol**, / arrorró pedazo de mi **corazón**. / Este niño lindo se quiere **dormir**, / y el pícaro sueño no quiere **venir**.' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function cancionPage(c, i) {
  return `
<section class="ficha-page cancion" id="cancion-${c.id}">
  <header class="ficha-head"><h2>${c.titulo}</h2><p>${c.tipo}</p></header>
  <div class="cancion-top">
    <div class="cancion-ico">${em(c.ico, 'fig')}</div>
    <div class="cancion-meta">
      <p><b>Se usa en</b>${c.usa}</p>
      <p><b>Tempo</b>${c.tempo}</p>
      <p><b>Carácter</b>${c.caracter}</p>
    </div>
  </div>
  <div class="abc" data-abc="${esc(c.abc).replace(/"/g, '&quot;')}"></div>
  <div class="cancion-bottom">
    <div class="cancion-letra"><b>Letra</b>${c.letra.map((l) => l ? `<p>${l}</p>` : '<p class="sep"></p>').join('')}</div>
    <div class="cancion-tips"><b>Cómo cantarla</b><ul>${c.tips.map((t) => `<li>${t}</li>`).join('')}</ul></div>
  </div>
  <p class="ficha-foot">Sección 9 · Partituras ilustradas · ${i + 1} de ${CANCIONES.length}</p>
</section>`;
}

export function seccionPartiturasHtml() {
  const rows = CANCIONES.map((c) => `<li><a href="#cancion-${c.id}"><span class="code">${em(c.ico)}</span><span class="t"><b>${c.titulo}</b><small>${c.tipo} · ${c.usa}</small></span></a></li>`).join('');
  return `
<section class="divider" id="partituras" style="--eje:oklch(60% .17 345)">
  <span class="bignum">9</span>
  <div class="divider-inner">
    <span class="ico-circle">🎼</span>
    <p class="kicker">Sección 9</p>
    <h1>Partituras ilustradas</h1>
    <p class="desc">Las cinco canciones originales del kit y un canon tradicional, escritas para principiantes: melodía simple, letra debajo de cada nota y acordes para guitarra o teclado. Más las letras de cinco canciones tradicionales con los huecos marcados.</p>
    <ul class="divider-list">${rows}</ul>
  </div>
</section>

<section class="ficha-page intro" id="partituras-intro">
  <header class="ficha-head"><h2>Cómo leer estas partituras</h2><p>Para quien nunca leyó música</p></header>
  <div class="ficha-intro">
    <div>
      <h3>No hace falta saber leer</h3>
      <p>Cada partitura tiene la <b>letra debajo de las notas</b>: si sabés cómo suena la canción, la partitura solo te recuerda qué sílaba va en cada nota. Y todas las melodías usan pocas notas y saltos chicos, para que se aprendan de oído en dos o tres vueltas.</p>
      <h3>Qué es cada cosa</h3>
      <p><b>Las cinco líneas</b> son el pentagrama. Cuanto más arriba está la nota, más aguda suena (como en «¿Grave o agudo?», E04).</p>
      <p><b>Las figuras</b> son las mismas de las fichas de ritmo (Bonus C): negra = «ta», dos corcheas = «ti-ti», blanca = «ta-a». Si ya jugaron al tren de los ritmos, ya saben leer el ritmo de estas canciones.</p>
      <p><b>Las letras arriba</b> (C, G7, F) son los acordes para guitarra, ukelele o teclado. Con Do (C) y Sol séptima (G7) se acompañan todas las canciones del kit; el Fa (F) es opcional.</p>
    </div>
    <div>
      <h3>Cómo aprenderlas</h3>
      <p>1. Leé la letra en voz alta, con ritmo, palmeando las sílabas. 2. Cantá la primera frase siguiendo las notas con el dedo. 3. Repetí hasta que salga sin mirar. 4. Recién ahí, agregá el acompañamiento.</p>
      <h3>Las notas por su nombre</h3>
      <p>Todas las canciones están en Do mayor. De grave a agudo: <b>do – re – mi – fa – sol – la – si – do</b>. «Hola, hola» y «Chau, chau» empiezan en <b>sol–mi</b>, el intervalo que los chicos cantan espontáneamente cuando se llaman.</p>
      <h3>Los huecos</h3>
      <p>En la última página hay cinco canciones tradicionales con las palabras del hueco en <b>negrita</b>: son las que el adulto calla para que los chicos completen (V03). No llevan partitura porque todos las conocen; si querés el pentagrama de alguna, usá la partitura en blanco (Sección 8) y escribila con las figuras de las fichas.</p>
    </div>
  </div>
  <p class="ficha-foot">Sección 9 · Partituras ilustradas</p>
</section>
${CANCIONES.map(cancionPage).join('')}
<section class="ficha-page trad" id="partituras-tradicionales">
  <header class="ficha-head"><h2>Canciones tradicionales con huecos</h2><p>Para Canción con huecos (V03) · dominio público</p></header>
  <p class="juego-hint">Cantá la canción completa dos veces. Después, callate justo antes de cada palabra en <b>negrita</b> y esperá con cara de «¿y…?». Empezá con un hueco por verso; después, dos; después, la frase entera.</p>
  <div class="trad-grid">${TRADICIONALES.map((t) => `<div class="trad-card"><b>${t.titulo}</b>${t.letra.split(' / ').map((l) => `<p>${l.replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>')}</p>`).join('')}</div>`).join('')}
    <div class="trad-card blank"><b>Tu canción</b><p>Escribí acá la canción que más cante tu grupo y marcá los huecos.</p>${'<div class="wline"></div>'.repeat(5)}</div>
  </div>
  <p class="ficha-foot">Sección 9 · Partituras ilustradas</p>
</section>`;
}
