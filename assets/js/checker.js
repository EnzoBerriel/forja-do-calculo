'use strict';
/* =========================================================
   Corretor de respostas
   - Parser próprio de expressões (aceita sen, tg, arctg, ln, √, π, vírgula decimal,
     multiplicação implícita como 2x, 3pi, 2e^2, |x|)
   - Tipos: num, expr, anti (antiderivada: aceita qualquer +C), set, multi, choice, open
   ========================================================= */
(function () {
  const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    sec: (x) => 1 / Math.cos(x), csc: (x) => 1 / Math.sin(x), cot: (x) => 1 / Math.tan(x),
    ln: Math.log, log: Math.log, exp: Math.exp, sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs,
    atan: Math.atan, arctan: Math.atan, asin: Math.asin, arcsin: Math.asin, acos: Math.acos, arccos: Math.acos,
  };
  const CONSTS = { pi: Math.PI, e: Math.E, inf: Infinity };
  const NAMES = Object.keys(FUNCS).concat(Object.keys(CONSTS)).sort((a, b) => b.length - a.length);

  function normalize(src) {
    let s = String(src).toLowerCase().trim();
    s = s.replace(/[−–]/g, '-').replace(/[·×⋅∙]/g, '*').replace(/÷/g, '/')
      .replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/∞/g, 'inf')
      .replace(/infinito/g, 'inf').replace(/\*\*/g, '^')
      .replace(/²/g, '^2').replace(/³/g, '^3');
    s = s.replace(/arcsen/g, 'asin').replace(/arctg/g, 'atan').replace(/arccos/g, 'acos')
      .replace(/sen/g, 'sin').replace(/tg/g, 'tan');
    s = s.replace(/(\d),(\d)/g, '$1.$2');                // vírgula decimal
    s = s.replace(/\|([^|]+)\|/g, 'abs($1)');            // |x| → abs(x)
    s = s.replace(/\s*d[xtu]\s*$/, '');                  // "dx" no final
    s = s.replace(/\+\s*[ck]\s*$/, '');                   // "+ C" no final
    if (s.includes('=')) s = s.slice(s.lastIndexOf('=') + 1); // "f(x) = ..." ou "R = 6"
    return s.trim();
  }

  function tokenize(s, vars) {
    const toks = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ' ') { i++; continue; }
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        const v = parseFloat(s.slice(i, j));
        if (isNaN(v)) throw new Error('número inválido');
        toks.push({ t: 'num', v }); i = j; continue;
      }
      if (/[a-z]/.test(c)) {
        const name = NAMES.find((n) => s.startsWith(n, i));
        if (name) {
          if (FUNCS[name]) toks.push({ t: 'fn', v: name }); else toks.push({ t: 'num', v: CONSTS[name] });
          i += name.length; continue;
        }
        if (vars.includes(c)) { toks.push({ t: 'var', v: c }); i++; continue; }
        throw new Error('símbolo desconhecido "' + c + '"');
      }
      if ('+-*/^()'.includes(c)) { toks.push({ t: c }); i++; continue; }
      throw new Error('caractere inválido "' + c + '"');
    }
    return toks;
  }

  function parse(src, vars) {
    vars = vars || ['x'];
    const toks = tokenize(normalize(src), vars);
    if (!toks.length) throw new Error('resposta vazia');
    let p = 0;
    const peek = () => toks[p];
    const eat = (t) => { if (!toks[p] || toks[p].t !== t) throw new Error('esperava "' + t + '"'); p++; };
    const startsPrimary = (tk) => tk && (tk.t === 'num' || tk.t === 'var' || tk.t === 'fn' || tk.t === '(');

    function expr() {
      let left = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) {
        const op = toks[p++].t; const r = term(); const l = left;
        left = op === '+' ? (sc) => l(sc) + r(sc) : (sc) => l(sc) - r(sc);
      }
      return left;
    }
    function term() {
      let left = unary();
      for (;;) {
        const tk = peek();
        if (tk && (tk.t === '*' || tk.t === '/')) {
          p++; const r = unary(); const l = left;
          left = tk.t === '*' ? (sc) => l(sc) * r(sc) : (sc) => l(sc) / r(sc);
        } else if (startsPrimary(tk)) {          // multiplicação implícita
          const r = power(); const l = left; left = (sc) => l(sc) * r(sc);
        } else break;
      }
      return left;
    }
    function unary() {
      const tk = peek();
      if (tk && tk.t === '-') { p++; const u = unary(); return (sc) => -u(sc); }
      if (tk && tk.t === '+') { p++; return unary(); }
      return power();
    }
    function power() {
      const base = primary();
      if (peek() && peek().t === '^') { p++; const ex = unary(); return (sc) => Math.pow(base(sc), ex(sc)); }
      return base;
    }
    function primary() {
      const tk = toks[p++];
      if (!tk) throw new Error('expressão incompleta');
      if (tk.t === 'num') { const v = tk.v; return () => v; }
      if (tk.t === 'var') { const n = tk.v; return (sc) => sc[n]; }
      if (tk.t === '(') { const e = expr(); eat(')'); return e; }
      if (tk.t === 'fn') {
        const f = FUNCS[tk.v];
        let pw = null;
        if (peek() && peek().t === '^') { p++; pw = primary(); } // sin^2(x)
        let arg;
        if (peek() && peek().t === '(') { p++; arg = expr(); eat(')'); } else arg = power();
        return pw ? (sc) => Math.pow(f(arg(sc)), pw(sc)) : (sc) => f(arg(sc));
      }
      throw new Error('símbolo inesperado "' + tk.t + '"');
    }
    const f = expr();
    if (p < toks.length) throw new Error('símbolo inesperado "' + (toks[p].t === 'num' ? toks[p].v : toks[p].t) + '"');
    return f;
  }

  const close = (a, b, tol) => {
    if (a === b) return true;
    if (!isFinite(a) || !isFinite(b)) return false;
    return Math.abs(a - b) <= (tol || 1e-6) * Math.max(1, Math.abs(a), Math.abs(b));
  };
  const evalNum = (s, vars) => parse(s, vars)({});

  function samplePoints(domain, n) {
    const [a, b] = domain || [0.3, 2.7];
    const pts = [];
    for (let k = 0; k < n; k++) pts.push(a + (b - a) * ((k + 0.37) / n) + (Math.random() - 0.5) * (b - a) / (3 * n));
    return pts;
  }

  // Retorna { ok: true|false|'partial', msg?, error? }
  function check(answer, input) {
    try {
      switch (answer.t) {
        case 'num': {
          const u = evalNum(input, []);
          const r = evalNum(answer.v, []);
          return { ok: close(u, r, answer.tol) };
        }
        case 'expr':
        case 'anti': {
          const v = answer.var || 'x';
          const fu = parse(input, [v]);
          const fr = parse(answer.v, [v]);
          const pts = samplePoints(answer.domain, 9);
          const diffs = [];
          for (const x of pts) {
            const r = fr({ [v]: x }); if (!isFinite(r)) continue;
            const u = fu({ [v]: x });
            if (!isFinite(u)) return { ok: false };
            diffs.push([u - r, Math.max(1, Math.abs(u), Math.abs(r))]);
          }
          if (diffs.length < 4) return { ok: false };
          if (answer.t === 'expr') return { ok: diffs.every(([d, m]) => Math.abs(d) <= 1e-6 * m) };
          const d0 = diffs[0][0];
          const ok = diffs.every(([d, m]) => Math.abs(d - d0) <= 1e-6 * m);
          return { ok, msg: ok ? '' : 'Dica: derive a sua resposta — ela deve voltar exatamente no integrando.' };
        }
        case 'set': {
          const parts = String(input).split(';').map((x) => x.trim()).filter(Boolean);
          const u = parts.map((x) => evalNum(x.replace(/^[a-z]\s*=\s*/, ''), [])).sort((a, b) => a - b);
          const r = answer.v.map((x) => evalNum(x, [])).sort((a, b) => a - b);
          if (u.length !== r.length) return { ok: false, msg: 'Quantidade de valores diferente da esperada (' + r.length + ').' };
          return { ok: u.every((x, k) => close(x, r[k])) };
        }
        default: return { ok: false };
      }
    } catch (e) {
      return { ok: false, error: 'Não consegui ler sua resposta: ' + e.message + '.' };
    }
  }

  // Para "multi": cada campo é numérico (ou expr se f.t definido)
  function checkMulti(answer, values) {
    let right = 0; const per = [];
    for (let k = 0; k < answer.fields.length; k++) {
      const f = answer.fields[k];
      const res = check(Object.assign({ t: 'num' }, f), values[k] || '');
      if (res.error) return { error: f.label + ': ' + res.error };
      per.push(res.ok); if (res.ok) right++;
    }
    return { ok: right === answer.fields.length ? true : right > 0 ? 'partial' : false, per };
  }

  CALC.checker = { parse, normalize, check, checkMulti, evalNum, close };
})();
