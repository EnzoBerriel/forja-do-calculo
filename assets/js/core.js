'use strict';
/* =========================================================
   Núcleo: namespace, renderização de texto+LaTeX, armazenamento, progresso
   Scripts clássicos (sem módulos) para funcionar abrindo o index.html direto.
   ========================================================= */

// Atalho usado nos arquivos de conteúdo: R`\frac{a}{b}` mantém as barras do LaTeX.
const R = String.raw;

window.CALC = {
  lessons: [], byId: {}, modules: [], order: [],
  identify: [], exams: [], schedule: [],
  pages: {}, ui: {},
};

CALC.addLesson = function (lesson) {
  CALC.lessons.push(lesson);
  CALC.byId[lesson.id] = lesson;
};

CALC.SECTIONS = [
  ['teoria', 'Teoria'],
  ['identificacao', 'Identificação'],
  ['resolvidos', 'Resolvidos'],
  ['exercicios', 'Exercícios'],
  ['resumo', 'Resumo'],
  ['cartoes', 'Cartões'],
];
CALC.LEVEL_SOLVED = { 1: 'Muito fácil', 2: 'Fácil', 3: 'Intermediário', 4: 'Intermediário/avançado', 5: 'Avançado · estilo prova' };
CALC.LEVEL_PRACTICE = { F: 'Fácil', I: 'Intermediário', IA: 'Intermediário/avançado', A: 'Avançado · estilo prova' };

/* ---------------- Texto com LaTeX ----------------
   Sintaxe dos textos de conteúdo:
   $...$  fórmula inline   ·   $$...$$  fórmula em bloco   ·   **negrito**
   \$ → cifrão literal (ex.: R\$ 216)   ·   linha em branco → novo parágrafo
   linhas começando com "- " → lista                                        */
CALC.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

CALC.tex = function (t, display) {
  if (window.katex) {
    try { return katex.renderToString(t, { displayMode: !!display, throwOnError: false, strict: false }); }
    catch (e) { /* cai no fallback */ }
  }
  return '<code>' + CALC.esc(t) + '</code>';
};

// O negrito (**) pode envolver fórmulas, então o estado "aberto/fechado" atravessa os trechos.
function fmtText(chunk, st) {
  return chunk.split('**').map((part, k) => {
    let pre = '';
    if (k > 0) { st.bold = !st.bold; pre = st.bold ? '<strong>' : '</strong>'; }
    return pre + CALC.esc(part).replace(/\n/g, '<br>').replace(/\u0000/g, '$');
  }).join('');
}

CALC.inline = function (src) {
  const s = String(src == null ? '' : src).replace(/\\\$/g, '\u0000');
  const st = { bold: false };
  const fmtText_ = (c) => fmtText(c, st);
  let out = '', i = 0;
  while (i < s.length) {
    if (s[i] === '$') {
      const disp = s[i + 1] === '$';
      const open = disp ? 2 : 1;
      const end = s.indexOf(disp ? '$$' : '$', i + open);
      if (end < 0) { out += fmtText_(s.slice(i)); break; }
      const t = s.slice(i + open, end).replace(/\u0000/g, '\\$');
      out += disp ? '<div class="mathblock">' + CALC.tex(t, true) + '</div>' : CALC.tex(t, false);
      i = end + open;
    } else {
      const next = s.indexOf('$', i);
      out += fmtText_(next < 0 ? s.slice(i) : s.slice(i, next));
      i = next < 0 ? s.length : next;
    }
  }
  if (st.bold) out += '</strong>';
  return out;
};

CALC.md = function (src) {
  if (src == null) return '';
  const text = String(src).replace(/\r/g, '').split('\n').map((l) => l.trim()).join('\n').trim();
  return text.split(/\n{2,}/).map((block) => {
    const lines = block.split('\n');
    if (lines.every((l) => l.startsWith('- '))) {
      return '<ul>' + lines.map((l) => '<li>' + CALC.inline(l.slice(2)) + '</li>').join('') + '</ul>';
    }
    return '<div class="p">' + CALC.inline(block) + '</div>';
  }).join('');
};

/* ---------------- Armazenamento ---------------- */
CALC.store = (function () {
  const KEY = 'calc1:v1';
  const fresh = () => ({
    version: 1,
    settings: { examDate: null, theme: 'dark' },
    last: null,
    lessons: {},     // id -> { seen: [secoes], completed, completedAt }
    practice: {},    // chave -> { status, attempts, last, fields, work, revealed }
    cards: {},       // chave -> { known }
    schedule: {},    // id da tarefa -> true
    identify: { right: 0, total: 0 },
    exams: {},       // id -> { startedAt, elapsed }
  });
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)); } catch (e) { state = null; }
  state = Object.assign(fresh(), state || {});
  state.settings = Object.assign(fresh().settings, state.settings || {});

  let timer = null;
  const subs = [];
  const write = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* modo privado / cota */ } };
  return {
    get s() { return state; },
    save() { clearTimeout(timer); timer = setTimeout(write, 120); subs.forEach((f) => f()); },
    flush: write,
    replace(obj) { state = Object.assign(fresh(), obj); write(); subs.forEach((f) => f()); },
    reset() { state = fresh(); write(); subs.forEach((f) => f()); },
    subscribe(f) { subs.push(f); },
    exportJSON() { return JSON.stringify(state, null, 2); },
  };
})();
window.addEventListener('beforeunload', () => CALC.store.flush());

/* ---------------- Datas ---------------- */
CALC.dateOnly = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
CALC.iso = (d) => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
CALC.parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
CALC.fmtDate = (d) => d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
CALC.examDate = function () {
  const st = CALC.store.s;
  if (!st.settings.examDate) {
    const d = CALC.dateOnly(new Date()); d.setDate(d.getDate() + 14);
    st.settings.examDate = CALC.iso(d); CALC.store.save();
  }
  return CALC.parseISO(st.settings.examDate);
};
CALC.daysLeft = () => Math.round((CALC.examDate() - CALC.dateOnly(new Date())) / 86400000);

/* ---------------- Progresso ---------------- */
CALC.lessonState = function (id) {
  const st = CALC.store.s;
  if (!st.lessons[id]) st.lessons[id] = { seen: [], completed: false, completedAt: null };
  return st.lessons[id];
};
CALC.practiceKey = (lessonId, exId) => lessonId + ':' + exId;
CALC.lessonStats = function (lesson) {
  const st = CALC.store.s;
  let tried = 0, correct = 0, wrong = 0, partial = 0;
  lesson.practice.forEach((p) => {
    const r = st.practice[CALC.practiceKey(lesson.id, p.id)];
    if (r && r.status) {
      tried++;
      if (r.status === 'correct') correct++; else if (r.status === 'partial') partial++; else wrong++;
    }
  });
  return { tried, correct, wrong, partial, total: lesson.practice.length };
};
CALC.lessonProgress = function (lesson) {
  const ls = CALC.lessonState(lesson.id);
  if (ls.completed) return 1;
  const stt = CALC.lessonStats(lesson);
  return 0.4 * (ls.seen.length / CALC.SECTIONS.length) + 0.6 * (stt.tried / stt.total);
};
CALC.moduleProgress = function (mod) {
  const ls = mod.lessons.map((id) => CALC.byId[id]).filter(Boolean);
  if (!ls.length) return 0;
  return ls.reduce((a, l) => a + CALC.lessonProgress(l), 0) / ls.length;
};
CALC.overallProgress = function () {
  if (!CALC.lessons.length) return 0;
  return CALC.lessons.reduce((a, l) => a + CALC.lessonProgress(l), 0) / CALC.lessons.length;
};
CALC.markSeen = function (lessonId, sec) {
  const ls = CALC.lessonState(lessonId);
  if (!ls.seen.includes(sec)) { ls.seen.push(sec); CALC.checkAutoComplete(lessonId); CALC.store.save(); }
};
CALC.checkAutoComplete = function (lessonId) {
  const l = CALC.byId[lessonId]; const ls = CALC.lessonState(lessonId);
  if (ls.completed) return;
  const stt = CALC.lessonStats(l);
  if (ls.seen.length === CALC.SECTIONS.length && stt.tried === stt.total) {
    ls.completed = true; ls.completedAt = Date.now();
  }
};
CALC.pct = (x) => Math.round(x * 100) + '%';

/* ---------------- DOM ---------------- */
CALC.el = function (html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
CALC.download = function (filename, text, mime) {
  const blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
};
CALC.shuffle = function (arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
