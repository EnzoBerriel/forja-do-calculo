'use strict';
CALC.addLesson({
  id: 'fracoes', n: 12, title: 'Frações parciais (fatores lineares simples e repetidos)', min: 65, prereq: ['elementares', 'substituicao'], patterns: ['P11'],
  prereqNote: R`no fim, cada fração vira $\ln|ax+b|$ ou uma potência de $(ax+b)$.`,

  theory: {
    review: R`Integrais que fecham toda fração parcial:
- $\int\frac{A}{ax+b}dx=\frac{A}{a}\ln|ax+b|+C$
- $\int\frac{B}{(ax+b)^2}dx=B\int(ax+b)^{-2}dx=-\frac{B}{a(ax+b)}+C$`,
    what: R`É a técnica para integrar uma **fração de polinômios** $\frac{P(x)}{Q(x)}$, com o grau de $P$ **menor** que o de $Q$. Ela **quebra** a fração em frações simples, cada uma com integral imediata:
$$\frac{5x-1}{(x+1)(x-2)}=\frac{2}{x+1}+\frac{3}{x-2}$$`,
    why: R`Integrais como $\int\frac{4x^2-2x-1}{x(2x+1)^2}dx$ (Questão 5b de 2024.2) não saem por substituição nem por partes. Separadas, viram somas de $\ln$ e potências.`,
    logic: R`É o **contrário de somar frações** com MMC. Se $\frac{2}{x+1}+\frac{3}{x-2}=\frac{2(x-2)+3(x+1)}{(x+1)(x-2)}=\frac{5x-1}{(x+1)(x-2)}$, então dá para voltar: escrevemos a forma com incógnitas $A,B,\ldots$, multiplicamos tudo pelo denominador e descobrimos as constantes.

**Como montar a decomposição** (fatore o denominador primeiro):
- Cada fator linear **simples** $(ax+b)$ gera $\frac{A}{ax+b}$.
- Um fator linear **repetido** $(ax+b)^2$ gera **dois** termos: $\frac{B}{ax+b}+\frac{C}{(ax+b)^2}$.

**Como achar as constantes:**
- **Raízes espertas:** substitua $x$ pelas raízes do denominador. Vários termos zeram e cada constante sai direto.
- **Igualar coeficientes:** expanda e iguale os coeficientes de $x^2$, $x$ e do termo independente. Útil para a constante que sobrar.`,
    formulas: [
      [R`\frac{P(x)}{(x-a)(x-b)}=\frac{A}{x-a}+\frac{B}{x-b}`, R`Fatores lineares distintos.`],
      [R`\frac{P(x)}{x\,(ax+b)^2}=\frac{A}{x}+\frac{B}{ax+b}+\frac{C}{(ax+b)^2}`, R`Fator repetido: um termo para cada potência, até a maior.`],
      [R`P(x)=A(\ldots)+B(\ldots)+C(\ldots)`, R`Depois de multiplicar pelo denominador, substitua as raízes ou iguale os coeficientes.`],
      [R`\int\frac{A}{ax+b}dx=\frac{A}{a}\ln|ax+b|\qquad\int\frac{C}{(ax+b)^2}dx=-\frac{C}{a\,(ax+b)}`, R`Integrais finais (não esqueça o $\frac1a$!).`],
      [R`\text{grau}(P)\ge\text{grau}(Q)\Rightarrow \text{divida antes}`, R`Faça a divisão de polinômios (ou reescreva, ex.: $\frac{x+3}{x-1}=1+\frac{4}{x-1}$).`],
    ],
    when: R`Integrando **racional** (polinômio/polinômio) cujo denominador **fatora em fatores lineares**, e o numerador **não** é a derivada do denominador (se fosse, seria substituição: $\int\frac{2x+1}{x^2+x}dx=\ln|x^2+x|$).`,
    pitfalls: [
      [R`Para $(2x+1)^2$, escrever só $\frac{C}{(2x+1)^2}$.`, R`Fator repetido gera **dois** termos: $\frac{B}{2x+1}+\frac{C}{(2x+1)^2}$.`],
      [R`$\int\frac{4}{2x+1}dx=4\ln|2x+1|$.`, R`$4\cdot\frac{\ln|2x+1|}{2}=2\ln|2x+1|$.`],
      [R`$\int\frac{-2}{(2x+1)^2}dx=-2\ln|(2x+1)^2|$.`, R`É potência, não log: $-2\cdot\frac{(2x+1)^{-1}}{-1\cdot2}=\frac{1}{2x+1}$.`],
      [R`Aplicar frações parciais com grau do numerador $\ge$ grau do denominador.`, R`Divida primeiro.`],
      [R`Errar a conta ao substituir a raiz (ex.: $x=-\frac12$).`, R`Confira a decomposição testando um valor qualquer, como $x=1$, nos dois lados.`],
    ],
  },

  identify: {
    triggers: [
      R`Fração de **polinômios**, com o denominador fatorado (ou fatorável) em lineares: $x(2x+1)^2$, $(x+1)(x-2)$, $x^2-1$.`,
      R`Grau do numerador menor que o do denominador.`,
      R`O numerador **não** é múltiplo da derivada do denominador.`,
      R`O enunciado diz "frações parciais com fatores repetidos".`,
    ],
    first: R`**Fatore o denominador** e escreva a **forma** da decomposição (um termo por fator; dois para o fator ao quadrado). Só depois multiplique e calcule as constantes.`,
    examples: [
      { q: R`$$\int\frac{4x^2-2x-1}{x(2x+1)^2}dx$$`, look: R`Racional, grau 2 < grau 3, fator $(2x+1)$ repetido.`, method: R`$\frac Ax+\frac{B}{2x+1}+\frac{C}{(2x+1)^2}$.`, why: R`Nem substituição nem partes simplificam; a decomposição gera integrais imediatas.` },
      { q: R`$$\int\frac{2x+1}{x^2+x}dx\quad\text{vs}\quad\int\frac{1}{x^2+x}dx$$`, look: R`No 1º, o numerador é exatamente $(x^2+x)'$.`, method: R`1º: substituição, $\ln|x^2+x|$. 2º: frações parciais, $\frac1x-\frac1{x+1}$.`, why: R`Antes de decompor, cheque se não é $\frac{u'}{u}$.` },
    ],
    writing: R`Modelo (gabarito 2024.2): "Como temos a divisão de dois polinômios em que o grau do numerador é menor que o do denominador, vamos usar frações parciais com fatores repetidos:
$\frac{4x^2-2x-1}{x(2x+1)^2}=\frac{A}{x}+\frac{B}{2x+1}+\frac{C}{(2x+1)^2}$.
Com isso, $4x^2-2x-1=(4A+2B)x^2+(4A+B+C)x+A$. Igualando os coeficientes: …"`,
  },

  solved: [
    { lvl: 1, q: R`Calcule $\int\frac{1}{x(x+1)}\,dx$.`, method: R`Dois fatores lineares distintos.`,
      steps: [R`$\frac1{x(x+1)}=\frac Ax+\frac{B}{x+1}\Rightarrow1=A(x+1)+Bx$.`, R`$x=0$: $1=A$. $x=-1$: $1=-B\Rightarrow B=-1$.`, R`$\int\left(\frac1x-\frac1{x+1}\right)dx=\ln|x|-\ln|x+1|+C$.`], ans: R`$$\ln|x|-\ln|x+1|+C=\ln\left|\frac{x}{x+1}\right|+C$$` },
    { lvl: 2, q: R`Calcule $\int\frac{5x-1}{(x+1)(x-2)}\,dx$.`, method: R`Fatores distintos; constantes por raízes espertas.`,
      steps: [R`$5x-1=A(x-2)+B(x+1)$.`, R`$x=-1$: $-6=-3A\Rightarrow A=2$. $x=2$: $9=3B\Rightarrow B=3$.`, R`$\int\left(\frac{2}{x+1}+\frac{3}{x-2}\right)dx=2\ln|x+1|+3\ln|x-2|+C$.`], ans: R`$$2\ln|x+1|+3\ln|x-2|+C$$` },
    { lvl: 3, q: R`Calcule $\int\frac{x+5}{x^2+x-2}\,dx$.`, method: R`Fatorar o denominador antes: $x^2+x-2=(x+2)(x-1)$.`,
      steps: [R`$\frac{x+5}{(x+2)(x-1)}=\frac{A}{x+2}+\frac{B}{x-1}\Rightarrow x+5=A(x-1)+B(x+2)$.`, R`$x=1$: $6=3B\Rightarrow B=2$. $x=-2$: $3=-3A\Rightarrow A=-1$.`, R`$\int\left(-\frac1{x+2}+\frac2{x-1}\right)dx=-\ln|x+2|+2\ln|x-1|+C$.`], ans: R`$$-\ln|x+2|+2\ln|x-1|+C$$` },
    { lvl: 4, q: R`Calcule $\int\frac{x+3}{(x-1)^2}\,dx$.`, method: R`Fator repetido $(x-1)^2$: $\frac{A}{x-1}+\frac{B}{(x-1)^2}$.`,
      steps: [R`$x+3=A(x-1)+B$. $x=1$: $B=4$. Coeficiente de $x$: $A=1$.`, R`(Atalho: $x+3=(x-1)+4$, então $\frac{x+3}{(x-1)^2}=\frac{1}{x-1}+\frac{4}{(x-1)^2}$.)`, R`$\int\frac{dx}{x-1}=\ln|x-1|$; $\int4(x-1)^{-2}dx=-\frac{4}{x-1}$.`], ans: R`$$\ln|x-1|-\frac{4}{x-1}+C$$` },
    { lvl: 5, q: R`(Estilo prova — Questão 5b) Calcule $$\int\frac{3x^2+2x+1}{x(x+1)^2}\,dx.$$`, method: R`Racional com fator repetido $(x+1)^2$: três constantes.`,
      steps: [
        R`Forma: $\frac{3x^2+2x+1}{x(x+1)^2}=\frac Ax+\frac{B}{x+1}+\frac{C}{(x+1)^2}$.`,
        R`Multiplicando por $x(x+1)^2$: $3x^2+2x+1=A(x+1)^2+Bx(x+1)+Cx$.`,
        R`$x=0$: $1=A$. $x=-1$: $3-2+1=2=C\cdot(-1)\Rightarrow C=-2$.`,
        R`Coeficiente de $x^2$: $3=A+B\Rightarrow B=2$.`,
        R`Conferência em $x=1$: esquerda $\frac{6}{1\cdot4}=1{,}5$; direita $1+\frac22+\frac{-2}{4}=1{,}5$ ✓.`,
        R`$\int\left(\frac1x+\frac{2}{x+1}-\frac{2}{(x+1)^2}\right)dx=\ln|x|+2\ln|x+1|-2\cdot\frac{(x+1)^{-1}}{-1}$.`,
      ], ans: R`$$\ln|x|+2\ln|x+1|+\frac{2}{x+1}+C$$` },
  ],

  practice: [
    { id: 'p01', lvl: 'F', tag: 'Decomposição com fatores distintos', q: R`Decomponha: $\frac{3}{(x-1)(x+2)}=\frac{A}{x-1}+\frac{B}{x+2}$. Informe $A$ e $B$.`,
      a: { t: 'multi', fields: [{ label: 'A', v: '1' }, { label: 'B', v: '-1' }] },
      sol: [R`$3=A(x+2)+B(x-1)$.`, R`$x=1$: $3=3A\Rightarrow A=1$. $x=-2$: $3=-3B\Rightarrow B=-1$.`], ans: R`$A=1$, $B=-1$` },
    { id: 'p02', lvl: 'F', tag: 'Diferença de quadrados no denominador', q: R`Calcule $\int\frac{2}{x^2-1}\,dx$.`, a: { t: 'anti', v: 'ln|x-1|-ln|x+1|', d: '2/(x^2-1)', domain: [1.5, 4] },
      sol: [R`$x^2-1=(x-1)(x+1)$; $2=A(x+1)+B(x-1)$.`, R`$x=1$: $A=1$; $x=-1$: $B=-1$.`, R`$\ln|x-1|-\ln|x+1|$.`], ans: R`$\ln|x-1|-\ln|x+1|+C$` },
    { id: 'p03', lvl: 'I', tag: 'Fatores distintos (integral)', q: R`Calcule $\int\frac{x+7}{(x-1)(x+3)}\,dx$.`, a: { t: 'anti', v: '2ln|x-1|-ln|x+3|', d: '(x+7)/((x-1)(x+3))', domain: [1.5, 4] },
      sol: [R`$x+7=A(x+3)+B(x-1)$.`, R`$x=1$: $8=4A\Rightarrow A=2$. $x=-3$: $4=-4B\Rightarrow B=-1$.`], ans: R`$2\ln|x-1|-\ln|x+3|+C$` },
    { id: 'p04', lvl: 'I', tag: 'Decompor e juntar os logaritmos', q: R`Calcule $\int\frac{4x}{x^2-1}\,dx$.`, a: { t: 'anti', v: '2ln|x^2-1|', d: '4x/(x^2-1)', domain: [1.5, 4] },
      sol: [R`$\frac{4x}{(x-1)(x+1)}=\frac A{x-1}+\frac B{x+1}$: $x=1\Rightarrow A=2$; $x=-1\Rightarrow-4=-2B\Rightarrow B=2$.`, R`$2\ln|x-1|+2\ln|x+1|=2\ln|x^2-1|$.`, R`(Também sai por substituição, $u=x^2-1$: $\int\frac{2\,du}{u}$.)`], ans: R`$2\ln|x^2-1|+C$` },
    { id: 'p05', lvl: 'I', tag: 'Fator repetido simples', q: R`Calcule $\int\frac{2x+3}{(x+1)^2}\,dx$.`, a: { t: 'anti', v: '2ln|x+1|-1/(x+1)', d: '(2x+3)/(x+1)^2' },
      hint: R`$2x+3=2(x+1)+1$.`,
      sol: [R`$\frac{2x+3}{(x+1)^2}=\frac{2}{x+1}+\frac{1}{(x+1)^2}$.`, R`$\int=2\ln|x+1|+\frac{(x+1)^{-1}}{-1}=2\ln|x+1|-\frac{1}{x+1}$.`], ans: R`$2\ln|x+1|-\frac{1}{x+1}+C$` },
    { id: 'p06', lvl: 'I', tag: 'Fator repetido x² (três constantes)', q: R`Decomponha: $\frac{1}{x^2(x+1)}=\frac{A}{x}+\frac{B}{x^2}+\frac{C}{x+1}$. Informe $A$, $B$ e $C$.`,
      a: { t: 'multi', fields: [{ label: 'A', v: '-1' }, { label: 'B', v: '1' }, { label: 'C', v: '1' }] },
      sol: [R`$1=Ax(x+1)+B(x+1)+Cx^2$.`, R`$x=0$: $B=1$. $x=-1$: $C=1$. Coeficiente de $x^2$: $0=A+C\Rightarrow A=-1$.`], ans: R`$A=-1$, $B=1$, $C=1$` },
    { id: 'p07', lvl: 'IA', tag: 'Três fatores lineares distintos', q: R`Calcule $\int\frac{x^2+1}{x(x-1)(x+1)}\,dx$.`, a: { t: 'anti', v: '-ln|x|+ln|x-1|+ln|x+1|', d: '(x^2+1)/(x*(x-1)*(x+1))', domain: [1.5, 4] },
      sol: [R`$x^2+1=A(x-1)(x+1)+Bx(x+1)+Cx(x-1)$.`, R`$x=0$: $1=-A\Rightarrow A=-1$. $x=1$: $2=2B\Rightarrow B=1$. $x=-1$: $2=2C\Rightarrow C=1$.`], ans: R`$-\ln|x|+\ln|x-1|+\ln|x+1|+C$` },
    { id: 'p08', lvl: 'IA', tag: 'Frações parciais em integral definida', q: R`Calcule $\int_2^3\frac{1}{x^2-x}\,dx$.`, a: { t: 'num', v: 'ln(4/3)' },
      sol: [R`$\frac{1}{x(x-1)}=\frac{1}{x-1}-\frac1x$.`, R`$\left[\ln|x-1|-\ln|x|\right]_2^3=(\ln2-\ln3)-(\ln1-\ln2)=2\ln2-\ln3=\ln\frac43$.`], ans: R`$\ln\frac43\approx0{,}29$` },
    { id: 'p09', lvl: 'IA', tag: 'Montar a forma com fator repetido', q: R`Qual é a forma correta da decomposição de $\frac{x+2}{x(x-3)^2}$?`,
      a: { t: 'choice', options: [R`$\frac Ax+\frac{B}{(x-3)^2}$`, R`$\frac Ax+\frac{B}{x-3}+\frac{C}{(x-3)^2}$`, R`$\frac{A}{x}+\frac{Bx+C}{(x-3)^2}$ com $B=0$ obrigatório`, R`$\frac{A}{x(x-3)}+\frac{B}{x-3}$`], correct: 1, why: R`Um termo para cada potência do fator repetido, até a maior: $\frac{B}{x-3}+\frac{C}{(x-3)^2}$.` },
      sol: [R`Fator simples $x$: $\frac Ax$. Fator repetido $(x-3)^2$: $\frac{B}{x-3}+\frac{C}{(x-3)^2}$.`], ans: R`$\frac Ax+\frac{B}{x-3}+\frac{C}{(x-3)^2}$` },
    { id: 'p10', lvl: 'A', tag: 'Estilo prova: fator repetido (2x − 1)²', q: R`(Estilo prova — Questão 5b) Calcule $$\int\frac{6x^2-3x+1}{x(2x-1)^2}\,dx.$$`, a: { t: 'anti', v: 'ln|x|+ln|2x-1|/2-1/(2x-1)', d: '(6x^2-3x+1)/(x*(2x-1)^2)', domain: [1, 4] },
      hint: R`$\frac Ax+\frac{B}{2x-1}+\frac{C}{(2x-1)^2}$. Use $x=0$, $x=\frac12$ e o coeficiente de $x^2$.`,
      sol: [
        R`$6x^2-3x+1=A(2x-1)^2+Bx(2x-1)+Cx$.`,
        R`$x=0$: $1=A$. $x=\frac12$: $\frac64-\frac32+1=1=\frac C2\Rightarrow C=2$.`,
        R`Coeficiente de $x^2$: $6=4A+2B\Rightarrow B=1$. (Conferência em $x=1$: $\frac{4}{1}=4$ e $1+1+2=4$ ✓.)`,
        R`$\int\frac1x=\ln|x|$; $\int\frac{1}{2x-1}=\frac12\ln|2x-1|$; $\int2(2x-1)^{-2}=2\cdot\frac{(2x-1)^{-1}}{-1\cdot2}=-\frac{1}{2x-1}$.`,
      ], ans: R`$\ln|x|+\frac12\ln|2x-1|-\frac{1}{2x-1}+C$` },
  ],

  summary: {
    formulas: [R`Distintos: $\frac{A}{x-a}+\frac{B}{x-b}$`, R`Repetido: $\frac{B}{ax+b}+\frac{C}{(ax+b)^2}$`, R`$\int\frac{A}{ax+b}=\frac Aa\ln|ax+b|$ · $\int\frac{C}{(ax+b)^2}=-\frac{C}{a(ax+b)}$`],
    when: [R`Racional com grau(num) < grau(den), denominador em fatores lineares`, R`Numerador **não** é a derivada do denominador`],
    steps: [R`Fatore o denominador.`, R`Escreva a forma (2 termos para o fator ao quadrado).`, R`Multiplique pelo denominador.`, R`Raízes espertas + coeficiente de $x^2$.`, R`Confira com $x=1$.`, R`Integre cada termo ($\ln$ ou potência, com $\frac1a$).`],
    errors: [R`Só um termo para o fator repetido`, R`Esquecer o $\frac1a$`, R`Trocar potência por $\ln$`],
    memo: [R`$\int\frac{dx}{(2x+1)^2}=-\frac{1}{2(2x+1)}$`, R`$\ln|a|+\ln|b|=\ln|ab|$`],
  },

  cards: [
    [R`Quando usar frações parciais?`, R`Integrando racional com grau(num) < grau(den), denominador fatorável e numerador que não é a derivada do denominador.`],
    [R`Forma para $\frac{P(x)}{(x-a)(x-b)}$?`, R`$\frac{A}{x-a}+\frac{B}{x-b}$`],
    [R`Forma para um fator repetido $(ax+b)^2$?`, R`$\frac{B}{ax+b}+\frac{C}{(ax+b)^2}$`],
    [R`Como achar as constantes rapidamente?`, R`Substituindo as raízes do denominador (zeram termos) e igualando o coeficiente de $x^2$.`],
    [R`$\int\frac{4}{2x+1}dx$?`, R`$2\ln|2x+1|+C$`],
    [R`$\int\frac{-2}{(2x+1)^2}dx$?`, R`$\frac{1}{2x+1}+C$`],
    [R`E se o grau do numerador for $\ge$ o do denominador?`, R`Divida os polinômios antes.`],
    [R`Diferença: $\int\frac{2x+1}{x^2+x}dx$ e $\int\frac{1}{x^2+x}dx$?`, R`1ª: substituição ($\ln|x^2+x|$). 2ª: frações parciais ($\ln|x|-\ln|x+1|$).`],
  ],
});
