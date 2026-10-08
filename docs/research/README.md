# Análise dos dados recuperados — 8 de outubro de 2026

Esta pasta contém os artefactos agregados que sustentam a revisão do **relatório principal** em `docs/report/tcc_antonewton.docx` e respetivo PDF. Não substitui os capítulos do TFC. Nenhum ficheiro individual, contacto, captura identificável ou exportação bruta deve ser adicionado ao Git.

## Resultado e alcance

- Uma folha XLSX, 24 submissões, 33 colunas; 24 consentimentos afirmativos, 24 registos incluídos, zero exclusões. Identidade única dos participantes **não verificável**.
- 17 perfis autodeclarados de startup, 3 de investidor, 2 de aceleradora e 2 outros; não se verificou elegibilidade profissional ou programa de aceleração. Os outros perfis foram conservados e agrupados no relatório para reduzir exposição.
- Datas observadas: 5–10 de fevereiro de 2026; fuso não indicado. Não equivalem ao período completo de divulgação.
- PDF recuperado: 240 páginas = 24 blocos individuais com instrumento e respostas. Não é um resumo de gráficos. Conferência de texto e marcas em 499 verificações: zero divergências no âmbito descrito em `pdf-crosscheck.json`.
- A referência comunicada de 24 respostas nas capturas coincide com a exportação. Capturas dos gráficos não foram anexadas/localizadas; não se declara comparação visual desses gráficos.
- O autor informou nesta execução divulgação entre estudantes, colaboradores/diretores de startups, investidores do mercado formal/bolsa e colaboradores da Anda Angola. Fonte: relato do autor em 08-10-2026; canais, total de convidados e período integral não documentados. Essa informação não foi inferida dos perfis nem transformada em amostragem probabilística.

## Ficheiros

| Artefacto | Conteúdo |
|---|---|
| `provenance.json` | SHA-256 e proveniência dos originais e fontes locais utilizadas |
| `audit.json` | Folhas, dimensões, consentimento, duplicações, datas e contactos agregados |
| `pdf-crosscheck.json` | Alcance e resultado da correspondência PDF/XLSX |
| `variable-dictionary.csv` | 33 colunas, perguntas, identificadores, tipos, ordem, obrigatoriedade e páginas |
| `tables/frequencies.csv` | Frequências/percentagens por pergunta ou linha de grelha; categorias zero conservadas |
| `tables/missingness.csv` | Presença/ausência por coluna |
| `tables/qualitative.csv` | Categorias, contagens, dois denominadores e regras reproduzíveis |
| `tables/subgroups.csv` | Contagens por perfil; sem inferência ou cruzamento geográfico |
| `aggregate.json` | Agregados usados na integração do relatório e nos gráficos |
| `figures/` | Três gráficos em PNG e SVG, produzidos apenas de agregados |
| `decisions.md` | Inclusão, normalização, codificação, ética e limites |
| `recommendations.md` | Evolução futura priorizada, sem alterações na aplicação |
| `sources.md` | Verificação bibliográfica, normas e limites de acesso |

## Reprodução

Ferramentas usadas: Python 3.14, openpyxl 3.1.5, PyMuPDF 1.28.2, matplotlib 3.11.2, python-docx 1.2.0; LibreOffice/UNO para o candidato documental. As versões instaladas efetivas estão também em `analysis-environment.txt`.

```bash
python3 -m venv .tools-venv
.tools-venv/bin/pip install -r docs/research/requirements.txt
.tools-venv/bin/python scripts/analyze-questionnaire.py --xlsx '/caminho/privado/Respostas.xlsx'
.tools-venv/bin/python scripts/plot-questionnaire.py
# Exige cópias privadas na pasta abaixo, com os nomes originais:
.tools-venv/bin/python scripts/check-questionnaire-pdf.py
```

As cópias originais desta revisão estão em `.local/research-2026-10-08/` (ignorada, diretório 0700). A análise escreve nessa área `contacts.json`, `analysis-rows.json` (sem contactos nem carimbos) e `coding-reviewed.json`, além de `normalizations.json` com alterações por célula. Mesmo sem contactos, textos individuais continuam privados. Não há acesso a rede ou à base da aplicação nos scripts de análise. A reprodução dos resultados requer acesso autorizado ao XLSX privado; não se oferece um dataset público individual.

O script usa os cabeçalhos e a ordem do corpus recuperado. Falha se o esquema, N ou respostas múltiplas desconhecidas exigirem revisão; não deve ser aplicado silenciosamente a novas recolhas. As regras de codificação reproduzem este corpus após leitura integral, não substituem análise humana de dados novos. Para comparar saídas, executar em cópia do repositório ou guardar hashes dos agregados antes/depois.

## Preservação do relatório

O DOCX estava aberto, alterado relativamente ao Git e com bloqueio do LibreOffice. O autor fechou-o a pedido; o hash em disco permaneceu igual ao da cópia preservada. Não havia marcações XML de inserção/eliminação pendentes. Foram preservados identificação, dedicatória, agradecimentos, estilos e conteúdo técnico válido.

`integrate-research-report.py` lê **a cópia privada desta revisão**, não o HEAD do Git, e produz um candidato privado. `render-research-report.py` apenas abre esse candidato num perfil UNO isolado, atualiza o sumário/listas e exporta PDF. Não executar `scripts/revise-report.py` para reproduzir esta revisão: esse script antigo reconstitui uma versão anterior e pode apagar trabalho posterior. Os scripts de integração são uma receita desta revisão, não um editor genérico; qualquer edição posterior do principal deve ser preservada antes de nova integração.

A revisão desta fase não executou migrações, comandos da aplicação, testes que criam dados, contactos a participantes, deploy ou publicação. A correspondência técnica foi verificada por leitura de código/esquema/testes e dos registos anteriores. A avaliação futura de tarefas e impacto continua pendente.

Para reproduzir apenas o candidato documental desta revisão (exige a cópia privada original preservada):

```bash
.tools-venv/bin/python scripts/integrate-research-report.py
# Terminal separado, perfil exclusivo; não reutilizar a sessão de edição do autor:
libreoffice -env:UserInstallation=file:///tmp/seed-research-review-20261008 --headless \
  --accept='socket,host=localhost,port=2028;urp;StarOffice.ComponentContext' \
  --norestore --nodefault --nofirststartwizard
# Noutro terminal, com python3-uno instalado:
/usr/bin/python3 scripts/render-research-report.py
```

O resultado fica privado. Antes de substituir o principal, verificar bloqueio/alterações, preservar a versão corrente e inspecionar o PDF. A [validação desta entrega](validation.md) e os [hashes dos resultados](delivery-manifest.json) registam a verificação executada.
