# Ilustraciones del kit — prompts

> **Nota (20/09/2026):** el kit ya se genera completo con íconos Twemoji (licencia comercial, sin costo). Este archivo queda como guía por si más adelante querés reemplazarlos por ilustraciones propias. No hace falta para lanzar.

Todo lo que hay que generar, con un **prompt de estilo fijo** que se repite en todas las imágenes y un **sujeto** que cambia. Los prompts están en inglés porque los generadores responden mejor; el nombre de archivo es lo que yo voy a usar para integrarlas.

## Cómo trabajar

1. Generá primero **una sola imagen** (te sugiero `instrumento-tambor`) y ajustá hasta que el estilo te guste. Esa imagen es la referencia de todo lo demás.
2. Con la referencia aprobada, generá el resto **en la misma sesión**, siempre con el mismo prompt de estilo. Si el generador lo permite, usá la imagen aprobada como referencia de estilo (Midjourney `--sref`, "same style as this image" en GPT/Gemini).
3. Guardá cada imagen como **PNG, 1024×1024 mínimo**, con el nombre de archivo indicado, en la carpeta que dice cada sección (dentro de `img/kit/`). Yo hago la conversión a WebP y la integración.
4. Regla de oro: **sin texto dentro de la imagen**. Todo el texto lo pongo yo en la maquetación.

## Prompt de estilo (se copia igual en todas)

```
Flat vector children's book illustration, soft rounded shapes, thick warm outlines,
warm limited palette: cream background (#FFF8F0), terracotta (#D4553A), honey yellow (#E8B24E),
leaf green (#5FA36A), cocoa brown (#4A3A32), subtle paper texture, friendly and playful,
clean and minimal, single centered subject with generous margins, plain flat background,
no text, no letters, no watermark, no border.
```

**Ajustes por herramienta**

- **Midjourney:** agregá al final `--ar 1:1 --style raw --no text,letters,watermark,border`. Después de aprobar la primera, agregá `--sref <URL de la imagen aprobada>` a todas las demás.
- **Ideogram:** estilo "Illustration", Magic Prompt **apagado**, 1:1.
- **GPT (ChatGPT) / Gemini (Nano Banana):** pegá el prompt de estilo + el sujeto. Para las siguientes, adjuntá la imagen aprobada y escribí "Same exact style, palette and line weight as the attached image. Subject: …".

**Prompt completo de ejemplo** (estilo + sujeto):

```
Flat vector children's book illustration, soft rounded shapes, thick warm outlines, warm limited palette: cream background (#FFF8F0), terracotta (#D4553A), honey yellow (#E8B24E), leaf green (#5FA36A), cocoa brown (#4A3A32), subtle paper texture, friendly and playful, clean and minimal, single centered subject with generous margins, plain flat background, no text, no letters, no watermark, no border. Subject: a small wooden hand drum with a light skin head, seen slightly from above.
```

---

## A. Tarjetas musicales (sección 7) — 40 imágenes · formato 1:1 · carpeta `img/kit/tarjetas/`

Un solo objeto centrado, fondo crema liso. Son las que más se ven: empezá por acá.

### A1. Instrumentos (para Detective de instrumentos E06, Director de orquesta C04)

| Archivo | Sujeto (agregar después de "Subject:") |
|---|---|
| `instrumento-tambor.png` | a small wooden hand drum with a light skin head, seen slightly from above |
| `instrumento-claves.png` | a pair of wooden claves (two smooth wooden sticks) crossed |
| `instrumento-maracas.png` | a pair of colorful maracas, terracotta and honey yellow |
| `instrumento-pandero.png` | a tambourine with small metal jingles |
| `instrumento-triangulo.png` | a metal triangle instrument with its small beater |
| `instrumento-xilofono.png` | a small children's xylophone with colored bars and two mallets |
| `instrumento-flauta.png` | a wooden recorder flute, diagonal |
| `instrumento-guitarra.png` | an acoustic guitar, warm wood |
| `instrumento-ukelele.png` | a small ukulele, honey colored |
| `instrumento-kazoo.png` | a small kazoo, terracotta |
| `instrumento-armonica.png` | a harmonica |
| `instrumento-violin.png` | a violin with its bow |
| `instrumento-trompeta.png` | a golden trumpet |
| `instrumento-piano.png` | a small upright piano, front view |
| `instrumento-campanita.png` | a small brass hand bell with a wooden handle |
| `instrumento-palo-de-lluvia.png` | a rainstick, a long decorated wooden tube with painted stripes |

### A2. Objetos sonoros (para La caja de los sonidos E01)

| Archivo | Sujeto |
|---|---|
| `objeto-llaves.png` | a ring of three house keys |
| `objeto-papel.png` | a crumpled sheet of crinkly cellophane paper |
| `objeto-cuchara-olla.png` | a small cooking pot with a wooden spoon resting on it |
| `objeto-sonajero.png` | a baby rattle |
| `objeto-botella-arroz.png` | a small clear plastic bottle half full of rice |
| `objeto-tapa.png` | a round metal pot lid with a knob |

### A3. Animales por altura (para ¿Grave o agudo? E04) — de grave a agudo

| Archivo | Sujeto |
|---|---|
| `animal-elefante.png` | a big friendly elephant, standing, side view |
| `animal-oso.png` | a friendly brown bear, standing |
| `animal-gato.png` | a cat sitting, calm |
| `animal-pajarito.png` | a tiny round songbird on a small branch |
| `animal-raton.png` | a tiny mouse, sitting up |

### A4. Tempo (para Tortuga y conejo C02)

| Archivo | Sujeto |
|---|---|
| `tempo-tortuga.png` | a slow smiling turtle walking, side view |
| `tempo-conejo.png` | a fast hopping rabbit, mid-jump, side view |

### A5. Dinámicas (para Susurro, voz, grito V04)

| Archivo | Sujeto |
|---|---|
| `dinamica-susurro.png` | a child's face in profile whispering behind a hand, with three tiny sound waves |
| `dinamica-normal.png` | a child's face in profile speaking normally, with medium sound waves |
| `dinamica-fuerte.png` | a child's face in profile shouting joyfully with a small megaphone, with big sound waves |

### A6. Emociones (para ¿Cómo suena mi emoción? M03)

| Archivo | Sujeto |
|---|---|
| `emocion-alegria.png` | a round child's face, big happy smile, eyes closed with joy, honey yellow background circle |
| `emocion-enojo.png` | a round child's face, angry frown, furrowed brows, terracotta background circle |
| `emocion-tristeza.png` | a round child's face, sad, a single tear, soft blue-gray background circle |
| `emocion-calma.png` | a round child's face, peaceful, gentle closed eyes and small smile, leaf green background circle |

### A7. Gestos de dirección (para Director de orquesta C04)

| Archivo | Sujeto |
|---|---|
| `gesto-empezar.png` | two open hands with palms up, moving outward, small motion lines |
| `gesto-parar.png` | one closed fist raised, firm, small motion lines |
| `gesto-fuerte.png` | two arms wide open, big gesture, with big sound waves |
| `gesto-suave.png` | two hands close together near the chest, palms down, gentle, with tiny sound waves |

### A8. Lluvia (para La lluvia que llega R01)

| Archivo | Sujeto |
|---|---|
| `lluvia-gota.png` | a single big terracotta raindrop |
| `lluvia-nube.png` | a soft round gray cloud |
| `lluvia-sol.png` | a smiling honey yellow sun |

---

## B. Portada y separadores de eje — 7 imágenes · formato 1:1 · carpeta `img/kit/portadas/`

Escenas con personajes. Mismo estilo, pero con **más elementos** y un fondo con un color suave plano (no crema). Los niños deben ser **diversos** (distintos tonos de piel y pelo), de 3 a 7 años, y sin rasgos de marca.

| Archivo | Sujeto |
|---|---|
| `portada-kit.png` | three diverse children (ages 3 to 7) and a smiling adult woman sitting in a circle on a rug, playing a drum, maracas and a xylophone, joyful, warm living-room feel, soft honey background |
| `eje-1-ritmo.png` | two children clapping hands together in rhythm, with small rhythmic dots floating around them, terracotta soft background |
| `eje-2-escucha.png` | a child with eyes closed and a hand cupped behind one ear, listening, with soft sound waves and tiny sound icons (a bird, a bell) around, soft blue background |
| `eje-3-voz.png` | three children singing together with open mouths, musical notes floating, soft pink background |
| `eje-4-cuerpo.png` | two children dancing with light flowing scarves, mid-movement, soft honey yellow background |
| `eje-5-instrumentos.png` | a child proudly shaking a homemade bottle maraca next to a tin-can drum, craft materials around, soft leaf green background |
| `eje-6-emociones.png` | an adult and a small child sitting close, the child hugging a small drum, calm and tender moment, soft lavender background |

---

## C. Partituras ilustradas (sección 9) — 10 imágenes · formato 1:1 · carpeta `img/kit/canciones/`

Una viñeta por canción, va en la esquina de la partitura. Un solo motivo, simple.

| Archivo | Canción | Sujeto |
|---|---|---|
| `cancion-arroz-con-leche.png` | Arroz con leche | a bowl of rice pudding with a cinnamon stick and a wooden spoon |
| `cancion-que-llueva.png` | Que llueva | a small old lady with an umbrella at the mouth of a cozy cave, rain falling |
| `cancion-paloma-blanca.png` | Estaba la paloma blanca | a white dove perched on a green lemon tree branch |
| `cancion-elefante-trompita.png` | El elefante trompita | a baby elephant with its trunk raised, playful |
| `cancion-martinillo.png` | Martinillo (canon) | a little bell tower with a ringing bell, morning sun |
| `cancion-hola-hola.png` | Hola, hola (original) | two children waving hello at each other, big smiles |
| `cancion-chau-chau.png` | Chau, chau (original) | a child waving goodbye from a doorway, warm |
| `cancion-llueve-llueve.png` | Llueve, llueve (original) | an open child's palm with three raindrops falling onto it |
| `cancion-pasa-la-pelota.png` | Pasa la pelota (original) | a soft ball passing between two small hands |
| `cancion-mantita.png` | Mantita (original) | a child lying peacefully under a blanket, eyes closed, a tiny shaker beside |

---

## D. Calendario musical anual (Bonus B) — 12 imágenes · formato 1:1 · carpeta `img/kit/calendario/`

Una por mes, calendario escolar argentino. Fondo con color suave plano.

| Archivo | Mes | Sujeto |
|---|---|---|
| `mes-03-marzo.png` | Marzo · vuelta a clases | a child with a backpack walking happily toward a small school door, autumn leaves starting |
| `mes-04-abril.png` | Abril · otoño | a child kicking through a pile of orange and brown fallen leaves |
| `mes-05-mayo.png` | Mayo · 25 de Mayo | a light blue and white rosette (escarapela) and a small colonial cabildo building, festive |
| `mes-06-junio.png` | Junio · Día de la Bandera / invierno | a light blue and white flag waving on a pole, a child in a scarf saluting it |
| `mes-07-julio.png` | Julio · vacaciones de invierno | a child wrapped in a blanket holding a mug of hot chocolate, a snowflake window |
| `mes-08-agosto.png` | Agosto · Día de las Infancias / viento | a child flying a colorful kite on a windy day |
| `mes-09-septiembre.png` | Septiembre · primavera / Día del Maestro | a child giving a bunch of spring flowers to a smiling teacher |
| `mes-10-octubre.png` | Octubre · Día de la Familia / Día de la Música | a family of four (two adults, two children) singing together around a guitar |
| `mes-11-noviembre.png` | Noviembre · Día de la Tradición | a gaucho child with a small guitar and a mate, a horse in the background |
| `mes-12-diciembre.png` | Diciembre · fin de año | children throwing confetti and playing instruments at an end-of-year celebration, string lights |
| `mes-01-enero.png` | Enero · verano | a child at the beach building a sandcastle with a small drum beside, sun and sea |
| `mes-02-febrero.png` | Febrero · carnaval | a child in a colorful carnival costume with a small drum and streamers |

---

## E. Juegos imprimibles (sección 8) — 5 imágenes · formato 1:1 · carpeta `img/kit/juegos/`

Los juegos los armo por código; solo necesitan una viñeta decorativa cada uno.

| Archivo | Juego | Sujeto |
|---|---|---|
| `juego-safari.png` | Safari sonoro | a child explorer with a safari hat and cardboard binoculars, listening |
| `juego-mapa-sonoro.png` | Mapa sonoro | a child sitting cross-legged with eyes closed, small sound symbols scattered around in a circle |
| `juego-nombres.png` | Nombres rítmicos | three children each holding a blank name card, clapping |
| `juego-semaforo.png` | Semáforo musical | a friendly traffic light with red, yellow and green lights, a child frozen like a statue beside it |
| `juego-etiquetas.png` | Etiquetas para mi instrumento | a homemade bottle maraca and a tin-can drum with a balloon head, decorated with stickers |

---

## Resumen

| Bloque | Cantidad | Prioridad |
|---|---|---|
| A. Tarjetas | 40 | **1** — es lo que más se ve y lo que más actividades usan |
| B. Portada y ejes | 7 | **2** — define la cara del kit |
| C. Canciones | 10 | 3 |
| D. Calendario | 12 | 3 |
| E. Juegos | 5 | 4 |
| **Total** | **74** | |

Cuando tengas el bloque A (o aunque sea la primera imagen aprobada), pasámelas y las integro. Si alguna no sale bien después de dos intentos, avisame: la reemplazo por una versión en SVG por código.
