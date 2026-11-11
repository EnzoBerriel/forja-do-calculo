'use strict';
CALC.addLesson({
  id: 'indefinidas', n: 4, title: 'Integrais indefinidas', min: 45, prereq: [], patterns: ['base de P4, P9–P12'],

  theory: {
    review: R`Regras de potência que você vai usar o tempo todo:
- $\sqrt[n]{x^m}=x^{m/n}$ (ex.: $\sqrt x=x^{1/2}$, $\sqrt[3]{x^2}=x^{2/3}$)
- $\frac{1}{x^n}=x^{-n}$ (ex.: $\frac{1}{x^3}=x^{-3}$, $\frac{1}{\sqrt x}=x^{-1/2}$)
- $x^a\cdot x^b=x^{a+b}$ e $\frac{x^a}{x^b}=x^{a-b}$`,
    what: R`Integrar é **desfazer a derivada**. A **integral indefinida** $\int f(x)\,dx$ é a família de todas as funções $F$ cuja derivada é $f$:
$$\int f(x)\,dx=F(x)+C\quad\Longleftrightarrow\quad F'(x)=f(x)$$
$F$ se chama **antiderivada** (ou primitiva) e $C$ é uma constante qualquer.`,
    why: R`Se você conhece uma **taxa** (velocidade, vazão, variação da altura), integrar devolve a **quantidade** (posição, volume, altura). É a base de todo o restante da prova: integrais definidas, área, PVI e técnicas de integração.`,
    logic: R`Por que "+ C"? Porque constantes somem ao derivar: $(x^2)'=(x^2+5)'=(x^2-\pi)'=2x$. Logo, ao "voltar" de $2x$, não sabemos qual constante havia, e escrevemos $\int 2x\,dx=x^2+C$.

**Regra da potência ao contrário:** derivar $x^{n+1}$ dá $(n+1)x^n$. Então, para obter $x^n$, dividimos por $n+1$:
$$\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\quad(n\ne-1)$$
**Conferência:** sempre dá para checar derivando a resposta. Exemplo: $\left(\frac{x^4}{4}\right)'=x^3$ ✓.`,
    formulas: [
      [R`\int x^n\,dx=\frac{x^{n+1}}{n+1}+C\quad(n\neq-1)`, R`"Soma 1 no expoente e divide pelo novo expoente". Vale para expoentes fracionários e negativos.`],
      [R`\int\frac1x\,dx=\ln|x|+C`, R`O caso $n=-1$, onde a regra da potência falharia (divisão por zero).`],
      [R`\int k\,f(x)\,dx=k\int f(x)\,dx\qquad\int(f\pm g)\,dx=\int f\,dx\pm\int g\,dx`, R`Linearidade: constantes saem; somas se separam.`],
      [R`\int k\,dx=kx+C`, R`Integral de constante.`],
      [R`\frac{d}{dx}\left[\int f(x)\,dx\right]=f(x)`, R`Para conferir: derive a resposta e veja se volta ao integrando.`],
    ],
    when: R`Sempre que pedirem uma antiderivada, uma "integral" sem limites, ou uma função a partir da sua taxa de variação. **Antes** de integrar, reescreva raízes e frações como potências e **distribua** produtos e quocientes simples.`,
    pitfalls: [
      [R`Esquecer o $+C$.`, R`Toda integral indefinida termina com $+C$.`],
      [R`$\int\frac1{x^2}dx=\ln(x^2)$.`, R`$\frac1{x^2}=x^{-2}$, então $\int x^{-2}dx=\frac{x^{-1}}{-1}=-\frac1x+C$.`],
      [R`$\int f\cdot g\,dx=\int f\,dx\cdot\int g\,dx$.`, R`**Não** existe regra do produto direta. Distribua antes (ou use outra técnica).`],
      [R`$\int\frac{x^2+1}{x}dx=\frac{x^3/3+x}{x^2/2}$.`, R`Divida termo a termo: $\int\left(x+\frac1x\right)dx=\frac{x^2}{2}+\ln|x|+C$.`],
      [R`Errar o expoente negativo: $\int x^{-3}dx=\frac{x^{-4}}{-4}$.`, R`Some 1: $-3+1=-2$, então $\frac{x^{-2}}{-2}=-\frac{1}{2x^2}+C$.`],
    ],
  },

  identify: {
    triggers: [
      R`O símbolo $\int\ldots dx$ **sem** limites de integração.`,
      R`Integrando com **soma de potências**, raízes ou frações com um único termo no denominador.`,
      R`"Encontre uma primitiva/antiderivada de…"`,
    ],
    first: R`**Reescreva tudo como soma de potências de $x$.** Raízes viram expoentes fracionários; um denominador com **um termo só** vai para cima com expoente negativo; produtos se distribuem. Depois aplique a regra da potência termo a termo.`,
    examples: [
      { q: R`$$\int\frac{(x+1)^2}{\sqrt x}\,dx$$`, look: R`Denominador com um único termo ($\sqrt x$) e numerador polinomial.`, method: R`Expandir e dividir: $\int(x^{3/2}+2x^{1/2}+x^{-1/2})\,dx$.`, why: R`Vira soma de potências, e cada termo sai pela regra da potência.` },
      { q: R`$$\int\frac{3}{x}\,dx\quad\text{vs}\quad\int\frac{3}{x^3}\,dx$$`, look: R`Expoente $-1$ no primeiro; $-3$ no segundo.`, method: R`$3\ln|x|+C$ e $3\cdot\frac{x^{-2}}{-2}=-\frac{3}{2x^2}+C$.`, why: R`Só $x^{-1}$ vira logaritmo. Os demais expoentes usam a regra da potência.` },
    ],
    writing: R`Mostre a reescrita antes de integrar: "$\int\frac{(x+1)^2}{\sqrt x}dx=\int\left(x^{3/2}+2x^{1/2}+x^{-1/2}\right)dx=\ldots$". Termine com $+C$. Se sobrar tempo, confira derivando.`,
  },

  solved: [
    {
      lvl: 1, q: R`Calcule $$\int(3x^2+2x)\,dx.$$`,
      method: R`Soma de potências: linearidade + regra da potência.`,
      steps: [R`$\int3x^2dx=3\cdot\frac{x^3}{3}=x^3$.`, R`$\int2x\,dx=2\cdot\frac{x^2}{2}=x^2$.`, R`Conferindo: $(x^3+x^2)'=3x^2+2x$ ✓.`],
      ans: R`$$x^3+x^2+C$$`,
    },
    {
      lvl: 2, q: R`Calcule $$\int\left(\sqrt x+\frac{1}{x^3}\right)dx.$$`,
      method: R`Reescrever como potências: $x^{1/2}+x^{-3}$.`,
      steps: [R`$\int x^{1/2}dx=\frac{x^{3/2}}{3/2}=\frac23x^{3/2}$.`, R`$\int x^{-3}dx=\frac{x^{-2}}{-2}=-\frac{1}{2x^2}$.`],
      ans: R`$$\frac23x^{3/2}-\frac{1}{2x^2}+C$$`,
    },
    {
      lvl: 3, q: R`Calcule $$\int\frac{(x+1)^2}{\sqrt x}\,dx.$$`,
      method: R`Expandir o numerador e dividir cada termo por $x^{1/2}$.`,
      steps: [
        R`$(x+1)^2=x^2+2x+1$. Dividindo por $x^{1/2}$ (subtrai $\frac12$ de cada expoente): $x^{3/2}+2x^{1/2}+x^{-1/2}$.`,
        R`$\int x^{3/2}dx=\frac{x^{5/2}}{5/2}=\frac25x^{5/2}$.`,
        R`$\int2x^{1/2}dx=2\cdot\frac{x^{3/2}}{3/2}=\frac43x^{3/2}$; $\int x^{-1/2}dx=\frac{x^{1/2}}{1/2}=2x^{1/2}$.`,
      ],
      ans: R`$$\frac25x^{5/2}+\frac43x^{3/2}+2\sqrt x+C$$`,
    },
    {
      lvl: 4, q: R`Verifique se $F(x)=x\ln x-x$ é uma antiderivada de $f(x)=\ln x$.`,
      method: R`Definição de antiderivada: basta derivar $F$ e comparar com $f$.`,
      steps: [R`Produto: $(x\ln x)'=1\cdot\ln x+x\cdot\frac1x=\ln x+1$.`, R`$F'(x)=(\ln x+1)-1=\ln x=f(x)$ ✓.`, R`Logo $\int\ln x\,dx=x\ln x-x+C$. (Na Aula 11 você vai **deduzir** isso com integração por partes.)`],
      ans: R`Sim: $F'(x)=\ln x$, portanto $\int\ln x\,dx=x\ln x-x+C$.`,
    },
    {
      lvl: 5, q: R`Calcule $$\int\frac{2x^3-\sqrt[3]{x}+4}{x^2}\,dx.$$`,
      method: R`Denominador com um termo: dividir termo a termo e reescrever como potências.`,
      steps: [
        R`$\frac{2x^3}{x^2}=2x$; $\frac{x^{1/3}}{x^2}=x^{1/3-2}=x^{-5/3}$; $\frac{4}{x^2}=4x^{-2}$. Integrando: $2x-x^{-5/3}+4x^{-2}$.`,
        R`$\int2x\,dx=x^2$.`,
        R`$-\int x^{-5/3}dx=-\frac{x^{-2/3}}{-2/3}=+\frac32x^{-2/3}$.`,
        R`$\int4x^{-2}dx=4\cdot\frac{x^{-1}}{-1}=-\frac4x$.`,
        R`Conferindo um termo: $\left(\frac32x^{-2/3}\right)'=\frac32\cdot\left(-\frac23\right)x^{-5/3}=-x^{-5/3}$ ✓.`,
      ],
      ans: R`$$x^2+\frac{3}{2\sqrt[3]{x^2}}-\frac4x+C$$`,
    },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'Regra da potência', q: R`Calcule $\int(5x^4-3)\,dx$.`, a: { t: 'anti', v: 'x^5-3x', d: '5x^4-3' },
      sol: [R`$\int5x^4dx=x^5$ e $\int3\,dx=3x$.`], ans: R`$x^5-3x+C$` },
    { id: 'p02', lvl: 'F', tag: 'Expoente negativo', q: R`Calcule $\int\frac{6}{x^3}\,dx$.`, a: { t: 'anti', v: '-3/x^2', d: '6/x^3' },
      sol: [R`$\frac6{x^3}=6x^{-3}$.`, R`$6\cdot\frac{x^{-2}}{-2}=-3x^{-2}$.`], ans: R`$-\frac{3}{x^2}+C$` },
    { id: 'p03', lvl: 'I', tag: 'Raiz como expoente fracionário', q: R`Calcule $\int x\sqrt x\,dx$.`, a: { t: 'anti', v: '2/5*x^(5/2)', d: 'x*sqrt(x)' },
      sol: [R`$x\sqrt x=x^{1}\cdot x^{1/2}=x^{3/2}$.`, R`$\int x^{3/2}dx=\frac{x^{5/2}}{5/2}=\frac25x^{5/2}$.`], ans: R`$\frac25x^{5/2}+C$` },
    { id: 'p04', lvl: 'I', tag: 'Simplificar (fatorar) antes de integrar', q: R`Calcule $\int\frac{x^2-1}{x-1}\,dx$ (para $x\neq1$).`, a: { t: 'anti', v: 'x^2/2+x', d: '(x^2-1)/(x-1)', domain: [1.5, 4] },
      hint: R`$x^2-1=(x-1)(x+1)$.`,
      sol: [R`$\frac{(x-1)(x+1)}{x-1}=x+1$.`, R`$\int(x+1)dx=\frac{x^2}2+x$.`], ans: R`$\frac{x^2}{2}+x+C$` },
    { id: 'p05', lvl: 'I', tag: 'Expandir produto antes de integrar', q: R`Calcule $\int(1+\sqrt x)^2\,dx$.`, a: { t: 'anti', v: 'x+4/3*x^(3/2)+x^2/2', d: '(1+sqrt(x))^2' },
      sol: [R`$(1+\sqrt x)^2=1+2x^{1/2}+x$.`, R`$\int=x+2\cdot\frac{x^{3/2}}{3/2}+\frac{x^2}2=x+\frac43x^{3/2}+\frac{x^2}{2}$.`], ans: R`$x+\frac43x^{3/2}+\frac{x^2}{2}+C$` },
    { id: 'p06', lvl: 'I', tag: 'Raízes no denominador e no numerador', q: R`Calcule $\int\left(\frac{3}{\sqrt x}-2\sqrt[3]x\right)dx$.`, a: { t: 'anti', v: '6sqrt(x)-3/2*x^(4/3)', d: '3/sqrt(x)-2*cbrt(x)' },
      sol: [R`$3x^{-1/2}\to3\cdot\frac{x^{1/2}}{1/2}=6\sqrt x$.`, R`$2x^{1/3}\to2\cdot\frac{x^{4/3}}{4/3}=\frac32x^{4/3}$.`], ans: R`$6\sqrt x-\frac32x^{4/3}+C$` },
    { id: 'p07', lvl: 'IA', tag: 'Dividir termo a termo (aparece 1/x)', q: R`Calcule $\int\frac{x^3+2x-1}{x^2}\,dx$.`, a: { t: 'anti', v: 'x^2/2+2ln|x|+1/x', d: '(x^3+2x-1)/x^2' },
      hint: R`Divida cada termo por $x^2$. Um deles vira $\frac2x$.`,
      sol: [R`$\frac{x^3+2x-1}{x^2}=x+\frac2x-x^{-2}$.`, R`$\int x\,dx=\frac{x^2}{2}$; $\int\frac2x\,dx=2\ln|x|$; $-\int x^{-2}dx=-\frac{x^{-1}}{-1}=\frac1x$.`], ans: R`$\frac{x^2}{2}+2\ln|x|+\frac1x+C$` },
    { id: 'p08', lvl: 'IA', tag: 'Integral de 1/x² (armadilha do logaritmo)', q: R`Qual é $\int\frac{1}{x^2}\,dx$?`,
      a: { t: 'choice', options: [R`$\ln(x^2)+C$`, R`$-\frac1x+C$`, R`$-\frac{2}{x^3}+C$`, R`$\frac{1}{3x^3}+C$`], correct: 1, why: R`$x^{-2}\to\frac{x^{-1}}{-1}=-\frac1x$. Só $\frac1x$ (expoente $-1$) vira logaritmo; $-\frac2{x^3}$ é a **derivada**, não a integral.` },
      sol: [R`$\int x^{-2}dx=\frac{x^{-1}}{-1}+C=-\frac1x+C$.`, R`Conferência: $\left(-x^{-1}\right)'=x^{-2}$ ✓.`], ans: R`$-\frac1x+C$` },
    { id: 'p09', lvl: 'IA', tag: 'Distribuir produto de polinômios', q: R`Calcule $\int(2x+1)(x-3)\,dx$.`, a: { t: 'anti', v: '2/3*x^3-5/2*x^2-3x', d: '(2x+1)(x-3)' },
      sol: [R`$(2x+1)(x-3)=2x^2-6x+x-3=2x^2-5x-3$.`, R`$\int=\frac23x^3-\frac52x^2-3x$.`], ans: R`$\frac23x^3-\frac52x^2-3x+C$` },
    { id: 'p10', lvl: 'A', tag: 'Fatorar + potências fracionárias', q: R`Calcule $$\int\frac{x^2-4}{\sqrt x\,(x+2)}\,dx.$$`, a: { t: 'anti', v: '2/3*x^(3/2)-4sqrt(x)', d: '(x^2-4)/(sqrt(x)*(x+2))', domain: [0.5, 4] },
      hint: R`$x^2-4=(x-2)(x+2)$.`,
      sol: [R`Fatorando: $\frac{(x-2)(x+2)}{\sqrt x(x+2)}=\frac{x-2}{\sqrt x}=x^{1/2}-2x^{-1/2}$.`, R`$\int x^{1/2}dx=\frac23x^{3/2}$; $\int2x^{-1/2}dx=2\cdot2x^{1/2}=4\sqrt x$.`, R`Conferindo: $\left(\frac23x^{3/2}-4x^{1/2}\right)'=x^{1/2}-2x^{-1/2}$ ✓.`], ans: R`$\frac23x^{3/2}-4\sqrt x+C$` },
  ],

  summary: {
    formulas: [R`$\int x^n dx=\frac{x^{n+1}}{n+1}+C$ ($n\neq-1$)`, R`$\int\frac1x dx=\ln|x|+C$`, R`$\int kf=k\int f$ · $\int(f\pm g)=\int f\pm\int g$`],
    when: [R`Integral sem limites de soma de potências/raízes`, R`Função a partir da sua derivada (sem condição: família $+C$)`],
    steps: [R`Reescreva raízes e frações como potências.`, R`Expanda/divida termo a termo (fatore se simplificar).`, R`Aplique a regra da potência em cada termo.`, R`Escreva $+C$ e confira derivando.`],
    errors: [R`Esquecer $+C$`, R`$\int x^{-2}=\ln x^2$ (errado)`, R`"Regra do produto" para integrais (não existe)`],
    memo: [R`$\sqrt[n]{x^m}=x^{m/n}$ · $\frac1{x^n}=x^{-n}$`, R`$\int x^{-1/2}dx=2\sqrt x+C$`, R`$\int\frac{1}{x^2}dx=-\frac1x+C$`],
  },

  cards: [
    [R`O que significa $\int f(x)\,dx=F(x)+C$?`, R`$F'(x)=f(x)$: $F$ é uma antiderivada de $f$, e $C$ é uma constante arbitrária.`],
    [R`Regra da potência para integrais?`, R`$\int x^ndx=\frac{x^{n+1}}{n+1}+C$, com $n\neq-1$.`],
    [R`$\int\frac1x\,dx$?`, R`$\ln|x|+C$`],
    [R`Por que se escreve $+C$?`, R`Porque a derivada de uma constante é zero: infinitas funções têm a mesma derivada.`],
    [R`Como conferir uma integral indefinida?`, R`Derivando a resposta: deve voltar exatamente no integrando.`],
    [R`$\int\frac{1}{\sqrt x}\,dx$?`, R`$\int x^{-1/2}dx=2\sqrt x+C$.`],
    [R`O que fazer antes de integrar $\frac{x^3+1}{x^2}$?`, R`Dividir termo a termo: $x+x^{-2}$; depois integrar: $\frac{x^2}2-\frac1x+C$.`],
  ],
});
