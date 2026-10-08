# Evidências de verificação — 7 de outubro de 2026

Ambiente local: Linux, Node 24.15.0, npm 12.0.2, Next.js 16.2.7, React 19.2.4 e PostgreSQL 16.15. Aplicação real em `http://localhost:3000`, ligada à base `seed_local` em 127.0.0.1:55432 como `seed_app`. Não houve deploy nem utilização de serviços externos de email/assinatura. O Git estava limpo antes do trabalho.

## Resultados

| Verificação executada | Resultado e limite |
|---|---|
| `npm run db:start` | Cluster exclusivo iniciado; instância global 5432 preservada |
| `npm run db:migrate` | `001_core.sql` e `002_integrity.sql` aplicadas; histórico persistido |
| `npm run db:seed` | Cinco contas fictícias, duas startups, dois investidores e uma aceleradora; credenciais locais privadas; repetição sem criar novas contas |
| Edição de perfil por HTTP | Alteração consultada na aplicação e descrição original reposta; auditoria preservada |
| `npm run lint` | Passou, sem erros ou avisos |
| `npm run typecheck` | Passou |
| `npm run build` | Passou; aplicação iniciada com `npm run start` |
| `npm test` | **2 cenários Playwright passaram**, abrangendo HTTP/BD e interface; última execução completa: 24,3 s |
| `node scripts/check-integrity.mjs` | **6 verificações SQL passaram**, mais confirmação do papel não administrativo |
| `node scripts/check-persistence.mjs` | Ronda, negociação em term_sheet e bytes do documento encontrados após reinício da aplicação |
| `node scripts/check-outage.mjs` | Paragem exclusiva da BD SEED: API autenticada devolveu 503 genérico; após arranque, mesma sessão voltou a obter 200 |
| `bash scripts/backup-verify.sh` | Dump restaurado numa base separada; contagens e hashes de documentos correspondentes |
| Inspeção do relatório | DOCX atualizado; PDF A4 de 49 páginas; sumário e listas com páginas atualizados por LibreOffice/UNO; páginas de diagramas, tabelas e referências inspecionadas |
| Pesquisa de segredos | Nenhuma senha demo ou senha de BD encontrada em ficheiros versionados/candidatos; `.env.local`, `.local` e ferramentas locais ignorados |

## Cobertura funcional

O cenário HTTP cria ronda com `1000000.25 AOA` e confirma precisão decimal; cria relação ronda–investidor; recusa duplicação; recusa tentativa de escrita por outra startup e por investidor; regista interação; muda para reunião; recusa soft commit sem valor; regista intenção `150000.50 AOA` e term sheet recebido. Verifica histórico e valores de indicadores: null sem denominador, 0% com reunião sem intenção e 100% no cenário controlado após intenção. São testes sintéticos, não métricas de pesquisa ou de captação real.

O cenário documental carrega texto, obtém 404 por outra startup, investidor ainda não autorizado, investidor independente e aceleradora sem concessão. A concessão permite obter o conteúdo; a revogação volta a impedir acesso. Metadados também são filtrados. A eliminação incide num documento criado pelo próprio teste. O teste conserva outro documento para confirmar persistência após reinício. Ficheiro HTML, valor negativo e origem não autorizada são recusados. Ronda encerrada bloqueia atualização até reabertura. Logout invalida a sessão.

O cenário de navegador efetua login com credenciais verificadas, cria ronda através do formulário, recarrega e confirma permanência. Em viewport **390 × 844**, verifica ausência de overflow horizontal e foco por teclado. A análise axe com etiquetas WCAG 2 A/AA não encontrou violações nesse estado. Não equivale a auditoria integral de acessibilidade ou a usabilidade com participantes. Há captura adicional em 1440 × 1000.

- [Interface móvel](workspace-mobile.png)
- [Interface desktop](workspace-desktop.png)
- Testes reproduzíveis: `tests/capture.spec.ts`, `scripts/check-integrity.mjs`, `scripts/check-persistence.mjs` e `scripts/check-outage.mjs`.

## Restauro verificado

Último dump verificado: `.local/backups/seed-20261007T203907.dump` (UTC). Base de destino preservada: `seed_restore_20261007t203907`. Esta é uma base nova do projeto, não uma base existente substituída.

Contagens comparadas: organizations 5, users 5, memberships 5, startups 2, rounds 6, opportunities 3, transitions 12, interactions 3, documents 3, document_grants 0, audit_events 47 e schema_migrations 2. Os bytes dos documentos foram comparados por identificador e MD5 como verificação de correspondência, não como mecanismo de segurança. O snapshot continha zero concessões porque os testes as revogaram; criação e revogação tinham sido verificadas separadamente por HTTP. Não se verificou recuperação noutra máquina ou desastre do disco.

## Localização da evidência e limites

Logs brutos privados desta execução: `.local/build.log`, `.local/lint.log`, `.local/typecheck.log`, `.local/tests.log`, `.local/test-results.json`, `.local/integrity.log`, `.local/persistence.log`, `.local/outage.log` e `.local/backup.log` e `.local/profile.log`. Não contêm respostas de pesquisa. Os testes preservam registos de verificação; os números podem crescer ao repeti-los. A documentação relata um snapshot, não um total comercial.

Não foram realizados testes com participantes, teste de carga, pentest, produção, envio real de email, assinatura eletrónica ou investimento financeiro. Respostas do questionário estão **indisponíveis para análise nesta execução**; não se conclui que foram apagadas ou que nunca existiram. O manual institucional e os dados definitivos da banca/aprovação não foram fornecidos. Os resultados confirmam o protótipo local no âmbito testado, não a conclusão integral de uma componente empírica académica.

## Retoma em 8 de outubro de 2026

Após a interrupção da sessão, os processos locais estavam parados. Foram reiniciados apenas o cluster SEED e a aplicação com `npm run start`. Confirmou-se novamente HTTP 200 em `/login` e `PASS` em `scripts/check-persistence.mjs`: ronda, negociação e bytes do documento permaneceram no disco. Não foi necessário recriar o esquema, repor o backup ou carregar novamente os dados. As evidências completas da suíte acima referem-se a 7 de outubro; esta retoma acrescenta a confirmação de arranque e persistência no dia seguinte.

## Atualização documental — 8 de outubro de 2026

O questionário e a exportação foram posteriormente recuperados e analisados: 24 submissões consentidas; ver [análise](../research/README.md). A indicação de indisponibilidade acima descreve apenas a execução histórica de 7 de outubro. A presente revisão leu o código, o esquema e os registos anteriores, sem repetir testes, criar dados ou modificar a aplicação. A evidência mais recente de interface está em [ui-review.md](ui-review.md); avaliação de tarefas por participantes continua pendente.
