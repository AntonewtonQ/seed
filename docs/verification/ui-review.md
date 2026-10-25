# Revisão da interface por tarefa

Execução: 8 de outubro de 2026, aplicação local em `http://localhost:3000`, build de produção Next.js e PostgreSQL persistente. Dados exclusivamente demonstrativos e de teste.

## Alterações verificadas

- Startup: painel de acompanhamento, perfil, rondas, negociações, documentos e indicadores.
- Investidor: painel de oportunidades e documentos autorizados.
- Aceleradora: painel de startups vinculadas, rondas, negociações, documentos autorizados e indicadores.
- Cada criação ou edição abre uma página própria; os painéis não contêm formulários. O detalhe da negociação separa resumo, interações e histórico.
- Listas gerais com pesquisa e paginação de oito registos. Painéis limitados a três contagens e quatro linhas de acompanhamento.
- Menu lateral em desktop e menu recolhível em telemóvel. Voltar, cancelar, estado ativo e mensagens após guardar preservam o contexto da tarefa.
- Acesso à raiz com sessão encaminha para a área operacional.

## Resultados reais

| Verificação | Resultado |
|---|---|
| `npm run build` | Aprovado |
| `npm run lint` | Aprovado |
| `npm run typecheck` | Aprovado |
| `npm test` | 4 cenários aprovados, 11,2 s na execução final |
| `git diff --check` | Sem erros |
| `node scripts/check-persistence.mjs`, após reiniciar a aplicação | Ronda, negociação, estado e conteúdo documental preservados |

O cenário HTTP em `tests/capture.spec.ts` verifica o fluxo persistente, isolamento por organização/recurso, indicadores e integridade. Os três cenários em `tests/workspace-ui.spec.ts` verificam:

1. Startup: login, criação de ronda, associação de investidor, interação, transições reunião → soft commit, histórico, recarga, indicador de conversão de 100% com denominador 1, upload, concessão/revogação, cancelamento e confirmação de eliminação do documento criado pelo próprio teste, pesquisa, paginação e formulário de perfil em telemóvel.
2. Investidor: painel próprio, navegação móvel, consulta, ausência de ações de escrita, recusa visual de rotas de criação/edição e encerramento de sessão.
3. Aceleradora: painel próprio, startups acompanhadas, navegação móvel, consulta, restrições de escrita e encerramento de sessão.

Foram executadas verificações axe-core WCAG 2 A/AA nos painéis dos três perfis (1440 × 1000 e 390 × 844), em listas/detalhes de consulta, no formulário de ronda, nos indicadores e no formulário móvel de perfil. Zero violações nas páginas examinadas; sem transbordo horizontal nessas verificações. Um erro semântico na lista de definições dos indicadores foi detetado e corrigido antes da execução final. Isto não equivale a certificação de acessibilidade nem a avaliação de usabilidade com participantes.

Capturas reais inspecionadas visualmente:

- [Startup — desktop](ui-startup-desktop.png) e [telemóvel](ui-startup-mobile.png).
- [Investidor — desktop](ui-investor-desktop.png) e [telemóvel](ui-investor-mobile.png).
- [Aceleradora — desktop](ui-accelerator-desktop.png) e [telemóvel](ui-accelerator-mobile.png).
- [Formulário dedicado de abertura de ronda](ui-round-form.png).

Os números nas capturas provêm dos registos fictícios persistidos, incluindo execuções anteriores dos testes. Não representam respostas ao questionário ou impacto financeiro. Os testes não limpam a base nem apagam dados preexistentes. Logs locais: `.local/ui-build.log`, `ui-lint.log`, `ui-typecheck.log`, `ui-tests.log`, `ui-persistence.log` e `test-results.json`; credenciais não são incluídas nas evidências públicas.

Esta revisão mantém o esquema e as regras de autorização existentes. A pesquisa/paginação é feita sobre o conjunto autorizado carregado no navegador; paginação no servidor fica para conjuntos maiores. A atualização de permissões concedidas por outra conta torna-se visível ao recarregar a página; cada descarga é sempre autorizada novamente no servidor.

---

# Identidade visual e comunicação — 25 de outubro de 2026

Execução local: build de produção (`npm run build` + `npm run start`) e PostgreSQL do projeto em `127.0.0.1:55432`, com dados demonstrativos e de teste. As capturas listadas acima foram **substituídas** pelas desta execução; as de 8 de outubro continuam recuperáveis no Git (commit `c2ceef4`). O guia está em [docs/design/identity.md](../design/identity.md).

## Problemas encontrados e respostas

| Problema | Alteração |
|---|---|
| Identidade com petróleo, dourado e creme, barra lateral escura, Manrope e animações na página inicial | Superfícies neutras, um único acento petróleo, Inter, barra lateral clara e tokens únicos em `app/globals.css` |
| Marca (ponto, parênteses e seta) ilegível a 16–24 px | Novo símbolo vetorial: rebento num quadrado arredondado; ícone e favicon regenerados |
| Página inicial e entrada com termos que exageram o sistema ("Due diligence estruturada", "Investor Pipeline", "Data Room") | Página inicial com quatro blocos e a lista "O que o SEED não faz"; entrada num só painel |
| Um único "← voltar" não mostrava a cadeia startup → ronda → negociação | Trilho de localização em todas as telas internas (em telemóvel, só o nível acima). O detalhe da negociação liga à ronda |
| Formulários sem indicação do resultado; mensagem genérica "Alteração guardada." | Nota "o que acontece depois" junto do botão; mensagens próprias ("Ronda aberta. Já pode associar investidores.", "Acesso concedido."…) |
| "Cancelar" como link num lado e botão noutro; "Eliminar" igual a "Gerir acessos"; "Encerrar ronda" como link sem consequência | "Cancelar" sempre como botão secundário; eliminar em vermelho; encerrar ronda numa secção própria que explica o efeito; a confirmação de eliminação indica quantas organizações perdem acesso |
| Contagem "Documentos disponíveis" sem decisão associada no painel da startup | Substituída por "Sem próximo passo", e essas negociações aparecem primeiro na lista |
| Investidor e aceleradora sem explicação para a ausência de ações | Aviso "Só consulta" nos detalhes de negociação, ronda, perfil e documento partilhado |
| Etapas e regras de validação conhecidas só pelo erro do servidor | Ajuda "O que significa cada etapa?" e indicações por campo ("Obrigatório na etapa Soft commit") |
| Erro do servidor no topo da página enquanto a pessoa estava junto do botão | O alerta entra no ecrã e recebe foco |
| Formulário de associação oferecia investidores já associados à ronda (a base impõe um par único) | A lista de investidores é filtrada pela ronda escolhida |
| Carregamento, erro e indisponibilidade sem estilo | Estados com a mesma identidade e uma ação de recuperação |

Sem alterações em rotas, API, esquema, migrações, regras de autorização ou cálculo de indicadores.

## Resultados reais

| Verificação | Resultado |
|---|---|
| `npm run build` | Aprovado |
| `npm run lint` | Aprovado. Foram excluídos `.tools-venv/` e `.local/` (já ignorados pelo Git); antes, o lint falhava com 5 erros em JavaScript do matplotlib dentro de `.tools-venv/` |
| `npm run typecheck` | Aprovado |
| `git diff --check` | Sem erros |
| `npm test` | 4 cenários aprovados (fluxo persistente e isolamento via HTTP; startup, investidor e aceleradora no navegador, com axe-core) |
| Páginas públicas `/`, `/login`, `/login?status=invalid`, `/signup` (1440 × 1000 e 390 × 844) | axe-core WCAG 2 A/AA: 0 violações; sem transbordo horizontal |
| Verificação complementar da área autenticada (53 itens, desktop e telemóvel) | Todos aprovados |
| `node scripts/check-persistence.mjs` | Aprovado |

A verificação complementar (script temporário, não versionado; resultado em `.local/identity-workspace-check.log`) cobriu:
- **Investidor e aceleradora:** detalhe de negociação com aviso de consulta e sem "Atualizar negociação"; detalhe de ronda sem encerrar/reabrir; documentos; `/workspace/rounds/new` recusada.
- **Startup:**
  - Primeiro Tab mostra "Saltar para o conteúdo" e o segundo tem contorno de foco.
  - Pesquisa sem resultados e "Limpar pesquisa".
  - Detalhes de negociação e de ronda, formulário com a ajuda das etapas aberta, confirmação de eliminação e indicadores.
  - Soft commit sem valor: o servidor recusa e o alerta fica visível e focado. Nada é gravado.
- **Estados vazios:** conta de investidor sem negociações.
- **Indisponibilidade:** com o PostgreSQL parado, a área mostra "Serviço temporariamente indisponível". Depois de reiniciar a base, a sessão mantém-se e o painel volta.
- axe-core e ausência de transbordo em cada uma destas telas.

Os seletores dos testes foram atualizados para os novos rótulos ("Email", "Entrar", "Data e hora", "Descrição", "Histórico"). O cenário da startup falhou 1 vez em 3 execuções consecutivas: o teste premia Tab logo após a mudança de URL, antes de o conteúdo ser substituído. O teste passou a esperar pelo título "Meu perfil"; depois disso, foram aprovadas 5 execuções seguidas e a suíte completa.

Durante a revisão, as capturas revelaram e permitiram corrigir:
- Logótipo invisível na barra lateral (tom claro sobre branco).
- Desalinhamento horizontal nas secções da página inicial.
- Nome da startup repetido no detalhe visto pelo investidor.
- Notas incluídas no nome acessível dos campos.
- Alerta de erro fora do ecrã.

## Capturas

- Página inicial: [desktop](landing-desktop.png), [telemóvel](landing-mobile.png). Entrada: [desktop](login-desktop.png), [telemóvel](login-mobile.png).
- Startup: [painel](ui-startup-desktop.png), [painel em telemóvel](ui-startup-mobile.png), [ronda](ui-startup-round.png), [negociação](ui-startup-opportunity-desktop.png), [negociação em telemóvel](ui-startup-opportunity-mobile.png), [formulário de ronda](ui-round-form.png), [ajuda das etapas](ui-stage-help.png), [erro do servidor](ui-error-feedback.png), [confirmação de eliminação](ui-delete-confirm.png), [indicadores](ui-metrics.png).
- Investidor: [painel](ui-investor-desktop.png), [telemóvel](ui-investor-mobile.png), [negociação](ui-investor-opportunity.png), [ronda em telemóvel](ui-investor-round-mobile.png).
- Aceleradora: [painel](ui-accelerator-desktop.png), [telemóvel](ui-accelerator-mobile.png), [negociação](ui-accelerator-opportunity.png), [ronda em telemóvel](ui-accelerator-round-mobile.png).
- Estados: [vazio em desktop](ui-empty-desktop.png), [vazio em telemóvel](ui-empty-mobile.png), [serviço indisponível](ui-unavailable.png).

As contagens e os nomes nas capturas vêm de registos fictícios, incluindo rondas criadas pelos testes ("Verificação …", "Ronda de interface …"). Não representam respostas ao questionário nem impacto financeiro.

Logs locais: `.local/identity-build.log`, `identity-tests.log`, `identity-public.log`, `identity-workspace-check.log` e `identity-persistence.log`. O relatório JSON de 8 de outubro foi preservado em `.local/test-results-2026-10-08.json`.

## Limites

- Verificação técnica e inspeção visual pelo autor do código. **Não é** avaliação de usabilidade com participantes; a clareza da nova comunicação não foi medida.
- O estado de carregamento existe, mas não foi capturado (é demasiado breve em execução local).
- Os testes acrescentam registos à base de demonstração e não a limpam.
