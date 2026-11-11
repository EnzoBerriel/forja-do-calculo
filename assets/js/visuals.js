'use strict';
/* =========================================================
   Modelos animados — um por aula.
   Motor de gráficos em <canvas> + componente com play/pausa/controle deslizante.
   Cada cena: { title, caption, param:{min,max,init,label,step}, duration, mode, draw(g) }
   draw recebe g = { ctx, W, H, t, C, plot(rect, view), fmt } e devolve [[rótulo, valor], ...]
   ========================================================= */
(function () {
  const ui = CALC.ui, esc = CALC.esc;

  /* ---------------- Utilidades ---------------- */
  const fmt = (v, d) => {
    if (!isFinite(v)) return v > 0 ? '∞' : v < 0 ? '−∞' : '—';
    const s = (Math.abs(v) < 1e-9 ? 0 : v).toFixed(d == null ? 3 : d).replace('.', ',');
    return s.replace('-', '−');
  };
  const simpson = (f, a, b, n) => {
    n = n || 200; if (a === b) return 0;
    const h = (b - a) / n; let s = f(a) + f(b);
    for (let k = 1; k < n; k++) s += f(a + k * h) * (k % 2 ? 4 : 2);
    return s * h / 3;
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function niceStep(range) {
    const raw = range / 7, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }
  function colors() {
    const cs = getComputedStyle(document.documentElement), g = (n) => cs.getPropertyValue(n).trim();
    return {
      bg: g('--code-bg'), text: g('--text'), text2: g('--text-2'), muted: g('--muted'), border: g('--border'),
      red: g('--red-text'), redFill: g('--red'), gold: g('--gold'), goldText: g('--gold-text'), silver: g('--silver'),
      light: document.documentElement.dataset.theme === 'light',
    };
  }
  const alpha = (hex, a) => {
    const h = hex.replace('#', ''); if (h.length !== 6) return hex;
    return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
  };

  /* ---------------- Plotador ---------------- */
  function makePlot(ctx, rect, view, C) {
    const [x0, x1] = view.x, [y0, y1] = view.y;
    const X = (x) => rect.x + ((x - x0) / (x1 - x0)) * rect.w;
    const Y = (y) => rect.y + rect.h - ((y - y0) / (y1 - y0)) * rect.h;
    const P = { X, Y, rect, view };
    P.clip = (fn) => { ctx.save(); ctx.beginPath(); ctx.rect(rect.x, rect.y, rect.w, rect.h); ctx.clip(); fn(); ctx.restore(); };
    P.axes = (o) => {
      o = o || {};
      const sx = o.stepX || niceStep(x1 - x0), sy = o.stepY || niceStep(y1 - y0);
      ctx.save(); ctx.lineWidth = 1; ctx.strokeStyle = alpha(C.light ? '#b7a684' : '#55555e', .35);
      ctx.beginPath();
      for (let x = Math.ceil(x0 / sx) * sx; x <= x1; x += sx) { ctx.moveTo(Math.round(X(x)) + .5, rect.y); ctx.lineTo(Math.round(X(x)) + .5, rect.y + rect.h); }
      for (let y = Math.ceil(y0 / sy) * sy; y <= y1; y += sy) { ctx.moveTo(rect.x, Math.round(Y(y)) + .5); ctx.lineTo(rect.x + rect.w, Math.round(Y(y)) + .5); }
      ctx.stroke();
      ctx.strokeStyle = C.muted; ctx.lineWidth = 1.5; ctx.beginPath();
      if (y0 <= 0 && y1 >= 0) { ctx.moveTo(rect.x, Y(0)); ctx.lineTo(rect.x + rect.w, Y(0)); }
      if (x0 <= 0 && x1 >= 0) { ctx.moveTo(X(0), rect.y); ctx.lineTo(X(0), rect.y + rect.h); }
      ctx.stroke();
      ctx.fillStyle = C.muted; ctx.font = '14px VT323, monospace';
      const yAxis = clamp(Y(0), rect.y + 12, rect.y + rect.h - 2), xAxis = clamp(X(0), rect.x + 2, rect.x + rect.w - 24);
      if (!o.noLabels) {
        ctx.textAlign = 'center';
        for (let x = Math.ceil(x0 / sx) * sx; x <= x1 + 1e-9; x += sx) if (Math.abs(x) > 1e-9) ctx.fillText(o.fmtX ? o.fmtX(x) : fmt(x, sx < 1 ? 1 : 0), X(x), yAxis + 13);
        ctx.textAlign = 'left';
        for (let y = Math.ceil(y0 / sy) * sy; y <= y1 + 1e-9; y += sy) if (Math.abs(y) > 1e-9) ctx.fillText(fmt(y, sy < 1 ? 1 : 0), xAxis + 4, Y(y) + 4);
      }
      if (o.xName) { ctx.textAlign = 'right'; ctx.fillText(o.xName, rect.x + rect.w - 4, yAxis - 5); }
      if (o.yName) { ctx.textAlign = 'left'; ctx.fillText(o.yName, xAxis + 5, rect.y + 13); }
      ctx.restore();
    };
    P.fn = (f, color, lw, a, b, dash) => {
      a = a == null ? x0 : a; b = b == null ? x1 : b;
      const n = Math.max(40, Math.ceil(((X(b) - X(a)) / 1.5)));
      P.clip(() => {
        ctx.strokeStyle = color; ctx.lineWidth = lw || 2.5; ctx.lineJoin = 'round'; ctx.setLineDash(dash || []);
        ctx.beginPath(); let pen = false, prev = null;
        const lim = (y1 - y0) * 4;
        for (let k = 0; k <= n; k++) {
          const x = a + ((b - a) * k) / n, y = f(x);
          const bad = !isFinite(y) || y > y1 + lim || y < y0 - lim || (prev != null && Math.abs(y - prev) > (y1 - y0) * 1.5);
          if (bad) { pen = false; prev = isFinite(y) ? y : null; continue; }
          if (!pen) { ctx.moveTo(X(x), Y(y)); pen = true; } else ctx.lineTo(X(x), Y(y));
          prev = y;
        }
        ctx.stroke(); ctx.setLineDash([]);
      });
    };
    P.fill = (top, bot, a, b, color) => {
      if (b <= a) return;
      const n = Math.max(30, Math.ceil((X(b) - X(a)) / 2));
      P.clip(() => {
        ctx.fillStyle = color; ctx.beginPath();
        for (let k = 0; k <= n; k++) { const x = a + ((b - a) * k) / n; const y = top(x); k ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); }
        for (let k = n; k >= 0; k--) { const x = a + ((b - a) * k) / n; ctx.lineTo(X(x), Y(bot(x))); }
        ctx.closePath(); ctx.fill();
      });
    };
    P.line = (xa, ya, xb, yb, color, lw, dash) => P.clip(() => {
      ctx.strokeStyle = color; ctx.lineWidth = lw || 2; ctx.setLineDash(dash || []);
      ctx.beginPath(); ctx.moveTo(X(xa), Y(ya)); ctx.lineTo(X(xb), Y(yb)); ctx.stroke(); ctx.setLineDash([]);
    });
    P.dot = (x, y, color, s) => { s = s || 8; ctx.fillStyle = color; ctx.fillRect(Math.round(X(x) - s / 2), Math.round(Y(y) - s / 2), s, s); ctx.strokeStyle = C.light ? '#171719' : '#0b0b0c'; ctx.lineWidth = 1.5; ctx.strokeRect(Math.round(X(x) - s / 2), Math.round(Y(y) - s / 2), s, s); };
    P.label = (s, x, y, color, align, dx, dy, size) => {
      ctx.save(); ctx.font = (size || 17) + 'px VT323, monospace'; ctx.textAlign = align || 'left';
      const px = X(x) + (dx || 0), py = Y(y) + (dy || 0);
      ctx.lineWidth = 4; ctx.strokeStyle = C.bg; ctx.strokeText(s, px, py);
      ctx.fillStyle = color || C.text; ctx.fillText(s, px, py); ctx.restore();
    };
    P.box = (xa, ya, xb, yb, fill, stroke, dash) => P.clip(() => {
      const L = Math.min(X(xa), X(xb)), T = Math.min(Y(ya), Y(yb)), w = Math.abs(X(xb) - X(xa)), h = Math.abs(Y(yb) - Y(ya));
      if (fill) { ctx.fillStyle = fill; ctx.fillRect(L, T, w, h); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.setLineDash(dash || []); ctx.strokeRect(L, T, w, h); ctx.setLineDash([]); }
    });
    return P;
  }
  // Texto livre (coordenadas de tela)
  function screenText(ctx, C, s, x, y, color, align, size) {
    ctx.save(); ctx.font = (size || 18) + 'px VT323, monospace'; ctx.textAlign = align || 'left';
    ctx.lineWidth = 4; ctx.strokeStyle = C.bg; ctx.strokeText(s, x, y); ctx.fillStyle = color || C.text; ctx.fillText(s, x, y); ctx.restore();
  }

  /* ---------------- Cenas ---------------- */
  const V = {};

  // 1 · L'Hôpital: zoom em torno de x = 0
  V.lhopital = {
    title: "Zoom no ponto: por que f/g → f′/g′",
    param: { min: 0.03, max: 1.2, init: 1.2, label: 'x', step: 0.01 }, duration: 7, mode: 'pingpong',
    caption: R`Curvas: $f(x)=\sin(3x)$ (dourada) e $g(x)=x$ (prata), com suas **retas tangentes** em $0$ (tracejadas). Conforme $x\to0$, a câmera dá zoom: cada curva fica **indistinguível da sua tangente**. Por isso $\frac{f(x)}{g(x)}$ se aproxima de $\frac{f'(0)}{g'(0)}=\frac{3}{1}=3$.`,
    draw(g) {
      const { ctx, W, H, t, C } = g;
      const s = Math.max(t, 0.03) * 1.25;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-0.22 * s, 1.1 * s], y: [-0.22 * s * 2.4, 1.1 * s * 2.4] });
      P.axes({ noLabels: true, xName: 'x' });
      P.line(-s, -3 * s, 2 * s, 6 * s, alpha(C.gold, .55), 1.5, [6, 5]);
      P.line(-s, -s, 2 * s, 2 * s, alpha(C.silver, .55), 1.5, [6, 5]);
      P.fn((x) => x, C.silver, 3);
      P.fn((x) => Math.sin(3 * x), C.gold, 3);
      const f = Math.sin(3 * t);
      P.line(t, 0, t, f, alpha(C.red, .8), 1.5, [3, 3]);
      P.dot(t, f, C.gold); P.dot(t, t, C.silver);
      P.label('f = sen 3x', t, f, C.goldText, 'left', 8, -6);
      P.label('g = x', t, t, C.text2, 'left', 8, 16);
      screenText(ctx, C, 'zoom ×' + fmt(1.2 / s * 1.25, 1), W - 14, 26, C.muted, 'right', 17);
      return [['x', fmt(t)], ['f(x)', fmt(f)], ['g(x)', fmt(t)], ['f(x)/g(x)', fmt(f / t)], ["f′(0)/g′(0)", '3']];
    },
  };

  // 2 · Extremos: tangente percorrendo a curva
  V.extremos = {
    title: 'Sinal de f′ e de f″ ao longo da curva',
    param: { min: -2.3, max: 2.3, init: -2.3, label: 'x', step: 0.01 }, duration: 9, mode: 'pingpong',
    caption: R`$f(x)=x^3-3x$. A **reta tangente** percorre a curva: ela fica **dourada** quando $f'>0$ (sobe) e **vermelha** quando $f'<0$ (desce). Nos topos e vales ela fica **horizontal** ($f'=0$). A faixa de baixo mostra o sinal de $f'$: a troca $+\to-$ marca o máximo e $-\to+$ marca o mínimo. Em $x=0$ a curva troca de ∩ para ∪: é a **inflexão** ($f''=6x$ muda de sinal).`,
    draw(g) {
      const { W, H, t, C } = g;
      const f = (x) => x ** 3 - 3 * x, d = (x) => 3 * x * x - 3;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-2.5, 2.5], y: [-3.9, 3.2] });
      P.axes({ stepX: 1, stepY: 1 });
      // faixa do sinal de f'
      P.box(-2.5, -3.9, -1, -3.35, alpha(C.gold, .35)); P.box(-1, -3.9, 1, -3.35, alpha(C.redFill, .45)); P.box(1, -3.9, 2.5, -3.35, alpha(C.gold, .35));
      P.label("f′ +", -1.9, -3.77, C.goldText, 'center', 0, 0, 15); P.label("f′ −", 0, -3.77, C.red, 'center', 0, 0, 15); P.label("f′ +", 1.9, -3.77, C.goldText, 'center', 0, 0, 15);
      P.fn(f, alpha(C.text, .9), 2.5);
      const sl = d(t), col = Math.abs(sl) < 0.25 ? C.text : sl > 0 ? C.gold : C.red;
      P.line(t - 0.8, f(t) - 0.8 * sl, t + 0.8, f(t) + 0.8 * sl, col, 3);
      P.dot(-1, 2, C.gold, 9); P.label('máx. local', -1, 2, C.goldText, 'center', 0, -12);
      P.dot(1, -2, C.gold, 9); P.label('mín. local', 1, -2, C.goldText, 'center', 0, 22);
      P.dot(0, 0, C.silver, 8); P.label('inflexão', 0, 0, C.text2, 'left', 10, -8);
      P.dot(t, f(t), col, 10);
      return [['x', fmt(t, 2)], ["f′(x)", fmt(sl, 2)], ['f', Math.abs(sl) < 0.25 ? 'tangente horizontal' : sl > 0 ? 'crescendo ↗' : 'decrescendo ↘'], ["f″(x)", fmt(6 * t, 2)], ['concavidade', t > 0.02 ? 'para cima ∪' : t < -0.02 ? 'para baixo ∩' : 'troca (inflexão)']];
    },
  };

  // 3 · Otimização: caixa d'água com orçamento fixo
  V.otimizacao = {
    title: "Caixa d'água: o orçamento fixa h, o volume tem um pico",
    param: { min: 2.2, max: 10.2, init: 2.2, label: 'R (dm)', step: 0.05 }, duration: 9, mode: 'pingpong',
    caption: R`Orçamento R\$ $216\pi$ (Questão 2 de 2025.2): $\pi Rh+2\pi R^2=216\pi\Rightarrow h=\frac{216-2R^2}{R}$. À esquerda, a forma da caixa muda: com $R$ pequeno ela é **alta e fina**, com $R$ grande fica **baixa e larga**. À direita, $V(R)=\pi(216R-2R^3)$: o máximo está onde a **tangente é horizontal**, em $V'(R)=0\Rightarrow R=6$, $h=24$, $V=864\pi$.`,
    draw(g) {
      const { ctx, W, H, t, C } = g;
      const R0 = t, h = (216 - 2 * R0 * R0) / R0, Vp = 216 * R0 - 2 * R0 ** 3;
      const lw = Math.max(130, W * 0.36), pad = 14;
      // cilindro
      const pw = lw - 2 * pad, ph = H - 60;
      const k = Math.min(pw / (2 * R0), ph / (h + R0 * 0.5));
      const cx = pad + pw / 2, rx = R0 * k, ry = R0 * k * 0.22, bodyH = h * k, bottom = H - 36, top = bottom - bodyH;
      ctx.save();
      ctx.fillStyle = alpha(C.redFill, .35); ctx.fillRect(cx - rx, top, 2 * rx, bodyH);
      ctx.beginPath(); ctx.ellipse(cx, bottom, rx, ry, 0, 0, Math.PI); ctx.fill();
      ctx.strokeStyle = C.silver; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - rx, top); ctx.lineTo(cx - rx, bottom); ctx.moveTo(cx + rx, top); ctx.lineTo(cx + rx, bottom); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, bottom, rx, ry, 0, 0, Math.PI); ctx.stroke();
      ctx.fillStyle = alpha(C.gold, .45); ctx.beginPath(); ctx.ellipse(cx, top, rx, ry, 0, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = C.gold; ctx.stroke();
      ctx.restore();
      screenText(ctx, C, 'R = ' + fmt(R0, 1), cx, H - 12, C.text2, 'center', 17);
      screenText(ctx, C, 'h = ' + fmt(h, 1), cx + rx + 6, (top + bottom) / 2, C.text2, 'left', 17);
      screenText(ctx, C, 'tampa (cara)', cx, top - ry - 6, C.goldText, 'center', 15);
      // gráfico V(R)
      const P = g.plot({ x: lw + 10, y: 10, w: W - lw - 20, h: H - 22 }, { x: [0, 10.6], y: [-60, 960] });
      P.axes({ stepX: 2, stepY: 200, xName: 'R', yName: 'V/π' });
      P.fn((r) => 216 * r - 2 * r ** 3, C.text2, 2.5, 0, 10.4);
      P.line(4.3, 864, 7.7, 864, alpha(C.gold, .8), 2, [5, 4]);
      P.dot(6, 864, C.gold, 9); P.label('máx: R=6', 6, 864, C.goldText, 'center', 0, -12);
      P.line(R0, 0, R0, Vp, alpha(C.red, .7), 1.5, [3, 3]);
      P.dot(R0, Vp, Math.abs(R0 - 6) < 0.15 ? C.gold : C.red, 10);
      return [['R', fmt(R0, 2) + ' dm'], ['h', fmt(h, 2) + ' dm'], ['V', fmt(Vp, 1) + 'π dm³'], ["V′(R)", fmt(216 - 6 * R0 * R0, 1) + 'π']];
    },
  };

  // 4 · Indefinidas: família F(x) + C
  V.indefinidas = {
    title: 'A família F(x) + C: mesma derivada, curvas paralelas',
    param: { min: -3, max: 3, init: -3, label: 'C', step: 0.05 }, duration: 6, mode: 'pingpong',
    caption: R`Todas as curvas $F(x)=x^2+C$ têm a **mesma derivada** $F'(x)=2x$: em cada $x$ elas têm a mesma inclinação (veja as tangentes paralelas em $x=1$). Mudar $C$ só **desloca** a curva para cima ou para baixo. Por isso $\int2x\,dx=x^2+C$: sem mais informação, não dá para saber qual curva é a certa.`,
    draw(g) {
      const { W, H, t, C } = g;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-2.6, 2.6], y: [-3.6, 7.2] });
      P.axes({ stepX: 1, stepY: 2 });
      for (let c = -3; c <= 3; c++) {
        P.fn((x) => x * x + c, alpha(C.silver, .35), 1.5);
        P.line(0.55, 1 + c - 0.9, 1.45, 1 + c + 0.9, alpha(C.silver, .55), 1.5);
      }
      P.fn((x) => x * x + t, C.gold, 3.5);
      P.line(0.4, 1 + t - 1.2, 1.6, 1 + t + 1.2, C.red, 3);
      P.dot(1, 1 + t, C.red, 9);
      P.label('x² + C', 1.95, 1.95 ** 2 + t, C.goldText, 'left', 6, 4);
      return [['C', fmt(t, 2)], ['F(1)', fmt(1 + t, 2)], ["F′(1)", '2 (para todo C)']];
    },
  };

  // 5 · Definidas: soma de Riemann
  V.definidas = {
    title: 'Soma de Riemann: retângulos que viram a área',
    param: { min: 0, max: 6.99, init: 0, label: 'refinamento', step: 0.01 }, duration: 9, mode: 'loop',
    caption: R`Área sob $f(x)=x^2$ em $[0,2]$. Com $n$ retângulos de largura $\Delta x=\frac2n$ a soma $\sum f(x_i)\Delta x$ **aproxima** a área. Dobrando $n$, o erro cai e a soma tende a $\int_0^2x^2\,dx=\left[\frac{x^3}{3}\right]_0^2=\frac83\approx2{,}667$. O TFC dá esse valor exato **sem** somar retângulos.`,
    draw(g) {
      const { W, H, t, C } = g;
      const n = Math.pow(2, Math.floor(t)), dx = 2 / n;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-0.25, 2.3], y: [-0.4, 4.5] });
      P.axes({ stepX: 0.5, stepY: 1 });
      let s = 0;
      for (let i = 0; i < n; i++) { const a = i * dx, hgt = a * a; s += hgt * dx; P.box(a, 0, a + dx, hgt, alpha(C.gold, .28), n <= 32 ? C.gold : null); }
      P.fn((x) => x * x, C.red, 3, -0.25, 2.2);
      P.line(2, 0, 2, 4, alpha(C.muted, .8), 1.5, [4, 4]);
      return [['n', String(n)], ['Δx', fmt(dx, 4)], ['soma', fmt(s, 4)], ['área exata', '2,6667'], ['erro', fmt(8 / 3 - s, 4)]];
    },
  };

  // 6 · Propriedades: simetria de função ímpar
  V.propriedades = {
    title: 'Função ímpar em [−a, a]: as áreas se cancelam',
    param: { min: 0.15, max: 1.95, init: 0.15, label: 'a', step: 0.01 }, duration: 7, mode: 'pingpong',
    caption: R`$f(x)=x^3-2x$ é **ímpar** ($f(-x)=-f(x)$): o gráfico é simétrico em relação à origem. Em qualquer intervalo $[-a,a]$, cada pedaço **acima** do eixo (dourado) tem um "gêmeo" **abaixo** (vermelho) com a mesma área. Por isso $\int_{-a}^{a}f(x)\,dx=0$ — e só por isso: se $f$ fosse par, as áreas se **somariam**.`,
    draw(g) {
      const { W, H, t, C } = g;
      const f = (x) => x ** 3 - 2 * x;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-2.2, 2.2], y: [-3.2, 3.2] });
      P.axes({ stepX: 1, stepY: 1 });
      P.fill((x) => Math.max(f(x), 0), () => 0, -t, t, alpha(C.gold, .45));
      P.fill(() => 0, (x) => Math.min(f(x), 0), -t, t, alpha(C.redFill, .5));
      P.fn(f, C.text, 2.5);
      P.line(-t, -3.2, -t, 3.2, alpha(C.muted, .9), 1.5, [4, 4]); P.line(t, -3.2, t, 3.2, alpha(C.muted, .9), 1.5, [4, 4]);
      P.label('−a', -t, -3.2, C.muted, 'center', 0, -6); P.label('a', t, -3.2, C.muted, 'center', 0, -6);
      const up = simpson((x) => Math.max(f(x), 0), -t, t, 400), dn = simpson((x) => Math.max(-f(x), 0), -t, t, 400);
      return [['a', fmt(t, 2)], ['área acima', fmt(up, 3)], ['área abaixo', fmt(dn, 3)], ['∫ de −a a a', fmt(up - dn, 3)]];
    },
  };

  // 7 · Elementares: acumulação de cos dá sen
  V.elementares = {
    title: 'Acumulando cos x obtemos sen x',
    param: { min: 0, max: 2 * Math.PI, init: 0, label: 'x', step: 0.01 }, duration: 9, mode: 'loop',
    caption: R`Em cima, $f(x)=\cos x$ e a área acumulada de $0$ até $x$ (dourado = positiva, vermelho = negativa). Embaixo, o **valor** dessa área, $A(x)=\int_0^x\cos s\,ds$, desenhado ponto a ponto: a curva que surge é exatamente $\sin x$. É a linha da tabela $\int\cos x\,dx=\sin x+C$ "nascendo" diante de você.`,
    draw(g) {
      const { ctx, W, H, t, C } = g;
      const half = (H - 16) / 2;
      const view = { x: [-0.2, 2 * Math.PI + 0.2], y: [-1.35, 1.35] };
      const fmtPi = (x) => ({ 1: 'π/2', 2: 'π', 3: '3π/2', 4: '2π' })[Math.round(x / (Math.PI / 2))] || '';
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: half - 6 }, view);
      P.axes({ stepX: Math.PI / 2, stepY: 1, fmtX: fmtPi });
      P.fill((x) => Math.max(Math.cos(x), 0), () => 0, 0, t, alpha(C.gold, .45));
      P.fill(() => 0, (x) => Math.min(Math.cos(x), 0), 0, t, alpha(C.redFill, .5));
      P.fn(Math.cos, C.text, 2.5);
      P.label('f(x) = cos x', 5.0, 1.0, C.text2, 'left', 0, 0, 16);
      const Q = g.plot({ x: 8, y: 8 + half + 6, w: W - 16, h: half - 6 }, view);
      Q.axes({ stepX: Math.PI / 2, stepY: 1, fmtX: fmtPi });
      Q.fn(Math.sin, alpha(C.silver, .25), 2, 0, 2 * Math.PI, [4, 4]);
      Q.fn(Math.sin, C.gold, 3, 0, t);
      Q.dot(t, Math.sin(t), C.gold, 9);
      Q.label('A(x) = sen x', 3.5, 1.05, C.goldText, 'left', 0, 0, 16);
      ctx.strokeStyle = alpha(C.red, .6); ctx.setLineDash([3, 3]); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(P.X(t), 8); ctx.lineTo(P.X(t), H - 8); ctx.stroke(); ctx.setLineDash([]);
      return [['x', fmt(t, 2)], ['área acumulada', fmt(Math.sin(t), 3)], ['sen x', fmt(Math.sin(t), 3)]];
    },
  };

  // 8 · PVI: escolher C para passar pelo ponto
  V.pvi = {
    title: 'PVI: a condição escolhe uma curva da família',
    param: { min: -3, max: 5, init: -3, label: 'C', step: 0.05 }, duration: 7, mode: 'pingpong',
    caption: R`$f'(x)=2x$ define um **campo de inclinações** (os tracinhos): qualquer solução segue essas direções. As soluções são $f(x)=x^2+C$. A condição $f(1)=3$ é o **ponto vermelho**: só a curva com $1+C=3$, isto é, **$C=2$**, passa por ele. Integrar dá a família; o ponto dado escolhe a curva.`,
    draw(g) {
      const { W, H, t, C } = g;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-2.6, 2.6], y: [-3.4, 7.6] });
      P.axes({ stepX: 1, stepY: 2 });
      for (let x = -2.4; x <= 2.41; x += 0.4) for (let y = -3; y <= 7.2; y += 0.8) {
        const m = 2 * x, L = 0.13 / Math.sqrt(1 + m * m / 4);
        P.line(x - L, y - m * L, x + L, y + m * L, alpha(C.silver, .45), 1.5);
      }
      const hit = Math.abs(t - 2) < 0.12;
      P.fn((x) => x * x + t, hit ? C.gold : C.text2, hit ? 4 : 3);
      P.dot(1, 3, C.red, 11); P.label('f(1) = 3', 1, 3, C.red, 'left', 10, 5);
      P.dot(1, 1 + t, hit ? C.gold : C.text2, 8);
      if (hit) P.label('C = 2 ✓', -0.2, 2 + 0.3, C.goldText, 'center', 0, -8, 20);
      return [['C', fmt(t, 2)], ['f(1) = 1 + C', fmt(1 + t, 2)], ['passa pelo ponto?', hit ? 'SIM (C = 2)' : 'não']];
    },
  };

  // 9 · Área entre curvas (questão da prova)
  V.area = {
    title: 'Faixas verticais: altura = cima − baixo',
    param: { min: 1, max: 3, init: 1, label: 'x', step: 0.005 }, duration: 7, mode: 'loop',
    caption: R`Questão 5 de 2025.2: $y=\sqrt{4x-3}$ (dourada) e $y=x$ (prata) se cruzam em $x=1$ e $x=3$. A faixa vermelha tem **altura** $\sqrt{4x-3}-x$ (cima − baixo). Varrendo de $1$ a $3$ e somando as faixas, a área acumulada chega a $\int_1^3(\sqrt{4x-3}-x)\,dx=\frac13$.`,
    draw(g) {
      const { W, H, t, C } = g;
      const top = (x) => Math.sqrt(4 * x - 3), bot = (x) => x;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-0.1, 3.7], y: [-0.1, 3.7] });
      P.axes({ stepX: 1, stepY: 1 });
      P.fill(top, bot, 1, t, alpha(C.gold, .4));
      P.fn(bot, C.silver, 2.5); P.fn(top, C.gold, 3, 0.75, 3.7);
      P.line(t, bot(t), t, top(t), C.red, 4);
      P.dot(1, 1, C.text, 8); P.dot(3, 3, C.text, 8);
      P.label('(1,1)', 1, 1, C.text2, 'left', 8, 14); P.label('(3,3)', 3, 3, C.text2, 'right', -8, -8);
      P.label('y = √(4x−3)', 1.5, top(1.5), C.goldText, 'right', -8, -6); P.label('y = x', 2.6, 2.6, C.text2, 'left', 10, 12);
      const A = ((4 * t - 3) ** 1.5 - 1) / 6 - (t * t - 1) / 2;
      return [['x', fmt(t, 2)], ['altura da faixa', fmt(top(t) - bot(t), 3)], ['área acumulada', fmt(A, 4)], ['área total', '1/3 ≈ 0,3333']];
    },
  };

  // 10 · Substituição: mudar a régua não muda a área
  V.substituicao = {
    title: 'u = x²: a régua muda, a área não',
    param: { min: 0, max: 1, init: 0, label: 'progresso', step: 0.005 }, duration: 7, mode: 'loop',
    caption: R`À esquerda, $\int_0^{x}2s\cos(s^2)\,ds$ no eixo $x$; à direita, $\int_0^{u}\cos w\,dw$ no eixo $u$, com $u=x^2$. As duas áreas crescem **juntas e iguais**: a substituição só troca a "régua" ($du=2x\,dx$ absorve o fator $2x$) e os limites ($x=\sqrt{\pi/2}\Rightarrow u=\frac\pi2$). Resultado: ambas valem $\sin(x^2)=\sin u$.`,
    draw(g) {
      const { ctx, W, H, t, C } = g;
      const xm = Math.sqrt(Math.PI / 2), xs = t * xm, us = xs * xs;
      const gap = 14, w = (W - 16 - gap) / 2;
      const L = g.plot({ x: 8, y: 30, w, h: H - 42 }, { x: [-0.05, 1.35], y: [-0.15, 1.75] });
      L.axes({ stepX: 0.5, stepY: 0.5, xName: 'x' });
      const fL = (x) => 2 * x * Math.cos(x * x);
      L.fill(fL, () => 0, 0, xs, alpha(C.gold, .45)); L.fn(fL, C.text, 2.5, 0, 1.35); L.dot(xs, fL(xs), C.gold, 8);
      const Rr = g.plot({ x: 8 + w + gap, y: 30, w, h: H - 42 }, { x: [-0.05, 1.75], y: [-0.15, 1.75] });
      Rr.axes({ stepX: 0.5, stepY: 0.5, xName: 'u' });
      Rr.fill(Math.cos, () => 0, 0, us, alpha(C.gold, .45)); Rr.fn(Math.cos, C.text, 2.5, 0, 1.75); Rr.dot(us, Math.cos(us), C.gold, 8);
      screenText(ctx, C, '2x·cos(x²) dx', 8 + w / 2, 22, C.text2, 'center', 18);
      screenText(ctx, C, 'cos u du', 8 + w + gap + w / 2, 22, C.text2, 'center', 18);
      screenText(ctx, C, '=', W / 2, H / 2, C.goldText, 'center', 30);
      return [['x', fmt(xs, 3)], ['u = x²', fmt(us, 3)], ['área em x', fmt(Math.sin(us), 4)], ['área em u', fmt(Math.sin(us), 4)]];
    },
  };

  // 11 · Partes: o retângulo u·v
  V.partes = {
    title: 'Por partes: u·v = ∫u dv + ∫v du',
    param: { min: 0.08, max: 1, init: 0.08, label: 't', step: 0.005 }, duration: 7, mode: 'pingpong',
    caption: R`A curva liga $(v,u)=(0,0)$ a $(v,u)=(t,t^2)$. O retângulo de área $u\cdot v$ fica dividido em duas regiões: a **dourada**, entre a curva e o eixo $v$, é $\int u\,dv$; a **vermelha**, entre a curva e o eixo $u$, é $\int v\,du$. Logo $uv=\int u\,dv+\int v\,du$, ou seja, $\int u\,dv=uv-\int v\,du$. É a fórmula da integração por partes, vista como geometria.`,
    draw(g) {
      const { W, H, t, C } = g;
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-0.1, 1.2], y: [-0.1, 1.15] });
      P.axes({ stepX: 0.25, stepY: 0.25, xName: 'v', yName: 'u' });
      P.fill((x) => x * x, () => 0, 0, t, alpha(C.gold, .5));
      P.fill(() => t * t, (x) => x * x, 0, t, alpha(C.redFill, .5));
      P.box(0, 0, t, t * t, null, C.silver, [5, 4]);
      P.fn((x) => x * x, alpha(C.text, .3), 1.5, 0, 1.1, [4, 4]);
      P.fn((x) => x * x, C.text, 3, 0, t);
      P.dot(t, t * t, C.gold, 9);
      if (t > 0.35) { P.label('∫u dv', t * 0.68, t * t * 0.22, C.goldText, 'center', 0, 0, 18); P.label('∫v du', t * 0.28, t * t * 0.72, C.red, 'center', 0, 0, 18); }
      const a = t ** 3 / 3, b = 2 * t ** 3 / 3;
      return [['u·v', fmt(t ** 3, 4)], ['∫u dv (dourado)', fmt(a, 4)], ['∫v du (vermelho)', fmt(b, 4)], ['soma', fmt(a + b, 4)]];
    },
  };

  // 12 · Frações parciais: somando as frações simples
  V.fracoes = {
    title: 'Somando frações simples até recriar a função',
    param: { min: 0, max: 3.3, init: 0, label: 'termos', step: 0.01 }, duration: 9, mode: 'loop',
    caption: R`Tracejado prata: $\frac{3x^2+2x+1}{x(x+1)^2}$ (exemplo 5 da aula). Em dourado, a soma parcial das frações simples $\frac1x$, $\frac{2}{x+1}$ e $-\frac{2}{(x+1)^2}$, que entram **uma de cada vez**. Quando os três termos estão somados, a curva dourada **coincide** com a original. Cada termo é fácil de integrar: dois viram $\ln$ e o último vira potência.`,
    draw(g) {
      const { W, H, t, C } = g;
      const terms = [(x) => 1 / x, (x) => 2 / (x + 1), (x) => -2 / (x + 1) ** 2];
      const names = ['1/x', '2/(x+1)', '−2/(x+1)²'];
      const w = terms.map((_, k) => clamp(t - k, 0, 1));
      const S = (x) => terms.reduce((s, f, k) => s + w[k] * f(x), 0);
      const orig = (x) => (3 * x * x + 2 * x + 1) / (x * (x + 1) ** 2);
      const P = g.plot({ x: 8, y: 8, w: W - 16, h: H - 16 }, { x: [-3.2, 3.2], y: [-6, 6] });
      P.axes({ stepX: 1, stepY: 2 });
      terms.forEach((f, k) => { if (w[k] > 0) P.fn(f, alpha(C.silver, .3 * w[k] + .1), 1.5); });
      P.fn(orig, C.silver, 2, null, null, [7, 5]);
      P.fn(S, C.gold, 3.5);
      const used = names.filter((_, k) => w[k] > 0.99).join(' + ').replace('+ −', '− ');
      return [['termos somados', used || '—'], ['original em x=1', '1,5'], ['soma em x=1', fmt(S(1), 3)]];
    },
  };

  CALC.visuals = V;

  /* ---------------- Componente ---------------- */
  ui.visual = function (id) {
    const S = V[id]; if (!S) return null;
    const p = S.param, lesson = CALC.byId[id];
    const node = CALC.el(`<figure class="viz card pixel-card">
      <div class="viz-head"><span class="badge gold">◉ Modelo animado</span><h3>${esc(S.title)}</h3></div>
      <div class="viz-stage"><canvas role="img" aria-label="${esc(S.title)}"></canvas></div>
      <div class="viz-read" aria-live="off"></div>
      <div class="viz-ctrl">
        <button class="btn small primary" data-play></button>
        <label class="viz-slider"><span>${esc(p.label)}</span><input type="range" min="${p.min}" max="${p.max}" step="${p.step || 0.01}"></label>
        <button class="btn small" data-reset title="Reiniciar">↺</button>
      </div>
      <div class="viz-cap">${CALC.md(S.caption)}</div>
      ${lesson ? `<div class="small muted viz-from">Aula ${lesson.n} · ${esc(lesson.title)}</div>` : ''}
    </figure>`);
    const canvas = node.querySelector('canvas'), ctx = canvas.getContext('2d');
    const stage = node.querySelector('.viz-stage'), read = node.querySelector('.viz-read');
    const slider = node.querySelector('input'), playBtn = node.querySelector('[data-play]');
    let t = p.init == null ? p.min : p.init, dir = t >= p.max ? -1 : 1, hold = 0;
    let playing = !ui.reduced(), visible = true, W = 0, H = 0, last = null, lastRead = '';

    const paintBtn = () => { playBtn.textContent = playing ? '❚❚ Pausar' : '▶ Animar'; };
    function size() {
      const w = Math.max(240, stage.clientWidth);
      const h = Math.round(clamp(w * (S.ratio || 0.56), 250, 430));
      const dpr = window.devicePixelRatio || 1;
      W = w; H = h;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw() {
      if (!W) size();
      const C = colors();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
      const rows = S.draw({ ctx, W, H, t, C, fmt, plot: (rect, view) => makePlot(ctx, rect, view, C) }) || [];
      const html = rows.map(([k, v]) => `<span><em>${esc(k)}</em><b>${esc(v)}</b></span>`).join('');
      if (html !== lastRead) { read.innerHTML = html; lastRead = html; }
      slider.value = t;
    }
    function step(now) {
      if (!node.isConnected) return;               // saiu da página: para
      if (last == null) last = now;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (playing && visible) {
        if (hold > 0) {
          hold -= dt;                                   // pausa curta nas pontas
          if (hold <= 0 && S.mode !== 'pingpong' && t >= p.max) t = p.min;
        } else {
          t += dir * (p.max - p.min) / S.duration * dt;
          if (t >= p.max) { t = p.max; hold = S.mode === 'pingpong' ? 0.5 : 1.4; if (S.mode === 'pingpong') dir = -1; }
          else if (t <= p.min) { t = p.min; dir = 1; hold = 0.5; }
        }
        draw();
      }
      requestAnimationFrame(step);
    }
    playBtn.onclick = () => { playing = !playing; if (playing && S.mode !== 'pingpong' && t >= p.max) t = p.min; paintBtn(); };
    node.querySelector('[data-reset]').onclick = () => { t = p.init == null ? p.min : p.init; dir = t >= p.max ? -1 : 1; hold = 0; draw(); };
    slider.addEventListener('input', () => { t = Number(slider.value); playing = false; paintBtn(); draw(); });
    if ('ResizeObserver' in window) new ResizeObserver(() => { size(); draw(); }).observe(stage);
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(canvas);
    new MutationObserver(() => { if (node.isConnected) draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => node.isConnected && draw());
    paintBtn();
    requestAnimationFrame(() => { size(); draw(); requestAnimationFrame(step); });
    return node;
  };
})();
