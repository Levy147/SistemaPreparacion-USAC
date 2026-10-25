const fs = require('fs');
const p = 'C:/Users/val/Desktop/proyectospersonales/SistemaPreparacion-USAC/js/data.js';
let s = fs.readFileSync(p,'utf8');
const old = `    "especifica": {
      "name": "Prueba EspecA-fica",
      "areas": {
        "matematicas": {
          "name": "MatemA\u00a1ticas",
          "available": false,
          "icon": "calculate"
        },
        "computacion": {
          "name": "ComputaciA3n",
          "available": false,
          "icon": "computer"
        }
      }
    }
  },`;
const neu = `    "especifica": {
      "name": "Prueba EspecA-fica",
      "areas": {
        "matematicas": {
          "name": "MatemA\u00a1ticas",
          "available": false,
          "icon": "calculate"
        },
        "computacion": {
          "name": "ComputaciA3n",
          "available": false,
          "icon": "computer"
        }
      }
    },
    "mi2_reposicion": {
      "name": "MatemA\u00a1tica Intermedia 2 - ReposiciA3n",
      "areas": {
        "mi2_reposicion": {
          "name": "MatemA\u00a1tica Intermedia 2",
          "available": true,
          "icon": "quiz"
        }
      }
    },
    "mi3_reposicion": {
      "name": "MatemA\u00a1tica Intermedia 3 - ReposiciA3n",
      "areas": {
        "mi3_reposicion": {
          "name": "MatemA\u00a1tica Intermedia 3",
          "available": true,
          "icon": "quiz"
        }
      }
    }
  },`;
if(s.indexOf(old)>=0){
  s=s.split(old).join(neu);
  fs.writeFileSync(p,s);
  console.log('ok');
}else{
  console.log('no');
}
