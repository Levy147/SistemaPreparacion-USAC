const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, '..', 'Pruebas de Conocimientos Basicos', 'Lenguaje');
const outputDir = path.join(__dirname, '..', 'data', 'lenguaje');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Parse unit number from path
function getUnitNumber(dirName) {
    const match = dirName.match(/U(\d+)/);
    return match ? match[1] : null;
}

// Parse a single question block
function parseQuestions(text) {
    const questions = [];
    // Normalize line endings (Windows -> Unix)
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Remove header line(s) before splitting
    // Handles: "Banco de Preguntas...", "Bnaco de Preguntas...", "Modulo..."
    text = text.replace(/^[^\n]*Preguntas[^\n]*\n*/i, '');
    text = text.replace(/^M[oó]dulo[^\n]*\n*/i, '');
    
    const blocks = text.split(/\n\n+/);
    
    for (const block of blocks) {
        if (!block.trim()) continue;
        
        const lines = block.trim().split('\n');
        if (lines.length < 6) continue;
        
        const qMatch = lines[0].match(/Pregunta\s*\d+\s*:\s*(.+)/i);
        if (!qMatch) continue;
        
        const questionText = qMatch[1].trim();
        const options = [];
        
        for (let i = 1; i <= 4; i++) {
            const optMatch = lines[i]?.match(/[A-D]\)\s*(.+)/);
            if (optMatch) {
                options.push(optMatch[1].trim());
            }
        }
        
        const answerMatch = block.match(/Respuesta Correcta\s*:\s*([A-D])/i);
        if (!answerMatch) continue;
        
        const correctLetter = answerMatch[1].toUpperCase();
        const correctIndex = correctLetter.charCodeAt(0) - 'A'.charCodeAt(0);
        
        questions.push({
            id: questions.length + 1,
            question: questionText,
            options: options,
            correct: correctIndex
        });
    }
    
    return questions;
}

// Parse video links
function parseVideos(text) {
    const videos = [];
    const lines = text.split('\n');
    let currentTopic = 'General';
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('Videos')) continue;
        
        if (trimmed.startsWith('http')) {
            videos.push({
                topic: currentTopic,
                url: trimmed
            });
        } else if (trimmed.includes(':')) {
            currentTopic = trimmed.replace(':', '').trim();
        } else if (trimmed.length > 5 && !trimmed.startsWith('http')) {
            currentTopic = trimmed;
        }
    }
    
    return videos;
}

// Process each unit directory
// Clean up old generated files first
if (fs.existsSync(outputDir)) {
    const oldFiles = fs.readdirSync(outputDir);
    for (const f of oldFiles) {
        fs.unlinkSync(path.join(outputDir, f));
    }
}

const unitDirs = fs.readdirSync(questionsDir).filter(d => d.startsWith('Preguntas_Lenguaje_U'));

const unitsMeta = [];

for (const dir of unitDirs) {
    const unitNum = getUnitNumber(dir);
    if (!unitNum) continue;
    
    const unitPath = path.join(questionsDir, dir);
    const files = fs.readdirSync(unitPath);
    
    const questionsFile = files.find(f => f.startsWith('Preguntas_U'));
    const videosFile = files.find(f => f.startsWith('Links_Videos'));
    
    const unitNames = {
        '1': 'Comunicación',
        '2': 'Lenguaje y Signo Lingüístico',
        '3': 'Ortografía',
        '4': 'Gramática y Vocabulario',
        '5': 'Exposición Oral y Escrita',
        '6': 'Comprensión Lectora'
    };
    
    const unitName = unitNames[unitNum] || `Unidad ${unitNum}`;
    
    if (questionsFile) {
        const content = fs.readFileSync(path.join(unitPath, questionsFile), 'utf-8');
        const questions = parseQuestions(content);
        
        if (questions.length > 0) {
            const outputPath = path.join(outputDir, `u${unitNum}.json`);
            fs.writeFileSync(outputPath, JSON.stringify({ unit: unitNum, name: unitName, questions }, null, 2), 'utf-8');
            console.log(`Unidad ${unitNum}: ${questions.length} preguntas escritas en ${outputPath}`);
        }
    }
    
    if (videosFile) {
        const content = fs.readFileSync(path.join(unitPath, videosFile), 'utf-8');
        const videos = parseVideos(content);
        
        if (videos.length > 0) {
            const outputPath = path.join(outputDir, `videos.json`);
            let allVideos = [];
            try {
                allVideos = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
            } catch (e) {
                // File doesn't exist yet
            }
            allVideos.push({ unit: unitNum, name: unitName, videos });
            fs.writeFileSync(outputPath, JSON.stringify(allVideos, null, 2), 'utf-8');
            console.log(`Unidad ${unitNum}: ${videos.length} videos procesados`);
        }
    }
    
    unitsMeta.push({ unit: unitNum, name: unitName });
}

// Write index of units
const indexPath = path.join(outputDir, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify(unitsMeta, null, 2), 'utf-8');
console.log(`\nTotal unidades procesadas: ${unitsMeta.length}`);
console.log('Archivo de índice generado en', indexPath);

// Now generate the data.js file for the web app
let dataJsContent = `// Datos de preguntas - Lenguaje
// Generado automaticamente - NO EDITAR MANUALMENTE

const LENGUAJE_DATA = {
  subjects: {
    "basica": {
      "name": "Prueba Básica",
      "areas": {
        "lenguaje": {
          "name": "Lenguaje",
          "available": true,
          "icon": "language"
        },
        "fisica": {
          "name": "Física",
          "available": false,
          "icon": "science"
        }
      }
    },
    "especifica": {
      "name": "Prueba Específica",
      "areas": {
        "matematicas": {
          "name": "Matemáticas",
          "available": false,
          "icon": "calculate"
        },
        "computacion": {
          "name": "Computación",
          "available": false,
          "icon": "computer"
        }
      }
    }
  },
  units: ${JSON.stringify(unitsMeta, null, 2)},
  questions: {`;

for (const unit of unitsMeta) {
    const qPath = path.join(outputDir, `u${unit.unit}.json`);
    if (fs.existsSync(qPath)) {
        const qData = JSON.parse(fs.readFileSync(qPath, 'utf-8'));
        dataJsContent += `\n    "u${unit.unit}": ${JSON.stringify(qData.questions, null, 4)},`;
    }
}

dataJsContent += `\n  },
  videos: ${JSON.stringify((() => {
    const vPath = path.join(outputDir, 'videos.json');
    if (fs.existsSync(vPath)) {
        const vData = JSON.parse(fs.readFileSync(vPath, 'utf-8'));
        return vData;
    }
    return [];
})(), null, 2)}
};`;

const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
fs.writeFileSync(dataJsPath, dataJsContent, 'utf-8');
console.log('Archivo data.js generado en', dataJsPath);
