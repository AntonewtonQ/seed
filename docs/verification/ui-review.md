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
