'use strict';
/* =========================================================
   Cursor de espada + efeito de clique: raios vermelhos, arcos de corte,
   onda de choque e faíscas em "+". Uma camada <canvas> por cima de tudo,
   que só anima enquanto há efeitos vivos.
   ========================================================= */
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cv = document.createElement('canvas');
  cv.className = 'fx-layer'; cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cv);
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, running = false;
  const fx = [];

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize(); addEventListener('resize', resize);

  const R = (a, b) => a + Math.random() * (b - a);

  // Raio: linha quebrada por deslocamento de pontos médios, com ramificações
  function bolt(x0, y0, x1, y1, rough, depth) {
    let pts = [[x0, y0], [x1, y1]];
    let off = rough;
    for (let it = 0; it < 4; it++) {
      const next = [pts[0]];
      for (let k = 1; k < pts.length; k++) {
        const [ax, ay] = pts[k - 1], [bx, by] = pts[k];
        const mx = (ax + bx) / 2, my = (ay + by) / 2, dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1;
        const d = R(-off, off);
        next.push([mx - (dy / L) * d, my + (dx / L) * d], pts[k]);
      }
      pts = next; off /= 2;
    }
    const branches = [];
    if (depth > 0) {
      const n = Math.random() < 0.7 ? 1 : 2;
      for (let b = 0; b < n; b++) {
        const p = pts[Math.floor(R(pts.length * 0.3, pts.length * 0.8))];
        const ang = Math.atan2(y1 - y0, x1 - x0) + R(-0.9, 0.9), len = Math.hypot(x1 - x0, y1 - y0) * R(0.3, 0.55);
        branches.push(bolt(p[0], p[1], p[0] + Math.cos(ang) * len, p[1] + Math.sin(ang) * len, rough * 0.5, depth - 1));
      }
    }
    return { pts, branches };
  }
  function strokeBolt(b, width, color) {
    ctx.beginPath(); ctx.moveTo(b.pts[0][0], b.pts[0][1]);
    for (let k = 1; k < b.pts.length; k++) ctx.lineTo(b.pts[k][0], b.pts[k][1]);
    ctx.lineWidth = width; ctx.strokeStyle = color; ctx.stroke();
    b.branches.forEach((c) => strokeBolt(c, width * 0.6, color));
  }

  function spawn(x, y, big) {
    const now = performance.now();
    const n = big ? 7 : 5, bolts = [];
    const base = R(0, Math.PI * 2);
    for (let i = 0; i < n; i++) {
      const a = base + (i / n) * Math.PI * 2 + R(-0.35, 0.35), len = R(46, big ? 115 : 88);
      bolts.push(bolt(x + Math.cos(a) * 6, y + Math.sin(a) * 6, x + Math.cos(a) * len, y + Math.sin(a) * len, len * 0.28, 1));
    }
    const slashRot = R(-0.6, 0.2);
    const plus = Array.from({ length: big ? 7 : 5 }, () => {
      const a = R(0, Math.PI * 2), sp = R(55, 140);
      return { a, sp, s: Math.round(R(2, 3.4)), gold: Math.random() < 0.3 };
    });
    fx.push({ x, y, t0: now, bolts, slashRot, plus, big });
    if (!running) { running = true; requestAnimationFrame(loop); }
  }

  function draw(e, now) {
    const t = (now - e.t0) / 1000;                 // segundos desde o clique
    const { x, y } = e;
    // 1) clarão central
    if (t < 0.12) {
      const k = 1 - t / 0.12, s = 10 + 26 * (1 - k);
      const g = ctx.createRadialGradient(x, y, 0, x, y, s);
      g.addColorStop(0, `rgba(255,240,220,${0.95 * k})`); g.addColorStop(0.35, `rgba(255,60,70,${0.7 * k})`); g.addColorStop(1, 'rgba(166,25,36,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2); ctx.fill();
    }
    // 2) raios (piscam e somem em ~0,32 s)
    if (t < 0.4) {
      const k = Math.pow(1 - t / 0.4, 0.7), flick = 0.6 + 0.4 * Math.random();
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(255,30,45,1)'; ctx.shadowBlur = 22;
      e.bolts.forEach((b) => strokeBolt(b, 6 * k + 1, `rgba(166,25,36,${0.55 * k * flick})`));   // halo largo
      ctx.shadowBlur = 12;
      e.bolts.forEach((b) => strokeBolt(b, 3.4 * k + 0.6, `rgba(230,35,50,${k * flick})`));
      ctx.shadowBlur = 0;
      e.bolts.forEach((b) => strokeBolt(b, 1.3 * k + 0.3, `rgba(255,225,228,${k * flick})`));
      ctx.restore();
    }
    // 3) dois arcos de corte, como na arte da espada
    if (t < 0.38) {
      const p = Math.min(1, t / 0.16), k = t < 0.16 ? 1 : 1 - (t - 0.16) / 0.22;
      const r = (e.big ? 40 : 32) + 12 * p;
      ctx.save(); ctx.translate(x, y); ctx.rotate(e.slashRot);
      ctx.shadowColor = 'rgba(255,30,45,.9)'; ctx.shadowBlur = 10; ctx.lineCap = 'round';
      [[-Math.PI * 0.95, -Math.PI * 0.95 + 1.15 * p], [Math.PI * 0.05, Math.PI * 0.05 + 1.15 * p]].forEach(([a0, a1]) => {
        for (let s = 0; s < 3; s++) {                // traço "afinando" na ponta
          ctx.beginPath(); ctx.arc(0, 0, r, a0 + (a1 - a0) * s * 0.25, a1);
          ctx.lineWidth = (5.5 - s * 1.6) * k; ctx.strokeStyle = s === 2 ? `rgba(255,200,205,${k})` : `rgba(200,24,38,${k})`; ctx.stroke();
        }
      });
      ctx.restore();
    }
    // 4) onda de choque
    if (t < 0.4) {
      const p = t / 0.4;
      ctx.beginPath(); ctx.arc(x, y, 8 + 46 * (1 - Math.pow(1 - p, 3)), 0, Math.PI * 2);
      ctx.lineWidth = 2.5 * (1 - p); ctx.strokeStyle = `rgba(226,60,70,${0.8 * (1 - p)})`; ctx.stroke();
    }
    // 5) faíscas em "+" (pixel art)
    if (t < 0.55) {
      const k = 1 - t / 0.55, ease = 1 - Math.pow(1 - t / 0.55, 2);
      e.plus.forEach((q) => {
        const d = 12 + q.sp * ease * 0.55, px = Math.round(x + Math.cos(q.a) * d), py = Math.round(y + Math.sin(q.a) * d), s = q.s;
        ctx.fillStyle = q.gold ? `rgba(226,160,68,${k})` : `rgba(210,26,40,${k})`;
        ctx.fillRect(px - s, py - s * 3, s * 2, s * 6); ctx.fillRect(px - s * 3, py - s, s * 6, s * 2);
      });
    }
    return t < 0.56;
  }

  function loop() {
    const now = performance.now();
    ctx.clearRect(0, 0, W, H);
    for (let i = fx.length - 1; i >= 0; i--) if (!draw(fx[i], now)) fx.splice(i, 1);
    if (fx.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0, 0, W, H); }
  }

  // Clique: efeito + cursor de "golpe" enquanto o botão está pressionado
  const root = document.documentElement;
  let clearGolpe = null;
  addEventListener('pointerdown', (ev) => {
    if (ev.button !== 0 && ev.pointerType === 'mouse') return;
    const t = ev.target;
    if (t.closest && t.closest('textarea, input[type=text], input[type=date], select, [contenteditable]')) return; // não atrapalha a digitação
    const big = !!(t.closest && t.closest('.btn, button, a'));
    spawn(ev.clientX, ev.clientY, big);
    if (ev.pointerType === 'mouse') { root.classList.add('golpe'); clearTimeout(clearGolpe); clearGolpe = setTimeout(() => root.classList.remove('golpe'), 600); }
  }, { passive: true });
  addEventListener('pointerup', () => { clearTimeout(clearGolpe); clearGolpe = setTimeout(() => root.classList.remove('golpe'), 90); }, { passive: true });

  CALC.fx = { spawn };
})();
