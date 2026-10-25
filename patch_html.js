const fs = require('fs');
const p = 'C:/Users/val/Desktop/proyectospersonales/SistemaPreparacion-USAC/index.html';
let s = fs.readFileSync(p,'utf8');
const old = "                    <button class=\"card card-secondary\" onclick=\"App.selectTestType('especifica')\">";
const neu = `                    <button class="card card-secondary" onclick="App.selectTestType('especifica')">
                    </button>
                    <button class="card" style="border-color:#d35400" onclick="App.selectTestType('mi2_reposicion')">
                        <div class="card-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d35400" stroke-width="1.5"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></div>
                        <div class="card-content">
                            <h3>Matemática Intermedia 2</h3>
                            <p>Examen de Simulación Reposición (100 ejercicios)</p>
                        </div>
                        <span class="card-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
                    </button>
                    <button class="card" style="border-color:#2980b9" onclick="App.selectTestType('mi3_reposicion')">
                        <div class="card-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2980b9" stroke-width="1.5"><path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg></div>
                        <div class="card-content">
                            <h3>Matemática Intermedia 3</h3>
                            <p>Examen de Simulación Reposición (100 ejercicios)</p>
                        </div>
                        <span class="card-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
                    </button>`;
if(s.indexOf(old)>=0){
  s = s.split(old).join(neu);
  fs.writeFileSync(p,s);
  console.log('ok');
} else {
  console.log('no');
}
