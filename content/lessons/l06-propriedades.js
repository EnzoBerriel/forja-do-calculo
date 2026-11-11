'use strict';
CALC.addLesson({
  id: 'propriedades', n: 6, title: 'Aplicações e propriedades das integrais', min: 45, prereq: ['definidas'], patterns: ['base de P9 e P10'],
  prereqNote: R`as propriedades valem para integrais definidas.`,

  theory: {
    what: R`São as **regras de manipulação** das integrais definidas (somar, multiplicar por constante, dividir intervalos, inverter limites, usar simetria) e suas **interpretações**: área, valor médio e **variação total** de uma grandeza a partir da sua taxa.`,
    why: R`Elas economizam contas (uma integral de função ímpar em intervalo simétrico vale $0$) e dão sentido físico às integrais:
- integrar uma **taxa** (vazão, velocidade, crescimento) dá **quanto a grandeza variou**;
- integrar $|v(t)|$ dá a **distância** percorrida.`,
    logic: R`Pense na integral como "área com sinal":
- Juntar dois pedaços vizinhos soma as áreas: $\int_a^c=\int_a^b+\int_b^c$.
- Percorrer ao contrário troca o sinal: $\int_b^a=-\int_a^b$.
- Uma função **ímpar** ($f(-x)=-f(x)$, como $x^3$ e $\sin x$) tem áreas iguais e opostas dos dois lados de $0$, que se cancelam.

**Variação total:** se $Q'(t)$ é a taxa, então $\int_a^bQ'(t)\,dt=Q(b)-Q(a)$. É o próprio TFC lido "fisicamente".
**Exemplo:** água entra a $r(t)=3t^2+2$ L/min. Entre $t=0$ e $t=2$ entram $\int_0^2(3t^2+2)dt=8+4=12$ L.`,
    formulas: [
      [R`\int_a^b[k\,f\pm g]\,dx=k\int_a^bf\,dx\pm\int_a^bg\,dx`, R`Linearidade.`],
      [R`\int_a^c f=\int_a^b f+\int_b^c f\qquad\int_a^a f=0\qquad\int_b^a f=-\int_a^b f`, R`Aditividade, intervalo nulo e inversão dos limites.`],
      [R`f\ \text{ímpar}\Rightarrow\int_{-a}^{a}f=0\qquad f\ \text{par}\Rightarrow\int_{-a}^{a}f=2\int_0^af`, R`Simetria. Par: $x^2$, $x^4$, $\cos x$. Ímpar: $x$, $x^3$, $\sin x$.`],
      [R`f_{\text{méd}}=\frac{1}{b-a}\int_a^bf(x)\,dx`, R`Valor médio de $f$ em $[a,b]$.`],
      [R`\int_a^bQ'(t)\,dt=Q(b)-Q(a)\qquad Q(b)=Q(a)+\int_a^bQ'(t)\,dt`, R`Variação total. Velocidade: $\int v$ = deslocamento; $\int|v|$ = distância.`],
      [R`f\le g\ \text{em }[a,b]\Rightarrow\int_a^bf\le\int_a^bg`, R`Comparação: útil para estimar sem calcular.`],
    ],
    when: R`- Dados valores de integrais (sem a função) e se pede outra: use as propriedades.
- Intervalo simétrico $[-a,a]$: teste se a função é par ou ímpar.
- "Quanto variou", "quanto entrou", "qual a quantidade em $t=\ldots$" a partir de uma taxa: variação total.
- "Distância percorrida": integre $|v|$ (divida onde $v$ troca de sinal).`,
    pitfalls: [
      [R`$\int_a^bf\cdot g=\int_a^bf\cdot\int_a^bg$.`, R`Não existe essa propriedade para produtos.`],
      [R`Achar que $\int_{-2}^2x^2dx=0$ "por simetria".`, R`$x^2$ é **par**: $\int_{-2}^2x^2=2\int_0^2x^2=\frac{16}3$. Só ímpar dá zero.`],
      [R`Confundir deslocamento com distância.`, R`Deslocamento: $\int v$. Distância: $\int|v|$ (as partes negativas contam como positivas).`],
      [R`Esquecer o valor inicial: "volume em $t=6$" $=\int_0^6r(t)dt$.`, R`$V(6)=V(0)+\int_0^6r(t)dt$.`],
      [R`No valor médio, esquecer de dividir por $b-a$.`, R`$f_{méd}=\frac{1}{b-a}\int_a^bf$.`],
    ],
  },

  identify: {
    triggers: [
      R`"Sabendo que $\int_0^3f=5$…" (a função não é dada): propriedades.`,
      R`Intervalo simétrico $[-a,a]$: simetria.`,
      R`"Taxa", "vazão", "velocidade", "está variando a uma taxa…": variação total.`,
      R`"Valor médio de $f$": fórmula do valor médio.`,
    ],
    first: R`**Traduza o enunciado em integrais** e escreva a propriedade que vai usar (ex.: "$\int_2^5f=\int_0^5f-\int_0^2f$").`,
    examples: [
      { q: R`$$\int_{-3}^{3}(x^5-4x^3+2)\,dx$$`, look: R`Intervalo simétrico; $x^5-4x^3$ é ímpar e $2$ é par.`, method: R`Ímpar dá $0$; $\int_{-3}^32\,dx=12$.`, why: R`A simetria evita calcular potências altas.` },
      { q: R`"Um tanque tem 100 L e a vazão é $r(t)=4-t$ L/h. Quanto há em $t=6$?"`, look: R`Taxa + valor inicial.`, method: R`$V(6)=100+\int_0^6(4-t)dt=106$.`, why: R`Integrar a taxa dá a variação; somamos ao valor inicial.` },
    ],
    writing: R`Escreva a propriedade antes da conta: "Pela aditividade, $\int_0^4f=\int_0^6f-\int_4^6f=10-3=7$". Em variação total: "$V(6)=V(0)+\int_0^6r(t)\,dt$".`,
  },

  solved: [
    { lvl: 1, q: R`Sabendo que $\int_0^3f(x)dx=5$ e $\int_0^3g(x)dx=2$, calcule $\int_0^3[2f(x)-3g(x)]dx$.`, method: R`Linearidade.`,
      steps: [R`$\int_0^3(2f-3g)=2\int_0^3f-3\int_0^3g$.`, R`$=2\cdot5-3\cdot2=10-6=4$.`], ans: R`$4$` },
    { lvl: 2, q: R`Se $\int_0^5f=7$ e $\int_0^2f=3$, calcule $\int_2^5f$ e $\int_5^2f$.`, method: R`Aditividade + inversão de limites.`,
      steps: [R`$\int_0^5f=\int_0^2f+\int_2^5f\Rightarrow7=3+\int_2^5f\Rightarrow\int_2^5f=4$.`, R`$\int_5^2f=-\int_2^5f=-4$.`], ans: R`$\int_2^5f=4$ e $\int_5^2f=-4$` },
    { lvl: 3, q: R`Calcule $\int_{-2}^{2}(x^3+5x)\,dx$ e $\int_{-1}^{1}(x^2+x^5)\,dx$.`, method: R`Intervalos simétricos: teste par/ímpar.`,
      steps: [R`$x^3+5x$ é ímpar ($(-x)^3+5(-x)=-(x^3+5x)$), logo $\int_{-2}^2=0$.`, R`$x^5$ é ímpar (contribui $0$) e $x^2$ é par: $\int_{-1}^1x^2dx=2\int_0^1x^2dx=2\cdot\frac13=\frac23$.`], ans: R`$0$ e $\frac23$` },
    { lvl: 4, q: R`Calcule o valor médio de $f(x)=x^2$ em $[0,3]$ e encontre onde $f$ assume esse valor.`, method: R`Fórmula do valor médio.`,
      steps: [R`$f_{méd}=\frac{1}{3-0}\int_0^3x^2dx=\frac13\cdot\left[\frac{x^3}{3}\right]_0^3=\frac13\cdot9=3$.`, R`$x^2=3\Rightarrow x=\sqrt3\approx1{,}73\in[0,3]$.`, R`Interpretação: o retângulo de altura 3 sobre $[0,3]$ tem a mesma área (9) que a região sob $x^2$.`], ans: R`$f_{méd}=3$, atingido em $x=\sqrt3$` },
    { lvl: 5, q: R`Uma partícula tem velocidade $v(t)=t^2-4t+3$ (m/s) para $0\le t\le3$. Calcule o **deslocamento** e a **distância total** percorrida.`, method: R`Deslocamento $=\int v$; distância $=\int|v|$, dividindo onde $v$ troca de sinal.`,
      steps: [
        R`Deslocamento: $\int_0^3(t^2-4t+3)dt=\left[\frac{t^3}3-2t^2+3t\right]_0^3=9-18+9=0$ m (volta ao ponto inicial).`,
        R`Sinal: $v=(t-1)(t-3)$ é $\ge0$ em $[0,1]$ e $\le0$ em $[1,3]$.`,
        R`$\int_0^1v\,dt=\frac13-2+3=\frac43$. $\int_1^3v\,dt=0-\frac43=-\frac43$.`,
        R`Distância $=\frac43+\left|-\frac43\right|=\frac83$ m.`,
      ], ans: R`Deslocamento $0$ m; distância $\frac83\approx2{,}67$ m.` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'Linearidade', q: R`Se $\int_1^4f(x)dx=6$, quanto vale $\int_1^4 3f(x)\,dx$?`, a: { t: 'num', v: '18' }, sol: [R`$3\cdot6=18$.`], ans: R`$18$` },
    { id: 'p02', lvl: 'F', tag: 'Intervalo de comprimento zero', q: R`Quanto vale $\int_2^2\left(x^3+e^x\right)dx$?`, a: { t: 'num', v: '0' }, sol: [R`$\int_a^af=0$ (não há "largura").`], ans: R`$0$` },
    { id: 'p03', lvl: 'I', tag: 'Aditividade', q: R`Se $\int_0^6f=10$ e $\int_4^6f=3$, calcule $\int_0^4f$.`, a: { t: 'num', v: '7' }, sol: [R`$\int_0^6=\int_0^4+\int_4^6\Rightarrow10=\int_0^4f+3$.`, R`$\int_0^4f=7$.`], ans: R`$7$` },
    { id: 'p04', lvl: 'I', tag: 'Simetria (par e ímpar)', q: R`Calcule $\int_{-3}^{3}\left(x^5-4x^3+2\right)dx$.`, a: { t: 'num', v: '12' }, sol: [R`$x^5-4x^3$ é ímpar: contribui $0$.`, R`$\int_{-3}^32\,dx=2\cdot6=12$.`], ans: R`$12$` },
    { id: 'p05', lvl: 'I', tag: 'Valor médio', q: R`Qual é o valor médio de $f(x)=\sqrt x$ em $[0,4]$?`, a: { t: 'num', v: '4/3' }, sol: [R`$\frac14\int_0^4x^{1/2}dx=\frac14\cdot\frac23\cdot4^{3/2}=\frac14\cdot\frac{16}3=\frac43$.`], ans: R`$\frac43$` },
    { id: 'p06', lvl: 'I', tag: 'Variação total a partir da taxa', q: R`Água entra em um tanque à taxa $r(t)=3t^2+2$ litros/min. Quantos litros entram entre $t=0$ e $t=2$?`, a: { t: 'num', v: '12' },
      sol: [R`$\int_0^2(3t^2+2)dt=\left[t^3+2t\right]_0^2=8+4=12$.`], ans: R`$12$ L` },
    { id: 'p07', lvl: 'IA', tag: 'Inversão de limites + linearidade', q: R`Sabendo que $\int_0^3f=4$ e $\int_0^3g=-1$, calcule $\int_3^0\left[2f(x)+5g(x)+1\right]dx$.`, a: { t: 'num', v: '-6' },
      hint: R`Primeiro calcule $\int_0^3$; depois inverta o sinal.`,
      sol: [R`$\int_0^3(2f+5g+1)=2\cdot4+5\cdot(-1)+3=8-5+3=6$ (pois $\int_0^31\,dx=3$).`, R`Invertendo os limites: $\int_3^0=-6$.`], ans: R`$-6$` },
    { id: 'p08', lvl: 'IA', tag: 'Distância × deslocamento', q: R`Uma partícula tem $v(t)=t-2$ (m/s) em $0\le t\le4$. Qual é a **distância total** percorrida?`, a: { t: 'num', v: '4' },
      sol: [R`$v<0$ em $[0,2)$ e $v>0$ em $(2,4]$.`, R`$\int_0^2(t-2)dt=\left[\frac{t^2}2-2t\right]_0^2=2-4=-2$; $\int_2^4(t-2)dt=(8-8)-(2-4)=2$.`, R`Distância $=2+2=4$ m (o deslocamento seria $0$).`], ans: R`$4$ m` },
    { id: 'p09', lvl: 'IA', tag: 'Reconhecer propriedades válidas', q: R`Qual afirmação é **sempre** verdadeira (para $f$, $g$ contínuas)?`,
      a: { t: 'choice', options: [R`$\int_a^bf\,g\,dx=\int_a^bf\,dx\cdot\int_a^bg\,dx$`, R`$\int_a^b5f(x)\,dx=5\int_a^bf(x)\,dx$`, R`$\int_{-a}^{a}f(x)\,dx=0$`, R`$\int_a^bf(x)\,dx=\int_b^af(x)\,dx$`], correct: 1, why: R`Constantes saem da integral. Produto não se separa; simetria só zera funções **ímpares**; inverter limites troca o sinal.` },
      sol: [R`Linearidade: $\int_a^bkf=k\int_a^bf$. As outras são falsas em geral.`], ans: R`$\int_a^b5f=5\int_a^bf$` },
    { id: 'p10', lvl: 'A', tag: 'Estilo prova: quantidade a partir da taxa e máximo', q: R`(Estilo prova) Um reservatório tem 100 L em $t=0$. A vazão líquida é $r(t)=4-t$ (L/h), para $0\le t\le6$. a) Qual é o volume em $t=6$? b) Qual é o volume **máximo** nesse período?`,
      a: { t: 'multi', fields: [{ label: 'a) V(6) em litros', v: '106' }, { label: 'b) Volume máximo (L)', v: '108' }] },
      hint: R`$V(t)=100+\int_0^t(4-s)ds$. O volume para de crescer quando a vazão fica negativa.`,
      sol: [R`$V(t)=100+\int_0^t(4-s)\,ds=100+4t-\frac{t^2}{2}$.`, R`a) $V(6)=100+24-18=106$ L.`, R`b) $V'(t)=r(t)=4-t=0\Rightarrow t=4$ ($r>0$ antes e $r<0$ depois: máximo). Em $[0,6]$: $V(0)=100$, $V(4)=100+16-8=108$, $V(6)=106$.`, R`Máximo: $108$ L em $t=4$ h.`],
      ans: R`a) $106$ L · b) $108$ L (em $t=4$ h)` },
  ],

  summary: {
    formulas: [R`$\int_a^c=\int_a^b+\int_b^c$ · $\int_b^a=-\int_a^b$ · $\int_a^a=0$`, R`Ímpar em $[-a,a]$: $0$ · Par: $2\int_0^a$`, R`$f_{méd}=\frac1{b-a}\int_a^bf$`, R`$Q(b)=Q(a)+\int_a^bQ'$`],
    when: [R`Integrais dadas sem a função`, R`Intervalo simétrico`, R`Taxa → quantidade (variação total)`],
    steps: [R`Traduza o enunciado em integrais.`, R`Escolha a propriedade (linearidade, aditividade, simetria).`, R`Em taxas: some o valor inicial à integral da taxa.`, R`Distância: divida onde a velocidade troca de sinal.`],
    errors: [R`Separar produto`, R`Zerar função par por "simetria"`, R`Esquecer o valor inicial`],
    memo: [R`Par: $x^2,x^4,\cos x$ · Ímpar: $x,x^3,\sin x$`, R`$\int v$ = deslocamento · $\int|v|$ = distância`],
  },

  cards: [
    [R`$\int_b^af$ em termos de $\int_a^bf$?`, R`$\int_b^af=-\int_a^bf$`],
    [R`$\int_{-a}^af$ quando $f$ é ímpar?`, R`$0$`],
    [R`$\int_{-a}^af$ quando $f$ é par?`, R`$2\int_0^af$`],
    [R`Fórmula do valor médio?`, R`$f_{méd}=\frac{1}{b-a}\int_a^bf(x)dx$`],
    [R`Teorema da variação total?`, R`$\int_a^bQ'(t)dt=Q(b)-Q(a)$`],
    [R`Diferença entre deslocamento e distância?`, R`Deslocamento $=\int v$ (com sinal); distância $=\int|v|$.`],
    [R`Dada a taxa $Q'$ e $Q(0)$, como achar $Q(t)$?`, R`$Q(t)=Q(0)+\int_0^tQ'(s)\,ds$`],
  ],
});
