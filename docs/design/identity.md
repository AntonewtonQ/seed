# Identidade e componentes — SEED

Versão de 25 de outubro de 2026. Aplica-se à página inicial, à entrada e à área autenticada (`/workspace`). As decisões aqui descritas são **decisões de design** do autor. Não resultam diretamente da pesquisa nem foram avaliadas com utilizadores (ver [Relação com a pesquisa](#relação-com-a-pesquisa)).

## Princípio

O SEED é uma ferramenta de trabalho. Cada tela deve responder, sem esforço:

1. **Onde estou?** Item ativo no menu e trilho de localização (`Negociações / Investidor X / Atualizar negociação`).
2. **O que estou a ver?** Título com o nome do registo e uma linha de contexto (startup, ronda).
3. **Qual é a ação principal?** No máximo um botão primário por tela, alinhado com o título.
4. **O que acontece depois?** Nota junto do botão de guardar e mensagem de sucesso específica no destino.
5. **Como volto ou cancelo?** Trilho de localização (em telemóvel, "← nível acima") e botão "Cancelar" em todos os formulários.

## Marca

- **Símbolo:** um rebento (caule e duas folhas) a branco num quadrado arredondado petróleo. Grelha 32 × 32, cantos de 8. Legível a 16 px.
- **Ficheiros:** `public/brand/seed-symbol.svg`, `public/brand/seed-wordmark.svg`, `app/icon.svg`, `app/favicon.ico` (16, 32 e 48 px) e o componente `components/brand/seed-mark.tsx`, todos com a mesma geometria.
- **Nome:** "SEED" em Inter 600, ao lado do símbolo. Sem slogan junto do logótipo.
- Os ficheiros antigos (`seed-mark.svg`, `seed-logo.svg`, `seed-icon.svg`, `seed-identity-board.png`, `seed-hero-visual.svg`) ficam em `public/brand` apenas porque a apresentação em `docs/pitch-deck` os referencia. Não os use em telas novas.

## Cores

Definidas uma única vez em `app/globals.css`. A área autenticada usa-as através de `--ws-*` em `app/workspace/workspace.css`.

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#FAFAFA` | Fundo da página |
| `--card` | `#FFFFFF` | Superfícies: painéis, listas, formulários |
| `--foreground` | `#18181B` | Texto principal |
| `--muted-foreground` | `#52525B` | Texto secundário, rótulos de dados, notas (7,4:1 sobre `#FAFAFA`) |
| `--border` / `--border-strong` | `#E4E4E7` / `#D4D4D8` | Separadores / contornos de campos e botões secundários |
| `--brand` | `#0F3D3E` | **Única cor de destaque:** botão primário (texto branco 11,9:1), item ativo, ligações, foco |
| `--brand-soft` | `#EEF4F3` | Fundo do item de menu ativo |
| `--danger` | `#B42318` | Eliminar e mensagens de erro (6,6:1 sobre branco) |
| `--success` | `#14532D` sobre `#F0FAF3` | Confirmação depois de guardar |

Regras:
- Não use cor para decorar. O petróleo indica que algo é clicável ou está selecionado.
- O vermelho fica reservado a ações destrutivas e a erros.
- Os estados das negociações (Contactado, Reunião…) são etiquetas neutras: o texto distingue-os, não a cor.

## Tipografia

Inter (via `next/font`), com poucas variações:

| Papel | Tamanho / peso |
|---|---|
| Título da página (`h1`) | 24 px / 600 (22 px em telemóvel) |
| Título de secção (`h2`) | 15 px / 600 |
| Texto e campos | 14 px / 400 |
| Rótulos, notas, trilho | 13 px / 400–500 |
| Números de painel | 28 px / 600, algarismos tabulares |

## Espaçamento e forma

- Escala de 4 px (`--space-1` … `--space-6` = 4, 8, 12, 16, 24, 32).
- Cantos de 6 px em botões e campos e de 8 px em painéis. Contornos de 1 px; sem sombras, exceto no menu móvel sobreposto.
- Largura máxima do conteúdo: 1080 px; formulários com 640 px.

## Componentes (`components/workspace/ui.tsx`)

| Componente | Quando usar |
|---|---|
| `PageHeading` | Todas as telas: `title`, `description` (contexto), `trail` (níveis acima) e `action` (no máximo uma ação primária) |
| `ActionLink` | Navegar para uma ação. Por omissão é primário; `secondary` para alternativas; `danger` só para abrir uma confirmação destrutiva |
| `ActionForm` | Criar ou alterar. Exige `cancel`; use `next` (o que acontece depois) e `success` (mensagem no destino) |
| `Field`, `Select`, `Textarea` | Campos com rótulo visível. Use `hint` para regras curtas; fica ligado por `aria-describedby` e não entra no nome do campo |
| `Row` + `Collection` | Listas com pesquisa e paginação de 8. A pesquisa sem resultados oferece "Limpar pesquisa" |
| `Stat` | Contagem que ajuda a decidir. Uma contagem que não leva a nenhuma ação não deve aparecer |
| `Empty` | Estado vazio: o que falta e, se houver, a ação que o resolve |
| `ReadOnlyNote` | Perfis sem escrita: explica que só podem consultar e quem altera o registo |
| `RecordTabs` | Separar vistas do mesmo registo (Resumo, Interações, Histórico) |

Padrões por tipo de tela:
- **Painel:** retomar o trabalho. A startup vê primeiro as negociações sem próximo passo.
- **Lista:** encontrar e abrir um registo. A ação de criar fica no cabeçalho e repete-se no estado vazio.
- **Detalhe:** compreender o registo e escolher a próxima ação. Os detalhes secundários ficam em separadores ou em `<details>`.
- **Formulário:** uma ação primária, "Cancelar" secundário e uma nota sobre o resultado.
- **Confirmação:** mostrar o que se perde (por exemplo, quantas organizações deixam de ter acesso), com botão vermelho e "Cancelar" ao lado.

Mensagens do sistema:
- O sucesso aparece no destino, com `role="status"`.
- Um erro aparece com `role="alert"`, entra no ecrã e recebe foco.
- Os estados de carregamento, de erro de página e de serviço indisponível usam a mesma identidade.

## Escrita

- Português claro e frases curtas. Diga o que a pessoa pode fazer, não o que o sistema "permite".
- Rótulos concretos: "Abrir ronda", "Associar investidor", "Guardar negociação", "Descarregar".
- Termos fixos: **soft commit** (intenção de investir, não dinheiro), **term sheet** (proposta de condições, registo manual sem assinatura eletrónica), **negociação** (uma por investidor e ronda).
- Os termos especializados são explicados onde são escolhidos (ajuda "O que significa cada etapa?") e não em todas as telas.
- Nunca apresentar dados de demonstração como resultados reais, nem intenção como volume captado.

## Acessibilidade

- Contraste AA verificado com axe-core (WCAG 2 A/AA) nas telas listadas em `docs/verification/ui-review.md`.
- Foco visível: contorno de 2 px em `--brand`. Ligação "Saltar para o conteúdo" no primeiro Tab.
- Ícones decorativos com `aria-hidden`; o texto acompanha sempre o ícone no menu.
- Respeita `prefers-reduced-motion` (indicador de carregamento estático).

## Relação com a pesquisa

[docs/research/recommendations.md](../research/recommendations.md) regista perceções de 24 submissões, sem avaliação de uso do protótipo. A pesquisa apenas **enquadra** esta revisão:
- Utilidade declarada de etapas (Q13, 20/24) e de painéis (Q14, 17/24), e dificuldade com indicadores (Q09e, 14/24). Por isso as etapas e os denominadores passaram a ser explicados na interface, como pede a prioridade P1 ("testar rótulos, origem temporal e denominadores").
- A distinção entre intenção, term sheet e dinheiro corresponde à linha "Fora do âmbito" das recomendações.

A paleta, a tipografia, o símbolo e a organização das telas são escolhas de design. Não existe evidência de que melhorem a compreensão ou a usabilidade. A prioridade P0 (observar tarefas com representantes dos três perfis) continua por fazer e é o passo necessário para avaliar esta revisão.
