from pathlib import Path
from html import escape
import cairosvg
out=Path('docs/report/figures');out.mkdir(exist_ok=True)
def render(name,w,h,nodes,edges):
 s=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="#145A5B"/></marker></defs><rect width="100%" height="100%" fill="white"/>']
 for a,b,label in edges:
  x,y,bw,bh,_=nodes[a];xx,yy,ww,hh,_=nodes[b]
  if abs(xx-x)>abs(yy-y): x1,y1=(x+bw,y+bh/2) if xx>x else (x,y+bh/2);x2,y2=(xx,yy+hh/2) if xx>x else (xx+ww,yy+hh/2)
  else:x1,y1=(x+bw/2,y+bh) if yy>y else (x+bw/2,y);x2,y2=(xx+ww/2,yy) if yy>y else (xx+ww/2,yy+hh)
  if name=='entities' and a=='org' and b=='opp':
   s.append('<path d="M300,70 H950 V510 H910" stroke="#145A5B" stroke-width="2" fill="none" marker-end="url(#arrow)"/>')
   s.append('<text x="470" y="60" font-family="sans-serif" font-size="16">investidor: 1 / N</text>');continue
  if name=='access' and a=='org' and b=='grant':
   s.append('<path d="M795,110 V160 H930 V620 H475 V560" stroke="#145A5B" stroke-width="2" fill="none" marker-end="url(#arrow)"/>')
   s.append('<text x="570" y="610" font-family="sans-serif" font-size="16">destinatária: 1 / N</text>');continue
  s.append(f'<path d="M{x1},{y1} L{x2},{y2}" stroke="#145A5B" stroke-width="2" fill="none" marker-end="url(#arrow)"/>')
  if label:s.append(f'<text x="{(x1+x2)/2+5}" y="{(y1+y2)/2-6}" font-family="sans-serif" font-size="14" fill="#333">{escape(label)}</text>')
 for x,y,bw,bh,lines in nodes.values():
  s.append(f'<rect x="{x}" y="{y}" width="{bw}" height="{bh}" rx="9" fill="#eef5f3" stroke="#145A5B" stroke-width="2"/>')
  for i,line in enumerate(lines):s.append(f'<text x="{x+12}" y="{y+26+i*22}" font-family="sans-serif" font-size="{18 if i==0 else 15}" font-weight="{"bold" if i==0 else "normal"}">{escape(line)}</text>')
 s.append('</svg>');svg=''.join(s);(out/(name+'.svg')).write_text(svg);cairosvg.svg2png(bytestring=svg.encode(),write_to=str(out/(name+'.png')),scale=2)
render('architecture',900,500,{
 'ui':(30,30,350,85,['Navegador / React','Formulários e indicadores']),
 'http':(520,30,350,85,['Next.js Route Handlers','Cookie HttpOnly / origem / erros']),
 'service':(520,200,350,105,['Serviço de captação','Zod + organização + recurso','Transações e regras de negócio']),
 'db':(30,350,350,115,['PostgreSQL 16.15','Dados, sessões e auditoria','Documentos bytea + permissões']),
 'pool':(520,360,350,85,['node-postgres (pg)','Pool: máximo 5 ligações'])},[('ui','http','HTTP local'),('http','service','actor'),('service','pool','SQL'),('pool','db','TCP 55432')])
render('entities',960,700,{
 'org':(20,20,280,105,['organizations','PK id · name · kind','startup / investor / accelerator']),
 'startup':(20,215,280,110,['startups','PK id · UNIQUE organization_id','FK accelerator_id (opcional)']),
 'round':(20,435,280,125,['rounds','PK id · FK startup_id','target numeric(18,2) · currency','status · created_at']),
 'opp':(430,435,480,155,['opportunities','PK id · FK round_id · FK investor_id','UNIQUE(round_id, investor_id)','stage · soft_amount · soft_at','term_status · next_step · created_at']),
 'trans':(380,215,250,105,['transitions','FK opportunity_id / actor_id','from_stage · to_stage · data']),
 'interaction':(680,215,260,105,['interactions','FK opportunity_id / actor_id','kind · body · occurred_at'])},[('org','startup','1 / 0..1'),('startup','round','1 / N'),('round','opp','1 / N'),('org','opp','investidor 1 / N'),('opp','trans','1 / N'),('opp','interaction','1 / N')])
render('access',940,660,{
 'user':(20,20,250,90,['users','PK id · UNIQUE email','password_hash · name']),
 'member':(345,20,250,90,['memberships','PK (user_id, organization_id)','UNIQUE user_id']),
 'org':(670,20,250,90,['organizations','PK id · kind','startup / investor / accelerator']),
 'session':(20,240,250,90,['sessions','PK token_hash · FK user_id','expires_at']),
 'audit':(345,240,250,90,['audit_events','PK id · FK actor_id','action · resource_id · data']),
 'startup':(670,240,250,90,['startups','PK id','FK organization_id']),
 'grant':(330,470,290,90,['document_grants','PK (document_id, organization_id)','Autorização explícita']),
 'doc':(670,465,250,130,['documents','PK id · FK startup_id','name · media_type · data','content bytea (até 2 MiB)'])},[('user','member','1 / 1'),('member','org','N / 1'),('user','session','1 / N'),('user','audit','1 / N'),('org','startup','1 / 0..1'),('startup','doc','1 / N'),('org','grant','1 / N'),('doc','grant','1 / N')])
render('sequence',900,710,{
 'a':(30,20,380,80,['1 · Startup autenticada','Envia atualização da negociação']),
 'b':(490,20,380,80,['2 · Route Handler','Valida origem e sessão']),
 'c':(490,160,380,100,['3 · Serviço','Valida campos e propriedade','BEGIN · SELECT FOR UPDATE']),
 'd':(490,330,380,100,['4 · PostgreSQL','UPDATE negociação','INSERT transição + auditoria']),
 'e':(490,505,380,80,['5 · COMMIT','Resposta 200']),
 'f':(30,505,380,80,['6 · Interface','Consulta estado persistido']),
 'g':(30,195,380,120,['Alternativa de erro','Sem acesso: 404; ronda fechada: 409','Campos inválidos: 400','ROLLBACK · sem detalhes internos'])},[('a','b','pedido'),('b','c','actor'),('c','d','autorizado'),('d','e','consistência'),('e','f','recarregar'),('c','g','recusado')])

# UML-style sequence with participants, lifelines and transaction boundary.
s=['<svg xmlns="http://www.w3.org/2000/svg" width="980" height="720"><defs><marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L7,4 L0,8" fill="none" stroke="#145A5B"/></marker></defs><rect width="980" height="720" fill="white"/>']
for x,title in [(120,'Startup'),(350,'Route Handler'),(590,'Serviço'),(850,'PostgreSQL')]:
 s.append(f'<rect x="{x-100}" y="20" width="200" height="55" rx="5" fill="#eef5f3" stroke="#145A5B"/><text x="{x}" y="55" text-anchor="middle" font-family="sans-serif" font-size="20">{title}</text><path d="M{x},75 V650" stroke="#888" stroke-dasharray="6 5"/>')
for x1,x2,y,label in [(120,350,130,'POST transition'),(350,850,185,'Validar sessão'),(850,350,225,'Utilizador + organização'),(350,590,275,'Validar campos e acesso'),(590,850,330,'BEGIN / SELECT FOR UPDATE'),(590,850,390,'UPDATE negociação'),(590,850,440,'INSERT transição + auditoria'),(590,850,495,'COMMIT'),(850,350,545,'Operação confirmada'),(350,120,595,'200 / consultar estado')]:
 s.append(f'<path d="M{x1},{y} H{x2}" stroke="#145A5B" stroke-width="2" marker-end="url(#a)"/><text x="{(x1+x2)/2}" y="{y-9}" text-anchor="middle" font-family="sans-serif" font-size="16">{label}</text>')
s.append('<text x="40" y="690" font-family="sans-serif" font-size="16">Erro: ROLLBACK e resposta 400, 404 ou 409; indisponibilidade: 503 sem detalhes internos.</text></svg>')
svg=''.join(s);(out/'sequence.svg').write_text(svg);cairosvg.svg2png(bytestring=svg.encode(),write_to=str(out/'sequence.png'),scale=2)
