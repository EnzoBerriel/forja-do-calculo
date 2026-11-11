# Arquitetura — Plataforma de Estudos de Cálculo 1

> Documento-base do projeto. Define **o que** ensinar (arquitetura pedagógica, derivada das provas reais) e **como** construir (arquitetura técnica). Toda decisão de conteúdo e código deve ser rastreável até aqui.

- **Prova-alvo:** Prova 2 de Cálculo a Uma Variável (BCC)
- **Data estimada:** 24/11/2026 (14 dias a partir de 10/11/2026, ajustável no site)
- **Fontes analisadas:** Prova 2 — 2024.2 (versões A e B) e Prova 2 — 2025.2 (versões A e B), com gabarito

---

## 1. Raio-X das provas

### 1.1 Estrutura que se repete

As quatro versões têm **5 a 6 questões**, sempre na mesma ordem lógica. Cada versão B é a versão A com outros números, então o professor **mantém o padrão e troca os parâmetros**. Por isso o site treina **padrões de questão**, e não questões isoladas.

| # | Padrão de questão | 2024.2 | 2025.2 | Aula(s) |
|---|---|---|---|---|
| P1 | Limite 0/0 com produto de funções (regra do produto e da cadeia) | Q1a | — | L1 |
| P2 | Limite **∞ − ∞** → juntar frações → 0/0 → L'Hôpital **2 vezes** | Q1b | Q1b (com `arctg`) | L1 |
| P3 | Limite **∞/∞** com `ln(x + e^{kx})/x` → L'Hôpital **3 vezes** (resposta = k) | — | Q1a | L1 |
| P4 | **Integral imprópria** ∫₀^∞ resolvida por **substituição** (numerador = c·u′) | Q5a | Q1c | L5 + L10 |
| P5 | **Otimização** de sólido com custo por área (cilindro ou caixa de base quadrada) | Q2 | Q2 | L3 |
| P6 | Polinômio par (x⁶ e x⁴): números críticos, crescimento, máx/mín locais | Q3a | Q3b | L2 |
| P7 | **Concavidade e inflexão** + tabela de pontos + **esboço do gráfico** | Q3b | Q3b | L2 |
| P8 | **Método do Intervalo Fechado** (máx/mín globais em [a, b]) | — | Q3a | L2 |
| P9 | **PVI**: dado f′(t) e um ponto, achar f(t) por **substituição**; depois usar **−1 ≤ sen, cos ≤ 1** para achar máximo | Q4 | Q4 | L8 + L10 |
| P10 | **Área entre curvas**: interseções → tabela → quem está por cima → integral | Q6 | Q5 | L9 |
| P11 | **Frações parciais com fator linear repetido** `x(2x±1)²` | Q5b | — | L12 |
| P12 | **Integração por partes** `√(1+x)·ln(1+x)` (LIATE) | Q5c | — | L11 |

### 1.2 Conclusões pedagógicas (decisões que mudam o site)

1. **Substituição é a técnica mais cobrada**: aparece em P4, P9 e P10, ou seja, em 3 das 5 questões de cada prova. Ela é ensinada no Módulo 4, mas é **pré-requisito** dos Módulos 2 (impróprias) e 3. → O **cronograma** estuda Substituição antes do Módulo 3. A navegação mantém a ordem dos módulos que você definiu, e as aulas 8 e 9 exibem um aviso de pré-requisito.
2. **Lacuna 1 — Esboço de gráfico (concavidade/inflexão)**: P7 vale uma questão inteira e não estava na lista de assuntos. → Entra na **Aula 2**, que passa a se chamar "Máximos, mínimos e esboço de gráfico".
3. **Lacuna 2 — Integrais impróprias** (∫₀^∞ = lim_{b→∞} ∫₀^b): aparecem nas duas provas. → Entram na **Aula 5** (Integrais definidas), e o padrão completo P4 é treinado na **Aula 10**.
4. **"Respostas não justificadas não serão consideradas"**: a prova cobra **escrita**. → Toda resolução do site segue o formato de redação de prova (identificar a indeterminação, escrever o "Logo, podemos usar L'Hôpital", justificar que o ponto crítico é máximo global etc.), e existe um bloco **"Como escrever na prova"** em cada aula.
5. **Consulta permitida ao "resumo"**: a Seção 5 de cada aula é desenhada para servir de base para o **resumo de 1 página** que você leva para a prova (e há uma página que junta todos para imprimir).
6. **Sem calculadora**: os exercícios usam números "amigáveis" e dão aproximações (como √10 ≈ 3,2), igual à prova.

### 1.3 Erros encontrados nos gabaritos (para não aprender errado)

| Prova | Questão | No gabarito | Correto |
|---|---|---|---|
| 2025.2 A | Q2 | Domínio `0 < R < √128` | `0 < R < √108` (porque h > 0 ⇒ 216 − 2R² > 0 ⇒ R² < 108) |
| 2025.2 A | Q4b | "altura do prédio é de 72 m" | **76 m** (a própria conta dá 0 ≤ h ≤ 76) |
| 2025.2 B | Q1a | denominador `1 + 4e^{2x}` | `1 + 2e^{2x}` (resultado final 2 está certo) |
| 2025.2 B | Q2 | "V(6) = 500π" | **V(5)** = 500π |
| 2025.2 B | Q4 | enunciado pede "h′(t)"; resposta final usa `cos` | pede-se **h(t)**; h(t) = 40·**sen**(√(t+1)) + 40 |
| 2024.2 A/B | Q2 | C_min = 2304 **cm²** / 2400 **cm²** | a unidade é **R$** (é custo) |
| 2024.2 A/B | Q3b | "o sinal será o mesmo de v(x) = x² − 1" (ou x² − 4) | o fator certo é **5x² − 3** (ou 5x² − 12); as conclusões estão certas |
| 2024.2 B | Q2 | "V = A_b·h = 20" | = 2000 |

Esses itens viram cartões e avisos de "armadilha" nas aulas correspondentes.

---

## 2. Arquitetura pedagógica

### 2.1 Princípios

- **Exercício primeiro, texto mínimo.** Teoria curta (cerca de 5 minutos de leitura); o tempo maior vai para exercícios.
- **Reconhecer antes de resolver.** Cada aula treina a pergunta "que tipo de questão é essa?" (Seção 2) antes do cálculo.
- **Feedback honesto.** Correção automática só quando uma resposta final comprova algo (número, expressão, conjunto). Questões de desenvolvimento usam **autoavaliação guiada por critérios** (rubrica), sem fingir uma correção automática.
- **Padrões de prova explícitos.** Cada aula termina com pelo menos 1 exercício "estilo prova", calibrado nos padrões P1–P12.
- **Recuperação ativa.** Resolução escondida até você tentar; cartões com "sabia/não sabia"; revisão guiada pelos erros.

### 2.2 Sequência de aulas (navegação × ordem de estudo)

| Aula | Título | Módulo | Ordem no cronograma | Pré-requisitos |
|---|---|---|---|---|
| L1 | Regra de L'Hôpital | 1 | 1 | derivadas, regra da cadeia |
| L2 | Máximos, mínimos e esboço de gráfico | 1 | 2 | L1 (derivadas) |
| L3 | Problemas de otimização | 1 | 3 | L2 |
| L4 | Integrais indefinidas | 2 | 4 | derivadas |
| L7 | Integração de funções elementares | 2 | 5 | L4 |
| L5 | Integrais definidas (+ impróprias) | 2 | 6 | L4, L7 |
| L6 | Aplicações e propriedades das integrais | 2 | 7 | L5 |
| L10 | Substituição simples | 4 | 8 | L7 |
| L8 | Problemas de valor inicial | 3 | 9 | L10 |
| L9 | Área entre curvas | 3 | 10 | L5, L10 |
| L11 | Integração por partes | 4 | 11 | L10 |
| L12 | Frações parciais (lineares simples e repetidos) | 4 | 12 | L7, L10 |

> A barra lateral mostra os módulos na ordem 1→4. O dashboard e o botão "Próxima aula" seguem a **ordem do cronograma**.

### 2.3 Modelo obrigatório de aula (6 seções)

| Seção | Conteúdo | Componente | Tempo-alvo |
|---|---|---|---|
| 1. Teoria objetiva | O que é · Para que serve · Lógica · Fórmulas · Quando usar · Erros comuns · *Revisão rápida de pré-requisito* (quando necessário) | `TheoryBlock`, `FormulaBox`, `PitfallList` | 5–8 min |
| 2. Identificação e aplicação | Gatilhos visuais · 1º passo · Método · Por quê · ≥ 2 mini-exemplos · **"Como escrever na prova"** | `IdentifyCard`, `ExamWriting` | 5 min |
| 3. 5 exercícios resolvidos | Muito fácil → Avançado (estilo prova). Enunciado / Identificação / Passo a passo com justificativa / Resposta destacada; botão mostrar/ocultar | `SolvedExercise` | 15 min |
| 4. 10 exercícios interativos | 2 F · 4 I · 3 I/A · 1 A. Resposta → correção → resolução comentada. Relatório final | `PracticeExercise`, `PracticeReport` | 20–30 min |
| 5. Resumo | Fórmulas · Quando usar · Passo a passo · Erros · Memorizar | `SummarySheet` (também acessível fora da aula) | 3 min |
| 6. Cartões Anki | 5–10 cartões: definição, fórmula, aplicação, identificação, diferença entre conceitos | `FlashcardDeck` | 5 min |

### 2.4 Regras de qualidade dos exercícios

- **Variação real**: dentro dos 10 exercícios práticos, cada um testa um **sub-padrão diferente** (marcado por `tags`). Proibido repetir a mesma estrutura só trocando números.
- **Matriz de dificuldade**:
  - *Fácil*: 1 conceito, 1–2 passos.
  - *Intermediário*: 1 conceito + álgebra não trivial, ou 2 conceitos encadeados.
  - *Intermediário/avançado*: exige reconhecer o método sem dica, ou aplicar o método 2 vezes.
  - *Avançado*: réplica estrutural de um padrão P1–P12 com números novos.
- **Resoluções**: nenhum passo algébrico importante pulado; cada linha tem uma justificativa ("pela regra da cadeia…", "como f′ muda de + para −…").
- **Respostas verificadas**: todo gabarito numérico é conferido pelo validador interno (§3.8) antes de entrar no site.

### 2.5 Tipos de resposta e correção

| Tipo | Exemplo | Como corrige |
|---|---|---|
| `numeric` | lim = 3/2; V = 864π | Avalia a expressão digitada (aceita `3/2`, `1,5`, `864pi`, `2e^2`) e compara com tolerância relativa de 1e-6 |
| `expression` | f′(x), h(t) | Equivalência numérica em 8 pontos aleatórios do domínio informado |
| `antiderivative` | ∫ … dx | Ignora `+ C`; aceita se F_usuário − F_ref for **constante** em todos os pontos de teste |
| `set` | números críticos {0, ±√10} | Compara conjuntos numéricos (a ordem não importa) |
| `interval` | crescente em (−√10, 0) ∪ (√10, ∞) | Compara extremos de intervalos (usando o mesmo parser) |
| `multi` | A, B, C das frações parciais | Vários campos, cada um `numeric` |
| `choice` | "Qual método usar?" | Alternativa correta + explicação de cada distrator |
| `open` | esboço de gráfico, justificativa de máximo global | Você escreve → revela a resolução + **checklist de critérios** → marca *Acertei / Parcial / Errei* |

Normalização da entrada (em português): `sen→sin`, `tg→tan`, `arctg→atan`, `ln→log`, `√→sqrt`, `π→pi`, `·→*`, vírgula decimal entre dígitos → ponto, multiplicação implícita (`2x`, `3pi`).

Relatório ao final dos 10 exercícios: acertos, erros, parciais, % de aproveitamento e **"Revise:"**, que agrupa as `tags` dos itens errados e liga cada uma ao trecho da teoria correspondente.

### 2.6 Plano de conteúdo por aula

Para cada aula: objetivos, núcleo de fórmulas, armadilhas e **âncora de prova** (o padrão que o exercício avançado replica).

**L1 — Regra de L'Hôpital**
- Objetivos: identificar 0/0 e ∞/∞; transformar ∞ − ∞ e 0·∞ em quociente; aplicar a regra repetidas vezes; escrever a justificativa.
- Fórmulas: lim f/g = lim f′/g′ (se 0/0 ou ±∞/±∞); 0·∞ → f/(1/g); ∞ − ∞ → fração única; derivadas de eˣ, ln, arctg, sen/cos com cadeia.
- Armadilhas: derivar o quociente com a regra do quociente (errado: deriva-se numerador e denominador **separados**); aplicar sem checar a indeterminação; esquecer a cadeia em e^{kx}.
- Âncoras: P1, P2 (com `arctg` e com `e^{kx} − 1`), P3.

**L2 — Máximos, mínimos e esboço de gráfico**
- Objetivos: números críticos; teste da 1ª derivada; Método do Intervalo Fechado; teste da 2ª derivada; concavidade, inflexão; roteiro de esboço de 6 passos (igual ao da prova); tabela de sinais.
- Fórmulas: f′ = 0 ou não existe; sinal de f′ → cresce/decresce; sinal de f″ → concavidade; a inflexão exige **mudança** de sinal de f″.
- Armadilhas: x = 0 em 6x²(…) **não** é inflexão (não há troca de sinal); esquecer as extremidades no intervalo fechado; confundir local com global.
- Âncoras: P6, P7, P8 com polinômio par de grau 6.

**L3 — Problemas de otimização**
- Objetivos: roteiro de 6 passos (variáveis → restrição → função objetivo de 1 variável → domínio → crítico → justificar global).
- Âncoras: P5 (cilindro com orçamento e custos diferentes para tampa/base/lateral; caixa de base quadrada com volume fixo e custo mínimo).
- Armadilhas: esquecer o domínio; não justificar o "global" (único crítico + comportamento nas pontas/limites).

**L4 — Integrais indefinidas**
- Antiderivada, família + C, linearidade, verificação por derivação, regra da potência (n ≠ −1), reescrever raízes e frações como potências (dica literal das provas: ⁿ√aᵐ = a^{m/n}).

**L7 — Integração de funções elementares**
- Tabela essencial (potência, 1/x → ln|x|, eˣ, e^{kx}, sen, cos, sec², 1/(1+x²) → arctg); integrais de (ax+b)ⁿ e 1/(ax+b) com o fator 1/a.
- Armadilha: ∫1/x² ≠ ln(x²); ∫e^{x²} não é elementar.

**L5 — Integrais definidas (+ impróprias)**
- Soma de Riemann (intuição apenas), Teorema Fundamental do Cálculo, notação [F]ₐᵇ, **troca de limites na substituição**, integral imprópria ∫ₐ^∞ = lim_{b→∞}, convergência; dica da prova: t^{−a/b}/(−a/b) = −b/(a·t^{a/b}).

**L6 — Aplicações e propriedades**
- Linearidade, aditividade em intervalos, ∫ₐᵃ = 0, inversão de limites, comparação, simetria (par/ímpar), valor médio; aplicações: área com sinal, variação total (∫ taxa = variação), deslocamento × distância.

**L10 — Substituição simples**
- Gatilho: "uma função e (múltiplo de) sua derivada"; escolha de u; ajuste de constante (9du = (27e^{3x} + 45e^{5x})dx); definida com troca de limites.
- Âncora: P4 completo (substituição + imprópria).

**L8 — Problemas de valor inicial**
- f(t) = ∫f′(t)dt + C; achar C com o ponto dado; interpretar o resultado (valor inicial, máximo via −1 ≤ sen ≤ 1, "ultrapassa o limite legal?").
- Âncora: P9 (elevador e depósito de lixo).

**L9 — Área entre curvas**
- Roteiro de prova: (1) interseções; (2) tabela com pontos entre as raízes; (3) quem está por cima; (4) esboço; (5) A = ∫(cima − baixo); (6) dividir em sub-intervalos quando as curvas se cruzam.
- Âncora: P10 (reta × raiz; quárticas com raiz dupla x²(x − a)²).

**L11 — Integração por partes**
- ∫u dv = uv − ∫v du; LIATE (Log, Inversa trig, Algébrica, Trig, Exponencial); partes repetidas; o caso ∫ln x dx.
- Âncora: P12.

**L12 — Frações parciais**
- Pré-condição: grau(num) < grau(den) (senão, divisão longa — só mencionada); fatores lineares distintos; fator repetido (A/x + B/(ax+b) + C/(ax+b)²); dois métodos para achar coeficientes (raízes "espertas" e igualdade de coeficientes); integração final com ln e potência.
- Âncora: P11.

### 2.7 Recursos transversais

- **Treino de identificação de métodos** (usado nos dias 13–14): banco misto de integrais e limites; você só escolhe o método (`choice`) e recebe a explicação.
- **Simulados**: as 4 versões das provas reais (com o gabarito corrigido) + 1 simulado inédito, com cronômetro opcional de 100 min e correção por item.
- **Resumão imprimível**: junta as Seções 5 das 12 aulas em uma página A4 (CSS de impressão), pensado para virar o resumo permitido na prova.

---

## 3. Arquitetura técnica

### 3.1 Decisões de stack (e por quê)

| Decisão | Escolha | Motivo |
|---|---|---|
| Framework | **Nenhum**: HTML + CSS + JavaScript puro | A máquina não tem Node nem Python; o site precisa abrir com **duplo clique em `index.html`**, sem instalar nada |
| Carregamento | Scripts clássicos (não ES modules) que registram em `window.CALC` | ES modules são bloqueados em `file://` |
| Fórmulas | **KaTeX** 0.16.11 via CDN (jsDelivr), chamado diretamente (`renderToString`) | Rápido e gratuito. *Implementado:* a escolha foi CDN em vez de `vendor/`, então as fórmulas precisam de internet |
| Correção algébrica | **Parser próprio** (`assets/js/checker.js`) | *Implementado:* substituiu o math.js. Entende a notação brasileira (sen, tg, arctg, vírgula decimal, √, \|x\|) e não tem dependência externa |
| Identidade visual | Paleta Code Forge; tema escuro "forja" e claro "pergaminho"; títulos em VT323 (pixel) e corpo em Inter; cavaleiro em pixel art (SVG) | O pixel art fica só na identidade; o texto prioriza a leitura |
| Rotas | Hash router (`#/aula/lhopital/exercicios`) | Funciona em `file://` e em qualquer hospedagem estática |
| Persistência | `localStorage` com esquema versionado + exportar/importar backup em JSON | O progresso sobrevive ao fechamento do navegador; o backup protege contra limpeza de dados |
| Fontes | Pilha do sistema (`system-ui`, `Segoe UI`) + KaTeX | Zero dependência de rede |
| Hospedagem (opcional) | GitHub Pages / Netlify Drop (grátis) | Para usar no celular; funciona sem alterar nada |

> Limitação: o `localStorage` é **por navegador/dispositivo**. O progresso do PC não aparece no celular automaticamente. Alternativa funcional: botões **Exportar progresso / Importar progresso** (arquivo JSON) na página de configurações.

### 3.2 Estrutura de pastas

```
Site - Calculo/
├── index.html                  # shell único: sidebar + <main id="view">
├── ARQUITETURA.md              # este documento
├── README.md                   # como abrir, como estudar, backup
├── vendor/
│   ├── katex/                  # katex.min.js, katex.min.css, auto-render, fonts/
│   └── mathjs/math.min.js
├── assets/
│   ├── css/
│   │   ├── tokens.css          # cores, espaçamento, tipografia (claro/escuro)
│   │   ├── base.css            # reset, tipografia, links, foco
│   │   ├── layout.css          # sidebar, grid, responsivo
│   │   ├── components.css      # cards, botões, badges, progress, flashcards
│   │   └── print.css           # resumão A4
│   └── js/
│       ├── core/
│       │   ├── namespace.js    # window.CALC = { content, ui, pages, ... }
│       │   ├── store.js        # leitura/escrita/migração do localStorage
│       │   ├── progress.js     # cálculo de % por aula/módulo/geral
│       │   ├── router.js       # hash → página; guarda a "última posição"
│       │   └── dom.js          # helpers h(), qs(), escape
│       ├── math/
│       │   ├── render.js       # wrapper KaTeX (renderiza um container)
│       │   ├── normalize.js    # sen→sin, vírgula decimal, √, π…
│       │   └── checker.js      # numeric | expression | antiderivative | set | interval | multi
│       ├── components/
│       │   ├── Sidebar.js  ProgressBar.js  Countdown.js  ThemeToggle.js
│       │   ├── TheoryBlock.js  FormulaBox.js  PitfallList.js  IdentifyCard.js
│       │   ├── SolvedExercise.js  PracticeExercise.js  PracticeReport.js
│       │   ├── SummarySheet.js  FlashcardDeck.js  ScheduleTable.js
│       │   └── SectionNav.js   # abas das 6 seções da aula
│       ├── pages/
│       │   ├── dashboard.js  lesson.js  summaries.js  flashcards.js
│       │   ├── schedule.js   identify.js  exams.js  settings.js
│       │   └── dev-validate.js # validador de conteúdo (rota oculta #/dev)
│       └── app.js              # bootstrap: tema, store, router
└── content/
    ├── course.js               # módulos, ordem de navegação e de estudo
    ├── lessons/
    │   ├── l01-lhopital.js     … l12-fracoes-parciais.js
    ├── identify-bank.js        # treino de identificação
    ├── exams.js                # simulados (provas reais corrigidas + inédito)
    └── schedule.js             # cronograma de 14 dias
```

Ordem de carregamento no `index.html`: vendor → core → math → components → content → pages → app.

### 3.3 Separação conteúdo × código

**Conteúdo é dado.** Cada aula é um arquivo que só chama `CALC.content.addLesson({...})`. Os componentes não sabem nada de Cálculo; renderizam o esquema. Escrever ou corrigir uma aula nunca exige mexer em código de interface.

### 3.4 Esquema de uma aula

```js
CALC.content.addLesson({
  id: "lhopital",                  // estável: usado como chave de progresso
  module: 1, number: 1,
  title: "Regra de L'Hôpital",
  estMinutes: 55,
  prereqs: [],                     // ids de aulas; gera aviso na página
  examPatterns: ["P1","P2","P3"],

  theory: {                        // Seção 1
    what: md`...`, why: md`...`, logic: md`...`,
    formulas: [{ tex: "\\lim ...", when: "..." }],
    whenToUse: md`...`,
    pitfalls: [{ wrong: md`...`, right: md`...`, why: md`...` }],
    prereqReview: md`...`          // opcional
  },

  identify: {                      // Seção 2
    triggers: ["Substituir dá 0/0", "..."],
    firstStep: md`...`,
    examples: [{ statement: md`...`, look: md`...`, method: md`...`, why: md`...` }],
    examWriting: md`Modelo de redação: "Como lim ... = 0/0, podemos usar..."`
  },

  solved: [                        // Seção 3 — exatamente 5
    { id: "s1", level: 1, statement: md`...`, method: md`...`,
      steps: [{ do: tex`...`, why: md`...` }], answer: tex`...` }
  ],

  practice: [                      // Seção 4 — exatamente 10 (2/4/3/1)
    { id: "p01", level: "facil", tags: ["indeterminacao-0/0"],
      statement: md`...`,
      answer: { type: "numeric", value: "3/2" },        // ver §2.5
      // ou { type: "antiderivative", value: "-log(abs(x))+2log(abs(2x+1))+1/(2x+1)", domain: [0.1, 3] }
      // ou { type: "open", rubric: ["Identificou ∞−∞", "Juntou as frações", ...] }
      hint: md`...`,               // opcional, liberado após 1 erro
      solution: { steps: [...], answer: tex`...` },
      reviewRef: "theory.pitfalls.0" }
  ],

  summary: {                       // Seção 5
    formulas: [...], whenToUse: [...], steps: [...], pitfalls: [...], memorize: [...]
  },

  cards: [                         // Seção 6 — 5 a 10
    { id: "c01", kind: "identificacao", front: md`...`, back: md`...` }
  ]
});
```

`md` e `tex` são *tagged templates* simples: `md` aceita **negrito**, listas e LaTeX inline `$...$`; `tex` é LaTeX em bloco. A validação do esquema (5 resolvidos, 10 práticos na distribuição 2/4/3/1, 5–10 cartões, ids únicos) roda em `#/dev/validar`.

### 3.5 Esquema de persistência (`localStorage["calc1:v1"]`)

```json
{
  "version": 1,
  "settings": { "examDate": "2026-11-24", "theme": "system" },
  "last": { "route": "#/aula/lhopital/exercicios", "at": 1731200000000 },
  "lessons": {
    "lhopital": { "seen": ["teoria","identificacao","resolvidos"], "completed": false, "completedAt": null }
  },
  "practice": {
    "lhopital:p03": { "status": "correct|wrong|partial", "attempts": 2,
                      "lastAnswer": "3/2", "work": "texto livre", "revealed": true }
  },
  "cards": { "lhopital:c02": { "known": true, "seenCount": 3 } },
  "schedule": { "d01:a": true, "d01:b": false },
  "exams": { "2024-2A": { "items": { "q1a": "correct" }, "startedAt": null } }
}
```

- `store.js` centraliza tudo: `get(path)`, `set(path, value)`, `subscribe(fn)`; grava com *debounce*; lê com `try/catch` (navegação privada, cota cheia).
- `migrate()` converte versões antigas, para que uma atualização do site não apague o progresso.

### 3.6 Regras de progresso

- **Aula concluída** = as 6 seções visitadas **e** os 10 exercícios tentados (ou marcação manual "Concluir aula", que fica registrada).
- **% da aula** = 40% seções visitadas + 60% exercícios tentados.
- **% do módulo** = média das aulas. **% geral** = média das 12 aulas.
- **Aproveitamento** (separado do progresso) = acertos / tentados; parcial vale 0,5.
- **Continuar de onde parei** = `last.route`, atualizado a cada troca de seção ou aula.

### 3.7 Páginas e rotas

| Rota | Página | Conteúdo |
|---|---|---|
| `#/` | Dashboard | Título, contagem regressiva editável, progresso geral, módulos com % e status, "Continuar", "Hoje no cronograma", atalho para cartões, aproveitamento por aula |
| `#/aula/:id/:secao?` | Aula | Abas das 6 seções, navegação anterior/próxima, botão concluir |
| `#/resumos` (`/:id`) | Resumos | Todas as Seções 5, sem abrir as aulas; botão imprimir |
| `#/cartoes` (`/:id`) | Cartões | Deck por aula ou todos; revelar, sabia/não sabia, embaralhar, exportar CSV |
| `#/cronograma` | Cronograma | 14 dias, checkboxes, versão completa/corrida |
| `#/identificar` | Treino de métodos | Banco misto |
| `#/simulados` (`/:id`) | Simulados | Provas reais corrigidas + inédito |
| `#/config` | Configurações | Data da prova, tema, exportar/importar/zerar progresso |

### 3.8 Exportação CSV para o Anki

- Gera um arquivo UTF-8 **com BOM**, separador `;`, com 2 colunas, `Frente;Verso`, aspas duplas escapadas (`""`).
- LaTeX convertido para a sintaxe do Anki: `$...$` → `\(...\)` e `$$...$$` → `\[...\]` (o Anki renderiza com MathJax).
- Linha de cabeçalho opcional (o Anki ignora com `#separator:semicolon` + `#columns:Frente;Verso`).
- Download via `Blob` + `URL.createObjectURL`. Opções: aula atual ou todas.

### 3.9 Validação de conteúdo (sem Node)

`#/dev/validar` percorre todas as aulas e mostra um relatório na tela:
1. contagens e distribuição de dificuldade;
2. ids únicos;
3. todo LaTeX renderiza sem erro no KaTeX;
4. para `numeric`, `expression` e `antiderivative`, o checker aceita a própria resposta oficial, e um campo opcional `selfCheck` permite conferências extras (por exemplo, derivar numericamente a antiderivada e comparar com o integrando);
5. cartões têm frente e verso.

Isso cobre os itens 1–3 da sua "Entrega final" de forma repetível.

### 3.10 Design visual (tokens)

- Claro: fundo `#FBFBFA`, superfície `#FFFFFF`, texto `#1F2328`, secundário `#59636E`, borda `#E6E6E3`, acento azul `#2F6FEB`; estados: sucesso `#1A7F37`, erro `#CF222E`, parcial `#9A6700`.
- Escuro: fundo `#0E1116`, superfície `#161B22`, texto `#E6EDF3`, borda `#30363D`, acento `#4C8DFF`.
- Tipografia: 17px de corpo, linha 1.65, largura máxima de leitura de 72ch; KaTeX a 1.05em.
- Layout: sidebar fixa de 280px no desktop; abaixo de 900px vira gaveta com botão ☰; gutter de 16px no celular; nenhum scroll horizontal (fórmulas longas ganham scroll próprio dentro do bloco).
- Componentes com cantos de 8px, bordas de 1px, sem sombras pesadas, sem animação além de transições de 150ms.
- Acessibilidade: foco visível, botões reais (`<button>`), contraste AA, `aria-expanded` nos "mostrar resolução".

---

## 4. Cronograma de 14 dias (rascunho)

Sessão padrão: **50–60 min**. Versão corrida: **25–30 min**, que cobre teoria + 3 resolvidos + 4 práticos e deixa o restante para o dia seguinte.

| Dia | Data | Foco | Atividades |
|---|---|---|---|
| 1 | 11/11 | L1 L'Hôpital | Teoria + identificação + resolvidos; 5 práticos |
| 2 | 12/11 | L1 → L2 | 5 práticos de L1 restantes; L2: críticos, crescimento, intervalo fechado |
| 3 | 13/11 | L2 | Concavidade, inflexão, roteiro de esboço; práticos |
| 4 | 14/11 | L3 Otimização | Aula completa (padrão P5) |
| 5 | 15/11 | L4 + L7 | Indefinidas + tabela de integrais elementares |
| 6 | 16/11 | L5 | Definidas, TFC, impróprias |
| 7 | 17/11 | L6 + revisão | Propriedades/aplicações; cartões de L1–L7; mini-simulado dos Módulos 1–2 |
| 8 | 18/11 | L10 Substituição | Aula completa — **a técnica mais cobrada** |
| 9 | 19/11 | L8 PVI | Aula completa (padrão P9) |
| 10 | 20/11 | L9 Área | Aula completa (padrão P10) |
| 11 | 21/11 | L11 Partes | Aula completa (padrão P12) |
| 12 | 22/11 | L12 Frações parciais | Aula completa (padrão P11) |
| 13 | 23/11 | Revisão | Resumão (montar o resumo permitido), treino de identificação de métodos, exercícios mistos, cartões errados |
| 14 | 24/11* | Simulado | 1 prova real cronometrada + correção pelos critérios + revisão dos erros |

\* Se a prova for no dia 24, o dia 14 vira o dia 13 e o simulado é feito na véspera. O cronograma recalcula as datas a partir da data configurada.

---

## 5. Plano de construção

| Fase | Entregas | Critério de pronto |
|---|---|---|
| F0 — Base | Pastas, `index.html`, vendor (KaTeX, math.js), tokens CSS, tema claro/escuro | Abre com duplo clique, o tema alterna e persiste |
| F1 — Núcleo | `store`, `router`, `progress`, `render`, `normalize`, `checker` | Checker passa uma bateria de casos (frações, π, +C, sen/ln, vírgula) |
| F2 — Componentes | Todos os da §3.2 + página de aula genérica | Uma aula de exemplo renderiza as 6 seções |
| F3 — Conteúdo | 12 aulas, uma por vez, na ordem do cronograma | `#/dev/validar` sem erros para a aula |
| F4 — Páginas globais | Dashboard, resumos, cartões + CSV, cronograma, identificação, simulados, config | Todos os botões executam uma ação |
| F5 — Verificação | Checklist da §6 no navegador (desktop + 375px) | Todos os itens marcados |

Recomendação: construir **F0–F2 + L1 completa** primeiro, você revisa o formato e a didática, e só então seguimos com as outras 11 aulas no mesmo molde.

## 6. Checklist de entrega

- [ ] 12 aulas com as 6 seções preenchidas (validador ok)
- [ ] 60 resolvidos + 120 práticos com resoluções revisadas
- [ ] Todas as fórmulas renderizam (claro e escuro)
- [ ] Navegação: sidebar, anterior/próxima, continuar, rotas diretas
- [ ] Correção: acerto, erro, parcial, `+C`, formatos alternativos
- [ ] Relatório de exercícios com "Revise:"
- [ ] Cartões: revelar, navegar, CSV importado no Anki com sucesso
- [ ] Progresso preservado após recarregar e fechar o navegador; exportar/importar backup
- [ ] Responsivo a 375px sem scroll horizontal
- [ ] Nenhum botão decorativo

## 7. Decisões em aberto (precisam da sua confirmação)

1. **Data exata da prova** (padrão: 24/11/2026).
2. Manter a Aula 2 ampliada com **esboço de gráfico** e a Aula 5 com **impróprias** (recomendado, já que caem na prova).
3. Ordem de estudo com **Substituição antes do Módulo 3** (recomendado).
4. Incluir as **4 provas reais corrigidas** como simulados (recomendado).
5. Uso no celular: só local, ou hospedar grátis (GitHub Pages / Netlify Drop)?
