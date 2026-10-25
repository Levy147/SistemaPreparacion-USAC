const fs = require('fs');
const p = 'C:/Users/val/Desktop/proyectospersonales/SistemaPreparacion-USAC/js/data.js';
let s = fs.readFileSync(p,'utf8');
const old = "        \"reposicion\": {\n          \"name\": \"Examen de SimulaciA3n ReposiciA3n (MI2 - MI3)\",\n          \"available\": true,\n          \"icon\": \"quiz\"\n        }";
const neu = "        \"mi2_reposicion\": {\n          \"name\": \"MatemA\u00a1tica Intermedia 2 - Examen de SimulaciA3n ReposiciA3n (100 ejercicios)\",\n          \"available\": true,\n          \"icon\": \"quiz\"\n        },\n        \"mi3_reposicion\": {\n          \"name\": \"MatemA\u00a1tica Intermedia 3 - Examen de SimulaciA3n ReposiciA3n (100 ejercicios)\",\n          \"available\": true,\n          \"icon\": \"quiz\"\n        }";
if(s.indexOf(old)>=0){
  s = s.split(old).join(neu);
  fs.writeFileSync(p,s);
  console.log('ok');
} else {
  console.log('no');
}
