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
      @keyframes do-splash-logo { 0%{opacity:0;transform:translateY(14px) scale(.94);filter:blur(6px);} 55%{opacity:1;transform:translateY(0) scale(1);filter:blur(0);} 100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0);} }
      @keyframes do-splash-line { 0%{transform:scaleX(0);} 40%{transform:scaleX(0);} 100%{transform:scaleX(1);} }
      @keyframes do-splash-out  { from{opacity:1;} to{opacity:0;} }
      @keyframes do-modal-in { from{opacity:0;transform:translateY(18px) scale(.94);} to{opacity:1;transform:translateY(0) scale(1);} }
      @keyframes do-overlay-in { from{opacity:0;} to{opacity:1;} }
      @keyframes flow       { from{stroke-dashoffset:0;} to{stroke-dashoffset:-100;} }
      @keyframes do-orbit   { from{offset-distance:0%;} to{offset-distance:100%;} }
      @keyframes drift      { 0%{offset-distance:0%;opacity:0;} 7%{opacity:1;} 93%{opacity:1;} 100%{offset-distance:100%;opacity:0;} }
      @keyframes sweep      { 0%{transform:translateX(0);opacity:0;} 16%{opacity:.5;} 84%{opacity:.5;} 100%{transform:translateX(760%);opacity:0;} }
      @keyframes node-idle  { 0%,100%{transform:translate(-50%,-50%) scale(1);} 50%{transform:translate(-50%,-50%) scale(1.5);opacity:0;} }
      @keyframes do-spin    { to{transform:rotate(360deg);} }
      @keyframes twinkle    { 0%,100%{opacity:.3;} 50%{opacity:1;} }
      @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 ${C.aquaGlow};} 50%{box-shadow:0 0 32px 8px ${C.aquaGlow};} }
      @keyframes scroll-pulse { 0%,100%{opacity:.3;transform:scaleY(1);} 50%{opacity:1;transform:scaleY(1.18);} }
      @keyframes do-float   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }
      @keyframes do-typing  { 0%,60%,100%{opacity:.25;} 30%{opacity:1;} }
      @keyframes do-mesh-drift { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-2%,2%) scale(1.06);} }
      .do-mesh{
        position:fixed; inset:0; pointer-events:none; z-index:9998; mix-blend-mode:screen; opacity:.55;
        background:
          radial-gradient(26% 22% at 6% 10%, rgba(15,255,168,.13), transparent 68%),
          radial-gradient(28% 24% at 96% 16%, rgba(77,127,255,.10), transparent 68%),
          radial-gradient(30% 26% at 92% 94%, rgba(15,255,168,.08), transparent 70%);
        animation:do-mesh-drift 22s ease-in-out infinite;
      }
      @media (prefers-reduced-motion:reduce){ .do-mesh{ animation:none; } }
      .do-grain{
        position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:.055;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
        background-size:180px 180px;
      }
      .do-landing{ position:relative; z-index:1; padding:88px 48px 0; }
      @media (max-width:900px){ .do-landing{ padding:72px 0 0; } }
      *{box-sizing:border-box;} a{cursor:pointer;}
      html{scroll-behavior:smooth;scroll-padding-top:72px;}
      @media (prefers-reduced-motion:reduce){ html{scroll-behavior:auto;} }
      ::selection{background:${C.aqua};color:${C.bgDeep};}
      @media (max-width:1100px){ .do-grid-svc { grid-template-columns:repeat(2,1fr) !important; } }
      @media (max-width:900px){
        .do-grid2 { grid-template-columns:1fr !important; }
        .do-pad   { padding-left:24px !important; padding-right:24px !important; }
        .do-hide-mobile { display:none !important; }
        .do-iso-center { margin:0 auto !important; }
      }
      @media (max-width:560px){ .do-grid-svc { grid-template-columns:1fr !important; } }
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

function useHashRoute() {
  const [route, setRoute] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  useEffect(() => {
    const fn = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return route;
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
function Logo({ height = 26 }) {
  return <img src="/logo.svg" alt="Data Oilers" style={{ height, width: 'auto', display: 'block', flexShrink: 0 }} />;
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
const HX_GLYPHS = '01DATAOILERS0123456789ABCDEF';
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      d.W = canvas.offsetWidth;
      d.H = canvas.offsetHeight;
      canvas.width = d.W * dpr;
      canvas.height = d.H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS px, render at device res → crisp + fluid
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
      t.current += 0.0042;
      // motion-blur trails — fade prev frame toward bg instead of hard clear → smooth cinematic streaks
      ctx.fillStyle = 'rgba(10,10,12,.28)';
      ctx.fillRect(0, 0, d.W, d.H);
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
      ctx.globalCompositeOperation = 'lighter';      // additive bloom → cinematic space glow
      sorted.forEach(p => {
        const depth = (p.z + 1) / 2;                  // 0 far .. 1 near
        const seed = p.i * 2 + p.strand;
        // gentle dispersion that HUGS the ribbon → spiral stays legible, flows smoothly
        const dAng = hx(seed * 3.7) * Math.PI * 2 + t.current * 0.25;
        const breathe = .55 + .45 * (0.5 + 0.5 * Math.sin(t.current * 0.5 + p.i * 0.18 + p.strand));
        const dMag = (4 + hx(seed * 5.3) * 34) * (0.45 + depth * 0.8) * breathe;
        const x = p.hxp + hsx + Math.cos(dAng) * dMag;
        const y = p.hyp + hsy + Math.sin(dAng) * dMag;
        const size = 4 + depth * 8;                   // smaller glyphs
        const rgb = p.strand === 0 ? AQUA : (hx(seed) < .25 ? BLUE : PALE);
        ctx.font = `${size}px "JetBrains Mono", monospace`;
        if (depth > .82) { ctx.shadowColor = `rgba(${rgb},.8)`; ctx.shadowBlur = 5 + depth * 6; } else ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(${rgb},${.05 + depth * depth * .7})`;   // depth² fog → far recedes into space
        ctx.fillText(HX_GLYPHS[Math.floor(hx(seed * 9.1) * HX_GLYPHS.length)], x, y);
      });
      ctx.globalCompositeOperation = 'source-over';
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
const navBase = { fontFamily: fm, fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all .25s', cursor: 'pointer' };
const navActive = { ...navBase, color: C.bgDeep, background: C.aqua, border: `1px solid ${C.aqua}`, padding: '9px 18px', boxShadow: `0 0 24px ${C.aquaGlow}` };
function navIdle(h) { return { ...navBase, color: h ? C.aqua : C.muted, padding: '9px 0' }; }

function NavLink({ label, id, go, active }) {
  const [h, setH] = useState(false);
  const on = active === id;
  return <a href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={on ? navActive : navIdle(h)}>{label}</a>;
}
function SolutionsMenu({ go, active }) {
  const [open, setOpen] = useState(false);
  const on = active === 'servicios';
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{ position: 'relative' }}>
      <a href="#servicios" onClick={(e) => { e.preventDefault(); go('servicios'); setOpen(false); }}
        style={on ? { ...navActive, display: 'inline-flex', alignItems: 'center', gap: 6 } : { ...navIdle(open), display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        Soluciones
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>
          <path d="M2 3.5L5 6.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 16, width: 290, opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity .22s' }}>
        <div style={{ position: 'relative', background: 'rgba(16,16,18,.98)', backdropFilter: 'blur(20px)', border: `1px solid ${C.border}`, boxShadow: `0 30px 70px -20px #000, 0 0 40px -16px ${C.aquaGlow}`, padding: 8, transform: open ? 'translateY(0)' : 'translateY(-6px)', transition: 'transform .22s' }}>
          <Brackets size={10} inset={6} color={C.borderHi} />
          {SVCS.map(o => (
            <a key={o.slug} href={`#/sol/${o.slug}`} onClick={() => setOpen(false)}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.surf; e.currentTarget.style.borderColor = C.aqua; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid transparent', textDecoration: 'none', transition: 'background .2s, border-color .2s' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: o.accent, boxShadow: `0 0 8px ${o.accent}`, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontFamily: fm, fontSize: 8.5, letterSpacing: '.2em', color: o.accent, marginBottom: 3 }}>{o.code}</span>
                <span style={{ display: 'block', fontFamily: fd, fontWeight: 700, fontSize: 16, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, lineHeight: 1 }}>{o.title.replace('\n', ' ')}</span>
              </span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ color: C.dim, flexShrink: 0 }}><path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
function Nav({ go, active }) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className="do-pad" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px', background: sc ? 'rgba(16,16,18,.96)' : 'rgba(16,16,18,.55)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${sc ? C.border : 'transparent'}`, zIndex: 1000, transition: 'all .3s' }}>
      <div className="do-hide-mobile" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 28 }}>
        <SolutionsMenu go={go} active={active} />
        <NavLink label="Red" id="red" go={go} active={active} />
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); go(null); }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', margin: '0 44px', flexShrink: 0 }}>
        <Logo height={28} />
      </a>
      <div className="do-hide-mobile" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 28 }}>
        <NavLink label="Stack" id="stack" go={go} active={active} />
        <NavLink label="Contacto" id="contacto" go={go} active={active} />
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO — 3D LAYER STACK (infra → ide → agent → dashboard)
═══════════════════════════════════════════════════════ */
const STK_W = 440, STK_H = 272;
function StackLayer({ idx, active, setActive, z, y, label, desc, accent, children }) {
  const on = active === idx;
  const dim = active !== null && !on;
  return (
    <div
      onMouseEnter={() => setActive(idx)}
      onMouseLeave={() => setActive(null)}
      style={{
        // STATIC hit target — base position never changes on hover, so the cursor never falls off it
        position: 'absolute', top: '50%', left: '50%', width: STK_W, height: STK_H,
        marginTop: -STK_H / 2, marginLeft: -STK_W / 2,
        transform: `translate3d(0, ${y}px, ${z}px)`,
        transformStyle: 'preserve-3d', cursor: 'pointer',
        transition: 'opacity .5s ease, filter .5s ease',
        opacity: dim ? .42 : 1, filter: dim ? 'saturate(.55) brightness(.65)' : 'none',
        zIndex: on ? 99 : idx,
      }}>
      {/* lift — hover visual (forward + scale) lives here, NOT on the hit target */}
      <div style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: on ? 'translateZ(110px) scale(1.04)' : 'translateZ(0px) scale(1)', transition: 'transform .6s cubic-bezier(.22,1,.36,1)' }}>
      {/* float — paused while hovered so it can't fight the hover transform */}
      <div style={{ width: '100%', height: '100%', animation: `do-float ${8 + idx}s ease-in-out ${idx * .55}s infinite`, animationPlayState: on ? 'paused' : 'running', transformStyle: 'preserve-3d' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 14, overflow: 'hidden', background: `linear-gradient(155deg, ${C.bg2}, ${C.bgDeep})`, border: `1px solid ${on ? accent : C.borderHi}`, boxShadow: on ? `0 46px 100px -24px #000, 0 0 70px -6px ${accent}` : `0 34px 70px -22px rgba(0,0,0,.85), 0 0 44px -12px ${accent}33`, display: 'flex', flexDirection: 'column', transition: 'border .5s ease, box-shadow .5s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, background: C.bgDeep, flexShrink: 0 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
            <span style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: on ? C.text : C.muted, transition: 'color .3s' }}>{label}</span>
          </div>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>{children}</div>
        </div>
      </div>
      </div>
      {/* marketing annotation — reveals on hover only */}
      <div style={{ position: 'absolute', left: '100%', top: '50%', marginLeft: 26, width: 230, display: 'flex', alignItems: 'flex-start', gap: 12, transformStyle: 'preserve-3d', pointerEvents: 'none', transform: `translateY(-50%) translateX(${on ? 0 : -14}px)`, opacity: on ? 1 : 0, transition: 'opacity .45s ease, transform .55s cubic-bezier(.22,1,.36,1)' }}>
        <span style={{ width: 28, height: 1, background: C.aqua, flexShrink: 0, marginTop: 7, boxShadow: `0 0 6px ${C.aqua}` }} />
        <span style={{ fontFamily: fm, fontSize: 10.5, letterSpacing: '.26em', textTransform: 'uppercase', lineHeight: 1.55, color: C.aqua }}>{desc}</span>
      </div>
    </div>
  );
}

/* layer 1 — infrastructure: service nodes + flowing links */
function InfraLayer() {
  const svc = [['S3 LAKE', 0], ['KAFKA', .4], ['SPARK', .8], ['POSTGRES', 1.2], ['AIRFLOW', 1.6], ['K8S', 2]];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 14 }}>
      <svg width="100%" height="100%" viewBox="0 0 350 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
        {[40, 100, 160].map((y, i) => (
          <line key={i} x1="20" y1={y} x2="330" y2={y} stroke={C.blue} strokeWidth="1" strokeDasharray="4 7" opacity=".5" style={{ animation: `flow ${3 + i}s linear infinite` }} />
        ))}
        <line x1="60" y1="40" x2="120" y2="160" stroke={C.aquaSub} strokeWidth="1" strokeDasharray="3 6" opacity=".4" style={{ animation: 'flow 4s linear infinite' }} />
        <line x1="290" y1="40" x2="220" y2="160" stroke={C.aquaSub} strokeWidth="1" strokeDasharray="3 6" opacity=".4" style={{ animation: 'flow 5s linear infinite' }} />
      </svg>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9, height: '100%', alignContent: 'center' }}>
        {svc.map(([n, d]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 8px', borderRadius: 6, background: C.bg3, border: `1px solid ${C.border}` }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 6px ${C.aqua}`, animation: `twinkle 2.1.2s ease-in-out ${d}s infinite`, flexShrink: 0 }} />
            <span style={{ fontFamily: fm, fontSize: 8.5, letterSpacing: '.08em', color: C.text }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* layer 2 — IDE: real pipeline code */
function IdeLayer() {
  const kw = C.blue, st = C.aqua2, fn = C.text, cm = C.dim, op = C.muted;
  const code = [
    [['import ', kw], ['pandas ', fn], ['as ', kw], ['pd', fn]],
    [['from ', kw], ['oilers ', fn], ['import ', kw], ['Pipeline', st]],
    [['# refine raw events → warehouse', cm]],
    [['df ', fn], ['= pd.', op], ['read_parquet', st], ['(', op], ['"s3://lake/raw"', st], [')', op]],
    [['pipe ', fn], ['= ', op], ['Pipeline', st], ['(model=', op], ['"forecast"', st], [')', op]],
    [['out ', fn], ['= pipe.', op], ['transform', st], ['(df).', op], ['validate', st], ['()', op]],
    [['out.', op], ['to_warehouse', st], ['(', op], ['"analytics.sales"', st], [')', op]],
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: fm, fontSize: 10, lineHeight: 1.85, padding: '8px 0' }}>
      {code.map((line, i) => (
        <div key={i} style={{ display: 'flex', padding: '0 12px' }}>
          <span style={{ width: 18, color: C.dim, flexShrink: 0, userSelect: 'none' }}>{i + 1}</span>
          <span style={{ whiteSpace: 'pre' }}>{line.map(([t, c], j) => <span key={j} style={{ color: c }}>{t}</span>)}</span>
        </div>
      ))}
      <span style={{ display: 'inline-block', width: 6, height: 12, background: C.aqua, marginLeft: 30, animation: 'twinkle 1.1s steps(1) infinite', verticalAlign: 'middle' }} />
    </div>
  );
}

/* layer 3 — AI agent chat */
function ChatLayer() {
  const bubble = (align, bg, brd) => ({ alignSelf: align, maxWidth: '78%', padding: '7px 11px', borderRadius: 11, background: bg, border: `1px solid ${brd}`, fontFamily: fb, fontSize: 11, lineHeight: 1.45, color: C.text });
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={bubble('flex-end', C.surf, C.borderHi)}>¿Resumí las ventas del Q3 por región.</div>
      <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 7, fontFamily: fm, fontSize: 8.5, letterSpacing: '.06em', color: C.aqua, padding: '4px 9px', borderRadius: 8, background: `${C.aqua}14`, border: `1px solid ${C.aqua}33` }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 6px ${C.aqua}` }} />▸ query_warehouse(region, q=3)
      </div>
      <div style={bubble('flex-start', C.bg3, C.border)}>Procesé <strong style={{ color: C.aqua }}>1.24M</strong> filas. LATAM lidera con +18% MoM. Te armo el dashboard 👇</div>
      <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '6px 4px' }}>
        {[0, .2, .4].map((d) => <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: C.muted, animation: `do-typing 1.2s ease-in-out ${d}s infinite` }} />)}
      </div>
    </div>
  );
}

/* layer 4 — dashboard: bar + line charts */
// smooth Catmull-Rom path in a 0..100 viewBox (x left→right, y = value as % height from bottom)
function smoothPath(vals) {
  const p = vals.map((v, i) => [i * (100 / (vals.length - 1)), 100 - v]);
  let d = `M ${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c;
    const c1x = b[0] + (c[0] - a[0]) / 6, c1y = b[1] + (c[1] - a[1]) / 6;
    const c2x = c[0] - (e[0] - b[0]) / 6, c2y = c[1] - (e[1] - b[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  }
  return d;
}

function Sparkline({ vals, color }) {
  const pts = vals.map((v, i) => `${i * (100 / (vals.length - 1))},${100 - v}`).join(' ');
  return (
    <svg width="100%" height="14" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function DashLayer() {
  const series = [38, 52, 45, 49, 63, 58, 71, 66, 78, 74, 88, 95];
  const d = smoothPath(series);
  const area = `${d} L 100 100 L 0 100 Z`;
  const avg = series.reduce((a, b) => a + b, 0) / series.length;
  const last = series[series.length - 1];
  const months = ['F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'E'];
  const yTicks = [['$4M', 4], ['$3M', 28], ['$2M', 52], ['$1M', 76]];
  const kpis = [
    ['MRR', '$312K', '▲ 4.2%', C.aqua, [40, 52, 48, 60, 58, 72, 80]],
    ['Churn', '2.1%', '▼ 0.3%', C.aqua2, [70, 64, 66, 55, 52, 48, 44]],
    ['LTV', '$48.2K', '▲ 6.0%', C.blue, [44, 50, 58, 56, 68, 74, 82]],
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '11px 13px', display: 'flex', flexDirection: 'column', gap: 9, fontFamily: fb }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: fm, fontSize: 7.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.dim, marginBottom: 3 }}>Ingresos recurrentes · ARR</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: fd, fontWeight: 800, fontSize: 26, lineHeight: .9, color: C.text, letterSpacing: '-.01em' }}>$3.74M</span>
            <span style={{ fontFamily: fm, fontSize: 9.5, fontWeight: 500, color: C.aqua }}>▲ 18.2%</span>
          </div>
        </div>
        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
          {['7D', '30D', '12M'].map((s, i) => (
            <span key={s} style={{ fontFamily: fm, fontSize: 7.5, letterSpacing: '.06em', padding: '4px 7px', color: i === 2 ? C.bgDeep : C.muted, background: i === 2 ? C.aqua : 'transparent', borderLeft: i ? `1px solid ${C.border}` : 'none' }}>{s}</span>
          ))}
        </div>
      </div>

      {/* chart with axes */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        {yTicks.map(([lab, top]) => (
          <span key={lab} style={{ position: 'absolute', left: 0, top: `${top}%`, transform: 'translateY(-50%)', fontFamily: fm, fontSize: 7, color: C.dim }}>{lab}</span>
        ))}
        <div style={{ position: 'absolute', left: 26, right: 2, top: 4, bottom: 13 }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.aqua} stopOpacity=".30" />
                <stop offset="100%" stopColor={C.aqua} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[4, 28, 52, 76].map(g => <line key={g} x1="0" y1={g} x2="100" y2={g} stroke={C.border} strokeWidth=".5" vectorEffect="non-scaling-stroke" />)}
            <line x1="0" y1={100 - avg} x2="100" y2={100 - avg} stroke={C.muted} strokeWidth=".5" strokeDasharray="3 3" opacity=".55" vectorEffect="non-scaling-stroke" />
            <path d={area} fill="url(#dash-fill)" />
            <path d={d} fill="none" stroke={C.aqua} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ filter: `drop-shadow(0 1px 3px ${C.aquaGlow})` }} />
            <circle cx="100" cy={100 - last} r="5" fill="none" stroke={C.aqua} strokeWidth="1" vectorEffect="non-scaling-stroke" opacity=".45" />
            <circle cx="100" cy={100 - last} r="2.6" fill={C.aqua} vectorEffect="non-scaling-stroke" />
          </svg>
          <div style={{ position: 'absolute', right: 0, top: `${100 - last}%`, transform: 'translate(0,-135%)', fontFamily: fm, fontSize: 7.5, color: C.text, background: C.bgDeep, border: `1px solid ${C.borderHi}`, borderRadius: 4, padding: '2px 5px', whiteSpace: 'nowrap', boxShadow: '0 4px 12px #000' }}>$3.74M</div>
        </div>
        <div style={{ position: 'absolute', left: 26, right: 2, bottom: 0, display: 'flex', justifyContent: 'space-between', fontFamily: fm, fontSize: 6.5, color: C.dim }}>
          {months.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>

      {/* footer KPIs */}
      <div style={{ display: 'flex', gap: 9, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
        {kpis.map(([lab, val, delta, col, spark]) => (
          <div key={lab} style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontFamily: fm, fontSize: 6.5, letterSpacing: '.1em', textTransform: 'uppercase', color: C.dim }}>{lab}</span>
              <span style={{ fontFamily: fm, fontSize: 7, color: col }}>{delta}</span>
            </div>
            <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 14, color: C.text, lineHeight: 1, marginBottom: 3 }}>{val}</div>
            <Sparkline vals={spark} color={col} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerStack() {
  const [active, setActive] = useState(null);
  const layers = [
    { z: -270, y: -225, label: '01 · Infraestructura', accent: C.blue,  desc: 'Datos en tiempo real, sin pausa', el: <InfraLayer /> },
    { z: -90,  y: -75,  label: '02 · IDE / Código',     accent: C.aqua2, desc: 'Código versionado y testeado', el: <IdeLayer /> },
    { z: 90,   y: 75,   label: '03 · Agente IA',        accent: C.aqua,  desc: 'Agentes que razonan para vos', el: <ChatLayer /> },
    { z: 270,  y: 225,  label: '04 · Dashboard',        accent: C.aqua,  desc: 'Decisiones con datos, no corazonadas', el: <DashLayer /> },
  ];
  return (
    <div className="do-hide-mobile" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 2000, perspectiveOrigin: '55% 45%', minHeight: 760, animation: 'do-up 1.1s cubic-bezier(.16,1,.3,1) forwards .9s', opacity: 0 }}>
      <div style={{ position: 'relative', width: STK_W, height: 760, transformStyle: 'preserve-3d', transform: `rotateX(12deg) rotateY(-26deg) rotateZ(4deg) scale(${active !== null ? .96 : 1})`, transition: 'transform .6s cubic-bezier(.16,1,.3,1)' }}>
        {layers.map((l, i) => (
          <StackLayer key={i} idx={i} active={active} setActive={setActive} z={l.z} y={l.y} label={l.label} desc={l.desc} accent={l.accent}>{l.el}</StackLayer>
        ))}
      </div>
    </div>
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
        <LayerStack />
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
   CONSTELLATION — pipeline de refinería de datos (onda seno)
═══════════════════════════════════════════════════════ */
const STAGES = [
  { id: 0, label: 'Estrategia', code: 'STR', stat: 'Roadmap data-driven', x: 21 },
  { id: 1, label: 'Infraestructura', code: 'INF', stat: 'Cloud · 99.9% uptime', x: 40.3 },
  { id: 2, label: 'Ingeniería', code: 'ENG', stat: 'Pipelines en tiempo real', x: 59.6 },
  { id: 3, label: 'Activación', code: 'ACT', stat: 'ML · GenAI · Dashboards', x: 79 },
];
const NODE_DESC = [
  'Diagnosticamos la madurez de datos de tu organización y diseñamos la hoja de ruta que conecta cada iniciativa con un objetivo de negocio. Definimos governance, modelo operativo y casos de uso priorizados por impacto, para que cada inversión en datos tenga retorno medible.',
  'Construimos la base sobre la que vive todo el dato: cloud nativa, infraestructura como código y arquitecturas seguras por diseño. Entornos observables, con control de costos y cumplimiento normativo, listos para escalar de gigabytes a petabytes sin reescribir nada.',
  'Automatizamos la ingesta, transformación y modelado de datos desde decenas de fuentes hacia un único origen de verdad. Pipelines versionados y testeados, con observabilidad de punta a punta que detecta anomalías antes de que lleguen al negocio.',
  'Convertimos el dato refinado en productos que mueven la aguja: dashboards interactivos, modelos de machine learning en producción y aplicaciones de IA generativa. El último kilómetro donde los datos dejan de ser un reporte y empiezan a tomar decisiones.',
];
// onda seno HORIZONTAL: dominio left 5%→95%, centro y 46%, amplitud 10, 2 periodos
const W_X0 = 5, W_X1 = 95, W_CY = 46, W_AMP = 10, W_PER = 2;
const waveY = (x) => W_CY + W_AMP * Math.sin((2 * Math.PI * W_PER * (x - W_X0)) / (W_X1 - W_X0));
function wavePath(xa, xb) {
  const N = Math.max(2, Math.round((xb - xa) / 1.5));
  let d = '';
  for (let i = 0; i <= N; i++) {
    const x = xa + ((xb - xa) * i) / N;
    d += (i ? ' L ' : 'M ') + x.toFixed(2) + ' ' + waveY(x).toFixed(2);
  }
  return d;
}
// rail x-coords: entrada (izq) → 4 etapas → salida (der)
const RAIL = [W_X0, ...STAGES.map(s => s.x), W_X1];

// ruta en px para offset-path (movimiento fluido, compositado por GPU)
function wavePathPx(w, h) {
  const x0 = 0.05 * w, span = 0.9 * w, cy = (W_CY / 100) * h, amp = (W_AMP / 100) * h;
  const N = 140;
  let d = '';
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = x0 + span * t;
    const y = cy + amp * Math.sin(2 * Math.PI * W_PER * t);
    d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d;
}

function PipeNode({ n, active, onEnter }) {
  const on = active;
  return (
    <div onMouseEnter={onEnter}
      style={{ position: 'absolute', left: `${n.x}%`, top: `${waveY(n.x)}%`, transform: 'translate(-50%,-50%)', width: on ? 70 : 56, height: on ? 70 : 56, transition: 'all .25s', cursor: 'pointer', zIndex: 5 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${on ? C.aqua : C.borderHi}`, background: on ? 'rgba(15,255,168,.06)' : C.bg2, boxShadow: on ? `0 0 30px ${C.aquaGlow}` : 'none', transition: 'all .25s' }} />
      {/* anillo idle — late siempre */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', borderRadius: '50%', border: `1px solid ${C.aqua}`, opacity: .45, animation: `node-idle 3.4s ease-out ${n.id * 0.55}s infinite`, pointerEvents: 'none' }} />
      {on && <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${C.aqua}`, opacity: .4, animation: 'pulse-glow 1.6s ease-in-out infinite' }} />}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: on ? 12 : 8, height: on ? 12 : 8, marginLeft: on ? -6 : -4, marginTop: on ? -6 : -4, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 12px ${C.aqua}`, transition: 'all .25s' }} />
      {on && <Brackets size={8} inset={-4} color={C.aqua} />}
      <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: fm, fontSize: 9, letterSpacing: '.2em', color: on ? C.aqua : C.dim, transition: 'color .25s' }}>{n.code}·0{n.id + 1}</div>
      <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', textAlign: 'center', fontFamily: fm, fontSize: 9.5, letterSpacing: '.18em', textTransform: 'uppercase', color: on ? C.aqua : C.muted, transition: 'color .25s' }}>{n.label}</div>
    </div>
  );
}
function EndLabel({ side, kicker, dots }) {
  const isIn = side === 'in';
  return (
    <div style={{ position: 'absolute', top: '46%', [isIn ? 'left' : 'right']: 18, transform: 'translateY(-50%)', textAlign: isIn ? 'left' : 'right', zIndex: 4 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: isIn ? 'flex-start' : 'flex-end', marginBottom: 10 }}>
        {dots.map((d, i) => (
          <div key={i} style={{ display: 'flex', gap: 4, flexDirection: isIn ? 'row' : 'row-reverse' }}>
            {Array.from({ length: d }).map((_, j) => (
              <span key={j} style={{ width: isIn ? 5 : 14, height: 5, borderRadius: isIn ? '50%' : 2, background: isIn ? C.dim : C.aquaSub, boxShadow: isIn ? 'none' : `0 0 6px ${C.aquaGlow}` }} />
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: fm, fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: isIn ? C.dim : C.aqua, whiteSpace: 'nowrap' }}>{kicker}</div>
    </div>
  );
}
const GRAPH_H = 440;
function Constellation() {
  const [ref, vis] = useReveal();
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const [w, setW] = useState(1200);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(es => setW(es[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const motion = wavePathPx(w, GRAPH_H);
  return (
    <section ref={ref} className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg} 0%, ${C.bg} 80%, ${C.bg2} 100%)`, padding: '120px 64px' }} id="red">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader num="01" label="Del dato crudo al valor" title={<>Un ecosistema<br />conectado</>} style={{ marginBottom: 56, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 1.2s ease' }} />

        {/* gráfico — pipeline horizontal */}
        <div ref={boxRef} style={{ position: 'relative', width: '100%', height: GRAPH_H, border: `1px solid ${C.border}`, background: C.bg2, overflow: 'hidden', opacity: vis ? 1 : 0, transition: 'opacity 1.2s ease .5s' }}>
          <Brackets size={16} inset={12} color={C.borderHi} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path d={wavePath(RAIL[0], RAIL[RAIL.length - 1])} fill="none" stroke={C.border} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            {RAIL.slice(0, -1).map((x1, i) => {
              const x2 = RAIL[i + 1];
              const touches = i === active || i === active + 1;
              return (
                <path key={i} d={wavePath(x1, x2)} fill="none"
                  stroke={touches ? C.aqua : C.aquaSub} strokeOpacity={touches ? 1 : .35}
                  strokeWidth={touches ? '2' : '1.5'} strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
                  style={{ animation: 'flow 7s linear infinite', filter: touches ? `drop-shadow(0 0 4px ${C.aqua})` : 'none', transition: 'stroke .25s, stroke-opacity .25s' }} />
              );
            })}
          </svg>

          {/* barrido de luz ambiental — todo el gráfico animado (transform, compositado) */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '-16%', width: '15%', background: `linear-gradient(90deg, transparent, ${C.aquaGlow}, transparent)`, filter: 'blur(10px)', animation: 'sweep 11s ease-in-out infinite', willChange: 'transform', pointerEvents: 'none', zIndex: 1 }} />

          {/* particulas fluyendo por el ducto — offset-path GPU, sin saltos */}
          {Array.from({ length: 16 }).map((_, i) => {
            const sz = i % 4 === 0 ? 7 : i % 4 === 2 ? 4 : 5.5;
            return (
              <span key={i} style={{ position: 'absolute', top: 0, left: 0, width: sz, height: sz, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 ${sz * 2.2}px ${C.aqua}`, offsetPath: `path('${motion}')`, offsetRotate: '0deg', willChange: 'offset-distance, opacity', animation: `drift 13s linear ${(i * 13 / 16).toFixed(2)}s infinite`, pointerEvents: 'none', zIndex: 3 }} />
            );
          })}

          <EndLabel side="in" kicker="Fuentes · datos crudos" dots={[3, 2, 4, 2]} />
          <EndLabel side="out" kicker="Productos de datos" dots={[4, 3, 4]} />

          {STAGES.map(n => <PipeNode key={n.id} n={n} active={active === n.id} onEnter={() => setActive(n.id)} />)}
        </div>

        {/* detalle de la etapa — centrado, debajo del gráfico */}
        <div style={{ position: 'relative', margin: '28px auto 0', maxWidth: 760, minHeight: 150, background: C.bg2, border: `1px solid ${C.aqua}`, padding: '24px 32px', textAlign: 'center' }}>
          <Brackets color={C.aqua} size={10} inset={6} />
          <div style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>ETAPA · 0{active + 1}/04 — {STAGES[active].stat}</div>
          <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 30, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, marginBottom: 12 }}>{STAGES[active].label}</div>
          <div style={{ fontFamily: fb, fontSize: 15, lineHeight: 1.75, color: C.muted, maxWidth: 640, margin: '0 auto' }}>{NODE_DESC[active]}</div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICES — 2×2 cards
═══════════════════════════════════════════════════════ */
const SVCS = [
  {
    code: 'STR-01', slug: 'estrategia', accent: C.blue,
    title: 'Estrategia\nde Datos', desc: 'Hojas de ruta para transformar datos en activos estratégicos. Evaluamos madurez actual y trazamos el camino hacia decisiones data-driven reales.',
    tags: ['Data Strategy', 'Roadmapping', 'Governance', 'Data Mesh'],
    detail: {
      tagline: 'De la corazonada al criterio. Diseñamos el plan que convierte tus datos en ventaja competitiva medible.',
      intro: 'La mayoría de las organizaciones no tienen un problema de datos: tienen un problema de dirección. Diagnosticamos dónde estás parado, definimos a dónde querés llegar y trazamos el camino más corto con retorno. Cada iniciativa queda atada a un objetivo de negocio, no a una moda tecnológica.',
      Graphic: StrategyGraphic,
      solves: [
        { t: 'Decisiones por intuición', d: 'El negocio avanza a corazonada porque el dato existe pero nadie confía en él ni sabe dónde está.' },
        { t: 'Inversión sin retorno', d: 'Proyectos de datos que arrancan con entusiasmo y mueren sin impacto medible ni dueño claro.' },
        { t: 'Datos sin governance', d: 'Métricas que no cuadran entre áreas, sin definiciones comunes, sin responsables ni control de acceso.' },
        { t: 'Sin hoja de ruta', d: 'Iniciativas aisladas que no escalan ni conversan entre sí, sin una visión que las ordene.' },
      ],
      steps: [
        { t: 'Diagnóstico de madurez', d: 'Evaluamos datos, plataforma, talento y cultura sobre un marco de 5 ejes para saber con exactitud dónde estás.' },
        { t: 'Casos de uso priorizados', d: 'Mapeamos oportunidades y las ordenamos por impacto vs. esfuerzo. Empezamos por las que mueven la aguja rápido.' },
        { t: 'Modelo operativo y governance', d: 'Definimos roles, dueños del dato, políticas y métricas comunes. El dato pasa a tener gobierno.' },
        { t: 'Roadmap con ROI', d: 'Un plan por fases, con hitos, presupuesto y retorno esperado para cada inversión. Listo para ejecutar.' },
      ],
      audiences: [
        { t: 'Dirección y C-level', d: 'Necesitan una visión clara y un caso de negocio antes de invertir en datos.' },
        { t: 'Empresas iniciando', d: 'Organizaciones que arrancan su journey de datos y no quieren equivocar el primer paso.' },
        { t: 'Datos dispersos', d: 'Equipos con información fragmentada en silos que buscan un único origen de verdad.' },
      ],
      outcomes: [],
    },
  },
  {
    code: 'INF-02', slug: 'infraestructura', accent: C.aqua2,
    title: 'Infraestructura\ny Seguridad', desc: 'Cloud nativa con foco en escalabilidad, eficiencia y cumplimiento normativo. Segura, observable y lista para crecer.',
    tags: ['Nube', 'Infra como código', 'Seguridad', 'Observabilidad'],
    detail: {
      tagline: 'La base sobre la que vive todo el dato. Cloud nativa, segura por diseño y lista para escalar de gigabytes a petabytes.',
      intro: 'Construimos infraestructura como código en la nube: reproducible, observable y con costos bajo control. Entornos seguros desde el primer commit, que cumplen normativa y crecen sin reescribir nada. Vos te ocupás del negocio; la plataforma se ocupa de no caerse.',
      Graphic: InfraGraphic,
      solves: [
        { t: 'Costos cloud sin control', d: 'La factura crece mes a mes y nadie sabe qué la dispara ni cómo frenarla.' },
        { t: 'Entornos frágiles', d: 'Infraestructura configurada a mano, imposible de reproducir y que se rompe cuando alguien la toca.' },
        { t: 'Riesgo de compliance', d: 'Datos sensibles sin control de acceso, sin auditoría ni cifrado, expuestos a sanciones.' },
        { t: 'No escala', d: 'Lo que funcionaba con gigabytes se cae con el primer pico de carga real.' },
      ],
      steps: [
        { t: 'Infraestructura como código', d: 'Todo declarado como código: cada recurso versionado, revisado y reproducible en minutos. Cero clicks manuales.' },
        { t: 'Cloud nativa', d: 'Arquitecturas serverless y contenedores que escalan solas según la demanda y pagás solo lo que usás.' },
        { t: 'Seguridad por diseño', d: 'Cifrado, mínimo privilegio, redes privadas y auditoría desde el día cero, no como parche posterior.' },
        { t: 'Observabilidad y FinOps', d: 'Métricas, alertas y control de costos en tiempo real. Sabés qué pasa y cuánto cuesta, siempre.' },
      ],
      audiences: [
        { t: 'Equipos que escalan', d: 'Data teams que superaron el prototipo y necesitan una base productiva y confiable.' },
        { t: 'Empresas reguladas', d: 'Sectores con exigencias de compliance, auditoría y residencia de datos.' },
        { t: 'Startups en crecimiento', d: 'Equipos que quieren cloud seria sin contratar un ejército de DevOps.' },
      ],
      outcomes: [],
    },
  },
  {
    code: 'ENG-03', slug: 'ingenieria', accent: C.aqua,
    title: 'Ingeniería\nde Datos', desc: 'Automatizamos ingesta, transformación y modelado de datos con tecnologías modernas. Pipelines robustos, observabilidad de punta a punta.',
    tags: ['Ingesta', 'Transformación', 'Orquestación', 'Data Warehouse'],
    detail: {
      tagline: 'El refinado. Convertimos decenas de fuentes caóticas en un único origen de verdad, versionado y testeado.',
      intro: 'Automatizamos la ingesta, transformación y modelado del dato desde donde sea que viva hacia un warehouse confiable. Pipelines como software de verdad: versionados, orquestados, testeados y observados de punta a punta. Las anomalías se detectan antes de que lleguen al negocio.',
      Graphic: EngineeringGraphic,
      solves: [
        { t: 'Datos en silos', d: 'Información atrapada en sistemas que no se hablan: CRM, ERP, planillas, APIs sueltas.' },
        { t: 'Reportes que no cuadran', d: 'Dos áreas miden lo mismo de forma distinta y ninguna confía en el número de la otra.' },
        { t: 'Pipelines manuales', d: 'Procesos frágiles a base de scripts y exports manuales que se rompen sin aviso.' },
        { t: 'Errores que llegan tarde', d: 'Te enterás del dato roto cuando ya tomó una decisión equivocada río abajo.' },
      ],
      steps: [
        { t: 'Ingesta automatizada', d: 'Conectamos cada fuente —bases, SaaS, APIs y archivos— hacia un solo destino, sin código repetitivo de integración.' },
        { t: 'Transformación gobernada', d: 'Modelamos el dato como código: versionado, documentado, testeado y con linaje completo de extremo a extremo.' },
        { t: 'Orquestación confiable', d: 'Pipelines que corren solos en el orden correcto, con reintentos, dependencias y horarios claros.' },
        { t: 'Observabilidad end-to-end', d: 'Tests de calidad y alertas que detectan anomalías antes de que contaminen un dashboard.' },
      ],
      audiences: [
        { t: 'Equipos de analítica', d: 'Analistas que pierden el 80% del tiempo limpiando datos en vez de analizarlos.' },
        { t: 'Data teams', d: 'Equipos que necesitan pipelines productivos, testeados y mantenibles, no scripts héroe.' },
        { t: 'Múltiples fuentes', d: 'Áreas con datos repartidos en muchos sistemas que necesitan consolidar un origen de verdad.' },
      ],
      outcomes: [],
    },
  },
  {
    code: 'ACT-04', slug: 'activacion', accent: C.aqua,
    title: 'Activación\nde Datos', desc: 'Convertimos datos procesados en productos de impacto: dashboards interactivos, aplicaciones internas, modelos ML e IA generativa.',
    tags: ['Machine Learning', 'Gen AI', 'Dashboards', 'Apps de datos'],
    detail: {
      tagline: 'El último kilómetro. Donde el dato deja de ser un reporte y empieza a tomar decisiones.',
      intro: 'Tener el dato limpio no sirve si se queda en el warehouse. Lo convertimos en productos que mueven la aguja: dashboards que el negocio usa todos los días, modelos de machine learning en producción y aplicaciones de IA generativa que automatizan lo que antes era trabajo manual. Del dato a la decisión.',
      Graphic: ActivationGraphic,
      solves: [
        { t: 'Datos que no llegan', d: 'El dato existe y está limpio, pero nunca aterriza donde se toman las decisiones.' },
        { t: 'Modelos que no salen', d: 'Notebooks con buenos resultados que nunca llegan a producción ni generan valor real.' },
        { t: 'Trabajo manual repetitivo', d: 'Tareas de clasificar, resumir o redactar que consumen horas y podrían automatizarse con IA.' },
        { t: 'Dashboards que nadie mira', d: 'Reportes estáticos que envejecen mal y no responden la pregunta que el negocio se hace hoy.' },
      ],
      steps: [
        { t: 'Dashboards accionables', d: 'Visualizaciones interactivas conectadas al dato vivo, diseñadas alrededor de las decisiones reales del negocio.' },
        { t: 'ML en producción', d: 'Modelos predictivos servidos como API, monitoreados y reentrenados. No prototipos: producto.' },
        { t: 'IA generativa aplicada', d: 'Agentes y copilotos que consultan tus datos, resumen, redactan y automatizan tareas con lenguaje natural.' },
        { t: 'Apps internas a medida', d: 'Aplicaciones que ponen el dato y los modelos en manos del equipo que los necesita, integradas a su flujo de trabajo.' },
      ],
      audiences: [
        { t: 'Áreas de negocio', d: 'Ventas, finanzas y operaciones que necesitan respuestas, no exportar a Excel.' },
        { t: 'Producto', d: 'Equipos que quieren incrustar predicción o IA dentro de su propio producto.' },
        { t: 'Operaciones', d: 'Procesos manuales y repetitivos listos para automatizarse con ML o GenAI.' },
      ],
      outcomes: [
        { k: 'Modelos en producción', v: 'API' },
        { k: 'Dato a decisión', v: 'Tiempo real' },
        { k: 'Tareas automatizadas', v: 'GenAI' },
      ],
    },
  },
];
const SVC_BY_SLUG = Object.fromEntries(SVCS.map(s => [s.slug, s]));
function TagChip({ t, hovered }) {
  return <span style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: hovered ? C.aqua : C.muted, border: `1px solid ${hovered ? 'rgba(15,255,168,.4)' : C.border}`, padding: '4px 9px', transition: 'all .25s' }}>{t}</span>;
}
function SvcCard({ s, delay }) {
  const [ref, vis] = useReveal();
  const [h, setH] = useState(false);
  return (
    <a ref={ref} href={`#/sol/${s.slug}`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', background: h ? C.surf : C.bg2, border: `1px solid ${h ? C.aqua : C.border}`, padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 270, boxShadow: h ? `0 0 40px ${C.aquaGlow}, 0 24px 60px rgba(0,0,0,.4)` : 'none', transition: `opacity 1.2s ease ${delay}ms, transform 1.2s ease ${delay}ms, background .3s, border-color .3s, box-shadow .3s`, cursor: 'pointer', textDecoration: 'none', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)' }}>
      <Brackets size={10} inset={8} color={h ? C.aqua : C.border} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.2em', color: C.aqua }}>{s.code}</span>
        <span style={{ fontFamily: fm, fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: C.dim }}>service</span>
      </div>
      <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: 22, lineHeight: 1.02, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, whiteSpace: 'pre-line', margin: 0 }}>{s.title}</h3>
      <p style={{ fontFamily: fb, fontSize: 12.5, lineHeight: 1.55, color: C.muted, flex: 1, margin: 0 }}>{s.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {s.tags.slice(0, 3).map(t => <TagChip key={t} t={t} hovered={h} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: fm, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: h ? C.aqua : C.muted, transition: 'color .25s' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 6px ${C.aqua}` }} /> Ver solución
        </span>
        <svg width="13" height="13" fill="none" viewBox="0 0 14 14" style={{ color: h ? C.aqua : C.dim, transform: h ? 'translate(3px,-3px)' : 'none', transition: 'all .25s' }}>
          <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}
function Services() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg2} 0%, ${C.bg2} 82%, ${C.bg} 100%)`, padding: '96px 64px' }} id="servicios">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader num="02" label="Qué hacemos" title={<>Nuestras<br />soluciones</>} style={{ marginBottom: 44, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 1.2s ease' }} />
        <div className="do-grid-svc" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {SVCS.map((s, i) => <SvcCard key={s.code} s={s} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICE DETAIL PAGES — sub-page per solution, same style
═══════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, style }) {
  const [ref, vis] = useReveal();
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: `opacity .1.2s ease ${delay}ms, transform .1.2s ease ${delay}ms`, ...style }}>{children}</div>;
}

function GraphicFrame({ children, label }) {
  return (
    <div style={{ position: 'relative', width: '100%', border: `1px solid ${C.border}`, background: C.bg2, padding: '22px 22px 26px', minHeight: 360, display: 'flex', flexDirection: 'column', boxShadow: '0 30px 70px -30px rgba(0,0,0,.8)' }}>
      <Brackets size={14} inset={10} color={C.borderHi} />
      <div style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.dim, marginBottom: 16 }}>{label}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}

/* radar — current vs target across N axes */
function RadarChart({ axes, current, target, accent }) {
  const size = 300, c = size / 2, R = 100, n = axes.length;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / n;
    return [c + Math.cos(a) * r, c + Math.sin(a) * r];
  };
  const poly = vals => vals.map((v, i) => pt(i, R * v).join(',')).join(' ');
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 320, display: 'block', margin: '0 auto' }}>
      {[0.25, 0.5, 0.75, 1].map((r, ri) => (
        <polygon key={ri} points={axes.map((_, i) => pt(i, R * r).join(',')).join(' ')} fill="none" stroke={C.border} strokeWidth="1" />
      ))}
      {axes.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke={C.border} strokeWidth="1" />; })}
      <polygon points={poly(target)} fill="none" stroke={accent} strokeWidth="1.4" strokeDasharray="4 4" opacity=".55" />
      <polygon points={poly(current)} fill={`${accent}22`} stroke={accent} strokeWidth="2" style={{ filter: `drop-shadow(0 0 6px ${accent}66)` }} />
      {current.map((v, i) => { const [x, y] = pt(i, R * v); return <circle key={i} cx={x} cy={y} r="3.2" fill={accent} />; })}
      {axes.map((lab, i) => { const [x, y] = pt(i, R + 18); return <text key={i} x={x} y={y} fill={C.muted} fontSize="9" fontFamily={fm} textAnchor="middle" dominantBaseline="middle" style={{ letterSpacing: '.08em' }}>{lab.toUpperCase()}</text>; })}
    </svg>
  );
}

function StrategyGraphic() {
  const axes = ['Datos', 'Plataforma', 'Talento', 'Cultura', 'Activación'];
  const current = [0.45, 0.4, 0.55, 0.35, 0.3];
  const target = [0.9, 0.85, 0.8, 0.88, 0.95];
  return (
    <GraphicFrame label="Diagnóstico de madurez · 5 ejes">
      <RadarChart axes={axes} current={current} target={target} accent={C.blue} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 6 }}>
        {[['Estado actual', false], ['Objetivo', true]].map(([l, dash]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: fm, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted }}>
            <span style={{ width: 16, borderTop: `2px ${dash ? 'dashed' : 'solid'} ${C.blue}` }} />{l}
          </span>
        ))}
      </div>
    </GraphicFrame>
  );
}

function InfraGraphic() {
  const layers = [['Aplicaciones', 'APIs · Dashboards · Apps'], ['Datos', 'Warehouse · Storage · Lake'], ['Plataforma', 'Contenedores · Serverless'], ['Cloud / IaC', 'Infra como código']];
  const cost = [80, 72, 66, 58, 50, 45, 41];
  const pts = cost.map((v, i) => `${i * (160 / (cost.length - 1))},${v * 0.5}`).join(' ');
  return (
    <GraphicFrame label="Arquitectura en capas · IaC">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {layers.map(([t, dd]) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', border: `1px solid ${C.border}`, background: C.bg3, borderLeft: `2px solid ${C.aqua2}` }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.aqua2, boxShadow: `0 0 8px ${C.aqua2}`, flexShrink: 0 }} />
            <span style={{ fontFamily: fd, fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.04em', color: C.text, minWidth: 116 }}>{t}</span>
            <span style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.04em', color: C.muted }}>{dd}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <div style={{ flex: 1, border: `1px solid ${C.border}`, background: C.bg3, padding: '12px 14px' }}>
          <div style={{ fontFamily: fm, fontSize: 8, letterSpacing: '.16em', color: C.dim, marginBottom: 8 }}>COSTO CLOUD / MES</div>
          <svg width="100%" height="40" viewBox="0 0 160 44" preserveAspectRatio="none">
            <polyline points={pts} fill="none" stroke={C.aqua} strokeWidth="2.5" vectorEffect="non-scaling-stroke" style={{ filter: `drop-shadow(0 0 4px ${C.aquaGlow})` }} />
          </svg>
        </div>
        <div style={{ width: 120, border: `1px solid ${C.border}`, background: C.bg3, padding: '12px 14px' }}>
          <div style={{ fontFamily: fm, fontSize: 8, letterSpacing: '.16em', color: C.dim, marginBottom: 6 }}>UPTIME</div>
          <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 26, color: C.aqua2, lineHeight: 1 }}>99.9%</div>
        </div>
      </div>
    </GraphicFrame>
  );
}

function EngineeringGraphic() {
  const nodes = ['Fuentes', 'Ingesta', 'Transform.', 'Warehouse'];
  const quality = [['Frescura', 96], ['Completitud', 99], ['Validez', 95], ['Unicidad', 98]];
  return (
    <GraphicFrame label="Pipeline de datos · end-to-end">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        {nodes.map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', flex: i < nodes.length - 1 ? 1 : '0 0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${C.aqua}`, background: 'rgba(15,255,168,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${C.aquaGlow}` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 8px ${C.aqua}` }} />
              </div>
              <span style={{ fontFamily: fm, fontSize: 8, letterSpacing: '.08em', textTransform: 'uppercase', color: C.muted, whiteSpace: 'nowrap' }}>{n}</span>
            </div>
            {i < nodes.length - 1 && (
              <svg style={{ flex: 1, height: 2, minWidth: 16, marginTop: 21 }} preserveAspectRatio="none" viewBox="0 0 100 2">
                <line x1="0" y1="1" x2="100" y2="1" stroke={C.aquaSub} strokeWidth="2" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" style={{ animation: 'flow 3s linear infinite' }} />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div style={{ fontFamily: fm, fontSize: 8, letterSpacing: '.16em', color: C.dim, marginBottom: 2 }}>CALIDAD DE DATOS</div>
        {quality.map(([l, v]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.08em', textTransform: 'uppercase', color: C.muted, width: 92 }}>{l}</span>
            <div style={{ flex: 1, height: 6, background: C.bg3, border: `1px solid ${C.border}`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${v}%`, background: `linear-gradient(90deg, ${C.aquaSub}, ${C.aqua})`, boxShadow: `0 0 8px ${C.aquaGlow}` }} />
            </div>
            <span style={{ fontFamily: fm, fontSize: 10, color: C.aqua, width: 32, textAlign: 'right' }}>{v}%</span>
          </div>
        ))}
      </div>
    </GraphicFrame>
  );
}

function ActivationGraphic() {
  const kpis = [['INGRESOS', '$3.7M', C.aqua], ['MoM', '+18%', C.aqua2], ['CHURN', '2.1%', C.blue]];
  const bars = [48, 66, 54, 82, 70, 95, 80];
  const acc = 94, r = 26, circ = 2 * Math.PI * r;
  return (
    <GraphicFrame label="Productos de datos · dashboard + ML">
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        {kpis.map(([l, v, c]) => (
          <div key={l} style={{ flex: 1, padding: '10px 12px', border: `1px solid ${C.border}`, background: C.bg3 }}>
            <div style={{ fontFamily: fm, fontSize: 7.5, letterSpacing: '.14em', color: C.dim }}>{l}</div>
            <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 22, color: c, lineHeight: 1.1 }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
        <div style={{ border: `1px solid ${C.border}`, background: C.bg3, padding: 12, display: 'flex', alignItems: 'flex-end', gap: 6, minHeight: 124 }}>
          {bars.map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: `linear-gradient(${C.aqua}, ${C.aquaSub})`, boxShadow: `0 0 8px ${C.aquaGlow}` }} />)}
        </div>
        <div style={{ border: `1px solid ${C.border}`, background: C.bg3, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <svg width="76" height="76" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke={C.border} strokeWidth="6" />
            <circle cx="36" cy="36" r={r} fill="none" stroke={C.aqua} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${circ * acc / 100} ${circ}`} transform="rotate(-90 36 36)" style={{ filter: `drop-shadow(0 0 4px ${C.aqua})` }} />
            <text x="36" y="37" fill={C.text} fontSize="15" fontFamily={fd} fontWeight="800" textAnchor="middle" dominantBaseline="central">{acc}%</text>
          </svg>
          <span style={{ fontFamily: fm, fontSize: 8.5, letterSpacing: '.1em', textTransform: 'uppercase', color: C.muted, textAlign: 'center', lineHeight: 1.4 }}>Precisión<br />del modelo</span>
        </div>
      </div>
    </GraphicFrame>
  );
}

function DetailHead({ label, title, accent = C.aqua }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fm, fontSize: 10.5, letterSpacing: '.32em', textTransform: 'uppercase', color: accent, marginBottom: 14 }}>
        <span style={{ width: 28, height: 1, background: accent }} />{label}
      </div>
      <h2 style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(28px,3.6vw,46px)', lineHeight: .96, textTransform: 'uppercase', letterSpacing: '-.01em', color: C.text, margin: 0 }}>{title}</h2>
    </div>
  );
}

function OtherSvcCard({ o }) {
  const [h, setH] = useState(false);
  return (
    <a href={`#/sol/${o.slug}`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, border: `1px solid ${h ? C.aqua : C.border}`, background: h ? C.surf : C.bg2, padding: '22px 24px', textDecoration: 'none', transition: 'all .25s' }}>
      <div>
        <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.2em', color: o.accent, marginBottom: 6 }}>{o.code}</div>
        <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 19, textTransform: 'uppercase', color: C.text, lineHeight: 1.05 }}>{o.title.replace('\n', ' ')}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ color: h ? C.aqua : C.dim, transform: h ? 'translate(3px,-3px)' : 'none', transition: 'all .25s', flexShrink: 0 }}>
        <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function ServiceDetail({ s, go }) {
  const d = s.detail, accent = s.accent, Graphic = d.Graphic;
  return (
    <main>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: C.bgDeep }}>
        <DataHelix />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(to right, ${C.bgDeep} 0%, rgba(10,10,12,.55) 45%, transparent 80%)` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to bottom, transparent, ${C.bg})`, pointerEvents: 'none' }} />
        <div className="do-pad" style={{ position: 'relative', zIndex: 10, maxWidth: 1400, width: '100%', margin: '0 auto', padding: '150px 64px 90px' }}>
          <a href="#servicios" onClick={(e) => { e.preventDefault(); go('servicios'); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fm, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted, textDecoration: 'none', marginBottom: 30 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M6.5 3L2 7l4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Volver a soluciones
          </a>
          <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}` }} />
                <span style={{ fontFamily: fm, fontSize: 11, letterSpacing: '.24em', color: accent }}>{s.code}</span>
              </div>
              <h1 style={{ fontFamily: fd, fontWeight: 900, fontSize: 'clamp(40px,6vw,78px)', lineHeight: .9, textTransform: 'uppercase', letterSpacing: '-.015em', color: C.white, margin: '0 0 26px', whiteSpace: 'pre-line' }}>{s.title}</h1>
              <p style={{ fontFamily: fb, fontSize: 'clamp(15px,1.5vw,19px)', fontWeight: 300, lineHeight: 1.6, color: C.text, maxWidth: 520, margin: '0 0 32px' }}>{d.tagline}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 34 }}>
                {s.tags.map(t => <span key={t} style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: C.muted, border: `1px solid ${C.border}`, padding: '5px 10px' }}>{t}</span>)}
              </div>
              <BtnPrimary href="#contacto" onClick={(e) => { e.preventDefault(); go('contacto'); }}>
                Hablar con el equipo
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 7h10M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </BtnPrimary>
            </div>
            <div className="do-hide-mobile"><Graphic /></div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="do-pad" style={{ background: C.bg, padding: '90px 64px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: fb, fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 300, lineHeight: 1.6, color: C.text, margin: 0 }}>{d.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* QUÉ RESUELVE */}
      <section className="do-pad" style={{ background: C.bg, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal><DetailHead label="El problema" title="Qué resuelve" accent={accent} /></Reveal>
          <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {d.solves.map((it, i) => (
              <Reveal key={it.t} delay={i * 70} style={{ height: '100%' }}>
                <div style={{ position: 'relative', height: '100%', border: `1px solid ${C.border}`, background: C.bg2, padding: '28px 28px' }}>
                  <Brackets size={11} inset={9} color={C.border} />
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontFamily: fm, fontSize: 11, color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: 21, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, margin: 0 }}>{it.t}</h3>
                  </div>
                  <p style={{ fontFamily: fb, fontSize: 14, lineHeight: 1.65, color: C.muted, margin: 0 }}>{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO LO APLICAMOS */}
      <section className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg} 0%, ${C.bg2} 100%)`, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal><DetailHead label="El método" title="Cómo lo aplicamos" accent={accent} /></Reveal>
          {d.steps.map((it, i) => (
            <Reveal key={it.t} delay={i * 70}>
              <div style={{ display: 'flex', gap: 26, paddingBottom: i < d.steps.length - 1 ? 34 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: '50%', border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fd, fontWeight: 800, fontSize: 18, color: accent, background: C.bg }}>{i + 1}</div>
                  {i < d.steps.length - 1 && <div style={{ width: 1, flex: 1, background: `linear-gradient(${accent}, ${C.border})`, marginTop: 6 }} />}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: 24, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, margin: '0 0 8px' }}>{it.t}</h3>
                  <p style={{ fontFamily: fb, fontSize: 15, lineHeight: 1.65, color: C.muted, margin: 0, maxWidth: 660 }}>{it.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="do-pad" style={{ background: C.bg2, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal><DetailHead label="Audiencia" title="Para quién" accent={accent} /></Reveal>
          <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {d.audiences.map((it, i) => (
              <Reveal key={it.t} delay={i * 70} style={{ height: '100%' }}>
                <div style={{ position: 'relative', height: '100%', border: `1px solid ${C.border}`, background: C.bg, padding: '30px 26px' }}>
                  <div style={{ width: 36, height: 36, marginBottom: 18, border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
                  </div>
                  <h3 style={{ fontFamily: fd, fontWeight: 700, fontSize: 22, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text, margin: '0 0 10px' }}>{it.t}</h3>
                  <p style={{ fontFamily: fb, fontSize: 14, lineHeight: 1.65, color: C.muted, margin: 0 }}>{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      {d.outcomes.length > 0 && (
        <section className="do-pad" style={{ background: C.bg, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '0 64px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
            {d.outcomes.map((o, i) => (
              <div key={o.k} style={{ flex: 1, minWidth: 220, padding: '40px 32px', borderLeft: i > 0 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(30px,4vw,46px)', lineHeight: 1, color: accent, marginBottom: 12 }}>{o.v}</div>
                <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted }}>{o.k}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA + otras soluciones */}
      <section className="do-pad" style={{ background: C.bg, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal>
            <div style={{ position: 'relative', border: `1px solid ${C.borderHi}`, background: `linear-gradient(135deg, ${C.bg2}, ${C.bgDeep})`, padding: 'clamp(40px,6vw,72px)', textAlign: 'center', marginBottom: 64 }}>
              <Brackets size={18} inset={14} color={accent} />
              <h2 style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(30px,4.5vw,56px)', lineHeight: .98, textTransform: 'uppercase', color: C.text, margin: '0 0 20px' }}>¿Lo llevamos a tu negocio?</h2>
              <p style={{ fontFamily: fb, fontSize: 16, lineHeight: 1.6, color: C.muted, maxWidth: 520, margin: '0 auto 32px' }}>Contanos dónde estás parado. Diagnosticamos sin costo y te mostramos el camino más corto al valor.</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BtnPrimary href="#contacto" onClick={(e) => { e.preventDefault(); go('contacto'); }}>Hablar con el equipo</BtnPrimary>
              </div>
            </div>
          </Reveal>
          <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: C.dim, marginBottom: 20 }}>Otras soluciones</div>
          <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {SVCS.filter(o => o.slug !== s.slug).map(o => <OtherSvcCard key={o.slug} o={o} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ═══════════════════════════════════════════════════════
   PROCESS — Spec-Driven Development: 5 actions linked in a
   continuous 3D loop around a central living SPEC.
   ESPECIFICAR → PLANIFICAR → DISEÑAR → CONSTRUIR → TESTEAR → ↺
═══════════════════════════════════════════════════════ */

/* connected 3D graph: 5 actions linked in a loop, descriptions in-node,
   animated flowing edges + traveling packets + auto-cycling highlight */
const SDD_FLOW = [
  { code: '01', key: 'ESPECIFICAR', desc: 'Definimos qué y por qué. La spec es la fuente de verdad.' },
  { code: '02', key: 'PLANIFICAR', desc: 'Arquitectura y plan derivados directo de la spec.' },
  { code: '03', key: 'DISEÑAR', desc: 'Modelo de datos y contratos antes de escribir código.' },
  { code: '04', key: 'CONSTRUIR', desc: 'Implementación trazable y asistida por IA.' },
  { code: '05', key: 'TESTEAR', desc: 'Validamos contra la spec. Si cambia, el ciclo se repite ↺.' },
];
function SDDGraph() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SDD_FLOW.length), 3600);
    return () => clearInterval(id);
  }, []);
  const W = 900, H = 600, cx = 450, cy = 300, rx = 300, ry = 190;
  const PUSH = 116; // distancia radial card afuera del vértice
  const pos = (i) => {
    const ang = (-90 + i * (360 / SDD_FLOW.length)) * Math.PI / 180;
    return { x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
  };
  const edges = SDD_FLOW.map((_, i) => ({ a: pos(i), b: pos((i + 1) % SDD_FLOW.length), i }));
  const loopPath = SDD_FLOW.map((_, i) => { const p = pos(i); return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`; }).join(' ') + ' Z';
  const cw = 200;
  return (
    <div style={{ position: 'relative', height: 540, perspective: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', maxWidth: W }}>
      <div style={{ position: 'relative', width: W, height: H, transformStyle: 'preserve-3d', transform: 'rotateX(52deg)' }}>
        {/* edges: pentagon loop + center spokes + traveling packets */}
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {/* faint spokes to hub */}
          {SDD_FLOW.map((_, i) => { const p = pos(i); return <line key={`s${i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={C.aqua} strokeWidth="1" strokeOpacity={active === i ? .4 : .12} strokeDasharray="2 5" />; })}
          {/* loop connections */}
          {edges.map((e) => (
            <path key={`e${e.i}`} d={`M ${e.a.x} ${e.a.y} L ${e.b.x} ${e.b.y}`} fill="none"
              stroke={active === e.i || active === (e.i + 1) % SDD_FLOW.length ? C.aqua : C.borderHi}
              strokeWidth={active === e.i ? 2 : 1.2} strokeOpacity={active === e.i ? .9 : .5}
              strokeDasharray="6 10" style={{ animation: 'flow 3s linear infinite', transition: 'stroke .3s, stroke-width .3s' }} />
          ))}
          {/* leader lines vertex → card (outward) */}
          {SDD_FLOW.map((_, i) => { const p = pos(i); const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1; const ex = p.x + (dx / d) * (PUSH - 22), ey = p.y + (dy / d) * (PUSH - 22); const on = active === i; return <line key={`l${i}`} x1={p.x} y1={p.y} x2={ex} y2={ey} stroke={C.aqua} strokeWidth="1" strokeOpacity={on ? .7 : .3} style={{ transition: 'stroke-opacity .3s' }} />; })}
          {/* vertex markers */}
          {SDD_FLOW.map((_, i) => { const p = pos(i); const on = active === i; return <circle key={`v${i}`} cx={p.x} cy={p.y} r={on ? 6 : 4} fill={on ? C.aqua : C.bg} stroke={C.aqua} strokeWidth="1.5" style={{ filter: on ? `drop-shadow(0 0 6px ${C.aqua})` : 'none', transition: 'all .3s' }} />; })}
        </svg>

        {/* uniform-speed packets via CSS Motion Path (GPU, fully fluid) */}
        {Array.from({ length: 6 }).map((_, k) => (
          <div key={`pk${k}`} style={{
            position: 'absolute', top: 0, left: 0, width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
            borderRadius: '50%', background: C.aqua, boxShadow: `0 0 8px 1px ${C.aqua}`, pointerEvents: 'none',
            offsetPath: `path('${loopPath}')`, offsetRotate: '0deg',
            animation: 'do-orbit 11s linear infinite', animationDelay: `-${(k * 11 / 6).toFixed(2)}s`,
          }} />
        ))}

        {/* center hub */}
        <div style={{ position: 'absolute', left: cx - 46, top: cy - 46, width: 92, height: 92, transformStyle: 'preserve-3d', transform: 'translateZ(78px)' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px solid ${C.aqua}`, background: 'rgba(15,255,168,.08)', boxShadow: `0 0 48px ${C.aquaGlow}`, animation: 'pulse-glow 3s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotateX(-52deg)' }}>
            <span style={{ fontFamily: fd, fontWeight: 800, fontSize: 24, letterSpacing: '.1em', color: C.aqua, lineHeight: 1 }}>SDD</span>
            <span style={{ fontFamily: fm, fontSize: 7.5, letterSpacing: '.16em', color: C.muted, marginTop: 4, textTransform: 'uppercase' }}>spec-driven</span>
          </div>
        </div>

        {/* action nodes with descriptions */}
        {SDD_FLOW.map((n, i) => {
          const p = pos(i), on = active === i;
          const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1;
          const cardX = p.x + (dx / d) * PUSH, cardY = p.y + (dy / d) * PUSH;
          return (
            <div key={n.key} onMouseEnter={() => setActive(i)}
              style={{ position: 'absolute', left: cardX - cw / 2, top: cardY - 56, width: cw, transformStyle: 'preserve-3d', transform: `translateZ(${on ? 60 : 18}px)`, transition: 'transform .45s cubic-bezier(.16,1,.3,1)', cursor: 'pointer' }}>
              <div style={{ transform: 'rotateX(-52deg)', transformOrigin: 'center top', border: `1px solid ${on ? C.aqua : C.borderHi}`, background: on ? 'rgba(15,255,168,.07)' : 'rgba(20,20,24,.88)', boxShadow: on ? `0 0 40px ${C.aquaGlow}` : '0 12px 28px rgba(0,0,0,.4)', padding: '16px 17px', transition: 'all .35s', backdropFilter: 'blur(2px)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 7 }}>
                  <span style={{ fontFamily: fm, fontSize: 10.5, letterSpacing: '.18em', color: on ? C.aqua : C.dim, transition: 'color .3s' }}>{n.code}</span>
                  <span style={{ fontFamily: fd, fontWeight: 700, fontSize: 19, textTransform: 'uppercase', letterSpacing: '.04em', color: on ? C.text : C.muted, lineHeight: 1, transition: 'color .3s' }}>{n.key}</span>
                </div>
                <p style={{ fontFamily: fb, fontSize: 13, lineHeight: 1.5, color: on ? C.text : C.muted, margin: 0, transition: 'color .3s' }}>{n.desc}</p>
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
  return (
    <section ref={ref} className="do-pad" style={{ background: C.bg, padding: '72px 64px' }} id="proceso">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <SectionHeader num="03" label="Metodología" title={<>Cómo<br />trabajamos</>} style={{ marginBottom: 20, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 1.2s ease' }} />

        {/* SDD callout */}
        <div style={{ position: 'relative', border: `1px solid ${C.border}`, background: C.bg2, padding: '22px 28px', marginBottom: 24, maxWidth: 820, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'all 1.2s ease .4s' }}>
          <Brackets size={12} inset={9} color={C.aqua} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: fm, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: C.aqua, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 8px ${C.aqua}` }} />
            Spec-Driven Development
          </div>
          <p style={{ fontFamily: fb, fontSize: 15.5, lineHeight: 1.7, color: C.text, margin: 0 }}>
            Cada proyecto nace de una <strong style={{ color: C.aqua, fontWeight: 500 }}>especificación viva y versionada</strong> que actúa como fuente de verdad. De ella derivan el plan, la implementación y la verificación — no al revés. Specs ejecutables, trazables y listas para automatización con IA, que mantienen alineados a equipo, código y datos.
          </p>
        </div>

        {/* connected flow graph — 5 actions linked, animated */}
        <div style={{ marginTop: 0, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 1.8s ease .35s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: fm, fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: C.aqua, marginBottom: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.aqua, boxShadow: `0 0 8px ${C.aqua}` }} />
            Flujo conectado
          </div>
          <p style={{ fontFamily: fb, fontSize: 14, lineHeight: 1.5, color: C.muted, margin: '0 0 4px', maxWidth: 560 }}>
            Las cinco acciones encadenadas en un ciclo continuo, derivadas de la spec central.
          </p>
          <SDDGraph />
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
  { name: 'Google Cloud', slug: 'googlecloud', cat: 'CLOUD', info: 'Plataforma cloud nativa, base de toda la infraestructura.',
    detail: 'Toda nuestra arquitectura corre sobre Google Cloud: cómputo, almacenamiento, red y servicios gestionados. Diseñamos entornos seguros, escalables y con costos bajo control.',
    points: ['Infraestructura gestionada con IAM y redes privadas', 'Escalado elástico según la carga real', 'Costos optimizados con presupuestos y alertas'] },
  { name: 'BigQuery', slug: 'googlebigquery', cat: 'WAREHOUSE', info: 'Data warehouse serverless para análisis a escala.',
    detail: 'BigQuery es el corazón analítico: un warehouse serverless que consulta terabytes en segundos sin administrar servidores. Centralizamos el dato confiable para BI y modelos.',
    points: ['Consultas SQL a escala petabyte sin infra', 'Particionado y clustering para reducir costo', 'Capa semántica gobernada para toda la organización'] },
  { name: 'dbt', slug: 'dbt', cat: 'TRANSFORM', info: 'Modelado y transformación de datos versionada.',
    detail: 'Con dbt tratamos la transformación como software: modelos versionados, documentados, testeados y con linaje completo. El dato deja de ser una caja negra.',
    points: ['Modelos SQL versionados en Git', 'Tests de calidad y documentación automática', 'Linaje de extremo a extremo'] },
  { name: 'Apache Airflow', slug: 'apacheairflow', cat: 'ORCHESTRATION', info: 'Orquestación de pipelines y scheduling.',
    detail: 'Airflow orquesta los pipelines: define el orden correcto, dependencias, reintentos y horarios. Los procesos corren solos y de forma observable.',
    points: ['DAGs declarativos con dependencias claras', 'Reintentos y alertas ante fallos', 'Scheduling y backfills controlados'] },
  { name: 'Airbyte', slug: 'airbyte', cat: 'INGESTION', info: 'Ingesta y replicación de fuentes heterogéneas.',
    detail: 'Airbyte conecta cualquier fuente —bases, SaaS, APIs y archivos— hacia un único destino, sin código repetitivo de integración.',
    points: ['Cientos de conectores listos para usar', 'Replicación incremental y full refresh', 'Ingesta sin mantener scripts a medida'] },
  { name: 'Kubernetes', slug: 'kubernetes', cat: 'RUNTIME', info: 'Orquestación de contenedores, escalado elástico.',
    detail: 'Kubernetes corre nuestras cargas containerizadas con alta disponibilidad y escalado automático, desde servicios hasta jobs de procesamiento.',
    points: ['Autoescalado horizontal según demanda', 'Despliegues sin downtime', 'Aislamiento y portabilidad de cargas'] },
  { name: 'Terraform', slug: 'terraform', cat: 'IAC', info: 'Infraestructura como código, reproducible.',
    detail: 'Con Terraform toda la infraestructura es código: reproducible, versionada y auditable. Nada se configura a mano.',
    points: ['Entornos idénticos dev/staging/prod', 'Cambios revisados por pull request', 'Estado versionado y auditable'] },
  { name: 'Lenguajes', slug: 'languages', cat: 'LANGUAGES', info: 'Elegimos el lenguaje correcto para cada parte del stack.',
    detail: 'No casamos el problema con un solo lenguaje: usamos cada uno donde rinde mejor. Python para datos e IA, Rust para componentes críticos y JavaScript para la capa de producto.',
    langs: [
      { name: 'Python', slug: 'python', cat: 'DATA & AI',
        detail: 'Lenguaje núcleo: desde ETL y data engineering hasta machine learning y agentes de IA. Un ecosistema unificado de punta a punta.',
        points: ['ETL, ML e IA en un solo stack', 'Ecosistema maduro (pandas, FastAPI, LangChain)', 'Código testeado y mantenible'] },
      { name: 'Rust', slug: 'rust', cat: 'SYSTEMS',
        detail: 'Donde el rendimiento y la confiabilidad no se negocian: servicios de baja latencia, procesamiento intensivo y componentes críticos. Seguridad de memoria sin garbage collector.',
        points: ['Rendimiento nativo sin garbage collector', 'Seguridad de memoria garantizada en compilación', 'Servicios de baja latencia y alta concurrencia'] },
      { name: 'JavaScript', slug: 'javascript', cat: 'PRODUCT',
        detail: 'La capa de producto: interfaces web reactivas y APIs en Node. El mismo lenguaje de extremo a extremo en el frontend y el backend de aplicación.',
        points: ['Interfaces web modernas y reactivas', 'Full-stack con Node.js', 'Ecosistema enorme y veloz'] },
    ] },
  { name: 'FastAPI', slug: 'fastapi', cat: 'API', info: 'APIs de alto rendimiento para servir modelos.',
    detail: 'FastAPI expone modelos y datos como APIs de alto rendimiento, con validación de tipos y documentación automática.',
    points: ['APIs async de baja latencia', 'Validación y docs OpenAPI automáticas', 'Ideal para servir modelos de IA'] },
  { name: 'GitHub', slug: 'github', cat: 'VCS / CI', info: 'Control de versiones y pipelines de CI/CD.',
    detail: 'GitHub centraliza el código y automatiza CI/CD: cada cambio se revisa, se testea y se despliega de forma controlada.',
    points: ['Pull requests con revisión obligatoria', 'CI/CD con GitHub Actions', 'Trazabilidad completa del cambio'] },
  { name: 'PostgreSQL', slug: 'postgresql', cat: 'DATABASE', info: 'Base relacional robusta y confiable.',
    detail: 'PostgreSQL es nuestra base relacional de referencia: robusta, transaccional y confiable para cargas operacionales.',
    points: ['ACID y consistencia transaccional', 'Extensible (JSON, geoespacial, full-text)', 'Confiable para cargas críticas'] },
  { name: 'Looker', slug: 'looker', cat: 'BI', info: 'Business intelligence y dashboards gobernados.',
    detail: 'Looker entrega BI gobernado: una capa de métricas única para que toda la empresa lea el mismo número de verdad.',
    points: ['Métricas definidas una sola vez (LookML)', 'Dashboards gobernados y compartibles', 'Datos confiables para decidir'] },
  { name: 'LangChain', slug: 'langchain', cat: 'LLM FRAMEWORK', info: 'Orquestación de cadenas y agentes sobre LLMs.',
    detail: 'LangChain orquesta aplicaciones sobre LLMs: cadenas, herramientas, memoria y agentes que conectan modelos con datos y acciones reales.',
    points: ['Agentes con acceso a herramientas y datos', 'RAG sobre fuentes propias', 'Composición de cadenas reutilizables'] },
  { name: 'LangFuse', slug: 'langfuse', custom: true, cat: 'LLM OBSERVABILITY', info: 'Trazas, evals y monitoreo de aplicaciones LLM.',
    detail: 'LangFuse da observabilidad a las apps de IA: trazas de cada llamada, evaluaciones de calidad y monitoreo de costo y latencia en producción.',
    points: ['Trazas detalladas de prompts y respuestas', 'Evals de calidad y regresiones', 'Monitoreo de costo, latencia y uso'] },
  { name: 'Claude', slug: 'claude', cat: 'LLM', info: 'Modelo de lenguaje de Anthropic para razonamiento y agentes.',
    detail: 'Claude es nuestro LLM de referencia: razonamiento sólido, ventana de contexto amplia y uso de herramientas. Lo integramos en agentes, copilotos y flujos de análisis sobre datos propios.',
    points: ['Razonamiento y análisis de contexto largo', 'Tool use y agentes confiables', 'Integrado vía API y LangChain'] },
];

/* LangFuse has no Simple Icons entry — official brand mark, tinted monochrome to match the other cards */
function LangfuseMark({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flexShrink: 0, transition: 'fill .25s', fill: color }}>
      <path d="M11.925 14.781l1.823 1.465s1.395-1.036 2.421-1.188c1.076-.16 2.224.44 3.288 1.155 1.607 1.08 2.959 2.451 2.959 2.451L24 17.11s-4.367-4.732-7.83-4.304c-2.272.281-4.245 1.975-4.245 1.975z" />
      <path d="M1.494 5.757L0 7.401s4.164 3.886 7.442 3.886c1.494 0 3.567-1.171 5.35-2.692 1.016-.867 2.152-1.851 3.288-1.851.763 0 1.77.404 2.72 1.466 0 0 .612-.368.986-.632.328-.232.816-.627.816-.627-1.366-1.458-3.342-2.524-4.522-2.419-1.913 0-3.288 1.191-4.992 2.568-1.703 1.377-2.42 1.945-3.646 1.945-2.062 0-5.948-3.288-5.948-3.288z" />
      <path d="M1.494 18.278L0 16.635s4.164-3.886 7.442-3.886c1.494 0 3.567 1.17 5.35 2.692 1.016.866 2.152 1.851 3.288 1.851.767 0 1.766-.421 2.72-1.494 0 0 .573.353.926.597.363.252.897.667.897.667-1.367 1.47-3.357 2.547-4.543 2.442-1.913 0-3.049-1.014-4.752-2.391-1.704-1.377-2.66-2.122-3.886-2.122-2.062 0-5.948 3.287-5.948 3.287z" />
      <path d="M20.981 9.461c-.389.269-1.016.658-1.016.658s.359.777.359 1.823c0 1.046-.329 1.943-.329 1.943s.563.351.927.597c.377.256.956.688.956.688s.687-1.435.687-3.228c0-1.793-.687-3.138-.687-3.138s-.54.41-.897.657z" />
      <path d="M12.015 9.222l1.733-1.434s1.395 1.003 2.421 1.155c1.076.16 2.224-.44 3.288-1.155 1.607-1.08 2.959-2.451 2.959-2.451L24 6.89s-4.367 4.732-7.83 4.304c-2.272-.28-4.155-1.973-4.155-1.973z" />
      <path d="M7.83 4.5c2.242 0 4.125 1.913 4.125 1.913s-.524.413-.867.687c-.357.286-.926.747-.926.747S9.176 6.801 7.83 6.801c-.552 0-1.268.332-2.033.987-.59.505-1.203 1.133-1.613 1.912-.356.674-.55 1.468-.568 2.302-.024 1.047.347 2.145.956 3.018.408.586.895 1.027 1.405 1.405.661.491 1.351.837 1.853.837.536 0 1.017-.186 1.375-.358.568-.33 1.016-.718 1.016-.718l1.763 1.465s-.717.717-1.703 1.255c-.638.314-1.456.628-2.451.628-.994 0-2.148-.528-3.228-1.345-.698-.528-1.382-1.154-1.913-1.913-.87-1.244-1.318-2.758-1.315-4.274A7.568 7.568 0 012.75 7.698C4.125 5.905 6.158 4.5 7.83 4.5z" />
    </svg>
  );
}

function TechLogo({ t, color, size = 28 }) {
  if (t.custom) return <LangfuseMark color={color} size={size} />;
  const url = `https://cdn.simpleicons.org/${t.slug}`;
  return (
    <span aria-hidden style={{
      width: size, height: size, display: 'block', flexShrink: 0, background: color, transition: 'background .25s',
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

function TechCard({ t, i, delay, onOpen }) {
  const [h, setH] = useState(false);
  const idx = String(i + 1).padStart(2, '0');
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={() => onOpen(t)}
      role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(t); } }}
      style={{ position: 'relative', border: `1px solid ${h ? C.aqua : C.border}`, background: h ? C.surf : C.bg2, padding: '22px 22px 18px', minHeight: 196, display: 'flex', flexDirection: 'column', boxShadow: h ? `0 18px 44px -12px rgba(0,0,0,.6), 0 0 32px ${C.aquaGlow}` : 'none', transform: h ? 'translateY(-6px)' : 'none', transition: 'all .25s', cursor: 'pointer' }}>
      <Brackets size={11} inset={7} color={h ? C.aqua : 'transparent'} />

      {/* annotation row: index + crosshair registration mark */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <span style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.2em', color: h ? C.aqua : C.dim, transition: 'color .25s' }}>[{idx}]</span>
        <Crosshair color={h ? C.aqua : C.dim} />
      </div>

      {/* logo + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        {t.langs
          ? <div style={{ display: 'flex', gap: 8 }}>{t.langs.map(l => <TechLogo key={l.slug} t={l} color={h ? C.aqua : C.muted} size={22} />)}</div>
          : <TechLogo t={t} color={h ? C.aqua : C.muted} />}
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
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} /> {h ? 'ver detalle +' : 'ready'}
        </span>
      </div>
    </div>
  );
}

function TechModal({ t, onClose }) {
  const [li, setLi] = useState(0);
  const active = t.langs ? t.langs[li] : t;
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        background: 'rgba(8,8,10,.78)', backdropFilter: 'blur(6px)', animation: 'do-overlay-in .25s ease' }}>
      <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={t.name}
        style={{ position: 'relative', width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto',
          background: `linear-gradient(160deg, ${C.bg2}, ${C.bgDeep})`, border: `1px solid ${C.aqua}`,
          boxShadow: `0 40px 120px -20px #000, 0 0 60px -10px ${C.aquaGlow}`, padding: '40px 40px 34px',
          animation: 'do-modal-in .35s cubic-bezier(.16,1,.3,1)' }}>
        <Brackets size={16} inset={9} color={C.aqua} />

        {/* close button */}
        <button onClick={onClose} aria-label="Cerrar"
          style={{ position: 'absolute', top: 16, right: 16, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: `1px solid ${C.border}`, color: C.muted, cursor: 'pointer', fontFamily: fm, fontSize: 16, lineHeight: 1, transition: 'all .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.aqua; e.currentTarget.style.color = C.aqua; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}>×</button>

        {/* logo + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: t.langs ? 22 : 24 }}>
          <div style={{ filter: `drop-shadow(0 0 10px ${C.aquaGlow})`, display: 'flex', gap: 12 }}>
            {t.langs
              ? t.langs.map(l => <TechLogo key={l.slug} t={l} color={C.aqua} size={40} />)
              : <TechLogo t={t} color={C.aqua} size={54} />}
          </div>
          <div>
            <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 34, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '.02em', color: C.text }}>{t.name}</div>
            <div style={{ fontFamily: fm, fontSize: 10, letterSpacing: '.22em', color: C.aqua, marginTop: 7 }}>{t.cat}</div>
          </div>
        </div>

        <p style={{ fontFamily: fb, fontSize: 15.5, lineHeight: 1.7, color: C.text, margin: '0 0 24px' }}>{t.detail || t.info}</p>

        {/* language tabs */}
        {t.langs && (
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: `1px solid ${C.border}` }}>
            {t.langs.map((l, k) => (
              <button key={l.slug} onClick={() => setLi(k)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '10px 16px', marginBottom: -1, borderBottom: `2px solid ${li === k ? C.aqua : 'transparent'}`,
                  fontFamily: fm, fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
                  color: li === k ? C.aqua : C.muted, transition: 'all .2s' }}>
                <TechLogo t={l} color={li === k ? C.aqua : C.muted} size={16} />
                {l.name}
              </button>
            ))}
          </div>
        )}

        {/* active (per-language when langs) detail */}
        {t.langs && (
          <p style={{ fontFamily: fb, fontSize: 14.5, lineHeight: 1.7, color: C.text, margin: '0 0 22px' }}>{active.detail}</p>
        )}

        {active.points && (
          <>
            <div style={{ fontFamily: fm, fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: C.dim, marginBottom: 14, paddingTop: 18, borderTop: `1px dashed ${C.border}` }}>Cómo lo usamos</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {active.points.map((p, k) => (
                <li key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: fb, fontSize: 14, lineHeight: 1.55, color: C.muted }}>
                  <span style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, background: C.aqua, boxShadow: `0 0 8px ${C.aqua}`, transform: 'rotate(45deg)' }} />
                  {p}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* footer ref tag */}
        <div style={{ marginTop: 30, paddingTop: 14, borderTop: `1px dashed ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: fm, fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.dim }}>
          <span>└─ stack.{active.slug}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.aqua }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} /> in production
          </span>
        </div>
      </div>
    </div>
  );
}

function TechStack() {
  const [ref, vis] = useReveal();
  const [sel, setSel] = useState(null);
  return (
    <section ref={ref} className="do-pad" style={{ background: `linear-gradient(to bottom, ${C.bg} 0%, ${C.bg} 80%, ${C.bg3} 100%)`, padding: '110px 64px' }} id="stack">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 56, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 1.2s ease' }}>
          <SectionHeader num="04" label="Stack tecnológico" title={<>Las herramientas<br />que dominamos</>} />
          {/* blueprint annotation caption */}
          <div style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.dim, textAlign: 'right', lineHeight: 1.8 }}>
            <div>● {TECHS.length} COMPONENTES</div>
            <div>SPEC / annotated · v.2.1</div>
            <div>scale 1:1 · units = stack</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14, opacity: vis ? 1 : 0, transition: 'opacity 1.2s ease .4s' }}>
          {TECHS.map((t, i) => <TechCard key={t.slug} t={t} i={i} delay={i * 60} onOpen={setSel} />)}
        </div>
      </div>
      {sel && <TechModal t={sel} onClose={() => setSel(null)} />}
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
        <SectionHeader num="05" label="Contacto" title="Hablemos" style={{ marginBottom: 72, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 1.2s ease' }} />
        <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100 }}>
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-24px)', transition: 'all 1.2s ease' }}>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {qs.map((q, i) => <CQuestion key={i} text={q} />)}
            </div>
            <p style={{ marginTop: 40, fontFamily: fm, fontSize: 13, color: C.aqua, letterSpacing: '.06em' }}>info@dataoilers.com</p>
            <p style={{ marginTop: 8, fontFamily: fm, fontSize: 10, color: C.dim, letterSpacing: '.18em', textTransform: 'uppercase' }}>LAT –32.89° / LON –68.85° · MENDOZA, AR</p>
          </div>
          <div style={{ position: 'relative', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(24px)', transition: 'all 1.2s ease .4s' }}>
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
        {items.map(it => Array.isArray(it)
          ? <FooterLink key={it[0]} label={it[0]} href={it[1]} />
          : <FooterLink key={it} label={it} />)}
      </div>
    </div>
  );
}
function FooterLink({ label, href = '#' }) {
  const [h, setH] = useState(false);
  return <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    style={{ fontFamily: fb, fontSize: 14, color: h ? C.aqua : C.muted, textDecoration: 'none', transition: 'color .2s' }}>{label}</a>;
}
function Footer() {
  return (
    <footer className="do-pad" style={{ background: C.bgDeep, padding: '72px 64px 32px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="do-grid2" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
              <Logo height={34} />
            </div>
            <p style={{ fontFamily: fb, fontSize: 14, lineHeight: 1.7, color: C.muted, maxWidth: 300, margin: 0 }}>Refinería de datos en el espacio profundo. Infraestructura de datos e IA productiva, de la estrategia a la activación.</p>
          </div>
          <FooterCol title="Soluciones" items={[['Estrategia', '#/sol/estrategia'], ['Infraestructura', '#/sol/infraestructura'], ['Ingeniería', '#/sol/ingenieria'], ['Activación', '#/sol/activacion']]} />
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
/* ═══════════════════════════════════════════════════════
   SPLASH SCREEN — logo reveal intro (once per session)
═══════════════════════════════════════════════════════ */
function Splash({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const HOLD = reduce ? 700 : 1900;   // visible time
  const FADE = reduce ? 250 : 600;    // fade-out time

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), HOLD);
    const t2 = setTimeout(onDone, HOLD + FADE);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div aria-hidden="true" style={{
      position: 'fixed', inset: 0, zIndex: 100000,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22,
      background: C.bgDeep,
      animation: leaving ? `do-splash-out ${FADE}ms ease forwards` : 'none',
    }}>
      <div style={{ animation: reduce ? 'none' : 'do-splash-logo 1.2s cubic-bezier(.16,1,.3,1) forwards' }}>
        <Logo height={52} />
      </div>
      <div style={{
        width: 180, height: 1, background: `linear-gradient(to right, transparent, ${C.aqua}, transparent)`,
        transformOrigin: 'center', boxShadow: `0 0 10px ${C.aquaGlow}`,
        animation: reduce ? 'none' : 'do-splash-line 1.4s cubic-bezier(.16,1,.3,1) forwards',
      }} />
      <span style={{ fontFamily: fm, fontSize: 9.5, letterSpacing: '.34em', textTransform: 'uppercase', color: C.dim }}>
        Refinando datos
      </span>
    </div>
  );
}

export default function DataOilers() {
  useGlobalStyles();
  const route = useHashRoute();
  const pendingScroll = useRef(null);
  const m = route.match(/^#\/sol\/([\w-]+)/);
  const svc = m ? SVC_BY_SLUG[m[1]] : null;

  const [splash, setSplash] = useState(() =>
    typeof window !== 'undefined' && !sessionStorage.getItem('do-splash-seen'));
  const dismissSplash = () => { sessionStorage.setItem('do-splash-seen', '1'); setSplash(false); };

  const [active, setActive] = useState(null);
  useEffect(() => {
    if (svc) { setActive(null); return; }
    const ids = ['servicios', 'red', 'proceso', 'stack', 'contacto'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [svc]);

  const go = (sectionId) => {
    if (window.location.hash.startsWith('#/sol/')) {
      pendingScroll.current = sectionId || null;
      window.location.hash = '';            // → hashchange → render landing
    } else if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (svc) {
      window.scrollTo(0, 0);
    } else if (pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView()));
    }
  }, [route, svc]);

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', overflowX: 'hidden', margin: 0, padding: 0 }}>
      {splash && <Splash onDone={dismissSplash} />}
      <div className="do-mesh" aria-hidden="true" />
      <div className="do-grain" aria-hidden="true" />
      <Nav go={go} active={active} />
      <div className="do-landing" style={{ margin: 0, padding: 0 }}>
        {svc ? (
          <ServiceDetail s={svc} go={go} />
        ) : (
          <>
            <Hero />
            <Constellation />
            <Services />
            <ProcessIso />
            <TechStack />
            <Contact />
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}
