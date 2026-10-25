# Revisão do relatório — atualização de 25 de outubro de 2026

O DOCX e o PDF foram editados diretamente no XML, preservando a estrutura, os estilos e as edições manuais. Não houve regeneração a partir do Git. As cópias anteriores e os respetivos hashes estão em `.local/report-2026-10-25/`. O documento continua com 72 páginas, 32 tabelas e 7 figuras. Origem: [guia de identidade](../design/identity.md) e [evidências](../verification/ui-review.md).

| Local (página impressa) | Alteração |
|---|---|
| 4.1 Visão geral da plataforma (25) | "A identidade visual foi preservada…" foi substituído pela descrição da revisão de 25 de outubro: identidade simplificada, trilho de localização, resultado de cada formulário, aviso de consulta e explicação das etapas; esquema, permissões e API inalterados |
| 5.8 Procedimentos de teste (44–45) | "Não foram repetidos testes que modificam dados…" foi substituído pelo relato da reexecução dos quatro cenários, das verificações axe nas páginas públicas e dos 53 itens complementares, com a nota de que criaram registos fictícios |
| Tabela 27 (45), linha "Interface e acessibilidade" | Critério alargado a "estados vazios e de erro"; resultado "Passou no cenário verificado (reexecutado em 25-10-2026)" |
| 5.13 Limitações (48) | Novo parágrafo: a revisão resulta de decisões de design, só a explicação de etapas e denominadores se relaciona com a pesquisa, e não houve avaliação com participantes |
| Apêndice B (9 entradas com `capture.spec.ts`) | "execuções anteriores…, não repetidas nesta revisão" passou a "suíte automatizada reexecutada com aprovação em 25-10-2026" |
| Sumário | 5.10 passou de 45 para 46 e 5.13 de 47 para 48, por deslocação de página. Os outros 69 títulos numerados mantiveram a página (comparação automática entre o PDF anterior e o novo) |

Validação: XSD do DOCX aprovada contra o original (+1 parágrafo); conversão para PDF com LibreOffice; páginas 25, 45 e 48 inspecionadas visualmente.

A secção seguinte (8 de outubro) mantém-se como registo; onde diverge, prevalece esta atualização. Continuam pendentes: avaliação de uso, revisão académica da codificação assistida, documentação do recrutamento, manual institucional e dados de aprovação.

---

# Revisão académica — atualização de 8 de outubro de 2026

O DOCX principal e a versão PDF foram revistos a partir dos ficheiros recuperados. A indisponibilidade de respostas registada em 7 de outubro foi resolvida. A secção histórica abaixo descreve a revisão anterior; as suas limitações sobre dados indisponíveis e comandos de regeneração **não representam o estado atual**.

## Alterações desta revisão

- Preservados originais em área privada, hashes e alterações existentes. O DOCX estava aberto; após o autor o fechar, confirmou-se que o hash em disco não mudara. Não se regenerou a partir do HEAD.
- Tema explicitado com Angola; resumo/abstract, problema, objetivos, metodologia, resultados, discussão e conclusão alinhados a 24 submissões consentidas. Identidade única não certificável.
- Capítulo 5 integra caracterização, distribuições por eixo, opiniões divergentes, análise aberta, discussão e verificação técnica separada. 32 tabelas e 7 figuras no documento, incluindo três gráficos da pesquisa.
- Apêndice A: instrumento recuperado, sem respostas nem contactos; Apêndice B: matriz revista com resultados e origens; Apêndice C: evidências e pendências atuais.
- Relato do autor sobre públicos de divulgação identificado como informação posterior. Canais, número convidado e período integral não inventados. Datas observadas: 5–10 fev. 2026.
- Contactos separados dos dados de análise; originais, textos individuais e codificações por registo ficam em `.local/research-2026-10-08/`, ignorada pelo Git. Nenhum participante contactado.
- Implementação/esquema/testes lidos, sem executar operações da aplicação ou BD. Atualizados o relato de paginação no navegador e a evidência histórica de quatro cenários de teste da interface.
- Fontes e edições ABNT reconferidas; sem alegação de acesso às normas integrais ou conformidade institucional. Não foi localizado manual específico do ISPTEC.

## Entregáveis e limites

[Análise reproduzível](../research/README.md), [decisões](../research/decisions.md), [fontes](../research/sources.md), [recomendações priorizadas](../research/recommendations.md) e [rastreabilidade](../traceability.csv).

Os resultados sustentam perceções do grupo consultado e correspondências parciais com o protótipo. Não demonstram eficácia, adoção ou aumento de financiamento. Pendentes: avaliação de uso, revisão académica da codificação assistida, documentação do recrutamento, manual e dados de aprovação. Capturas gráficas não disponíveis; total de referência coincide, mas não se compararam os gráficos das capturas.

Para esta revisão, usar apenas as instruções de `docs/research/README.md`. Os comandos antigos abaixo ficam como histórico e **não devem ser executados sobre o documento atual**.

---

## Registo histórico de 7 de outubro (superado nos pontos acima)

# Revisão académica e verificação de fontes

Revisão de 7 de outubro de 2026, diretamente em `docs/report/tcc_antonewton.docx`. O original permanece recuperável no Git; não foram inventadas respostas, participantes, datas de aplicação ou resultados de usabilidade. A versão de leitura é `tcc_antonewton.pdf`.

## Preservação e alterações

Mantidos instituição, curso, autor, orientador, natureza do trabalho, dedicatória, agradecimentos e sequência temática: introdução → fundamentação → metodologias → solução → discussão → segurança → implantação → conclusões → referências. A numeração passou a incluir introdução e conclusão (1–8), mantendo os seis capítulos temáticos originais. As subseções foram alinhadas ao âmbito real; a repetição de “Usabilidade” foi removida. “Índice” tornou-se “Sumário”. As tabelas originais vazias foram substituídas por tabelas com evidência ou indisponibilidade explícita, sem fabricar preenchimentos. Banca e aprovação permanecem em campos em branco; a data não confirmada do rascunho foi retirada. A epígrafe opcional sem localização verificável foi removida.

A antiga redação afirmava testes com utilizadores, módulos e segurança sem correspondência no código. A revisão distingue funcionalidades implementadas, controlos locais, trabalho futuro e validação empírica ausente. Não se afirma XP/Scrum integral nem sprints nas datas do planeamento antigo. O relatório não está academicamente aprovado: falta confirmar manual institucional, dados da defesa e componente empírica exigida.

Apêndice A: síntese dos eixos **descritos pelo autor** a partir de capturas. As imagens originais não estavam anexadas nesta execução nem no repositório; por isso não foi rotulada como transcrição literal conferida. Não foram completadas âncoras, numeração ou opções ausentes. Apêndice B: rastreabilidade, também disponível em CSV. Apêndice C: evidências e pendências.

## Normas e manual

A [página do Sistema Integrado de Bibliotecas da UFES](https://biblioteca.ufes.br/manuais-de-normalizacao), consultada em 7 out. 2026, identifica as edições NBR 14724:2024, 10520:2023, 6023:2025, 6028:2021, 6027:2012 e 6024:2012. A íntegra comercial das normas não foi consultada. Aplicaram-se as orientações verificáveis sobre estrutura, autor-data, referências correspondentes, resumo, sumário, numeração, legendas e fontes. Não foi encontrado o manual do ISPTEC: não se declara conformidade institucional integral. Fonte Times New Roman 12, A4, margens 3 cm superior/esquerda e 2 cm inferior/direita, corpo 1,5; referências e tabelas em espaço simples. Pré-textuais contados a partir da folha de rosto, sem número impresso; numeração visível a partir da introdução.

## Fontes utilizadas e alcance da conferência

| Fonte | Identificação verificada | Uso e limite |
|---|---|---|
| [Cohen e Hochberg (2014), repositório da University of Richmond](https://scholarship.richmond.edu/management-faculty-publications/54/) | Título, autores, ano e DOI 10.2139/ssrn.2418000 | Conceito de aceleração; não prova efeitos em Angola |
| [Cohen et al. (2019), Research Policy](https://www.sciencedirect.com/science/article/pii/S0048733319300939) | Título, volume 48(7), páginas 1781–1797, DOI 10.1016/j.respol.2019.04.003; metadados e resumo da editora indexados; abertura direta retornou 403 | Heterogeneidade do desenho; não leitura integral declarada |
| [Gompers e Lerner (2001), American Economic Association](https://www.aeaweb.org/articles?id=10.1257/jep.15.2.145) | Título, autores, JEP 15(2), 145–168, DOI 10.1257/jep.15.2.145 e resumo | Mecanismos do processo de capital de risco; sem transposição automática para Angola |
| [Davis (1989), AIS eLibrary](https://aisel.aisnet.org/misq/vol13/iss3/6/) | Autor, título, periódico, volume/número/ano; paginação 319–340 conferida no registo bibliográfico | Utilidade/facilidade percebida; não comprova aceitação do protótipo |
| [Hevner et al. (2004), AIS eLibrary](https://aisel.aisnet.org/misq/vol28/iss1/10/) | Autores, título, MIS Quarterly 28(1), resumo; paginação 75–105 na identificação bibliográfica | Construção e avaliação do artefacto; sem alegar protocolo completo de design science |
| [World Bank Group, Angola Digital Economy Diagnostic Report](https://documents1.worldbank.org/curated/en/099021406262319882/pdf/IDU0cfa535a90914f043630bb860ddc79fa75def.pdf) | PDF oficial, copyright 2023 e secção de empreendedorismo; [catálogo](https://www.worldbank.org/en/programs/all-africa-digital-transformation/country-diagnostics) indica maio de 2023 | Contexto angolano, sem inferir frequência de problemas pós-aceleração. Há sugestão interna de citação com 2020; adotado 2023 com divergência explicitada |
| [Visible](https://visible.vc/) e [DocSend](https://www.docsend.com/solutions/startup-fundraising/) | Páginas oficiais consultadas | Comparação de capacidades declaradas, sem conta, benchmark ou prova de resultados |
| [node-postgres: Pooling](https://node-postgres.com/features/pooling) | Documentação oficial | Gestão das ligações e libertação de clientes |
| [PostgreSQL 16: SQL Dump](https://www.postgresql.org/docs/16/backup-dump.html) | Documentação oficial da versão | Backup/restauro e consistência do dump |
| Next.js 16.2.7, documentação local | `01-app/01-getting-started/15-route-handlers.md`, `02-guides/authentication.md`, `03-api-reference/04-functions/cookies.md` | APIs efetivamente usadas; consulta anterior às alterações |

Todas as fontes acima foram consultadas em 7 out. 2026. As referências sem data de publicação explícita usam `[s. d.]`. Não foram inventados DOI, páginas de citação literal ou dados de Angola. O texto utiliza paráfrases limitadas ao conteúdo conferido; as fontes não consultadas do rascunho foram retiradas com as afirmações que dependiam delas.

## Regeneração e inspeção

```bash
python3 -m venv .tools-venv
.tools-venv/bin/pip install python-docx cairosvg
.tools-venv/bin/python scripts/diagrams.py
.tools-venv/bin/python scripts/revise-report.py
libreoffice -env:UserInstallation=file:///tmp/seed-lo-uno --headless \
  --accept='socket,host=localhost,port=2017;urp;StarOffice.ComponentContext' \
  --norestore --nodefault --nofirststartwizard
# Noutro terminal (requer python3-uno):
/usr/bin/python3 scripts/render-report.py
```

O script de conteúdo reconstitui **esta revisão** a partir do modelo no HEAD; não o execute sobre edições manuais posteriores sem as preservar. O script UNO atualiza o sumário, as referências de página e guarda o DOCX antes do PDF. Verifique as versões no ambiente antes de o reutilizar noutra máquina.

A inspeção inclui extração textual, correspondência entre títulos/sumário, listas de figuras/tabelas com páginas, visualização de páginas de capa, diagramas, tabelas e referências. As fontes de diagrama estão em SVG; a versão Mermaid editável acompanha `docs/architecture.md`. O PDF não é um relatório paralelo: é a versão de leitura do DOCX atualizado.

## Verificação final da atualização de 8 de outubro

Entrega atual: 72 páginas, 32 tabelas e 7 figuras. Sumário/listas atualizados; renderização inspecionada e contactos ausentes dos artefactos públicos. Consultar [validação](../research/validation.md) para o alcance preciso, incluindo as verificações independentes e limites. Os originais continuam na área privada; aplicação, interface e base não foram alteradas nesta fase.
