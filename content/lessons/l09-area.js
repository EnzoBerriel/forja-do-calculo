'use strict';
CALC.addLesson({
  id: 'area', n: 9, title: 'Área entre curvas', min: 55, prereq: ['definidas', 'substituicao'], patterns: ['P10'],
  prereqNote: R`curvas com raiz, como $\sqrt{4x-3}$, exigem substituição na integral.`,

  theory: {
    what: R`A área da região entre duas curvas $y=f(x)$ (de cima) e $y=g(x)$ (de baixo), para $a\le x\le b$, é
$$A=\int_a^b\big[f(x)-g(x)\big]\,dx$$
Ou seja, é a integral de "**cima menos baixo**".`,
    why: R`É a aplicação geométrica clássica da integral definida. Na prova é sempre a última questão: um **esboço sem chutar pontos** (seguindo um roteiro) e o **cálculo da área**.`,
    logic: R`Corte a região em faixas verticais finas de largura $dx$. Cada faixa é um retângulo de altura $f(x)-g(x)$ (topo menos base) e área $[f(x)-g(x)]\,dx$. Somando todas as faixas (integral), obtém-se a área.

Como a altura é **topo − base**, o resultado é positivo, mesmo que as curvas estejam abaixo do eixo $x$.

**Os limites** $a$ e $b$, quando não são dados, são as **interseções** das curvas: resolva $f(x)=g(x)$.

**Quem está por cima?** Teste um ponto **entre** as interseções. Ex.: $y=x$ e $y=\sqrt{4x-3}$ se cruzam em $x=1$ e $x=3$. Em $x=2$: $y=2$ e $y=\sqrt5\approx2{,}24$, então a raiz está por cima.`,
    formulas: [
      [R`A=\int_a^b\big[f_{\text{cima}}(x)-f_{\text{baixo}}(x)\big]\,dx`, R`Sempre cima menos baixo, dentro do intervalo.`],
      [R`f(x)=g(x)\ \Rightarrow\ \text{interseções}\ (a,\,b)`, R`Raízes de $f-g$. Em equações com raiz, eleve ao quadrado e confira.`],
      [R`\text{Se trocam de posição em }c:\ A=\int_a^c(f-g)\,dx+\int_c^b(g-f)\,dx`, R`Divida nos pontos de cruzamento.`],
      [R`\int\sqrt{ax+b}\,dx=\frac{2}{3a}(ax+b)^{3/2}+C`, R`Atalho que aparece em todas as áreas com raiz (vem da substituição $u=ax+b$).`],
    ],
    when: R`"Área da região delimitada por…", "área entre as curvas…". Também "área sob a curva" (a curva de baixo é o eixo, $y=0$).`,
    pitfalls: [
      [R`Integrar $f-g$ sem verificar quem está por cima (resultado negativo).`, R`Teste um ponto entre as interseções e escreva a tabela.`],
      [R`Não dividir quando as curvas se cruzam no meio (as áreas se cancelam).`, R`Ache **todas** as interseções e integre cada pedaço com o sinal certo.`],
      [R`"Chutar" pontos aleatórios para o esboço.`, R`Roteiro: interseções → tabela com um ponto entre elas → quem está por cima.`],
      [R`Errar a substituição: $\int\sqrt{4x-3}dx=\frac23(4x-3)^{3/2}$.`, R`Falta o $\frac14$: $\frac{1}{4}\cdot\frac23(4x-3)^{3/2}=\frac16(4x-3)^{3/2}$.`],
      [R`Esquecer de trocar os limites ao substituir $u=4x-3$.`, R`$x=1\to u=1$ e $x=3\to u=9$.`],
    ],
  },

  identify: {
    triggers: [
      R`"Área da região delimitada pelas curvas…"`,
      R`"Sem chutar pontos aleatórios, faça um esboço da região."`,
      R`Duas funções e nenhum intervalo dado: as interseções serão os limites.`,
    ],
    first: R`**Iguale as curvas** para achar as interseções. Depois monte a tabela com as interseções e **um ponto entre elas** para descobrir quem está por cima.`,
    examples: [
      { q: R`"Área entre $y=x$ e $y=\sqrt{6x-5}$."`, look: R`Nenhum intervalo dado; uma das curvas tem raiz.`, method: R`$x=\sqrt{6x-5}\Rightarrow x^2-6x+5=0\Rightarrow x=1,5$. Em $x=2$: $\sqrt7>2$, a raiz fica por cima. $A=\int_1^5(\sqrt{6x-5}-x)dx$ (substituição $u=6x-5$).`, why: R`Roteiro completo: interseções, tabela, cima − baixo.` },
      { q: R`"Área entre $y=x^4+5x^3+1$ e $y=2x^4-x^3+9x^2+1$."`, look: R`Polinômios: a diferença fatora.`, method: R`$g-f=x^4-6x^3+9x^2=x^2(x-3)^2=0\Rightarrow x=0,3$. Em $x=1$: $11>7$. $A=\int_0^3x^2(x-3)^2dx=\frac{81}{10}$.`, why: R`A diferença é $\ge0$ em todo $[0,3]$ (é um quadrado), então não há troca de posição.` },
    ],
    writing: R`1. "Encontrando as interseções: $x=\sqrt{4x-3}\Rightarrow x^2=4x-3\Rightarrow x^2-4x+3=0\Rightarrow x=1$ ou $x=3$."
2. Tabela: $x$ | $y=x$ | $y=\sqrt{4x-3}$ com $x=1,2,3$.
3. "Como $\sqrt5>2$, $y=\sqrt{4x-3}$ está por cima em $[1,3]$."
4. Esboço da região.
5. "$A=\int_1^3(\sqrt{4x-3}-x)dx=\ldots=\frac13$ u.a."`,
  },

  solved: [
    { lvl: 1, q: R`Calcule a área sob $y=x^2$ entre $x=0$ e $x=2$ (acima do eixo $x$).`, method: R`Curva de cima $x^2$, de baixo $y=0$.`,
      steps: [R`$A=\int_0^2(x^2-0)dx=\left[\frac{x^3}3\right]_0^2=\frac83$.`], ans: R`$\frac83$ u.a.` },
    { lvl: 2, q: R`Calcule a área entre $y=x$ e $y=x^2$.`, method: R`Interseções + tabela + cima − baixo.`,
      steps: [R`$x=x^2\Rightarrow x(x-1)=0\Rightarrow x=0,1$.`, R`Em $x=\frac12$: $y=x$ vale $0{,}5$ e $y=x^2$ vale $0{,}25$. A reta está por cima.`, R`$A=\int_0^1(x-x^2)dx=\frac12-\frac13=\frac16$.`], ans: R`$\frac16$ u.a.` },
    { lvl: 3, q: R`Calcule a área entre $y=4-x^2$ e $y=x+2$.`, method: R`Parábola e reta: interseções por equação do 2º grau.`,
      steps: [R`$4-x^2=x+2\Rightarrow x^2+x-2=0\Rightarrow(x+2)(x-1)=0\Rightarrow x=-2,\ 1$.`, R`Em $x=0$: parábola $=4$, reta $=2$. A parábola está por cima.`, R`$A=\int_{-2}^1\left[(4-x^2)-(x+2)\right]dx=\int_{-2}^1(2-x-x^2)dx=\left[2x-\frac{x^2}2-\frac{x^3}3\right]_{-2}^1$.`, R`$=\left(2-\frac12-\frac13\right)-\left(-4-2+\frac83\right)=\frac76-\left(-\frac{10}3\right)=\frac76+\frac{20}6=\frac{27}6=\frac92$.`], ans: R`$\frac92$ u.a.` },
    { lvl: 4, q: R`Calcule a área entre $y=\sin x$ e $y=\cos x$ para $0\le x\le\frac\pi2$.`, method: R`As curvas **trocam de posição** em $x=\frac\pi4$: dividir a integral.`,
      steps: [R`$\sin x=\cos x\Rightarrow x=\frac\pi4$ em $[0,\frac\pi2]$.`, R`Em $[0,\frac\pi4]$ o cosseno está por cima; em $[\frac\pi4,\frac\pi2]$, o seno. Por simetria, as duas partes são iguais.`, R`$A=2\int_0^{\pi/4}(\cos x-\sin x)dx=2\left[\sin x+\cos x\right]_0^{\pi/4}=2\left(\frac{\sqrt2}2+\frac{\sqrt2}2-1\right)=2(\sqrt2-1)$.`], ans: R`$2(\sqrt2-1)\approx0{,}83$ u.a.` },
    { lvl: 5, q: R`(Estilo prova — Questão 5) Considere a região delimitada por $y=x$ e $y=\sqrt{8x-7}$.
a) Sem chutar pontos aleatórios, esboce a região. b) Calcule sua área.`,
      method: R`Roteiro: interseções → tabela → quem está por cima → integral com substituição $u=8x-7$.`,
      steps: [
        R`**Interseções:** $x=\sqrt{8x-7}\Rightarrow x^2=8x-7\Rightarrow x^2-8x+7=0\Rightarrow(x-1)(x-7)=0\Rightarrow x=1$ ou $x=7$ (ambas conferem na equação original).`,
        R`**Tabela:** $x=1$: $1$ e $1$ · $x=2$: $2$ e $\sqrt9=3$ · $x=7$: $7$ e $7$. Como $3>2$, $y=\sqrt{8x-7}$ está por cima em $[1,7]$.`,
        R`**Esboço:** a reta $y=x$ e a curva de raiz se encontram em $(1,1)$ e $(7,7)$; a raiz forma um arco acima da reta.`,
        R`**b)** $A=\int_1^7\sqrt{8x-7}\,dx-\int_1^7x\,dx$.`,
        R`1ª integral: $u=8x-7$, $du=8dx$; $x=1\to u=1$, $x=7\to u=49$. $\int_1^{49}u^{1/2}\frac{du}8=\frac18\cdot\frac23\left[u^{3/2}\right]_1^{49}=\frac1{12}(343-1)=\frac{342}{12}=\frac{57}2$.`,
        R`2ª integral: $\left[\frac{x^2}2\right]_1^7=\frac{49-1}2=24$.`,
        R`$A=\frac{57}2-24=\frac92$.`,
      ], ans: R`$A=\frac92$ u.a.` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'Área sob a curva', q: R`Calcule a área entre $y=x^2+1$ e o eixo $x$, para $0\le x\le3$.`, a: { t: 'num', v: '12' },
      sol: [R`$\int_0^3(x^2+1)dx=\left[\frac{x^3}3+x\right]_0^3=9+3=12$.`], ans: R`$12$ u.a.` },
    { id: 'p02', lvl: 'F', tag: 'Reta e parábola', q: R`Calcule a área entre $y=2x$ e $y=x^2$.`, a: { t: 'num', v: '4/3' },
      sol: [R`$2x=x^2\Rightarrow x=0,2$. Em $x=1$: $2>1$, a reta está por cima.`, R`$\int_0^2(2x-x^2)dx=4-\frac83=\frac43$.`], ans: R`$\frac43$ u.a.` },
    { id: 'p03', lvl: 'I', tag: 'Duas parábolas', q: R`Calcule a área entre $y=x^2$ e $y=2-x^2$.`, a: { t: 'num', v: '8/3' },
      sol: [R`$x^2=2-x^2\Rightarrow x=\pm1$. Em $x=0$: $2>0$, então $2-x^2$ está por cima.`, R`$\int_{-1}^1(2-2x^2)dx=\left[2x-\frac{2x^3}3\right]_{-1}^1=\left(2-\frac23\right)-\left(-2+\frac23\right)=\frac83$.`], ans: R`$\frac83$ u.a.` },
    { id: 'p04', lvl: 'I', tag: 'Curvas que se cruzam: dividir o intervalo', q: R`Calcule a área **total** entre $y=x^3$ e $y=x$.`, a: { t: 'num', v: '1/2' },
      hint: R`Interseções: $-1$, $0$, $1$. Quem está por cima muda em $x=0$.`,
      sol: [R`$x^3=x\Rightarrow x(x^2-1)=0\Rightarrow x=-1,0,1$.`, R`Em $[-1,0]$ ($x=-\frac12$): $x^3=-\frac18>-\frac12=x$, então $x^3$ está por cima. Em $[0,1]$: $x$ está por cima.`, R`$\int_{-1}^0(x^3-x)dx=\frac14$ e $\int_0^1(x-x^3)dx=\frac14$. Total $=\frac12$.`], ans: R`$\frac12$ u.a.` },
    { id: 'p05', lvl: 'I', tag: 'Exponencial e reta horizontal', q: R`Calcule a área entre $y=e^x$, $y=1$ e $x=2$.`, a: { t: 'num', v: 'e^2-3' },
      sol: [R`$e^x=1\Rightarrow x=0$. Em $[0,2]$, $e^x\ge1$.`, R`$\int_0^2(e^x-1)dx=\left[e^x-x\right]_0^2=(e^2-2)-(1-0)=e^2-3$.`], ans: R`$e^2-3\approx4{,}39$ u.a.` },
    { id: 'p06', lvl: 'I', tag: 'Raiz e parábola', q: R`Calcule a área entre $y=\sqrt x$ e $y=x^2$.`, a: { t: 'num', v: '1/3' },
      sol: [R`$\sqrt x=x^2\Rightarrow x=0$ ou $x=1$. Em $x=\frac14$: $\sqrt{1/4}=\frac12>\frac1{16}$, a raiz está por cima.`, R`$\int_0^1(x^{1/2}-x^2)dx=\frac23-\frac13=\frac13$.`], ans: R`$\frac13$ u.a.` },
    { id: 'p07', lvl: 'IA', tag: 'Quárticas com raiz dupla (estilo prova)', q: R`Calcule a área da região delimitada por $y=x^3+2$ e $y=x^4-x^3+x^2+2$.`, a: { t: 'num', v: '1/30' },
      hint: R`A diferença fatora como $x^2(x-1)^2$.`,
      sol: [R`$(x^4-x^3+x^2+2)-(x^3+2)=x^4-2x^3+x^2=x^2(x-1)^2=0\Rightarrow x=0,1$.`, R`Em $x=\frac12$: $\frac{17}{8}=2{,}125$ e $2{,}1875$; a quártica está por cima (e a diferença é um quadrado, logo $\ge0$).`, R`$\int_0^1(x^4-2x^3+x^2)dx=\frac15-\frac12+\frac13=\frac{6-15+10}{30}=\frac1{30}$.`], ans: R`$\frac1{30}$ u.a.` },
    { id: 'p08', lvl: 'IA', tag: 'Curva abaixo do eixo (área total)', q: R`Calcule a área total entre $y=\sin x$ e o eixo $x$ para $0\le x\le2\pi$.`, a: { t: 'num', v: '4' },
      sol: [R`Em $[0,\pi]$, $\sin x\ge0$; em $[\pi,2\pi]$, $\sin x\le0$.`, R`$\int_0^\pi\sin x\,dx=2$ e $\int_\pi^{2\pi}(0-\sin x)dx=\left[\cos x\right]_\pi^{2\pi}=1-(-1)=2$.`, R`Total $=4$. (Se integrasse direto de $0$ a $2\pi$, daria $0$!)`], ans: R`$4$ u.a.` },
    { id: 'p09', lvl: 'IA', tag: 'Raiz deslocada', q: R`Calcule a área entre $y=x-1$ e $y=\sqrt{x-1}$.`, a: { t: 'num', v: '1/6' },
      sol: [R`$(x-1)^2=x-1\Rightarrow(x-1)(x-2)=0\Rightarrow x=1,2$.`, R`Em $x=1{,}25$: $\sqrt{0{,}25}=0{,}5>0{,}25$, a raiz está por cima.`, R`$\int_1^2\left[(x-1)^{1/2}-(x-1)\right]dx=\left[\frac23(x-1)^{3/2}-\frac{(x-1)^2}{2}\right]_1^2=\frac23-\frac12=\frac16$.`], ans: R`$\frac16$ u.a.` },
    { id: 'p10', lvl: 'A', tag: 'Estilo prova: reta × raiz com substituição', q: R`(Estilo prova) Considere a região delimitada por $y=x$ e $y=\sqrt{10x-9}$. Faça o roteiro (interseções, tabela, quem está por cima, esboço) no rascunho e calcule a área.`, a: { t: 'num', v: '128/15' },
      hint: R`Interseções em $x=1$ e $x=9$. Para $\int\sqrt{10x-9}dx$ use $u=10x-9$.`,
      sol: [
        R`$x=\sqrt{10x-9}\Rightarrow x^2-10x+9=0\Rightarrow x=1$ ou $x=9$.`,
        R`Tabela: $x=2$: $y=2$ e $\sqrt{11}\approx3{,}3$. A raiz está por cima em $[1,9]$.`,
        R`$\int_1^9\sqrt{10x-9}\,dx$: $u=10x-9$, $dx=\frac{du}{10}$; $x=1\to u=1$, $x=9\to u=81$: $\frac1{10}\cdot\frac23\left[u^{3/2}\right]_1^{81}=\frac1{15}(729-1)=\frac{728}{15}$.`,
        R`$\int_1^9x\,dx=\frac{81-1}{2}=40$.`,
        R`$A=\frac{728}{15}-40=\frac{728-600}{15}=\frac{128}{15}\approx8{,}53$.`,
      ], ans: R`$\frac{128}{15}$ u.a.` },
  ],

  summary: {
    formulas: [R`$A=\int_a^b(\text{cima}-\text{baixo})dx$`, R`Interseções: $f(x)=g(x)$`, R`$\int\sqrt{ax+b}\,dx=\frac{2}{3a}(ax+b)^{3/2}$`],
    when: [R`"Área da região delimitada por…"`, R`"Esboce sem chutar pontos"`],
    steps: [R`Iguale as curvas: interseções.`, R`Tabela com interseções + um ponto entre elas.`, R`Decida quem está por cima (divida se trocarem).`, R`Esboce.`, R`Integre cima − baixo (substituição se houver raiz).`],
    errors: [R`Não checar quem está por cima`, R`Não dividir quando cruzam`, R`Esquecer o $\frac1a$ na raiz`],
    memo: [R`$x^2(x-a)^2\ge0$: sem troca de posição`, R`$9^{3/2}=27$, $25^{3/2}=125$, $49^{3/2}=343$, $81^{3/2}=729$`, R`Resposta em "u.a." (unidades de área)`],
  },

  cards: [
    [R`Fórmula da área entre curvas?`, R`$A=\int_a^b[f_{cima}-f_{baixo}]\,dx$`],
    [R`Como achar os limites da integral de área?`, R`Resolvendo $f(x)=g(x)$ (interseções).`],
    [R`Como saber qual curva está por cima?`, R`Avaliando as duas num ponto **entre** as interseções.`],
    [R`E se as curvas trocam de posição?`, R`Divida a integral nos pontos de cruzamento e use cima − baixo em cada parte.`],
    [R`$\int\sqrt{4x-3}\,dx$?`, R`$\frac16(4x-3)^{3/2}+C$ (substituição $u=4x-3$).`],
    [R`Roteiro de esboço "sem chutar pontos"?`, R`Interseções → tabela com ponto intermediário → quem está por cima → desenho.`],
    [R`$\int_0^{2\pi}\sin x\,dx$ é a área entre a senoide e o eixo?`, R`Não: dá $0$. A área é $4$ (divida em $[0,\pi]$ e $[\pi,2\pi]$).`],
  ],
});
