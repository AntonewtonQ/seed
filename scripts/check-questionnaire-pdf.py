"""Read all 240 recovered PDF pages and cross-check grid marks with XLSX.
Private source required. Public output contains aggregate checks only.
"""
import importlib.util
import json
import re
from pathlib import Path
import pymupdf
import openpyxl

ROOT=Path(__file__).resolve().parents[1]
PRIVATE=ROOT/'.local/research-2026-10-08'
spec=importlib.util.spec_from_file_location('analysis',ROOT/'scripts/analyze-questionnaire.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
pdf=pymupdf.open(next(PRIVATE.glob('*Google Forms.pdf')))
rows=list(openpyxl.load_workbook(next(PRIVATE.glob('*.xlsx')),data_only=True).active.values)[1:]
def norm(v):return re.sub(r'\s+','',str(v or '')).replace('\u200b','')
checks=0;failures=[]
for k,row in enumerate(rows):
    block=''.join(pdf[k*10+j].get_text() for j in range(10))
    # All free-text answers, geography and contacts checked privately, never emitted.
    for col in (4,5,19,29,30,32):
        if row[col]:
            checks+=1
            if norm(row[col]) not in norm(block):failures.append({'block':k+1,'column':col,'kind':'text mismatch'})
    for offset,cols,scale,xs in [(3,range(8,13),m.AGREE,[191.25,274.5,357,439.5,523.5]),(4,range(13,18),m.FREQ,[183,267,353,437.25,525]),(6,range(21,26),m.UTILITY,[184,268,352,435.75,520.5])]:
        dots=[]
        for d in pdf[k*10+offset].get_drawings():
            c=d['fill'] or d['color'];r=d['rect']
            if c and c[2]>.7 and c[0]<.6 and c[1]<.5 and 3<r.width<5:dots.append(((r.x0+r.x1)/2,(r.y0+r.y1)/2))
        dots=sorted(dots,key=lambda a:a[1])[:5]
        if len(dots)!=5:failures.append({'block':k+1,'kind':'grid mark count'});continue
        for col,(x,y) in zip(cols,dots):
            got=scale[min(range(5),key=lambda j:abs(xs[j]-x))];checks+=1
            if got!=row[col]:failures.append({'block':k+1,'column':col,'kind':'grid mismatch'})
    # Feature checkboxes: original options have fixed order and 27 pt spacing.
    selected=[]
    for d in pdf[k*10+7].get_drawings():
        c=d['fill'] or d['color'];r=d['rect']
        if c and c[2]>.7 and c[0]<.6 and c[1]<.5 and 14<r.width<16:
            idx=round(((r.y0+r.y1)/2-108.75)/27)
            if 0<=idx<7:selected.append(m.FEATURES[idx])
    checks+=1
    if set(selected)!=set(m.split_multiple(row[26],m.FEATURES)):failures.append({'block':k+1,'kind':'feature mismatch'})
(PRIVATE/'pdf-check-details.json').write_text(json.dumps(failures,indent=2))
result={'pages_read':len(pdf),'individual_blocks':len(rows),'checks':checks,'mismatches':len(failures),'scope':'All page text; free-text/geography/contact correspondence; 360 ordinal grid cells and 24 feature selections. Other closed questions not independently decoded. No aggregate summary charts in recovered PDF.','reference_24':'Matches author-reported screenshot count; screenshot graphics unavailable for visual comparison.'}
(ROOT/'docs/research/pdf-crosscheck.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps(result,ensure_ascii=False))
