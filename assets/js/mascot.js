'use strict';
/* =========================================================
   Mascote: o cavaleiro da forja.
   Aparece de vez em quando (ao trocar de página ou após alguns minutos),
   comemora acertos e aulas concluídas, e conta piadas ao ser clicado.
   ========================================================= */
(function () {
  const store = CALC.store, ui = CALC.ui, L = CALC.mascotLines;
  const enabled = () => store.s.settings.mascot !== false;
  const reduced = () => ui.reduced && ui.reduced();
  const inExam = () => /^#\/simulados\/./.test(location.hash);   // não atrapalha simulado em andamento
  const rand = (a) => a[Math.floor(Math.random() * a.length)];
  const recent = {};
  const pick = (kind, arr) => {                                  // evita repetir as últimas falas
    recent[kind] = recent[kind] || [];
    const pool = arr.filter((_, k) => !recent[kind].includes(k));
    const choice = rand(pool.length ? pool : arr), idx = arr.indexOf(choice);
    recent[kind].push(idx); if (recent[kind].length > Math.min(6, arr.length - 1)) recent[kind].shift();
    return choice;
  };
  const fill = (s, data) => s.replace('{dias}', Math.max(0, CALC.daysLeft())).replace('{aula}', (data && data.aula) || 'a aula');

  let node, textEl, knightBtn, hideTimer = null, typeTimer = null, seq = 0, lastShown = 0;
  let nextIdle = Date.now() + 1000 * (150 + Math.random() * 120);

  function build() {
    node = CALC.el(`<div class="mascot" hidden>
      <div class="mascot-bubble" role="status" aria-live="polite">
        <button class="mascot-x" aria-label="Fechar">×</button>
        <p class="mascot-text"></p>
        <div class="mascot-actions">
          <button class="btn small" data-joke>Conta uma piada</button>
          <button class="btn small" data-tip>Me dá um ânimo</button>
        </div>
      </div>
      <button class="mascot-knight" aria-label="Cavaleiro mascote — clique para outra mensagem"><img src="assets/img/mascote.png" alt="" draggable="false"></button>
    </div>`);
    document.body.appendChild(node);
    textEl = node.querySelector('.mascot-text');
    knightBtn = node.querySelector('.mascot-knight');
    node.querySelector('.mascot-x').onclick = hide;
    node.querySelector('[data-joke]').onclick = () => joke();
    node.querySelector('[data-tip]').onclick = () => say([fill(pick('motivation', L.motivation))], { mood: 'swing' });
    knightBtn.onclick = () => (Math.random() < 0.5 ? joke() : random());
  }

  function anim(cls) {
    const img = knightBtn.querySelector('img');
    img.classList.remove(cls); void img.offsetWidth; img.classList.add(cls);
    img.addEventListener('animationend', () => img.classList.remove(cls), { once: true });
  }

  // Digita uma frase letra por letra; resolve quando termina
  function type(str, id) {
    return new Promise((resolve) => {
      clearInterval(typeTimer);
      if (reduced()) { textEl.textContent = str; return resolve(); }
      let i = 0; textEl.textContent = '';
      node.classList.add('talking');
      typeTimer = setInterval(() => {
        if (id !== seq) { clearInterval(typeTimer); return resolve(); }
        i += 2; textEl.textContent = str.slice(0, i);
        if (i >= str.length) { clearInterval(typeTimer); node.classList.remove('talking'); resolve(); }
      }, 28);
    });
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Mostra o mascote dizendo uma sequência de frases
  async function say(lines, opts) {
    opts = opts || {};
    if (!node) build();
    const id = ++seq;
    clearTimeout(hideTimer);
    lastShown = Date.now();
    nextIdle = Date.now() + 1000 * (180 + Math.random() * 180);
    if (node.hidden || node.classList.contains('out')) {
      node.hidden = false; node.classList.remove('out');
      node.classList.remove('in'); void node.offsetWidth; node.classList.add('in');
      if (opts.mood === 'celebrate') setTimeout(() => ui.burst(knightBtn, 24), 350);
    } else if (opts.mood) anim(opts.mood === 'celebrate' ? 'jump' : opts.mood);
    const bubble = node.querySelector('.mascot-bubble');
    bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
    let total = 0;
    for (let k = 0; k < lines.length; k++) {
      if (id !== seq) return;
      if (k > 0) await wait(1400);
      if (id !== seq) return;
      await type(lines[k], id);
      total += lines[k].length;
      if (k === lines.length - 1 && opts.punch) { anim('jump'); ui.burst(knightBtn, 14); }
    }
    if (opts.mood === 'celebrate') { anim('jump'); ui.burst(knightBtn, 28); }
    if (id !== seq) return;
    hideTimer = setTimeout(hide, 5500 + total * 45);
  }

  function hide() {
    if (!node || node.hidden) return;
    seq++; clearTimeout(hideTimer); clearInterval(typeTimer);
    node.classList.remove('talking', 'in'); node.classList.add('out');
    setTimeout(() => { if (node.classList.contains('out')) { node.hidden = true; node.classList.remove('out'); } }, reduced() ? 0 : 450);
  }

  const joke = () => { const j = pick('jokes', L.jokes); say(j, { punch: true }); };

  // Fala de acordo com a página atual
  function random() {
    const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
    const page = parts[0], id = parts[1], r = Math.random();
    if (page === 'aula' && L.tips[id] && r < 0.45) return say([L.tips[id]], { mood: 'swing' });
    if (L.pages[page] && r < 0.4) return say([L.pages[page]], { mood: 'swing' });
    if (r < 0.72) return say([fill(pick('motivation', L.motivation))], { mood: 'swing' });
    return joke();
  }

  // Eventos vindos do resto do site
  function event(type, data) {
    if (!enabled()) return false;
    if (type === 'complete') { say([fill(rand(L.complete), data)], { mood: 'celebrate' }); return true; }
    if (inExam()) return false;
    const showing = node && !node.hidden;
    if (type === 'correct' && !showing && Math.random() < 0.22) { say([pick('correct', L.correct)], { mood: 'celebrate' }); return true; }
    if (type === 'wrong' && !showing && Math.random() < 0.22) { say([pick('wrong', L.wrong)], { mood: 'swing' }); return true; }
    return false;
  }

  // Aparições aleatórias: ao trocar de página e depois de alguns minutos de estudo
  window.addEventListener('hashchange', () => {
    if (node && !node.hidden && !inExam()) return;
    if (inExam()) { hide(); return; }
    if (!enabled() || Date.now() - lastShown < 75000 || Math.random() > 0.3) return;
    setTimeout(() => { if (enabled() && !inExam() && (!node || node.hidden)) random(); }, 1800 + Math.random() * 2500);
  });
  setInterval(() => {
    if (!enabled() || document.hidden || inExam() || (node && !node.hidden)) return;
    if (Date.now() >= nextIdle) random();
  }, 15000);

  // Primeira visita: apresentação
  setTimeout(() => {
    if (!enabled() || inExam()) return;
    if (!store.s.mascotMet) { store.s.mascotMet = true; store.save(); say([L.greet[0]], { mood: 'celebrate' }); }
    else if (Math.random() < 0.5) say([fill(rand([L.greet[1]].concat(L.motivation.filter((m) => m.includes('{dias}')))))], { mood: 'swing' });
  }, 2500);

  CALC.mascot = {
    enabled, event, hide,
    summon: () => random(),
    joke,
    setEnabled(v) { store.s.settings.mascot = !!v; store.save(); if (!v) hide(); },
  };
})();
