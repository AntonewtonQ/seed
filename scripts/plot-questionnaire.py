"""Plot aggregate distributions only (no respondent-level input)."""
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'docs/research/aggregate.json').read_text())['frequencies']
OUT=ROOT/'docs/research/figures';OUT.mkdir(exist_ok=True)
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':10})

def bars(name,variables,labels,categories,colors):
    fig,ax=plt.subplots(figsize=(9,4.7));left=[0]*len(variables)
    for cat,color in zip(categories,colors):
        counts=[next(r['n'] for r in data if r['variable']==v and r['category']==cat) for v in variables]
        ax.barh(range(len(labels)),counts,left=left,label=cat,color=color,edgecolor='white')
        for i,n in enumerate(counts):
            if n:ax.text(left[i]+n/2,i,str(n),ha='center',va='center',fontsize=10,color='black')
        left=[a+b for a,b in zip(left,counts)]
    ax.set_yticks(range(len(labels)),labels);ax.invert_yaxis();ax.set_xlim(0,24)
    ax.set_xticks([0,6,12,18,24]);ax.set_xlabel('Número de respostas (N = 24 em cada item; ausentes = 0)')
    ax.spines[['top','right']].set_visible(False)
    ax.legend(loc='upper center',bbox_to_anchor=(.35,-.2),ncol=3,frameon=False,fontsize=9)
    fig.tight_layout()
    for ext in ('png','svg'):fig.savefig(OUT/f'{name}.{ext}',dpi=200,bbox_inches='tight')
    plt.close(fig)

bars('difficulties',[f'Q09{x}' for x in 'abcde'],['Informação dispersa','Etapa do investidor','Registo de interações','Partilha segura','Indicadores'],['Nunca','Raramente','Às vezes','Frequentemente','Quase sempre'],['#e6edf0','#bdd8d8','#ffe6a7','#e7b06e','#cd8567'])
bars('utility',[f'Q13{x}' for x in 'abcde'],['Centralizar documentos','Acompanhar etapas','Histórico de interações','Gerar indicadores','Partilha segura'],['Nada útil','Pouco útil','Moderadamente útil','Muito útil','Extremamente útil'],['#e4a19a','#f3c6aa','#eee3b7','#a7cdbe','#6dab93'])
rr=[r for r in data if r['variable']=='Q14'];labels=['Perfil da startup','Rondas de investimento','Data room com acessos','Contactos e reuniões','Soft commits e negociações','Painéis de indicadores','Assinatura eletrónica']
fig,ax=plt.subplots(figsize=(9,4.8));ax.barh(labels,[r['n'] for r in rr],color='#4e8673');ax.invert_yaxis();ax.set_xlim(0,28)
for i,r in enumerate(rr):ax.text(r['n']+.3,i,f"{r['n']} ({str(r['percent']).replace('.',',')}%)",va='center',fontsize=10)
ax.set_xlabel('Seleções / 24 respostas; seleção múltipla; ausentes = 0');ax.set_xticks([0,6,12,18,24]);ax.spines[['top','right']].set_visible(False);fig.tight_layout()
for ext in ('png','svg'):fig.savefig(OUT/f'features.{ext}',dpi=200,bbox_inches='tight')
print('Three aggregate figures generated.')
