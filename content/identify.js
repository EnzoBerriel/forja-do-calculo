'use strict';
/* Treino de identificação de métodos (dias 13–14). Só o método — sem resolver. */
(function () {
  const INT = ['Substituição', 'Integração por partes', 'Frações parciais', 'Tabela direta (reescrever e integrar)'];
  const LIM = ["L'Hôpital direto", "Juntar frações (∞ − ∞) e depois L'Hôpital", "Reescrever 0·∞ como quociente e depois L'Hôpital", 'Substituir direto (não há indeterminação)'];
  const I = (q, correct, why) => ({ q, options: INT, correct, why });
  const L = (q, correct, why) => ({ q, options: LIM, correct, why });

  CALC.identify = [
    I(R`$$\int\frac{27e^{3x}+45e^{5x}}{(e^{3x}+e^{5x}+1)^3}dx$$`, 0, R`O numerador é $9\times$ a derivada da base $e^{3x}+e^{5x}+1$: $u=e^{3x}+e^{5x}+1$.`),
    I(R`$$\int\frac{4x^2-2x-1}{x(2x+1)^2}dx$$`, 2, R`Racional, grau 2 < grau 3, fator repetido $(2x+1)^2$, e o numerador não é a derivada do denominador.`),
    I(R`$$\int9\sqrt{1+x}\,\ln(1+x)\,dx$$`, 1, R`Logarítmica × algébrica, sem a derivada de $\ln(1+x)$ multiplicando: partes com $u=\ln(1+x)$.`),
    I(R`$$\int\frac{-19\sin(\sqrt{t+1})}{\sqrt{t+1}}dt$$`, 0, R`$\sqrt{t+1}$ dentro do seno e sua derivada (a menos de constante) fora: $u=\sqrt{t+1}$.`),
    I(R`$$\int\frac{100\cos t}{\sin t+2}dt$$`, 0, R`Numerador = derivada do denominador: $u=\sin t+2$, resultado $100\ln|\sin t+2|$.`),
    I(R`$$\int x^2e^{x}dx$$`, 1, R`Polinômio × exponencial: partes (duas vezes), $u=x^2$.`),
    I(R`$$\int x\,e^{x^2}dx$$`, 0, R`$x$ é metade da derivada de $x^2$: substituição $u=x^2$.`),
    I(R`$$\int\frac{(x+1)^2}{\sqrt x}dx$$`, 3, R`Denominador com um só termo: expanda e divida, obtendo uma soma de potências.`),
    I(R`$$\int\frac{5x-1}{(x+1)(x-2)}dx$$`, 2, R`Racional com fatores lineares distintos; o numerador não é a derivada de $(x+1)(x-2)=x^2-x-2$ (que seria $2x-1$).`),
    I(R`$$\int\frac{2x-1}{x^2-x-2}dx$$`, 0, R`Agora o numerador **é** a derivada do denominador: $\ln|x^2-x-2|$. Sempre cheque isso antes de decompor.`),
    I(R`$$\int\sqrt{4x-3}\,dx$$`, 3, R`Argumento linear: tabela com o fator $\frac1a$: $\frac16(4x-3)^{3/2}$. (É uma substituição "de cabeça".)`),
    I(R`$$\int\ln x\,dx$$`, 1, R`Um fator só: partes com $u=\ln x$, $dv=dx$.`),
    I(R`$$\int x\cos x\,dx$$`, 1, R`Algébrica × trigonométrica sem relação de derivada: partes com $u=x$.`),
    I(R`$$\int x^2\cos(x^3)\,dx$$`, 0, R`$x^2$ é (um terço da) derivada de $x^3$: substituição.`),
    I(R`$$\int\left(3e^{-2x}+\frac{4}{1+x^2}\right)dx$$`, 3, R`Termos da tabela com argumento linear: $-\frac32e^{-2x}+4\operatorname{arctg}x$.`),
    I(R`$$\int\frac{x+3}{(x-1)^2}dx$$`, 2, R`Fator repetido $(x-1)^2$: $\frac{A}{x-1}+\frac{B}{(x-1)^2}$ (ou reescreva $x+3=(x-1)+4$).`),
    L(R`$$\lim_{x\to1}\frac{e^{2x}\sin(x^2-1)}{\ln x}$$`, 0, R`Substituindo: $\frac{e^2\cdot0}{0}=\frac00$. L'Hôpital direto (com produto + cadeia no numerador).`),
    L(R`$$\lim_{x\to0^+}\left(\frac1x-\frac{2}{e^{2x}-1}\right)$$`, 1, R`$\infty-\infty$: MMC, depois $\frac00$ e L'Hôpital (duas vezes). Resultado: 1.`),
    L(R`$$\lim_{x\to0^+}x^3\ln x$$`, 2, R`$0\cdot(-\infty)$: $\frac{\ln x}{x^{-3}}$, depois L'Hôpital.`),
    L(R`$$\lim_{x\to\infty}\frac{\ln(x+e^{3x})}{x}$$`, 0, R`$\frac\infty\infty$: L'Hôpital (três vezes). Resultado: 3.`),
    L(R`$$\lim_{x\to2}\frac{x^2+1}{x+3}$$`, 3, R`Substituindo dá $\frac55=1$: não há indeterminação, então não se usa L'Hôpital!`),
    L(R`$$\lim_{x\to0}\left(\frac{1}{\operatorname{arctg}x}-\frac1x\right)$$`, 1, R`$\infty-\infty$: junte em $\frac{x-\operatorname{arctg}x}{x\operatorname{arctg}x}$ e aplique L'Hôpital. Resultado: 0.`),
    {
      q: R`"A fábrica dispõe de R\$ 216π para construir uma caixa d'água cilíndrica de volume máximo." Qual é o primeiro passo?`,
      options: [R`Derivar $V=\pi R^2h$ em relação a $R$ e $h$`, R`Usar o custo (fixo) para escrever $h$ em função de $R$`, R`Aplicar o Método do Intervalo Fechado em $[0,216]$`, R`Integrar a área lateral`],
      correct: 1, why: R`A restrição (custo fixo) elimina uma variável; só então derivamos $V(R)$.`,
    },
    {
      q: R`"Encontre os máximos e mínimos **globais** de $f(x)=\frac15x^6-3x^4$ em $[-1,4]$." O que comparar?`,
      options: [R`Só os pontos onde $f''=0$`, R`$f$ nos críticos de dentro de $[-1,4]$ e nas extremidades $-1$ e $4$`, R`Todos os críticos, inclusive os de fora do intervalo`, R`Os limites de $f$ em $\pm\infty$`],
      correct: 1, why: R`Método do Intervalo Fechado: críticos internos + extremidades.`,
    },
    {
      q: R`"$h'(t)$ é dada e sabe-se que $h(\pi^2-1)=40$. Encontre $h(t)$." Que tipo de problema é?`,
      options: [R`Área entre curvas`, R`Problema de valor inicial: integrar e achar $C$ com o ponto`, R`Otimização`, R`Integral imprópria`],
      correct: 1, why: R`Taxa + valor conhecido = PVI.`,
    },
  ];
})();
