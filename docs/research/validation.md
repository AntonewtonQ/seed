# Validação da entrega documental — 8 out. 2026

- DOCX principal guardado a partir do candidato privado; PDF correspondente **72 páginas A4**, com **32 tabelas e 7 figuras**. Sumário nativo atualizado por LibreOffice; 39 remissões das listas conferidas automaticamente contra a página impressa do conteúdo. Capa não contada; introdução inicia na página impressa 15.
- Inspeção visual: miniaturas de todas as 72 páginas e ampliação de páginas com tabelas ordinais, funcionalidades/gráfico, categorias abertas e referências. Tabelas novas com fonte de 10 pt, cabeçalhos repetíveis, colunas ajustadas e linhas preservadas; legendas e fontes presentes. Sem blocos textuais fora da página. Diagramas técnicos originais preservados.
- Leitura integral do DOCX de origem, incluindo dez tabelas, e inspeção das 240 páginas do PDF recuperado por extração/conferência programática; inspeção visual de consentimento, grelha e seleção múltipla. O PDF recuperado não foi incluído no relatório porque contém respostas e contactos.
- 499 verificações PDF/XLSX sem divergência no âmbito declarado em `pdf-crosscheck.json`. Não se afirma conferência de gráficos de capturas ausentes ou de todos os itens fechados por descodificação gráfica.
- 118 verificações independentes de frequências contra a leitura XML original e 141 percentagens conferidas. Categorias múltiplas verificadas por opções completas. Totais qualitativos conferidos: 13, 57 e 10 atribuições, com bases de conteúdo 11, 24 e 8.
- Dedicatória e agradecimentos preservados textualmente. Documento original sem revisões XML pendentes; fecho confirmado pelo autor e hash em disco sem mudança antes da substituição. Originais e cópias anteriores privados.
- Pesquisa de contactos: zero padrões de email no PDF; nenhum dos contactos do XLSX encontrado no XML do DOCX, na matriz ou nos artefactos públicos de pesquisa. Sem dados individuais nos apêndices. A pasta privada tem modo 0700 e ficheiros 0600; `git check-ignore` confirma exclusão.
- Correspondência técnica verificada por leitura de `lib/server`, migrações e testes; hashes dos ficheiros de implementação consultados mantidos. Nenhum teste da aplicação/BD foi executado nesta revisão. Resultados técnicos de execução citados são os documentados em 7–8 de outubro.
- `git diff --check` sem erros. Alterações preexistentes no código preservadas; sem commit, publicação, deploy ou contacto a participantes.

## Limites da inspeção

Não se declara conformidade integral ABNT/ISPTEC, revisão por orientador, concordância entre codificadores, identidade dos participantes, usabilidade humana ou eficácia. A codificação assistida por IA deve ser apreciada academicamente pelo autor. O manual institucional, dados da banca/aprovação e detalhes documentais do recrutamento continuam pendentes.

O cliente Python/UNO apresentou falha de encerramento nas primeiras renderizações, depois de guardar os ficheiros. O script final encerra o documento e evita a falha de destruição da ponte UNO; execução final terminou com código 0. Os ficheiros finais foram reabertos e conferidos, não se presumiu sucesso apenas pela existência da exportação.
