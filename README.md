# SEED

SEED e uma plataforma para conectar startups aceleradas a capital inteligente, com foco em processos seguros de investor pipeline, data room e due diligence.

Este repositorio esta a ser preparado como base do trabalho de fim de curso.

## Identidade visual

Tagline: `A ponte segura entre startups aceleradas e capital inteligente.`

Tipografia principal: `Manrope`, carregada com `next/font`.

Paleta:

| Cor | Hex | Uso |
| --- | --- | --- |
| Petroleum Green | `#0F3D3E` | Cor primaria, fundos institucionais, texto de marca |
| Petroleum Green | `#145A5B` | Cor secundaria, destaques e estados |
| Petroleum Green Tint | `#DCEBE9` | Superficies suaves e badges |
| Soft Gold | `#C9A227` | Acento principal, progresso e chamadas de atencao |
| Soft Gold | `#E6D39A` | Acento secundario |
| Soft Gold Tint | `#F7F2E3` | Fundo quente e texto sobre verde escuro |

Assets da marca:

- `public/brand/seed-mark.svg`
- `public/brand/seed-logo.svg`
- `public/brand/seed-icon.svg`
- `public/brand/seed-hero-visual.svg`
- `public/brand/seed-identity-board.png`
- `app/icon.svg`

## Stack

- Next.js `16.2.7` com App Router
- React `19.2.4`
- Tailwind CSS `4`
- shadcn/ui
- lucide-react

Nota: este projeto usa uma versao recente do Next.js. Antes de alterar APIs, convencoes ou estrutura de rotas, consulte a documentacao local em `node_modules/next/dist/docs/`, conforme indicado em `AGENTS.md`.

## Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:3000`.

Outros comandos:

```bash
npm run lint
npm run build
npm run start
```

## Estrutura inicial

- `app/layout.tsx`: metadados, idioma e fonte global.
- `app/globals.css`: tokens da identidade visual, tema shadcn/Tailwind e estilos base.
- `app/page.tsx`: rota inicial que compoe a landing page.
- `app/(auth)/login/page.tsx`: pagina de entrada na plataforma.
- `app/(auth)/signup/page.tsx`: pagina de criacao/solicitacao de acesso.
- `app/(startup)/startup/page.tsx`: redireciona a area da startup para o dashboard.
- `app/(startup)/startup/dashboard/page.tsx`: visao geral clara da prontidao, metricas e proximas acoes.
- `app/(startup)/startup/profile/page.tsx`: identidade, contactos, proposta de valor e marcos da startup.
- `app/(startup)/startup/profile/edit/page.tsx`: wizard de edicao do perfil institucional.
- `app/(startup)/startup/profile/preview/page.tsx`: pre-visualizacao do perfil partilhavel com investidores.
- `app/(startup)/startup/pitch/page.tsx`: area dedicada apenas a narrativa e materiais de pitch.
- `app/(startup)/startup/pitch/wizard/page.tsx`: wizard de narrativa de investimento.
- `app/(startup)/startup/pitch/deck/page.tsx`: pre-visualizacao do pitch deck.
- `app/(startup)/startup/metrics/page.tsx`: tracao, crescimento e indicadores operacionais.
- `app/(startup)/startup/funding/page.tsx`: objetivo de captacao, instrumento, runway e uso dos fundos.
- `app/(startup)/startup/funding/request/page.tsx`: wizard do pedido de captacao.
- `app/(startup)/startup/team/page.tsx`: equipa fundadora e responsabilidades.
- `app/(startup)/startup/team/new/page.tsx`: wizard para adicionar membro da equipa.
- `app/(startup)/startup/documents/page.tsx`: documentos do data room e estados de preparacao.
- `app/(startup)/startup/documents/new/page.tsx`: wizard para adicionar documento ao data room.
- `app/(startup)/startup/documents/[documentId]/page.tsx`: detalhe de documento do data room.
- `app/(startup)/startup/checklist/page.tsx`: checklist de prontidao para investidores.
- `app/(startup)/startup/messages/page.tsx`: caixa de mensagens e formulario de resposta.
- `app/(startup)/startup/notifications/page.tsx`: central de notificacoes acionaveis.
- `app/(startup)/startup/settings/page.tsx`: preferencias e definicoes da startup.
- `app/(startup)/startup/settings/notifications/page.tsx`: preferencias detalhadas de notificacoes.
- `app/(investor)/investor/page.tsx`: redireciona a area do investidor para o dashboard.
- `app/(investor)/investor/dashboard/page.tsx`: visao geral do mandato, oportunidades, pipeline e due diligence.
- `app/(investor)/investor/profile/page.tsx`: perfil, tese e criterios do investidor.
- `app/(investor)/investor/profile/edit/page.tsx`: wizard de edicao do mandato do investidor.
- `app/(investor)/investor/opportunities/page.tsx`: oportunidades recomendadas por matching.
- `app/(investor)/investor/opportunities/[startupId]/page.tsx`: detalhe de oportunidade/startup para analise.
- `app/(investor)/investor/pipeline/page.tsx`: pipeline de investimento por fase e proxima acao.
- `app/(investor)/investor/diligence/page.tsx`: tarefas de due diligence do investidor.
- `app/(investor)/investor/data-rooms/page.tsx`: data rooms acessiveis ao investidor.
- `app/(investor)/investor/messages/page.tsx`: mensagens e formulario de resposta do investidor.
- `app/(investor)/investor/notifications/page.tsx`: central de notificacoes acionaveis do investidor.
- `app/(investor)/investor/settings/page.tsx`: preferencias e definicoes do investidor.
- `app/(investor)/investor/settings/notifications/page.tsx`: preferencias detalhadas de notificacoes.
- `app/(accelerator)/accelerator/page.tsx`: redireciona a area da aceleradora para o dashboard.
- `app/(accelerator)/accelerator/dashboard/page.tsx`: visao geral de programas, startups, pipeline e due diligence.
- `app/(accelerator)/accelerator/profile/page.tsx`: perfil institucional e foco da aceleradora.
- `app/(accelerator)/accelerator/profile/edit/page.tsx`: wizard de edicao do perfil da aceleradora.
- `app/(accelerator)/accelerator/startups/page.tsx`: startups acompanhadas pela aceleradora.
- `app/(accelerator)/accelerator/startups/[startupId]/page.tsx`: detalhe de acompanhamento de uma startup acelerada.
- `app/(accelerator)/accelerator/programs/page.tsx`: programas, cohorts e marcos da aceleradora.
- `app/(accelerator)/accelerator/pipeline/page.tsx`: pipeline de preparacao das startups.
- `app/(accelerator)/accelerator/diligence/page.tsx`: tarefas de due diligence da aceleradora.
- `app/(accelerator)/accelerator/data-rooms/page.tsx`: estados dos data rooms das startups.
- `app/(accelerator)/accelerator/messages/page.tsx`: mensagens e formulario de resposta da aceleradora.
- `app/(accelerator)/accelerator/notifications/page.tsx`: central de notificacoes acionaveis da aceleradora.
- `app/(accelerator)/accelerator/settings/page.tsx`: preferencias e definicoes da aceleradora.
- `app/(accelerator)/accelerator/settings/notifications/page.tsx`: preferencias detalhadas de notificacoes.
- `components/brand/`: componentes reutilizaveis do logotipo.
- `components/landing/`: secoes e dados da landing page.
- `components/auth/`: componentes partilhados de login e signup.
- `components/platform/`: componentes partilhados para shell, navegacao, header, inbox, formularios e wizards.
- `components/startup/`: shell, navegacao, widgets, dados e paginas modulares da area da startup.
- `components/investor/`: shell, wrappers, widgets, dados e paginas modulares da area do investidor.
- `components/accelerator/`: shell, wrappers, widgets, dados e paginas modulares da area da aceleradora.
- `lib/brand.ts`: dados centrais da marca.
- `lib/auth-actions.ts`: acoes provisorias dos formularios de autenticacao.
- `lib/startup-service.ts`: dados mockados e funcoes de leitura preparadas para substituir por API/backend.
- `lib/startup-actions.ts`: Server Actions provisorias para mutacoes futuras da area da startup.
- `lib/investor-service.ts`: dados mockados e funcoes de leitura preparadas para substituir por API/backend.
- `lib/investor-actions.ts`: Server Actions provisorias para mutacoes futuras da area do investidor.
- `lib/accelerator-service.ts`: dados mockados e funcoes de leitura preparadas para substituir por API/backend.
- `lib/accelerator-actions.ts`: Server Actions provisorias para mutacoes futuras da area da aceleradora.
