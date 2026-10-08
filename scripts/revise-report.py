"""Revise the existing DOCX using its institutional template and preserve its main structure."""
from pathlib import Path
from io import BytesIO
import subprocess,csv
from docx import Document
from docx.shared import Cm,Pt,RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT, WD_TAB_LEADER
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.section import WD_SECTION_START
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
root=Path(__file__).resolve().parent.parent
path=root/'docs/report/tcc_antonewton.docx'
original=subprocess.check_output(['git','show','HEAD:docs/report/tcc_antonewton.docx'],cwd=root)
D=Document(BytesIO(original))
ack=[p.text for p in D.paragraphs[126:131]]
body=D._element.body
for child in list(body):
 if child.tag!=qn('w:sectPr'): body.remove(child)
sec=D.sections[0];sec.page_width=Cm(21);sec.page_height=Cm(29.7);sec.top_margin=Cm(3);sec.left_margin=Cm(3);sec.bottom_margin=Cm(2);sec.right_margin=Cm(2)
if 'Caption' not in D.styles: D.styles.add_style('Caption',WD_STYLE_TYPE.PARAGRAPH)
if 'Table Grid' not in D.styles: D.styles.add_style('Table Grid',WD_STYLE_TYPE.TABLE)
for name in ['Normal','Heading 1','Heading 2','Heading 3','Caption']:
 st=D.styles[name];st.font.name='Times New Roman';st.font.size=Pt(12);st.font.color.rgb=RGBColor(0,0,0)
 st.paragraph_format.line_spacing=1.5;st.paragraph_format.space_after=Pt(6)
 if name=='Normal':st.paragraph_format.first_line_indent=Cm(1.25)
for name in ['Heading 1','Heading 2','Heading 3']:
 st=D.styles[name];st.font.bold=True;st.paragraph_format.first_line_indent=Cm(0);st.paragraph_format.keep_with_next=True;st.paragraph_format.left_indent=Cm(0);st.paragraph_format.right_indent=Cm(0)
D.styles['Heading 1'].paragraph_format.page_break_before=True
# Explicit numbering in headings; disable inherited automatic numbering.
for name in ['Heading 1','Heading 2','Heading 3']:
 st=D.styles[name];pr=st.element.get_or_add_pPr()
 for child in list(pr):
  if child.tag==qn('w:numPr'):pr.remove(child)
normal=D.styles['Normal'];normal.paragraph_format.alignment=WD_ALIGN_PARAGRAPH.JUSTIFY
for part in [sec.header,sec.footer,sec.first_page_header,sec.first_page_footer,sec.even_page_header,sec.even_page_footer]:
 for child in list(part._element): part._element.remove(child)
 part.add_paragraph('')
for el in list(sec._sectPr):
 if el.tag==qn('w:pgNumType'):sec._sectPr.remove(el)
num=OxmlElement('w:pgNumType');num.set(qn('w:start'),'0');sec._sectPr.append(num)
sec.different_first_page_header_footer=False
captions=[]
def bookmark(para,name):
 start=OxmlElement('w:bookmarkStart');start.set(qn('w:id'),str(1000+len(captions)));start.set(qn('w:name'),name)
 end=OxmlElement('w:bookmarkEnd');end.set(qn('w:id'),str(1000+len(captions)))
 para._p.insert(1 if para._p.pPr is not None else 0,start);para._p.append(end)
def page_reference(para,name):
 para.paragraph_format.tab_stops.add_tab_stop(Cm(16),WD_TAB_ALIGNMENT.RIGHT,WD_TAB_LEADER.DOTS)
 para.add_run('\t')
 field=OxmlElement('w:fldSimple');field.set(qn('w:instr'),'PAGEREF '+name+' \\h');para._p.append(field)

def p(text='',style=None):
 para=D.add_paragraph(text,style);return para
def h(text,level=2):return D.add_heading(text,level)
def plain(text):
 x=p(text);x.paragraph_format.first_line_indent=Cm(0);return x
def center(text,size=12,bold=False):
 x=plain(text);x.alignment=WD_ALIGN_PARAGRAPH.CENTER
 for r in x.runs:r.font.size=Pt(size);r.bold=bold
 return x
def page(title):
 D.add_page_break();x=center(title,bold=True);x.paragraph_format.space_after=Pt(24)
def table(title,headers,rows):
 x=plain(title);x.paragraph_format.keep_with_next=True;captions.append(title);bookmark(x,'seed_table'+title.split()[1])
 t=D.add_table(rows=1, cols=len(headers));t.style='Table Grid'
 for c,v in zip(t.rows[0].cells,headers):c.text=v
 for row in rows:
  for c,v in zip(t.add_row().cells,row):c.text=str(v)
 for i,row in enumerate(t.rows):
  trpr=row._tr.get_or_add_trPr();cant=OxmlElement('w:cantSplit');trpr.append(cant)
  if i==0:trpr.append(OxmlElement('w:tblHeader'))
  for c in row.cells:
   for para in c.paragraphs:
    para.paragraph_format.keep_with_next=True;para.paragraph_format.first_line_indent=Cm(0);para.paragraph_format.line_spacing=1;para.paragraph_format.space_after=Pt(4);para.alignment=WD_ALIGN_PARAGRAPH.LEFT
    for r in para.runs:r.font.size=Pt(10);r.bold=i==0
 plain('Fonte: elaboração própria (2026).').runs[0].font.size=Pt(10)
 return t
def fig(title,name):
 x=plain(title);x.paragraph_format.keep_with_next=True;captions.append(title);bookmark(x,'seed_figure'+title.split()[1])
 D.add_picture(str(root/'docs/report/figures'/f'{name}.png'),width=Cm(16))
 image_p=D.paragraphs[-1];image_p.paragraph_format.first_line_indent=Cm(0);image_p.paragraph_format.left_indent=Cm(0);image_p.alignment=WD_ALIGN_PARAGRAPH.CENTER
 plain('Fonte: elaboração própria, a partir da implementação (2026).').runs[0].font.size=Pt(10)
# Institutional front matter: same author, institution, supervisor, nature, dedication and acknowledgments.
center('INSTITUTO SUPERIOR POLITÉCNICO DE TECNOLOGIAS E CIÊNCIAS',bold=True)
center('DEPARTAMENTO DE TECNOLOGIAS E CIÊNCIAS');center('CURSO DE ENGENHARIA INFORMÁTICA')
x=center('ANTONEWTON EMANUEL LUNGOGE QUIMA');x.paragraph_format.space_before=Pt(80)
x=center('DESENVOLVIMENTO DE UMA PLATAFORMA DE CAPTAÇÃO DE FUNDOS PARA STARTUPS ACELERADAS',bold=True);x.paragraph_format.space_before=Pt(100)
x=center('Luanda\n2026');x.paragraph_format.space_before=Pt(140)
D.add_page_break();center('ANTONEWTON EMANUEL LUNGOGE QUIMA')
x=center('DESENVOLVIMENTO DE UMA PLATAFORMA DE CAPTAÇÃO DE FUNDOS PARA STARTUPS ACELERADAS',bold=True);x.paragraph_format.space_before=Pt(90)
x=p('Trabalho de Conclusão de Curso apresentado ao curso de Engenharia Informática do Instituto Superior Politécnico de Tecnologias e Ciências como requisito para obtenção do grau de Licenciado em Engenharia Informática.');x.paragraph_format.left_indent=Cm(8);x.paragraph_format.first_line_indent=Cm(0);x.paragraph_format.space_before=Pt(70);x.paragraph_format.line_spacing=1
x=p('Orientador: Daniel Sofrimento');x.paragraph_format.left_indent=Cm(8);x.paragraph_format.first_line_indent=Cm(0)
x=center('Luanda\n2026');x.paragraph_format.space_before=Pt(100)
page('FOLHA DE APROVAÇÃO');center('ANTONEWTON EMANUEL LUNGOGE QUIMA');center('DESENVOLVIMENTO DE UMA PLATAFORMA DE CAPTAÇÃO DE FUNDOS PARA STARTUPS ACELERADAS',bold=True)
p('Trabalho de Conclusão de Curso submetido ao curso de Engenharia Informática do Instituto Superior Politécnico de Tecnologias e Ciências para obtenção do grau de Licenciado em Engenharia Informática.')
center('BANCA EXAMINADORA',bold=True)
for role in ['Presidente da banca','Primeiro oponente','Segundo oponente']:
 x=center('___________________________________________________\n'+role+'\nDET/ISPTEC');x.paragraph_format.space_before=Pt(22)
center('Data de aprovação: ____ / ____ / ______')
page('DEDICATÓRIA');x=p('Aos meus amados pais, com amor e gratidão.');x.paragraph_format.space_before=Pt(270)
page('AGRADECIMENTOS')
for a in ack:p(a.replace('(Daniel Sofrimento)','Daniel Sofrimento').replace('Sua expertise','O seu conhecimento').replace('A minha instituição','À minha instituição'))
page('RESUMO')
p('Este trabalho apresenta o desenvolvimento da SEED, uma plataforma de apoio à organização da captação de fundos para startups aceleradas em Angola. O âmbito compreende o acompanhamento de rondas, negociações com investidores, interações e documentos, sem processamento de pagamentos ou intermediação de participações. A investigação é aplicada, com exploração bibliográfica e documental e desenvolvimento de um artefacto de software. O instrumento de pesquisa descrito pelo autor contém perguntas fechadas, escalas ordinais e perguntas abertas sobre dificuldades e perceções da solução. As respostas não estavam disponíveis para análise nesta execução; consequentemente, os requisitos foram tratados como candidatos fundamentados no instrumento, na literatura e em decisões de projeto, sem atribuição de prioridades aos respondentes. A implementação utiliza Next.js, React e PostgreSQL, com sessões autenticadas, autorização por organização e recurso, histórico de etapas e data room com concessão explícita de acesso. A avaliação técnica verificou operações persistentes, isolamento entre contas, cálculo de indicadores, recuperação de indisponibilidade e backup/restauro local. Os testes sustentam o funcionamento do fluxo demonstrativo no ambiente verificado, mas não comprovam usabilidade com participantes, adoção ou aumento da captação. Conclui-se que o protótipo materializa uma solução técnica de organização e rastreabilidade, permanecendo necessária a validação empírica com os intervenientes e a confirmação das orientações institucionais para a entrega académica definitiva.')
plain('Palavras-chave: startups; captação de fundos; aceleração; sistemas de informação; data room.')
page('ABSTRACT')
p('This work presents SEED, a platform supporting the organization of fundraising for accelerated startups in Angola. Its scope covers funding rounds, investor negotiations, interactions and documents, without payment processing or equity intermediation. The study combines applied software development with exploratory bibliographic and documentary work. The research instrument described by the author includes closed questions, ordinal scales and open questions about difficulties and perceptions of the proposed solution. Responses were unavailable for analysis during this execution. Requirements were therefore treated as candidates grounded in the instrument, literature and project decisions, without attributing priorities to respondents. The implementation uses Next.js, React and PostgreSQL, with authenticated sessions, organization and resource authorization, stage history and a data room requiring explicit document access grants. Technical evaluation verified persistent operations, account isolation, indicator calculations, recovery from database unavailability and local backup and restoration. These tests support the operation of the demonstrator in the verified environment; they do not establish participant usability, adoption or increased fundraising. The prototype provides a technical means of organizing and tracing the process, while empirical validation with stakeholders and confirmation of institutional requirements remain necessary for definitive academic submission.')
plain('Keywords: startups; fundraising; acceleration; information systems; data room.')
page('LISTA DE ILUSTRAÇÕES')
for title in ['Figura 1 — Arquitetura implementada','Figura 2 — Entidades do processo de captação','Figura 3 — Identidade e acesso documental','Figura 4 — Sequência de atualização de negociação']:page_reference(plain(title),'seed_figure'+title.split()[1])
page('LISTA DE TABELAS')
list_tables=[]
for title in ['Tabela 1 — Comparação documental de soluções','Tabela 2 — Prioridades e delimitação do MVP','Tabela 3 — Permissões por papel e recurso','Tabela 4 — Execução técnica por incrementos','Tabela 5 — Resultados da verificação funcional','Tabela 6 — Avaliação com participantes','Tabela 7 — Indicadores implementados','Tabela 8 — Comparação de capacidades e limites','Tabela 9 — Alojamento local e evolução futura','Tabela 10 — Ambiente de execução verificado']:
 entry=plain(title);page_reference(entry,'seed_table'+title.split()[1]);list_tables.append(entry)
page('LISTA DE ABREVIATURAS E SIGLAS')
for a in ['ABNT — Associação Brasileira de Normas Técnicas','AOA — Kwanza angolano','API — Interface de programação de aplicações','BD — Base de dados','FK — Chave estrangeira','HTTP — Protocolo de transferência de hipertexto','ISPTEC — Instituto Superior Politécnico de Tecnologias e Ciências','MVP — Produto mínimo viável','PK — Chave primária','RBAC — Controlo de acesso baseado em papéis','SQL — Linguagem de consulta estruturada','TFC — Trabalho de Final de Curso','UTC — Tempo Universal Coordenado','UUID — Identificador universalmente único']:plain(a)
page('SUMÁRIO')
toc=plain('');f=OxmlElement('w:fldSimple');f.set(qn('w:instr'),'TOC \\o "1-3" \\h \\z \\u');toc._p.append(f)
main_section=D.add_section(WD_SECTION_START.NEW_PAGE)
main_section.header.is_linked_to_previous=False
main_section.footer.is_linked_to_previous=False
main_section.different_first_page_header_footer=False
for el in list(main_section._sectPr):
 if el.tag==qn('w:pgNumType'):main_section._sectPr.remove(el)
head=main_section.header.paragraphs[0];head.alignment=WD_ALIGN_PARAGRAPH.RIGHT
fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');head._p.append(fld)
h('1 INTRODUÇÃO',1)
p('O trabalho tem como domínio a organização da captação de fundos após programas de aceleração. A SEED reúne informação de startups, rondas, potenciais investidores e documentos num fluxo rastreável. A pergunta de investigação é: de que forma uma plataforma digital pode apoiar a organização e o acompanhamento do processo de captação de fundos para startups aceleradas em Angola? A resposta aqui alcançada é técnica e delimitada ao protótipo local; a sua utilidade percebida e o seu impacto dependem de avaliação empírica ainda não disponível.')
p('O diagnóstico da economia digital de Angola identifica limitações de financiamento e condições do ecossistema de empreendedorismo digital (World Bank Group, 2023). Este contexto justifica investigar ferramentas de apoio, mas não demonstra que a dispersão documental seja a dificuldade predominante das startups aceleradas angolanas. O questionário do projeto investiga essa possibilidade. A frequência e a importância dos problemas não podem ser inferidas da simples existência das perguntas.')
h('1.1 Problemas')
p('O instrumento aborda informação dispersa, identificação da etapa de cada investidor, registo de reuniões e intenções, partilha de documentos e ausência de indicadores. Estes elementos constituem necessidades investigadas, não resultados confirmados. No plano de engenharia, o repositório inicialmente disponibilizava páginas com valores simulados, autenticação provisória e ações sem persistência. A ausência de ligação a uma base de dados impedia demonstrar que uma alteração sobrevivia à recarga ou que contas distintas respeitavam limites de acesso.')
h('1.2 Justificativa')
p('A contribuição consiste em transformar essa base visual num artefacto executável que permita experimentar um processo coerente. A centralização pode facilitar a organização, mas o trabalho não atribui ganhos de tempo, confiança ou conversão aos participantes sem os medir. A literatura sobre capital de risco reconhece mecanismos distintos ao longo do processo de investimento (Gompers; Lerner, 2001); por decisão de projeto, a aplicação separa etapas negociais, intenção monetária e estado documental.')
h('1.3 Objectivo geral')
p('Desenvolver e verificar localmente uma plataforma digital para organizar e acompanhar a captação de fundos de startups aceleradas em Angola, com persistência PostgreSQL, controlo de acesso e rastreabilidade das negociações.')
h('1.4 Objectivos específicos')
for s in ['Documentar o instrumento disponível e identificar requisitos candidatos, explicitando a origem e os limites da evidência.', 'Modelar uma arquitetura e relações de dados consistentes com startup, ronda, investidor, negociação, interação e documento.', 'Implementar autenticação, autorização por organização e recurso, persistência e os formulários do fluxo essencial.', 'Definir e verificar indicadores cujas fórmulas, denominadores e eventos de origem sejam explícitos.', 'Executar testes técnicos de funcionamento, isolamento, persistência e recuperação, distinguindo-os da avaliação futura com participantes.']:p(s)
h('1.5 Delimitação do problema')
p('O âmbito vai do registo de uma ronda ao acompanhamento manual de contactos, reuniões, soft commits e term sheets. O software não custodia fundos, processa pagamentos, compra participações, executa ordens, recomenda investimentos nem certifica contratos. Não implementa um mercado público de crowdfunding. O encerramento de uma negociação não equivale à realização de investimento; não existe neste MVP um módulo de dinheiro recebido.')
p('As contas e os vínculos organizacionais são provisionados localmente. O investidor consulta apenas as relações a que está associado. A aceleradora acompanha startups previamente vinculadas, sem gestão de programas ou batches na área operacional. Gestão de tarefas de due diligence, mensagens externas, assinatura eletrónica, notificações, recomendação automática e cadastro público ficam fora da entrega funcional verificada.')
h('1.5.1 Objecto de estudo',3);p('Organização e rastreabilidade do processo de captação pós-aceleração, com atenção à relação concreta entre startup, ronda e potencial investidor.')
h('1.5.2 Campo de acção',3);p('Conceção e avaliação técnica de um sistema de informação local dirigido ao contexto angolano. As contas fictícias não representam entidades reais nem uma amostra do ecossistema.')
h('1.6 Organização do trabalho')
p('Mantém-se a sequência temática do documento original: fundamentação teórica, metodologias, solução proposta, discussão dos resultados, segurança, implantação e conclusões. A introdução e a conclusão passaram a integrar a numeração progressiva. As referências foram verificadas e os apêndices documentam o instrumento e a rastreabilidade, sem substituir os capítulos principais.')
h('2 FUNDAMENTAÇÃO TEÓRICA',1)
h('2.1 Empreendedorismo, inovação e startups')
p('Para este projeto, startup designa operacionalmente uma organização empreendedora que apresenta uma proposta de negócio e procura recursos para a desenvolver. Esta definição delimita a entidade do software, sem criar um critério jurídico ou estatístico de elegibilidade. A aplicação não comprova inovação, escalabilidade ou maturidade pelo simples preenchimento do perfil. Sector e descrição são informações declaradas, que podem orientar a leitura de uma oportunidade, mas não funcionam como certificação de qualidade.')
h('2.2 Aceleração e incubação: papel e efeitos no desempenho das startups')
p('Cohen e Hochberg (2014) descrevem o fenómeno das aceleradoras como apoio organizado em programas delimitados, com aprendizagem e mentoria. Cohen et al. (2019) analisam a heterogeneidade do desenho desses programas e as suas relações descritivas com desempenho. A literatura consultada é internacional; não autoriza atribuir automaticamente os mesmos efeitos a Angola. A ligação a uma aceleradora é, no modelo implementado, uma relação de acompanhamento e permissão de consulta, não um selo automático de qualidade ou uma garantia de financiamento.')
h('2.3 Financiamento de startups: etapas, instrumentos e actores')
p('O capital de risco é uma forma de financiamento de empresas jovens que envolve seleção, acompanhamento e mecanismos de governação (Gompers; Lerner, 2001). A gestão informacional dessas relações deve distinguir uma manifestação de interesse de um acordo e de um desembolso. Na SEED, a meta pertence à ronda e possui moeda; o soft commit é um valor manual de intenção, que pode ser retirado. Um term sheet possui estado próprio. O significado jurídico de cada documento depende do seu conteúdo e não é determinado pelo software.')
h('2.4 Processo de investimento: deal flow, triagem, due diligence e formalização')
p('O fluxo operacional proposto utiliza as etapas contactado, reunião, soft commit, term sheet, encerrada e recusada. A sequência não é tratada como lei universal do investimento: o utilizador pode corrigir ou recuar o estado, ficando a mudança registada. Documentos e interações fornecem contexto para análise. O MVP não automatiza uma due diligence completa, não emite pareceres e não executa formalização contratual. A escolha destas etapas provém do instrumento e de uma decisão de modelação passível de revisão após avaliação com utilizadores.')
h('2.5 Assimetria de informação, sinalização e confiança em mercados de investimento')
p('Informação centralizada pode apoiar a consulta, mas a existência de um documento não comprova a veracidade do seu conteúdo. A SEED regista autoria de operações e limita quem pode descarregar documentos; estes mecanismos são propriedades técnicas observáveis. A confiança percebida deve ser investigada com participantes. O diagnóstico angolano situa obstáculos mais amplos de financiamento e ambiente de negócios (World Bank Group, 2023), pelo que uma ferramenta de acompanhamento não deve ser apresentada como solução suficiente para barreiras estruturais.')
h('2.6 Plataformas digitais e sistemas de informação')
p('O sistema funciona como aplicação colaborativa de gestão de informação, não como mercado financeiro. A contribuição pode ser analisada pela construção e avaliação do artefacto, em consonância com a distinção entre investigação sobre comportamento e investigação orientada ao desenho de sistemas apresentada por Hevner et al. (2004). Não se reivindica a execução integral de um protocolo formal de design science: a avaliação disponível incide em requisitos técnicos e não inclui utilização longitudinal por organizações.')
h('2.7 Crowdfunding, plataformas de investimento e lições aplicáveis')
p('A existência de múltiplos investidores na interface não transforma o projeto em crowdfunding. Não existe uma campanha para receção pública de contribuições, subscrição de valores ou cobrança. As lições consideradas dizem respeito à organização de informação e à partilha documental. As páginas oficiais de Visible e DocSend permitem comparar capacidades declaradas, sem serem usadas como evidência independente de eficácia ou de resultados em Angola (Visible, [s. d.]; Dropbox, [s. d.]).')
table('Tabela 1 — Comparação documental de soluções',['Critério','Visible','DocSend','SEED verificada'],[
 ['Relação com investidores','Pipeline e comunicação declarados','Ênfase em documentos e engagement','Negociação por ronda e investidor'],
 ['Data room','Permissões e partilha documental','Partilha e análise documental','PDF/texto e concessão por organização'],
 ['Indicadores','Capacidades de acompanhamento declaradas','Análise de consulta de documentos','Conversão histórica e tempo até intenção'],
 ['Âmbito da comparação','Página oficial, sem teste de conta','Página oficial, sem teste de conta','Teste local, sem participantes'],
 ['Limite','Não comprova adequação ao contexto angolano','Não comprova efeito sobre financiamento','Não comprova adoção nem captação real']])
h('2.8 Usabilidade e adopção de sistemas')
p('Davis (1989) investiga utilidade percebida e facilidade de uso como dimensões relevantes para aceitação de tecnologia. O instrumento do projeto aborda interesse e confiança, mas o interesse numa descrição não demonstra usabilidade do protótipo. A verificação automatizada de rótulos, navegação e regras de acessibilidade também não substitui a observação de tarefas por pessoas. A SEED deverá ser avaliada por utilizadores representativos antes de qualquer conclusão sobre adoção.')
h('3 METODOLOGIAS',1)
h('3.1 Metodologia científica')
p('A investigação é aplicada, com componente exploratória e documental e desenvolvimento de software. A revisão realizada nesta execução é narrativa e orientada ao problema, não uma revisão sistemática: selecionaram-se publicações identificáveis sobre aceleração, capital de risco, aceitação e construção de sistemas, além de documentação técnica oficial e diagnóstico específico de Angola. Foram privilegiados autores, editoras, repositórios institucionais e fornecedores oficiais. A presença de perguntas abertas e fechadas não basta para classificar o estudo como método misto, pois não há análise integrada de resultados qualitativos e quantitativos disponível.')
h('3.1.1 Instrumento e fontes de evidência',3)
p('O instrumento existente intitula-se “Plataforma de Captação de Fundos para Startups Aceleradas em Angola”. Segundo a descrição disponibilizada pelo autor, procura compreender dificuldades de startups, aceleradoras e investidores na captação pós-aceleração e a relevância de uma solução para centralizar dados, documentos e interações. Contém caracterização, perguntas fechadas, escalas ordinais de frequência ou perceção e perguntas abertas. O Apêndice A conserva a síntese dos eixos recuperados, sem inventar redações literais, âncoras de escala, numeração original ou opções não fornecidas.')
p('Não foram localizados no repositório exportações CSV/XLSX, respostas individuais, capturas originais ou evidências de testes com participantes. A descrição das capturas foi fornecida na solicitação, mas as imagens não estavam disponíveis para conferência direta nesta execução. O autor informou problemas de acesso ao formulário e envio de feedback ao Google. Isto não demonstra eliminação nem inexistência de respostas; os dados são descritos exclusivamente como indisponíveis para análise nesta execução.')
h('3.1.2 Procedimento de análise e limites',3)
p('O procedimento efetivamente realizado consistiu em auditar o código e o DOCX, identificar afirmações não sustentadas, relacionar os eixos do instrumento com requisitos candidatos, selecionar um âmbito demonstrável, implementar persistência e executar testes técnicos. Não foram calculadas frequências de respostas, percentagens de participantes, pontuações de satisfação ou temas empíricos. A quantidade de respondentes e os critérios de inclusão permanecem por verificar; não se deve substituí-los por zero.')
p('Caso as respostas sejam recuperadas, a análise deverá preservar a exportação original, registar origem e data, verificar consentimento e critérios de inclusão e separar ausência de resposta, neutralidade e “não se aplica”. Frequências e percentagens devem informar o denominador de respostas válidas por item. Em seleção múltipla, a soma pode exceder 100%. Itens ordinais não serão agregados em pontuações sem justificação; itens com sentidos distintos requerem análise própria. Respostas abertas exigem procedimento explícito de leitura, codificação, revisão das categorias e anonimização de excertos. Uma amostra de conveniência não representa todo o ecossistema angolano. Este é um plano de análise futura, não uma descrição de análises já executadas.')
h('3.1.3 Ética e contactos opcionais',3)
p('O instrumento anuncia anonimato e inclui um email opcional para interesse em testar. Se o contacto estiver ligado à mesma resposta, existe possibilidade de identificação; assim, não se afirma anonimato absoluto. Não foi possível verificar a configuração do formulário, a separação dos contactos ou a recolha automática de email. Recomenda-se, numa aplicação futura, recolher contactos num formulário separado e com finalidade e consentimento próprios. Essa melhoria não altera retroativamente a versão originalmente utilizada. A aplicação demonstrativa não recolhe respostas de pesquisa nem deve receber dados pessoais de participantes.')
h('3.2 Metodologia de desenvolvimento de software')
p('Adotou-se desenvolvimento incremental com auditoria inicial, implementação de um fluxo completo e verificação por casos observáveis. Não existem registos suficientes para afirmar execução de sprints nas datas presentes no rascunho, participação contínua de clientes, programação em pares ou adoção integral de XP/Scrum. As iterações documentadas correspondem ao trabalho técnico verificável de 7 de outubro de 2026.')
p('Os critérios de seleção foram coerência com o domínio, importância para uma demonstração ponta-a-ponta, viabilidade local e capacidade de produzir evidência. A prioridade é uma decisão de projeto, não uma preferência medida nos respondentes. A matriz completa no Apêndice B associa requisito, origem, entidade, teste e estado. A validação empírica permanece separada dos testes de engenharia.')
h('3.3 Normalização e revisão bibliográfica')
p('A verificação das edições considerou NBR 14724:2024 (apresentação), NBR 10520:2023 (citações), NBR 6023:2025 (referências), NBR 6028:2021 (resumo), NBR 6027:2012 (sumário) e NBR 6024:2012 (secções), conforme orientação do Sistema Integrado de Bibliotecas da UFES (Universidade Federal do Espírito Santo, [s. d.]). Adotaram-se citações indiretas autor-data, referências correspondentes, numeração progressiva, legendas e fonte das ilustrações. As normas integrais de acesso restrito não foram consultadas; a verificação das edições e a orientação aplicada não equivalem a uma certificação de conformidade.')
p('O manual institucional do ISPTEC não foi localizado. Mantiveram-se a identificação institucional, o autor, o orientador e a ordem temática do documento, ajustando a numeração e substituindo o título “Índice” por “Sumário”. A epígrafe opcional foi retirada por falta de comprovação da citação e da localização. A banca e a data de aprovação não foram inventadas. A confirmação desses dados e de eventuais regras institucionais prevalecentes permanece necessária.')
h('4 SOLUÇÃO PROPOSTA',1)
h('4.1 Visão geral da plataforma')
p('A área operacional é /workspace. A interface anterior foi preservada no código, mas as suas áreas de startup, investidor e aceleradora encaminham para o fluxo persistente; ações antigas deixam de simular gravação. A identidade visual verde e dourada e os componentes de marca foram mantidos. O acesso parte de uma conta demonstrativa, permite consultar ou editar a startup autorizada, abrir ronda, associar investidor, registar interação, atualizar negociação, anexar documento, conceder acesso e consultar indicadores.')
table('Tabela 2 — Prioridades e delimitação do MVP',['Prioridade','Conteúdo','Justificação e estado'],[
 ['Essencial','Sessão, organizações e autorização','Base para isolamento; implementado'],['Essencial','Perfil, ronda e negociação','Fluxo do instrumento; implementado'],['Essencial','Interações e histórico de etapas','Rastreabilidade; implementado'],['Essencial','Data room privado','Partilha controlada; implementado'],['Essencial','Indicadores por ronda','Mensuração verificável; implementado'],['Adiado','Cadastro público e gestão de membros','Provisionamento local suficiente à demonstração'],['Adiado','Due diligence por tarefas, batches, matching','Não necessário ao fluxo mínimo coerente'],['Adiado','Email, assinatura eletrónica, pagamentos','Integrações ausentes; pagamentos fora do âmbito']])
h('4.2 Principais perfis de utilizador')
p('O papel deriva do tipo da organização: startup, investidor ou aceleradora. Cada utilizador pertence a uma organização nesta versão; uma organização pode ter vários membros no esquema. A startup gere recursos próprios; investidores consultam as suas negociações; aceleradoras consultam startups vinculadas. Não há superadministrador na interface. O administrador da instância PostgreSQL é apenas uma conta técnica local, distinta da ligação da aplicação.')
table('Tabela 3 — Permissões por papel e recurso',['Recurso','Startup proprietária','Investidor','Aceleradora'],[
 ['Perfil e ronda','Consulta e escrita','Consulta com negociação associada','Consulta de startup vinculada'],['Negociação e interação','Consulta e escrita','Só a própria relação','Relações de startups vinculadas'],['Documento','Upload, descarga, eliminação','Concessão explícita','Concessão explícita'],['Concessão/revogação','Só recursos próprios e destinatário associado','Não','Não'],['Indicadores','Rondas próprias','Somente relações visíveis','Rondas vinculadas']])
h('4.3 Arquitectura da solução')
p('A arquitetura é um monólito modular com interface React, Route Handlers do Next.js, serviço de regras e acesso PostgreSQL no servidor. A documentação local de Next.js 16.2.7 foi consultada antes das alterações, particularmente Route Handlers, autenticação e cookies assíncronos (Vercel, [s. d.]). O cliente nunca recebe DATABASE_URL nem estabelece ligação direta à base de dados.')
p('O serviço valida entradas com Zod e executa SQL parametrizado através de pg. O pool é reutilizado por processo, com até cinco ligações e libertação dos clientes em finally, conforme a abordagem de pooling descrita na documentação oficial (Node-postgres, [s. d.]). Não foi introduzido um ORM porque não existia um mecanismo de persistência anterior a preservar. As regras e as consultas permanecem próximas no serviço de captação, evitando camadas genéricas desnecessárias.')
fig('Figura 1 — Arquitetura implementada','architecture')
h('4.3.1 Modelo de dados e integridade',3)
p('Organizações e membros suportam o isolamento; startups possuem rondas; cada negociação relaciona uma ronda e um investidor. A unicidade do par ronda–investidor impede duplicação na mesma ronda. Interações e transições referenciam a negociação e o utilizador responsável. As Figuras 2 e 3 apresentam as relações principais; sessions, login_attempts, audit_events e schema_migrations apoiam autenticação, limitação de tentativas, auditoria e evolução do esquema.')
fig('Figura 2 — Entidades do processo de captação','entities')
fig('Figura 3 — Identidade e acesso documental','access')
p('As entidades utilizam UUID e chaves estrangeiras; associações utilizam chaves compostas. FKs de negócio têm eliminação restrita, preservando relações. Autorizações são eliminadas com o documento. Valores monetários usam numeric(18,2), moeda explícita AOA/USD/EUR e são transmitidos como strings. Datas usam timestamptz, servidor UTC e apresentação Africa/Luanda. A entrada de data e hora é interpretada no fuso do dispositivo. Índices cobrem consultas por startup, investidor e negociação.')
h('4.3.2 Fluxo transacional essencial',3)
p('Uma atualização de negociação verifica sessão, papel e propriedade, bloqueia a linha relevante e valida se a ronda está aberta. A alteração, a transição de etapa e o evento de auditoria são confirmados em conjunto. Quando há erro, a transação é revertida. Concessão de acesso, upload e criação de oportunidade também são transacionais. O histórico de etapas e a auditoria não podem ser alterados ou apagados pelo papel da aplicação.')
fig('Figura 4 — Sequência de atualização de negociação','sequence')
h('4.4 Componentes funcionais')
p('O perfil inclui nome, sector e descrição. A ronda regista nome, meta, moeda e estado aberta/encerrada. A negociação mantém etapa, próximo passo, valor de intenção e estado de term sheet. As interações armazenam tipo contacto/reunião/nota, texto e data. O data room guarda conteúdo e metadados com autorizações por documento. Não há catálogo público de oportunidades nem estatísticas comerciais fictícias na área operacional.')
p('As etapas podem avançar ou recuar para corrigir informação, sempre com novo evento quando mudam. O soft commit exige valor positivo; a etapa term sheet exige estado diferente de “sem term sheet”. Valor de intenção e estado documental são independentes. Não há comprovação de assinatura: “aceite” é um registo manual. O valor pode ser retirado, mas a passagem histórica por soft commit permanece. A auditoria regista operação e recurso, sem constituir um livro completo das revisões dos valores e condições.')
h('4.5 Práticas de engenharia aplicadas')
p('A separação entre apresentação, transporte e serviço evita regras de autorização exclusivamente visuais. O esquema é criado por migrações versionadas e os dados demonstrativos são inseridos de modo idempotente. Testes por HTTP exercitam permissões reais; testes de navegador exercitam login e formulários. Não se afirma que o desenvolvimento tenha seguido TDD integral, XP ou avaliação participativa, porque não há evidência suficiente dessas práticas.')
h('4.6 Metáfora do projecto')
p('A metáfora original de organização das oportunidades é concretizada como um dossier de acompanhamento: cada ronda reúne relações, etapas, próximos passos e documentos autorizados. A aplicação organiza o processo; não seleciona o melhor investimento, não atribui uma nota de qualidade à startup e não funciona como intermediário financeiro.')
h('4.7 Planeamento por histórias de utilização')
p('Como startup, o utilizador pretende manter o perfil e abrir uma ronda para organizar a captação; associar um investidor e registar reuniões para preservar decisões; atualizar etapas e intenções para acompanhar o processo; e partilhar um documento com um destinatário específico. Como investidor, pretende consultar a relação que lhe foi associada e obter apenas documentos autorizados. Como aceleradora, pretende acompanhar startups vinculadas sem acesso documental implícito. Estas histórias expressam decisões do projeto fundamentadas no domínio e no instrumento, não pedidos confirmados por respondentes.')
h('4.8 Plano de execução por incrementos')
table('Tabela 4 — Execução técnica por incrementos',['Incremento','Trabalho realizado','Evidência'],[
 ['Auditoria','Git, código, documento e recursos locais','Diagnóstico e estado inicial sem alterações'],['Persistência','Instância exclusiva, esquema e contas','db/migrations e scripts locais'],['Fluxo','API, autorização e formulários','lib/server e /workspace'],['Verificação','HTTP, navegador, recuperação e restauro','tests e docs/verification'],['Revisão académica','Coerência, fontes, matriz e versão de leitura','Este DOCX e PDF correspondente']])
h('5 DISCUSSÃO DOS RESULTADOS',1)
h('5.1 Objectivo da avaliação')
p('A avaliação disponível verifica o funcionamento técnico do âmbito implementado. A questão é se o sistema persiste operações, aplica autorização no servidor e calcula os indicadores de acordo com as fórmulas. Não se procurou inferir causalmente melhoria da captação, confiança ou adoção a partir dos dados demonstrativos.')
h('5.2 Cenários de validação considerados')
p('Foram utilizadas cinco contas fictícias: startup principal, outra startup, investidor associado, outro investidor e aceleradora vinculada. O cenário principal abre ronda, associa investidor, regista reunião, muda etapas, anexa documento, concede e revoga acesso e consulta indicadores. Os cenários negativos tentam operar sobre recursos alheios, duplicar uma relação, inserir valores inválidos e aceder a documentos sem autorização. As contas de controlo permitem verificar isolamento sem expor dados de organizações reais.')
h('5.3 Procedimentos de teste e critérios de análise')
p('A suíte Playwright contém um cenário de integração por HTTP e um cenário de interface. Os testes verificam códigos de resposta, conteúdo persistido e valores esperados, e não apenas a abertura de páginas. O cenário de interface efetua login com credenciais reais, cria uma ronda, recarrega a página e verifica permanência do registo; inclui navegação por teclado, largura móvel de 390 px e análise automatizada de acessibilidade WCAG 2 A/AA com axe. Lint, verificação TypeScript e build complementam a avaliação.')
p('Scripts separados interrompem exclusivamente a instância do projeto para testar indisponibilidade, confirmam recuperação sem perda de sessão, verificam dados após reinício da aplicação e restauram um dump numa base nova. Os resultados detalhados e as instruções de repetição estão em docs/verification/results.md. A execução local não comprova comportamento sob carga, produção, redes hostis ou utilização humana prolongada.')
h('5.4 Resultados da validação funcional')
table('Tabela 5 — Resultados da verificação funcional',['Caso','Critério observado','Resultado'],[
 ['Autenticação e sessão','Login válido e logout com invalidação','Passou'],['Ronda e negociação','Persistência, decimal exato e relação única','Passou'],['Interação e etapas','Registo, histórico e soft commit sem valor recusado','Passou'],['Isolamento','Escrita de outra startup recusada; leitura filtrada','Passou'],['Data room','404 sem permissão, acesso após concessão e recusa após revogação','Passou'],['Eliminação permitida','Documento eliminado e indisponível para nova descarga','Passou'],['Indicadores','Sem denominador = null; cenário controlado 0% e 100%','Passou'],['Recarga e reinício','Ronda, etapa e conteúdo documental mantidos','Passou'],['BD indisponível','503 genérico, recuperação e sessão preservada','Passou'],['Backup/restauro','Contagens e hash dos documentos correspondentes','Passou'],['Interface e acessibilidade','Fluxo de criação, teclado, largura móvel e axe','Passou no cenário verificado'],['Qualidade estática','Lint, TypeScript e build','Passou']])
p('Os resultados sustentam a execução do fluxo mínimo na máquina local com PostgreSQL real. A extensão visual anterior não corresponde a um conjunto equivalente de módulos funcionais: foi mantida como código de referência, enquanto o acesso operacional se concentra no fluxo testado. Essa delimitação evita apresentar mensagens, pontuações, due diligence ou notificações simuladas como funcionalidades persistentes.')
h('5.5 Resultados de usabilidade: tarefas e percepção')
p('Não há resultados verificáveis de tarefas realizadas por participantes nesta execução. A tabela seguinte identifica o que permanece por avaliar, sem números de sucesso, tempos ou satisfação inventados. O teste automatizado de interface e a análise axe são evidência técnica limitada ao estado testado, não uma medida de usabilidade percebida nem uma declaração integral de conformidade WCAG.')
table('Tabela 6 — Avaliação com participantes',['Dimensão','Estado da evidência','Procedimento futuro'],[
 ['Compreensão das etapas','Indisponível','Observar atualização de negociação e interpretar termos'],['Partilha documental','Indisponível','Executar concessão e revogação com contas distintas'],['Leitura dos indicadores','Indisponível','Verificar compreensão do denominador e de não calculável'],['Utilidade e confiança','Indisponível','Recolher perceções após uso, com consentimento'],['Impacto na captação','Não medido','Acompanhamento longitudinal com critérios próprios']])
h('5.6 Indicadores do processo de captação')
p('O período corresponde à abertura da ronda até à consulta. As fontes são eventos persistidos em transitions, com datas geradas no servidor; o registo textual de uma reunião não cria automaticamente a transição para reunião. Cada negociação conta uma vez. A visão do investidor é parcial e restrita às suas relações, não o total confidencial da startup. Os indicadores podem mudar quando novos eventos são registados e não predizem financiamento.')
table('Tabela 7 — Indicadores implementados',['Indicador','Fórmula e origem','Ausência e interpretação'],[
 ['Negociações','Contagem de opportunities visíveis da ronda','0 é calculável quando a consulta foi bem-sucedida'],['Conversão reunião → intenção','100 × relações com soft_commit após a primeira transição meeting / relações com transição meeting','Denominador 0: não calculável; recuos posteriores não apagam conversão histórica'],['Dias até primeiro compromisso','(primeiro evento soft_commit − rounds.created_at) / 86 400 segundos','Sem evento: não calculável; mede desde a abertura, não desde demo day'],['Valor da intenção','soft_amount por negociação, na moeda da ronda','Ausência não equivale a zero; sem soma entre moedas nem valor recebido']])
p('No cenário sintético, a ronda sem reunião devolveu conversão não calculável; com uma relação em reunião e sem intenção devolveu 0/1, ou 0%; após a transição para soft commit devolveu 1/1, ou 100%. Esses valores são resultados de teste de fórmula. Não representam taxa observada numa pesquisa, conversão comercial ou eficácia da SEED. O tempo calculado usa a cronologia real do teste e não deve ser interpretado como tempo típico de negociação.')
h('5.7 Comparação com o procedimento manual')
p('Não foi executado estudo antes/depois nem medido o tempo do procedimento manual. A comparação seguinte contrapõe capacidades e limites de organização, sem assumir que todo processo manual é inseguro ou que o software elimina falhas humanas. O instrumento pergunta sobre ferramentas utilizadas; sem respostas, não se conhece a sua distribuição na população estudada.')
table('Tabela 8 — Comparação de capacidades e limites',['Dimensão','Procedimento disperso: hipótese investigada','SEED: propriedade verificada'],[
 ['Informação','Pode exigir consulta de várias fontes','Ronda e negociações na mesma base'],['Histórico','Pode depender de disciplina de registo','Transições persistidas; notas continuam manuais'],['Acesso','Depende das ferramentas e configurações','Verificação por recurso no servidor'],['Indicadores','Pode exigir consolidação manual','Fórmulas sobre eventos persistidos'],['Resultado financeiro','Não medido neste estudo','Não medido nem garantido pelo protótipo']])
h('5.8 Limitações e melhorias propostas')
p('A principal limitação académica é a indisponibilidade de respostas e de avaliação com participantes. A principal limitação operacional é o âmbito de demonstração local: não existem cadastro público, recuperação de palavra-passe, gestão de membros, paginação de grandes volumes, análise antivírus ou auditoria completa de todas as revisões. PDF/texto são limitados a 2 MiB. As consultas de indicadores não oferecem filtros por período nem análise longitudinal. Há testes relevantes, mas não teste de carga, pentest ou evidência de disponibilidade contínua.')
p('O módulo de contas é provisionado por script; a aceleração é um vínculo previamente criado. As páginas de marketing e componentes visuais preservados devem ser lidos como apresentação da proposta, não evidência de integrações. A resposta à pergunta de investigação limita-se à viabilidade técnica de organizar o processo no protótipo. Os resultados não permitem concluir que a solução aumente captação ou reduza perdas de oportunidades em Angola.')
h('6 SEGURANÇA',1)
h('6.1 Princípios de segurança adoptados')
p('Aplicaram-se privilégio mínimo na ligação da aplicação, autorização no servidor e documentos privados por defeito. A proteção tem alcance local e verificável; não se apresenta como certificação de segurança. O papel seed_app não é superutilizador, não cria bases ou papéis e não pode modificar ou apagar os registos de transições e auditoria.')
h('6.2 Autenticação e gestão de credenciais')
p('As palavras-passe são armazenadas com scrypt e salt aleatório. As sessões utilizam tokens opacos aleatórios, dos quais só o hash SHA-256 é persistido, com validade de oito horas. O cookie é HttpOnly e SameSite Strict; Secure é condicionado a HTTPS. A limitação de tentativas é de dez por email numa janela de quinze minutos, armazenando hash do email. Não existem 2FA, recuperação por email, deteção distribuída de abuso ou rotação por alteração de palavra-passe na interface.')
h('6.3 Autorização e controlo de acessos')
p('A sessão identifica utilizador e organização. Cada operação verifica papel, associação e propriedade antes de consultar ou alterar o recurso. Um UUID conhecido não concede acesso. O controlo é aplicado no serviço, sem depender da ocultação de botões, e foi testado por pedidos diretos entre cinco contas. Não se utiliza row-level security PostgreSQL; alterações futuras no serviço devem manter os filtros e os testes de isolamento.')
h('6.4 Protecção de dados e privacidade')
p('A demonstração utiliza contas fictícias e não ingere respostas de pesquisa. Os documentos devem ser de teste. Não se afirma conformidade jurídica nem anonimato de dados que não foram inspecionados. A eliminação de um documento remove também as permissões associadas, mas o registo de auditoria conserva o identificador da operação. Retenção de contas, logs e backups necessita de política formal antes de utilização com dados reais.')
h('6.5 Segurança das comunicações')
p('A execução verificada utiliza HTTP no loopback local. Não há TLS demonstrado nem publicação externa. Os pedidos de alteração na API exigem origem correspondente a APP_ORIGIN; as Server Actions de autenticação seguem os controlos de origem do Next.js. SQL parametrizado reduz o risco de injeção nos valores, e as respostas de falha de base de dados não incluem credenciais, SQL ou detalhes de conexão. A exposição pública exigiria configuração de HTTPS, revisão de cabeçalhos, proteções adicionais e avaliação própria.')
h('6.6 Segurança do data room')
p('Ficheiros PDF e texto UTF-8 até 2 MiB são armazenados em bytea na base de dados. A aplicação verifica tamanho e assinatura inicial do PDF ou validade básica do texto. Isto não constitui análise antivírus. A descarga é entregue como anexo com nosniff, após autorização por documento. Não há URL pública ou presigned URL. Revogar impede novas descargas, mas não apaga cópias já obtidas pelo destinatário.')
h('6.7 Auditoria, registo de eventos e monitorização')
p('Os eventos registam utilizador, ação, recurso e data para operações de negócio e downloads. A transição guarda etapa anterior e seguinte. Não existe monitorização centralizada ou alerta automático de anomalias; tentativas de login são limitadas, mas não descritas como uma trilha completa de autenticação. A auditoria não conserva o conteúdo de todas as alterações, pelo que a reconstrução de valores monetários históricos é limitada.')
h('6.8 Cópias de segurança, recuperação e continuidade')
p('O backup utiliza pg_dump em formato custom e o restauro pg_restore numa base nova, preservando a origem. A documentação PostgreSQL descreve a consistência do dump e os mecanismos de recuperação (PostgreSQL Global Development Group, [s. d.]). Como o conteúdo dos documentos está na mesma base, o procedimento abrange metadados, permissões e bytes. Não há agendamento automático ou redundância externa implementados.')
h('6.9 Opções de alojamento e impactos na segurança')
table('Tabela 9 — Alojamento local e evolução futura',['Aspeto','Ambiente verificado','Evolução por avaliar'],[
 ['Rede','127.0.0.1; aplicação 3000; BD 55432','HTTPS, proxy e revisão de exposição'],['Administração','Socket em diretório 0700 do utilizador','Separação operacional e gestão de segredos'],['Documentos','bytea até 2 MiB','Object storage privado e análise de ficheiros'],['Recuperação','Dump e restauro separados testados','Agendamento, retenção e cópia externa']])
h('6.10 Síntese das medidas implementadas')
p('A evidência sustenta autenticação local, isolamento por recurso, validação de entradas, transações e recuperação testada. Não sustenta a afirmação de um sistema pronto para produção ou totalmente seguro. Processos com acesso ao mesmo utilizador do sistema operativo podem administrar a instância através do socket local; o diretório privado e a restrição ao loopback definem o limite de confiança da demonstração.')
h('7 IMPLANTAÇÃO',1)
h('7.1 Arquitectura de implantação')
p('A instalação nativa PostgreSQL 16 já existente na máquina foi identificada, mas a instância global na porta 5432 não pôde ser administrada sem privilégios. Reutilizaram-se os binários para criar um cluster dedicado em .local/postgres, porta 55432, sob o utilizador do projeto. Não foram alteradas bases, utilizadores ou volumes de outros projetos. A aplicação executa separadamente em 127.0.0.1:3000.')
h('7.2 Requisitos de hardware e software')
table('Tabela 10 — Ambiente de execução verificado',['Componente','Versão/configuração','Limite da evidência'],[
 ['Node.js / npm','24.15.0 / 12.0.2','Ambiente local observado'],['Next.js / React','16.2.7 / 19.2.4','Dependências fixadas no lockfile'],['PostgreSQL','16.15; porta 55432','Cluster exclusivo persistente'],['Aplicação','Monólito Next.js; máximo 5 ligações','Sem teste de dimensionamento'],['Documentos','PDF/texto até 2 MiB por ficheiro','Sem benchmark de grandes volumes'],['Relatório','DOCX, LibreOffice e PDF','Revisão local da renderização']])
p('Não se apresentam valores de CPU ou memória como requisitos mínimos medidos, porque não foi realizado ensaio de capacidade. É necessário dispor de Linux com binários PostgreSQL 16, Node.js compatível, npm, espaço livre para dependências, base e backups. Python e LibreOffice destinam-se à regeneração do relatório; não são requisitos de execução da aplicação.')
h('7.3 Modos de implantação')
p('A implantação executada é local e nativa. Docker estava disponível, mas não foi necessário criar containers, pois os binários compatíveis permitiram isolamento sem privilégios administrativos. Uma implantação em nuvem é apenas possibilidade futura, sem domínio, serviço externo ou credencial configurada nesta entrega. Não houve deploy nem publicação.')
h('7.4 Procedimento de implantação')
for s in ['1. Instalar dependências com npm ci, utilizando o package-lock.json versionado.', '2. Executar npm run db:start; o script cria apenas o cluster dedicado quando ausente e gera .env.local com senha aleatória.', '3. Executar npm run db:migrate para aplicar migrações SQL ainda não registadas.', '4. Executar npm run db:seed para inserir contas demonstrativas sem apagar registos existentes. As credenciais ficam em .local/demo-credentials.json, com acesso local restrito.', '5. Executar npm run dev para desenvolvimento ou npm run build seguido de npm run start para a versão de produção local. Abrir http://localhost:3000/login.', '6. Executar npm test, npm run lint e npm run typecheck. Os testes de integração exigem aplicação e base ativas; não são executados sobre bases de outros projetos.']:plain(s)
p('O ficheiro .env.example contém apenas um modelo sem segredo. DATABASE_URL é utilizado exclusivamente no servidor; APP_ORIGIN define a origem aceite. Para ambientes diferentes, a localização dos binários pode ser definida por PGBIN. O script não redefine senhas ou apaga dados quando existe configuração. Se .env.local se perder, a recuperação deve ser feita conscientemente pelo administrador, sem reinicializar a base.')
h('7.5 Testes pós-implantação e roteiro de demonstração')
p('Entrar como startup principal, consultar e editar o perfil, abrir uma ronda, associar o investidor de exemplo, registar uma reunião e mudar a etapa para reunião. Registar uma intenção e depois o estado de term sheet, observando que não há valor recebido. Anexar texto ou PDF de demonstração; numa sessão separada de investidor confirmar recusa antes da concessão, permitir acesso pela startup, descarregar e depois revogar. Recarregar a página e consultar indicadores. Na outra startup, confirmar que os recursos da principal não aparecem.')
p('A verificação de reinício utiliza node scripts/check-persistence.mjs após parar e voltar a iniciar apenas a aplicação deste projeto. O teste de indisponibilidade node scripts/check-outage.mjs para e recupera exclusivamente o cluster dedicado. O comando bash scripts/backup-verify.sh cria dump e base de restauro nova e compara contagens e hashes dos documentos. Estes comandos foram executados; não são apenas propostas de validação.')
h('7.6 Monitorização, backups e manutenção')
p('Logs locais em .local apoiam diagnóstico, mas não constituem monitorização de produção. Backups ficam em .local/backups e contêm informação sensível; não são versionados. As bases de restauro criadas são preservadas. Numa recuperação real deve selecionar-se o dump correto, restaurar numa base nova, verificar conteúdo e permissões e só depois planear eventual mudança de ligação. Não se utiliza DROP DATABASE nem restauro destrutivo sobre a origem.')
h('7.7 Considerações de escalabilidade')
p('A listagem atual carrega os recursos autorizados sem paginação. O limite de ficheiro, o pool e os timeouts são adequados à demonstração, mas não substituem dimensionamento. A evolução deverá considerar paginação, observabilidade, manutenção de sessões expiradas e tentativas antigas, armazenamento documental externo e ensaios de carga. Não é necessário introduzir microserviços para comprovar o fluxo do TFC.')
h('7.8 Síntese do capítulo')
p('A implantação local reproduzível foi concretizada com instância PostgreSQL exclusiva, migração, provisionamento demonstrativo e aplicação efetivamente ligada à base. O procedimento preserva outras instâncias e os dados existentes. A versão executável e a versão de leitura do relatório documentam o que foi verificado, sem confundir instalação local com publicação ou aprovação de produção.')
h('8 CONCLUSÕES, CONSIDERAÇÕES FINAIS E TRABALHOS FUTUROS',1)
p('O objetivo técnico de construir um fluxo local de organização da captação foi alcançado no âmbito descrito: perfil de startup, ronda, negociação por investidor, interações, etapas, intenção, term sheet e documentos autorizados persistem em PostgreSQL. Os indicadores são derivados de eventos armazenados, com denominadores e ausência de base de cálculo explícitos. Autorização entre contas, recarga, reinício, indisponibilidade e backup/restauro foram objeto de verificação local.')
p('A contribuição para a pergunta de investigação consiste numa demonstração técnica de como centralizar e acompanhar relações de captação. Não foi demonstrado aumento de financiamento, redução de tempo negocial, melhoria de confiança ou adoção. O levantamento é documentado como instrumento e fonte de requisitos candidatos; respostas e tarefas com participantes permanecem indisponíveis para análise nesta execução. O relatório revisto não representa, portanto, conclusão integral de eventual componente empírica exigida pelo ISPTEC.')
p('Como trabalho futuro, recomenda-se recuperar as respostas com origem e consentimento verificáveis, aplicar o plano de análise descrito, avaliar tarefas com startups, investidores e aceleradoras e confirmar as orientações institucionais. A evolução do software pode incluir gestão de membros, recuperação de acesso, histórico completo de alterações, paginação, tarefas de due diligence e integrações justificadas por necessidades efetivamente observadas. A assinatura eletrónica exige implementação e validação próprias; upload ou registo manual não a substituem.')
h('REFERÊNCIAS',1)
refs=[
'COHEN, Susan; HOCHBERG, Yael V. Accelerating startups: the seed accelerator phenomenon. SSRN Electronic Journal, 2014. DOI: 10.2139/ssrn.2418000. Disponível em: https://scholarship.richmond.edu/management-faculty-publications/54/. Acesso em: 7 out. 2026.',
'COHEN, Susan; FEHDER, Daniel C.; HOCHBERG, Yael V.; MURRAY, Fiona. The design of startup accelerators. Research Policy, v. 48, n. 7, p. 1781–1797, 2019. DOI: 10.1016/j.respol.2019.04.003. Disponível em: https://www.sciencedirect.com/science/article/pii/S0048733319300939. Acesso em: 7 out. 2026.',
'DAVIS, Fred D. Perceived usefulness, perceived ease of use, and user acceptance of information technology. MIS Quarterly, v. 13, n. 3, p. 319–340, 1989. Disponível em: https://aisel.aisnet.org/misq/vol13/iss3/6/. Acesso em: 7 out. 2026.',
'DROPBOX. Startup fundraising & pitch deck analytics. DocSend, [s. d.]. Disponível em: https://www.docsend.com/solutions/startup-fundraising/. Acesso em: 7 out. 2026.',
'GOMPERS, Paul; LERNER, Josh. The venture capital revolution. Journal of Economic Perspectives, v. 15, n. 2, p. 145–168, 2001. DOI: 10.1257/jep.15.2.145. Disponível em: https://www.aeaweb.org/articles?id=10.1257/jep.15.2.145. Acesso em: 7 out. 2026.',
'HEVNER, Alan R.; MARCH, Salvatore T.; PARK, Jinsoo; RAM, Sudha. Design science in information systems research. MIS Quarterly, v. 28, n. 1, p. 75–105, 2004. Disponível em: https://aisel.aisnet.org/misq/vol28/iss1/10/. Acesso em: 7 out. 2026.',
'NODE-POSTGRES. Pooling. [S. l.], [s. d.]. Disponível em: https://node-postgres.com/features/pooling. Acesso em: 7 out. 2026.',
'POSTGRESQL GLOBAL DEVELOPMENT GROUP. PostgreSQL 16 documentation: SQL dump. [S. l.], [s. d.]. Disponível em: https://www.postgresql.org/docs/16/backup-dump.html. Acesso em: 7 out. 2026.',
'UNIVERSIDADE FEDERAL DO ESPÍRITO SANTO. Sistema Integrado de Bibliotecas. Normalização. Vitória, [s. d.]. Disponível em: https://biblioteca.ufes.br/manuais-de-normalizacao. Acesso em: 7 out. 2026.',
'VERCEL. Next.js documentation: authentication, route handlers and cookies. [S. l.], [s. d.]. Documentação distribuída com Next.js 16.2.7, consultada em node_modules/next/dist/docs/ em 7 out. 2026.',
'VISIBLE. The platform for investors and founders building together. [S. l.], [s. d.]. Disponível em: https://visible.vc/. Acesso em: 7 out. 2026.',
'WORLD BANK GROUP. Angola digital economy diagnostic report. Washington, DC: World Bank, 2023. Disponível em: https://documents1.worldbank.org/curated/en/099021406262319882/pdf/IDU0cfa535a90914f043630bb860ddc79fa75def.pdf. Acesso em: 7 out. 2026.'
]
for ref in sorted(refs):
 x=plain(ref);x.alignment=WD_ALIGN_PARAGRAPH.LEFT;x.paragraph_format.line_spacing=1;x.paragraph_format.space_after=Pt(12)
h('APÊNDICE A — DOCUMENTAÇÃO DO INSTRUMENTO',1)
p('Título informado: “Plataforma de Captação de Fundos para Startups Aceleradas em Angola”. Este apêndice é uma síntese documental do conteúdo descrito pelo autor a partir das capturas. Não é uma transcrição literal conferida com imagens, nem uma nova versão apresentada como originalmente aplicada. Autoria formal do formulário, datas de aplicação, número exato de itens, texto integral do consentimento, âncoras das escalas e regras de obrigatoriedade não puderam ser confirmados.')
axes=[
('A — Consentimento e caracterização','Participação voluntária e uso académico; perfil de fundador/membro de startup acelerada, aceleradora/incubadora, investidor ou outro; tempo de atuação; país e província.'),
('B — Situação atual da captação pós-aceleração','Existência e estruturação do processo; ferramentas utilizadas, incluindo email, folhas de cálculo, documentos partilhados e ferramentas genéricas/específicas; organização, negociações, centralização, medição e perda de oportunidades por falta de acompanhamento.'),
('C — Frequência de dificuldades','Informação dispersa; identificação da etapa de cada potencial investidor; registo de reuniões, decisões e soft commits; partilha segura de documentos; indicadores; criticidade de melhorar e descrição de problemas concretos.'),
('D — Perceção da solução proposta','Conhecimento de soluções semelhantes; utilidade do data room; estados contactado, reunião, soft commit e term sheet; histórico; tempo até compromisso e conversão; partilha entre intervenientes.'),
('E — Funcionalidades consideradas','Perfis de startups, rondas, data room com acessos, contactos e reuniões, intenções e estado negocial, indicadores e possibilidade de assinatura eletrónica. A menção não comprova prioridade ou procura pelos respondentes.'),
('F — Interesse e confiança','Perceção de melhoria, interesse em uso, preocupações com segurança, privacidade, aspetos legais e facilidade; comentários; interesse em testar e email opcional.')]
for title,content in axes:h(title,2);p(content)
h('Proposta de melhoria para uma aplicação futura',2)
p('Separar a recolha de contactos do questionário de pesquisa; esclarecer se existe identificação automática; distinguir consentimento para pesquisa e para contacto posterior; explicitar âncoras ordinais, não aplicabilidade e período de referência; e avaliar o protótipo após uso. Estas são propostas futuras e não mudanças retroativas no instrumento descrito. As respostas permanecem indisponíveis para análise; não há gráficos ou resultados empíricos neste apêndice.')
h('APÊNDICE B — MATRIZ DE RASTREABILIDADE',1)
p('A matriz distingue pergunta, necessidade investigada, requisito candidato, implementação e origem. Nenhuma linha é justificada por respostas efetivamente analisadas. O ficheiro docs/traceability.csv contém a versão tabular reutilizável; as fichas abaixo preservam todas as dimensões sem comprimir nove colunas numa página A4.')
with open(root/'docs/traceability.csv') as f:
 for row in csv.DictReader(f,delimiter=';'):
  h(row['ID']+' — '+row['Requisito candidato'],2)
  for key in ['Eixo do instrumento','Necessidade investigada','Funcionalidade','Entidades e regras','Teste ou evidência','Estado','Origem da justificação']:p(key+': '+row[key]+'.')
h('APÊNDICE C — INVENTÁRIO DE EVIDÊNCIAS E PENDÊNCIAS',1)
p('Artefactos técnicos: README.md (instalação e demonstração), docs/architecture.md (arquitetura e fórmulas), docs/traceability.csv (matriz), db/migrations (esquema), tests/capture.spec.ts (testes), scripts/check-persistence.mjs, scripts/check-outage.mjs e scripts/backup-verify.sh (recuperação), docs/verification/results.md e imagens da interface. Os logs completos locais e credenciais permanecem em .local, fora do Git.')
p('Pendências indispensáveis à validação académica integral: respostas verificáveis caso a componente empírica seja exigida; capturas/formulário original para transcrição fiel; manual institucional e confirmação dos dados da banca e data de aprovação. Esses itens não impedem a demonstração técnica, mas delimitam a conclusão do TFC. Dados sintéticos não devem ser reutilizados como respostas ou como evidência de impacto.')
p('Nota bibliográfica: o diagnóstico do World Bank Group apresenta copyright 2023, coerente com o catálogo de diagnósticos publicado em maio de 2023, mas contém uma sugestão interna de citação com 2020. Adotou-se 2023 com base no copyright e no catálogo, registando a divergência em vez de a ocultar. Foram verificadas páginas de identificação e resumos das publicações; não se atribuem resultados específicos de textos integrais que não tenham sido examinados.')
# Consistent page breaks and field refresh.
settings=D.settings.element
update=OxmlElement('w:updateFields');update.set(qn('w:val'),'true');settings.append(update)
D.core_properties.title='Desenvolvimento de uma plataforma de captação de fundos para startups aceleradas'
D.core_properties.author='Antonewton Emanuel Lungoge Quima'
D.core_properties.subject='Protótipo local SEED e limites da validação empírica'
D.save(path)
print('Atualizado:',path)
