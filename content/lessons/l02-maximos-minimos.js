'use strict';
CALC.addLesson({
  id: 'extremos', n: 2, title: 'Máximos, mínimos e esboço de gráfico', min: 70, prereq: [], patterns: ['P6', 'P7', 'P8'],

  theory: {
    review: R`Para estudar o **sinal** de um produto (como $6x^3(x^2-2)$), faça uma tabela: marque as raízes de cada fator na reta, descubra o sinal de cada fator em cada intervalo e multiplique os sinais.
- Fator com potência **ímpar** ($x$, $x^3$): **troca** de sinal na raiz.
- Fator com potência **par** ($x^2$, $x^4$): **não troca** de sinal (é sempre $\ge 0$).
- $x^2-a$ (com $a>0$): é positivo fora de $[-\sqrt a,\sqrt a]$ e negativo dentro.`,
    what: R`É o estudo do **formato** de uma função usando suas derivadas:
- **$f'$ (1ª derivada)** diz onde $f$ **cresce** ou **decresce**, e onde estão os **máximos e mínimos**.
- **$f''$ (2ª derivada)** diz para onde a curva "abre": **concavidade para cima** (∪) ou **para baixo** (∩), e onde estão os **pontos de inflexão**.

**Local** = o maior/menor valor "na vizinhança". **Global** (ou absoluto) = o maior/menor valor em **todo** o domínio considerado.`,
    why: R`Serve para esboçar gráficos **sem chutar pontos** e para encontrar valores extremos: maior lucro, menor custo, altura máxima. Na prova é a Questão 3 inteira: números críticos, crescimento, concavidade, inflexão, tabela, gráfico e Método do Intervalo Fechado.`,
    logic: R`A derivada é a inclinação da reta tangente:
- $f'>0$: a curva sobe. $f'<0$: a curva desce.
- No topo de um morro ou no fundo de um vale, a tangente é horizontal: $f'=0$. Esses pontos são os **números críticos**.
- Se $f'$ passa de **+ para −**, a curva subia e passou a descer: **máximo local**. De **− para +**: **mínimo local**. Se o sinal **não muda**, não é extremo.
- $f''>0$: a inclinação está aumentando, curva em forma de ∪. $f''<0$: forma de ∩. Onde $f''$ **muda de sinal**, há uma **inflexão**.

**Exemplo:** $f(x)=x^2$ tem $f'(x)=2x$: negativo para $x<0$ e positivo para $x>0$. Logo $x=0$ é mínimo. Como $f''=2>0$, a curva é sempre ∪.`,
    formulas: [
      [R`c\ \text{é número crítico}\iff f'(c)=0\ \text{ ou }\ f'(c)\ \text{não existe}`, R`Só os números críticos (do domínio) podem ser máximos/mínimos locais.`],
      [R`f'>0\Rightarrow f\nearrow\qquad f'<0\Rightarrow f\searrow`, R`Teste da 1ª derivada: troca $+\to-$ = máx. local; $-\to+$ = mín. local.`],
      [R`f''>0\Rightarrow \cup\ (\text{côncava p/ cima})\qquad f''<0\Rightarrow \cap\ (\text{côncava p/ baixo})`, R`Inflexão: ponto onde $f''$ **muda de sinal** (não basta $f''=0$).`],
      [R`f'(c)=0\ \text{e}\ f''(c)<0\Rightarrow \text{máx. local};\quad f''(c)>0\Rightarrow\text{mín. local}`, R`Teste da 2ª derivada. Se $f''(c)=0$, é inconclusivo: use o teste da 1ª derivada.`],
      [R`\text{Intervalo fechado }[a,b]:\ \text{compare } f(a),\ f(b)\ \text{e } f(c)\ \text{para cada crítico } c\in(a,b)`, R`O maior valor é o **máximo global** e o menor é o **mínimo global**.`],
    ],
    when: R`- "Encontre os números críticos / intervalos de crescimento / máximos e mínimos locais": estude o **sinal de $f'$**.
- "Concavidade / pontos de inflexão": estude o **sinal de $f''$**.
- "Máximos e mínimos **globais** em $[a,b]$" ou "Método do Intervalo Fechado": **tabela de valores** nos críticos internos e nas extremidades.
- "Esboce o gráfico": roteiro completo (veja Identificação).`,
    pitfalls: [
      [R`Dizer que $x=0$ é inflexão porque $f''(0)=0$ em $f''=6x^2(x^2-6)$.`, R`$6x^2$ não troca de sinal em $0$. Inflexão exige **mudança** de sinal de $f''$.`],
      [R`No intervalo fechado, esquecer as extremidades $a$ e $b$.`, R`Os candidatos são: críticos **dentro** de $[a,b]$ + extremidades.`],
      [R`Incluir um crítico fora do intervalo (ex.: $-\sqrt{10}$ em $[-1,4]$).`, R`Descarte os críticos que não pertencem a $[a,b]$.`],
      [R`Responder "máximo em $y=100$" quando a pergunta é a coordenada $x$.`, R`Leia o que é pedido: **coordenada $x$**, valor $f(x)$ ou o ponto $(x,f(x))$.`],
      [R`Achar que todo crítico é extremo (ex.: $x=0$ em $f=x^3$).`, R`Se $f'$ não troca de sinal, **não** há máximo nem mínimo.`],
    ],
  },

  identify: {
    triggers: [
      R`"Números críticos", "crescimento e decrescimento", "máximos e mínimos locais" → sinal de $f'$.`,
      R`"Concavidade", "pontos de inflexão" → sinal de $f''$.`,
      R`"Máximos e mínimos **globais** em $[a,b]$" ou "Método do Intervalo Fechado" → tabela com críticos e extremidades.`,
      R`Polinômios como $\frac15x^6-3x^4$ ou $2x^6-3x^4$: fatore colocando a menor potência em evidência.`,
    ],
    first: R`**Derive e fatore.** Exemplo: $f'(x)=\frac65x^5-12x^3=6x^3\left(\frac15x^2-2\right)$. Com $f'$ fatorada, as raízes saem na hora ($x=0$ ou $x=\pm\sqrt{10}$) e a tabela de sinais fica fácil.

**Roteiro de esboço (o mesmo da prova):**
- (i) Interceptos: resolva $f(x)=0$.
- (ii) Sinal de $f'$: onde cresce e onde decresce.
- (iii) Máximos e mínimos locais.
- (iv) Sinal de $f''$: concavidade e inflexões.
- (v) Tabela dos pontos principais.
- (vi) Desenho, respeitando a concavidade.`,
    examples: [
      { q: R`"Encontre os máximos e mínimos globais de $f(x)=x^3-3x$ em $[0,2]$."`, look: R`Intervalo **fechado** e a palavra **globais**.`, method: R`Método do Intervalo Fechado: críticos em $(0,2)$ + extremidades $0$ e $2$.`, why: R`Em intervalo fechado, o extremo global está num crítico interno ou numa extremidade.` },
      { q: R`"Determine os intervalos em que $f(x)=x^4-4x^3$ é côncava para cima."`, look: R`A palavra **concavidade**.`, method: R`$f''(x)=12x^2-24x=12x(x-2)$ e tabela de sinais.`, why: R`A concavidade é dada pelo sinal de $f''$, não de $f'$.` },
      { q: R`"$f'(x)=x^2(x-3)$. Em $x=0$ há máximo?"`, look: R`O fator $x^2$ tem potência par.`, method: R`Teste da 1ª derivada: o sinal de $f'$ é o sinal de $(x-3)$, negativo antes e depois de $0$.`, why: R`Sem troca de sinal não há extremo em $x=0$ (mínimo só em $x=3$).` },
    ],
    writing: R`- "Números críticos: $f'(x)=0\Rightarrow 6x^3(\frac15x^2-2)=0\Rightarrow x=0$ ou $x=\pm\sqrt{10}$."
- Desenhe a **tabela de sinais** (fator por fator) e conclua: "$f$ é crescente em … e decrescente em …".
- "Como $f'$ muda de positivo para negativo em $x=0$, há um **máximo local** em $x=0$."
- "As inflexões ocorrem onde $f''$ muda de sinal: $x=\pm\sqrt6$."
- Intervalo fechado: liste os candidatos, calcule $f$ em cada um e conclua "$(4,\frac{256}5)$ é o máximo global".`,
  },

  solved: [
    {
      lvl: 1, q: R`Encontre os intervalos de crescimento e o extremo local de $f(x)=x^2-4x+1$.`,
      method: R`Pede crescimento e extremo, então estudamos o sinal de $f'$.`,
      steps: [
        R`$f'(x)=2x-4$. Número crítico: $2x-4=0\Rightarrow x=2$.`,
        R`Sinal: para $x<2$, $f'<0$ (ex.: $f'(0)=-4$); para $x>2$, $f'>0$ (ex.: $f'(3)=2$).`,
        R`$f$ decresce em $(-\infty,2)$ e cresce em $(2,\infty)$. A troca $-\to+$ indica **mínimo local** em $x=2$, com $f(2)=4-8+1=-3$.`,
      ],
      ans: R`Decrescente em $(-\infty,2)$, crescente em $(2,\infty)$; mínimo local em $(2,-3)$.`,
    },
    {
      lvl: 2, q: R`Use o Método do Intervalo Fechado para achar os extremos globais de $f(x)=x^3-3x$ em $[0,2]$.`,
      method: R`Intervalo fechado + "globais": candidatos = críticos internos + extremidades.`,
      steps: [
        R`$f'(x)=3x^2-3=3(x^2-1)=0\Rightarrow x=\pm1$. Só $x=1$ pertence a $[0,2]$ ($-1$ é descartado).`,
        R`Tabela: $f(0)=0$; $f(1)=1-3=-2$; $f(2)=8-6=2$.`,
        R`Maior valor: $2$ (em $x=2$). Menor valor: $-2$ (em $x=1$).`,
      ],
      ans: R`Máximo global $(2,\,2)$; mínimo global $(1,\,-2)$.`,
    },
    {
      lvl: 3, q: R`Para $f(x)=x^3-6x^2+9x+1$, ache os extremos locais, a concavidade e a inflexão.`,
      method: R`Extremos: sinal de $f'$. Concavidade e inflexão: sinal de $f''$.`,
      steps: [
        R`$f'(x)=3x^2-12x+9=3(x^2-4x+3)=3(x-1)(x-3)$. Críticos: $x=1$ e $x=3$.`,
        R`Sinal de $f'$: positivo em $(-\infty,1)$, negativo em $(1,3)$, positivo em $(3,\infty)$.`,
        R`Em $x=1$: $+\to-$, **máximo local**, $f(1)=1-6+9+1=5$. Em $x=3$: $-\to+$, **mínimo local**, $f(3)=27-54+27+1=1$.`,
        R`$f''(x)=6x-12$: negativa para $x<2$ (∩) e positiva para $x>2$ (∪). Muda de sinal em $x=2$, onde há **inflexão**: $f(2)=8-24+18+1=3$.`,
      ],
      ans: R`Máx. local $(1,5)$; mín. local $(3,1)$; côncava p/ baixo em $(-\infty,2)$, p/ cima em $(2,\infty)$; inflexão em $(2,3)$.`,
    },
    {
      lvl: 4, q: R`Estude $f(x)=x^4-4x^3$: críticos, extremos locais, concavidade e inflexões.`,
      method: R`Polinômio: derivar, **fatorar** e montar a tabela de sinais. Atenção aos fatores de potência par.`,
      steps: [
        R`$f'(x)=4x^3-12x^2=4x^2(x-3)$. Críticos: $x=0$ e $x=3$.`,
        R`$4x^2\ge0$ não troca de sinal, então o sinal de $f'$ é o de $(x-3)$: negativo para $x<3$ e positivo para $x>3$.`,
        R`$f$ decresce em $(-\infty,3)$ e cresce em $(3,\infty)$. Em $x=0$ **não** há extremo (não há troca de sinal). Em $x=3$ há **mínimo local**: $f(3)=81-108=-27$.`,
        R`$f''(x)=12x^2-24x=12x(x-2)$. Sinal: $+$ em $(-\infty,0)$, $-$ em $(0,2)$, $+$ em $(2,\infty)$.`,
        R`Côncava p/ cima em $(-\infty,0)\cup(2,\infty)$ e p/ baixo em $(0,2)$. Inflexões em $x=0$ e $x=2$ (aqui há troca de sinal).`,
      ],
      ans: R`Mín. local em $x=3$ ($f=-27$); $x=0$ é crítico, mas não é extremo, e é ponto de inflexão; inflexões em $x=0$ e $x=2$.`,
    },
    {
      lvl: 5, q: R`(Estilo prova — Questão 3) Seja $f(x)=x^6-3x^4$. Use $\sqrt2\approx1{,}4$, $\sqrt3\approx1{,}7$ e $\sqrt{1{,}2}\approx1{,}1$.
a) Use o Método do Intervalo Fechado para achar os máximos e mínimos globais de $f$ em $[-1,2]$.
b) Interceptos, crescimento, extremos locais, concavidade, inflexões e tabela de pontos.`,
      method: R`Polinômio par de grau 6: fatorar $f$, $f'$ e $f''$ colocando a menor potência em evidência, e montar a tabela de sinais.`,
      steps: [
        R`**Críticos:** $f'(x)=6x^5-12x^3=6x^3(x^2-2)=0\Rightarrow x=0$ ou $x=\pm\sqrt2$.`,
        R`**a)** Em $[-1,2]$ os críticos internos são $0$ e $\sqrt2$ ($-\sqrt2\approx-1{,}4$ está fora). Candidatos: $-1,\ 0,\ \sqrt2,\ 2$.
$f(-1)=1-3=-2$; $f(0)=0$; $f(\sqrt2)=(\sqrt2)^6-3(\sqrt2)^4=8-12=-4$; $f(2)=64-48=16$.
Máximo global $(2,16)$; mínimo global $(\sqrt2,-4)$.`,
        R`**i) Interceptos:** $x^4(x^2-3)=0\Rightarrow x=0$ ou $x=\pm\sqrt3\approx\pm1{,}7$.`,
        R`**ii) Sinal de $f'=6x^3(x^2-2)$:** $6x^3$ é $-$ para $x<0$ e $+$ para $x>0$; $x^2-2$ é $+$ fora de $[-\sqrt2,\sqrt2]$ e $-$ dentro.
Produto: $(-\infty,-\sqrt2):\ -$ · $(-\sqrt2,0):\ +$ · $(0,\sqrt2):\ -$ · $(\sqrt2,\infty):\ +$.
Decrescente em $(-\infty,-\sqrt2)\cup(0,\sqrt2)$; crescente em $(-\sqrt2,0)\cup(\sqrt2,\infty)$.`,
        R`**iii)** Em $x=0$: $+\to-$, **máximo local**. Em $x=\pm\sqrt2$: $-\to+$, **mínimos locais**, com $f(\pm\sqrt2)=-4$.`,
        R`**iv) $f''(x)=30x^4-36x^2=6x^2(5x^2-6)$.** $6x^2\ge0$ não troca de sinal; $5x^2-6=0\Rightarrow x=\pm\sqrt{1{,}2}\approx\pm1{,}1$.
Côncava p/ cima em $(-\infty,-\sqrt{1{,}2})\cup(\sqrt{1{,}2},\infty)$ e p/ baixo em $(-\sqrt{1{,}2},0)\cup(0,\sqrt{1{,}2})$. Inflexões só em $x=\pm\sqrt{1{,}2}$ ($x=0$ não é inflexão).`,
        R`**v) Tabela:** $x=0\to f=0$; $x=\pm1{,}1\to f=1{,}2^3-3\cdot1{,}2^2\approx-2{,}6$; $x=\pm1{,}4\to f=-4$; $x=\pm1{,}7\to f=0$; $x\to\pm\infty\to f\to+\infty$.
**vi) Gráfico:** formato de "W" simétrico (a função é par), com máximo local achatado em $0$ e vales em $\pm1{,}4$.`,
      ],
      ans: R`a) Máx. global $(2,16)$; mín. global $(\sqrt2,-4)$. b) Críticos $0,\pm\sqrt2$; máx. local em $0$; mín. locais em $\pm\sqrt2$; inflexões em $\pm\sqrt{1{,}2}$.`,
    },
  ],

  practice: [
    {
      id: 'p01', lvl: 'F', tag: 'Números críticos',
      q: R`Encontre os números críticos de $f(x)=x^3-12x$.`,
      a: { t: 'set', v: ['-2', '2'] },
      sol: [R`$f'(x)=3x^2-12=3(x^2-4)$.`, R`$3(x^2-4)=0\Rightarrow x^2=4\Rightarrow x=\pm2$.`],
      ans: R`$x=-2$ e $x=2$`,
    },
    {
      id: 'p02', lvl: 'F', tag: 'Teste da 1ª derivada',
      q: R`Qual é a coordenada $x$ do **máximo local** de $f(x)=2x^3-3x^2$?`,
      a: { t: 'num', v: '0' },
      sol: [R`$f'(x)=6x^2-6x=6x(x-1)$: críticos $0$ e $1$.`, R`Sinal: $+$ em $(-\infty,0)$, $-$ em $(0,1)$, $+$ em $(1,\infty)$.`, R`Em $x=0$: $+\to-$, máximo local. (Em $x=1$ há mínimo local.)`],
      ans: R`$x=0$`,
    },
    {
      id: 'p03', lvl: 'I', tag: 'Método do Intervalo Fechado',
      q: R`Use o Método do Intervalo Fechado para $f(x)=x^3-3x^2+1$ em $[-1,4]$. Informe o **valor** máximo global e o **valor** mínimo global.`,
      a: { t: 'multi', fields: [{ label: 'Valor máximo global', v: '17' }, { label: 'Valor mínimo global', v: '-3' }] },
      sol: [R`$f'(x)=3x^2-6x=3x(x-2)$: críticos $0$ e $2$, ambos em $[-1,4]$.`, R`$f(-1)=-1-3+1=-3$; $f(0)=1$; $f(2)=8-12+1=-3$; $f(4)=64-48+1=17$.`, R`Máximo global $17$ (em $x=4$); mínimo global $-3$ (em $x=-1$ **e** em $x=2$).`],
      ans: R`Máximo global $17$; mínimo global $-3$`,
    },
    {
      id: 'p04', lvl: 'I', tag: 'Pontos de inflexão',
      q: R`Encontre a coordenada $x$ de todos os pontos de inflexão de $f(x)=x^4-6x^2$.`,
      a: { t: 'set', v: ['-1', '1'] },
      sol: [R`$f'(x)=4x^3-12x$; $f''(x)=12x^2-12=12(x^2-1)$.`, R`$f''=0\Rightarrow x=\pm1$. Sinal: $+$ fora de $[-1,1]$ e $-$ dentro, então **troca** nos dois pontos.`],
      ans: R`$x=-1$ e $x=1$`,
    },
    {
      id: 'p05', lvl: 'I', tag: 'Derivada com produto e exponencial',
      q: R`Qual é o **valor** máximo local de $f(x)=x\,e^{-x}$?`,
      a: { t: 'num', v: '1/e' },
      sol: [R`Produto: $f'(x)=e^{-x}+x\cdot(-e^{-x})=e^{-x}(1-x)$.`, R`$e^{-x}>0$ sempre, então o sinal de $f'$ é o de $(1-x)$: $+$ para $x<1$ e $-$ para $x>1$. Máximo local em $x=1$.`, R`$f(1)=1\cdot e^{-1}=\frac1e\approx0{,}37$.`],
      ans: R`$\frac1e$`,
    },
    {
      id: 'p06', lvl: 'I', tag: 'Intervalo fechado com função racional',
      q: R`Ache os valores máximo e mínimo globais de $f(x)=x+\frac4x$ em $[1,4]$.`,
      a: { t: 'multi', fields: [{ label: 'Valor máximo global', v: '5' }, { label: 'Valor mínimo global', v: '4' }] },
      sol: [R`$f'(x)=1-\frac{4}{x^2}=0\Rightarrow x^2=4\Rightarrow x=\pm2$. Só $x=2\in[1,4]$.`, R`$f(1)=1+4=5$; $f(2)=2+2=4$; $f(4)=4+1=5$.`],
      ans: R`Máximo global $5$ (em $x=1$ e $x=4$); mínimo global $4$ (em $x=2$)`,
    },
    {
      id: 'p07', lvl: 'IA', tag: 'Crítico que não é extremo',
      q: R`Seja $f(x)=3x^5-5x^3$. Qual é a coordenada $x$ do **mínimo local**?`,
      a: { t: 'num', v: '1' },
      hint: R`$f'=15x^2(x^2-1)$. O fator $15x^2$ não troca de sinal.`,
      sol: [R`$f'(x)=15x^4-15x^2=15x^2(x^2-1)$: críticos $0,\pm1$.`, R`O sinal de $f'$ é o de $x^2-1$: $+$ em $(-\infty,-1)$, $-$ em $(-1,1)$ (inclusive perto de $0$), $+$ em $(1,\infty)$.`, R`$x=-1$: $+\to-$, máximo local. $x=1$: $-\to+$, **mínimo local**. $x=0$: não é extremo.`],
      ans: R`$x=1$`,
    },
    {
      id: 'p08', lvl: 'IA', tag: "Inflexão exige troca de sinal de f''",
      q: R`Encontre a coordenada $x$ de **todos** os pontos de inflexão de $f(x)=x^6-15x^4$.`,
      a: { t: 'set', v: ['-sqrt(6)', 'sqrt(6)'] },
      hint: R`$f''=30x^2(x^2-6)$. Em $x=0$ há troca de sinal?`,
      sol: [R`$f'=6x^5-60x^3$; $f''=30x^4-180x^2=30x^2(x^2-6)$.`, R`Zeros: $0$ e $\pm\sqrt6$. O fator $30x^2\ge0$ não troca de sinal em $0$, então $x=0$ **não** é inflexão.`, R`$x^2-6$ troca de sinal em $\pm\sqrt6$: inflexões em $x=\pm\sqrt6\approx\pm2{,}4$.`],
      ans: R`$x=-\sqrt6$ e $x=\sqrt6$`,
    },
    {
      id: 'p09', lvl: 'IA', tag: 'Intervalo fechado com logaritmo',
      q: R`Ache os valores máximo e mínimo globais de $f(x)=\ln(x^2+1)$ em $[-1,2]$.`,
      a: { t: 'multi', fields: [{ label: 'Valor máximo global', v: 'ln(5)' }, { label: 'Valor mínimo global', v: '0' }] },
      sol: [R`$f'(x)=\frac{2x}{x^2+1}=0\Rightarrow x=0\in[-1,2]$.`, R`$f(-1)=\ln2$; $f(0)=\ln1=0$; $f(2)=\ln5$.`, R`Como $\ln$ é crescente: $\ln5$ é o maior valor e $0$ é o menor.`],
      ans: R`Máximo global $\ln5$ (em $x=2$); mínimo global $0$ (em $x=0$)`,
    },
    {
      id: 'p10', lvl: 'A', tag: 'Estilo prova: roteiro completo de esboço',
      q: R`(Estilo prova) Seja $f(x)=3x^4-x^6$. Use $\sqrt2\approx1{,}4$, $\sqrt3\approx1{,}7$, $\sqrt{1{,}2}\approx1{,}1$.
a) Método do Intervalo Fechado em $[-1,2]$.
b) Interceptos; crescimento/decrescimento; coordenada $x$ dos extremos locais; concavidade e inflexões; tabela de pontos; esboço.
Resolva no rascunho e depois compare.`,
      a: { t: 'open' },
      rubric: [
        R`Calculei $f'(x)=12x^3-6x^5=6x^3(2-x^2)$ e achei os críticos $0,\pm\sqrt2$.`,
        R`a) Usei os candidatos $-1,0,\sqrt2,2$ (descartei $-\sqrt2$) e concluí máx. global $(\sqrt2,4)$ e mín. global $(2,-16)$.`,
        R`Interceptos $x=0,\pm\sqrt3$.`,
        R`Tabela de sinais de $f'$: cresce em $(-\infty,-\sqrt2)\cup(0,\sqrt2)$, decresce em $(-\sqrt2,0)\cup(\sqrt2,\infty)$.`,
        R`Máximos locais em $x=\pm\sqrt2$ e mínimo local em $x=0$.`,
        R`$f''=6x^2(6-5x^2)$; inflexões só em $\pm\sqrt{1{,}2}$ (não em $0$); concavidades corretas.`,
        R`Tabela de pontos e esboço em forma de "M" simétrico.`,
      ],
      sol: [
        R`$f'(x)=12x^3-6x^5=6x^3(2-x^2)=0\Rightarrow x=0$ ou $x=\pm\sqrt2$.`,
        R`**a)** Candidatos em $[-1,2]$: $-1,\,0,\,\sqrt2,\,2$. $f(-1)=3-1=2$; $f(0)=0$; $f(\sqrt2)=3\cdot4-8=4$; $f(2)=48-64=-16$. Máximo global $(\sqrt2,4)$; mínimo global $(2,-16)$.`,
        R`**Interceptos:** $x^4(3-x^2)=0\Rightarrow x=0,\ \pm\sqrt3\approx\pm1{,}7$.`,
        R`**Sinal de $f'$:** $6x^3$: $-$ / $+$ (troca em 0); $2-x^2$: $-$ fora e $+$ dentro de $[-\sqrt2,\sqrt2]$.
$(-\infty,-\sqrt2):\ (-)(-)=+$ · $(-\sqrt2,0):\ (-)(+)=-$ · $(0,\sqrt2):\ +$ · $(\sqrt2,\infty):\ -$.
Crescente em $(-\infty,-\sqrt2)\cup(0,\sqrt2)$; decrescente em $(-\sqrt2,0)\cup(\sqrt2,\infty)$.`,
        R`**Extremos locais:** máximos em $x=\pm\sqrt2$ ($f=4$); mínimo em $x=0$ ($f=0$).`,
        R`**Concavidade:** $f''=36x^2-30x^4=6x^2(6-5x^2)$. Positiva em $(-\sqrt{1{,}2},0)\cup(0,\sqrt{1{,}2})$ (∪) e negativa fora (∩). Inflexões em $x=\pm\sqrt{1{,}2}\approx\pm1{,}1$, com $f\approx3(1{,}44)-1{,}728\approx2{,}6$.`,
        R`**Tabela:** $(0,0)$, $(\pm1{,}1;\,2{,}6)$, $(\pm1{,}4;\,4)$, $(\pm1{,}7;\,0)$, $x\to\pm\infty\Rightarrow f\to-\infty$. Gráfico em forma de "M" simétrico (função par).`,
      ],
      ans: R`Máx. global $(\sqrt2,4)$, mín. global $(2,-16)$ em $[-1,2]$; máx. locais em $\pm\sqrt2$, mín. local em $0$; inflexões em $\pm\sqrt{1{,}2}$.`,
    },
  ],

  summary: {
    formulas: [
      R`Crítico: $f'(c)=0$ ou $f'(c)$ não existe`,
      R`$f'>0$ cresce · $f'<0$ decresce`,
      R`$f''>0$ ∪ · $f''<0$ ∩ · inflexão = troca de sinal de $f''$`,
      R`Teste da 2ª derivada: $f'(c)=0$, $f''(c)<0$ ⇒ máx; $f''(c)>0$ ⇒ mín`,
    ],
    when: [
      R`Locais / crescimento → sinal de $f'$`,
      R`Concavidade / inflexão → sinal de $f''$`,
      R`Globais em $[a,b]$ → Método do Intervalo Fechado`,
    ],
    steps: [
      R`Derive e **fatore** (menor potência em evidência).`,
      R`Raízes de cada fator → tabela de sinais.`,
      R`Conclua crescimento e extremos (troca $+\to-$ máx; $-\to+$ mín).`,
      R`Repita com $f''$ para concavidade e inflexões.`,
      R`Intervalo fechado: $f$ nos críticos internos e nas extremidades; compare.`,
    ],
    errors: [
      R`Inflexão onde $f''=0$ sem troca de sinal`,
      R`Esquecer as extremidades no intervalo fechado`,
      R`Usar críticos fora do intervalo`,
      R`Confundir coordenada $x$ com o valor $f(x)$`,
    ],
    memo: [
      R`Potência par ($x^2$, $x^4$) não troca de sinal; potência ímpar troca`,
      R`$x^2-a$: negativo entre $\pm\sqrt a$, positivo fora`,
      R`Função par ($x^6$, $x^4$ …): gráfico simétrico em relação ao eixo $y$`,
    ],
  },

  cards: [
    [R`O que é um número crítico?`, R`Um $c$ do domínio com $f'(c)=0$ ou $f'(c)$ inexistente.`],
    [R`Teste da 1ª derivada: como identificar máximo local?`, R`$f'$ muda de **positivo para negativo** no crítico.`],
    [R`O que caracteriza um ponto de inflexão?`, R`$f''$ **muda de sinal** (troca de concavidade). Só $f''=0$ não basta.`],
    [R`$f''>0$ significa…`, R`Concavidade para cima (∪).`],
    [R`Método do Intervalo Fechado: quem são os candidatos?`, R`Os números críticos **dentro** de $[a,b]$ e as extremidades $a$ e $b$.`],
    [R`Diferença entre extremo local e global?`, R`Local: maior/menor perto do ponto. Global: maior/menor em todo o domínio considerado.`],
    [R`Teste da 2ª derivada?`, R`Se $f'(c)=0$: $f''(c)<0$ ⇒ máx. local; $f''(c)>0$ ⇒ mín. local; $f''(c)=0$ ⇒ inconclusivo.`],
    [R`Em $f''(x)=6x^2(x^2-6)$, $x=0$ é inflexão?`, R`Não: $6x^2\ge0$ não troca de sinal. Inflexões só em $x=\pm\sqrt6$.`],
  ],
});
