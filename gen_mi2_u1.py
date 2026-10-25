import json, os
base = r"C:\Users\val\Desktop\proyectospersonales\SistemaPreparacion-USAC\data\mi2_reposicion"
qs = []
ex = [
  {"q":"Dado a=(1,0,3), b=(-1,3,0), calcule ||b-a||. Respuesta a 3 decimales.", "c":4.359},
  {"q":"Vector director v=b-a para a=(1,0,3), b=(-1,3,0). Calcule v1+v2+v3. Respuesta a 3 decimales.", "c":-2.000},
  {"q":"Sea recta L: x=(1,0,3)+t(-2,3,-3), z=(2,2,2). Calcule t̂=(w^T v)/(v^T v) con w=z-a. Respuesta a 3 decimales.", "c":0.318},
  {"q":"Con t̂ anterior calcule la componente x de p = a + t̂ v. Respuesta a 3 decimales.", "c":0.364},
  {"q":"Calcule ||z-p|| para el mismo ejercicio. Respuesta a 3 decimales.", "c":1.944},
  {"q":"Distancia entre (1,1,1) y el plano x+y+z=3. Respuesta a 3 decimales.", "c":0.000},
  {"q":"Distancia entre (0,0,0) y el plano x+y+z=1. Respuesta a 3 decimales.", "c":0.577},
  {"q":"Sea recta por origen con v=(1,2,2), z=(3,0,0). t̂=(z^T v)/(v^T v). Respuesta a 3 decimales.", "c":0.333},
  {"q":"Con v=(1,2,2), ||v||. Respuesta a 3 decimales.", "c":3.000},
  {"q":"Proyección escalar de z=(3,0,0) sobre v=(1,2,2). Respuesta a 3 decimales.", "c":1.000},
]
for i,e in enumerate(ex):
  qs.append({"id":i+1,"type":"input","question":e["q"],"correct":round(float(e["c"]),3),"answerType":"decimal","explanation":{"title":"Procedimiento detallado","theory":"Rectas, planos y proyecciones ortogonales","steps":["1) Identificar datos","2) Aplicar fórmula correspondiente","3) Calcular y redondear a 3 decimales"],"final":f"{round(float(e['c']),3):.3f}"}})
out={"unit":"1","name":"MI2 - Rectas, Planos y Proyecciones Ortogonales","questions":qs}
with open(os.path.join(base,'u1.json'),'w',encoding='utf-8') as f:
  json.dump(out,f,ensure_ascii=False,indent=2)
print('ok')
