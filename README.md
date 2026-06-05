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
- `components/brand/`: componentes reutilizaveis do logotipo.
- `components/landing/`: secoes e dados da landing page.
- `lib/brand.ts`: dados centrais da marca.
