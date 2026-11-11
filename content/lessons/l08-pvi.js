'use strict';
CALC.addLesson({
  id: 'pvi', n: 8, title: 'Problemas de valor inicial (integração direta)', min: 50, prereq: ['substituicao'], patterns: ['P9'],
  prereqNote: R`nas provas, a taxa dada **sempre** exige substituição (ex.: $\frac{\sin(\sqrt{t+1})}{\sqrt{t+1}}$, $\frac{\cos t}{\sin t+2}$).`,

  theory: {
    what: R`Um **problema de valor inicial (PVI)** dá a **taxa de variação** $f'(t)$ e **um valor** da função, como $f(t_0)=y_0$, e pede a função $f(t)$. Resolve-se em duas etapas:
- **integrar** $f'$, obtendo $f(t)=F(t)+C$ (uma família de funções);
- **usar o ponto dado** para descobrir o $C$ (a função certa da família).`,
    why: R`Modela situações reais: altura de um elevador a partir da velocidade, massa de lixo a partir da taxa de depósito, posição a partir da velocidade. Na prova (Questão 4) vêm depois perguntas de interpretação: valor inicial, **valor máximo**, "ultrapassa o limite?".`,
    logic: R`A integral indefinida dá infinitas curvas "paralelas" ($F(t)+C$), todas com a mesma inclinação em cada $t$. O ponto $(t_0,y_0)$ escolhe **qual** delas passa por ali.

**Máximo sem derivar (dica das provas):** se $h(t)=38\cos(\sqrt{t+1})+38$, como $-1\le\cos(\cdot)\le1$:
$$-38\le38\cos(\cdot)\le38\ \Rightarrow\ 0\le h(t)\le76$$
O valor máximo é $76$, atingido quando o cosseno vale 1. Com logaritmo: $\ln$ é crescente, então $\ln(\sin t+2)$ é máximo quando $\sin t=1$, e vale $\ln3$.`,
    formulas: [
      [R`f(t)=\int f'(t)\,dt=F(t)+C\qquad f(t_0)=y_0\ \Rightarrow\ C=y_0-F(t_0)`, R`Integre e depois substitua o ponto dado para achar $C$.`],
      [R`f''\ \text{dada}:\ f'=\int f''+C_1,\quad f=\int f'+C_2`, R`Duas integrações, duas condições (ex.: $f'(0)$ e $f(0)$).`],
      [R`a(t)\xrightarrow{\int}v(t)\xrightarrow{\int}s(t)`, R`Aceleração → velocidade → posição.`],
      [R`-1\le\sin u\le1,\qquad -1\le\cos u\le1`, R`Para achar máximo/mínimo de expressões trigonométricas sem derivar.`],
      [R`\ln\ \text{é crescente}:\ \ln A\le\ln B\iff A\le B`, R`Para limitar expressões como $100\ln(\sin t+2)$: o máximo ocorre com $\sin t=1$.`],
    ],
    when: R`O enunciado dá "está variando a uma taxa $f'(t)=\ldots$" **e** um valor conhecido ("a altura $t=\ldots$ mais tarde era de 38 m", "a quantidade após $\frac{3\pi}{2}$ semanas é 100 t"). Pede "uma expressão analítica para $f(t)$".`,
    pitfalls: [
      [R`Esquecer o $+C$ e não usar a condição.`, R`O $C$ é o coração do PVI: integre com $+C$ e **sempre** use o ponto dado.`],
      [R`Substituir o ponto na derivada $f'$ em vez de em $f$.`, R`A condição é sobre $f$ (a quantidade), não sobre a taxa.`],
      [R`Errar o valor do trigonométrico no ponto (ex.: $\cos\frac\pi2=1$).`, R`$\sin\frac\pi2=1$, $\cos\frac\pi2=0$, $\sin\pi=0$, $\cos\pi=-1$, $\sin\frac{3\pi}2=-1$.`],
      [R`Dar o máximo como $38$ porque "$\cos\le1$", esquecendo o $+38$.`, R`Limite cada parcela e some: $38\cdot1+38=76$.`],
      [R`Confundir "quantidade inicial" ($f(0)$) com a constante $C$.`, R`$C$ só coincide com $f(0)$ se $F(0)=0$. Calcule $f(0)$ explicitamente.`],
    ],
  },

  identify: {
    triggers: [
      R`"está variando a uma taxa…", "a velocidade é…", "a vazão é…" + **um valor conhecido** da quantidade.`,
      R`"Encontre uma expressão analítica para $h(t)$ / $L(t)$".`,
      R`Perguntas finais: "quantidade inicial", "altura máxima", "pode ser multado?".`,
    ],
    first: R`**Escreva $f(t)=\int f'(t)\,dt$** e identifique a técnica de integração (quase sempre substituição). Só depois use a condição.`,
    examples: [
      { q: R`"$L'(t)=\frac{100\cos t}{\sin t+2}$ e $L\!\left(\frac{3\pi}2\right)=100$. Encontre $L(t)$."`, look: R`O numerador ($\cos t$) é a derivada de $\sin t+2$.`, method: R`Substituição $u=\sin t+2$: $L=100\ln|\sin t+2|+C$; $\sin\frac{3\pi}{2}=-1\Rightarrow100\ln1+C=100\Rightarrow C=100$.`, why: R`PVI + padrão $\int\frac{u'}{u}=\ln|u|$.` },
      { q: R`"$h'(t)=\frac{20\cos(\sqrt{t+1})}{\sqrt{t+1}}$ e $h(\pi^2-1)=40$."`, look: R`$\sqrt{t+1}$ dentro do cosseno e $\frac1{\sqrt{t+1}}$ fora.`, method: R`$u=\sqrt{t+1}$: $h=40\sin(\sqrt{t+1})+C$; $\sin\pi=0\Rightarrow C=40$.`, why: R`A derivada de $\sqrt{t+1}$ aparece: substituição.` },
    ],
    writing: R`- "Como $h'(t)=\ldots$, temos $h(t)=\int\ldots\,dt$. Usando a substituição $u=\ldots$, … $=38\cos(\sqrt{t+1})+C$."
- "Como $h\left((\frac\pi2)^2-1\right)=38$, então $38\cos\frac\pi2+C=38\Rightarrow C=38$. Daí, $h(t)=38\cos(\sqrt{t+1})+38$."
- Máximo: "Como $-1\le\cos(\sqrt{t+1})\le1$, temos $0\le h(t)\le76$. Logo, a altura máxima é 76 m."`,
  },

  solved: [
    { lvl: 1, q: R`Encontre $f$ sabendo que $f'(x)=6x^2$ e $f(1)=5$.`, method: R`Integrar e usar o ponto.`,
      steps: [R`$f(x)=\int6x^2dx=2x^3+C$.`, R`$f(1)=2+C=5\Rightarrow C=3$.`], ans: R`$f(x)=2x^3+3$` },
    { lvl: 2, q: R`Encontre $f$ com $f'(x)=e^x+1$ e $f(0)=4$.`, method: R`Integrar (tabela) e usar o ponto.`,
      steps: [R`$f(x)=e^x+x+C$.`, R`$f(0)=e^0+0+C=1+C=4\Rightarrow C=3$.`, R`Note que $C\neq f(0)$ aqui, porque $F(0)=1$.`], ans: R`$f(x)=e^x+x+3$` },
    { lvl: 3, q: R`Encontre $f$ com $f''(x)=6x$, $f'(0)=2$ e $f(0)=1$.`, method: R`Duas integrações, uma condição para cada constante.`,
      steps: [R`$f'(x)=\int6x\,dx=3x^2+C_1$; $f'(0)=C_1=2$, então $f'(x)=3x^2+2$.`, R`$f(x)=\int(3x^2+2)dx=x^3+2x+C_2$; $f(0)=C_2=1$.`], ans: R`$f(x)=x^3+2x+1$` },
    { lvl: 4, q: R`Uma partícula tem velocidade $v(t)=3t^2-2t$ m/s e está em $s(0)=5$ m. Onde ela está em $t=2$ s?`, method: R`A posição é a antiderivada da velocidade.`,
      steps: [R`$s(t)=\int(3t^2-2t)dt=t^3-t^2+C$.`, R`$s(0)=C=5$, então $s(t)=t^3-t^2+5$.`, R`$s(2)=8-4+5=9$ m.`], ans: R`$s(2)=9$ m` },
    { lvl: 5, q: R`(Estilo prova — Questão 4) A altura de um elevador varia à taxa $h'(t)=\frac{-15\sin(\sqrt{t+1})}{\sqrt{t+1}}$ (m/h), e $h(\pi^2-1)=60$ m.
a) Encontre $h(t)$. b) Qual é a altura máxima atingida? (Sem derivar: limite cada parcela.)`,
      method: R`PVI com substituição $u=\sqrt{t+1}$ e, depois, limitação do cosseno.`,
      steps: [
        R`$u=\sqrt{t+1}\Rightarrow du=\frac{1}{2\sqrt{t+1}}dt\Rightarrow dt=2\sqrt{t+1}\,du$.`,
        R`$$h(t)=\int\frac{-15\sin u}{\sqrt{t+1}}\cdot2\sqrt{t+1}\,du=\int-30\sin u\,du=30\cos u+C=30\cos(\sqrt{t+1})+C$$`,
        R`Condição: $t=\pi^2-1\Rightarrow\sqrt{t+1}=\pi$. Então $30\cos\pi+C=60\Rightarrow-30+C=60\Rightarrow C=90$.`,
        R`**a)** $h(t)=30\cos(\sqrt{t+1})+90$.`,
        R`**b)** $-1\le\cos(\sqrt{t+1})\le1\Rightarrow-30\le30\cos(\cdot)\le30\Rightarrow60\le h(t)\le120$. Altura máxima: $120$ m (quando $\cos(\sqrt{t+1})=1$, por exemplo $\sqrt{t+1}=2\pi$).`,
      ], ans: R`a) $h(t)=30\cos(\sqrt{t+1})+90$ · b) altura máxima $120$ m` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'PVI com potência', q: R`Encontre $f(x)$ se $f'(x)=4x^3$ e $f(1)=3$.`, a: { t: 'expr', v: 'x^4+2', d: '4x^3' },
      sol: [R`$f=x^4+C$; $1+C=3\Rightarrow C=2$.`], ans: R`$f(x)=x^4+2$` },
    { id: 'p02', lvl: 'F', tag: 'PVI com trigonométrica', q: R`Encontre $f(x)$ se $f'(x)=\cos x$ e $f(0)=2$.`, a: { t: 'expr', v: 'sin(x)+2', d: 'cos(x)' },
      sol: [R`$f=\sin x+C$; $\sin0+C=2\Rightarrow C=2$.`], ans: R`$f(x)=\sin x+2$` },
    { id: 'p03', lvl: 'I', tag: 'PVI com 1/x', q: R`Encontre $f(x)$, para $x>0$, se $f'(x)=\frac1x$ e $f(1)=5$.`, a: { t: 'expr', v: 'ln(x)+5', d: '1/x', domain: [0.5, 4] },
      sol: [R`$f=\ln x+C$; $\ln1+C=5\Rightarrow C=5$.`], ans: R`$f(x)=\ln x+5$` },
    { id: 'p04', lvl: 'I', tag: 'PVI de 2ª ordem', q: R`Encontre $f(x)$ se $f''(x)=12x^2$, $f'(0)=1$ e $f(0)=-2$.`, a: { t: 'expr', v: 'x^4+x-2' },
      sol: [R`$f'=4x^3+C_1$; $f'(0)=C_1=1$.`, R`$f=x^4+x+C_2$; $f(0)=C_2=-2$.`], ans: R`$f(x)=x^4+x-2$` },
    { id: 'p05', lvl: 'I', tag: 'Movimento: aceleração → posição', q: R`Uma bola é lançada para cima com $v(0)=20$ m/s, a partir do chão ($s(0)=0$), com aceleração $a(t)=-10$ m/s². Qual é a altura máxima (m)?`, a: { t: 'num', v: '20' },
      sol: [R`$v(t)=-10t+20$; $s(t)=-5t^2+20t$ (pois $s(0)=0$).`, R`Altura máxima quando $v=0$: $t=2$ s.`, R`$s(2)=-20+40=20$ m.`], ans: R`$20$ m` },
    { id: 'p06', lvl: 'I', tag: 'PVI com substituição (→ ln)', q: R`Encontre $f(x)$ se $f'(x)=\frac{2x}{x^2+1}$ e $f(0)=3$.`, a: { t: 'expr', v: 'ln(x^2+1)+3', d: '2x/(x^2+1)' },
      sol: [R`$u=x^2+1$: $f=\ln(x^2+1)+C$.`, R`$f(0)=\ln1+C=3\Rightarrow C=3$.`], ans: R`$f(x)=\ln(x^2+1)+3$` },
    { id: 'p07', lvl: 'IA', tag: 'PVI com raiz (C ≠ f(0))', q: R`Encontre $f(t)$ se $f'(t)=6\sqrt t$ e $f(4)=40$.`, a: { t: 'expr', v: '4t^(3/2)+8', var: 't', d: '6sqrt(t)', domain: [0.5, 9] },
      sol: [R`$f=6\cdot\frac{t^{3/2}}{3/2}+C=4t^{3/2}+C$.`, R`$f(4)=4\cdot8+C=32+C=40\Rightarrow C=8$.`], ans: R`$f(t)=4t^{3/2}+8$` },
    { id: 'p08', lvl: 'IA', tag: 'Interpretar o PVI (ln)', q: R`Uma população cresce à taxa $P'(t)=\frac{300}{t+1}$ pessoas/ano, com $P(0)=1000$. Quanto vale $P(e^2-1)$?`, a: { t: 'num', v: '1600' },
      sol: [R`$P(t)=300\ln(t+1)+C$; $P(0)=300\ln1+C=1000\Rightarrow C=1000$.`, R`$P(e^2-1)=300\ln(e^2)+1000=300\cdot2+1000=1600$.`], ans: R`$1600$ pessoas` },
    { id: 'p09', lvl: 'IA', tag: 'Estilo prova: substituição u = √(t+1)', q: R`A altura de um elevador varia à taxa $h'(t)=\frac{24\cos(\sqrt{t+1})}{\sqrt{t+1}}$ e $h(\pi^2-1)=50$. Encontre $h(t)$.`, a: { t: 'expr', v: '48sin(sqrt(t+1))+50', var: 't', d: '24cos(sqrt(t+1))/sqrt(t+1)', domain: [0, 10] },
      hint: R`$u=\sqrt{t+1}$, $dt=2\sqrt{t+1}\,du$.`,
      sol: [R`$u=\sqrt{t+1}$: $\int\frac{24\cos u}{\sqrt{t+1}}\cdot2\sqrt{t+1}\,du=\int48\cos u\,du=48\sin u+C$.`, R`$h(\pi^2-1)$: $u=\pi$, $48\sin\pi+C=0+C=50$.`, R`$h(t)=48\sin(\sqrt{t+1})+50$ (e, como $-1\le\sin\le1$, temos $2\le h\le98$).`], ans: R`$h(t)=48\sin(\sqrt{t+1})+50$` },
    { id: 'p10', lvl: 'A', tag: 'Estilo prova: PVI + valor inicial + limite legal', q: R`(Estilo prova) A massa de lixo de um depósito, em toneladas, varia à taxa $L'(t)=\frac{60\sin t}{2-\cos t}$ (t/semana), com $L(0)=150$. Use $\ln2\approx0{,}7$ e $\ln3\approx1{,}1$.
a) Encontre $L(t)$. b) Qual é a massa em $t=\frac\pi2$? c) Uma multa é aplicada se a massa ultrapassar 200 t. O depósito pode ser multado? Digite o **valor máximo** de $L$ (use as aproximações).`,
      a: { t: 'num', v: '216', tol: 0.01 },
      hint: R`$u=2-\cos t$, $du=\sin t\,dt$. Como $\ln$ é crescente, o máximo ocorre quando $2-\cos t$ é máximo.`,
      sol: [
        R`$u=2-\cos t\Rightarrow du=\sin t\,dt$. $L(t)=\int\frac{60}{u}du=60\ln|2-\cos t|+C$.`,
        R`$L(0)=60\ln(2-1)+C=60\cdot0+C=150\Rightarrow C=150$. **a)** $L(t)=60\ln(2-\cos t)+150$.`,
        R`**b)** $L\left(\frac\pi2\right)=60\ln(2-0)+150\approx60\cdot0{,}7+150=192$ t.`,
        R`**c)** $-1\le\cos t\le1\Rightarrow1\le2-\cos t\le3$. Como $\ln$ é crescente: $0\le\ln(2-\cos t)\le\ln3$.`,
        R`Máximo: $60\ln3+150\approx60\cdot1{,}1+150=216$ t (quando $\cos t=-1$, por exemplo $t=\pi$). Como $216>200$, **sim**, pode ser multado.`,
      ],
      ans: R`a) $L(t)=60\ln(2-\cos t)+150$ · b) $\approx192$ t · c) máximo $\approx216$ t $>200$: pode ser multado` },
  ],

  summary: {
    formulas: [R`$f=\int f'+C$; $C=y_0-F(t_0)$`, R`$a\to v\to s$ integrando`, R`$-1\le\sin,\cos\le1$ · $\ln$ crescente`],
    when: [R`Taxa de variação + um valor conhecido`, R`"Expressão analítica para $f(t)$"`],
    steps: [R`$f(t)=\int f'(t)dt$ (identifique a técnica: geralmente substituição).`, R`Escreva $+C$.`, R`Substitua o ponto dado e ache $C$.`, R`Escreva $f(t)$ final.`, R`Interprete: $f(0)$, máximos via limitação de sen/cos/ln.`],
    errors: [R`Esquecer $+C$`, R`Usar a condição na taxa`, R`Errar $\sin$/$\cos$ de $\frac\pi2,\pi,\frac{3\pi}2$`, R`Esquecer a constante somada ao limitar`],
    memo: [R`$\sin\frac\pi2=1$, $\cos\pi=-1$, $\sin\frac{3\pi}{2}=-1$, $\cos\frac\pi2=0$`, R`$\ln1=0$ · $\ln2\approx0{,}7$ · $\ln3\approx1{,}1$`],
  },

  cards: [
    [R`O que é um problema de valor inicial?`, R`Dada a taxa $f'(t)$ e um valor $f(t_0)=y_0$, achar $f(t)$.`],
    [R`Como encontrar a constante $C$ num PVI?`, R`Substituir o ponto dado em $f(t)=F(t)+C$ e resolver.`],
    [R`Como achar o máximo de $38\cos(\sqrt{t+1})+38$ sem derivar?`, R`$-1\le\cos\le1\Rightarrow0\le h\le76$. Máximo $76$.`],
    [R`$\int\frac{100\cos t}{\sin t+2}dt$?`, R`$100\ln|\sin t+2|+C$ ($u=\sin t+2$).`],
    [R`Aceleração, velocidade e posição: como se relacionam pela integral?`, R`$v=\int a\,dt$ e $s=\int v\,dt$ (cada uma com sua constante).`],
    [R`$C$ é sempre igual a $f(0)$?`, R`Não; só quando $F(0)=0$. Ex.: $f=e^x+C$ tem $f(0)=1+C$.`],
    [R`Valores: $\sin\frac{3\pi}{2}$ e $\cos\pi$?`, R`$-1$ e $-1$.`],
  ],
});
