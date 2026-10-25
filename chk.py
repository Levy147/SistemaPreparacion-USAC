p='C:/Users/val/Desktop/proyectospersonales/SistemaPreparacion-USAC/js/data.js'
s=open(p,encoding='utf-8').read()
idx=s.find('"reposicion"')
print(idx)
if idx>=0:
    print(s[idx-40:idx+120])
