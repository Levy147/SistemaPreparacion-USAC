import json,os
base=r"C:\Users\val\Desktop\proyectospersonales\SistemaPreparacion-USAC\data\mi3_reposicion"
qs=[]
ex=[
 {"q":"∬_{D} 1 dA donde D es el cuadrado 0<=x<=1,0<=y<=1. Respuesta a 3 decimales.","c":1.000},
 {"q":"∬_{x^2+y^2<=1} 1 dA (área círculo unitario). Respuesta a 3 decimales.","c":3.142},
 {"q":"∬_{x^2+y^2<=4} r dr dθ con límites 0<=r<=2,0<=θ<=2π da: ∫_0^{2π}dθ ∫_0^2 r dr. Calcule. Respuesta a 3 decimales.","c":12.566},
 {"q":"V bajo z=x^2+y^2 sobre x^2+y^2<=1: ∬ (x^2+y^2)dA = ∫_0^{2π}dθ ∫_0^1 r^3 dr. Respuesta a 3 decimales.","c":1.571},
 {"q":"∭_{cilindro x^2+y^2<=1,0<=z<=1} 1 dV en cilíndricas con factor r: ∫_0^{2π}dθ ∫_0^1 r dr ∫_0^1 dz. Respuesta a 3 decimales.","c":3.142},
 {"q":"Volumen esfera unitaria por esféricas: 4π/3. Respuesta a 3 decimales.","c":4.189},
 {"q":"∫_C ds con C semicircunferencia unitaria y>=0, longitud π. Respuesta a 3 decimales.","c":3.142},
 {"q":"Para F=(y,x), ∮_C F·dr sobre círculo unitario antihorario. Use Green Q_x-P_y=1-1=0. Respuesta a 3 decimales.","c":0.000},
 {"q":"Área círculo unitario por Green: (1/2)∮(-y dx+x dy)=π. Respuesta a 3 decimales.","c":3.142},
 {"q":"Flujo F=(x,y,z) a través de esfera unitaria por Gauss: 4π. Respuesta a 3 decimales.","c":12.566},
]
for i,e in enumerate(ex):
 qs.append({"id":i+1,"type":"input","question":e["q"],"correct":round(float(e["c"]),3),"answerType":"decimal","explanation":{"title":"Procedimiento detallado","theory":"MI3 repaso clave","steps":["1) Identificar coordenadas/teorema","2) Aplicar fórmula","3) Integrar/cálculo directo"],"final":f"{round(float(e['c']),3):.3f}"}})
out={"unit":"1","name":"MI3 - Integrales Dobles y Cambio de Orden","questions":qs}
with open(os.path.join(base,'u1.json'),'w',encoding='utf-8') as f: json.dump(out,f,ensure_ascii=False,indent=2)
print('ok')
