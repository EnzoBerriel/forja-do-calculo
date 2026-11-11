'use strict';
/* =========================================================
   Roteador (hash) e inicialização
   ========================================================= */
(function () {
  const view = document.getElementById('view');
  const P = CALC.pages, ui = CALC.ui, store = CALC.store;

  function route() {
    clearInterval(ui.timer);
    const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/').filter(Boolean);
    const [page, a, b] = parts;
    document.body.classList.remove('nav-open');
    switch (page) {
      case undefined: P.dashboard(view); break;
      case 'aula':
        P.lesson(view, a, b);
        store.s.last = { route: '#/aula/' + a + '/' + (b || 'teoria'), at: Date.now() }; store.save();
        break;
      case 'resumos': P.summaries(view, a); break;
      case 'cartoes': P.cards(view, a); break;
      case 'cronograma': P.schedule(view); break;
      case 'identificar': P.identify(view); break;
      case 'simulados': P.exams(view, a); break;
      case 'config': P.config(view); break;
      case 'dev': P.dev(view); break;
      default: P.dashboard(view);
    }
    ui.renderSidebar();
    ui.animateIn(view);
    const titles = { aula: CALC.byId[a] ? CALC.byId[a].title : 'Aula', resumos: 'Resumos', cartoes: 'Cartões', cronograma: 'Cronograma', identificar: 'Identificar método', simulados: 'Simulados', config: 'Configurações', dev: 'Validação' };
    document.title = (page ? titles[page] + ' · ' : '') + 'Forja do Cálculo';
    window.scrollTo(0, 0);
  }

  // Ordem de estudo = ordem do cronograma
  CALC.examDate();
  window.addEventListener('hashchange', route);
  document.getElementById('menuBtn').onclick = () => {
    const open = document.body.classList.toggle('nav-open');
    document.getElementById('menuBtn').setAttribute('aria-expanded', String(open));
  };
  document.getElementById('scrim').onclick = () => document.body.classList.remove('nav-open');
  route();
})();
