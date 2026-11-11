'use strict';
CALC.addLesson({
  id: 'definidas', n: 5, title: 'Integrais definidas (e impróprias)', min: 55, prereq: ['indefinidas', 'elementares'], patterns: ['P4'],
  prereqNote: R`você precisa saber achar antiderivadas.`,

  theory: {
    what: R`A **integral definida** $\int_a^b f(x)\,dx$ é um **número**: a área **com sinal** entre o gráfico de $f$ e o eixo $x$, de $x=a$ até $x=b$. Partes acima do eixo contam positivo e partes abaixo contam negativo.

A **integral imprópria** é a integral com um limite infinito, como $\int_0^{\infty}f(x)\,dx$. Ela é definida como um limite:
$$\int_a^{\infty}f(x)\,dx=\lim_{b\to\infty}\int_a^b f(x)\,dx$$`,
    why: R`Calcula áreas, quantidades acumuladas (volume que entrou, distância percorrida) e médias. Nas provas, a integral imprópria aparece **toda vez** combinada com substituição: $\int_0^{+\infty}\frac{18\sqrt x\,e^{x^{3/2}}+6}{(2e^{x^{3/2}}+x-1)^{3/2}}dx=12$.`,
    logic: R`**Ideia da soma de Riemann:** divida $[a,b]$ em retângulos finos de largura $\Delta x$ e altura $f(x_i)$. A soma $\sum f(x_i)\Delta x$ aproxima a área, e no limite (retângulos infinitamente finos) vira a integral.

**Teorema Fundamental do Cálculo (TFC):** não é preciso somar retângulos. Basta achar uma antiderivada $F$ e fazer
$$\int_a^b f(x)\,dx=F(b)-F(a)$$
Intuição: se $f$ é a taxa de variação de $F$, somar todas as pequenas variações de $a$ até $b$ dá a variação total $F(b)-F(a)$. (O $+C$ se cancela, por isso não aparece.)

**Exemplo numérico:** $\int_0^2x\,dx$ é a área de um triângulo de base 2 e altura 2, ou seja, $2$. Pelo TFC: $\left[\frac{x^2}{2}\right]_0^2=2-0=2$ ✓.`,
    formulas: [
      [R`\int_a^b f(x)\,dx=\Big[F(x)\Big]_a^b=F(b)-F(a)`, R`TFC: antiderivada no limite de cima menos no de baixo.`],
      [R`\int_a^{\infty}f(x)\,dx=\lim_{b\to\infty}\int_a^b f(x)\,dx`, R`Se o limite é um número, a integral **converge**; se dá $\pm\infty$ ou não existe, **diverge**.`],
      [R`\int_1^{\infty}\frac{1}{x^p}\,dx\ \text{converge}\iff p>1\quad\left(\text{vale }\tfrac{1}{p-1}\right)`, R`Ex.: $\int_1^\infty\frac{1}{x^2}dx=1$ converge; $\int_1^\infty\frac1{\sqrt x}dx$ diverge.`],
      [R`\frac{t^{-a/b}}{-a/b}=-\frac{b}{a\,t^{a/b}}`, R`Dica literal das provas: simplificar a antiderivada de potências negativas fracionárias.`],
      [R`\lim_{b\to\infty}\frac{k}{b^{r}}=0\quad(r>0)\qquad \lim_{b\to\infty}e^{-b}=0`, R`Os limites que aparecem no fim das impróprias.`],
    ],
    when: R`- Limites numéricos em cima e embaixo do $\int$: integral definida, use o TFC.
- Um limite é $\infty$: imprópria. Troque $\infty$ por $b$, integre e faça $b\to\infty$.
- Se aparecer substituição dentro de uma definida, **troque também os limites** (Aula 10).`,
    pitfalls: [
      [R`Fazer $F(a)-F(b)$.`, R`É $F(\text{cima})-F(\text{baixo})=F(b)-F(a)$.`],
      [R`Esquecer de avaliar no limite de baixo quando $F(a)\neq0$ (ex.: $\left[-\frac{12}{\sqrt u}\right]_1^b$ no $u=1$ vale $-12$).`, R`Calcule sempre os dois: $F(b)-F(a)$, com parênteses.`],
      [R`Escrever "$\infty$" dentro da conta como número: $-\frac{12}{\sqrt\infty}$.`, R`Use $\lim_{b\to\infty}$ e só no final calcule o limite.`],
      [R`Confundir área com integral quando $f$ fica negativa.`, R`A integral dá área **com sinal**; para área total, separe onde $f<0$ (Aula 6 e 9).`],
      [R`Manter $+C$ na integral definida.`, R`Na definida o $C$ se cancela: o resultado é um número.`],
    ],
  },

  identify: {
    triggers: [
      R`$\int_a^b$ com números: definida, use o TFC.`,
      R`$\int_a^{+\infty}$ ou "Dica: $\int_0^{+\infty}f=\lim_{b\to+\infty}\int_0^bf$": imprópria.`,
      R`"Calcule a área sob a curva" (com $f\ge0$): definida.`,
    ],
    first: R`**Ache a antiderivada primeiro** (como na indefinida, sem $C$). Só depois substitua os limites. Na imprópria, escreva $\lim_{b\to\infty}$ antes de tudo.`,
    examples: [
      { q: R`$$\int_1^4\sqrt x\,dx$$`, look: R`Limites finitos.`, method: R`TFC: $\left[\frac23x^{3/2}\right]_1^4=\frac23(8-1)=\frac{14}3$.`, why: R`A antiderivada é imediata e os limites são números.` },
      { q: R`$$\int_1^{\infty}\frac{6}{x^{3/2}}\,dx$$`, look: R`Limite superior $\infty$.`, method: R`$\lim_{b\to\infty}\left[-\frac{12}{\sqrt x}\right]_1^b=0-(-12)=12$.`, why: R`É imprópria; como $p=\frac32>1$, converge.` },
    ],
    writing: R`- Definida: "$\int_1^4\sqrt x\,dx=\left[\frac{2}{3}x^{3/2}\right]_1^4=\frac23\cdot8-\frac23\cdot1=\frac{14}{3}$."
- Imprópria (estilo gabarito): "$\int_1^{+\infty}6u^{-3/2}du=\lim_{b\to\infty}\left[\frac{6u^{-1/2}}{-1/2}\right]_1^b=\lim_{b\to\infty}\left[-\frac{12}{\sqrt u}\right]_1^b=\lim_{b\to\infty}\left(-\frac{12}{\sqrt b}+12\right)=12$."`,
  },

  solved: [
    { lvl: 1, q: R`Calcule $\int_0^2 3x^2\,dx$.`, method: R`Definida com antiderivada imediata ($x^3$).`,
      steps: [R`Antiderivada: $F(x)=x^3$.`, R`$F(2)-F(0)=8-0=8$.`], ans: R`$8$` },
    { lvl: 2, q: R`Calcule $\int_1^4\sqrt x\,dx$.`, method: R`Potência $x^{1/2}$ + TFC.`,
      steps: [R`$\int x^{1/2}dx=\frac23x^{3/2}$.`, R`$\left[\frac23x^{3/2}\right]_1^4=\frac23\left(4^{3/2}-1^{3/2}\right)=\frac23(8-1)=\frac{14}3$.`, R`($4^{3/2}=(\sqrt4)^3=8$.)`], ans: R`$\frac{14}{3}$` },
    { lvl: 3, q: R`Calcule $\int_0^{\pi}\sin x\,dx$ e interprete.`, method: R`Tabela + TFC.`,
      steps: [R`$\left[-\cos x\right]_0^{\pi}=(-\cos\pi)-(-\cos0)=-(-1)-(-1)=1+1=2$.`, R`Interpretação: a área sob um "arco" do seno vale exatamente $2$.`], ans: R`$2$` },
    { lvl: 4, q: R`Calcule a integral imprópria $\int_1^{\infty}\frac{1}{x^2}\,dx$.`, method: R`Limite superior infinito: troque por $b$ e faça $b\to\infty$.`,
      steps: [R`$\int_1^\infty x^{-2}dx=\lim_{b\to\infty}\int_1^b x^{-2}dx=\lim_{b\to\infty}\left[-\frac1x\right]_1^b$.`, R`$=\lim_{b\to\infty}\left(-\frac1b-\left(-\frac11\right)\right)=\lim_{b\to\infty}\left(1-\frac1b\right)=1$.`, R`O limite é um número: a integral **converge** para 1. (A área de uma região infinita pode ser finita!)`], ans: R`$1$ (converge)` },
    { lvl: 5, q: R`(Estilo prova) Calcule $\int_1^{+\infty}5x^{-6/5}\,dx$. Dica: $\frac{t^{-a/b}}{-a/b}=-\frac{b}{a\,t^{a/b}}$.`, method: R`Imprópria com potência negativa fracionária, igual ao final da Questão 1c das provas.`,
      steps: [
        R`$\int5x^{-6/5}dx=5\cdot\frac{x^{-1/5}}{-1/5}$. Pela dica ($a=1$, $b=5$): $\frac{x^{-1/5}}{-1/5}=-\frac{5}{x^{1/5}}$. Logo a antiderivada é $-\frac{25}{\sqrt[5]x}$.`,
        R`$\int_1^{+\infty}5x^{-6/5}dx=\lim_{b\to\infty}\left[-\frac{25}{\sqrt[5]x}\right]_1^b=\lim_{b\to\infty}\left(-\frac{25}{\sqrt[5]b}-\left(-\frac{25}{\sqrt[5]1}\right)\right)$.`,
        R`Como $\sqrt[5]b\to\infty$, o termo $-\frac{25}{\sqrt[5]b}\to0$. Resultado: $0+25=25$.`,
      ], ans: R`$25$ (converge)` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'TFC com polinômio', q: R`Calcule $\int_0^3(2x+1)\,dx$.`, a: { t: 'num', v: '12' },
      sol: [R`$\left[x^2+x\right]_0^3=(9+3)-0=12$.`], ans: R`$12$` },
    { id: 'p02', lvl: 'F', tag: 'TFC com 1/x', q: R`Calcule $\int_1^e\frac1x\,dx$.`, a: { t: 'num', v: '1' },
      sol: [R`$\left[\ln x\right]_1^e=\ln e-\ln1=1-0=1$.`], ans: R`$1$` },
    { id: 'p03', lvl: 'I', tag: 'TFC com várias potências', q: R`Calcule $\int_0^1(x^3-2x+4)\,dx$.`, a: { t: 'num', v: '13/4' },
      sol: [R`$\left[\frac{x^4}{4}-x^2+4x\right]_0^1=\frac14-1+4=\frac{13}{4}$.`], ans: R`$\frac{13}{4}$` },
    { id: 'p04', lvl: 'I', tag: 'TFC com trigonométrica', q: R`Calcule $\int_0^{\pi/2}\cos x\,dx$.`, a: { t: 'num', v: '1' },
      sol: [R`$\left[\sin x\right]_0^{\pi/2}=\sin\frac\pi2-\sin0=1$.`], ans: R`$1$` },
    { id: 'p05', lvl: 'I', tag: 'TFC com exponencial e ln', q: R`Calcule $\int_0^{\ln3}e^x\,dx$.`, a: { t: 'num', v: '2' },
      sol: [R`$\left[e^x\right]_0^{\ln3}=e^{\ln3}-e^0=3-1=2$.`], ans: R`$2$` },
    { id: 'p06', lvl: 'I', tag: 'Potência fracionária nos limites', q: R`Calcule $\int_1^8\sqrt[3]x\,dx$.`, a: { t: 'num', v: '45/4' },
      sol: [R`$\int x^{1/3}dx=\frac34x^{4/3}$.`, R`$\frac34\left(8^{4/3}-1\right)=\frac34(16-1)=\frac{45}{4}$ (pois $8^{4/3}=(\sqrt[3]8)^4=16$).`], ans: R`$\frac{45}{4}$` },
    { id: 'p07', lvl: 'IA', tag: 'Imprópria com exponencial', q: R`Calcule $\int_0^{\infty}e^{-3x}\,dx$.`, a: { t: 'num', v: '1/3' },
      sol: [R`$\lim_{b\to\infty}\left[-\frac{e^{-3x}}{3}\right]_0^b=\lim_{b\to\infty}\left(-\frac{e^{-3b}}{3}+\frac13\right)$.`, R`$e^{-3b}\to0$, então o resultado é $\frac13$.`], ans: R`$\frac13$` },
    { id: 'p08', lvl: 'IA', tag: 'Convergência de imprópria', q: R`A integral $\int_1^{\infty}\frac{1}{\sqrt x}\,dx$…`,
      a: { t: 'choice', options: [R`converge para $2$`, R`converge para $\frac12$`, R`diverge`, R`vale $0$`], correct: 2, why: R`$\lim_{b\to\infty}\left[2\sqrt x\right]_1^b=\lim(2\sqrt b-2)=\infty$. Com $p=\frac12\le1$, diverge.` },
      sol: [R`$\int x^{-1/2}dx=2\sqrt x$.`, R`$\lim_{b\to\infty}(2\sqrt b-2)=+\infty$: **diverge**.`], ans: R`Diverge` },
    { id: 'p09', lvl: 'IA', tag: 'Integral com módulo (dividir o intervalo)', q: R`Calcule $\int_{-1}^{2}|x|\,dx$.`, a: { t: 'num', v: '5/2' },
      hint: R`$|x|=-x$ para $x<0$ e $|x|=x$ para $x\ge0$. Divida em $[-1,0]$ e $[0,2]$.`,
      sol: [R`$\int_{-1}^0(-x)dx=\left[-\frac{x^2}2\right]_{-1}^0=0-\left(-\frac12\right)=\frac12$.`, R`$\int_0^2x\,dx=\left[\frac{x^2}{2}\right]_0^2=2$.`, R`Total: $\frac12+2=\frac52$.`], ans: R`$\frac52$` },
    { id: 'p10', lvl: 'A', tag: 'Estilo prova: imprópria com potência fracionária', q: R`(Estilo prova) Calcule $\int_1^{+\infty}8x^{-5/3}\,dx$, mostrando o limite.`, a: { t: 'num', v: '12' },
      sol: [R`$\int8x^{-5/3}dx=8\cdot\frac{x^{-2/3}}{-2/3}=-12x^{-2/3}=-\frac{12}{\sqrt[3]{x^2}}$.`, R`$\lim_{b\to\infty}\left[-\frac{12}{\sqrt[3]{x^2}}\right]_1^b=\lim_{b\to\infty}\left(-\frac{12}{\sqrt[3]{b^2}}+12\right)=0+12=12$.`], ans: R`$12$` },
  ],

  summary: {
    formulas: [R`$\int_a^bf=F(b)-F(a)$`, R`$\int_a^\infty f=\lim_{b\to\infty}\int_a^bf$`, R`$\int_1^\infty\frac1{x^p}$ converge $\iff p>1$`, R`$\frac{t^{-a/b}}{-a/b}=-\frac{b}{a\,t^{a/b}}$`],
    when: [R`Limites numéricos: TFC`, R`Limite infinito: imprópria (troque por $b$)`],
    steps: [R`Ache a antiderivada (sem $C$).`, R`Escreva $\left[F(x)\right]_a^b$.`, R`Calcule $F(b)-F(a)$ com parênteses.`, R`Imprópria: calcule $\lim_{b\to\infty}$ no final e diga se converge.`],
    errors: [R`$F(a)-F(b)$ invertido`, R`Esquecer o termo do limite inferior`, R`Operar com "$\infty$" como número`],
    memo: [R`$\lim_{b\to\infty}\frac{k}{b^r}=0$ ($r>0$)`, R`$e^{\ln a}=a$ · $\ln1=0$ · $\ln e=1$`, R`$4^{3/2}=8$ · $8^{2/3}=4$ · $9^{3/2}=27$ · $25^{3/2}=125$`],
  },

  cards: [
    [R`Teorema Fundamental do Cálculo (forma de cálculo)?`, R`$\int_a^bf(x)dx=F(b)-F(a)$, onde $F'=f$.`],
    [R`Definição de $\int_a^{\infty}f(x)\,dx$?`, R`$\lim_{b\to\infty}\int_a^bf(x)\,dx$`],
    [R`Quando $\int_1^\infty\frac1{x^p}dx$ converge?`, R`Quando $p>1$ (e vale $\frac{1}{p-1}$).`],
    [R`Integral indefinida × definida?`, R`Indefinida: família de funções ($+C$). Definida: **número** (área com sinal).`],
    [R`O que significa uma imprópria "convergir"?`, R`O limite existe e é um número finito.`],
    [R`$\int_0^\pi\sin x\,dx$?`, R`$2$`],
    [R`Antiderivada de $6u^{-3/2}$?`, R`$6\cdot\frac{u^{-1/2}}{-1/2}=-\frac{12}{\sqrt u}$`],
  ],
});
