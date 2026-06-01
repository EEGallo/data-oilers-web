# Master Prompt — Data Oilers v2.0
## Dirección 3D Cinemática + Design System

> Documento único que define el sistema visual completo de Data Oilers y un prompt accionable para generar la landing (o cualquier nueva página) manteniendo coherencia. Pegá la sección que necesites en Claude o Claude Code.

---

# PARTE 1 — DESIGN SYSTEM v2.0

## 1.1 Concepto

**Data Oilers = refinería de datos en el espacio profundo.** Combinamos tres referencias visuales:

- **Stargate / LayerZero brand book** — planetas, órbitas, curvas bezier, conexiones con flow
- **Dashboards isométricos chinos (Smart Data Center)** — núcleos 3D brillantes, plataformas apiladas
- **HUD cinemático (Blade Runner 2049, Foundation, The Expanse)** — brackets en L, readouts en mono, telemetría siempre visible

El resultado: una pieza que se siente como **interfaz de control de una refinería de datos espacial**. Profunda, técnica, viva.

---

## 1.2 Color tokens

```css
:root {
  /* surfaces — escala de profundidad */
  --bg-deep:   #03060E;    /* deep space — only for hero void & footer */
  --bg:        #06091A;    /* base de toda la app */
  --bg-2:      #0A0F22;    /* sección alternada */
  --bg-3:      #0E1530;    /* contact / CTA section */
  --surf:      #121C36;    /* hover de cards */
  --surf-hi:   #1A2748;    /* active state */

  /* borders */
  --border:    #1A2B47;    /* divisor base */
  --border-hi: #2D4470;    /* hover / active */

  /* texto */
  --text:      #E0EAF5;    /* texto principal */
  --white:     #FFFFFF;    /* highlights extremos */
  --muted:     #6B7E9E;    /* body / descripciones */
  --dim:       #3A4A6A;    /* captions / disabled */

  /* brand · aqua green */
  --aqua:      #0FFFA8;    /* acento principal */
  --aqua-2:    #5CFFC8;    /* highlight brillante */
  --aqua-sub:  #0AB880;    /* press / muted brand */
  --aqua-glow: rgba(15,255,168,.18);

  /* secondary · electric blue */
  --blue:      #4D7FFF;    /* acento secundario */
  --blue-dp:   #2952CC;    /* press */
  --blue-glow: rgba(77,127,255,.15);
}
```

**Reglas de uso:**
- El amber del v1.0 está deprecated — cero amber en este sistema.
- Aqua es la marca; usar como acento puntual, máximo 1 elemento aqua dominante por viewport.
- Blue es de soporte: estados de información, tipos de datos secundarios, contraste cromático.
- Los `glow` SIEMPRE acompañan al elemento brand (box-shadow, drop-shadow, radial-gradient).

---

## 1.3 Tipografía

```
Display     Barlow Condensed   700–900   títulos · hero · stats
Mono        JetBrains Mono     300–500   labels · readouts · IDs
Body        Barlow             300–500   párrafos · descripciones
```

Cargar vía Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;700;800;900&family=JetBrains+Mono:wght@300;400;500&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
```

🚫 Nunca: Inter · Roboto · Arial · Space Grotesk · Helvetica Neue

**Escala:**

| Token | Font | Weight | Size | Letter-spacing | Use |
|---|---|---|---|---|---|
| `display/hero` | Condensed | 900 | clamp(76px, 12vw, 168px) | -.012em | "DATA OILERS" |
| `display/section` | Condensed | 800 | clamp(40px, 5.5vw, 72px) | -.01em | section titles |
| `display/sub` | Condensed | 700 | 32px | .02em | service titles |
| `display/stat` | Condensed | 800 | 36px | -.01em | metrics |
| `body/lead` | Barlow | 300 | clamp(15px, 1.5vw, 19px) | 0 | tagline |
| `body/base` | Barlow | 400 | 14–16px | 0 | descripciones |
| `body/small` | Barlow | 400 | 13px | 0 | meta info |
| `mono/label` | JetBrains | 500 | 10–11px | .25–.32em | section labels |
| `mono/caption` | JetBrains | 500 | 9.5px | .22em | HUD readouts |
| `mono/tag` | JetBrains | 500 | 9px | .1–.2em | tags · codes |

---

## 1.4 Spacing scale

Sistema base 4px:
```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 80 · 100 · 120
```

- Section padding (desktop): **120px** vertical, **64px** horizontal
- Card padding: **40px / 36px**
- Gap entre cards: **16px**
- Gap interno de form fields: **18–20px**

---

## 1.5 Motion tokens

| Token | Duración | Easing | Uso |
|---|---|---|---|
| `motion/micro` | 200ms | ease | hover color shifts |
| `motion/short` | 250ms | cubic-bezier(.16,1,.3,1) | card lifts · borders |
| `motion/medium` | 700ms | ease | scroll reveals |
| `motion/entry` | 900ms | cubic-bezier(.16,1,.3,1) | hero orquestado |
| `motion/count` | 1400ms | linear | counters |
| `motion/marquee` | 28–32s | linear | loops infinitos |
| `motion/orbit` | 80–120s | linear | rotación de órbitas |
| `motion/iso` | 40s | linear | rotación del núcleo isométrico |
| `motion/float` | 6s | ease-in-out | flotación vertical |

**Keyframes core:**
```css
@keyframes do-up    { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
@keyframes iso-rotate { from{transform:rotateX(60deg) rotateZ(0);} to{transform:rotateX(60deg) rotateZ(360deg);} }
@keyframes iso-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
@keyframes core-pulse { 0%,100%{transform:scale(1);opacity:.95;} 50%{transform:scale(1.08);opacity:1;} }
@keyframes flow { from{stroke-dashoffset:0;} to{stroke-dashoffset:-100;} }
@keyframes ring-spin { from{transform:rotate(0);} to{transform:rotate(360deg);} }
@keyframes twinkle { 0%,100%{opacity:.3;} 50%{opacity:1;} }
@keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 var(--aqua-glow);} 50%{box-shadow:0 0 32px 8px var(--aqua-glow);} }
```

---

## 1.6 Componentes

### Logo

Hexagonal diamond (rotated square + diamond fill):
```jsx
<div style={{ width: 22, height: 22, position: 'relative' }}>
  <div style={{ position: 'absolute', inset: 0, border: '1.5px solid var(--aqua)', transform: 'rotate(45deg)', boxShadow: '0 0 10px var(--aqua-glow)' }}/>
  <div style={{ position: 'absolute', inset: 4, background: 'var(--aqua)', transform: 'rotate(45deg)' }}/>
</div>
```

### Bracket frames (HUD chrome)

L-shaped corners en cada container importante. Crítico para el feel cinemático:
```jsx
<Brackets size={14} thick={1} color="var(--aqua)" inset={0} />
// renders 4 L-shaped corners absolutely positioned
```

### Buttons

- **`btn/primary`** — borde aqua, fondo transparente, hover llena con aqua + glow + brackets diminutos en las esquinas
- **`btn/ghost`** — solo texto + flecha que se desplaza +5px en hover

NO usar fondo amber sólido (estilo v1.0). El primary ahora es **outlined con glow al hover** — más cinemático, menos industrial.

### Cards

Todas con:
- `border: 1px solid var(--border)` — pasa a `var(--aqua)` en hover
- `background: var(--bg-2)` → `var(--surf)` en hover
- `<Brackets>` en las esquinas internas (12-16px desde el borde)
- `box-shadow` en hover: `0 0 40px var(--aqua-glow), 0 24px 60px rgba(0,0,0,.4)`
- Header con código alfanumérico (`STR-01`, `INF-02`) en mono + label "service" a la derecha
- Footer con status indicator (`● operational`) + arrow icon

### Inputs

- `background: var(--bg-2)`
- `border: 1px solid var(--border)` → `var(--aqua)` en focus
- Sin background al focus (no se llena de aqua)

### Tags

```jsx
<span style={{
  fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '.1em',
  textTransform: 'uppercase', color: 'var(--muted)',
  border: '1px solid var(--border)', padding: '4px 9px',
}}>
```

En hover de la card padre: color a `var(--aqua)`, border a `rgba(15,255,168,.4)`.

---

## 1.7 Patterns clave

### Section header
```
/ XX                    ← number indicator (mono)
SECTION LABEL           ← uppercase, aqua, mono, .32em letter-spacing
Title de la sección     ← Barlow Condensed 800, 5.5vw
```

### HUD readouts (esquinas y márgenes)
```
SYS / ONLINE · ● LIVE · v.2.1
LAT –32.89° / LON –68.85° · MENDOZA
MSG_ID: ABC123
● transmitiendo
all systems operational ●
```

Estos son **vital** para el feel cinemático. Ponerlos en márgenes de hero, en headers de sección, en footer.

### Outlined hero text
Para el segundo verso del headline:
```css
WebkitTextStroke: 1.5px var(--aqua);
WebkitTextFillColor: transparent;
filter: drop-shadow(0 0 20px var(--aqua-glow));
```

### Bezier connections (red de servicios)
SVG path quadratic curve con dashes animadas:
```jsx
<path
  d={`M ${A.x} ${A.y} Q ${midX} ${midY-8} ${B.x} ${B.y}`}
  stroke="var(--aqua)" fill="none"
  strokeDasharray=".8 .4" strokeWidth=".25"
  vectorEffect="non-scaling-stroke"
  style={{ animation: 'flow 3s linear infinite' }}
/>
```

### Bracket data label
Cuando un dato necesita destacarse:
```jsx
<div style={{ background: 'rgba(6,9,26,.85)', border: '1px solid var(--aqua)', padding: '16px 24px', position: 'relative' }}>
  <Brackets color="var(--aqua)" size={8} inset={4} />
  <div className="mono-label">SELECTED · 02/04</div>
  <div className="display-sub">INFRAESTRUCTURA</div>
  <div className="body-base">descripción...</div>
</div>
```

---

## 1.8 Reglas (do's & don'ts)

**✓ Hacer**
1. Profundidad real con CSS 3D (`perspective`, `transform-style: preserve-3d`)
2. Glow con múltiples capas: `box-shadow` + `filter: drop-shadow` + `radial-gradient`
3. Brackets en L en TODA card o panel de información
4. Readouts numéricos/técnicos en márgenes (LAT/LON, IDs, timestamps)
5. Curvas bezier para conexiones, nunca líneas rectas en visualizaciones de red
6. Counters animados en cualquier número que hable de impacto

**✗ No hacer**
1. Amber, púrpura, gradientes Web3 con glassmorphism
2. Cards sin brackets — pierden el feel HUD
3. Líneas rectas para conexiones de datos (siempre bezier curves)
4. Saturar de aqua — pierde fuerza cuando está en todos lados
5. Inter, Roboto u otras fonts genéricas
6. Border-radius mayor a 2px (excepto círculos perfectos en orbits/nodos)

---

# PARTE 2 — PROMPT PARA LANDING PAGE

> Pegá esta sección directamente en Claude / Claude Code para generar la landing.

---

Crea un **artifact React** (single .jsx file, default export, zero props) para la landing oficial de **Data Oilers**, una consultora full-stack de datos e IA. Quiero una pieza que se sienta como **el panel de control de una refinería de datos espacial** — profundidad real, conexiones orbitales, núcleo 3D rotando, telemetría HUD constante.

## Estética

**Concepto**: Stargate brand book + dashboard isométrico chino + HUD cinemático (Blade Runner 2049 / The Expanse). Deep space + aqua green.

**Paleta** (CSS variables, usar exactos):
```
--bg-deep:#03060E  --bg:#06091A   --bg-2:#0A0F22  --bg-3:#0E1530
--surf:#121C36     --border:#1A2B47   --border-hi:#2D4470
--text:#E0EAF5     --muted:#6B7E9E    --dim:#3A4A6A
--aqua:#0FFFA8     --aqua-2:#5CFFC8   --aqua-sub:#0AB880
--blue:#4D7FFF     --blue-dp:#2952CC
--aqua-glow:rgba(15,255,168,.18)
```

**Fonts** (Google Fonts):
- Display: **Barlow Condensed** 700–900
- Mono: **JetBrains Mono** 300–500
- Body: **Barlow** 300–500

🚫 Cero amber. Cero Inter/Roboto/Space Grotesk. Cero glassmorphism púrpura.

---

## Estructura (en orden)

1. **Nav fixed** — transparente al inicio, opaca al scrollear, logo hexagonal aqua
2. **Hero** — full viewport, **starfield + órbitas + núcleo 3D isométrico** + headline brutal
3. **Metrics bar** — barra HUD con 4 contadores live animados
4. **Constellation** — visualización de red: 4 nodos conectados por curvas bezier punteadas, hover ilumina
5. **Servicios** — grid 2×2 de cards detalladas con brackets, codes y status
6. **Process Iso** — 4 plataformas isométricas 3D apiladas (CSS preserve-3d), hover eleva la capa
7. **Tech stack** — marquee infinito con brackets en hover
8. **Contact** — preguntas + form con feedback "Transmisión enviada · MSG_ID generado"
9. **Footer** — 4 columnas con status bar tipo dashboard

---

## ✨ ANIMACIONES CRÍTICAS (no escatimar)

### Starfield canvas (hero background)
- 3 capas de partículas a distintas "profundidades": layer-0 blanco tenue, layer-1 aqua, layer-2 azul
- Cada capa se mueve a velocidad distinta según mouse position (parallax)
- 240+ estrellas en total con twinkle (alpha sinusoidal)
- Estrellas brillantes (layer 1-2 con r > 1) tienen radial-gradient glow
- ResizeObserver, cleanup completo

### Órbitas SVG (hero background, sobre starfield)
- 3 elipses concéntricas rotando a velocidades distintas (80s, 100s, 120s)
- `strokeDasharray` punteado, `opacity` muy baja (.18–.25)
- 4 nodos brillantes posicionados sobre las órbitas con `<animate>` de opacity twinkle
- Algunos rotan en sentido contrario para crear riqueza visual

### Núcleo isométrico 3D (hero, derecha)
- Container con `perspective: 1400px` y `animation: iso-float 6s ease-in-out infinite`
- Inner con `transformStyle: preserve-3d` y `animation: iso-rotate 40s linear infinite` (rotateX 60deg + rotateZ 0→360)
- 4 anillos circulares apilados en distintos `translateZ` (-90, -30, +30, +90), los del medio con `box-shadow: 0 0 40px var(--aqua-glow)`
- 4 nodos en cada anillo, posicionados con `rotate(Xdeg) translateY(-radius)`
- 4 pilares verticales conectando con `linear-gradient(transparent, aqua, transparent)`
- **Cubo central** con 6 caras (`translateZ`/`rotateY`/`rotateX`) animado con `core-pulse` (scale 1↔1.08, opacity 0.95↔1)
- Mouse parallax leve (`translate(mx*8, my*8)`)
- 3 labels técnicos flotantes alrededor (`NODE_01: 23.089.700`, `STREAM: +8.5% MOM`)

### Constelación interactiva
- 4 nodos en posiciones no-grid (% absoluto)
- 5 conexiones bezier entre ellos (algunos cruzados)
- Hover en un nodo: las conexiones que tocan ese nodo cambian a `aqua` con `drop-shadow` glow, las demás siguen tenues
- Nodos: outer ring + inner dot, hover agranda 60→76px, agrega ring pulsante extra y brackets diminutos
- Panel inferior izquierdo se actualiza dinámicamente con el nodo seleccionado (`SELECTED · 02/04`)

### Process isométrico 3D
- Container con `perspective: 1500px`
- Inner con `transform: rotateX(60deg) rotateZ(35deg) translateZ(-50px)` y `transformStyle: preserve-3d`
- 4 plataformas 320×320px apiladas en `translateZ` distintos (-180, -120, -60, 0)
- Cada una con grid pattern background, brackets en esquinas, y core glow central
- Hover en items del lado izquierdo: la plataforma correspondiente se eleva +30px en Z y su border se vuelve aqua
- 4 pilares verticales transparentes-aqua-transparentes conectando vertical

### Hero entrada (orquestada)
- HUD top corners → 0.2s
- Eyebrow → 0.35s
- "DATA" → 0.5s
- "OILERS" outlined con drop-shadow glow → 0.62s
- Tagline → 0.8s
- CTAs → 1s
- Bottom bar → 1.3s

Todas con `do-up` keyframe (translateY 28px → 0, opacity 0 → 1, ease cubic-bezier(.16,1,.3,1)).

### Counters
- IntersectionObserver con threshold 0.12, disconnect después del trigger
- 60 steps en 1400ms, soportan decimales (`99.97`) y suffix (`%`, `PB`)
- Numero formateado con `toLocaleString()` para los grandes (`18.217`)

### Hovers
- Nav links: `muted → aqua` (era `text` en v1)
- CTA primary: rellena con aqua + box-shadow glow + brackets diminutos en esquinas
- Service cards: border base→aqua, bg bg-2→surf, glow shadow, brackets se intensifican
- Tech chips: brackets aparecen en hover

### Form feedback
- Submit reemplaza form con panel: border aqua, ícono check 64×64 con `pulse-glow` infinito, "TRANSMISIÓN ENVIADA · MSG_ID: ABC123" generado dinámicamente con `Date.now().toString(36).toUpperCase()`

---

## 📝 Contenido exacto

### Hero
- Eyebrow: `Full-Stack Data & AI Infrastructure`
- H1: `DATA` (sólido) / `OILERS` (outlined aqua con glow)
- HUD top-left: `SYS / ONLINE · ● LIVE · v.2.1`
- HUD top-right: `LAT –32.89° / LON –68.85° · MENDOZA`
- Tagline: `Tus datos no se oxidan. **Se perfeccionan.** Diseñamos, implementamos y operamos infraestructura de datos e inteligencia artificial productiva para tu negocio.`
- CTAs: `Explorar servicios` (primary outlined+glow) · `Hablar con el equipo` (ghost)
- Bottom: `info@dataoilers.com · ● transmitiendo` + `Scroll`

### Metrics bar
| label | value | suffix | live |
|---|---|---|---|
| Pipelines activos | 247 | — | ● |
| Eventos / segundo | 18217 | — | ● |
| Uptime | 99.97 | % | — |
| Petabytes procesados | 3.7 | PB | — |

### Constellation
- 4 nodos: Estrategia (22%, 30%) · Infraestructura (70%, 22%) · Ingeniería (78%, 65%) · Activación (30%, 75%)
- 5 edges: [0,1], [1,2], [2,3], [3,0], [0,2]

### Servicios (4 cards)
| Code | Título | Descripción | Tags |
|---|---|---|---|
| STR-01 | Estrategia de Datos | Hojas de ruta para transformar datos en activos estratégicos. Evaluamos madurez actual y trazamos el camino hacia decisiones data-driven reales. | Data Strategy · Roadmapping · Governance · Data Mesh |
| INF-02 | Infraestructura y Seguridad | Cloud nativa con foco en escalabilidad, eficiencia y cumplimiento normativo. Segura, observable y lista para crecer. | Google Cloud · Kubernetes · Terraform · DataOps |
| ENG-03 | Ingeniería de Datos | Automatizamos ingesta, transformación y modelado de datos con tecnologías modernas. Pipelines robustos, observabilidad de punta a punta. | dbt · Apache Airflow · Airbyte · BigQuery |
| ACT-04 | Activación de Datos | Convertimos datos procesados en productos de impacto: dashboards interactivos, aplicaciones internas, modelos ML e IA generativa. | Machine Learning · Gen AI · Dashboards · FastAPI |

Cada card: code (mono aqua) + label "service" (mono dim) en header · título condensed (whitespace pre-line para break) · descripción · tags · footer con `● operational` + arrow icon.

### Process Iso (4 capas)
| Code | Layer | Tagline |
|---|---|---|
| L01 | Estrategia | Definimos el norte |
| L02 | Infraestructura | Construimos la base |
| L03 | Ingeniería | Procesamos los datos |
| L04 | Activación | Generamos impacto |

### Tech stack (marquee)
Google Cloud · BigQuery · dbt · Apache Airflow · Airbyte · Kubernetes · Terraform · Python · FastAPI · GitHub · PostgreSQL · Looker

### Contact preguntas (sin signo de pregunta inicial — afirmaciones)
- Tenés los datos pero no sabés por dónde empezar.
- Querés llevar tu infraestructura al siguiente nivel.
- Querés que tus datos generen impacto hoy mismo.
- Querés automatizar procesos con IA.

### Footer
- Columna 1: logo + bio breve
- Columna 2: Servicios (Estrategia, Infraestructura, Ingeniería, Activación)
- Columna 3: Empresa (Sobre nosotros, Casos, Blog, Carreras)
- Columna 4: Contacto (info@dataoilers.com, Mendoza AR, Linkedin, GitHub)
- Status bar: `© 2025 Data Oilers · all systems operational ●` / `v.2.1 · BUILD 2026.04`

---

## ⚙️ Specs técnicas

- React functional component, **single .jsx, default export, zero props**
- Hooks: `useState`, `useEffect`, `useRef`
- Sin dependencias externas — fonts via `<link>` injection en `useEffect`
- `<style>` tag inyectado para keyframes globales
- **Prohibido**: `localStorage`, `sessionStorage`, browser storage APIs
- Responsive: media queries para `<900px` (collapse single column, hide HUD readouts laterales, núcleo isométrico se centra)
- **Importante**: nunca `useState` dentro de `.map()` — extraer a sub-componentes (ej: `CQuestion`, `SvcCard`, `TechChip`)
- Cleanup completo en cada `useEffect`: `cancelAnimationFrame`, `removeEventListener`, `observer.disconnect`
- Sin warnings de React

---

## 🎯 Resultado esperado

Una landing que se sienta como **el panel de control de una refinería espacial de datos**. Cada elemento responde con profundidad. Las conexiones cuentan una historia. La telemetría HUD nunca para. El núcleo isométrico es el corazón visual y debe robarse la atención al cargar.

Si tuviera que elegir entre **"más decoración"** o **"más pulido en lo que ya hay"** — siempre elegir pulido. Cada glow, cada bracket, cada label técnico tiene que sentirse intencional.

Reference visual: Stargate brand book · LayerZero docs · Smart Ecological Data Center dashboards · The Expanse cockpit UI.
