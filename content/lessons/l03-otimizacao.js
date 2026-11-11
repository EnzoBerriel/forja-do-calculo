'use strict';
CALC.addLesson({
  id: 'otimizacao', n: 3, title: 'Problemas de otimização', min: 60, prereq: ['extremos'], patterns: ['P5'],
  prereqNote: R`aqui usamos números críticos e a justificativa de máximo/mínimo **global**.`,

  theory: {
    review: R`Fórmulas geométricas que caem:
- **Cilindro** de raio $R$ e altura $h$: $V=\pi R^2h$, área lateral $2\pi Rh$, base = tampa $=\pi R^2$.
- **Caixa de base quadrada** (lado $x$, altura $h$): $V=x^2h$, base = tampa $=x^2$, 4 laterais $=4xh$.
- **Retângulo** $x\times y$: área $xy$, perímetro $2x+2y$.
- **Custo** = (preço por unidade de área) × (área), somado parte por parte.`,
    what: R`É usar derivadas para achar o **melhor valor** de uma grandeza (maior volume, menor custo, maior área) quando existe uma **restrição** (orçamento fixo, volume fixo, perímetro fixo).`,
    why: R`É a aplicação mais "real" das derivadas: projetar embalagens mais baratas, caixas d'água com maior volume, cercas com maior área. Nas provas, a Questão 2 é sempre assim: uma caixa d'água cilíndrica com orçamento fixo, ou uma caixa de base quadrada com volume fixo e custo mínimo.`,
    logic: R`Há sempre **duas** equações:
- **Função objetivo**: o que se quer otimizar (ex.: $V=\pi R^2h$).
- **Restrição**: o que está fixo (ex.: o custo $=216\pi$).

A restrição serve para **eliminar uma variável**: isolamos $h$ em função de $R$ e substituímos na função objetivo. Ela vira uma função de **uma** variável, $V(R)$, e aí basta achar o número crítico.

Por fim, é preciso **justificar** que o crítico é o máximo/mínimo **global**. Se ele é o único crítico do domínio e a função vale 0 (ou vai para ∞) nas pontas, então ele é o global.`,
    formulas: [
      [R`\text{Objetivo }F(x,y)\ +\ \text{restrição }g(x,y)=k\ \Rightarrow\ y=y(x)\ \Rightarrow\ F(x)`, R`Reduza a uma variável antes de derivar.`],
      [R`F'(x)=0\ \Rightarrow\ \text{número crítico}`, R`Resolva e descarte valores fora do domínio (comprimentos positivos!).`],
      [R`\text{Único crítico em }(a,b)\ \text{e}\ F\ \text{nas pontas menor (ou }\to\infty)\Rightarrow \text{extremo global}`, R`Justificativa usada no gabarito: "$V(0)=V(\sqrt{108})=0$, logo $V(6)$ é o máximo global".`],
      [R`C=\sum(\text{preço}_i\times\text{área}_i)`, R`Ex.: lateral e base a $0{,}5$ e tampa a $1{,}5$: $C=0{,}5\cdot2\pi Rh+0{,}5\pi R^2+1{,}5\pi R^2=\pi Rh+2\pi R^2$.`],
    ],
    when: R`Sempre que o enunciado disser "maior possível", "menor custo", "dimensões ideais", "máximo", "mínimo", com alguma quantidade **fixa** (orçamento, volume, perímetro, área de material).`,
    pitfalls: [
      [R`Derivar a função com duas variáveis ($V=\pi R^2h$) sem usar a restrição.`, R`Primeiro isole uma variável pela restrição e substitua.`],
      [R`Esquecer o domínio (ex.: aceitar $R=-6$ ou não ver que $h>0$ exige $R<\sqrt{108}$).`, R`Escreva o domínio: comprimentos positivos e restrições de sinal ($h>0$).`],
      [R`Parar no número crítico sem justificar que é máximo/mínimo **global**.`, R`Use "único crítico + valores/limites nas pontas" ou o teste da 2ª derivada.`],
      [R`Responder só o $x$ quando pedem "as dimensões e o volume".`, R`Responda **tudo**: todas as dimensões e o valor ótimo, com unidades.`],
      [R`Somar as áreas sem os preços diferentes (tampa e base podem custar diferente!).`, R`Multiplique cada área pelo seu preço antes de somar.`],
    ],
  },

  identify: {
    triggers: [
      R`"Maior volume possível", "custo mínimo", "dimensões ideais", "área máxima".`,
      R`Um valor **fixo**: "dispõe de R\$ 216π", "volume de 1024 cm³", "200 m de cerca".`,
      R`Figuras com fórmulas dadas no enunciado ($A_{lateral}=2\pi Rh$, $V=\pi R^2h$).`,
    ],
    first: R`**Dê nome às variáveis e escreva duas equações**: a **objetivo** (o que otimizar) e a **restrição** (o que é fixo). Depois isole uma variável na restrição.`,
    examples: [
      { q: R`"Com R\$ 216π, construir caixa d'água cilíndrica de volume máximo; lateral e base a 0,5 R\$/dm², tampa a 1,5 R\$/dm²."`, look: R`Objetivo: volume (máximo). Fixo: custo.`, method: R`Restrição: $\pi Rh+2\pi R^2=216\pi\Rightarrow h=\frac{216-2R^2}{R}$; objetivo $V(R)=\pi R^2h$.`, why: R`O custo amarra $h$ a $R$, deixando $V$ com uma só variável.` },
      { q: R`"Caixa de base quadrada com volume 1024 cm³; tampa e base a R\$ 6/cm², laterais a R\$ 3/cm². Custo mínimo?"`, look: R`Objetivo: custo (mínimo). Fixo: volume.`, method: R`Restrição: $x^2h=1024\Rightarrow h=\frac{1024}{x^2}$; objetivo $C=6\cdot2x^2+3\cdot4xh$.`, why: R`Agora o papel se inverte: o volume é fixo e o custo é otimizado.` },
    ],
    writing: R`Estrutura do gabarito:
- "Sejam $R$ o raio e $h$ a altura."
- "O custo é $C=0{,}5A_{lat}+0{,}5A_{base}+1{,}5A_{tampa}=\pi Rh+2\pi R^2=216\pi$, logo $h=\frac{216-2R^2}{R}$, com $0<R<\sqrt{108}$."
- "$V(R)=216\pi R-2\pi R^3$; $V'(R)=0\Rightarrow R=6$."
- "Como $R=6$ é o único número crítico do domínio e $V(0)=V(\sqrt{108})=0$, $V(6)=864\pi$ é o máximo global."
- Responda dimensões e valor, com unidades.`,
  },

  solved: [
    {
      lvl: 1, q: R`Dois números positivos têm soma 20. Quais maximizam o produto?`,
      method: R`Objetivo: produto $P=xy$. Restrição: $x+y=20$.`,
      steps: [
        R`Isolar: $y=20-x$, com $0<x<20$.`,
        R`$P(x)=x(20-x)=20x-x^2$; $P'(x)=20-2x=0\Rightarrow x=10$.`,
        R`$P''(x)=-2<0$, então é máximo (e é o único crítico, logo global). $y=10$ e $P=100$.`,
      ],
      ans: R`$x=y=10$, produto máximo $100$.`,
    },
    {
      lvl: 2, q: R`Um fazendeiro tem 200 m de cerca para um terreno retangular junto a um rio (o lado do rio não precisa de cerca). Qual é a área máxima?`,
      method: R`Objetivo: área $A=xy$. Restrição: cerca $2x+y=200$ ($x$ = lados perpendiculares ao rio).`,
      steps: [
        R`$y=200-2x$, com $0<x<100$.`,
        R`$A(x)=x(200-2x)=200x-2x^2$; $A'(x)=200-4x=0\Rightarrow x=50$.`,
        R`Único crítico e $A(0)=A(100)=0$, logo é máximo global: $y=100$ e $A=50\cdot100=5000$ m².`,
      ],
      ans: R`Terreno $50\text{ m}\times100\text{ m}$, área máxima $5000\text{ m}^2$.`,
    },
    {
      lvl: 3, q: R`De uma folha quadrada de 12 cm de lado, cortam-se quadrados de lado $x$ nos cantos e dobram-se as abas, formando uma caixa aberta. Qual $x$ dá volume máximo?`,
      method: R`Objetivo: volume. A "restrição" já está na geometria: a base fica $(12-2x)\times(12-2x)$.`,
      steps: [
        R`$V(x)=x(12-2x)^2$, com $0<x<6$.`,
        R`Produto + cadeia: $V'(x)=(12-2x)^2+x\cdot2(12-2x)(-2)=(12-2x)\left[(12-2x)-4x\right]=(12-2x)(12-6x)$.`,
        R`$V'=0\Rightarrow x=6$ (fora do domínio aberto) ou $x=2$.`,
        R`$V(0)=V(6)=0$ e $x=2$ é o único crítico interno, logo é máximo global: $V(2)=2\cdot8^2=128$ cm³.`,
      ],
      ans: R`$x=2$ cm; volume máximo $128\text{ cm}^3$.`,
    },
    {
      lvl: 4, q: R`Uma lata cilíndrica fechada deve ter volume $16\pi$ cm³. Ache as dimensões que minimizam a área total de material.`,
      method: R`Objetivo: área $A=2\pi R^2+2\pi Rh$. Restrição: $\pi R^2h=16\pi$.`,
      steps: [
        R`$h=\frac{16}{R^2}$, com $R>0$.`,
        R`$A(R)=2\pi R^2+2\pi R\cdot\frac{16}{R^2}=2\pi R^2+\frac{32\pi}{R}$.`,
        R`$A'(R)=4\pi R-\frac{32\pi}{R^2}=0\Rightarrow 4\pi R^3=32\pi\Rightarrow R^3=8\Rightarrow R=2$.`,
        R`$A\to\infty$ quando $R\to0^+$ e quando $R\to\infty$; com um único crítico, $R=2$ é mínimo global. $h=\frac{16}{4}=4$ e $A=8\pi+16\pi=24\pi$.`,
      ],
      ans: R`$R=2$ cm, $h=4$ cm, área mínima $24\pi\text{ cm}^2$.`,
    },
    {
      lvl: 5, q: R`(Estilo prova — Questão 2) Uma fábrica quer caixas de base quadrada com volume $2000\text{ cm}^3$. A base e a tampa custam R\$ 2/cm² e as laterais, R\$ 1/cm². Quais dimensões minimizam o custo? Qual é o custo mínimo?`,
      method: R`Objetivo: custo (mínimo). Restrição: volume fixo $x^2h=2000$.`,
      steps: [
        R`Sejam $x$ o lado da base e $h$ a altura. $x^2h=2000\Rightarrow h=\frac{2000}{x^2}$, $x>0$.`,
        R`Custo: base + tampa $=2\cdot(2x^2)=4x^2$; 4 laterais $=1\cdot4xh=4x\cdot\frac{2000}{x^2}=\frac{8000}{x}$. Logo $C(x)=4x^2+\frac{8000}{x}=4x^2+8000x^{-1}$.`,
        R`$C'(x)=8x-8000x^{-2}=0\Rightarrow 8x=\frac{8000}{x^2}\Rightarrow x^3=1000\Rightarrow x=10$ cm.`,
        R`Justificativa: $\lim_{x\to0^+}C=+\infty$, $\lim_{x\to\infty}C=+\infty$, e $x=10$ é o único crítico. Logo é mínimo global.`,
        R`$h=\frac{2000}{100}=20$ cm; $C(10)=400+800=1200$ reais.`,
      ],
      ans: R`Base $10\text{ cm}\times10\text{ cm}$, altura $20$ cm; custo mínimo R\$ 1200.`,
    },
  ],

  practice: [
    {
      id: 'p01', lvl: 'F', tag: 'Montar a função de uma variável',
      q: R`Dois números positivos têm produto 36. Qual é a **menor soma** possível?`,
      a: { t: 'num', v: '12' },
      sol: [R`$y=\frac{36}{x}$; $S(x)=x+\frac{36}{x}$, $x>0$.`, R`$S'(x)=1-\frac{36}{x^2}=0\Rightarrow x=6$ (positivo).`, R`$S\to\infty$ nas pontas, então é mínimo: $S(6)=6+6=12$.`],
      ans: R`$12$ (com $x=y=6$)`,
    },
    {
      id: 'p02', lvl: 'F', tag: 'Restrição de perímetro',
      q: R`Entre os retângulos de perímetro 24 cm, qual é a **área máxima**?`,
      a: { t: 'num', v: '36' },
      sol: [R`$2x+2y=24\Rightarrow y=12-x$, $0<x<12$.`, R`$A=x(12-x)$; $A'=12-2x=0\Rightarrow x=6$.`, R`$A(0)=A(12)=0$, então é máximo: quadrado $6\times6$, $A=36$.`],
      ans: R`$36\text{ cm}^2$ (quadrado de lado 6)`,
    },
    {
      id: 'p03', lvl: 'I', tag: 'Restrição com cercas internas',
      q: R`Com 600 m de cerca, deseja-se cercar um terreno retangular e dividi-lo em duas partes iguais com uma cerca paralela a um dos lados. Qual é a área total máxima (m²)?`,
      a: { t: 'num', v: '15000' },
      hint: R`São 3 cercas de comprimento $x$ (dois lados + divisória) e 2 de comprimento $y$.`,
      sol: [R`$3x+2y=600\Rightarrow y=\frac{600-3x}{2}$, $0<x<200$.`, R`$A(x)=x\cdot\frac{600-3x}{2}=300x-\frac32x^2$; $A'=300-3x=0\Rightarrow x=100$.`, R`$y=\frac{600-300}{2}=150$; $A=100\cdot150=15000$. Único crítico e $A=0$ nas pontas: máximo global.`],
      ans: R`$15000\text{ m}^2$ ($x=100$ m, $y=150$ m)`,
    },
    {
      id: 'p04', lvl: 'I', tag: 'Caixa aberta (corte nos cantos)',
      q: R`De uma folha retangular $8\times5$ cm, cortam-se quadrados de lado $x$ nos cantos para formar uma caixa aberta. Qual é o volume máximo (cm³)?`,
      a: { t: 'num', v: '18' },
      sol: [R`$V(x)=x(8-2x)(5-2x)=4x^3-26x^2+40x$, $0<x<2{,}5$.`, R`$V'(x)=12x^2-52x+40=4(3x^2-13x+10)=4(3x-10)(x-1)$.`, R`Críticos: $x=1$ ou $x=\frac{10}3\approx3{,}3$ (fora do domínio). $V(1)=1\cdot6\cdot3=18$; $V=0$ nas pontas.`],
      ans: R`$18\text{ cm}^3$ (com $x=1$ cm)`,
    },
    {
      id: 'p05', lvl: 'I', tag: 'Minimizar distância (use d²)',
      q: R`Qual é a **menor distância** entre o ponto $(0,2)$ e a parábola $y=x^2$?`,
      a: { t: 'num', v: 'sqrt(7)/2' },
      hint: R`Minimize $D=d^2=x^2+(x^2-2)^2$: o mínimo de $d$ e de $d^2$ ocorre no mesmo ponto.`,
      sol: [R`Ponto da parábola: $(x,x^2)$. $D=d^2=x^2+(x^2-2)^2=x^4-3x^2+4$.`, R`$D'=4x^3-6x=2x(2x^2-3)=0\Rightarrow x=0$ ou $x=\pm\sqrt{3/2}$.`, R`$D(0)=4$; $D(\pm\sqrt{3/2})=\frac94-\frac92+4=\frac74$. O menor é $\frac74$, então $d=\sqrt{7/4}=\frac{\sqrt7}{2}\approx1{,}32$.`],
      ans: R`$\frac{\sqrt7}{2}$`,
    },
    {
      id: 'p06', lvl: 'I', tag: 'Cilindro: área mínima',
      q: R`Uma lata cilíndrica **sem tampa** deve ter volume $27\pi$ cm³. Qual raio $R$ minimiza o material?`,
      a: { t: 'num', v: '3' },
      sol: [R`$\pi R^2h=27\pi\Rightarrow h=\frac{27}{R^2}$.`, R`Área (base + lateral): $A=\pi R^2+2\pi Rh=\pi R^2+\frac{54\pi}{R}$.`, R`$A'=2\pi R-\frac{54\pi}{R^2}=0\Rightarrow R^3=27\Rightarrow R=3$ (e $h=3$). $A\to\infty$ nas pontas: mínimo global.`],
      ans: R`$R=3$ cm`,
    },
    {
      id: 'p07', lvl: 'IA', tag: 'Otimização com orçamento (custo por área)',
      q: R`Uma caixa d'água cilíndrica será feita com R\$ $96\pi$. Lateral e base custam 0,5 R\$/dm² e a tampa, 1,5 R\$/dm². Qual é o **volume máximo** (dm³)?`,
      a: { t: 'num', v: '256pi' },
      hint: R`$C=0{,}5(2\pi Rh)+0{,}5\pi R^2+1{,}5\pi R^2=\pi Rh+2\pi R^2$.`,
      sol: [R`$\pi Rh+2\pi R^2=96\pi\Rightarrow h=\frac{96-2R^2}{R}$, com $0<R<\sqrt{48}$ (para $h>0$).`, R`$V=\pi R^2h=\pi R(96-2R^2)=96\pi R-2\pi R^3$.`, R`$V'=96\pi-6\pi R^2=0\Rightarrow R^2=16\Rightarrow R=4$; $h=\frac{96-32}{4}=16$.`, R`$V(0)=V(\sqrt{48})=0$, único crítico: máximo global $V=\pi\cdot16\cdot16=256\pi$.`],
      ans: R`$256\pi\text{ dm}^3$ ($R=4$ dm, $h=16$ dm)`,
    },
    {
      id: 'p08', lvl: 'IA', tag: 'Caixa sem tampa (área mínima)',
      q: R`Uma caixa de base quadrada **sem tampa** deve ter volume 32 m³. Qual é a área mínima de material (m²)?`,
      a: { t: 'num', v: '48' },
      sol: [R`$x^2h=32\Rightarrow h=\frac{32}{x^2}$.`, R`$A=x^2+4xh=x^2+\frac{128}{x}$; $A'=2x-\frac{128}{x^2}=0\Rightarrow x^3=64\Rightarrow x=4$.`, R`$h=2$; $A=16+32=48$. $A\to\infty$ nas pontas: mínimo global.`],
      ans: R`$48\text{ m}^2$ (base $4\times4$, altura 2)`,
    },
    {
      id: 'p09', lvl: 'IA', tag: 'Retângulo inscrito',
      q: R`Um retângulo tem base no eixo $x$ e os dois vértices superiores sobre a parábola $y=12-x^2$. Qual é a área máxima?`,
      a: { t: 'num', v: '32' },
      sol: [R`Por simetria, vértices em $(\pm x,\,12-x^2)$: base $2x$, altura $12-x^2$, com $0<x<\sqrt{12}$.`, R`$A=2x(12-x^2)=24x-2x^3$; $A'=24-6x^2=0\Rightarrow x=2$.`, R`$A(2)=4\cdot8=32$; $A=0$ nas pontas: máximo global.`],
      ans: R`$32$`,
    },
    {
      id: 'p10', lvl: 'A', tag: 'Estilo prova: caixa de base quadrada com custo mínimo',
      q: R`(Estilo prova) Uma fábrica fará caixas de base quadrada com volume $864\text{ cm}^3$. Base e tampa custam R\$ 4/cm²; as laterais, R\$ 1/cm². Encontre as dimensões de custo mínimo e o custo mínimo. Justifique que é mínimo global.`,
      a: { t: 'multi', fields: [{ label: 'Lado da base (cm)', v: '6' }, { label: 'Altura (cm)', v: '24' }, { label: 'Custo mínimo (R\$)', v: '864' }] },
      sol: [
        R`$x^2h=864\Rightarrow h=\frac{864}{x^2}$, $x>0$.`,
        R`$C=4\cdot2x^2+1\cdot4xh=8x^2+\frac{3456}{x}$.`,
        R`$C'(x)=16x-\frac{3456}{x^2}=0\Rightarrow x^3=216\Rightarrow x=6$.`,
        R`$\lim_{x\to0^+}C=\lim_{x\to\infty}C=+\infty$ e só há um crítico: mínimo global.`,
        R`$h=\frac{864}{36}=24$; $C(6)=8\cdot36+\frac{3456}{6}=288+576=864$.`,
      ],
      ans: R`Base $6\times6$ cm, altura $24$ cm, custo mínimo R\$ 864.`,
    },
  ],

  summary: {
    formulas: [
      R`Cilindro: $V=\pi R^2h$, $A_{lat}=2\pi Rh$, $A_{base}=\pi R^2$`,
      R`Caixa base quadrada: $V=x^2h$, laterais $4xh$, base/tampa $x^2$`,
      R`Custo $=\sum$ preço × área`,
    ],
    when: [R`"Maior/menor possível", "dimensões ideais", com algo **fixo**`],
    steps: [
      R`Nomeie as variáveis (desenhe!).`,
      R`Escreva a função **objetivo** e a **restrição**.`,
      R`Isole uma variável na restrição e substitua: função de 1 variável.`,
      R`Escreva o **domínio**.`,
      R`Derive, iguale a zero e resolva (descarte o que sair do domínio).`,
      R`Justifique o **global** (único crítico + pontas, ou 2ª derivada) e responda tudo com unidades.`,
    ],
    errors: [R`Derivar com 2 variáveis`, R`Esquecer o domínio`, R`Não justificar que é global`, R`Esquecer preços diferentes para cada parte`],
    memo: [
      R`Custo da caixa d'água (0,5 / 0,5 / 1,5): $C=\pi Rh+2\pi R^2$`,
      R`Caixa com custo $a$ (base/tampa) e $b$ (laterais), volume $V$: $C=2ax^2+\frac{4bV}{x}$ ⇒ $x^3=\frac{bV}{a}$`,
    ],
  },

  cards: [
    [R`Quais são as duas equações de todo problema de otimização?`, R`A função **objetivo** (o que otimizar) e a **restrição** (o que é fixo).`],
    [R`Para que serve a restrição?`, R`Para eliminar uma variável e deixar a função objetivo com **uma** variável.`],
    [R`Como justificar que o único crítico é máximo global?`, R`Único crítico no domínio + a função vale menos nas pontas (ex.: $V=0$) ou o teste da 2ª derivada ($F''<0$).`],
    [R`Volume e área lateral do cilindro?`, R`$V=\pi R^2h$; $A_{lat}=2\pi Rh$.`],
    [R`Custo de cilindro: lateral e base a 0,5 e tampa a 1,5 (por dm²)?`, R`$C=0{,}5\cdot2\pi Rh+0{,}5\pi R^2+1{,}5\pi R^2=\pi Rh+2\pi R^2$.`],
    [R`Caixa base quadrada, volume fixo $V$: altura em função do lado $x$?`, R`$h=\frac{V}{x^2}$.`],
    [R`Por que minimizar $d^2$ em vez de $d$?`, R`O mínimo ocorre no mesmo ponto e evita derivar raiz quadrada.`],
  ],
});
