'use strict';
CALC.addLesson({
  id: 'partes', n: 11, title: 'Integração por partes', min: 55, prereq: ['substituicao'], patterns: ['P12'],
  prereqNote: R`às vezes a integral que sobra precisa de substituição; e é preciso saber **quando** substituição não funciona.`,

  theory: {
    review: R`**Regra do produto** (é ela que as partes desfazem): $(u\,v)'=u'v+u\,v'$.`,
    what: R`É a técnica para integrar **produtos** de funções de tipos diferentes (polinômio × exponencial, polinômio × logaritmo, polinômio × seno…) quando a substituição não funciona:
$$\int u\,dv=u\,v-\int v\,du$$`,
    why: R`Resolve integrais como $\int x\,e^x\,dx$, $\int\ln x\,dx$ e $\int9\sqrt{1+x}\ln(1+x)\,dx$ (Questão 5c de 2024.2). A ideia é trocar uma integral difícil por outra **mais fácil**.`,
    logic: R`Integrando a regra do produto: $uv=\int u'v\,dx+\int uv'\,dx$, ou seja, $\int u\,dv=uv-\int v\,du$.

**A escolha certa:**
- $u$ = a parte que **simplifica ao derivar** ($x\to1$, $\ln x\to\frac1x$);
- $dv$ = a parte que você **consegue integrar** ($e^x$, $\sin x$, $\sqrt{1+x}$).

**Regra LIATE** (prioridade para ser $u$): **L**ogarítmica > **I**nversa trigonométrica > **A**lgébrica (polinômios, raízes) > **T**rigonométrica > **E**xponencial.

**Exemplo:** $\int x\,e^x\,dx$ com $u=x$, $dv=e^xdx$ dá $du=dx$, $v=e^x$. Então $\int xe^xdx=xe^x-\int e^xdx=xe^x-e^x+C$. Com a escolha invertida ($u=e^x$), sobraria $\int\frac{x^2}{2}e^xdx$, que é pior.`,
    formulas: [
      [R`\int u\,dv=u\,v-\int v\,du`, R`Escolha $u$ pela LIATE; $dv$ é o resto (incluindo o $dx$).`],
      [R`\text{LIATE: } \ln\ \succ\ \operatorname{arctg}\ \succ\ x^n,\sqrt{\ }\ \succ\ \sin,\cos\ \succ\ e^x`, R`Quem aparece primeiro na lista vira $u$.`],
      [R`\int_a^b u\,dv=\Big[u\,v\Big]_a^b-\int_a^b v\,du`, R`Versão definida: avalie $uv$ nos limites.`],
      [R`\int\ln x\,dx=x\ln x-x+C`, R`Truque: $u=\ln x$, $dv=dx$ (o "1" escondido).`],
      [R`\int x^n e^x\,dx:\ \text{aplicar partes }n\text{ vezes}`, R`Cada aplicação baixa o grau do polinômio em 1.`],
    ],
    when: R`O integrando é um **produto** de funções de "famílias" diferentes, e **nenhum fator é a derivada do outro** (senão seria substituição). Também para $\int\ln x\,dx$ e $\int\operatorname{arctg}x\,dx$ sozinhos.`,
    pitfalls: [
      [R`Escolher $u=e^x$ e $dv=x\,dx$ em $\int xe^xdx$.`, R`LIATE: o algébrico ($x$) vem antes do exponencial, então $u=x$.`],
      [R`Esquecer de integrar $dv$ corretamente: $dv=9\sqrt{x+1}dx\Rightarrow v=9\sqrt{x+1}$.`, R`$v=\int9(x+1)^{1/2}dx=9\cdot\frac{(x+1)^{3/2}}{3/2}=6(x+1)^{3/2}$.`],
      [R`Errar o sinal: $uv+\int v\,du$.`, R`É **menos**: $uv-\int v\,du$. Com partes repetidas, use parênteses.`],
      [R`Usar partes quando é substituição ($\int xe^{x^2}dx$).`, R`Se a derivada da função de dentro aparece, é substituição.`],
      [R`Parar no meio quando a nova integral ainda é um produto.`, R`Aplique partes de novo (ex.: $\int x^2e^xdx$ exige duas vezes).`],
    ],
  },

  identify: {
    triggers: [
      R`Produto de **polinômio** × ($e^x$, $\sin$, $\cos$, $\ln$).`,
      R`Logaritmo multiplicando uma potência/raiz: $\sqrt{1+x}\ln(1+x)$, $x^2\ln x$.`,
      R`$\int\ln x\,dx$ ou $\int\operatorname{arctg}x\,dx$ sozinhos.`,
      R`A derivada de um fator **não** aparece no outro (então não é substituição).`,
    ],
    first: R`**Classifique cada fator pela LIATE** e escolha $u$. Depois escreva a "tabelinha": $u=\ldots\Rightarrow du=\ldots$; $dv=\ldots\Rightarrow v=\ldots$`,
    examples: [
      { q: R`$$\int9\sqrt{1+x}\,\ln(1+x)\,dx$$`, look: R`Logaritmo × algébrica (raiz). A derivada de $\ln(1+x)$ é $\frac1{1+x}$, que não está no integrando.`, method: R`Partes com $u=\ln(1+x)$ (L) e $dv=9\sqrt{1+x}\,dx$ (A).`, why: R`Derivar o $\ln$ elimina o logaritmo, e $v$ é fácil de obter.` },
      { q: R`$$\int x\cos x\,dx\quad\text{vs}\quad\int x\cos(x^2)\,dx$$`, look: R`No 2º, $x$ é (metade da) derivada de $x^2$.`, method: R`1º: partes ($u=x$). 2º: substituição ($u=x^2$).`, why: R`A diferença está em se a derivada da função de dentro aparece.` },
    ],
    writing: R`Modelo (gabarito 2024.2): "Como temos o produto de uma função logarítmica por uma algébrica, vamos integrar por partes com prioridade para a primeira:
$u=\ln(x+1)\Rightarrow du=\frac{1}{x+1}dx$; $dv=9\sqrt{x+1}\,dx\Rightarrow v=6(1+x)^{3/2}$.
Com isso, $\int\ldots=6(1+x)^{3/2}\ln(x+1)-\int6(1+x)^{3/2}\frac{1}{x+1}dx=\ldots$"`,
  },

  solved: [
    { lvl: 1, q: R`Calcule $\int x\,e^x\,dx$.`, method: R`Algébrica × exponencial: $u=x$.`,
      steps: [R`$u=x\Rightarrow du=dx$; $dv=e^xdx\Rightarrow v=e^x$.`, R`$\int xe^xdx=xe^x-\int e^xdx=xe^x-e^x+C$.`, R`Conferindo: $(xe^x-e^x)'=e^x+xe^x-e^x=xe^x$ ✓.`], ans: R`$$xe^x-e^x+C=(x-1)e^x+C$$` },
    { lvl: 2, q: R`Calcule $\int x\cos x\,dx$.`, method: R`Algébrica × trigonométrica: $u=x$.`,
      steps: [R`$u=x$, $du=dx$; $dv=\cos x\,dx$, $v=\sin x$.`, R`$x\sin x-\int\sin x\,dx=x\sin x-(-\cos x)=x\sin x+\cos x$.`], ans: R`$$x\sin x+\cos x+C$$` },
    { lvl: 3, q: R`Calcule $\int\ln x\,dx$.`, method: R`Um fator só: use o "1" escondido. $u=\ln x$, $dv=dx$.`,
      steps: [R`$u=\ln x\Rightarrow du=\frac1xdx$; $dv=dx\Rightarrow v=x$.`, R`$x\ln x-\int x\cdot\frac1x\,dx=x\ln x-\int1\,dx=x\ln x-x$.`], ans: R`$$x\ln x-x+C$$` },
    { lvl: 4, q: R`Calcule $\int x^2e^x\,dx$.`, method: R`Partes duas vezes (o grau do polinômio cai a cada aplicação).`,
      steps: [R`1ª: $u=x^2$, $du=2x\,dx$; $v=e^x$: $\int x^2e^x=x^2e^x-\int2xe^xdx$.`, R`2ª (já feita no ex. 1): $\int2xe^xdx=2(xe^x-e^x)$.`, R`$x^2e^x-2xe^x+2e^x=e^x(x^2-2x+2)$.`], ans: R`$$e^x(x^2-2x+2)+C$$` },
    { lvl: 5, q: R`(Estilo prova — Questão 5c) Calcule $\int15\sqrt{x+1}\,\ln(x+1)\,dx$.`,
      method: R`Logarítmica × algébrica: partes com $u=\ln(x+1)$.`,
      steps: [
        R`$u=\ln(x+1)\Rightarrow du=\frac{1}{x+1}dx$.`,
        R`$dv=15(x+1)^{1/2}dx\Rightarrow v=15\cdot\frac{(x+1)^{3/2}}{3/2}=10(x+1)^{3/2}$.`,
        R`$$\int=10(x+1)^{3/2}\ln(x+1)-\int10(x+1)^{3/2}\cdot\frac{1}{x+1}\,dx$$`,
        R`Simplificando: $\frac{(x+1)^{3/2}}{x+1}=(x+1)^{1/2}$. Então $\int10(x+1)^{1/2}dx=10\cdot\frac{(x+1)^{3/2}}{3/2}=\frac{20}3(x+1)^{3/2}$.`,
        R`Resultado: $10(x+1)^{3/2}\ln(x+1)-\frac{20}{3}(x+1)^{3/2}+C=\frac{10}{3}(x+1)^{3/2}\big(3\ln(x+1)-2\big)+C$.`,
      ], ans: R`$$\frac{10}{3}(x+1)^{3/2}\big(3\ln(x+1)-2\big)+C$$` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'Partes: algébrica × exponencial', q: R`Calcule $\int x\,e^{2x}\,dx$.`, a: { t: 'anti', v: 'x*e^(2x)/2-e^(2x)/4', d: 'x*e^(2x)' },
      sol: [R`$u=x$, $du=dx$; $dv=e^{2x}dx$, $v=\frac{e^{2x}}2$.`, R`$\frac{xe^{2x}}2-\int\frac{e^{2x}}2dx=\frac{xe^{2x}}2-\frac{e^{2x}}4$.`], ans: R`$\frac{xe^{2x}}{2}-\frac{e^{2x}}{4}+C$` },
    { id: 'p02', lvl: 'F', tag: 'Partes: algébrica × seno', q: R`Calcule $\int x\sin x\,dx$.`, a: { t: 'anti', v: '-x*cos(x)+sin(x)', d: 'x*sin(x)' },
      sol: [R`$u=x$; $dv=\sin x\,dx$, $v=-\cos x$.`, R`$-x\cos x-\int(-\cos x)dx=-x\cos x+\sin x$.`], ans: R`$-x\cos x+\sin x+C$` },
    { id: 'p03', lvl: 'I', tag: 'Partes com logaritmo (u = ln)', q: R`Calcule $\int x\ln x\,dx$.`, a: { t: 'anti', v: 'x^2/2*ln(x)-x^2/4', d: 'x*ln(x)', domain: [0.5, 3] },
      sol: [R`LIATE: $u=\ln x$, $du=\frac{dx}x$; $dv=x\,dx$, $v=\frac{x^2}2$.`, R`$\frac{x^2}2\ln x-\int\frac{x^2}{2}\cdot\frac1xdx=\frac{x^2}{2}\ln x-\frac{x^2}{4}$.`], ans: R`$\frac{x^2}{2}\ln x-\frac{x^2}{4}+C$` },
    { id: 'p04', lvl: 'I', tag: 'Partes com polinômio de 1º grau', q: R`Calcule $\int(2x+1)e^x\,dx$.`, a: { t: 'anti', v: '(2x-1)e^x', d: '(2x+1)e^x' },
      sol: [R`$u=2x+1$, $du=2dx$; $v=e^x$.`, R`$(2x+1)e^x-\int2e^xdx=(2x+1)e^x-2e^x=(2x-1)e^x$.`], ans: R`$(2x-1)e^x+C$` },
    { id: 'p05', lvl: 'I', tag: 'Logaritmo × potência', q: R`Calcule $\int x^2\ln x\,dx$.`, a: { t: 'anti', v: 'x^3/3*ln(x)-x^3/9', d: 'x^2*ln(x)', domain: [0.5, 3] },
      sol: [R`$u=\ln x$; $dv=x^2dx$, $v=\frac{x^3}3$.`, R`$\frac{x^3}3\ln x-\int\frac{x^3}{3}\cdot\frac1xdx=\frac{x^3}{3}\ln x-\frac{x^3}{9}$.`], ans: R`$\frac{x^3}{3}\ln x-\frac{x^3}{9}+C$` },
    { id: 'p06', lvl: 'I', tag: 'Partes + substituição (arctg)', q: R`Calcule $\int\operatorname{arctg}x\,dx$.`, a: { t: 'anti', v: 'x*atan(x)-ln(1+x^2)/2', d: 'atan(x)' },
      hint: R`$u=\operatorname{arctg}x$, $dv=dx$. A integral que sobra sai por substituição.`,
      sol: [R`$u=\operatorname{arctg}x$, $du=\frac{dx}{1+x^2}$; $v=x$.`, R`$x\operatorname{arctg}x-\int\frac{x}{1+x^2}dx$.`, R`Substituição $w=1+x^2$: $\int\frac{x}{1+x^2}dx=\frac12\ln(1+x^2)$.`], ans: R`$x\operatorname{arctg}x-\frac12\ln(1+x^2)+C$` },
    { id: 'p07', lvl: 'IA', tag: 'Partes duas vezes', q: R`Calcule $\int x^2\sin x\,dx$.`, a: { t: 'anti', v: '-x^2*cos(x)+2x*sin(x)+2cos(x)', d: 'x^2*sin(x)' },
      sol: [R`1ª: $u=x^2$, $v=-\cos x$: $-x^2\cos x+\int2x\cos x\,dx$.`, R`2ª: $\int2x\cos x\,dx=2(x\sin x+\cos x)$.`, R`Total: $-x^2\cos x+2x\sin x+2\cos x$.`], ans: R`$-x^2\cos x+2x\sin x+2\cos x+C$` },
    { id: 'p08', lvl: 'IA', tag: 'Partes cíclica (a integral volta)', q: R`Calcule $\int e^x\sin x\,dx$.`, a: { t: 'anti', v: 'e^x*(sin(x)-cos(x))/2', d: 'e^x*sin(x)' },
      hint: R`Aplique partes duas vezes e isole a integral original $I$.`,
      sol: [R`$I=\int e^x\sin x\,dx$. Com $u=\sin x$, $dv=e^xdx$: $I=e^x\sin x-\int e^x\cos x\,dx$.`, R`De novo, $u=\cos x$: $\int e^x\cos x\,dx=e^x\cos x+\int e^x\sin x\,dx=e^x\cos x+I$.`, R`$I=e^x\sin x-e^x\cos x-I\Rightarrow2I=e^x(\sin x-\cos x)$.`], ans: R`$\frac{e^x(\sin x-\cos x)}{2}+C$` },
    { id: 'p09', lvl: 'IA', tag: 'Partes em integral definida', q: R`Calcule $\int_1^e\ln x\,dx$.`, a: { t: 'num', v: '1' },
      sol: [R`$\int\ln x\,dx=x\ln x-x$.`, R`$\left[x\ln x-x\right]_1^e=(e\cdot1-e)-(1\cdot0-1)=0+1=1$.`], ans: R`$1$` },
    { id: 'p10', lvl: 'A', tag: 'Estilo prova: raiz × logaritmo', q: R`(Estilo prova — Questão 5c) Calcule $\int3\sqrt{x+2}\,\ln(x+2)\,dx$.`, a: { t: 'anti', v: '2(x+2)^(3/2)*ln(x+2)-4/3*(x+2)^(3/2)', d: '3sqrt(x+2)*ln(x+2)', domain: [0, 3] },
      sol: [R`LIATE: $u=\ln(x+2)$, $du=\frac{dx}{x+2}$.`, R`$dv=3(x+2)^{1/2}dx\Rightarrow v=3\cdot\frac{(x+2)^{3/2}}{3/2}=2(x+2)^{3/2}$.`, R`$2(x+2)^{3/2}\ln(x+2)-\int2(x+2)^{3/2}\cdot\frac{1}{x+2}dx=2(x+2)^{3/2}\ln(x+2)-\int2(x+2)^{1/2}dx$.`, R`$\int2(x+2)^{1/2}dx=\frac43(x+2)^{3/2}$.`], ans: R`$2(x+2)^{3/2}\ln(x+2)-\frac43(x+2)^{3/2}+C=\frac23(x+2)^{3/2}\big(3\ln(x+2)-2\big)+C$` },
  ],

  summary: {
    formulas: [R`$\int u\,dv=uv-\int v\,du$`, R`LIATE: Log > Inv. trig > Algébrica > Trig > Exp`, R`$\int\ln x\,dx=x\ln x-x+C$`],
    when: [R`Produto de famílias diferentes, sem que um fator seja a derivada do outro`, R`$\ln x$ ou $\operatorname{arctg}x$ sozinhos`],
    steps: [R`Escolha $u$ pela LIATE e $dv$ = resto.`, R`Calcule $du$ (derivando) e $v$ (integrando).`, R`Escreva $uv-\int v\,du$.`, R`Resolva a nova integral (simplifique antes!).`, R`Se ainda for produto, repita; $+C$ no final.`],
    errors: [R`Escolha invertida de $u$`, R`Erro ao integrar $dv$`, R`Sinal de menos`, R`Confundir com substituição`],
    memo: [R`$\int xe^x=(x-1)e^x$ · $\int x\cos x=x\sin x+\cos x$`, R`$\int x^ne^x$: partes $n$ vezes`, R`$\frac{(x+1)^{3/2}}{x+1}=(x+1)^{1/2}$`],
  },

  cards: [
    [R`Fórmula da integração por partes?`, R`$\int u\,dv=uv-\int v\,du$`],
    [R`O que é a regra LIATE?`, R`Prioridade para escolher $u$: Logarítmica, Inversa trig., Algébrica, Trigonométrica, Exponencial.`],
    [R`$\int\ln x\,dx$?`, R`$x\ln x-x+C$ ($u=\ln x$, $dv=dx$).`],
    [R`Partes ou substituição: $\int x\,e^{x^2}dx$?`, R`Substituição ($u=x^2$): a derivada de dentro aparece.`],
    [R`Partes ou substituição: $\int x\,e^{x}dx$?`, R`Partes ($u=x$, $dv=e^xdx$).`],
    [R`Em $\int9\sqrt{1+x}\ln(1+x)dx$, quem é $u$ e quem é $v$?`, R`$u=\ln(1+x)$; $dv=9\sqrt{1+x}dx\Rightarrow v=6(1+x)^{3/2}$.`],
    [R`Quantas vezes aplicar partes em $\int x^3e^xdx$?`, R`3 vezes (cada uma baixa o grau do polinômio em 1).`],
  ],
});
