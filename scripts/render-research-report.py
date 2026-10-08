"""Render only the private research candidate through an isolated UNO listener.
Run with /usr/bin/python3. Never opens/saves the user's main DOCX.
"""
import re, os, sys
from pathlib import Path
import uno
from com.sun.star.beans import PropertyValue
ROOT=Path(__file__).resolve().parents[1];PRIVATE=ROOT/'.local/research-2026-10-08'
def props(**values):
 out=[]
 for k,v in values.items():p=PropertyValue();p.Name=k;p.Value=v;out.append(p)
 return tuple(out)
local=uno.getComponentContext();resolver=local.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver',local)
ctx=resolver.resolve('uno:socket,host=localhost,port=2028;urp;StarOffice.ComponentContext')
desktop=ctx.ServiceManager.createInstanceWithContext('com.sun.star.frame.Desktop',ctx)
doc=desktop.loadComponentFromURL((PRIVATE/'tcc_antonewton-revised.docx').as_uri(),'_blank',0,props(Hidden=True))
for iteration in range(3):
 for i in range(doc.DocumentIndexes.Count):doc.DocumentIndexes.getByIndex(i).update()
 doc.refresh();cursor=doc.CurrentController.ViewCursor
 enum=doc.Text.createEnumeration();paras=[]
 while enum.hasMoreElements():
  p=enum.nextElement()
  if p.supportsService('com.sun.star.text.Paragraph'):paras.append(p)
 captions={}
 for p in paras:
  s=p.String
  if re.match(r'^(Figura|Tabela) \d+ — ',s):
   base=s.split('\t')[0];captions.setdefault(base,[]).append(p)
 for title,pp in captions.items():
  if len(pp)!=2:raise RuntimeError('Caption/list mismatch: '+title)
  cursor.gotoRange(pp[-1].Start,False);page=cursor.Page-1
  pp[0].String=title+'\t'+str(page)
 for i in range(doc.DocumentIndexes.Count):doc.DocumentIndexes.getByIndex(i).update()
 doc.refresh()
doc.storeAsURL((PRIVATE/'tcc_antonewton-revised.docx').as_uri(),props(FilterName='Office Open XML Text',Overwrite=True))
doc.storeToURL((PRIVATE/'tcc_antonewton-revised.pdf').as_uri(),props(FilterName='writer_pdf_Export',Overwrite=True))
print('Rendered pages:',doc.CurrentController.PageCount,'indexes:',doc.DocumentIndexes.Count)
doc.dispose()
sys.stdout.flush()
os._exit(0)  # Avoid UNO Python bridge teardown crash after successful close/export.
