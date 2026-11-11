# Forja do Cálculo — Plataforma de estudos para a Prova 2 de Cálculo 1

## Como abrir

- **Jeito mais simples:** dê dois cliques em `index.html`. Abre no navegador, sem instalar nada.
- **Precisa de internet** só para carregar as fórmulas (KaTeX) e as fontes. Sem internet, as fórmulas aparecem como código LaTeX.
- **Opcional, servidor local:** `powershell -ExecutionPolicy Bypass -File tools\serve.ps1` e acesse `http://localhost:8765`.

## Como estudar

1. Abra o **Painel** e confira a **data da prova** (padrão: 14 dias a partir do primeiro acesso).
2. Siga o **Cronograma**: um tópico por dia, com uma versão "dia corrido" de 25–30 min.
3. Em cada aula, siga as 6 abas: Teoria → Identificação → Resolvidos → Exercícios → Resumo → Cartões.
4. Nos dias 13–14: **Identificar método**, **Resumos** (imprima o seu resumo de consulta) e **Simulados** (provas 2024.2 e 2025.2 com o gabarito corrigido).

## Progresso

- Fica salvo automaticamente **neste navegador** (localStorage).
- Para usar em outro aparelho: **Configurações → Exportar progresso** e depois **Importar** no outro.

## Cartões no Anki

Cartões → **Exportar CSV** → no Anki: *Arquivo → Importar*. O arquivo já vem configurado: separador `;`, 2 campos (Frente; Verso), HTML ativado. As fórmulas usam `\( … \)`, que o Anki renderiza nativamente.

## Estrutura

```
index.html               shell (sidebar + área principal)
assets/css/style.css     identidade visual (Code Forge: forja escura / pergaminho claro)
assets/js/core.js        namespace, texto+LaTeX, armazenamento, progresso
assets/js/checker.js     corretor de respostas (parser próprio de expressões)
assets/js/components.js  cavaleiro em pixel art, exercícios, relatório, cartões, CSV
assets/js/pages.js       páginas (painel, aula, resumos, cartões, cronograma, simulados…)
assets/js/app.js         roteador
content/                 conteúdo (dados): course, 12 aulas, identificação, simulados, cronograma
tools/serve.ps1          servidor local opcional
```

O conteúdo é separado do código: para corrigir ou ampliar uma aula, edite só o arquivo em `content/lessons/`. Depois abra `#/dev` (Configurações → "Verificação de conteúdo") para validar:
- contagens de exemplos, exercícios e cartões;
- LaTeX;
- gabaritos no corretor;
- derivada de cada antiderivada contra o integrando.
