'use strict';
/* Estrutura do curso: módulos (navegação) e ordem de estudo (cronograma / "próxima aula"). */
CALC.modules = [
  { n: 1, title: 'Aplicações de Derivadas', lessons: ['lhopital', 'extremos', 'otimizacao'] },
  { n: 2, title: 'Fundamentos de Integrais', lessons: ['indefinidas', 'definidas', 'propriedades', 'elementares'] },
  { n: 3, title: 'Aplicações de Integrais', lessons: ['pvi', 'area'] },
  { n: 4, title: 'Técnicas de Integração', lessons: ['substituicao', 'partes', 'fracoes'] },
];
// Substituição antes do Módulo 3: o PVI e a área entre curvas das provas exigem substituição.
CALC.order = ['lhopital', 'extremos', 'otimizacao', 'indefinidas', 'elementares', 'definidas', 'propriedades', 'substituicao', 'pvi', 'area', 'partes', 'fracoes'];
