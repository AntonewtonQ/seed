"""Run with /usr/bin/python3 (python3-uno) after starting the isolated LibreOffice listener."""
import uno
from pathlib import Path
from com.sun.star.beans import PropertyValue
root=Path(__file__).resolve().parent.parent
local=uno.getComponentContext();resolver=local.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver',local)
ctx=resolver.resolve('uno:socket,host=localhost,port=2017;urp;StarOffice.ComponentContext')
desktop=ctx.ServiceManager.createInstanceWithContext('com.sun.star.frame.Desktop',ctx)
def props(**kwargs):
 result=[]
 for k,v in kwargs.items():p=PropertyValue();p.Name=k;p.Value=v;result.append(p)
 return tuple(result)
doc=desktop.loadComponentFromURL((root/'docs/report/tcc_antonewton.docx').as_uri(),'_blank',0,props(Hidden=True))
indexes=doc.getDocumentIndexes();print('Índices encontrados:',indexes.Count)
if not indexes.Count:
 # Create native TOC where the existing SUMÁRIO paragraph is located.
 search=doc.createSearchDescriptor();search.SearchString='SUMÁRIO';found=doc.findFirst(search)
 cursor=doc.Text.createTextCursorByRange(found.End);cursor.gotoNextParagraph(False)
 index=doc.createInstance('com.sun.star.text.ContentIndex');index.CreateFromOutline=True;index.Level=3;index.Title='';doc.Text.insertTextContent(cursor,index,False)
for i in range(doc.getDocumentIndexes().Count):doc.getDocumentIndexes().getByIndex(i).update()
doc.refresh()
# Recompute after pagination.
for i in range(doc.getDocumentIndexes().Count):doc.getDocumentIndexes().getByIndex(i).update()
doc.storeAsURL((root/'docs/report/tcc_antonewton.docx').as_uri(),props(FilterName='Office Open XML Text',Overwrite=True))
doc.storeToURL((root/'docs/report/tcc_antonewton.pdf').as_uri(),props(FilterName='writer_pdf_Export',Overwrite=True))
print('DOCX e PDF atualizados. Páginas:',doc.CurrentController.PageCount)
doc.close(True)
