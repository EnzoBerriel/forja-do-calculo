'use strict';
CALC.addLesson({
  id: 'substituicao', n: 10, title: 'Substituição simples', min: 65, prereq: ['elementares', 'definidas'], patterns: ['P4', 'P9', 'P10'],
  prereqNote: R`a substituição termina numa integral da tabela; nas definidas/impróprias trocamos os limites.`,

  theory: {
    review: R`**Regra da cadeia** (é ela que a substituição desfaz): $\big(F(g(x))\big)'=F'(g(x))\cdot g'(x)$.
Exemplo: $\big((x^2+1)^6\big)'=6(x^2+1)^5\cdot2x$. Então $\int 12x(x^2+1)^5dx=(x^2+1)^6+C$.`,
    what: R`É a técnica que **desfaz a regra da cadeia**. Quando o integrando tem uma função "de dentro" $g(x)$ e, multiplicando, a **derivada dela** $g'(x)$ (a menos de uma constante), trocamos $u=g(x)$:
$$\int f\big(g(x)\big)\,g'(x)\,dx=\int f(u)\,du$$`,
    why: R`É **a técnica mais cobrada** nas provas: aparece na integral imprópria da Questão 1, no PVI da Questão 4 e na área da Questão 5. Ela transforma uma integral "feia" numa integral da tabela.`,
    logic: R`Com $u=g(x)$, temos $\frac{du}{dx}=g'(x)$, ou seja, $du=g'(x)\,dx$. O pedaço $g'(x)dx$ do integrando "vira" $du$, e todo o resto fica em função de $u$.

**Ajuste de constante:** se o integrando tem $27e^{3x}+45e^{5x}$ e $du=(3e^{3x}+5e^{5x})dx$, note que $27e^{3x}+45e^{5x}=9(3e^{3x}+5e^{5x})$. Logo $(27e^{3x}+45e^{5x})dx=9\,du$. Constantes multiplicativas sempre se ajustam; **variáveis não**.

**Definidas:** ao trocar para $u$, troque também os limites: se $x=a$, então $u=g(a)$. Assim não é preciso voltar para $x$.`,
    formulas: [
      [R`u=g(x)\ \Rightarrow\ du=g'(x)\,dx`, R`Escolha $u$ = a "função de dentro" cuja derivada aparece multiplicando.`],
      [R`\int f(g(x))\,g'(x)\,dx=\int f(u)\,du`, R`Depois de integrar em $u$, volte para $x$ (na indefinida).`],
      [R`\int_a^b f(g(x))\,g'(x)\,dx=\int_{g(a)}^{g(b)}f(u)\,du`, R`Na definida, troque os limites. Na imprópria, $x\to\infty$ geralmente dá $u\to\infty$.`],
      [R`\int\frac{g'(x)}{g(x)}\,dx=\ln|g(x)|+C`, R`Caso clássico: numerador = derivada do denominador (ex.: $\int\frac{\cos t}{\sin t+2}dt$).`],
      [R`\int\frac{g'(x)}{[g(x)]^{n}}\,dx=\int u^{-n}\,du=\frac{u^{-n+1}}{-n+1}+C`, R`Padrão P4 das provas: numerador = $c\cdot$(derivada da base).`],
    ],
    when: R`Use quando o integrando tem uma **composição** ($e^{x^2}$, $\sin(\sqrt{t+1})$, $(x^3+2)^4$, $\ln x$ com $\frac1x$, $\frac{1}{\sin t+2}$) **e** a derivada da função de dentro aparece multiplicando (a menos de constante).

Se a derivada **não** aparece (ex.: $\int e^{x^2}dx$, $\int x\ln x\,dx$), substituição não resolve. Pense em partes (Aula 11) ou em frações parciais (Aula 12).`,
    pitfalls: [
      [R`Escolher $u$ = a função inteira ($u=\frac{x}{x^2+4}$).`, R`$u$ é a parte **de dentro** cuja derivada aparece: $u=x^2+4$.`],
      [R`Deixar $x$ e $u$ misturados na mesma integral.`, R`Depois da troca, tudo deve estar em $u$. Se sobrar $x$, a escolha de $u$ está errada (ou é outra técnica).`],
      [R`Esquecer o fator: $u=x^2+1$, $du=2x\,dx$, mas o integrando só tem $x\,dx$.`, R`$x\,dx=\frac{du}{2}$: o $\frac12$ precisa aparecer.`],
      [R`Na definida, usar os limites de $x$ depois de trocar para $u$.`, R`Troque os limites ($u(a)$, $u(b)$) **ou** volte para $x$ antes de substituir.`],
      [R`Ajustar uma **variável**: "$\int e^{x^2}dx=\int e^u\frac{du}{2x}$, com $2x$ saindo da integral".`, R`Só constantes saem da integral. Se sobra $x$, não é substituição.`],
    ],
  },

  identify: {
    triggers: [
      R`Uma função **dentro** de outra ($e^{x^{3/2}}$, $\sin(\sqrt{t+1})$, $(\ldots)^{3/2}$ no denominador).`,
      R`O **numerador parece a derivada** de algo do denominador (ou de algo dentro de uma potência).`,
      R`$\frac{1}{\sqrt{t+1}}$ ao lado de $\sin(\sqrt{t+1})$: a derivada de $\sqrt{t+1}$ é $\frac{1}{2\sqrt{t+1}}$.`,
      R`$\frac{\cos t}{\sin t+2}$, $\frac{\ln x}{x}$, $\frac{\sin t}{\cos t+2}$: um termo é a derivada do outro.`,
    ],
    first: R`**Escolha $u$ = a expressão de dentro e calcule $du$.** Depois compare $du$ com o que sobrou do integrando: se for igual a menos de uma constante, a substituição funciona.`,
    examples: [
      { q: R`$$\int_0^{+\infty}\frac{18\sqrt x\,e^{x^{3/2}}+6}{\left(2e^{x^{3/2}}+x-1\right)^{3/2}}dx$$`, look: R`Base da potência no denominador: $2e^{x^{3/2}}+x-1$. Sua derivada é $2e^{x^{3/2}}\cdot\frac32x^{1/2}+1=3\sqrt x\,e^{x^{3/2}}+1$.`, method: R`$u=2e^{x^{3/2}}+x-1$; numerador $=6(3\sqrt xe^{x^{3/2}}+1)$, então numerador$\cdot dx=6\,du$. Limites: $x=0\to u=1$; $x\to\infty\to u\to\infty$.`, why: R`O numerador é $6\times$(derivada da base): a integral vira $\int_1^\infty6u^{-3/2}du=12$.` },
      { q: R`$$\int\frac{-19\sin(\sqrt{t+1})}{\sqrt{t+1}}\,dt$$`, look: R`$\sqrt{t+1}$ dentro do seno e $\frac{1}{\sqrt{t+1}}$ multiplicando.`, method: R`$u=\sqrt{t+1}$, $du=\frac{dt}{2\sqrt{t+1}}$, então $\frac{dt}{\sqrt{t+1}}=2du$. Fica $\int-38\sin u\,du$.`, why: R`A derivada de $\sqrt{t+1}$ aparece (a menos do fator 2).` },
      { q: R`$$\int x\ln x\,dx$$`, look: R`$\ln x$ com $x$ multiplicando. A derivada de $\ln x$ seria $\frac1x$, que **não** está lá.`, method: R`**Não** é substituição: é integração por partes (Aula 11).`, why: R`A derivada da função de dentro não aparece.` },
    ],
    writing: R`Modelo (gabarito): "Note que, se utilizarmos a mudança de variável $u=2e^{x^{3/2}}+x-1$, sua derivada é múltipla do numerador: $du=(3\sqrt x\,e^{x^{3/2}}+1)dx$. Ainda, se $x=0\to u=1$ e se $x\to\infty\to u\to\infty$. Daí, $\int\ldots=\lim_{b\to\infty}\int_1^b6u^{-3/2}du=\ldots$"`,
  },

  solved: [
    { lvl: 1, q: R`Calcule $\int2x\,(x^2+1)^5\,dx$.`, method: R`$x^2+1$ está dentro da potência e $2x$ é sua derivada.`,
      steps: [R`$u=x^2+1\Rightarrow du=2x\,dx$.`, R`$\int u^5\,du=\frac{u^6}{6}+C$.`, R`Voltando: $\frac{(x^2+1)^6}{6}+C$.`], ans: R`$$\frac{(x^2+1)^6}{6}+C$$` },
    { lvl: 2, q: R`Calcule $\int\cos x\;e^{\sin x}\,dx$.`, method: R`$\sin x$ no expoente; $\cos x$ é sua derivada.`,
      steps: [R`$u=\sin x\Rightarrow du=\cos x\,dx$.`, R`$\int e^u\,du=e^u+C=e^{\sin x}+C$.`], ans: R`$$e^{\sin x}+C$$` },
    { lvl: 3, q: R`Calcule $\int\frac{x}{x^2+4}\,dx$.`, method: R`Numerador "quase" é a derivada do denominador ($2x$): ajuste de constante.`,
      steps: [R`$u=x^2+4\Rightarrow du=2x\,dx\Rightarrow x\,dx=\frac{du}{2}$.`, R`$\int\frac{1}{u}\cdot\frac{du}{2}=\frac12\ln|u|+C$.`, R`Como $x^2+4>0$: $\frac12\ln(x^2+4)+C$.`], ans: R`$$\frac12\ln(x^2+4)+C$$` },
    { lvl: 4, q: R`Calcule $\int_0^1x^2(x^3+1)^4\,dx$.`, method: R`Substituição em integral definida, trocando os limites.`,
      steps: [R`$u=x^3+1\Rightarrow du=3x^2dx\Rightarrow x^2dx=\frac{du}{3}$.`, R`Limites: $x=0\to u=1$; $x=1\to u=2$.`, R`$\frac13\int_1^2u^4du=\frac13\left[\frac{u^5}5\right]_1^2=\frac1{15}(32-1)=\frac{31}{15}$.`], ans: R`$$\frac{31}{15}$$` },
    { lvl: 5, q: R`(Estilo prova — Questão 1c) Calcule $$\int_0^{+\infty}\frac{8x\,e^{x^2}+4}{\left(e^{x^2}+x\right)^{3/2}}\,dx.$$ Dica: $\frac{t^{-a/b}}{-a/b}=-\frac{b}{a\,t^{a/b}}$.`,
      method: R`Base da potência: $e^{x^2}+x$. Sua derivada, $2xe^{x^2}+1$, é proporcional ao numerador. Substituição + imprópria.`,
      steps: [
        R`$u=e^{x^2}+x\Rightarrow du=(2x\,e^{x^2}+1)\,dx$.`,
        R`Numerador: $8xe^{x^2}+4=4(2xe^{x^2}+1)$, então $(8xe^{x^2}+4)dx=4\,du$.`,
        R`Limites: $x=0\to u=e^0+0=1$; $x\to\infty\to u\to\infty$.`,
        R`$$\int_1^{\infty}\frac{4\,du}{u^{3/2}}=\lim_{b\to\infty}\int_1^b4u^{-3/2}du=\lim_{b\to\infty}\left[\frac{4u^{-1/2}}{-1/2}\right]_1^b=\lim_{b\to\infty}\left[-\frac{8}{\sqrt u}\right]_1^b$$`,
        R`$=\lim_{b\to\infty}\left(-\frac{8}{\sqrt b}-\left(-\frac{8}{\sqrt1}\right)\right)=0+8=8$.`,
      ], ans: R`$8$ (converge)` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'Substituição com potência', q: R`Calcule $\int3x^2(x^3+2)^4\,dx$.`, a: { t: 'anti', v: '(x^3+2)^5/5', d: '3x^2(x^3+2)^4' },
      sol: [R`$u=x^3+2$, $du=3x^2dx$.`, R`$\int u^4du=\frac{u^5}5$.`], ans: R`$\frac{(x^3+2)^5}{5}+C$` },
    { id: 'p02', lvl: 'F', tag: 'Substituição com exponencial', q: R`Calcule $\int2x\,e^{x^2}\,dx$.`, a: { t: 'anti', v: 'e^(x^2)', d: '2x*e^(x^2)', domain: [0.2, 1.8] },
      sol: [R`$u=x^2$, $du=2x\,dx$.`, R`$\int e^udu=e^u=e^{x^2}$.`], ans: R`$e^{x^2}+C$` },
    { id: 'p03', lvl: 'I', tag: 'Ajuste de constante com raiz', q: R`Calcule $\int x\sqrt{x^2+9}\,dx$.`, a: { t: 'anti', v: '(x^2+9)^(3/2)/3', d: 'x*sqrt(x^2+9)' },
      sol: [R`$u=x^2+9$, $du=2x\,dx\Rightarrow x\,dx=\frac{du}2$.`, R`$\frac12\int u^{1/2}du=\frac12\cdot\frac23u^{3/2}=\frac13u^{3/2}$.`], ans: R`$\frac13(x^2+9)^{3/2}+C$` },
    { id: 'p04', lvl: 'I', tag: 'ln x com 1/x', q: R`Calcule $\int\frac{\ln x}{x}\,dx$.`, a: { t: 'anti', v: 'ln(x)^2/2', d: 'ln(x)/x', domain: [1.2, 4] },
      sol: [R`$u=\ln x$, $du=\frac1xdx$.`, R`$\int u\,du=\frac{u^2}2=\frac{(\ln x)^2}{2}$.`], ans: R`$\frac{(\ln x)^2}{2}+C$` },
    { id: 'p05', lvl: 'I', tag: 'Numerador = derivada do denominador (→ ln)', q: R`Calcule $\int\frac{\sin x}{\cos x+2}\,dx$.`, a: { t: 'anti', v: '-ln(cos(x)+2)', d: 'sin(x)/(cos(x)+2)', domain: [0, 3] },
      hint: R`$u=\cos x+2$, $du=-\sin x\,dx$.`,
      sol: [R`$u=\cos x+2\Rightarrow du=-\sin x\,dx\Rightarrow\sin x\,dx=-du$.`, R`$\int\frac{-du}{u}=-\ln|u|=-\ln(\cos x+2)$ (sempre positivo).`], ans: R`$-\ln(\cos x+2)+C$` },
    { id: 'p06', lvl: 'I', tag: 'Substituição em integral definida (trocar limites)', q: R`Calcule $\int_0^2\frac{x}{(x^2+1)^2}\,dx$.`, a: { t: 'num', v: '2/5' },
      sol: [R`$u=x^2+1$, $x\,dx=\frac{du}{2}$; $x=0\to u=1$, $x=2\to u=5$.`, R`$\frac12\int_1^5u^{-2}du=\frac12\left[-\frac1u\right]_1^5=\frac12\left(-\frac15+1\right)=\frac25$.`], ans: R`$\frac25$` },
    { id: 'p07', lvl: 'IA', tag: 'Numerador múltiplo da derivada', q: R`Calcule $\int\frac{6x+3}{(x^2+x+5)^2}\,dx$.`, a: { t: 'anti', v: '-3/(x^2+x+5)', d: '(6x+3)/(x^2+x+5)^2' },
      sol: [R`$u=x^2+x+5$, $du=(2x+1)dx$; e $6x+3=3(2x+1)$, então $(6x+3)dx=3\,du$.`, R`$3\int u^{-2}du=3\cdot\frac{u^{-1}}{-1}=-\frac{3}{u}$.`], ans: R`$-\frac{3}{x^2+x+5}+C$` },
    { id: 'p08', lvl: 'IA', tag: 'Raiz dentro de trigonométrica', q: R`Calcule $\int\frac{\cos(\sqrt x)}{\sqrt x}\,dx$.`, a: { t: 'anti', v: '2sin(sqrt(x))', d: 'cos(sqrt(x))/sqrt(x)', domain: [0.5, 4] },
      hint: R`$u=\sqrt x$, $du=\frac{dx}{2\sqrt x}$.`,
      sol: [R`$u=\sqrt x\Rightarrow du=\frac{1}{2\sqrt x}dx\Rightarrow\frac{dx}{\sqrt x}=2\,du$.`, R`$\int\cos u\cdot2\,du=2\sin u=2\sin\sqrt x$.`], ans: R`$2\sin(\sqrt x)+C$` },
    { id: 'p09', lvl: 'IA', tag: 'Definida com trigonométricas', q: R`Calcule $\int_0^{\pi/2}\sin^3x\,\cos x\,dx$.`, a: { t: 'num', v: '1/4' },
      sol: [R`$u=\sin x$, $du=\cos x\,dx$; $x=0\to u=0$; $x=\frac\pi2\to u=1$.`, R`$\int_0^1u^3du=\frac14$.`], ans: R`$\frac14$` },
    { id: 'p10', lvl: 'A', tag: 'Estilo prova: substituição + integral imprópria', q: R`(Estilo prova — Questão 1c) Calcule $$\int_0^{+\infty}\frac{15x^2e^{x^3}+5}{\left(e^{x^3}+x\right)^{4/3}}\,dx.$$ Dica: $\int_0^{+\infty}f=\lim_{b\to\infty}\int_0^bf$.`, a: { t: 'num', v: '15' },
      hint: R`$u=e^{x^3}+x$. Compare $du$ com o numerador.`,
      sol: [R`$u=e^{x^3}+x\Rightarrow du=(3x^2e^{x^3}+1)dx$. Numerador: $15x^2e^{x^3}+5=5(3x^2e^{x^3}+1)$, então numerador$\cdot dx=5\,du$.`, R`Limites: $x=0\to u=1$; $x\to\infty\to u\to\infty$.`, R`$\lim_{b\to\infty}\int_1^b5u^{-4/3}du=\lim_{b\to\infty}\left[\frac{5u^{-1/3}}{-1/3}\right]_1^b=\lim_{b\to\infty}\left[-\frac{15}{\sqrt[3]u}\right]_1^b$.`, R`$=\lim_{b\to\infty}\left(-\frac{15}{\sqrt[3]b}+15\right)=15$.`], ans: R`$15$` },
  ],

  summary: {
    formulas: [R`$u=g(x)$, $du=g'(x)dx$`, R`$\int f(g(x))g'(x)dx=\int f(u)du$`, R`$\int\frac{g'}{g}=\ln|g|$`, R`Definida: limites viram $g(a)$ e $g(b)$`],
    when: [R`Composição + derivada da parte de dentro multiplicando`, R`Numerador = $c\cdot$(derivada do denominador ou da base)`],
    steps: [R`Escolha $u$ = função de dentro.`, R`Calcule $du$ e ajuste constantes.`, R`Reescreva **tudo** em $u$ (troque os limites se for definida).`, R`Integre pela tabela.`, R`Volte para $x$ (indefinida) ou calcule o número (definida/imprópria).`],
    errors: [R`Sobrar $x$ depois da troca`, R`Esquecer o fator constante`, R`Não trocar os limites`],
    memo: [R`$(\sqrt{t+1})'=\frac{1}{2\sqrt{t+1}}$`, R`$(e^{x^{3/2}})'=\frac32\sqrt x\,e^{x^{3/2}}$`, R`$\int_1^\infty c\,u^{-p}du=\frac{c}{p-1}$ ($p>1$)`],
  },

  cards: [
    [R`Quando usar substituição?`, R`Quando há uma composição e a derivada da função de dentro aparece multiplicando (a menos de constante).`],
    [R`Como escolher $u$?`, R`$u$ = a expressão "de dentro" (base da potência, argumento, denominador) cuja derivada aparece.`],
    [R`O que fazer com os limites numa substituição definida?`, R`Trocar: $x=a\Rightarrow u=g(a)$ e $x=b\Rightarrow u=g(b)$.`],
    [R`$\int\frac{g'(x)}{g(x)}dx$?`, R`$\ln|g(x)|+C$`],
    [R`Substituição para $\int\frac{\sin(\sqrt{t+1})}{\sqrt{t+1}}dt$?`, R`$u=\sqrt{t+1}$, $\frac{dt}{\sqrt{t+1}}=2du$: resultado $-2\cos(\sqrt{t+1})+C$.`],
    [R`Posso "tirar" uma variável $x$ da integral para ajustar o $du$?`, R`Não. Só constantes. Se sobrar $x$, é outra técnica.`],
    [R`Identifique: $\int\frac{27e^{3x}+45e^{5x}}{(e^{3x}+e^{5x}+1)^3}dx$`, R`Substituição: $u=e^{3x}+e^{5x}+1$, $9du=(27e^{3x}+45e^{5x})dx$.`],
    [R`$\int_1^{\infty}6u^{-3/2}du$?`, R`$\lim\left[-\frac{12}{\sqrt u}\right]_1^b=12$`],
  ],
});
