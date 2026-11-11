'use strict';
/* =========================================================
   Páginas
   ========================================================= */
(function () {
  const md = CALC.md, inl = CALC.inline, esc = CALC.esc, el = CALC.el, store = CALC.store, ui = CALC.ui;
  const P = CALC.pages;

  const firstUnfinished = () => CALC.order.map((id) => CALC.byId[id]).find((l) => l && CALC.lessonProgress(l) < 1) || CALC.byId[CALC.order[0]];
  const todayIndex = () => {
    const start = CALC.examDate(); start.setDate(start.getDate() - 14);
    return Math.round((CALC.dateOnly(new Date()) - start) / 86400000); // 0 = dia 1
  };
  const dayDate = (k) => { const d = CALC.examDate(); d.setDate(d.getDate() - 14 + k); return d; };
  const goto = (k) => { const n = document.querySelectorAll('.practice-list > .ex')[k]; if (n) n.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  /* ================= Painel ================= */
  P.dashboard = function (view) {
    const st = store.s;
    const days = CALC.daysLeft();
    const overall = CALC.overallProgress();
    let tried = 0, right = 0;
    CALC.lessons.forEach((l) => { const s = CALC.lessonStats(l); tried += s.tried; right += s.correct + 0.5 * s.partial; });
    const doneLessons = CALC.lessons.filter((l) => CALC.lessonProgress(l) >= 1).length;
    const next = firstUnfinished();
    const cont = st.last && st.last.route ? st.last : null;
    const contLesson = cont && CALC.byId[cont.route.split('/')[2]];
    const ti = todayIndex();
    const today = CALC.schedule[Math.min(Math.max(ti, 0), CALC.schedule.length - 1)];
    const totalCards = ui.allCards().length;
    const knownCards = ui.allCards().filter((c) => st.cards[c.key] && st.cards[c.key].known).length;

    view.innerHTML = `<div class="wrap wide">
      <section class="hero"><div class="embers" aria-hidden="true">${Array.from({ length: 16 }, (_, k) => `<i style="--x:${(k * 6.3 + 3) % 100}%;--d:${(k * 0.53) % 4}s;--t:${3.2 + (k % 5) * 0.6}s;--dx:${((k % 7) - 3) * 9}px"></i>`).join('')}</div>${ui.knight()}
        <div style="flex:1;min-width:0">
          <div class="crumb">Painel do cavaleiro</div>
          <h1>Minha Preparação para Cálculo 1</h1>
          <p class="lead" style="margin:0">Prova 2 · L'Hôpital, extremos, otimização e integrais. Cada aula: teoria curta → identificar → resolvidos → praticar.</p>
          <div class="btn-row">
            ${contLesson ? `<a class="btn primary" href="${cont.route}">▶ Continuar de onde parei — ${esc(contLesson.title)}</a>` : `<a class="btn primary" href="#/aula/${next.id}">▶ Começar: ${esc(next.title)}</a>`}
            ${contLesson && next && next.id !== contLesson.id ? `<a class="btn" href="#/aula/${next.id}">Próxima pendente: ${esc(next.title)}</a>` : ''}
          </div>
        </div>
      </section>

      <div class="grid three">
        <div class="card">
          <h3>Contagem regressiva</h3>
          <div class="count"><b data-count>${days < 0 ? 0 : days}</b><span>${days === 1 ? 'dia' : 'dias'} para a prova</span></div>
          <label class="small muted" style="display:block;margin-top:10px">Data da prova
            <input type="date" id="examDate" value="${st.settings.examDate}"></label>
        </div>
        <div class="card">
          <h3>Progresso geral</h3>
          <div class="stat-big" data-count>${CALC.pct(overall)}</div>
          ${ui.bar(overall)}
          <p class="small muted" style="margin:8px 0 0">${doneLessons} de ${CALC.lessons.length} aulas concluídas</p>
        </div>
        <div class="card">
          <h3>Exercícios</h3>
          <div class="stat-big" data-count>${tried ? Math.round(100 * right / tried) : 0}%</div>
          ${ui.bar(tried ? right / tried : 0, 'gold')}
          <p class="small muted" style="margin:8px 0 0">aproveitamento em ${tried} de ${CALC.lessons.length * 10} exercícios tentados</p>
        </div>
      </div>

      <h2>Acesso rápido</h2>
      <div class="quick">
        <a href="#/cartoes"><b>▣ Cartões Anki</b><span>${knownCards}/${totalCards} marcados como "sabia"</span></a>
        <a href="#/resumos"><b>▤ Resumos</b><span>Todas as fórmulas, sem abrir as aulas</span></a>
        <a href="#/identificar"><b>◈ Identificar método</b><span>Treino rápido: qual técnica usar?</span></a>
        <a href="#/simulados"><b>⚔ Simulados</b><span>Provas anteriores corrigidas</span></a>
      </div>

      <h2>Hoje no cronograma</h2>
      <div id="todayBox"></div>

      <h2>Módulos</h2>
      <div class="grid two">${CALC.modules.map((m) => {
        const p = CALC.moduleProgress(m);
        return `<div class="card mod-card"><h3><span>Módulo ${m.n} · ${esc(m.title)}</span><span class="pct">${CALC.pct(p)}</span></h3>${ui.bar(p, 'thin')}
          <div style="margin-top:10px">${m.lessons.map((id) => {
            const l = CALC.byId[id]; const lp = CALC.lessonProgress(l);
            const tag = lp >= 1 ? '<span class="badge gold tag">Concluída</span>' : lp > 0 ? `<span class="badge tag">${CALC.pct(lp)}</span>` : '<span class="badge tag" style="opacity:.6">Pendente</span>';
            return `<a class="lrow" href="#/aula/${id}"><span class="pixel muted">${String(l.n).padStart(2, '0')}</span><span>${esc(l.title)}</span>${tag}</a>`;
          }).join('')}</div></div>`;
      }).join('')}</div>
    </div>`;

    ui.countUp(view);
    const heroKnight = view.querySelector('.hero .sprite');
    if (heroKnight) { heroKnight.setAttribute('title', 'Chamar o cavaleiro'); heroKnight.addEventListener('click', () => CALC.mascot && CALC.mascot.summon()); }
    view.querySelector('#examDate').addEventListener('change', (e) => {
      if (!e.target.value) return;
      st.settings.examDate = e.target.value; store.save(); P.dashboard(view); ui.renderSidebar();
    });
    const box = view.querySelector('#todayBox');
    if (ti < 0) box.innerHTML = `<div class="card"><p>O cronograma de 14 dias começa em ${CALC.fmtDate(dayDate(0))}. Você pode adiantar qualquer aula.</p><a class="btn" href="#/cronograma">Ver cronograma</a></div>`;
    else if (ti >= CALC.schedule.length) box.innerHTML = `<div class="card"><p>Dia da prova (ou depois). Revise os resumos e boa prova! ⚔</p><a class="btn" href="#/resumos">Abrir resumos</a></div>`;
    else box.appendChild(dayCard(today, ti, true));
  };

  /* ================= Cronograma ================= */
  function dayCard(d, k, isToday) {
    const st = store.s;
    const done = d.tasks.every((t, j) => st.schedule[d.id + ':' + j]);
    const node = el(`<div class="day ${isToday ? 'today' : ''} ${done ? 'done' : ''}">
      <div class="day-head"><span class="dn">Dia ${k + 1}</span><span class="muted small">${CALC.fmtDate(dayDate(k))}</span><span class="focus">${esc(d.focus)}</span>
        ${isToday ? '<span class="badge red">Hoje</span>' : ''}${done ? '<span class="badge gold">Concluído</span>' : ''}
        ${d.lesson ? `<a class="btn small" style="margin-left:auto" href="#/aula/${d.lesson}">Abrir aula</a>` : d.link ? `<a class="btn small" style="margin-left:auto" href="${d.link}">Abrir</a>` : ''}</div>
      <div class="day-body">
        ${d.tasks.map((t, j) => `<label class="task ${st.schedule[d.id + ':' + j] ? 'checked' : ''}"><input type="checkbox" data-t="${j}" ${st.schedule[d.id + ':' + j] ? 'checked' : ''}><span>${inl(t)}</span></label>`).join('')}
        ${d.short ? `<p class="small muted" style="margin:8px 0 0"><strong>Dia corrido (25–30 min):</strong> ${inl(d.short)}</p>` : ''}
      </div></div>`);
    node.querySelectorAll('[data-t]').forEach((cb) => cb.addEventListener('change', () => {
      st.schedule[d.id + ':' + cb.dataset.t] = cb.checked; store.save();
      cb.closest('.task').classList.toggle('checked', cb.checked);
      const all = d.tasks.every((t, j) => st.schedule[d.id + ':' + j]);
      node.classList.toggle('done', all);
    }));
    return node;
  }
  P.schedule = function (view) {
    const st = store.s; const ti = todayIndex();
    let total = 0, done = 0;
    CALC.schedule.forEach((d) => d.tasks.forEach((t, j) => { total++; if (st.schedule[d.id + ':' + j]) done++; }));
    view.innerHTML = `<div class="wrap"><div class="crumb">Planejamento</div><h1>Cronograma de 14 dias</h1>
      <p class="lead">Sessões de 50–60 min. Em dias corridos, faça a versão de 25–30 min e complete o resto no dia seguinte. As datas acompanham a data da prova (${CALC.examDate().toLocaleDateString('pt-BR')}).</p>
      <div class="card"><div style="display:flex;justify-content:space-between"><strong>Atividades concluídas</strong><span class="pct">${done}/${total}</span></div>${ui.bar(total ? done / total : 0)}</div>
      <div class="callout silver"><span class="ttl">Por que essa ordem?</span>Substituição (aula 10) é estudada <strong>antes</strong> do Módulo 3: nas provas, o PVI e a área entre curvas quase sempre exigem substituição.</div>
      <div id="days"></div></div>`;
    const box = view.querySelector('#days');
    CALC.schedule.forEach((d, k) => box.appendChild(dayCard(d, k, k === ti)));
  };

  /* ================= Aula ================= */
  P.lesson = function (view, id, sec) {
    const l = CALC.byId[id];
    if (!l) { view.innerHTML = '<div class="wrap"><h1>Aula não encontrada</h1><a href="#/">Voltar</a></div>'; return; }
    const secIds = CALC.SECTIONS.map((s) => s[0]);
    if (!secIds.includes(sec)) sec = 'teoria';
    CALC.markSeen(id, sec);
    const ls = CALC.lessonState(id);
    const mod = CALC.modules.find((m) => m.lessons.includes(id));
    const oi = CALC.order.indexOf(id);
    const prevL = CALC.byId[CALC.order[oi - 1]], nextL = CALC.byId[CALC.order[oi + 1]];
    const si = secIds.indexOf(sec);

    view.innerHTML = `<div class="wrap">
      <div class="crumb">Módulo ${mod.n} · ${esc(mod.title)} · Aula ${l.n}</div>
      <div class="lesson-head"><div style="flex:1 1 320px;min-width:0"><h1>${esc(l.title)}</h1>
        <div class="meta-row"><span class="badge">≈ ${l.min} min</span>${l.patterns.map((p) => `<span class="badge red" title="Padrão de questão das provas">${p}</span>`).join('')}
        <span class="pct" style="margin-left:6px">${CALC.pct(CALC.lessonProgress(l))} concluído</span></div></div>
        <button class="btn ${ls.completed ? 'gold' : ''}" id="doneBtn">${ls.completed ? '✓ Aula concluída' : 'Marcar aula como concluída'}</button>
      </div>
      ${l.prereq && l.prereq.length ? `<div class="callout silver" style="margin-top:16px"><span class="ttl">Pré-requisito</span>${l.prereq.map((p) => `<a href="#/aula/${p}">${esc(CALC.byId[p].title)}</a>`).join(', ')} — ${l.prereqNote ? inl(l.prereqNote) : 'estude antes para aproveitar melhor esta aula.'}</div>` : ''}
      <nav class="tabs" role="tablist">${CALC.SECTIONS.map(([sid, name], k) => `<a class="tab ${sid === sec ? 'active' : ''}" role="tab" href="#/aula/${id}/${sid}">${k + 1}. ${name}${ls.seen.includes(sid) ? '<span class="ck">✓</span>' : ''}</a>`).join('')}</nav>
      <section id="sec"></section>
      <div class="sec-foot">
        ${si > 0 ? `<a class="btn" href="#/aula/${id}/${secIds[si - 1]}">← ${CALC.SECTIONS[si - 1][1]}</a>` : prevL ? `<a class="btn" href="#/aula/${prevL.id}">← Aula anterior: ${esc(prevL.title)}</a>` : '<span></span>'}
        ${si < secIds.length - 1 ? `<a class="btn primary" href="#/aula/${id}/${secIds[si + 1]}">${CALC.SECTIONS[si + 1][1]} →</a>` : nextL ? `<a class="btn primary" href="#/aula/${nextL.id}">Próxima aula: ${esc(nextL.title)} →</a>` : '<a class="btn primary" href="#/simulados">Ir para os simulados →</a>'}
      </div></div>`;

    view.querySelector('#doneBtn').onclick = () => {
      ls.completed = !ls.completed; ls.completedAt = ls.completed ? Date.now() : null; store.save();
      P.lesson(view, id, sec); ui.renderSidebar(); ui.animateIn(view);
      if (ls.completed && !(CALC.mascot && CALC.mascot.event('complete', { aula: l.title }))) ui.toast('Aula concluída!', l.title + ' ⚔');
    };
    const box = view.querySelector('#sec');
    const S = SECTION[sec];
    S(box, l);
  };

  const SECTION = {
    teoria(box, l) {
      const t = l.theory;
      box.innerHTML = `
        ${t.review ? `<div class="callout silver"><span class="ttl">Revisão rápida de pré-requisito</span>${md(t.review)}</div>` : ''}
        <h2 style="margin-top:0">O que é?</h2>${md(t.what)}
        <h2>Para que serve?</h2>${md(t.why)}
        <h2>A lógica por trás</h2>${md(t.logic)}
        <div class="viz-slot"></div>
        <h2>Fórmulas fundamentais</h2>${t.formulas.map(ui.formula).join('')}
        <h2>Quando usar?</h2>${md(t.when)}
        <h2>Erros mais comuns</h2>${t.pitfalls.map(ui.pitfall).join('')}`;
      const viz = ui.visual && ui.visual(l.id);
      if (viz) box.querySelector('.viz-slot').replaceWith(viz); else box.querySelector('.viz-slot').remove();
    },
    identificacao(box, l) {
      const d = l.identify;
      box.innerHTML = `
        <h2 style="margin-top:0">Como reconhecer na prova</h2>
        <div class="card"><h3>Sinais (gatilhos) no enunciado</h3><ul>${d.triggers.map((x) => `<li>${inl(x)}</li>`).join('')}</ul></div>
        <div class="callout"><span class="ttl">Primeiro passo</span>${md(d.first)}</div>
        <h2>Exemplos de identificação</h2>
        ${d.examples.map((e, k) => `<div class="card"><div class="ex-head"><span class="n">Identificação ${k + 1}</span></div>
          <div class="q">${md(e.q)}</div>
          <table class="t"><tr><th style="width:30%">O que observar</th><td>${inl(e.look)}</td></tr>
          <tr><th>Método</th><td>${inl(e.method)}</td></tr>
          <tr><th>Por que é adequado</th><td>${inl(e.why)}</td></tr></table></div>`).join('')}
        <h2>Como escrever na prova</h2>
        <div class="callout gold"><span class="ttl">Respostas sem justificativa não valem</span>${md(d.writing)}</div>`;
    },
    resolvidos(box, l) {
      box.innerHTML = `<p class="lead">Tente resolver cada exemplo antes de abrir a resolução. Dificuldade crescente: o último imita uma questão de prova.</p>`;
      l.solved.forEach((ex, k) => box.appendChild(ui.solved(ex, k)));
    },
    exercicios(box, l) {
      box.innerHTML = `<p class="lead">10 exercícios: 2 fáceis, 4 intermediários, 3 intermediários/avançados e 1 avançado. A resolução só libera depois da sua tentativa.</p><div class="practice-list"></div><div id="rep"></div>`;
      const list = box.querySelector('.practice-list');
      const rep = box.querySelector('#rep');
      const paintRep = () => {
        rep.innerHTML = ui.report(l.practice, (it) => CALC.practiceKey(l.id, it.id), (it, k) => 'Exercício ' + (k + 1));
        rep.querySelectorAll('[data-goto]').forEach((a) => a.onclick = (e) => { e.preventDefault(); goto(Number(a.dataset.goto)); });
      };
      l.practice.forEach((it, k) => list.appendChild(ui.practice(it, CALC.practiceKey(l.id, it.id), 'Exercício ' + (k + 1), () => {
        const before = CALC.lessonState(l.id).completed;
        CALC.checkAutoComplete(l.id); store.save(); paintRep(); ui.renderSidebar();
        if (!before && CALC.lessonState(l.id).completed && !(CALC.mascot && CALC.mascot.event('complete', { aula: l.title }))) ui.toast('Aula concluída!', l.title + ' ⚔');
      })));
      paintRep();
    },
    resumo(box, l) {
      box.innerHTML = ui.summary(l) + `<div class="btn-row"><a class="btn" href="#/resumos">Ver todos os resumos</a></div>`;
    },
    cartoes(box, l) {
      box.innerHTML = `<p class="lead">${l.cards.length} cartões desta aula. Clique no cartão (ou espaço) para virar.</p>`;
      box.appendChild(ui.deck(ui.allCards(l.id), { filename: 'calculo1-' + l.id + '.csv' }));
    },
  };

  /* ================= Galeria de modelos animados ================= */
  P.visuals = function (view) {
    view.innerHTML = `<div class="wrap"><div class="crumb">Visual</div><h1>Modelos animados</h1>
      <p class="lead">Um modelo por aula, na ordem de estudo. Deixe animar ou arraste o controle para explorar no seu ritmo. Cada modelo também aparece na aba Teoria da aula correspondente.</p>
      <div id="vizList"></div></div>`;
    const list = view.querySelector('#vizList');
    CALC.order.forEach((id) => { const v = ui.visual(id); if (v) list.appendChild(v); });
  };

  /* ================= Resumos ================= */
  P.summaries = function (view, id) {
    const ls = id && CALC.byId[id] ? [CALC.byId[id]] : CALC.order.map((x) => CALC.byId[x]);
    view.innerHTML = `<div class="wrap wide"><div class="crumb">Revisão</div><h1>Resumos</h1>
      <p class="lead">Fórmulas, passos e armadilhas de cada aula — sem precisar abri-las. Use "Imprimir" para montar o resumo que você leva para a prova.</p>
      <div class="btn-row no-print" style="margin-bottom:18px"><button class="btn primary" id="print">⎙ Imprimir / salvar PDF</button>
      <select id="pick" style="max-width:340px"><option value="">Todas as aulas</option>${CALC.order.map((x) => `<option value="${x}" ${x === id ? 'selected' : ''}>${CALC.byId[x].n}. ${esc(CALC.byId[x].title)}</option>`).join('')}</select></div>
      ${ls.map((l) => `<section><h2><a href="#/aula/${l.id}" style="color:inherit;text-decoration:none">${l.n}. ${esc(l.title)}</a></h2>${ui.summary(l)}</section>`).join('<hr>')}</div>`;
    view.querySelector('#print').onclick = () => window.print();
    view.querySelector('#pick').onchange = (e) => { location.hash = e.target.value ? '#/resumos/' + e.target.value : '#/resumos'; };
  };

  /* ================= Cartões ================= */
  P.cards = function (view, id) {
    const cards = ui.allCards(id && CALC.byId[id] ? id : null);
    view.innerHTML = `<div class="wrap"><div class="crumb">Memorização</div><h1>Cartões Anki</h1>
      <p class="lead">${cards.length} cartões. Marque "Sabia" ou "Revisar"; use o filtro para treinar só o que errou. O CSV importa direto no Anki (Arquivo → Importar; separador ponto e vírgula; 2 campos: Frente e Verso; HTML ativado).</p>
      <div class="btn-row" style="margin-bottom:16px"><select id="pick" style="max-width:340px"><option value="">Todas as aulas</option>${CALC.order.map((x) => `<option value="${x}" ${x === id ? 'selected' : ''}>${CALC.byId[x].n}. ${esc(CALC.byId[x].title)}</option>`).join('')}</select></div>
      <div id="deck"></div></div>`;
    view.querySelector('#deck').appendChild(ui.deck(cards, { showLesson: !id, filename: id ? 'calculo1-' + id + '.csv' : 'calculo1-todos-os-cartoes.csv' }));
    view.querySelector('#pick').onchange = (e) => { location.hash = e.target.value ? '#/cartoes/' + e.target.value : '#/cartoes'; };
  };

  /* ================= Identificar método ================= */
  P.identify = function (view) {
    const st = store.s;
    let list = CALC.shuffle(CALC.identify), i = 0, right = 0, answered = false;
    view.innerHTML = `<div class="wrap"><div class="crumb">Treino</div><h1>Identificar o método</h1>
      <p class="lead">Olhe a questão e decida <strong>só o método</strong> — sem resolver. É a habilidade que mais economiza tempo na prova.</p>
      <div class="card"><div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><span class="pct" id="cnt"></span><span class="small muted" id="hist"></span></div><div id="ibox"></div></div></div>`;
    const box = view.querySelector('#ibox');
    function paint() {
      view.querySelector('#cnt').textContent = 'Questão ' + Math.min(i + 1, list.length) + ' / ' + list.length + ' · acertos nesta rodada: ' + right;
      view.querySelector('#hist').textContent = 'Histórico: ' + st.identify.right + '/' + st.identify.total;
      if (i >= list.length) {
        box.innerHTML = `<h3>Rodada concluída: ${right}/${list.length}</h3><p>${right === list.length ? 'Perfeito! ⚔' : 'Refaça a rodada até acertar tudo — a ordem muda a cada vez.'}</p><button class="btn primary" id="again">Nova rodada</button>`;
        box.querySelector('#again').onclick = () => { list = CALC.shuffle(CALC.identify); i = 0; right = 0; paint(); };
        return;
      }
      const it = list[i]; answered = false;
      box.innerHTML = `<div class="q" style="font-size:1.1rem">${md(it.q)}</div><div class="choices">${it.options.map((o, k) => `<label class="choice"><input type="radio" name="id" value="${k}"><span>${inl(o)}</span></label>`).join('')}</div>
        <div class="btn-row"><button class="btn primary" id="ok">Confirmar</button><button class="btn" id="nx" hidden>Próxima →</button></div><div class="fb"></div>`;
      box.querySelector('#ok').onclick = () => {
        const sel = box.querySelector('input:checked'); if (!sel || answered) return;
        answered = true; const good = Number(sel.value) === it.correct;
        if (good) right++; st.identify.total++; if (good) st.identify.right++; store.save();
        box.querySelectorAll('.choice').forEach((c, k) => { if (k === it.correct) c.classList.add('correct'); else if (c.contains(sel)) c.classList.add('wrong'); });
        const fb = box.querySelector('.fb'); fb.className = 'fb show ' + (good ? 'ok' : 'bad');
        fb.innerHTML = `<span class="ttl">${good ? 'Isso!' : 'Não é esse.'}</span>${md(it.why)}`;
        if (good) ui.burst(box.querySelector('.choice.correct')); else ui.retrigger(box.querySelector('.choice.wrong'), 'fx-shake');
        box.querySelector('#ok').hidden = true; box.querySelector('#nx').hidden = false; box.querySelector('#nx').focus();
        view.querySelector('#cnt').textContent = 'Questão ' + (i + 1) + ' / ' + list.length + ' · acertos nesta rodada: ' + right;
      };
      box.querySelector('#nx').onclick = () => { i++; paint(); };
    }
    paint();
  };

  /* ================= Simulados ================= */
  P.exams = function (view, id) {
    const st = store.s;
    if (!id) {
      view.innerHTML = `<div class="wrap"><div class="crumb">Treino de prova</div><h1>Simulados</h1>
        <p class="lead">Provas anteriores da disciplina, com resolução comentada e <strong>gabarito corrigido</strong> (os gabaritos originais têm alguns erros de digitação, indicados nas resoluções). Faça com cronômetro, sem consultar nada além do seu resumo.</p>
        ${CALC.exams.map((e) => {
          const items = e.items; let t = 0, c = 0;
          items.forEach((it) => { const r = st.practice['exam:' + e.id + ':' + it.id]; if (r && r.status) { t++; if (r.status === 'correct') c++; else if (r.status === 'partial') c += .5; } });
          return `<a class="card pixel-card" style="display:block;text-decoration:none;color:inherit" href="#/simulados/${e.id}"><h3>${esc(e.title)}</h3><p class="muted small" style="margin:0 0 8px">${esc(e.desc)}</p>${ui.bar(t / items.length)}<p class="small" style="margin:6px 0 0">${t}/${items.length} itens feitos · ${t ? Math.round(100 * c / t) : 0}% de aproveitamento</p></a>`;
        }).join('')}</div>`;
      return;
    }
    const e = CALC.exams.find((x) => x.id === id);
    if (!e) { location.hash = '#/simulados'; return; }
    st.exams[id] = st.exams[id] || { elapsed: 0, running: false, since: null };
    const ex = st.exams[id];
    view.innerHTML = `<div class="wrap"><div class="crumb"><a href="#/simulados" style="color:inherit">Simulados</a></div><h1>${esc(e.title)}</h1>
      <div class="callout silver"><span class="ttl">Regras (como na prova)</span>Respostas sem justificativa não valem · sem calculadora · consulta apenas ao resumo. Escreva a resolução no campo de rascunho e só depois compare.</div>
      <div class="card" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span class="pixel" style="font-size:2.4rem;line-height:1" id="clock">00:00</span><span class="muted small">tempo sugerido: ${e.minutes} min</span>
        <button class="btn primary small" id="tgl"></button><button class="btn small" id="rst">Zerar cronômetro</button></div>
      <div class="practice-list"></div><div id="rep"></div></div>`;
    const clock = view.querySelector('#clock'), tgl = view.querySelector('#tgl');
    const elapsed = () => ex.elapsed + (ex.running ? Date.now() - ex.since : 0);
    const paintClock = () => {
      const s = Math.floor(elapsed() / 1000);
      clock.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
      clock.style.color = s > e.minutes * 60 ? 'var(--red-text)' : '';
      tgl.textContent = ex.running ? '❚❚ Pausar' : (ex.elapsed ? '▶ Retomar' : '▶ Iniciar prova');
    };
    tgl.onclick = () => { if (ex.running) { ex.elapsed = elapsed(); ex.running = false; } else { ex.running = true; ex.since = Date.now(); } store.save(); paintClock(); };
    view.querySelector('#rst').onclick = () => { ex.elapsed = 0; ex.running = false; store.save(); paintClock(); };
    paintClock();
    CALC.ui.timer = setInterval(() => { if (document.body.contains(clock)) paintClock(); else clearInterval(CALC.ui.timer); }, 1000);

    const list = view.querySelector('.practice-list'), rep = view.querySelector('#rep');
    const key = (it) => 'exam:' + e.id + ':' + it.id;
    const paintRep = () => {
      rep.innerHTML = ui.report(e.items, key, (it) => 'Questão ' + it.label);
      rep.querySelectorAll('[data-goto]').forEach((a) => a.onclick = (ev) => { ev.preventDefault(); goto(Number(a.dataset.goto)); });
    };
    e.items.forEach((it) => list.appendChild(ui.practice(it, key(it), 'Questão ' + it.label, paintRep)));
    paintRep();
  };

  /* ================= Configurações ================= */
  P.config = function (view) {
    const st = store.s;
    view.innerHTML = `<div class="wrap"><div class="crumb">Ajustes</div><h1>Configurações</h1>
      <div class="card"><h3>Data da prova</h3><input type="date" id="d" value="${st.settings.examDate}" style="max-width:240px"><p class="small muted" style="margin-top:6px">O cronograma e a contagem regressiva se ajustam a esta data.</p></div>
      <div class="card"><h3>Tema</h3><div class="btn-row"><button class="btn" data-th="dark">◑ Forja (escuro)</button><button class="btn" data-th="light">◐ Pergaminho (claro)</button></div></div>
      <div class="card"><h3>Cavaleiro mascote</h3>
        <p class="small">Ele aparece de vez em quando com motivação, dicas da aula e piadas, e comemora seus acertos. Nunca aparece durante um simulado.</p>
        <label class="task"><input type="checkbox" id="mascotOn" ${st.settings.mascot !== false ? 'checked' : ''}><span>Mostrar o cavaleiro</span></label>
        <div class="btn-row"><button class="btn" id="mascotCall">⚔ Chamar agora</button><button class="btn" id="mascotJoke">Contar uma piada</button></div></div>
      <div class="card"><h3>Backup do progresso</h3>
        <p class="small">O progresso fica salvo neste navegador. Para levar para outro aparelho, exporte aqui e importe lá.</p>
        <div class="btn-row"><button class="btn primary" id="exp">⬇ Exportar progresso (.json)</button>
        <label class="btn">⬆ Importar progresso<input type="file" id="imp" accept=".json,application/json" hidden></label></div><div class="fb" id="fb"></div></div>
      <div class="card"><h3>Zerar tudo</h3><p class="small">Apaga aulas concluídas, respostas, cartões e cronograma deste navegador.</p><button class="btn" id="rst" style="border-color:var(--red);color:var(--red-text)">Zerar progresso</button></div>
      <p class="small muted"><a href="#/dev">Verificação de conteúdo (validador)</a></p></div>`;
    view.querySelector('#d').onchange = (e) => { if (e.target.value) { st.settings.examDate = e.target.value; store.save(); } };
    view.querySelectorAll('[data-th]').forEach((b) => b.onclick = () => { document.documentElement.dataset.theme = b.dataset.th; st.settings.theme = b.dataset.th; store.save(); ui.renderSidebar(); });
    view.querySelector('#mascotOn').onchange = (e) => CALC.mascot && CALC.mascot.setEnabled(e.target.checked);
    view.querySelector('#mascotCall').onclick = () => CALC.mascot && CALC.mascot.summon();
    view.querySelector('#mascotJoke').onclick = () => CALC.mascot && CALC.mascot.joke();
    view.querySelector('#exp').onclick = () => CALC.download('calculo1-progresso-' + CALC.iso(new Date()) + '.json', store.exportJSON(), 'application/json');
    view.querySelector('#imp').onchange = (e) => {
      const f = e.target.files[0]; if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        const fb = view.querySelector('#fb');
        try { const obj = JSON.parse(rd.result); if (!obj || obj.version !== 1) throw new Error('arquivo inválido'); store.replace(obj); fb.className = 'fb show ok'; fb.innerHTML = '<span class="ttl">Importado!</span>Progresso restaurado.'; ui.renderSidebar(); }
        catch (err) { fb.className = 'fb show bad'; fb.innerHTML = '<span class="ttl">Erro.</span>' + esc(err.message); }
      };
      rd.readAsText(f);
    };
    view.querySelector('#rst').onclick = () => { if (confirm('Apagar TODO o progresso deste navegador? Isso não pode ser desfeito.')) { store.reset(); ui.renderSidebar(); P.config(view); } };
  };

  /* ================= Validador de conteúdo ================= */
  P.dev = function (view) {
    const errs = [], warns = [], info = [];
    const texCheck = (s, where) => {
      String(s).replace(/\\\$/g, '').replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (m, a, b) => {
        try { katex.renderToString(a || b, { throwOnError: true, displayMode: !!a, strict: false }); }
        catch (e) { errs.push(where + ': LaTeX inválido — ' + e.message.slice(0, 120)); }
        return '';
      });
    };
    const walk = (obj, where) => {
      if (typeof obj === 'string') texCheck(obj, where);
      else if (Array.isArray(obj)) obj.forEach((x, k) => walk(x, where + '[' + k + ']'));
      else if (obj && typeof obj === 'object') Object.keys(obj).forEach((k) => walk(obj[k], where + '.' + k));
    };
    const selfCheck = (it, where) => {
      const a = it.a;
      if (['num', 'expr', 'anti'].includes(a.t)) { const r = CALC.checker.check(a, a.v); if (!r.ok) errs.push(where + ': gabarito não passa no corretor (' + (r.error || a.v) + ')'); }
      if (a.t === 'set') { const r = CALC.checker.check(a, a.v.join(';')); if (!r.ok) errs.push(where + ': conjunto não confere'); }
      if (a.t === 'multi') { const r = CALC.checker.checkMulti(a, a.fields.map((f) => f.v)); if (r.ok !== true) errs.push(where + ': multi não confere'); }
      if (a.t === 'choice' && !(a.correct >= 0 && a.correct < a.options.length)) errs.push(where + ': alternativa correta inválida');
      if (a.t === 'open' && !(it.rubric && it.rubric.length)) warns.push(where + ': questão aberta sem critérios');
      if (a.t === 'anti' && a.d) { // derivada numérica da resposta oficial = integrando
        const F = CALC.checker.parse(a.v, [a.var || 'x']), f = CALC.checker.parse(a.d, [a.var || 'x']);
        const [lo, hi] = a.domain || [0.3, 2.7];
        for (let k = 1; k < 6; k++) {
          const x = lo + (hi - lo) * k / 6, h = 1e-5, v = a.var || 'x';
          const dF = (F({ [v]: x + h }) - F({ [v]: x - h })) / (2 * h), fx = f({ [v]: x });
          if (Math.abs(dF - fx) > 1e-4 * Math.max(1, Math.abs(fx))) { errs.push(where + ': derivada da antiderivada ≠ integrando em x=' + x.toFixed(3)); break; }
        }
      }
      if (a.t === 'expr' && a.d) { // checa f' = d
        const F = CALC.checker.parse(a.v, [a.var || 'x']), f = CALC.checker.parse(a.d, [a.var || 'x']);
        const [lo, hi] = a.domain || [0.3, 2.7]; const v = a.var || 'x';
        for (let k = 1; k < 6; k++) { const x = lo + (hi - lo) * k / 6, h = 1e-5; const dF = (F({ [v]: x + h }) - F({ [v]: x - h })) / (2 * h), fx = f({ [v]: x }); if (Math.abs(dF - fx) > 1e-4 * Math.max(1, Math.abs(fx))) { errs.push(where + ': derivada ≠ taxa dada'); break; } }
      }
    };
    CALC.lessons.forEach((l) => {
      const w = 'Aula ' + l.n + ' (' + l.id + ')';
      if (l.solved.length !== 5) errs.push(w + ': ' + l.solved.length + ' resolvidos (esperado 5)');
      const lv = l.solved.map((s) => s.lvl).join(''); if (lv !== '12345') warns.push(w + ': níveis dos resolvidos = ' + lv);
      if (l.practice.length !== 10) errs.push(w + ': ' + l.practice.length + ' exercícios (esperado 10)');
      const dist = {}; l.practice.forEach((p) => dist[p.lvl] = (dist[p.lvl] || 0) + 1);
      if (dist.F !== 2 || dist.I !== 4 || dist.IA !== 3 || dist.A !== 1) errs.push(w + ': distribuição ' + JSON.stringify(dist));
      if (l.cards.length < 5 || l.cards.length > 10) errs.push(w + ': ' + l.cards.length + ' cartões');
      const ids = new Set(); l.practice.forEach((p) => { if (ids.has(p.id)) errs.push(w + ': id repetido ' + p.id); ids.add(p.id); });
      if (l.identify.examples.length < 2) errs.push(w + ': menos de 2 exemplos de identificação');
      walk(l, w);
      l.practice.forEach((p, k) => selfCheck(p, w + ' ex' + (k + 1)));
      info.push(`${w}: ${l.solved.length} resolvidos · ${l.practice.length} exercícios · ${l.cards.length} cartões`);
    });
    CALC.exams.forEach((e) => { walk(e, e.id); e.items.forEach((it) => selfCheck(it, e.id + ' q' + it.label)); });
    walk(CALC.identify, 'identificar'); walk(CALC.schedule, 'cronograma');
    CALC.identify.forEach((it, k) => { if (!(it.correct >= 0 && it.correct < it.options.length)) errs.push('identificar ' + k + ': alternativa inválida'); });
    view.innerHTML = `<div class="wrap"><div class="crumb">Desenvolvimento</div><h1>Validação de conteúdo</h1>
      <div class="card ${errs.length ? '' : 'pixel-card'}"><h3>${errs.length ? '✗ ' + errs.length + ' erro(s)' : '✓ Nenhum erro encontrado'}</h3>${errs.length ? '<ul>' + errs.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' : ''}</div>
      ${warns.length ? `<div class="card"><h3>Avisos (${warns.length})</h3><ul>${warns.map((x) => '<li>' + esc(x) + '</li>').join('')}</ul></div>` : ''}
      <div class="card"><h3>Inventário</h3><ul>${info.map((x) => '<li>' + esc(x) + '</li>').join('')}</ul>
      <p>Simulados: ${CALC.exams.length} · Itens de identificação: ${CALC.identify.length} · Dias de cronograma: ${CALC.schedule.length} · Cartões: ${ui.allCards().length}</p></div></div>`;
    window.__validation = { errs, warns };
  };
})();
