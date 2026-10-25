const fs = require('fs');
const p = 'C:/Users/val/Desktop/proyectospersonales/SistemaPreparacion-USAC/js/app.js';
let s = fs.readFileSync(p,'utf8');

// Add helper to check reposicion
if(!s.includes('isReposicion')){
  s = s.replace("    function getSubjectVideos(unitNum) {\n        const vids = LENGUAJE_DATA.videos[state.subject] || [];\n        return vids.find(v => parseInt(v.unit) === unitNum);\n    }",
"    function getSubjectVideos(unitNum) {\n        const vids = LENGUAJE_DATA.videos[state.subject] || [];\n        return vids.find(v => parseInt(v.unit) === unitNum);\n    }\n\n    function isReposicion(){\n        return state.subject === 'reposicion';\n    }");
}

// In renderQuestion, handle input type
if(!s.includes('renderInputQuestion')){
  const renderFn = `
    function renderInputQuestion(question) {
        const wrap = document.createElement('div');
        wrap.className = 'input-answer-wrap';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-answer';
        input.placeholder = 'Escriba la respuesta (número). Use punto decimal si aplica.';
        input.id = 'reposicion-answer-input';
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-large';
        btn.textContent = 'Verificar respuesta';
        btn.style.marginTop = '12px';
        btn.addEventListener('click', () => submitInputAnswer(question));
        wrap.appendChild(input);
        wrap.appendChild(btn);
        els.quizOptions.appendChild(wrap);
    }

    function submitInputAnswer(question){
        const q = state.quiz;
        if(q.answered) return;
        const input = document.getElementById('reposicion-answer-input');
        if(!input) return;
        const val = input.value.trim().replace(',', '.');
        q.answered = true;
        const num = parseFloat(val);
        const correctNum = parseFloat(question.correct);
        let isCorrect = false;
        if(!isNaN(num) && !isNaN(correctNum)){
            isCorrect = Math.abs(num - correctNum) <= 0.001;
        } else {
            isCorrect = val === String(question.correct);
        }
        if(isCorrect) q.correctCount++;
        input.disabled = true;
        const btns = els.quizOptions.querySelectorAll('button');
        btns.forEach(b=>b.disabled=true);
        let extraText = 'Respuesta correcta (a 3 decimales): ' + (typeof question.correct === 'number' ? question.correct.toFixed(3) : question.correct) + '.';
        if(question.explanation){
            extraText += '<br><br><strong>' + (question.explanation.title||'Procedimiento') + '</strong><br>';
            if(question.explanation.theory) extraText += '<em>' + question.explanation.theory + '</em><br><br>';
            if(Array.isArray(question.explanation.steps)){
                question.explanation.steps.forEach((st,i)=>{ extraText += (i+1) + '. ' + st + '<br>'; });
                extraText += '<br>';
            }
            if(question.explanation.final) extraText += '<strong>Respuesta final: ' + question.explanation.final + '</strong>';
        }
        showFeedback(isCorrect, extraText);
    }
`;
  // insert before renderTfQuestion
  s = s.replace("    function renderTfQuestion(question) {", renderFn + "\n    function renderTfQuestion(question) {");
}

// Modify renderQuestion to route input
s = s.replace(`        // Route to appropriate renderer
        els.quizOptions.innerHTML = '';

        if (type === 'tf') {
            renderTfQuestion(question);
        } else if (type === 'order') {
            renderOrderQuestion(question);
        } else if (type === 'match') {
            renderMatchQuestion(question);
        } else {
            // fill, correct, reading, mc — all use option buttons
            renderOptionsQuestion(question);
        }`,
`        // Route to appropriate renderer
        els.quizOptions.innerHTML = '';

        if (type === 'input') {
            renderInputQuestion(question);
        } else if (type === 'tf') {
            renderTfQuestion(question);
        } else if (type === 'order') {
            renderOrderQuestion(question);
        } else if (type === 'match') {
            renderMatchQuestion(question);
        } else {
            // fill, correct, reading, mc — all use option buttons
            renderOptionsQuestion(question);
        }`);

fs.writeFileSync(p, s);
console.log('patched');
