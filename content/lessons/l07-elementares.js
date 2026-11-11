'use strict';
CALC.addLesson({
  id: 'elementares', n: 7, title: 'Integração de funções elementares', min: 45, prereq: ['indefinidas'], patterns: ['base de todas as integrais'],
  prereqNote: R`use a regra da potência e a linearidade.`,

  theory: {
    what: R`É a **tabela básica** de integrais: as antiderivadas das funções que você já sabe derivar (exponencial, logaritmo, seno, cosseno, arcotangente). Toda técnica de integração (substituição, partes, frações parciais) termina numa integral desta tabela.`,
    why: R`Saber a tabela **de cor** é o que permite resolver rápido o último passo de qualquer questão. Ex.: na prova, a substituição transforma $\int\frac{-19\sin(\sqrt{t+1})}{\sqrt{t+1}}dt$ em $\int-38\sin u\,du$, que é imediata pela tabela.`,
    logic: R`Cada linha da tabela é uma derivada lida ao contrário:
- $(\sin x)'=\cos x\ \Rightarrow\ \int\cos x\,dx=\sin x+C$
- $(-\cos x)'=\sin x\ \Rightarrow\ \int\sin x\,dx=-\cos x+C$ (cuidado com o sinal!)

**Argumento linear $ax+b$:** como $(e^{3x})'=3e^{3x}$, para integrar $e^{3x}$ dividimos por 3: $\int e^{3x}dx=\frac{e^{3x}}{3}+C$. Vale em geral:
$$\int f(ax+b)\,dx=\frac1a F(ax+b)+C$$
Essa regra é uma substituição "de cabeça": divide-se pelo coeficiente de $x$.`,
    formulas: [
      [R`\int e^x\,dx=e^x+C\qquad\int e^{kx}\,dx=\frac{e^{kx}}{k}+C`, R`A exponencial é a própria derivada; com $kx$ divide por $k$.`],
      [R`\int\sin x\,dx=-\cos x+C\qquad\int\cos x\,dx=\sin x+C`, R`Sinal: a integral do **seno** tem o "menos".`],
      [R`\int\sec^2x\,dx=\operatorname{tg}x+C\qquad\int\frac{1}{1+x^2}\,dx=\operatorname{arctg}x+C`, R`Vêm de $(\operatorname{tg}x)'=\sec^2x$ e $(\operatorname{arctg}x)'=\frac1{1+x^2}$.`],
      [R`\int\frac{1}{\sqrt{1-x^2}}\,dx=\operatorname{arcsen}x+C\qquad\int a^x\,dx=\frac{a^x}{\ln a}+C`, R`Menos frequentes, mas bom reconhecer.`],
      [R`\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+C\qquad\int\frac{1}{ax+b}\,dx=\frac{\ln|ax+b|}{a}+C`, R`Muito usadas no fim de frações parciais e substituições.`],
      [R`\int\sin(kx)\,dx=-\frac{\cos(kx)}{k}+C\qquad\int\cos(kx)\,dx=\frac{\sin(kx)}{k}+C`, R`Mesma ideia: divide pelo coeficiente $k$.`],
    ],
    when: R`Quando o integrando é (ou pode virar, distribuindo) uma soma de funções da tabela, com argumento $x$ ou **linear** $ax+b$. Se o argumento não for linear (ex.: $e^{x^2}$, $\sin(x^2)$), a tabela sozinha **não** resolve: procure a derivada do argumento multiplicando (substituição, Aula 10).`,
    pitfalls: [
      [R`$\int\sin x\,dx=\cos x+C$.`, R`$\int\sin x\,dx=-\cos x+C$ (derive para conferir).`],
      [R`$\int e^{3x}dx=e^{3x}+C$ ou $3e^{3x}+C$.`, R`$\int e^{3x}dx=\frac{e^{3x}}{3}+C$: **divide** pelo coeficiente.`],
      [R`$\int\frac{1}{2x+1}dx=\ln|2x+1|+C$.`, R`$\frac12\ln|2x+1|+C$ (fator $\frac1a$).`],
      [R`$\int e^{x^2}dx=\frac{e^{x^2}}{2x}+C$.`, R`Não existe primitiva elementar. Dividir por $2x$ só funciona se $2x$ estiver multiplicando (substituição).`],
      [R`$\int(2x+1)^5dx=\frac{(2x+1)^6}{6}+C$.`, R`Falta o $\frac12$: $\frac{(2x+1)^6}{12}+C$.`],
    ],
  },

  identify: {
    triggers: [
      R`Aparecem $e^{\ldots}$, $\sin$, $\cos$, $\frac1{\ldots}$, $\frac{1}{1+x^2}$ com argumento **$x$ ou linear** ($3x$, $2x+1$, $\frac x2$).`,
      R`Soma de termos "puros" que você reconhece como derivadas conhecidas.`,
    ],
    first: R`Pergunte: "**De que função isto é a derivada?**" Se o argumento for linear $ax+b$, use a tabela e divida por $a$.`,
    examples: [
      { q: R`$$\int\left(4\sin(2x)-\frac6x\right)dx$$`, look: R`Seno com argumento linear e $\frac1x$.`, method: R`Tabela: $4\cdot\left(-\frac{\cos2x}{2}\right)-6\ln|x|$.`, why: R`Tudo está na tabela; o $2$ do argumento só divide.` },
      { q: R`$$\int x\,e^{x^2}dx\quad\text{vs}\quad\int e^{2x}dx$$`, look: R`O 1º tem argumento $x^2$ (não linear) e um $x$ multiplicando; o 2º tem argumento linear.`, method: R`1º: substituição ($u=x^2$). 2º: tabela, $\frac{e^{2x}}{2}$.`, why: R`A tabela direta só vale para argumento linear.` },
    ],
    writing: R`Separe as integrais e cite a regra: "$\int\left(3e^{x}+\cos x\right)dx=3\int e^x dx+\int\cos x\,dx=3e^x+\sin x+C$". Com argumento linear, mostre o fator: "$\int e^{-2x}dx=\frac{e^{-2x}}{-2}+C$".`,
  },

  solved: [
    { lvl: 1, q: R`Calcule $\int(e^x+\cos x)\,dx$.`, method: R`Dois termos da tabela.`,
      steps: [R`$\int e^xdx=e^x$; $\int\cos x\,dx=\sin x$.`, R`Conferindo: $(e^x+\sin x)'=e^x+\cos x$ ✓.`], ans: R`$$e^x+\sin x+C$$` },
    { lvl: 2, q: R`Calcule $\int e^{3x}\,dx$ e confira derivando.`, method: R`Exponencial com argumento linear: divide por 3.`,
      steps: [R`$\int e^{3x}dx=\frac{e^{3x}}{3}+C$.`, R`Conferindo (cadeia): $\left(\frac{e^{3x}}{3}\right)'=\frac{3e^{3x}}{3}=e^{3x}$ ✓.`], ans: R`$$\frac{e^{3x}}{3}+C$$` },
    { lvl: 3, q: R`Calcule $\int\left(4\sin(2x)-\frac6x\right)dx$.`, method: R`Seno com argumento $2x$ e $\frac1x$.`,
      steps: [R`$\int\sin(2x)dx=-\frac{\cos(2x)}{2}$, então $4\cdot\left(-\frac{\cos 2x}{2}\right)=-2\cos(2x)$.`, R`$\int\frac6xdx=6\ln|x|$.`], ans: R`$$-2\cos(2x)-6\ln|x|+C$$` },
    { lvl: 4, q: R`Calcule $\int(2x+1)^5\,dx$.`, method: R`Potência de argumento linear: $\frac{(ax+b)^{n+1}}{a(n+1)}$.`,
      steps: [R`$a=2$, $n=5$: $\frac{(2x+1)^6}{2\cdot6}=\frac{(2x+1)^6}{12}$.`, R`Conferindo: $\left(\frac{(2x+1)^6}{12}\right)'=\frac{6(2x+1)^5\cdot2}{12}=(2x+1)^5$ ✓.`, R`Vantagem: não precisa expandir $(2x+1)^5$!`], ans: R`$$\frac{(2x+1)^6}{12}+C$$` },
    { lvl: 5, q: R`Calcule $$\int\left(\frac{3}{1+x^2}+\frac{2}{4x-1}+5e^{-x}\right)dx.$$`, method: R`Três linhas da tabela: arctg, $\frac{1}{ax+b}$ e $e^{kx}$.`,
      steps: [R`$\int\frac{3}{1+x^2}dx=3\operatorname{arctg}x$.`, R`$\int\frac{2}{4x-1}dx=2\cdot\frac{\ln|4x-1|}{4}=\frac12\ln|4x-1|$.`, R`$\int5e^{-x}dx=5\cdot\frac{e^{-x}}{-1}=-5e^{-x}$.`], ans: R`$$3\operatorname{arctg}x+\frac12\ln|4x-1|-5e^{-x}+C$$` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'Exponencial', q: R`Calcule $\int3e^x\,dx$.`, a: { t: 'anti', v: '3e^x', d: '3e^x' }, sol: [R`$3\int e^xdx=3e^x$.`], ans: R`$3e^x+C$` },
    { id: 'p02', lvl: 'F', tag: 'Integral do seno (sinal)', q: R`Calcule $\int\sin x\,dx$.`, a: { t: 'anti', v: '-cos(x)', d: 'sin(x)' }, sol: [R`$(-\cos x)'=\sin x$, logo $\int\sin x\,dx=-\cos x$.`], ans: R`$-\cos x+C$` },
    { id: 'p03', lvl: 'I', tag: 'Exponencial com argumento linear', q: R`Calcule $\int e^{-2x}\,dx$.`, a: { t: 'anti', v: '-e^(-2x)/2', d: 'e^(-2x)' }, sol: [R`$k=-2$: $\frac{e^{-2x}}{-2}$.`], ans: R`$-\frac{e^{-2x}}{2}+C$` },
    { id: 'p04', lvl: 'I', tag: 'Cosseno com argumento linear', q: R`Calcule $\int\cos(5x)\,dx$.`, a: { t: 'anti', v: 'sin(5x)/5', d: 'cos(5x)' }, sol: [R`$\int\cos(kx)dx=\frac{\sin(kx)}{k}$ com $k=5$.`], ans: R`$\frac{\sin(5x)}{5}+C$` },
    { id: 'p05', lvl: 'I', tag: '1/(ax+b) → ln', q: R`Calcule $\int\frac{1}{3x+2}\,dx$.`, a: { t: 'anti', v: 'ln|3x+2|/3', d: '1/(3x+2)' }, sol: [R`$\int\frac{1}{ax+b}dx=\frac1a\ln|ax+b|$ com $a=3$.`], ans: R`$\frac13\ln|3x+2|+C$` },
    { id: 'p06', lvl: 'I', tag: 'Potência de argumento linear', q: R`Calcule $\int(1-2x)^4\,dx$.`, a: { t: 'anti', v: '-(1-2x)^5/10', d: '(1-2x)^4' },
      hint: R`Aqui $a=-2$.`, sol: [R`$\frac{(1-2x)^5}{(-2)\cdot5}=-\frac{(1-2x)^5}{10}$.`], ans: R`$-\frac{(1-2x)^5}{10}+C$` },
    { id: 'p07', lvl: 'IA', tag: 'Arctg e tangente', q: R`Calcule $\int\left(\frac{2}{1+x^2}-\sec^2x\right)dx$.`, a: { t: 'anti', v: '2atan(x)-tan(x)', d: '2/(1+x^2)-1/cos(x)^2', domain: [0.1, 1.3] },
      sol: [R`$\int\frac{2}{1+x^2}dx=2\operatorname{arctg}x$.`, R`$\int\sec^2x\,dx=\operatorname{tg}x$.`], ans: R`$2\operatorname{arctg}x-\operatorname{tg}x+C$` },
    { id: 'p08', lvl: 'IA', tag: 'Expandir antes de usar a tabela', q: R`Calcule $\int(e^{x}+1)^2\,dx$.`, a: { t: 'anti', v: 'e^(2x)/2+2e^x+x', d: '(e^x+1)^2' },
      hint: R`$(e^x+1)^2=e^{2x}+2e^x+1$.`, sol: [R`Expandir: $e^{2x}+2e^x+1$.`, R`$\int e^{2x}dx=\frac{e^{2x}}{2}$; $\int2e^xdx=2e^x$; $\int1\,dx=x$.`], ans: R`$\frac{e^{2x}}{2}+2e^x+x+C$` },
    { id: 'p09', lvl: 'IA', tag: 'Raiz de argumento linear', q: R`Calcule $\int\sqrt{4x+1}\,dx$.`, a: { t: 'anti', v: '(4x+1)^(3/2)/6', d: 'sqrt(4x+1)' },
      sol: [R`$(4x+1)^{1/2}$ com $a=4$, $n=\frac12$: $\frac{(4x+1)^{3/2}}{4\cdot\frac32}=\frac{(4x+1)^{3/2}}{6}$.`], ans: R`$\frac{(4x+1)^{3/2}}{6}+C$` },
    { id: 'p10', lvl: 'A', tag: 'Combinação: potência negativa linear + seno', q: R`Calcule $$\int\left(\frac{8}{(2x+3)^3}+4\sin\frac x2\right)dx.$$`, a: { t: 'anti', v: '-2/(2x+3)^2-8cos(x/2)', d: '8/(2x+3)^3+4sin(x/2)' },
      sol: [R`$8(2x+3)^{-3}$: $8\cdot\frac{(2x+3)^{-2}}{2\cdot(-2)}=-2(2x+3)^{-2}=-\frac{2}{(2x+3)^2}$.`, R`$4\sin\frac x2$: $4\cdot\left(-\frac{\cos(x/2)}{1/2}\right)=-8\cos\frac x2$.`], ans: R`$-\frac{2}{(2x+3)^2}-8\cos\frac x2+C$` },
  ],

  summary: {
    formulas: [R`$\int e^{kx}=\frac{e^{kx}}k$`, R`$\int\sin x=-\cos x$ · $\int\cos x=\sin x$`, R`$\int\sec^2x=\operatorname{tg}x$ · $\int\frac{1}{1+x^2}=\operatorname{arctg}x$`, R`$\int\frac{1}{ax+b}=\frac{\ln|ax+b|}{a}$ · $\int(ax+b)^n=\frac{(ax+b)^{n+1}}{a(n+1)}$`],
    when: [R`Argumento $x$ ou linear $ax+b$`, R`Último passo de qualquer técnica`],
    steps: [R`Separe em termos.`, R`Identifique a linha da tabela de cada termo.`, R`Divida pelo coeficiente de $x$ se o argumento for $ax+b$.`, R`$+C$ e conferência derivando.`],
    errors: [R`Sinal de $\int\sin x$`, R`Esquecer de dividir por $a$`, R`Usar a tabela com argumento não linear ($e^{x^2}$)`],
    memo: [R`$\int\sin(kx)=-\frac{\cos kx}{k}$ · $\int\cos(kx)=\frac{\sin kx}{k}$`, R`$\int\frac{u'}{u}=\ln|u|$ (próxima ponte para substituição)`],
  },

  cards: [
    [R`$\int\sin x\,dx$?`, R`$-\cos x+C$`],
    [R`$\int\cos x\,dx$?`, R`$\sin x+C$`],
    [R`$\int e^{kx}\,dx$?`, R`$\frac{e^{kx}}{k}+C$`],
    [R`$\int\frac{1}{1+x^2}\,dx$?`, R`$\operatorname{arctg}x+C$`],
    [R`$\int\frac{1}{ax+b}\,dx$?`, R`$\frac1a\ln|ax+b|+C$`],
    [R`$\int(ax+b)^n\,dx$?`, R`$\frac{(ax+b)^{n+1}}{a(n+1)}+C$ ($n\neq-1$)`],
    [R`Quando a tabela direta **não** basta?`, R`Quando o argumento não é linear (ex.: $e^{x^2}$, $\sin(\sqrt x)$): procure substituição.`],
    [R`$\int\sec^2x\,dx$?`, R`$\operatorname{tg}x+C$`],
  ],
});
