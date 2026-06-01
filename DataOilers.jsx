import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS v2.0 — deep space refinery + aqua green
═══════════════════════════════════════════════════════ */
const C = {
  bgDeep: '#0A0A0C', bg: '#101012', bg2: '#161619', bg3: '#1C1C20',
  surf: '#232328', surfHi: '#2C2C32',
  border: '#28282E', borderHi: '#3C3C44',
  text: '#E8E8EC', white: '#FFFFFF', muted: '#8A8C94', dim: '#4A4A52',
  aqua: '#0FFFA8', aqua2: '#5CFFC8', aquaSub: '#0AB880',
  aquaGlow: 'rgba(15,255,168,.18)',
  blue: '#4D7FFF', blueDp: '#2952CC', blueGlow: 'rgba(77,127,255,.15)',
};
const fd = '"Barlow Condensed", sans-serif';
const fm = '"JetBrains Mono", monospace';
const fb = '"Barlow", sans-serif';

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES + FONTS
═══════════════════════════════════════════════════════ */
function useGlobalStyles() {
  useEffect(() => {
    if (document.getElementById('do-styles')) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;700;800;900&family=JetBrains+Mono:wght@300;400;500&family=Barlow:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);

    const s = document.createElement('style');
    s.id = 'do-styles';
    s.textContent = `
      @keyframes do-up      { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
      @keyframes flow       { from{stroke-dashoffset:0;} to{stroke-dashoffset:-100;} }
      @keyframes do-spin    { to{transform:rotate(360deg);} }
      @keyframes twinkle    { 0%,100%{opacity:.3;} 50%{opacity:1;} }
      @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 ${C.aquaGlow};} 50%{box-shadow:0 0 32px 8px ${C.aquaGlow};} }
      @keyframes scroll-pulse { 0%,100%{opacity:.3;transform:scaleY(1);} 50%{opacity:1;transform:scaleY(1.18);} }
      *{box-sizing:border-box;} a{cursor:pointer;}
      html{scroll-behavior:smooth;scroll-padding-top:72px;}
      @media (prefers-reduced-motion:reduce){ html{scroll-behavior:auto;} }
      ::selection{background:${C.aqua};color:${C.bgDeep};}
      @media (max-width:900px){
        .do-grid2 { grid-template-columns:1fr !important; }
        .do-pad   { padding-left:24px !important; padding-right:24px !important; }
        .do-hide-mobile { display:none !important; }
        .do-iso-center { margin:0 auto !important; }
      }
    `;
    document.head.appendChild(s);
  }, []);
}

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useCounter(target, active, ms = 1400, steps = 60) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const n = parseFloat(target);
    if (isNaN(n)) { setVal(target); return; }
    const decimals = (String(target).split('.')[1] || '').length;
    let cur = 0, i = 0;
    const iv = setInterval(() => {
      i++; cur = (n / steps) * i;
      if (i >= steps) { setVal(n); clearInterval(iv); }
      else setVal(decimals ? parseFloat(cur.toFixed(decimals)) : Math.floor(cur));
    }, ms / steps);
    return () => clearInterval(iv);
  }, [active, target]);
  return val;
}

/* ═══════════════════════════════════════════════════════
   BRACKETS — L-shaped HUD corners
═══════════════════════════════════════════════════════ */
function Brackets({ size = 14, thick = 1, color = C.aqua, inset = 0, opacity = 1 }) {
  const base = { position: 'absolute', width: size, height: size, opacity, pointerEvents: 'none', transition: 'opacity .25s, border-color .25s' };
  return (
    <>
      <span style={{ ...base, top: inset, left: inset, borderTop: `${thick}px solid ${color}`, borderLeft: `${thick}px solid ${color}` }} />
      <span style={{ ...base, top: inset, right: inset, borderTop: `${thick}px solid ${color}`, borderRight: `${thick}px solid ${color}` }} />
      <span style={{ ...base, bottom: inset, left: inset, borderBottom: `${thick}px solid ${color}`, borderLeft: `${thick}px solid ${color}` }} />
      <span style={{ ...base, bottom: inset, right: inset, borderBottom: `${thick}px solid ${color}`, borderRight: `${thick}px solid ${color}` }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════ */
function Logo({ size = 22 }) {
  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, border: `1.5px solid ${C.aqua}`, transform: 'rotate(45deg)', boxShadow: `0 0 10px ${C.aquaGlow}` }} />
      <div style={{ position: 'absolute', inset: size * 0.18, background: C.aqua, transform: 'rotate(45deg)' }} />
    </div>
  );
}

function SectionHeader({ num, label, title, style: s }) {
  return (
    <div style={s}>
      <div style={{ fontFamily: fm, fontSize: 11, color: C.dim, letterSpacing: '.2em', marginBottom: 10 }}>/ {num}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fm, fontSize: 10.5, letterSpacing: '.32em', textTransform: 'uppercase', color: C.aqua, marginBottom: 18 }}>
        <span style={{ display: 'block', width: 28, height: 1, background: C.aqua }} />
        {label}
      </div>
      <h2 style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(40px,5.5vw,72px)', lineHeight: .92, textTransform: 'uppercase', letterSpacing: '-.01em', color: C.text, margin: 0 }}>{title}</h2>
    </div>
  );
}

function BtnPrimary({ href, children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10,
        fontFamily: fm, fontSize: 11, fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase',
        color: h ? C.bgDeep : C.aqua, background: h ? C.aqua : 'transparent',
        border: `1px solid ${C.aqua}`, textDecoration: 'none', padding: '16px 34px',
        boxShadow: h ? `0 0 32px ${C.aquaGlow}` : 'none', transition: 'all .25s', cursor: 'pointer',
      }}>
      {h && <Brackets size={7} inset={3} color={C.bgDeep} />}
      {children}
    </a>
  );
}

function BtnGhost({ href, children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: fm, fontSize: 11, fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase', color: h ? C.aqua : C.muted, textDecoration: 'none', transition: 'color .2s' }}>
      {children}
      <svg width="15" height="15" fill="none" viewBox="0 0 15 15" style={{ transform: h ? 'translateX(5px)' : 'none', transition: 'transform .25s' }}>
        <path d="M2 7.5h11M8.5 3l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   DATA HELIX — extended double helix (two clear spiral ribbons)
   with EXPLODED-UI glyphs scattered around the strands, a drifting
   particle plexus, floating HUD shards + dust. Full-bleed hero bg.
═══════════════════════════════════════════════════════ */
const HX_GLYPHS = '01<>/+·×{}[]=:01';
const hx = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); }; // stable 0..1

function DataHelix() {
  const canvasRef = useRef(null);
  const raf = useRef(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const t = useRef(0);
  const S = useRef({ W: 0, H: 0, plexus: [], dust: [], shards: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const d = S.current;
    const AQUA = '15,255,168', BLUE = '77,127,255', PALE = '92,255,200';

    function build() {
      d.W = canvas.width = canvas.offsetWidth;
      d.H = canvas.height = canvas.offsetHeight;
      // plexus network
      d.plexus = [];
      const N = Math.min(Math.round((d.W * d.H) / 24000), 90);
      for (let i = 0; i < N; i++) {
        d.plexus.push({ x: Math.random() * d.W, y: Math.random() * d.H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: .6 + Math.random() * 1.4, blue: Math.random() < .32 });
      }
      // background dust
      d.dust = [];
      for (let i = 0; i < 80; i++) d.dust.push({ x: Math.random() * d.W, y: Math.random() * d.H, z: Math.random(), r: .4 + Math.random() * 1.1, ph: Math.random() * Math.PI * 2 });
      // exploded-UI shards (disassembled fragments drifting outward from center band)
      d.shards = [];
      for (let i = 0; i < 48; i++) {
        const ang = hx(i * 2.3) * Math.PI * 2;
        d.shards.push({
          x: d.W * 0.5 + (hx(i) - .5) * d.W * .85, y: d.H * 0.5 + (hx(i * 3.1) - .5) * d.H * .85,
          vx: Math.cos(ang) * (.16 + hx(i * 5) * .28), vy: Math.sin(ang) * (.16 + hx(i * 7) * .28),
          z: hx(i * 9), rot: hx(i * 11) * Math.PI, vr: (hx(i * 13) - .5) * .004,
          type: Math.floor(hx(i * 17) * 4), blue: hx(i * 19) < .3, s: 6 + hx(i * 23) * 12,
        });
      }
    }

    function helixPoints() {
      const cx = d.W * 0.5, cy = d.H * 0.5;
      const len = Math.hypot(d.W, d.H) * 0.98;     // extended: spans beyond edges
      const ang = -Math.PI / 6;                    // axis tilt bottom-left → top-right
      const ax = Math.cos(ang), ay = Math.sin(ang);
      const px = -ay, py = ax;
      const R = Math.min(d.W, d.H) * 0.2;          // wider helix radius
      const N = 96, pts = [];
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1) - 0.5;
        const bx = cx + ax * (u * len), by = cy + ay * (u * len);
        const theta = u * Math.PI * 9 + t.current * 0.8;   // more turns
        for (let strand = 0; strand < 2; strand++) {
          const a = theta + strand * Math.PI;
          pts.push({ hxp: bx + px * Math.cos(a) * R, hyp: by + py * Math.cos(a) * R, z: Math.sin(a), strand, i });
        }
      }
      return { pts, N };
    }

    function shard(ctx, sh, x, y, rgb, alpha) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(sh.rot);
      ctx.strokeStyle = `rgba(${rgb},${alpha})`; ctx.fillStyle = `rgba(${rgb},${alpha})`; ctx.lineWidth = 1;
      const s = sh.s;
      if (sh.type === 0) { ctx.beginPath(); ctx.moveTo(-s / 2, -s / 2 + s / 3); ctx.lineTo(-s / 2, -s / 2); ctx.lineTo(-s / 2 + s / 3, -s / 2); ctx.stroke(); } // bracket corner
      else if (sh.type === 1) { ctx.fillRect(-s / 2, -1, s, 2); }                                                                                          // bar
      else if (sh.type === 2) { ctx.strokeRect(-s / 2, -s / 2, s, s); }                                                                                    // square
      else { ctx.beginPath(); ctx.moveTo(-s / 2, 0); ctx.lineTo(s / 2, 0); ctx.moveTo(0, -s / 2); ctx.lineTo(0, s / 2); ctx.stroke(); }                     // crosshair
      ctx.restore();
    }

    function tick() {
      t.current += 0.006;
      ctx.clearRect(0, 0, d.W, d.H);
      mouse.current.x += (mouse.current.tx - mouse.current.x) * .06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * .06;
      const mpx = mouse.current.x - d.W / 2, mpy = mouse.current.y - d.H / 2;

      // ── floating particle nodes (no links — exploded, lineless) ──
      d.plexus.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > d.W) n.vx *= -1; if (n.y < 0 || n.y > d.H) n.vy *= -1;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${n.blue ? BLUE : AQUA},.5)`; ctx.fill();
      });

      // ── dust (parallax) ──
      d.dust.forEach(p => {
        const par = (p.z * 2 - 1) * 18, x = p.x - (mpx / d.W) * par, y = p.y - (mpy / d.H) * par;
        const tw = .3 + .7 * (0.5 + 0.5 * Math.sin(t.current * 2 + p.ph));
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${AQUA},${tw * .3})`; ctx.fill();
      });

      const hsx = (mpx / d.W) * 30, hsy = (mpy / d.H) * 30;

      // ── exploded-UI shards (drift outward, wrap back to center band) ──
      d.shards.forEach(sh => {
        sh.x += sh.vx * (.4 + sh.z); sh.y += sh.vy * (.4 + sh.z); sh.rot += sh.vr;
        const m = 60;
        if (sh.x < -m || sh.x > d.W + m || sh.y < -m || sh.y > d.H + m) {
          sh.x = d.W * 0.5 + (hx(sh.rot * 31) - .5) * 120; sh.y = d.H * 0.5 + (hx(sh.rot * 17) - .5) * 120;
        }
        const par = sh.z * 24;
        shard(ctx, sh, sh.x - (mpx / d.W) * par, sh.y - (mpy / d.H) * par, sh.blue ? BLUE : AQUA, .1 + sh.z * .25);
      });

      // ── helix glyph cloud (no lines — pure exploded scatter) ──
      const { pts } = helixPoints();
      const sorted = pts.slice().sort((p, q) => p.z - q.z);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      sorted.forEach(p => {
        const depth = (p.z + 1) / 2;                  // 0 far .. 1 near
        const seed = p.i * 2 + p.strand;
        // exploded dispersion: scatter glyph off the ribbon, breathing in/out
        const dAng = hx(seed * 3.7) * Math.PI * 2;
        const breathe = .35 + .65 * (0.5 + 0.5 * Math.sin(t.current * 0.6 + p.i * 0.25 + p.strand));
        const dMag = (10 + hx(seed * 5.3) * 88) * (0.5 + depth) * breathe;
        const x = p.hxp + hsx + Math.cos(dAng) * dMag;
        const y = p.hyp + hsy + Math.sin(dAng) * dMag;
        const size = 7 + depth * 14;
        const rgb = p.strand === 0 ? AQUA : (hx(seed) < .25 ? BLUE : PALE);
        ctx.font = `${size}px "JetBrains Mono", monospace`;
        if (depth > .6) { ctx.shadowColor = `rgba(${rgb},.9)`; ctx.shadowBlur = depth * 12; } else ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${rgb},${.12 + depth * .82})`;
        ctx.fillText(HX_GLYPHS[Math.floor(hx(seed * 9.1) * HX_GLYPHS.length)], x, y);
      });
      ctx.shadowBlur = 0;

      raf.current = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(build);
    ro.observe(canvas.parentElement);
    build(); tick();

    const onMouse = e => { mouse.current.tx = e.clientX; mouse.current.ty = e.clientY; };
    window.addEventListener('mousemove', onMouse);
    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════ */
function NavLink({ label, href }) {
  const [h, setH] = useState(false);
  return <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ fontFamily: fm, fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: h ? C.aqua : C.muted, textDecoration: 'none', transition: 'color .2s' }}>{label}</a>;
}
function Nav() {
  const [sc, setSc] = useState(false);
  const [h, setH] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [['Servicios', '#servicios'], ['Red', '#red'], ['Proceso', '#proceso'], ['Stack', '#stack'], ['Contacto', '#contacto']];
  return (
    <nav className="do-pad" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px', background: sc ? 'rgba(16,16,18,.96)' : 'rgba(16,16,18,.55)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${sc ? C.border : 'transparent'}`, zIndex: 1000, transition: 'all .3s' }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
        <Logo size={22} />
        <span style={{ fontFamily: fd, fontWeight: 800, fontSize: 17, letterSpacing: '.14em', textTransform: 'uppercase', color: C.text }}>
          Data <span style={{ color: C.aqua }}>Oilers</span>
        </span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <div className="do-hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {links.map(([l, hr]) => <NavLink key={l} label={l} href={hr} />)}
        </div>
        <a href="#contacto" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
          style={{ fontFamily: fm, fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: h ? C.bgDeep : C.aqua, textDecoration: 'none', border: `1px solid ${C.aqua}`, padding: '9px 22px', background: h ? C.aqua : 'transparent', boxShadow: h ? `0 0 24px ${C.aquaGlow}` : 'none', transition: 'all .2s' }}>
          Hablar
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  const anim = (delay) => ({ animation: `do-up .9s cubic-bezier(.16,1,.3,1) forwards ${delay}s`, opacity: 0 });
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: C.bgDeep }}>
      <DataHelix />
      {/* legibility: darken left (text) + vignette + bottom fade */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(to right, ${C.bgDeep} 0%, rgba(10,10,12,.6) 38%, transparent 70%)` }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, ${C.bgDeep} 100%)` }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, background: `linear-gradient(to bottom, transparent, ${C.bg})`, pointerEvents: 'none' }} />

      {/* HUD top readouts */}
      <div className="do-pad do-hide-mobile" style={{ position: 'absolute', top: 88, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 64px', zIndex: 10, fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.dim }}>
        <span>SYS / ONLINE · <span style={{ color: C.aqua }}>● LIVE</span> · v.2.1</span>
        <span>LAT –32.89° / LON –68.85° · MENDOZA</span>
      </div>

      {/* content */}
      <div className="do-pad" style={{ position: 'relative', zIndex: 10, maxWidth: 1400, width: '100%', margin: '0 auto', padding: '120px 64px 80px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 40 }}>
        <div style={{ maxWidth: 620 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: fm, fontSize: 10.5, letterSpacing: '.32em', textTransform: 'uppercase', color: C.aqua, marginBottom: 22, ...anim(.35) }}>
            <span style={{ width: 36, height: 1, background: C.aqua, display: 'block', flexShrink: 0 }} />
            Full-Stack Data &amp; AI Infrastructure
          </div>

          <h1 style={{ fontFamily: fd, fontWeight: 900, fontSize: 'clamp(76px,12vw,168px)', lineHeight: .86, letterSpacing: '-.012em', textTransform: 'uppercase', color: C.text, margin: 0, ...anim(.5) }}>
            Data
          </h1>
          <span style={{ display: 'block', fontFamily: fd, fontWeight: 900, fontSize: 'clamp(76px,12vw,168px)', lineHeight: .86, letterSpacing: '-.012em', textTransform: 'uppercase', WebkitTextStroke: `1.5px ${C.aqua}`, WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 0 20px ${C.aquaGlow})`, marginBottom: 40, ...anim(.62) }}>
            Oilers
          </span>

          <p style={{ fontFamily: fb, fontSize: 'clamp(15px,1.5vw,19px)', fontWeight: 300, lineHeight: 1.7, color: C.muted, maxWidth: 520, marginBottom: 48, ...anim(.8) }}>
            Tus datos no se oxidan. <strong style={{ color: C.text, fontWeight: 500 }}>Se perfeccionan.</strong> Diseñamos, implementamos y operamos infraestructura de datos e inteligencia artificial productiva para tu negocio.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', ...anim(1) }}>
            <BtnPrimary href="#servicios">
              Explorar servicios
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 7h10M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </BtnPrimary>
            <BtnGhost href="#contacto">Hablar con el equipo</BtnGhost>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="do-pad" style={{ position: 'absolute', bottom: 30, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 64px', zIndex: 10, ...anim(1.3) }}>
        <span style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: C.dim }}>
          info@dataoilers.com · <span style={{ color: C.aqua }}>● transmitiendo</span>
        </span>
        <div className="do-hide-mobile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom,transparent,${C.aqua})`, animation: 'scroll-pulse 2.2s ease-in-out infinite' }} />
          <span style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: C.aqua, writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   METRICS BAR — live HUD counters
═══════════════════════════════════════════════════════ */
const METRICS = [
  { label: 'Pipelines activos', value: '247', suffix: '', live: true },
  { label: 'Eventos / segundo', value: '18217', suffix: '', live: true },
  { label: 'Uptime', value: '99.97', suffix: '%', live: false },
  { label: 'Petabytes procesados', value: '3.7', suffix: 'PB', live: false },
];
function Metric({ m, vis }) {
  const count = useCounter(m.value, vis);
  const display = typeof count === 'number'
    ? (count >= 1000 ? count.toLocaleString('es-AR') : count) + (m.suffix ? ' ' + m.suffix : '')
    : count;
  return (
    <div style={{ position: 'relative', padding: '32px 32px', flex: 1, minWidth: 200 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.muted, marginBottom: 14 }}>
        {m.live && <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 8px ${C.aqua}`, animation: 'twinkle 2s ease-in-out infinite' }} />}
        {m.label}
      </div>
      <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1, letterSpacing: '-.01em', color: C.aqua }}>{display}</div>
    </div>
  );
}
function MetricsBar() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="do-pad" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '0 64px' }}>
      <div className="do-grid2" style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ flex: 1, minWidth: 220, borderLeft: i > 0 ? `1px solid ${C.border}` : 'none' }}>
            <Metric m={m} vis={vis} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONSTELLATION — interactive bezier network
═══════════════════════════════════════════════════════ */
const NODES = [
  { id: 0, label: 'Estrategia', code: 'STR', x: 22, y: 30 },
  { id: 1, label: 'Infraestructura', code: 'INF', x: 70, y: 22 },
  { id: 2, label: 'Ingeniería', code: 'ENG', x: 78, y: 65 },
  { id: 3, label: 'Activación', code: 'ACT', x: 30, y: 75 },
];
const EDGES = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]];
const NODE_DESC = [
  'Hojas de ruta hacia decisiones data-driven.',
  'Cloud nativa, segura, observable y escalable.',
  'Pipelines robustos con observabilidad end-to-end.',
  'Productos de datos: dashboards, ML e IA generativa.',
];
function ConstNode({ n, active, onEnter, onLeave }) {
  const on = active;
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{ position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)', width: on ? 76 : 60, height: on ? 76 : 60, transition: 'all .25s', cursor: 'pointer', zIndex: 5 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${on ? C.aqua : C.borderHi}`, boxShadow: on ? `0 0 30px ${C.aquaGlow}` : 'none', transition: 'all .25s' }} />
      {on && <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${C.aqua}`, opacity: .4, animation: 'pulse-glow 1.6s ease-in-out infinite' }} />}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: on ? 12 : 8, height: on ? 12 : 8, marginLeft: on ? -6 : -4, marginTop: on ? -6 : -4, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 12px ${C.aqua}`, transition: 'all .25s' }} />
      {on && <Brackets size={8} inset={-4} color={C.aqua} />}
      <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: fm, fontSize: 9.5, letterSpacing: '.18em', textTransform: 'uppercase', color: on ? C.aqua : C.muted, transition: 'color .25s' }}>{n.label}</div>
    </div>
  );
}
function Constellation() {
  const [ref, vis] = useReveal();
  const [active, setActive] = useState(0);
  return (
    <section ref={ref} className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg} 0%, ${C.bg} 80%, ${C.bg2} 100%)`, padding: '120px 64px' }} id="red">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader num="01" label="Red de servicios" title={<>Un ecosistema<br />conectado</>} style={{ marginBottom: 56, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all .7s ease' }} />
        <div style={{ position: 'relative', width: '100%', height: 460, border: `1px solid ${C.border}`, background: C.bg2, opacity: vis ? 1 : 0, transition: 'opacity .8s ease .2s' }}>
          <Brackets size={16} inset={12} color={C.borderHi} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {EDGES.map(([a, b], i) => {
              const A = NODES[a], B = NODES[b];
              const touches = a === active || b === active;
              const midX = (A.x + B.x) / 2, midY = (A.y + B.y) / 2;
              return (
                <path key={i} d={`M ${A.x} ${A.y} Q ${midX} ${midY - 8} ${B.x} ${B.y}`}
                  stroke={touches ? C.aqua : C.border} fill="none"
                  strokeDasharray=".8 .4" strokeWidth={touches ? '.35' : '.25'}
                  vectorEffect="non-scaling-stroke"
                  style={{ animation: 'flow 3s linear infinite', filter: touches ? `drop-shadow(0 0 4px ${C.aqua})` : 'none', transition: 'stroke .25s' }} />
              );
            })}
          </svg>
          {NODES.map(n => <ConstNode key={n.id} n={n} active={active === n.id} onEnter={() => setActive(n.id)} onLeave={() => {}} />)}

          {/* selected data panel */}
          <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'rgba(16,16,18,.85)', border: `1px solid ${C.aqua}`, padding: '16px 24px', maxWidth: 300, backdropFilter: 'blur(6px)' }}>
            <Brackets color={C.aqua} size={8} inset={4} />
            <div style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>SELECTED · 0{active + 1}/04</div>
            <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 26, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, marginBottom: 6 }}>{NODES[active].label}</div>
            <div style={{ fontFamily: fb, fontSize: 13, lineHeight: 1.6, color: C.muted }}>{NODE_DESC[active]}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICES — 2×2 cards
═══════════════════════════════════════════════════════ */
const SVCS = [
  { code: 'STR-01', title: 'Estrategia\nde Datos', desc: 'Hojas de ruta para transformar datos en activos estratégicos. Evaluamos madurez actual y trazamos el camino hacia decisiones data-driven reales.', tags: ['Data Strategy', 'Roadmapping', 'Governance', 'Data Mesh'] },
  { code: 'INF-02', title: 'Infraestructura\ny Seguridad', desc: 'Cloud nativa con foco en escalabilidad, eficiencia y cumplimiento normativo. Segura, observable y lista para crecer.', tags: ['Google Cloud', 'Kubernetes', 'Terraform', 'DataOps'] },
  { code: 'ENG-03', title: 'Ingeniería\nde Datos', desc: 'Automatizamos ingesta, transformación y modelado de datos con tecnologías modernas. Pipelines robustos, observabilidad de punta a punta.', tags: ['dbt', 'Apache Airflow', 'Airbyte', 'BigQuery'] },
  { code: 'ACT-04', title: 'Activación\nde Datos', desc: 'Convertimos datos procesados en productos de impacto: dashboards interactivos, aplicaciones internas, modelos ML e IA generativa.', tags: ['Machine Learning', 'Gen AI', 'Dashboards', 'FastAPI'] },
];
function TagChip({ t, hovered }) {
  return <span style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: hovered ? C.aqua : C.muted, border: `1px solid ${hovered ? 'rgba(15,255,168,.4)' : C.border}`, padding: '4px 9px', transition: 'all .25s' }}>{t}</span>;
}
function SvcCard({ s, delay }) {
  const [ref, vis] = useReveal();
  const [h, setH] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', background: h ? C.surf : C.bg2, border: `1px solid ${h ? C.aqua : C.border}`, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 18, minHeight: 360, boxShadow: h ? `0 0 40px ${C.aquaGlow}, 0 24px 60px rgba(0,0,0,.4)` : 'none', transition: 'all .3s', cursor: 'default', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transitionDelay: `${delay}ms` }}>
      <Brackets size={12} inset={10} color={h ? C.aqua : C.border} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: fm, fontSize: 11, letterSpacing: '.2em', color: C.aqua }}>{s.code}</span>
        <span style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.2em', textTransform: 'uppercase', color: C.dim }}>service</span>
      </div>
      <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: 32, lineHeight: 1.04, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, whiteSpace: 'pre-line', margin: 0 }}>{s.title}</h3>
      <p style={{ fontFamily: fb, fontSize: 14, lineHeight: 1.7, color: C.muted, flex: 1, margin: 0 }}>{s.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {s.tags.map(t => <TagChip key={t} t={t} hovered={h} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: fm, fontSize: 9.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 6px ${C.aqua}` }} /> operational
        </span>
        <svg width="14" height="14" fill="none" viewBox="0 0 14 14" style={{ color: h ? C.aqua : C.dim, transform: h ? 'translate(3px,-3px)' : 'none', transition: 'all .25s' }}>
          <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
function Services() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg2} 0%, ${C.bg2} 82%, ${C.bg} 100%)`, padding: '120px 64px' }} id="servicios">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader num="02" label="Qué hacemos" title={<>Nuestros<br />servicios</>} style={{ marginBottom: 64, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all .7s ease' }} />
        <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {SVCS.map((s, i) => <SvcCard key={s.code} s={s} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PROCESS — Spec-Driven Development cycle: a central living
   SPEC (source of truth) drives 4 phases that orbit it in a
   repeating 3D loop. SPECIFY → PLAN → BUILD → VERIFY → ↺
═══════════════════════════════════════════════════════ */
const SDD_PHASES = [
  { code: '01', key: 'SPECIFY', title: 'Especificar', sub: 'La spec es la fuente de verdad: definimos qué y por qué antes del cómo.' },
  { code: '02', key: 'PLAN', title: 'Planificar', sub: 'Arquitectura y plan derivados directamente de la especificación.' },
  { code: '03', key: 'BUILD', title: 'Construir', sub: 'Implementación guiada por la spec — trazable y automatizable con IA.' },
  { code: '04', key: 'VERIFY', title: 'Verificar', sub: 'Validamos el resultado contra la spec. Si cambia, el ciclo se repite.' },
];
function ProcessRow({ l, idx, active, onEnter }) {
  const on = active === idx;
  return (
    <div onMouseEnter={onEnter}
      style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 18, padding: '20px 24px', paddingLeft: on ? 32 : 24, borderLeft: `2px solid ${on ? C.aqua : C.border}`, background: on ? 'rgba(15,255,168,.04)' : 'transparent', transition: 'all .25s', cursor: 'pointer' }}>
      <span style={{ fontFamily: fm, fontSize: 11, letterSpacing: '.2em', color: on ? C.aqua : C.dim, transition: 'color .25s', marginTop: 4 }}>{l.code}</span>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 23, textTransform: 'uppercase', letterSpacing: '.03em', color: on ? C.text : C.muted, lineHeight: 1, transition: 'color .25s' }}>{l.title}</div>
          <span style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.2em', color: on ? C.aqua : C.dim, transition: 'color .25s' }}>{l.key}</span>
        </div>
        <div style={{ fontFamily: fb, fontSize: 13.5, lineHeight: 1.55, color: C.muted, marginTop: 6, maxWidth: 380 }}>{l.sub}</div>
      </div>
    </div>
  );
}

/* central SPEC + 4 phases orbiting it in an isometric loop */
function SDDCycle({ active, setActive }) {
  const C0 = 150, R = 108;
  const nodePos = (i) => {
    const ang = (-90 + i * 90) * Math.PI / 180;
    return { x: C0 + R * Math.cos(ang), y: C0 + R * Math.sin(ang) };
  };
  return (
    <div style={{ position: 'relative', height: 460, perspective: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 300, height: 300, transformStyle: 'preserve-3d', transform: 'rotateX(58deg)' }}>
        {/* ground plane: cycle ring + spec→phase spokes */}
        <svg width="300" height="300" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {SDD_PHASES.map((_, i) => { const p = nodePos(i); return <line key={i} x1={C0} y1={C0} x2={p.x} y2={p.y} stroke={C.aqua} strokeWidth="1" strokeOpacity={active === i ? .5 : .18} strokeDasharray="2 4" />; })}
          <circle cx={C0} cy={C0} r={R} fill="none" stroke={C.border} strokeWidth="1" opacity=".6" />
          <circle cx={C0} cy={C0} r={R} fill="none" stroke={C.aqua} strokeWidth="1.4" strokeDasharray="5 12" opacity=".55" style={{ animation: 'flow 3s linear infinite' }} />
        </svg>
        {/* radar sweep arm */}
        <div style={{ position: 'absolute', left: C0, top: C0, width: R, height: 1, transformOrigin: 'left center', background: `linear-gradient(to right, ${C.aqua}, transparent)`, opacity: .4, animation: 'do-spin 9s linear infinite' }} />

        {/* central SPEC core (raised — source of truth) */}
        <div style={{ position: 'absolute', left: C0 - 42, top: C0 - 42, width: 84, height: 84, transformStyle: 'preserve-3d', transform: 'translateZ(66px)' }}>
          <div style={{ position: 'absolute', inset: 0, border: `1px solid ${C.aqua}`, background: 'rgba(15,255,168,.1)', boxShadow: `0 0 40px ${C.aquaGlow}`, animation: 'pulse-glow 3s ease-in-out infinite' }} />
          <span style={{ position: 'absolute', top: 6, left: 6, width: 12, height: 12, borderTop: `1px solid ${C.aqua}`, borderLeft: `1px solid ${C.aqua}` }} />
          <span style={{ position: 'absolute', bottom: 6, right: 6, width: 12, height: 12, borderBottom: `1px solid ${C.aqua}`, borderRight: `1px solid ${C.aqua}` }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotateX(-58deg)' }}>
            <span style={{ fontFamily: fd, fontWeight: 800, fontSize: 20, letterSpacing: '.08em', color: C.aqua, lineHeight: 1 }}>SPEC</span>
            <span style={{ fontFamily: fm, fontSize: 6.5, letterSpacing: '.18em', color: C.muted, marginTop: 4, textTransform: 'uppercase' }}>source of truth</span>
          </div>
        </div>

        {/* phase nodes orbiting */}
        {SDD_PHASES.map((p, i) => {
          const pos = nodePos(i), on = active === i;
          return (
            <div key={p.key} onMouseEnter={() => setActive(i)}
              style={{ position: 'absolute', left: pos.x - 38, top: pos.y - 38, width: 76, height: 76, transformStyle: 'preserve-3d', transform: `translateZ(${on ? 48 : 16}px)`, transition: 'transform .4s cubic-bezier(.16,1,.3,1)', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: 0, border: `1px solid ${on ? C.aqua : C.borderHi}`, background: on ? 'rgba(15,255,168,.08)' : 'rgba(22,22,25,.75)', boxShadow: on ? `0 0 30px ${C.aquaGlow}` : 'none', transition: 'all .3s' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotateX(-58deg)' }}>
                <span style={{ fontFamily: fm, fontSize: 8.5, letterSpacing: '.18em', color: on ? C.aqua : C.dim, transition: 'color .3s' }}>{p.code}</span>
                <span style={{ fontFamily: fd, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.05em', color: on ? C.text : C.muted, transition: 'color .3s' }}>{p.key}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProcessIso() {
  const [ref, vis] = useReveal();
  const [active, setActive] = useState(0);
  return (
    <section ref={ref} className="do-pad" style={{ background: C.bg, padding: '120px 64px' }} id="proceso">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader num="03" label="Metodología" title={<>Cómo<br />trabajamos</>} style={{ marginBottom: 36, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all .7s ease' }} />

        {/* SDD callout */}
        <div style={{ position: 'relative', border: `1px solid ${C.border}`, background: C.bg2, padding: '28px 32px', marginBottom: 64, maxWidth: 820, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'all .7s ease .1s' }}>
          <Brackets size={12} inset={9} color={C.aqua} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: fm, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: C.aqua, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 8px ${C.aqua}` }} />
            Spec-Driven Development
          </div>
          <p style={{ fontFamily: fb, fontSize: 15.5, lineHeight: 1.7, color: C.text, margin: 0 }}>
            Cada proyecto nace de una <strong style={{ color: C.aqua, fontWeight: 500 }}>especificación viva y versionada</strong> que actúa como fuente de verdad. De ella derivan el plan, la implementación y la verificación — no al revés. Specs ejecutables, trazables y listas para automatización con IA, que mantienen alineados a equipo, código y datos.
          </p>
        </div>

        <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SDD_PHASES.map((l, i) => <ProcessRow key={l.key} l={l} idx={i} active={active} onEnter={() => setActive(i)} />)}
          </div>
          <SDDCycle active={active} setActive={setActive} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TECH STACK — Annotated UI: each tool a spec'd card with
   logo, role info + blueprint-style annotations (index,
   crosshair, leader line, measurement ticks, brackets)
═══════════════════════════════════════════════════════ */
const TECHS = [
  { name: 'Google Cloud', slug: 'googlecloud', cat: 'CLOUD', info: 'Plataforma cloud nativa, base de toda la infraestructura.' },
  { name: 'BigQuery', slug: 'googlebigquery', cat: 'WAREHOUSE', info: 'Data warehouse serverless para análisis a escala.' },
  { name: 'dbt', slug: 'dbt', cat: 'TRANSFORM', info: 'Modelado y transformación de datos versionada.' },
  { name: 'Apache Airflow', slug: 'apacheairflow', cat: 'ORCHESTRATION', info: 'Orquestación de pipelines y scheduling.' },
  { name: 'Airbyte', slug: 'airbyte', cat: 'INGESTION', info: 'Ingesta y replicación de fuentes heterogéneas.' },
  { name: 'Kubernetes', slug: 'kubernetes', cat: 'RUNTIME', info: 'Orquestación de contenedores, escalado elástico.' },
  { name: 'Terraform', slug: 'terraform', cat: 'IAC', info: 'Infraestructura como código, reproducible.' },
  { name: 'Python', slug: 'python', cat: 'LANGUAGE', info: 'Lenguaje núcleo de data engineering e IA.' },
  { name: 'FastAPI', slug: 'fastapi', cat: 'API', info: 'APIs de alto rendimiento para servir modelos.' },
  { name: 'GitHub', slug: 'github', cat: 'VCS / CI', info: 'Control de versiones y pipelines de CI/CD.' },
  { name: 'PostgreSQL', slug: 'postgresql', cat: 'DATABASE', info: 'Base relacional robusta y confiable.' },
  { name: 'Looker', slug: 'looker', cat: 'BI', info: 'Business intelligence y dashboards gobernados.' },
];

function TechLogo({ slug, color }) {
  const url = `https://cdn.simpleicons.org/${slug}`;
  return (
    <span aria-hidden style={{
      width: 28, height: 28, display: 'block', flexShrink: 0, background: color, transition: 'background .25s',
      WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskPosition: 'center', maskPosition: 'center',
    }} />
  );
}

function Crosshair({ color }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" style={{ transition: 'all .25s' }}>
      <path d="M5.5 0v3M5.5 8v3M0 5.5h3M8 5.5h3" stroke={color} strokeWidth="1" />
      <circle cx="5.5" cy="5.5" r="1.4" fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function TechCard({ t, i, delay }) {
  const [h, setH] = useState(false);
  const idx = String(i + 1).padStart(2, '0');
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', border: `1px solid ${h ? C.aqua : C.border}`, background: h ? C.surf : C.bg2, padding: '22px 22px 18px', minHeight: 196, display: 'flex', flexDirection: 'column', boxShadow: h ? `0 0 32px ${C.aquaGlow}` : 'none', transition: 'all .25s', cursor: 'default' }}>
      <Brackets size={11} inset={7} color={h ? C.aqua : 'transparent'} />

      {/* annotation row: index + crosshair registration mark */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <span style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.2em', color: h ? C.aqua : C.dim, transition: 'color .25s' }}>[{idx}]</span>
        <Crosshair color={h ? C.aqua : C.dim} />
      </div>

      {/* logo + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <TechLogo slug={t.slug} color={h ? C.aqua : C.muted} />
        <div>
          <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 20, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '.03em', color: h ? C.text : C.text }}>{t.name}</div>
          <div style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.2em', color: C.aqua, marginTop: 4 }}>{t.cat}</div>
        </div>
      </div>

      <p style={{ fontFamily: fb, fontSize: 13, lineHeight: 1.6, color: C.muted, margin: 0, flex: 1 }}>{t.info}</p>

      {/* annotated leader line + ref tag */}
      <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px dashed ${h ? C.borderHi : C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: fm, fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.dim, transition: 'border-color .25s' }}>
        <span>└─ stack.{t.slug}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: h ? C.aqua : C.muted, transition: 'color .25s' }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} /> ready
        </span>
      </div>
    </div>
  );
}

function TechStack() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg} 0%, ${C.bg} 80%, ${C.bg3} 100%)`, padding: '110px 64px' }} id="stack">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 56, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all .7s ease' }}>
          <SectionHeader num="04" label="Stack tecnológico" title={<>Las herramientas<br />que dominamos</>} />
          {/* blueprint annotation caption */}
          <div style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.dim, textAlign: 'right', lineHeight: 1.8 }}>
            <div>● {TECHS.length} COMPONENTES</div>
            <div>SPEC / annotated · v.2.1</div>
            <div>scale 1:1 · units = stack</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14, opacity: vis ? 1 : 0, transition: 'opacity .8s ease .15s' }}>
          {TECHS.map((t, i) => <TechCard key={t.slug} t={t} i={i} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════ */
function CQuestion({ text }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '22px 0', paddingLeft: h ? 8 : 0, borderBottom: `1px solid ${C.border}`, transition: 'padding-left .2s', cursor: 'default' }}>
      <span style={{ fontFamily: fm, fontSize: 11, color: C.aqua, flexShrink: 0, marginTop: 3 }}>—</span>
      <p style={{ fontFamily: fb, fontSize: 15, lineHeight: 1.55, color: h ? C.text : C.muted, transition: 'color .2s', margin: 0 }}>{text}</p>
    </div>
  );
}
function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.muted }}>{label}{required && ' *'}</label>
      {children}
    </div>
  );
}
function Contact() {
  const [ref, vis] = useReveal();
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [msgId, setMsgId] = useState('');
  const inp = (key) => ({
    value: form[key],
    onChange: e => setForm(p => ({ ...p, [key]: e.target.value })),
    style: { background: C.bg2, border: `1px solid ${C.border}`, color: C.text, fontFamily: fb, fontSize: 15, padding: '14px 16px', outline: 'none', width: '100%', resize: 'none' },
    onFocus: e => e.target.style.borderColor = C.aqua,
    onBlur: e => e.target.style.borderColor = C.border,
  });
  const qs = [
    'Tenés los datos pero no sabés por dónde empezar.',
    'Querés llevar tu infraestructura al siguiente nivel.',
    'Querés que tus datos generen impacto hoy mismo.',
    'Querés automatizar procesos con IA.',
  ];
  const submit = e => {
    e.preventDefault();
    setMsgId(Date.now().toString(36).toUpperCase());
    setSent(true);
  };

  return (
    <section ref={ref} className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg3} 0%, ${C.bg3} 84%, ${C.bgDeep} 100%)`, padding: '120px 64px' }} id="contacto">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader num="05" label="Contacto" title="Hablemos" style={{ marginBottom: 72, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all .7s ease' }} />
        <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100 }}>
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-24px)', transition: 'all .7s ease' }}>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {qs.map((q, i) => <CQuestion key={i} text={q} />)}
            </div>
            <p style={{ marginTop: 40, fontFamily: fm, fontSize: 13, color: C.aqua, letterSpacing: '.06em' }}>info@dataoilers.com</p>
            <p style={{ marginTop: 8, fontFamily: fm, fontSize: 10, color: C.dim, letterSpacing: '.18em', textTransform: 'uppercase' }}>LAT –32.89° / LON –68.85° · MENDOZA, AR</p>
          </div>
          <div style={{ position: 'relative', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(24px)', transition: 'all .7s ease .1s' }}>
            {sent ? (
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 18, border: `1px solid ${C.aqua}`, padding: 48, background: 'rgba(15,255,168,.03)' }}>
                <Brackets size={14} inset={12} color={C.aqua} />
                <div style={{ width: 64, height: 64, border: `1px solid ${C.aqua}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse-glow 2s ease infinite' }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><path d="M6 14.5l5 5 11-11" stroke={C.aqua} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: 32, textTransform: 'uppercase', color: C.text, margin: 0 }}>Transmisión enviada</h3>
                <p style={{ fontFamily: fm, fontSize: 12, letterSpacing: '.1em', color: C.aqua, margin: 0 }}>MSG_ID: {msgId}</p>
                <p style={{ fontFamily: fb, fontSize: 14, color: C.muted, lineHeight: 1.7, margin: 0 }}>Recibimos tu mensaje. Nos pondremos en contacto a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Nombre" required><input {...inp('nombre')} placeholder="Tu nombre" required /></Field>
                  <Field label="Apellido"><input {...inp('apellido')} placeholder="Tu apellido" /></Field>
                </div>
                <Field label="Email" required><input type="email" {...inp('email')} placeholder="tu@empresa.com" required /></Field>
                <Field label="Mensaje" required><textarea rows={5} {...inp('msg')} placeholder="Contanos en qué podemos ayudarte..." required /></Field>
                <BtnPrimary onClick={e => e.target.closest('form').requestSubmit()}>
                  Transmitir mensaje
                  <svg width="15" height="15" fill="none" viewBox="0 0 15 15"><path d="M2 7.5h11M8.5 3l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </BtnPrimary>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.dim, marginBottom: 18 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(it => <FooterLink key={it} label={it} />)}
      </div>
    </div>
  );
}
function FooterLink({ label }) {
  const [h, setH] = useState(false);
  return <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ fontFamily: fb, fontSize: 14, color: h ? C.aqua : C.muted, textDecoration: 'none', transition: 'color .2s' }}>{label}</a>;
}
function Footer() {
  return (
    <footer className="do-pad" style={{ background: C.bgDeep, padding: '72px 64px 32px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 18 }}>
              <Logo size={22} />
              <span style={{ fontFamily: fd, fontWeight: 800, fontSize: 19, letterSpacing: '.12em', textTransform: 'uppercase', color: C.text }}>Data <span style={{ color: C.aqua }}>Oilers</span></span>
            </div>
            <p style={{ fontFamily: fb, fontSize: 14, lineHeight: 1.7, color: C.muted, maxWidth: 300, margin: 0 }}>Refinería de datos en el espacio profundo. Infraestructura de datos e IA productiva, de la estrategia a la activación.</p>
          </div>
          <FooterCol title="Servicios" items={['Estrategia', 'Infraestructura', 'Ingeniería', 'Activación']} />
          <FooterCol title="Empresa" items={['Sobre nosotros', 'Casos', 'Blog', 'Carreras']} />
          <FooterCol title="Contacto" items={['info@dataoilers.com', 'Mendoza, AR', 'Linkedin', 'GitHub']} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 28, borderTop: `1px solid ${C.border}`, flexWrap: 'wrap', gap: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: fm, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: C.dim }}>
            © 2025 Data Oilers · all systems operational <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 6px ${C.aqua}` }} />
          </span>
          <span style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: C.dim }}>v.2.1 · BUILD 2026.04</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function DataOilers() {
  useGlobalStyles();
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <MetricsBar />
      <Constellation />
      <Services />
      <ProcessIso />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}
