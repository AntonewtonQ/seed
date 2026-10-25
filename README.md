# SEED — captação pós-aceleração

Protótipo académico para organizar rondas, negociações, interações, intenções e documentos de startups aceleradas em Angola. Funciona localmente com PostgreSQL real. Não processa pagamentos, não compra participações e não integra email ou assinatura eletrónica. **Soft commit, term sheet e dinheiro recebido são conceitos diferentes.** Não existe registo de desembolso neste âmbito.

## Abrir a demonstração nesta máquina

Aplicação: **http://localhost:3000/login**. A execução final usa `npm run start`, vinculada a 127.0.0.1. PostgreSQL exclusivo: `127.0.0.1:55432`, base `seed_local`.

As palavras-passe geradas estão apenas no ficheiro local [.local/demo-credentials.json](.local/demo-credentials.json), ignorado pelo Git. Abra-o no editor; não o publique.

| Email fictício | Papel |
|---|---|
| fundador@demo.seed.local | Startup principal |
| outra@demo.seed.local | Startup independente para testar isolamento |
| investidor@demo.seed.local | Investidor de exemplo |
| outro-investidor@demo.seed.local | Investidor independente |
| aceleradora@demo.seed.local | Aceleradora vinculada à startup principal |

## Instalação reproduzível

Ambiente verificado: Linux, Node.js **24.15.0**, npm **12.0.2**, PostgreSQL **16.15**; Next.js **16.2.7**, React **19.2.4**. Preserve o lockfile. Necessários `postgresql-16` e respetivos utilitários, `openssl`, Node/npm. Não é necessário Docker. As dependências do navegador Playwright podem exigir preparação do SO noutra máquina.

```bash
npm ci
npm run db:start
npm run db:migrate
npm run db:seed
npm run dev
```

Abra `http://localhost:3000`. Para build e execução local de produção:

```bash
npm run build
npm run start
```

Não execute dev e start na mesma porta simultaneamente. O script PostgreSQL reutiliza `/usr/lib/postgresql/16/bin`; pode definir `PGBIN` para outra localização compatível. A primeira execução cria `.local/postgres` com persistência em disco, socket em `.local`, acesso TCP SCRAM apenas por loopback e credenciais aleatórias em `.env.local` (0600). O diretório `.local` é 0700. A instância global 5432 foi preservada: o acesso administrativo exigia sudo indisponível.

O cluster dedicado tem o administrador `seed_owner`, acessível pelo socket privado do utilizador do SO. A aplicação liga por TCP como **seed_app**, sem SUPERUSER, CREATEDB ou CREATEROLE, sem propriedade do esquema e sem permissão para modificar/apagar transições e auditoria. As migrações usam a conta administrativa dedicada. Não use esse socket/administrador na aplicação.

`db:migrate` aplica apenas ficheiros ainda não registados em `schema_migrations`, com transação e bloqueio de migração. `db:seed` insere contas ausentes e vínculo demo, sem apagar dados ou redefinir palavras-passe existentes. Se `.env.local` se perder, o script falha na criação duplicada em vez de substituir credenciais: recupere a configuração pela administração local, preservando a base.

```bash
npm run db:stop
npm run db:start
```

Estes comandos atuam apenas no cluster `.local/postgres`. Não eliminam dados e não controlam a instância global. Não há serviço automático de arranque após reboot; volte a executar `db:start`.

## Configuração

Consulte [.env.example](.env.example). `DATABASE_URL` só é lida no servidor. `APP_ORIGIN=http://localhost:3000` define a origem aceite pelas alterações da API; aceda por **localhost**, não alterne com 127.0.0.1 no navegador. Alterar porta/origem exige atualizar a configuração local e reiniciar a aplicação. Cookies Secure são usados quando a origem é HTTPS; a demonstração verificada é HTTP local.

## Roteiro de demonstração

1. Entre como startup principal. No menu, abra **Meu perfil → Editar perfil**.
2. Em **Rondas → Abrir ronda**, defina a meta `1000000.25` e moeda AOA. Ao guardar, abre o detalhe da ronda.
3. No detalhe da ronda, escolha **Associar investidor**, selecione “Investidor Exemplo — demonstração” e indique o próximo passo.
4. No detalhe da negociação, abra **Interações → Registar interação** e registe uma reunião com data passada/presente. Em **Resumo → Atualizar negociação**, atualize também a etapa para Reunião; uma nota não altera automaticamente a etapa.
5. Atualize para Soft commit com valor `150000.50`. Depois registe Term sheet recebido. Estes registos não confirmam assinatura ou recebimento de dinheiro.
6. Em **Documentos → Anexar documento**, anexe um `.txt` ou PDF fictício até **2 MiB**. No detalhe, **Gerir acessos** permite conceder ou revogar acesso. O conteúdo, os metadados e as permissões ficam em PostgreSQL (`bytea`). Não há bucket público.
7. Numa janela privada, entre como investidor: o documento não aparece antes da concessão. Conceda acesso pela startup, descarregue como investidor e revogue pela startup. Nova descarga é recusada; cópias já descarregadas não podem ser recuperadas.
8. Observe os indicadores: sem reunião não há denominador; reunião sem soft commit resulta em 0%; reunião seguida de soft commit em 100% no cenário de uma relação. Veja [as fórmulas e os limites](docs/architecture.md#indicadores).
9. Entre como outra startup e outro investidor: não devem ver a negociação da primeira conta. A aceleradora vê negociações vinculadas, mas precisa de concessão documental explícita.
10. Recarregue e reinicie a aplicação: os dados permanecem. Encerrar a ronda bloqueia alterações de negociação; reabrir permite retomá-las. Documentos próprios podem ser eliminados; rondas e negociações conservam o histórico.

## Verificação

Com base e aplicação ativas:

```bash
npm run lint
npm run typecheck
npm test
```

Se necessário, instale o navegador com `npx playwright install chromium`. Os testes criam dados identificados como verificação e não apagam os registos existentes. A eliminação testada afeta apenas o documento criado pelo próprio teste. As credenciais de teste são lidas do ficheiro local; não são fixadas no código.

Depois de `npm test`, execute:

```bash
# Após parar e reiniciar apenas a aplicação SEED:
node scripts/check-persistence.mjs
# Interrompe e recupera exclusivamente a BD SEED; não executar durante uma demonstração:
node scripts/check-outage.mjs
bash scripts/backup-verify.sh
```

Resultados reais: [docs/verification/results.md](docs/verification/results.md). Testes de navegador não constituem validação com participantes nem prova de impacto financeiro.

## Backup e restauro

`bash scripts/backup-verify.sh` usa os utilitários PostgreSQL 16, cria dump custom em `.local/backups`, restaura numa **base nova**, compara contagens e hashes dos documentos e preserva origem e restauro. O script não apaga bases. Execute quando não há escritas para comparar contagens; o dump em si é consistente. Dumps incluem dados e credenciais cifradas por hash: mantenha-os privados e fora do Git. Não existe backup agendado.

Restauro manual para inspeção, com um nome novo:

```bash
export PGHOST="$PWD/.local" PGPORT=55432 PGUSER=seed_owner
/usr/lib/postgresql/16/bin/createdb -T template0 seed_recovery_review
/usr/lib/postgresql/16/bin/pg_restore --exit-on-error --single-transaction \
  -d seed_recovery_review .local/backups/SELECIONE_O_DUMP.dump
```

Não altere DATABASE_URL até verificar os dados e as permissões. Não restaure sobre `seed_local`, não use `--clean`, nem apague a origem. Noutro cluster, prepare os papéis referidos no dump antes do restauro. Esta entrega não migrou uma base anterior: só existiam dados simulados no código.

## Arquitetura e relatório

- [Arquitetura, modelo de dados, permissões, sequência e fórmulas](docs/architecture.md).
- [Matriz de rastreabilidade](docs/traceability.csv).
- [Relatório principal editável, revisto no local original](docs/report/tcc_antonewton.docx).
- [Versão de leitura PDF](docs/report/tcc_antonewton.pdf).
- [Fontes verificadas e decisões editoriais](docs/report/revision-notes.md).

A pasta existente do relatório é `docs/report`; não havia uma pasta `report` na raiz. Foi atualizado o DOCX original, mantendo identidade institucional e sequência temática. As seis áreas de desenvolvimento do texto foram preservadas; introdução e conclusão integraram a numeração progressiva. O código da identidade e dos protótipos anteriores foi conservado. As rotas dessas áreas encaminham para `/workspace`, e as antigas ações deixaram de simular sucesso. A landing foi alinhada ao âmbito, retirando métricas comerciais fictícias.

A área autenticada utiliza `app/workspace` e `components/workspace` → Route Handler → serviços em `lib/server` → pool `pg` → PostgreSQL. O layout autentica e carrega os dados no servidor; os formulários comunicam com a API. Não há credenciais no cliente. Leia `AGENTS.md` e a documentação local Next.js antes de alterar o código.

### Navegação por perfil

Depois do login, `/workspace` apresenta um painel operacional adequado à conta. A raiz `/` também encaminha sessões existentes para esse painel. Cada tarefa tem um endereço próprio, com lista, detalhe e formulário separados.

| Perfil | Página inicial | Secções do menu |
|---|---|---|
| Startup | Próximos passos, começando pelas negociações sem próximo passo | Meu perfil, Rondas, Negociações, Documentos, Indicadores |
| Investidor | Oportunidades associadas à sua organização | Oportunidades, Documentos |
| Aceleradora | Startups vinculadas e acompanhamento | Startups, Rondas, Negociações, Documentos, Indicadores |

Os painéis apresentam até três contagens e até quatro registos. Cada tela interna tem um trilho de localização (em telemóvel, o nível acima) e cada formulário indica o que acontece depois de guardar. Investidores e aceleradoras veem um aviso de que só consultam. As listas têm pesquisa e paginação de oito registos; o detalhe da negociação separa resumo, interações e histórico. Em telemóvel, o botão **Menu** abre a navegação. Ações indisponíveis para o papel não são apresentadas; a autorização continua a ser aplicada no servidor. Evidências da revisão: [interface por tarefa](docs/verification/ui-review.md). Identidade, componentes e regras de escrita: [guia de identidade](docs/design/identity.md).

## Limites académicos e operacionais

Em 8 de outubro de 2026 foram recuperados o instrumento e as respostas: 24 submissões consentidas foram analisadas, sem certificar 24 participantes únicos. O relatório integra resultados descritivos e respostas abertas; [análise reproduzível e limites](docs/research/README.md). A análise posterior confronta decisões de projeto já existentes, sem atribuir retroativamente todas as funcionalidades aos resultados. As capturas de gráficos mencionadas não estavam disponíveis para comparação visual.

A avaliação da ideia não demonstra usabilidade, adoção, eficácia ou aumento de financiamento. O manual institucional, banca/data de aprovação e a avaliação futura de tarefas permanecem pendentes. A versão é local, sem cadastro público, recuperação de senha, email, assinatura eletrónica, pagamentos, antivírus, pentest, teste de carga ou certificação jurídica.

## Revisão do relatório

O [DOCX](docs/report/tcc_antonewton.docx) é a entrega editável principal; o [PDF](docs/report/tcc_antonewton.pdf) é a versão de leitura inspecionada. Preserve edições manuais posteriores. **Não execute `scripts/revise-report.py` para recuperar esta versão:** o script antigo usa o HEAD Git e conteúdo anterior à análise dos dados.

A receita da revisão de 8 de outubro usa `scripts/integrate-research-report.py` sobre a cópia privada preservada e `scripts/render-research-report.py` sobre um candidato privado. Consulte [procedimento, análise e artefactos](docs/research/README.md) e [notas de revisão](docs/report/revision-notes.md). Gráficos de pesquisa em `docs/research/figures`; diagramas técnicos em `docs/report/figures`.

A atualização de 25 de outubro de 2026 alinhou o relatório com a revisão da interface por edição direta do XML do DOCX atual, sem scripts de regeneração. As alterações e a validação estão em [notas de revisão](docs/report/revision-notes.md).
