'use strict';
CALC.addLesson({
  id: 'lhopital', n: 1, title: "Regra de L'Hôpital", min: 55, prereq: [], patterns: ['P1', 'P2', 'P3'],

  theory: {
    review: R`Derivadas que mais aparecem nesta aula:
- $(x^n)'=nx^{n-1}$, $(e^x)'=e^x$, $(\ln x)'=\frac1x$, $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$, $(\operatorname{arctg}x)'=\frac{1}{1+x^2}$
- Produto: $(u\,v)'=u'v+u\,v'$ · Quociente: $\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}$
- Cadeia: $\big(f(g(x))\big)'=f'(g(x))\cdot g'(x)$ — ex.: $(e^{3x})'=3e^{3x}$, $(\sin(x^2-1))'=\cos(x^2-1)\cdot 2x$`,
    what: R`É uma ferramenta para calcular limites que, ao substituir o valor, dão uma **forma indeterminada** $\frac00$ ou $\frac{\infty}{\infty}$. Em vez de calcular o limite do quociente $\frac{f}{g}$, calculamos o limite do quociente das **derivadas** $\frac{f'}{g'}$.`,
    why: R`Limites como $\lim_{x\to0}\frac{\sin x}{x}$ ou $\lim_{x\to\infty}\frac{\ln x}{x}$ não saem por fatoração. L'Hôpital resolve comparando a **velocidade** com que o numerador e o denominador vão para 0 (ou para ∞). Na prova ele aparece sempre na Questão 1, com 2 limites.`,
    logic: R`Perto do ponto $a$, toda função derivável se parece com sua reta tangente. Se $f(a)=g(a)=0$:
$$\frac{f(x)}{g(x)}\approx\frac{f'(a)\,(x-a)}{g'(a)\,(x-a)}=\frac{f'(a)}{g'(a)}$$
O fator $(x-a)$, que causava o $\frac00$, se cancela. Quem "vence" é a função que varia mais rápido.

**Exemplo numérico:** com $x=0{,}01$, temos $\frac{\sin x}{x}\approx 0{,}99998$ e $\frac{(\sin x)'}{(x)'}=\cos(0{,}01)\approx0{,}99995$. Os dois se aproximam de $1$.`,
    formulas: [
      [R`\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}`, R`Só vale se a substituição der $\frac00$ ou $\frac{\pm\infty}{\pm\infty}$. Funciona para $a$ finito, $a=\pm\infty$ e limites laterais.`],
      [R`\infty-\infty:\quad \frac{1}{f}-\frac{1}{g}=\frac{g-f}{f\cdot g}`, R`Junte tudo em **uma única fração** (MMC). Normalmente vira $\frac00$.`],
      [R`0\cdot\infty:\quad f\cdot g=\frac{f}{\;1/g\;}`, R`Mande um dos fatores para o denominador como inverso. Ex.: $x\ln x=\frac{\ln x}{1/x}$.`],
      [R`(e^{kx})'=k\,e^{kx}\qquad (\ln u)'=\frac{u'}{u}\qquad (\operatorname{arctg}u)'=\frac{u'}{1+u^2}`, R`Derivadas com regra da cadeia — as mais cobradas nas provas.`],
    ],
    when: R`Use quando a substituição direta der $\frac00$ ou $\frac\infty\infty$. Use também em $\infty-\infty$ ou $0\cdot\infty$, **depois** de reescrever como quociente.

**Antes** de aplicar, veja se uma fatoração simples resolve (ex.: $\frac{x^2-4}{x-2}=x+2$). Se resolver, é mais rápido.`,
    pitfalls: [
      [R`Derivar o quociente inteiro com a regra do quociente: $\left(\frac fg\right)'$.`, R`Derive o numerador e o denominador **separadamente**: $\frac{f'}{g'}$.`],
      [R`Aplicar sem conferir a indeterminação. Ex.: $\lim_{x\to0}\frac{x+1}{x+2}=\frac12$, mas "derivando" daria $\frac11$ (errado).`, R`Substitua primeiro e **escreva** a forma: "$=\frac00$, logo podemos usar L'Hôpital".`],
      [R`Esquecer a cadeia: $(e^{3x})'=e^{3x}$.`, R`$(e^{3x})'=3e^{3x}$ e $(\sin(x^2-1))'=2x\cos(x^2-1)$.`],
      [R`Aplicar L'Hôpital direto em $\frac1x-\frac{1}{\sin x}$ (forma $\infty-\infty$).`, R`Primeiro junte em uma fração: $\frac{\sin x - x}{x\sin x}$, que dá $\frac00$.`],
      [R`Parar na 1ª aplicação mesmo quando aparece um novo $\frac00$.`, R`Aplique de novo (quantas vezes forem necessárias), conferindo a indeterminação a cada vez.`],
    ],
  },

  identify: {
    triggers: [
      R`A questão pede um **limite** e a substituição dá $\frac00$ ou $\frac\infty\infty$.`,
      R`Funções "misturadas" (exponencial, logaritmo, trigonométrica com polinômio) que não fatoram.`,
      R`Diferença de frações que explodem, como $\frac1x-\frac{2}{e^{2x}-1}$: forma $\infty-\infty$.`,
      R`Produto do tipo $x\ln x$ com $x\to0^+$: forma $0\cdot\infty$.`,
      R`O enunciado diz "especifique as indeterminações envolvidas": é L'Hôpital.`,
    ],
    first: R`**Substitua o valor** e escreva o que aparece. Isso decide tudo:
- Deu um número? O limite é esse número.
- Deu $\frac00$ ou $\frac\infty\infty$? Aplique L'Hôpital.
- Deu $\infty-\infty$ ou $0\cdot\infty$? Reescreva como uma fração e confira de novo.`,
    examples: [
      { q: R`$$\lim_{x\to0}\frac{e^{2x}-1}{x}$$`, look: R`Substituindo: $\frac{e^0-1}{0}=\frac00$.`, method: R`L'Hôpital direto: $\lim\frac{2e^{2x}}{1}=2$.`, why: R`É um quociente com $\frac00$ e não há fatoração possível.` },
      { q: R`$$\lim_{x\to0^+}\left(\frac1x-\frac{1}{\sin x}\right)$$`, look: R`As duas frações vão para $+\infty$: forma $\infty-\infty$.`, method: R`MMC: $\frac{\sin x - x}{x\sin x}\to\frac00$; depois L'Hôpital (duas vezes).`, why: R`L'Hôpital só se aplica a **quocientes**. Por isso é preciso juntar as frações antes.` },
      { q: R`$$\lim_{x\to2}\frac{x^2-4}{x-2}$$`, look: R`Dá $\frac00$, mas é um polinômio que fatora: $(x-2)(x+2)$.`, method: R`Fatorar: $\lim(x+2)=4$. (L'Hôpital também daria $\frac{2x}{1}=4$.)`, why: R`L'Hôpital não é a única saída. Escolha a mais rápida.` },
    ],
    writing: R`Modelo de redação (igual ao gabarito do professor):

"Como $\lim_{x\to1}\frac{e^{2x}\sin(x^2-1)}{\ln x}=\frac{e^{2}\sin 0}{\ln 1}=\frac00$, podemos usar a Regra de L'Hôpital: …"

Em **cada** nova aplicação, escreva de novo a indeterminação: "$=\frac00$. Aplicando a Regra de L'Hôpital novamente: …"

Em $\infty-\infty$: "Juntando as frações, $\lim\left(\frac1x-\frac{2}{e^{2x}-1}\right)=\lim\frac{e^{2x}-1-2x}{x(e^{2x}-1)}=\frac00$."`,
  },

  solved: [
    {
      lvl: 1, q: R`Calcule $$\lim_{x\to0}\frac{\sin(3x)}{x}.$$`,
      method: R`Substituindo: $\frac{\sin 0}{0}=\frac00$. É um quociente indeterminado, então usamos L'Hôpital.`,
      steps: [
        R`Verificar a indeterminação: $\sin(3\cdot0)=0$ e o denominador vale $0$, forma $\frac00$.`,
        R`Derivar numerador e denominador **separadamente**. Pela cadeia, $(\sin 3x)'=\cos(3x)\cdot 3$; e $(x)'=1$.`,
        R`$$\lim_{x\to0}\frac{\sin(3x)}{x}=\lim_{x\to0}\frac{3\cos(3x)}{1}=3\cos 0=3$$`,
      ],
      ans: R`$$\lim_{x\to0}\frac{\sin(3x)}{x}=3$$`,
    },
    {
      lvl: 2, q: R`Calcule $$\lim_{x\to\infty}\frac{\ln x}{x}.$$`,
      method: R`Quando $x\to\infty$: $\ln x\to\infty$ e $x\to\infty$, forma $\frac\infty\infty$. Usamos L'Hôpital.`,
      steps: [
        R`Forma $\frac{\infty}{\infty}$, então L'Hôpital é permitido.`,
        R`Derivadas: $(\ln x)'=\frac1x$ e $(x)'=1$.`,
        R`$$\lim_{x\to\infty}\frac{\ln x}{x}=\lim_{x\to\infty}\frac{1/x}{1}=\lim_{x\to\infty}\frac1x=0$$`,
        R`Interpretação: $x$ cresce **muito** mais rápido que $\ln x$.`,
      ],
      ans: R`$$\lim_{x\to\infty}\frac{\ln x}{x}=0$$`,
    },
    {
      lvl: 3, q: R`Calcule $$\lim_{x\to0}\frac{e^{x}-1-x}{x^2}.$$`,
      method: R`$\frac{e^0-1-0}{0}=\frac00$, então aplicamos L'Hôpital, possivelmente mais de uma vez.`,
      steps: [
        R`1ª verificação: forma $\frac00$.`,
        R`1ª aplicação: $(e^x-1-x)'=e^x-1$ e $(x^2)'=2x$: $$\lim_{x\to0}\frac{e^x-1}{2x}=\frac{e^0-1}{0}=\frac00$$`,
        R`Ainda é $\frac00$, então aplicamos de novo: $(e^x-1)'=e^x$ e $(2x)'=2$: $$\lim_{x\to0}\frac{e^x}{2}=\frac{e^0}{2}=\frac12$$`,
      ],
      ans: R`$$\lim_{x\to0}\frac{e^{x}-1-x}{x^2}=\frac12$$`,
    },
    {
      lvl: 4, q: R`Calcule $$\lim_{x\to0^+}x\ln x.$$`,
      method: R`$x\to0$ e $\ln x\to-\infty$: forma $0\cdot\infty$. Não é quociente, então primeiro reescrevemos.`,
      steps: [
        R`Reescrever como quociente, mandando $x$ para baixo como $\frac1x$: $$x\ln x=\frac{\ln x}{1/x}$$ Agora a forma é $\frac{-\infty}{+\infty}$.`,
        R`Aplicar L'Hôpital: $(\ln x)'=\frac1x$ e $\left(\frac1x\right)'=\left(x^{-1}\right)'=-\frac{1}{x^2}$.`,
        R`$$\lim_{x\to0^+}\frac{1/x}{-1/x^2}=\lim_{x\to0^+}\frac1x\cdot\left(-\frac{x^2}{1}\right)=\lim_{x\to0^+}(-x)=0$$`,
        R`Por que não escolher $\frac{x}{1/\ln x}$? Daria uma derivada bem pior. Regra prática: o $\ln$ fica no numerador.`,
      ],
      ans: R`$$\lim_{x\to0^+}x\ln x=0$$`,
    },
    {
      lvl: 5, q: R`(Estilo prova — Questão 1b) Especificando as indeterminações envolvidas, calcule pela Regra de L'Hôpital: $$\lim_{x\to0^+}\left(\frac1x-\frac{4}{e^{4x}-1}\right)$$`,
      method: R`Cada parcela vai para $+\infty$: forma $\infty-\infty$. Juntamos em uma fração, chegamos a $\frac00$ e aplicamos L'Hôpital (duas vezes).`,
      steps: [
        R`Forma inicial: $\frac1{0^+}-\frac{4}{e^0-1}=\infty-\infty$.`,
        R`MMC $=x(e^{4x}-1)$: $$\frac1x-\frac{4}{e^{4x}-1}=\frac{e^{4x}-1-4x}{x\,(e^{4x}-1)}$$ Substituindo: $\frac{1-1-0}{0\cdot(1-1)}=\frac00$. Logo, podemos usar L'Hôpital.`,
        R`Numerador: $(e^{4x}-1-4x)'=4e^{4x}-4$. Denominador (regra do produto): $\big(x(e^{4x}-1)\big)'=1\cdot(e^{4x}-1)+x\cdot4e^{4x}$.
$$\lim_{x\to0^+}\frac{4e^{4x}-4}{e^{4x}-1+4xe^{4x}}=\frac{4-4}{1-1+0}=\frac00$$`,
        R`Aplicando L'Hôpital novamente: numerador $(4e^{4x}-4)'=16e^{4x}$; denominador $(e^{4x}-1+4xe^{4x})'=4e^{4x}+\big(4e^{4x}+16xe^{4x}\big)=e^{4x}(8+16x)$.`,
        R`$$\lim_{x\to0^+}\frac{16e^{4x}}{e^{4x}(8+16x)}=\lim_{x\to0^+}\frac{16}{8+16x}=\frac{16}{8}=2$$`,
        R`Padrão útil para conferir: $\lim_{x\to0^+}\left(\frac1x-\frac{k}{e^{kx}-1}\right)=\frac k2$. Aqui $k=4$, então o resultado é $2$. ✓`,
      ],
      ans: R`$$\lim_{x\to0^+}\left(\frac1x-\frac{4}{e^{4x}-1}\right)=2$$ Indeterminações: $\infty-\infty$, depois $\frac00$ (duas vezes).`,
    },
  ],

  practice: [
    {
      id: 'p01', lvl: 'F', tag: 'Forma 0/0 básica',
      q: R`Calcule $$\lim_{x\to1}\frac{\ln x}{x-1}.$$`,
      a: { t: 'num', v: '1' },
      hint: R`Substitua: dá $\frac00$. Derive em cima e embaixo separadamente.`,
      sol: [R`Substituindo: $\frac{\ln 1}{0}=\frac00$. Logo, L'Hôpital.`, R`$(\ln x)'=\frac1x$ e $(x-1)'=1$.`, R`$$\lim_{x\to1}\frac{1/x}{1}=\frac11=1$$`],
      ans: R`$1$`,
    },
    {
      id: 'p02', lvl: 'F', tag: 'Forma ∞/∞ (exponencial × polinômio)',
      q: R`Calcule $$\lim_{x\to\infty}\frac{3x^2+1}{e^{x}}.$$`,
      a: { t: 'num', v: '0' },
      sol: [R`Forma $\frac\infty\infty$. L'Hôpital: $$\lim\frac{6x}{e^x}=\frac\infty\infty$$`, R`De novo: $$\lim\frac{6}{e^x}=0$$ (o denominador cresce sem limite).`, R`Lição: a exponencial cresce mais rápido que qualquer polinômio.`],
      ans: R`$0$`,
    },
    {
      id: 'p03', lvl: 'I', tag: "Aplicar L'Hôpital duas vezes",
      q: R`Calcule $$\lim_{x\to0}\frac{1-\cos x}{x^2}.$$`,
      a: { t: 'num', v: '1/2' },
      hint: R`Depois da 1ª aplicação aparece $\frac{\sin x}{2x}$, que ainda é $\frac00$.`,
      sol: [R`$\frac{1-1}{0}=\frac00$. L'Hôpital: $(1-\cos x)'=\sin x$ e $(x^2)'=2x$.`, R`$$\lim_{x\to0}\frac{\sin x}{2x}=\frac00$$ Aplicando novamente:`, R`$$\lim_{x\to0}\frac{\cos x}{2}=\frac12$$`],
      ans: R`$\frac12$`,
    },
    {
      id: 'p04', lvl: 'I', tag: 'Derivada de arctg com regra da cadeia',
      q: R`Calcule $$\lim_{x\to0}\frac{\operatorname{arctg}(2x)}{x}.$$`,
      a: { t: 'num', v: '2' },
      sol: [R`$\frac{\operatorname{arctg}0}{0}=\frac00$.`, R`$(\operatorname{arctg}(2x))'=\frac{1}{1+(2x)^2}\cdot 2=\frac{2}{1+4x^2}$ (cadeia).`, R`$$\lim_{x\to0}\frac{2/(1+4x^2)}{1}=\frac{2}{1}=2$$`],
      ans: R`$2$`,
    },
    {
      id: 'p05', lvl: 'I', tag: 'Regra do produto no numerador',
      q: R`Calcule $$\lim_{x\to1}\frac{e^{x}\ln x}{x^2-1}.$$`,
      a: { t: 'num', v: 'e/2' },
      hint: R`O numerador é um **produto**: $(e^x\ln x)'=e^x\ln x+e^x\cdot\frac1x$.`,
      sol: [R`$\frac{e\cdot\ln1}{1-1}=\frac00$. L'Hôpital.`, R`Numerador (produto): $(e^x\ln x)'=e^x\ln x+\frac{e^x}{x}$. Denominador: $(x^2-1)'=2x$.`, R`$$\lim_{x\to1}\frac{e^x\ln x+\frac{e^x}{x}}{2x}=\frac{e\cdot0+\frac e1}{2}=\frac e2$$`],
      ans: R`$\frac e2\approx1{,}36$`,
    },
    {
      id: 'p06', lvl: 'I', tag: 'Forma 0·∞ (reescrever como quociente)',
      q: R`Calcule $$\lim_{x\to0^+}x^2\ln x.$$`,
      a: { t: 'num', v: '0' },
      sol: [R`Forma $0\cdot(-\infty)$. Reescreva: $x^2\ln x=\frac{\ln x}{x^{-2}}$, forma $\frac{-\infty}{\infty}$.`, R`L'Hôpital: $(\ln x)'=\frac1x$ e $(x^{-2})'=-2x^{-3}$.`, R`$$\lim_{x\to0^+}\frac{1/x}{-2/x^3}=\lim_{x\to0^+}\frac{1}{x}\cdot\frac{x^3}{-2}=\lim_{x\to0^+}\left(-\frac{x^2}{2}\right)=0$$`],
      ans: R`$0$`,
    },
    {
      id: 'p07', lvl: 'IA', tag: 'Forma ∞ − ∞ (juntar as frações)',
      q: R`Especificando as indeterminações, calcule $$\lim_{x\to0}\left(\frac1x-\frac{1}{\sin x}\right).$$`,
      a: { t: 'num', v: '0' },
      hint: R`MMC: $\frac{\sin x-x}{x\sin x}$. Vai precisar de L'Hôpital duas vezes.`,
      sol: [
        R`Forma $\infty-\infty$. Juntando: $$\frac1x-\frac1{\sin x}=\frac{\sin x-x}{x\sin x}\ \to\ \frac00$$`,
        R`L'Hôpital: numerador $\cos x-1$; denominador (produto) $\sin x+x\cos x$: $$\lim\frac{\cos x-1}{\sin x+x\cos x}=\frac{0}{0}$$`,
        R`De novo: numerador $-\sin x$; denominador $\cos x+(\cos x-x\sin x)=2\cos x-x\sin x$: $$\lim_{x\to0}\frac{-\sin x}{2\cos x-x\sin x}=\frac{0}{2}=0$$`,
      ],
      ans: R`$0$ (indeterminações: $\infty-\infty$ → $\frac00$ → $\frac00$)`,
    },
    {
      id: 'p08', lvl: 'IA', tag: "L'Hôpital repetido com ln(x + e^{kx})",
      q: R`Especificando as indeterminações, calcule $$\lim_{x\to\infty}\frac{\ln\left(x+e^{4x}\right)}{x}.$$`,
      a: { t: 'num', v: '4' },
      hint: R`$(\ln u)'=\frac{u'}{u}$. Você vai encontrar $\frac\infty\infty$ três vezes.`,
      sol: [
        R`Forma $\frac\infty\infty$. Pela cadeia, $(\ln(x+e^{4x}))'=\frac{1+4e^{4x}}{x+e^{4x}}$: $$\lim\frac{1+4e^{4x}}{x+e^{4x}}=\frac\infty\infty$$`,
        R`L'Hôpital de novo: $$\lim\frac{16e^{4x}}{1+4e^{4x}}=\frac\infty\infty$$`,
        R`Mais uma vez: $$\lim\frac{64e^{4x}}{16e^{4x}}=\lim 4=4$$`,
        R`Padrão das provas: $\lim_{x\to\infty}\frac{\ln(x+e^{kx})}{x}=k$.`,
      ],
      ans: R`$4$`,
    },
    {
      id: 'p09', lvl: 'IA', tag: 'Cadeia + aplicação dupla',
      q: R`Calcule $$\lim_{x\to0}\frac{\sin(x^2)}{1-\cos x}.$$`,
      a: { t: 'num', v: '2' },
      sol: [
        R`$\frac{\sin0}{1-1}=\frac00$. L'Hôpital: $(\sin(x^2))'=2x\cos(x^2)$ e $(1-\cos x)'=\sin x$.`,
        R`$$\lim\frac{2x\cos(x^2)}{\sin x}=\frac00$$`,
        R`De novo (produto no numerador): $(2x\cos(x^2))'=2\cos(x^2)+2x\cdot(-\sin(x^2))\cdot2x=2\cos(x^2)-4x^2\sin(x^2)$; $(\sin x)'=\cos x$.`,
        R`$$\lim_{x\to0}\frac{2\cos(x^2)-4x^2\sin(x^2)}{\cos x}=\frac{2-0}{1}=2$$`,
      ],
      ans: R`$2$`,
    },
    {
      id: 'p10', lvl: 'A', tag: 'Estilo prova: ∞ − ∞ com logaritmo',
      q: R`(Estilo prova) Especificando as indeterminações envolvidas, calcule pela Regra de L'Hôpital: $$\lim_{x\to0^+}\left(\frac{1}{\ln(1+x)}-\frac1x\right)$$ Escreva a resolução completa no rascunho e digite o valor final.`,
      a: { t: 'num', v: '1/2' },
      hint: R`MMC: $\frac{x-\ln(1+x)}{x\ln(1+x)}$. Duas aplicações.`,
      sol: [
        R`Forma: $\frac{1}{0^+}-\frac{1}{0^+}=\infty-\infty$. Juntando: $$\frac{x-\ln(1+x)}{x\ln(1+x)}\to\frac{0-0}{0\cdot0}=\frac00$$ Logo, podemos usar L'Hôpital.`,
        R`Numerador: $\left(x-\ln(1+x)\right)'=1-\frac1{1+x}$. Denominador (produto): $\left(x\ln(1+x)\right)'=\ln(1+x)+\frac{x}{1+x}$.`,
        R`$$\lim_{x\to0^+}\frac{1-\frac1{1+x}}{\ln(1+x)+\frac{x}{1+x}}=\frac{1-1}{0+0}=\frac00$$ Aplicando novamente:`,
        R`Numerador: $\left(1-(1+x)^{-1}\right)'=\frac{1}{(1+x)^2}$. Denominador: $\frac{1}{1+x}+\frac{(1+x)-x}{(1+x)^2}=\frac1{1+x}+\frac1{(1+x)^2}$.`,
        R`$$\lim_{x\to0^+}\frac{\frac1{(1+x)^2}}{\frac1{1+x}+\frac1{(1+x)^2}}=\frac{1}{1+1}=\frac12$$`,
      ],
      ans: R`$\frac12$ — indeterminações: $\infty-\infty$, depois $\frac00$ (duas vezes)`,
    },
  ],

  summary: {
    formulas: [
      R`$\lim\frac fg=\lim\frac{f'}{g'}$ — só com $\frac00$ ou $\frac{\infty}{\infty}$`,
      R`$\infty-\infty$ → juntar em uma fração (MMC)`,
      R`$0\cdot\infty$ → $f\cdot g=\frac{f}{1/g}$ (deixe o $\ln$ no numerador)`,
      R`$(e^{kx})'=ke^{kx}$ · $(\ln u)'=\frac{u'}{u}$ · $(\operatorname{arctg}x)'=\frac{1}{1+x^2}$`,
    ],
    when: [
      R`Limite que dá $\frac00$ ou $\frac\infty\infty$ e não fatora fácil`,
      R`Diferença de frações que explodem ($\infty-\infty$)`,
      R`Produto "zero vezes infinito" ($x\ln x$, $x^2\ln x$ …)`,
    ],
    steps: [
      R`Substitua e **escreva** a forma obtida.`,
      R`Se for $\infty-\infty$ ou $0\cdot\infty$, reescreva como fração e substitua de novo.`,
      R`Derive o numerador e o denominador **separadamente** (cadeia/produto quando preciso).`,
      R`Substitua; se ainda for indeterminado, aplique de novo (escrevendo a indeterminação).`,
      R`Conclua com o valor do limite.`,
    ],
    errors: [
      R`Usar a regra do quociente`,
      R`Aplicar sem indeterminação`,
      R`Esquecer a regra da cadeia em $e^{kx}$, $\sin(x^2)$, $\ln(\ldots)$`,
      R`Aplicar direto em $\infty-\infty$`,
    ],
    memo: [
      R`$\lim_{x\to\infty}\frac{\ln(x+e^{kx})}{x}=k$`,
      R`$\lim_{x\to0^+}\left(\frac1x-\frac{k}{e^{kx}-1}\right)=\frac k2$`,
      R`$\lim_{x\to0}\frac{\sin(kx)}{x}=k$ · $\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac12$`,
      R`Crescimento: $\ln x\ll x^n\ll e^x$ quando $x\to\infty$`,
    ],
  },

  cards: [
    [R`Quando posso aplicar a Regra de L'Hôpital?`, R`Quando o limite de um **quociente** dá $\frac00$ ou $\frac{\pm\infty}{\pm\infty}$ ao substituir.`],
    [R`Enuncie a Regra de L'Hôpital.`, R`Se $\lim\frac fg$ é $\frac00$ ou $\frac\infty\infty$, então $\lim\frac{f}{g}=\lim\frac{f'}{g'}$ (derivadas separadas).`],
    [R`Como tratar a forma $\infty-\infty$?`, R`Juntar em uma única fração (MMC) até obter $\frac00$ ou $\frac\infty\infty$; só então usar L'Hôpital.`],
    [R`Como tratar a forma $0\cdot\infty$ (ex.: $x\ln x$)?`, R`Reescrever como quociente: $x\ln x=\frac{\ln x}{1/x}$ (forma $\frac{\infty}{\infty}$).`],
    [R`L'Hôpital: derivar $\frac fg$ pela regra do quociente ou $f$ e $g$ separadamente?`, R`**Separadamente**: $\frac{f'}{g'}$. A regra do quociente aqui é erro.`],
    [R`$\lim_{x\to\infty}\frac{\ln(x+e^{kx})}{x}=\ ?$`, R`$k$ (aplica-se L'Hôpital três vezes, sempre com $\frac\infty\infty$).`],
    [R`Derivada de $\operatorname{arctg}(u)$?`, R`$\frac{u'}{1+u^2}$`],
    [R`Identifique: $\lim_{x\to0^+}\left(\frac1x-\frac{3}{e^{3x}-1}\right)$`, R`$\infty-\infty$ → MMC → $\frac00$ → L'Hôpital duas vezes. Resultado: $\frac32$.`],
  ],
});
