'use strict';
/* =========================================================
   Componentes reutilizáveis
   ========================================================= */
(function () {
  const md = CALC.md, inl = CALC.inline, esc = CALC.esc, el = CALC.el, store = CALC.store;
  const ui = CALC.ui;

  /* ---------- Cavaleiro em pixel art (16×18) ---------- */
  const KNIGHT = [
    '......OOOO......',
    '.....ORRRRO.....',
    '....OOSSSSOO....',
    '...OSSSSSSSsO...',
    '...OSVVVVVVsO...',
    '...OSVWVVVVsO...',
    '...OSSSSSSSsO...',
    '....OsSSSSsO....',
    '..OOSSOOOOSSOO..',
    '.OSSsORRRRROsSO.',
    '.OSsORRRRRRROsO.',
    '.OsOrrrGGrrrOsO.',
    '..OOrRRRRRRrOO..',
    '...OrRRRRRRrO...',
    '...OSSsOOsSSO...',
    '...OSsO..OsSO...',
    '..OSSSO..OSSSO..',
    '..OOOOO..OOOOO..',
  ];
  const PAL = { O: '#0b0b0c', S: '#C0C5CC', s: '#8a9099', V: '#171719', W: '#E2A044', R: '#A61924', r: '#54242A', G: '#E2A044' };
  ui.knight = function (cls) {
    let rects = '';
    KNIGHT.forEach((row, y) => [...row].forEach((c, x) => {
      if (PAL[c]) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"${c === 'W' ? ' class="glint"' : ''}/>`;
    }));
    return `<svg class="sprite ${cls || ''}" viewBox="0 0 16 18" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
  };

  /* ---------- Efeitos visuais ---------- */
  ui.reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Reinicia uma animação CSS (remove e recoloca a classe)
  ui.retrigger = function (node, cls) {
    if (!node) return;
    node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls);
    node.addEventListener('animationend', () => node.classList.remove(cls), { once: true });
  };
  // Explosão de faíscas a partir de um elemento
  ui.burst = function (from, n) {
    if (!from || ui.reduced()) return;
    const r = from.getBoundingClientRect();
    const b = document.createElement('div');
    b.className = 'burst';
    b.style.left = (r.left + r.width / 2) + 'px'; b.style.top = (r.top + r.height / 2) + 'px';
    n = n || 16;
    for (let k = 0; k < n; k++) {
      const ang = (Math.PI * 2 * k) / n + Math.random() * .5, dist = 40 + Math.random() * 55;
      const s = document.createElement('i');
      s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--dy', Math.sin(ang) * dist - 20 + 'px');
      s.style.animationDelay = Math.random() * 80 + 'ms';
      b.appendChild(s);
    }
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 950);
  };
  // Aviso flutuante com o cavaleiro pulando
  ui.toast = function (title, text) {
    document.querySelectorAll('.toast').forEach((t) => t.remove());
    const t = el(`<div class="toast" role="status">${ui.knight('jump')}<div><b>${esc(title)}</b><span class="small">${esc(text || '')}</span></div></div>`);
    document.body.appendChild(t);
    ui.burst(t.querySelector('.sprite'), 22);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 350); }, 3200);
  };
  // Entrada escalonada dos blocos de uma página recém-renderizada
  ui.animateIn = function (root) {
    if (!root) return;
    const sel = ['.wrap', '#sec', '.grid', '.practice-list', '#days', '.quick'];
    sel.forEach((s) => (root.matches && root.matches(s) ? [root] : []).concat([...root.querySelectorAll(s)]).forEach((c) => {
      c.classList.add('stagger');
      [...c.children].forEach((ch, k) => ch.style.setProperty('--i', Math.min(k, 10)));
    }));
  };
  // Números que "contam" até o valor final (ex.: 87%)
  ui.countUp = function (root) {
    if (ui.reduced()) return;
    root.querySelectorAll('[data-count]').forEach((node) => {
      const m = node.textContent.match(/^(\d+)(.*)$/); if (!m) return;
      const end = Number(m[1]), suf = m[2], t0 = performance.now(), dur = 800;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(end * e) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  ui.bar = (frac, cls) => `<div class="bar ${cls || ''}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(frac * 100)}"><span style="width:${Math.round(frac * 100)}%"></span></div>`;

  /* ---------- Sidebar ---------- */
  ui.renderSidebar = function (route) {
    const side = document.getElementById('sidebar');
    const cur = location.hash || '#/';
    const link = (href, label, extra) => `<a class="nav-link ${cur === href || (href !== '#/' && cur.startsWith(href + '/')) ? 'active' : ''}" href="${href}">${label}${extra || ''}</a>`;
    let html = `<a class="brand" href="#/">${ui.knight()}<div><div class="t1">Forja do Cálculo</div><div class="t2">Cálculo 1 · Prova 2</div></div></a>`;
    html += `<div class="nav-group">
      ${link('#/', '⌂ Painel')}
      ${link('#/cronograma', '▦ Cronograma')}
      ${link('#/modelos', '◉ Modelos animados')}
      ${link('#/resumos', '▤ Resumos')}
      ${link('#/cartoes', '▣ Cartões Anki')}
      ${link('#/identificar', '◈ Identificar método')}
      ${link('#/simulados', '⚔ Simulados')}
    </div>`;
    CALC.modules.forEach((m) => {
      const p = CALC.moduleProgress(m);
      html += `<div class="nav-group"><div class="nav-label"><span>Módulo ${m.n}</span><span>${CALC.pct(p)}</span></div>
        <div class="nav-label" style="text-transform:none;letter-spacing:0;font-size:.82rem;color:var(--text-2)">${esc(m.title)}</div>
        <div class="mod-bar">${ui.bar(p, 'thin')}</div>`;
      m.lessons.forEach((id) => {
        const l = CALC.byId[id]; if (!l) return;
        const lp = CALC.lessonProgress(l);
        const dot = lp >= 1 ? 'done' : lp > 0 ? 'half' : '';
        const href = '#/aula/' + id;
        html += `<a class="nav-link ${cur.startsWith(href) ? 'active' : ''}" href="${href}"><span class="num">${String(l.n).padStart(2, '0')}</span><span>${esc(l.title)}</span><span class="dot ${dot}" title="${CALC.pct(lp)}"></span></a>`;
      });
      html += '</div>';
    });
    html += `<div class="nav-group">${link('#/config', '⚙ Configurações')}</div>
      <div class="theme-row"><button class="btn small" id="themeBtn">${document.documentElement.dataset.theme === 'light' ? '◐ Tema forja (escuro)' : '◑ Tema pergaminho (claro)'}</button></div>`;
    side.innerHTML = html;
    side.querySelector('#themeBtn').onclick = () => {
      const t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = t; store.s.settings.theme = t; store.save(); ui.renderSidebar();
    };
  };

  /* ---------- Teoria ---------- */
  ui.formula = (f) => `<div class="formula">${inl('$$' + f[0] + '$$')}${f[1] ? `<div class="note">${inl(f[1])}</div>` : ''}</div>`;
  ui.pitfall = (p) => `<div class="pit"><div class="wrong"><span class="lbl">✗ Erro comum</span>${inl(p[0])}</div><div class="right"><span class="lbl">✓ Como fazer</span>${inl(p[1])}</div></div>`;

  /* ---------- Exercício resolvido ---------- */
  ui.solved = function (ex, idx) {
    const node = el(`<article class="card ex">
      <div class="ex-head"><span class="n">Exemplo ${idx + 1}</span><span class="badge lvl-${ex.lvl}">${CALC.LEVEL_SOLVED[ex.lvl]}</span></div>
      <span class="part-title">Enunciado</span>
      <div class="q">${md(ex.q)}</div>
      <div class="btn-row"><button class="btn" data-toggle aria-expanded="false">▸ Mostrar resolução</button></div>
      <div class="solution" hidden>
        <span class="part-title">Identificação do método</span>
        <div class="method-box">${md(ex.method)}</div>
        <span class="part-title">Resolução passo a passo</span>
        <ol class="steps">${ex.steps.map((s) => `<li>${md(s)}</li>`).join('')}</ol>
        <div class="answer-box"><span class="lbl">Resposta final</span>${md(ex.ans)}</div>
      </div>
    </article>`);
    const btn = node.querySelector('[data-toggle]'); const sol = node.querySelector('.solution');
    btn.onclick = () => {
      sol.hidden = !sol.hidden; btn.setAttribute('aria-expanded', String(!sol.hidden));
      btn.textContent = sol.hidden ? '▸ Mostrar resolução' : '▾ Ocultar resolução';
    };
    return node;
  };

  /* ---------- Exercício interativo ----------
     item: { id, lvl, tag, q, a:{t,...}, hint?, sol:[passos], ans, rubric? }
     key: chave de armazenamento; onChange: callback após mudança de status */
  const FMT_HELP = 'Formato: 3/2 · 1,5 · sqrt(2) ou √2 · pi · e^(2x) · ln(x) · sen(x) · arctg(x) · |x| — use parênteses nos expoentes. Não precisa escrever "+ C".';
  ui.practice = function (item, key, label, onChange) {
    const st = store.s;
    const rec = () => (st.practice[key] = st.practice[key] || { status: null, attempts: 0 });
    const r0 = st.practice[key] || {};
    const a = item.a;
    let answerUI = '';
    if (a.t === 'choice') {
      answerUI = `<div class="choices">${a.options.map((o, k) => `<label class="choice"><input type="radio" name="${esc(key)}" value="${k}" ${r0.last == k ? 'checked' : ''}><span>${inl(o)}</span></label>`).join('')}</div>`;
    } else if (a.t === 'multi') {
      answerUI = `<div class="fields">${a.fields.map((f, k) => `<label>${inl(f.label)}<input type="text" data-f="${k}" autocomplete="off" spellcheck="false" value="${esc((r0.fields || [])[k] || '')}"></label>`).join('')}</div><div class="hint-fmt">${FMT_HELP}</div>`;
    } else if (a.t === 'open') {
      answerUI = '';
    } else {
      const ph = a.t === 'set' ? 'Separe os valores com ponto e vírgula. Ex.: -2; 0; sqrt(3)' : a.t === 'anti' ? 'Ex.: x^3/3 - 2ln|x| (sem + C)' : a.t === 'expr' ? 'Digite a expressão' : 'Digite o valor';
      answerUI = `<div class="ans-row"><input type="text" class="ans" autocomplete="off" spellcheck="false" placeholder="${ph}" value="${esc(r0.last || '')}"></div><div class="hint-fmt">${FMT_HELP}</div>`;
    }
    const isOpen = a.t === 'open';
    const node = el(`<article class="card ex" id="ex-${esc(key.replace(/[^a-z0-9]/gi, '-'))}">
      <div class="ex-head"><span class="n">${esc(label)}</span><span class="badge lvl-${item.lvl}">${CALC.LEVEL_PRACTICE[item.lvl] || item.lvl}</span><span class="status"></span></div>
      <div class="q">${md(item.q)}</div>
      <span class="part-title">Seu rascunho / resolução</span>
      <textarea class="work" placeholder="${isOpen ? 'Escreva sua resolução completa aqui (como faria na prova). Depois compare com a correção comentada.' : 'Opcional: anote seu raciocínio. Fica salvo.'}">${esc(r0.work || '')}</textarea>
      ${answerUI ? `<span class="part-title">${a.t === 'choice' ? 'Escolha uma alternativa' : 'Sua resposta final'}</span>${answerUI}` : ''}
      <div class="btn-row">
        <button class="btn primary" data-submit>${isOpen ? 'Comparar com a correção' : 'Enviar resposta'}</button>
        ${isOpen ? '' : '<button class="btn" data-reveal>Ver resolução comentada</button>'}
        ${item.hint ? '<button class="btn ghost small" data-hint hidden>Dica</button>' : ''}
      </div>
      ${item.hint ? `<div class="callout silver hint" hidden><span class="ttl">Dica</span>${md(item.hint)}</div>` : ''}
      <div class="fb"></div>
      <div class="solution" hidden>
        <span class="part-title">Resolução comentada</span>
        <ol class="steps">${item.sol.map((s) => `<li>${md(s)}</li>`).join('')}</ol>
        <div class="answer-box"><span class="lbl">Resposta</span>${md(item.ans)}</div>
        ${item.tag ? `<div class="small muted" style="margin-top:8px">Tópico: ${esc(item.tag)}</div>` : ''}
        ${isOpen ? `<span class="part-title">Critérios de correção — marque o que você fez</span>
          <div class="rubric">${(item.rubric || []).map((c, k) => `<label><input type="checkbox" data-rub="${k}" ${(r0.rubric || [])[k] ? 'checked' : ''}><span>${inl(c)}</span></label>`).join('')}</div>
          <div class="btn-row"><span class="small muted">Autoavaliação:</span>
            <button class="btn small" data-self="correct">✓ Acertei</button>
            <button class="btn small" data-self="partial">◐ Acertei parcialmente</button>
            <button class="btn small" data-self="wrong">✗ Errei</button></div>` : ''}
      </div>
    </article>`);

    const q = (s) => node.querySelector(s);
    const statusEl = q('.status'), fb = q('.fb'), sol = q('.solution');
    const revealBtn = q('[data-reveal]'), hintBtn = q('[data-hint]');

    function paintStatus() {
      const r = st.practice[key];
      const s = r && r.status;
      const txt = { correct: '✓ Acertou', wrong: '✗ Errou', partial: '◐ Parcial' }[s];
      statusEl.innerHTML = s ? `<span class="st-chip ${s}">${txt}${r.attempts > 1 ? ' · ' + r.attempts + ' tentativas' : ''}</span>` : '<span class="st-chip">Não tentado</span>';
      if (revealBtn) revealBtn.disabled = !(r && r.attempts > 0);
      if (revealBtn && revealBtn.disabled) revealBtn.title = 'Disponível após a primeira tentativa';
      if (hintBtn && r && r.status === 'wrong') hintBtn.hidden = false;
      if (a.t === 'choice' && r && r.status) {
        node.querySelectorAll('.choice').forEach((c, k) => {
          c.classList.toggle('correct', r.status && k === a.correct && r.revealed);
          c.classList.toggle('wrong', r.status === 'wrong' && String(k) === String(r.last));
        });
      }
    }
    function showFb(kind, title, msg) {
      fb.className = 'fb'; void fb.offsetWidth;
      fb.className = 'fb show ' + kind;
      fb.innerHTML = `<span class="ttl">${title}</span>${msg ? md(msg) : ''}`;
    }
    function reveal() {
      sol.hidden = false; const r = rec(); r.revealed = true; store.save();
      if (a.t === 'choice') paintStatus();
    }

    q('.work').addEventListener('input', (e) => { rec().work = e.target.value; store.save(); });

    q('[data-submit]').onclick = () => {
      const r = rec();
      if (isOpen) {
        if ((q('.work').value || '').trim().length < 10) { showFb('info', 'Tente primeiro.', 'Escreva sua resolução (mesmo incompleta) antes de ver a correção.'); return; }
        r.attempts = Math.max(1, r.attempts); store.save();
        reveal(); showFb('info', 'Compare com cuidado.', 'Marque os critérios atendidos e faça sua autoavaliação abaixo.');
        paintStatus(); return;
      }
      let res;
      if (a.t === 'choice') {
        const sel = node.querySelector('input[type=radio]:checked');
        if (!sel) { showFb('info', 'Escolha uma alternativa.'); return; }
        r.last = sel.value; res = { ok: Number(sel.value) === a.correct };
      } else if (a.t === 'multi') {
        const vals = [...node.querySelectorAll('[data-f]')].map((i) => i.value);
        if (vals.some((v) => !v.trim())) { showFb('info', 'Preencha todos os campos.'); return; }
        r.fields = vals; res = CALC.checker.checkMulti(a, vals);
        if (!res.error) node.querySelectorAll('[data-f]').forEach((i, k) => { i.style.borderColor = res.per[k] ? 'var(--gold)' : 'var(--red)'; });
      } else {
        const v = q('.ans').value;
        if (!v.trim()) { showFb('info', 'Digite uma resposta.'); return; }
        r.last = v; res = CALC.checker.check(a, v);
      }
      if (res.error) { showFb('info', 'Hum…', res.error + ' ' + FMT_HELP); store.save(); return; }
      r.attempts = (r.attempts || 0) + 1;
      r.status = res.ok === true ? 'correct' : res.ok === 'partial' ? 'partial' : 'wrong';
      if (r.status === 'correct') {
        showFb('ok', 'Correto!', (a.t === 'choice' && a.why) ? a.why : 'Confira a resolução comentada para comparar o raciocínio.');
        ui.retrigger(node, 'fx-ok'); ui.burst(q('[data-submit]'));
      } else if (r.status === 'partial') {
        showFb('bad', 'Parcialmente correto.', 'Os campos em vermelho estão errados. Tente de novo ou veja a resolução.');
        ui.retrigger(node, 'fx-shake');
      } else {
        showFb('bad', 'Ainda não.', (res.msg ? res.msg + ' ' : '') + (item.hint ? 'Use a dica, tente de novo ou veja a resolução comentada.' : 'Tente de novo ou veja a resolução comentada.'));
        ui.retrigger(node, 'fx-shake');
      }
      store.save(); paintStatus(); onChange && onChange();
      if (CALC.mascot) CALC.mascot.event(r.status === 'correct' ? 'correct' : 'wrong');
    };
    if (revealBtn) revealBtn.onclick = () => { reveal(); revealBtn.disabled = true; };
    if (hintBtn) hintBtn.onclick = () => { q('.hint').hidden = false; hintBtn.hidden = true; };
    node.querySelectorAll('[data-rub]').forEach((cb) => cb.addEventListener('change', () => {
      const r = rec(); r.rubric = r.rubric || []; r.rubric[cb.dataset.rub] = cb.checked; store.save();
    }));
    node.querySelectorAll('[data-self]').forEach((b) => b.onclick = () => {
      const r = rec(); r.status = b.dataset.self; r.attempts = Math.max(1, r.attempts); store.save();
      showFb(r.status === 'correct' ? 'ok' : 'bad', 'Autoavaliação registrada.', r.status === 'correct' ? 'Ótimo!' : 'Releia a resolução e refaça amanhã sem consultar.');
      if (r.status === 'correct') ui.burst(b);
      paintStatus(); onChange && onChange();
    });

    if (r0.revealed && r0.attempts) sol.hidden = false;
    paintStatus();
    return node;
  };

  /* ---------- Relatório de exercícios ---------- */
  ui.report = function (items, keyFn, labelFn) {
    const st = store.s;
    let c = 0, w = 0, p = 0; const review = [];
    items.forEach((it, k) => {
      const r = st.practice[keyFn(it)];
      if (!r || !r.status) return;
      if (r.status === 'correct') c++;
      else { if (r.status === 'partial') p++; else w++; review.push({ it, k }); }
    });
    const tried = c + w + p;
    const perf = tried ? (c + 0.5 * p) / tried : 0;
    const done = tried === items.length;
    return `<div class="card report pixel-card">
      <h3>Relatório ${done ? 'final' : 'parcial'} · ${tried}/${items.length} tentados</h3>
      <div class="nums"><div class="g"><b>${c}</b>acertos</div><div class="r"><b>${w}</b>erros</div><div><b>${p}</b>parciais</div><div><b>${tried ? Math.round(perf * 100) : 0}%</b>aproveitamento</div></div>
      ${ui.bar(perf, 'gold')}
      ${review.length ? `<h3>Assuntos para revisar</h3><ul>${review.map(({ it, k }) => `<li><a href="#" data-goto="${k}">${esc(labelFn(it, k))}</a> — ${esc(it.tag || '')}</li>`).join('')}</ul>`
        : tried ? '<p style="margin-top:12px">Nada para revisar até agora. Siga em frente! ⚔</p>' : '<p style="margin-top:12px" class="muted">Resolva os exercícios para ver seu desempenho.</p>'}
      ${!done && tried ? '<p class="small muted">O relatório final aparece quando todos os exercícios forem tentados.</p>' : ''}
    </div>`;
  };

  /* ---------- Resumo ---------- */
  ui.summary = function (l) {
    const s = l.summary;
    const list = (arr) => '<ul>' + arr.map((x) => `<li>${inl(x)}</li>`).join('') + '</ul>';
    return `<div class="grid two">
      <div class="card"><h3>Fórmulas fundamentais</h3>${list(s.formulas)}</div>
      <div class="card"><h3>Quando usar</h3>${list(s.when)}</div>
      <div class="card"><h3>Passo a passo</h3><ol>${s.steps.map((x) => `<li>${inl(x)}</li>`).join('')}</ol></div>
      <div class="card"><h3>Erros comuns</h3>${list(s.errors)}</div>
    </div>
    <div class="card callout gold" style="margin-top:16px"><span class="ttl">Memorize</span>${list(s.memo)}</div>`;
  };

  /* ---------- Cartões ---------- */
  ui.allCards = function (lessonId) {
    const ls = lessonId ? [CALC.byId[lessonId]] : CALC.lessons;
    const out = [];
    ls.forEach((l) => l.cards.forEach((c, k) => out.push({ key: l.id + ':c' + k, front: c[0], back: c[1], lesson: l })));
    return out;
  };
  ui.deck = function (cards, opts) {
    opts = opts || {};
    const st = store.s;
    let list = cards.slice(), i = 0, flipped = false, onlyReview = false;
    const node = el(`<div class="deck">
      <div class="btn-row" style="margin:0 0 14px">
        <button class="btn small" data-shuffle>⤮ Embaralhar</button>
        <button class="btn small" data-review>☐ Só os que preciso revisar</button>
        <button class="btn small gold" data-csv>⬇ Exportar CSV (Anki)</button>
      </div>
      <div class="flash" tabindex="0" role="button" aria-label="Virar cartão"></div>
      <div class="deck-nav">
        <button class="btn" data-prev>← Anterior</button>
        <span class="deck-count"></span>
        <button class="btn" data-next>Próximo →</button>
      </div>
      <div class="btn-row" style="justify-content:center">
        <button class="btn primary" data-flip>Mostrar resposta</button>
        <button class="btn" data-known>✓ Sabia</button>
        <button class="btn" data-again>↺ Revisar</button>
      </div>
      <p class="small muted" style="text-align:center;margin-top:10px">Atalhos: espaço vira · ← → navegam</p>
    </div>`);
    const flash = node.querySelector('.flash');
    function apply() {
      list = onlyReview ? cards.filter((c) => !(st.cards[c.key] && st.cards[c.key].known)) : cards.slice();
      if (i >= list.length) i = 0;
    }
    function paint() {
      if (!list.length) {
        flash.innerHTML = '<div class="front">Nenhum cartão para revisar aqui. 🏆</div>';
        node.querySelector('.deck-count').textContent = '0 / 0'; return;
      }
      const c = list[i]; const known = st.cards[c.key] && st.cards[c.key].known;
      flash.classList.toggle('known', !!known);
      flash.innerHTML = `<span class="side">${flipped ? 'Frente + verso' : 'Frente'}</span>
        ${opts.showLesson ? `<span class="kind badge">${esc(c.lesson.title)}</span>` : ''}
        <div class="front">${md(c.front)}</div>
        ${flipped ? `<div class="back">${md(c.back)}</div>` : ''}`;
      node.querySelector('.deck-count').textContent = (i + 1) + ' / ' + list.length + (known ? ' · ✓ sabia' : '');
      node.querySelector('[data-flip]').textContent = flipped ? 'Esconder resposta' : 'Mostrar resposta';
    }
    const go = (d) => { if (!list.length) return; i = (i + d + list.length) % list.length; flipped = false; paint(); ui.retrigger(flash, 'flip'); };
    const flip = () => { flipped = !flipped; paint(); ui.retrigger(flash, 'flip'); };
    const mark = (known) => {
      if (!list.length) return; const c = list[i];
      st.cards[c.key] = { known, seen: ((st.cards[c.key] || {}).seen || 0) + 1 }; store.save();
      if (known) ui.burst(node.querySelector('[data-known]'), 10);
      if (onlyReview && known) { apply(); flipped = false; paint(); } else go(1);
    };
    flash.onclick = flip;
    node.querySelector('[data-flip]').onclick = flip;
    node.querySelector('[data-prev]').onclick = () => go(-1);
    node.querySelector('[data-next]').onclick = () => go(1);
    node.querySelector('[data-known]').onclick = () => mark(true);
    node.querySelector('[data-again]').onclick = () => mark(false);
    node.querySelector('[data-shuffle]').onclick = () => { cards = CALC.shuffle(cards); i = 0; flipped = false; apply(); paint(); };
    const revBtn = node.querySelector('[data-review]');
    revBtn.onclick = () => { onlyReview = !onlyReview; revBtn.textContent = (onlyReview ? '☑' : '☐') + ' Só os que preciso revisar'; i = 0; flipped = false; apply(); paint(); };
    node.querySelector('[data-csv]').onclick = () => ui.exportCSV(cards, opts.filename || 'calculo1-cartoes.csv');
    node.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === ' ') { e.preventDefault(); flip(); } else if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
    });
    paint();
    return node;
  };

  /* ---------- Exportação CSV compatível com Anki ----------
     UTF-8 com BOM, separador ";", 2 colunas (Frente;Verso).
     $...$ → \(...\) e $$...$$ → \[...\] (o Anki renderiza com MathJax). */
  ui.toAnki = function (s) {
    return String(s)
      .replace(/\\\$/g, '\u0000')
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => '\\[' + t + '\\]')
      .replace(/\$([^$]+?)\$/g, (_, t) => '\\(' + t + '\\)')
      .replace(/\u0000/g, '$')
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .split('\n').map((x) => x.trim()).join('<br>');
  };
  ui.exportCSV = function (cards, filename) {
    const q = (s) => '"' + ui.toAnki(s).replace(/"/g, '""') + '"';
    const lines = ['#separator:semicolon', '#html:true', '#columns:Frente;Verso'];
    cards.forEach((c) => lines.push(q(c.front) + ';' + q(c.back)));
    CALC.download(filename, '﻿' + lines.join('\r\n') + '\r\n', 'text/csv;charset=utf-8');
  };
})();
