import os

p = r"C:\Users\val\Desktop\proyectospersonales\SistemaPreparacion-USAC\js\app.js"
with open(p, encoding='utf-8') as f:
    s = f.read()

old = """            } else if (key === 'computacion') {
                iconSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
            }"""

new = """            } else if (key === 'computacion') {
                iconSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
            } else if (key === 'reposicion') {
                iconSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>';
            }"""

if old in s and new not in s:
    s2 = s.replace(old, new)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(s2)
    print('ok')
else:
    print('skip')
