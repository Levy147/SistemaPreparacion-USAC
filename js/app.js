/* ============================================
   PORTAL DE ESTUDIO - APLICACION PRINCIPAL
   Navegacion, estado, cuestionarios
   ============================================ */

const App = (function() {

    // --- State ---
    let state = {
        testType: null,        // 'basica' | 'especifica'
        subject: null,         // 'lenguaje' | 'fisica' | etc.
        unit: null,            // '1' | '2' | etc.
        currentView: 'home',   // view stack for back navigation
        viewHistory: [],       // stack of views
        activeTab: 'study',    // 'study' | 'quiz'
        quiz: {
            questions: [],
            currentIndex: 0,
            correctCount: 0,
            answered: false,
            totalQuestions: 20
        }
    };

    // --- DOM references ---
    let els = {};

    function init() {
        // Cache DOM elements
        els = {
            header: document.getElementById('app-header'),
            title: document.getElementById('app-title'),
            backBtn: document.getElementById('btn-back'),
            main: document.getElementById('main-content'),
            home: document.getElementById('view-home'),
            subjects: document.getElementById('view-subjects'),
            subjectsTitle: document.getElementById('subjects-title'),
            subjectsSubtitle: document.getElementById('subjects-subtitle'),
            subjectsGrid: document.getElementById('subjects-grid'),
            units: document.getElementById('view-units'),
            unitsTitle: document.getElementById('units-title'),
            unitsGrid: document.getElementById('units-grid'),
            detail: document.getElementById('view-unit-detail'),
            detailTitle: document.getElementById('detail-title'),
            detailSubtitle: document.getElementById('detail-subtitle'),
            tabStudy: document.getElementById('tab-study'),
            tabQuiz: document.getElementById('tab-quiz'),
            studyContent: document.getElementById('study-content'),
            quizStart: document.getElementById('quiz-start'),
            quizActive: document.getElementById('quiz-active'),
            quizResults: document.getElementById('quiz-results'),
            quizCounter: document.getElementById('quiz-counter'),
            quizQuestion: document.getElementById('quiz-question'),
            quizOptions: document.getElementById('quiz-options'),
            quizFeedback: document.getElementById('quiz-feedback'),
            quizProgress: document.getElementById('quiz-progress-fill'),
            nextBtn: document.getElementById('btn-next-question'),
            resultsScore: document.getElementById('results-score'),
            resultsPercentage: document.getElementById('results-percentage'),
            resultsGrade: document.getElementById('results-grade'),
            resultsDetail: document.getElementById('results-detail')
        };

        // Show home view by default
        showView('home');
    }

    // --- View Management ---

    function showView(viewName) {
        // Hide all views
        const views = document.querySelectorAll('.view');
        views.forEach(v => v.classList.remove('active'));

        // Show target view
        const target = document.getElementById('view-' + viewName);
        if (target) {
            target.classList.add('active');
        }

        state.currentView = viewName;
        updateHeader(viewName);
    }

    function navigateTo(viewName) {
        state.viewHistory.push(state.currentView);
        showView(viewName);
    }

    function goBack() {
        const prev = state.viewHistory.pop();
        if (prev) {
            showView(prev);
        }
    }

    function updateHeader(viewName) {
        const titles = {
            'home': 'Portal de Estudio',
            'subjects': 'Seleccionar Materia',
            'units': 'Seleccionar Unidad',
            'unit-detail': 'Material de Estudio'
        };

        els.title.textContent = titles[viewName] || 'Portal de Estudio';
        els.backBtn.classList.toggle('visible', state.viewHistory.length > 0);
    }

    // --- Test Type Selection ---

    function selectTestType(type) {
        state.testType = type;
        const data = LENGUAJE_DATA.subjects[type];
        
        els.subjectsTitle.textContent = data.name;
        els.subjectsSubtitle.textContent = 'Seleccione la materia que desea estudiar';
        els.subjectsGrid.innerHTML = '';

        for (const [key, area] of Object.entries(data.areas)) {
            const card = document.createElement('button');
            card.className = 'card' + (area.available ? '' : ' card-disabled');
            
            // SVG icons based on subject
            let iconSvg = '';
            if (key === 'lenguaje') {
                iconSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>';
            } else if (key === 'fisica') {
                iconSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>';
            } else if (key === 'matematicas') {
                iconSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l16 16M4 20L20 4"/><path d="M4 12h16"/></svg>';
            } else if (key === 'computacion') {
                iconSvg = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
            }

            card.innerHTML = `
                <div class="card-icon">${iconSvg}</div>
                <div class="card-content">
                    <h3>${area.name}</h3>
                    <p>${area.available ? 'Unidades y temas disponibles' : 'Proximamente'}</p>
                </div>
                <span class="card-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
            `;

            if (area.available) {
                card.addEventListener('click', () => selectSubject(key));
            }
            
            els.subjectsGrid.appendChild(card);
        }

        navigateTo('subjects');
    }

    // --- Subject Selection ---

    function selectSubject(subject) {
        state.subject = subject;
        showUnitSelection();
    }

    // --- Helper: get data for current subject ---
    function getSubjectUnits() {
        return LENGUAJE_DATA.units[state.subject] || [];
    }

    function getSubjectQuestions(unitKey) {
        return (LENGUAJE_DATA.questions[state.subject] || {})[unitKey] || [];
    }

    function getSubjectExercises(unitKey) {
        return (LENGUAJE_DATA.exercises[state.subject] || {})[unitKey] || [];
    }

    function getSubjectVideos(unitNum) {
        const vids = LENGUAJE_DATA.videos[state.subject] || [];
        return vids.find(v => parseInt(v.unit) === unitNum);
    }

    // --- Unit Selection ---

    function showUnitSelection() {
        const units = getSubjectUnits();
        
        els.unitsTitle.textContent = 'Seleccione la unidad';
        els.unitsGrid.innerHTML = '';

        // Add "All Units" card
        const allCard = document.createElement('button');
        allCard.className = 'card';
        allCard.style.borderColor = '#2c3e50';
        allCard.style.borderStyle = 'dashed';
        
        let totalItems = 0;
        for (const unit of units) {
            const qKey = 'u' + unit.unit;
            totalItems += getSubjectQuestions(qKey).length;
            totalItems += getSubjectExercises(qKey).length;
        }
        
        allCard.innerHTML = `
            <div class="card-icon" style="background: #e8e6dc; color: #2c3e50;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c6 3 10 0 12-2v-5"/></svg>
            </div>
            <div class="card-content">
                <h3>Todas las unidades</h3>
                <p>Cuestionario combinado de todas las unidades (${totalItems} preguntas y ejercicios disponibles)</p>
            </div>
            <span class="card-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
        `;
        allCard.addEventListener('click', () => selectAllUnits());
        els.unitsGrid.appendChild(allCard);

        for (const unit of units) {
            const num = parseInt(unit.unit);
            const qKey = 'u' + unit.unit;
            const questionCount = getSubjectQuestions(qKey).length;
            const exerciseCount = getSubjectExercises(qKey).length;
            const totalItems = questionCount + exerciseCount;

            const card = document.createElement('button');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-icon" style="background: #eef2f5; color: #2c3e50;">
                    <span style="font-weight:700;font-size:1rem;">${unit.unit}</span>
                </div>
                <div class="card-content">
                    <h3>Unidad ${unit.unit}: ${unit.name}</h3>
                    <p>${totalItems} preguntas y ejercicios disponibles</p>
                </div>
                <span class="card-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
            `;

            card.addEventListener('click', () => selectUnit(unit.unit));
            els.unitsGrid.appendChild(card);
        }

        navigateTo('units');
    }

    // --- Unit Detail ---

    function selectUnit(unitId) {
        state.unit = unitId;
        showUnitDetail();
    }

    function showUnitDetail(fromResults) {
        if (state.unit === 'all') {
            // In "Todas las unidades" mode, just show the view
            if (fromResults) {
                showView('unit-detail');
            } else {
                navigateTo('unit-detail');
            }
            return;
        }
        const units = getSubjectUnits();
        const unit = units.find(u => u.unit === state.unit);
        if (!unit) return;

        els.detailTitle.textContent = 'Unidad ' + unit.unit + ': ' + unit.name;
        
        const qKey = 'u' + unit.unit;
        const questionCount = getSubjectQuestions(qKey).length;
        const exerciseCount = getSubjectExercises(qKey).length;
        els.detailSubtitle.textContent = (questionCount + exerciseCount) + ' preguntas y ejercicios disponibles';

        // Load study material
        loadStudyMaterial(unit.unit);

        // Reset quiz
        resetQuizState();

        // Default to study tab
        showTab('study');

        if (fromResults) {
            showView('unit-detail');
        } else {
            navigateTo('unit-detail');
        }
    }

    // --- All Units Mode ---

    function selectAllUnits() {
        state.unit = 'all';
        
        els.detailTitle.textContent = 'Todas las unidades';
        
        const units = getSubjectUnits();
        let totalItems = 0;
        for (const unit of units) {
            const qKey = 'u' + unit.unit;
            totalItems += getSubjectQuestions(qKey).length;
            totalItems += getSubjectExercises(qKey).length;
        }
        els.detailSubtitle.textContent = totalItems + ' preguntas y ejercicios disponibles en total';

        // Show combined study info
        els.studyContent.innerHTML = `
            <div class="study-info">
                <p>Esta opcion permite estudiar todas las unidades en un solo cuestionario combinado. Se seleccionaran 20 preguntas al azar de entre las ${totalItems} preguntas y ejercicios disponibles en las ${units.length} unidades.</p>
                <h4 class="study-section-title">Unidades incluidas</h4>
                <ul class="video-list">
                    ${units.map(u => `
                        <li class="video-item" style="display:flex;align-items:center;gap:12px;padding:10px 0;">
                            <div class="card-icon" style="width:32px;height:32px;background:#eef2f5;color:#2c3e50;">
                                <span style="font-weight:700;font-size:0.85rem;">${u.unit}</span>
                            </div>
                            <div class="video-info">
                                <div class="video-topic" style="font-size:0.88rem;">Unidad ${u.unit}: ${u.name}</div>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        // Reset quiz
        resetQuizState();

        // Default to study tab
        showTab('study');

        navigateTo('unit-detail');
    }

    function startQuizAll() {
        // Combine questions and exercises from all units
        const units = getSubjectUnits();
        let allItems = [];
        for (const unit of units) {
            const qKey = 'u' + unit.unit;
            const questions = getSubjectQuestions(qKey);
            const exercises = getSubjectExercises(qKey);
            allItems = allItems.concat(questions).concat(exercises);
        }

        if (allItems.length === 0) return;

        // Select 20 random items
        const count = Math.min(20, allItems.length);
        const shuffled = [...allItems].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        state.quiz.questions = selected;
        state.quiz.currentIndex = 0;
        state.quiz.correctCount = 0;
        state.quiz.totalQuestions = count;

        els.quizStart.style.display = 'none';
        els.quizActive.style.display = '';
        els.quizResults.style.display = 'none';

        renderQuestion();
    }

    // --- Tabs ---

    function showTab(tab) {
        state.activeTab = tab;

        // Update tab buttons
        els.tabStudy.classList.toggle('active', tab === 'study');
        els.tabQuiz.classList.toggle('active', tab === 'quiz');

        // Update tab content
        document.getElementById('tab-content-study').classList.toggle('active', tab === 'study');
        document.getElementById('tab-content-quiz').classList.toggle('active', tab === 'quiz');
    }

    // --- Study Material ---

    function getYouTubeEmbedUrl(url) {
        try {
            const u = new URL(url);
            if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
                let videoId = null;
                if (u.hostname.includes('youtu.be')) {
                    videoId = u.pathname.slice(1).split('/')[0].split('?')[0];
                } else {
                    videoId = u.searchParams.get('v');
                }
                if (videoId) {
                    return 'https://www.youtube.com/embed/' + videoId;
                }
            }
        } catch (e) {
            // Invalid URL, return original
        }
        return null;
    }

    function loadStudyMaterial(unitId) {
        const unitNum = parseInt(unitId);
        const unitData = getSubjectVideos(unitNum);
        
        if (!unitData || !unitData.videos || unitData.videos.length === 0) {
            els.studyContent.innerHTML = `
                <div class="study-info">
                    <p>No hay material de estudio disponible para esta unidad.</p>
                </div>
            `;
            return;
        }

        const videos = unitData.videos;
        let html = '<div class="study-info">';
        html += '<p>A continuación se presentan los videos de apoyo para el estudio de esta unidad. Se recomienda revisarlos antes de realizar el cuestionario.</p>';
        html += '<h4 class="study-section-title">Videos de Apoyo</h4>';
        html += '<div class="video-grid">';

        for (const video of videos) {
            const embedUrl = getYouTubeEmbedUrl(video.url);
            if (embedUrl) {
                html += `
                    <div class="video-card">
                        <div class="video-embed-wrapper">
                            <iframe src="${embedUrl}" 
                                title="${video.topic}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="video-card-info">
                            <div class="video-card-topic">${video.topic}</div>
                        </div>
                    </div>
                `;
            } else {
                // Fallback for non-YouTube URLs
                html += `
                    <div class="video-card">
                        <div class="video-card-info">
                            <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="video-external-link">
                                <span class="video-card-topic">${video.topic}</span>
                            </a>
                        </div>
                    </div>
                `;
            }
        }

        html += '</div></div>';
        els.studyContent.innerHTML = html;
    }

    // --- Quiz Logic ---

    function resetQuizState() {
        state.quiz = {
            questions: [],
            currentIndex: 0,
            correctCount: 0,
            answered: false,
            totalQuestions: 20
        };

        els.quizStart.style.display = '';
        els.quizActive.style.display = 'none';
        els.quizResults.style.display = 'none';
        
        // Show/hide the all-units quiz button
        const isAllUnits = state.unit === 'all';
        const btnStartQuiz = document.getElementById('btn-start-quiz');
        const btnStartQuizAll = document.getElementById('btn-start-quiz-all');
        if (btnStartQuiz && btnStartQuizAll) {
            btnStartQuiz.style.display = isAllUnits ? 'none' : '';
            btnStartQuizAll.style.display = isAllUnits ? '' : 'none';
        }
    }

    function startQuiz() {
        const qKey = 'u' + state.unit;
        const questions = getSubjectQuestions(qKey);
        const exercises = getSubjectExercises(qKey);
        const allItems = questions.concat(exercises);
        
        if (allItems.length === 0) {
            return;
        }

        // Select 20 random items (or less if pool is smaller)
        const count = Math.min(20, allItems.length);
        const shuffled = [...allItems].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        state.quiz.questions = selected;
        state.quiz.currentIndex = 0;
        state.quiz.correctCount = 0;
        state.quiz.totalQuestions = count;

        // Show quiz active view
        els.quizStart.style.display = 'none';
        els.quizActive.style.display = '';
        els.quizResults.style.display = 'none';

        renderQuestion();
    }

    function renderQuestion() {
        const q = state.quiz;
        const question = q.questions[q.currentIndex];
        
        if (!question) {
            showResults();
            return;
        }

        q.answered = false;
        els.nextBtn.style.display = 'none';
        els.quizFeedback.style.display = 'none';

        // Update progress
        const progress = ((q.currentIndex) / q.totalQuestions) * 100;
        els.quizProgress.style.width = progress + '%';

        // Counter with type badge
        const type = question.type || 'mc';
        const typeLabels = { mc: 'Opción múltiple', fill: 'Completar', tf: 'Verdadero / Falso', correct: 'Corregir', order: 'Ordenar', match: 'Emparejar', reading: 'Comprensión lectora', problem: 'Problema' };
        els.quizCounter.innerHTML = 'Pregunta ' + (q.currentIndex + 1) + ' de ' + q.totalQuestions + ' <span class="quiz-type-badge">' + (typeLabels[type] || type) + '</span>';

        // Question text
        if (question.passage) {
            els.quizQuestion.innerHTML = '<div class="reading-passage">' + question.passage + '</div><div class="reading-question-label">Pregunta:</div>' + question.question;
        } else {
            els.quizQuestion.textContent = question.question;
        }

        // Route to appropriate renderer
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
        }
    }

    function renderOptionsQuestion(question) {
        const letters = ['A', 'B', 'C', 'D'];
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.innerHTML = `
                <span class="option-letter">${letters[index]}</span>
                <span>${option}</span>
            `;
            btn.addEventListener('click', () => selectOption(index));
            els.quizOptions.appendChild(btn);
        });
    }

    function renderTfQuestion(question) {
        const wrap = document.createElement('div');
        wrap.className = 'tf-options';

        const btnTrue = document.createElement('button');
        btnTrue.className = 'quiz-option tf-btn';
        btnTrue.innerHTML = '<span class="option-letter" style="background:#3a7d44;color:#fff;">V</span><span>Verdadero</span>';
        btnTrue.addEventListener('click', () => selectOption(true));

        const btnFalse = document.createElement('button');
        btnFalse.className = 'quiz-option tf-btn';
        btnFalse.innerHTML = '<span class="option-letter" style="background:#b34a4a;color:#fff;">F</span><span>Falso</span>';
        btnFalse.addEventListener('click', () => selectOption(false));

        wrap.appendChild(btnTrue);
        wrap.appendChild(btnFalse);
        els.quizOptions.appendChild(wrap);
    }

    function renderOrderQuestion(question) {
        // Shuffle items for display
        const indices = question.items.map((_, i) => i);
        const shuffled = [...indices].sort(() => Math.random() - 0.5);
        state.quiz.orderCurrent = [...shuffled];

        const wrap = document.createElement('div');
        wrap.className = 'order-options';

        shuffled.forEach((origIndex, displayIndex) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option order-btn';
            btn.dataset.origIndex = origIndex;
            btn.innerHTML = `
                <span class="option-letter order-num">${displayIndex + 1}</span>
                <span>${question.items[origIndex]}</span>
            `;
            btn.addEventListener('click', () => moveOrderItem(displayIndex));
            wrap.appendChild(btn);
        });

        const hint = document.createElement('div');
        hint.className = 'order-hint';
        hint.textContent = 'Haz clic en un elemento para moverlo al siguiente posición.';

        els.quizOptions.appendChild(wrap);
        els.quizOptions.appendChild(hint);
    }

    function moveOrderItem(displayIndex) {
        if (state.quiz.answered) return;
        const current = state.quiz.orderCurrent;
        const nextIndex = (displayIndex + 1) % current.length;
        // Swap
        const temp = current[displayIndex];
        current[displayIndex] = current[nextIndex];
        current[nextIndex] = temp;

        // Re-render order buttons
        const question = state.quiz.questions[state.quiz.currentIndex];
        const wrap = els.quizOptions.querySelector('.order-options');
        wrap.innerHTML = '';
        current.forEach((origIndex, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option order-btn';
            btn.dataset.origIndex = origIndex;
            btn.innerHTML = `
                <span class="option-letter order-num">${i + 1}</span>
                <span>${question.items[origIndex]}</span>
            `;
            btn.addEventListener('click', () => moveOrderItem(i));
            wrap.appendChild(btn);
        });
    }

    function submitOrder() {
        const q = state.quiz;
        if (q.answered) return;
        q.answered = true;
        const question = q.questions[q.currentIndex];
        const userOrder = q.orderCurrent;
        const isCorrect = JSON.stringify(userOrder) === JSON.stringify(question.correct);

        if (isCorrect) q.correctCount++;

        // Highlight correct/incorrect
        const orderBtns = els.quizOptions.querySelectorAll('.order-btn');
        orderBtns.forEach((btn, i) => {
            btn.classList.add('disabled');
            if (userOrder[i] === question.correct[i]) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('incorrect');
            }
        });

        showFeedback(isCorrect, 'El orden correcto es: ' + question.correct.map((idx, i) => (i + 1) + '. ' + question.items[idx]).join(' → '));
    }

    function renderMatchQuestion(question) {
        // Shuffle right column
        const rightIndices = question.right.map((_, i) => i);
        const shuffledRight = [...rightIndices].sort(() => Math.random() - 0.5);
        state.quiz.matchCurrent = new Array(question.left.length).fill(-1);
        state.quiz.matchAvailable = [...shuffledRight];
        state.quiz.matchSelected = -1;

        const wrap = document.createElement('div');
        wrap.className = 'match-options';

        // Left column
        const leftCol = document.createElement('div');
        leftCol.className = 'match-col match-left';
        question.left.forEach((item, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option match-left-btn';
            btn.dataset.index = i;
            btn.innerHTML = '<span>' + item + '</span>';
            btn.addEventListener('click', () => selectMatchLeft(i));
            leftCol.appendChild(btn);
        });

        // Right column
        const rightCol = document.createElement('div');
        rightCol.className = 'match-col match-right';
        const rightWrap = document.createElement('div');
        rightWrap.className = 'match-right-items';
        rightWrap.id = 'match-right-items';
        shuffledRight.forEach((origIndex) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option match-right-btn';
            btn.dataset.origIndex = origIndex;
            btn.innerHTML = '<span>' + question.right[origIndex] + '</span>';
            btn.addEventListener('click', () => selectMatchRight(origIndex));
            rightWrap.appendChild(btn);
        });
        rightCol.appendChild(rightWrap);

        wrap.appendChild(leftCol);
        wrap.appendChild(rightCol);
        els.quizOptions.appendChild(wrap);

        const hint = document.createElement('div');
        hint.className = 'order-hint';
        hint.textContent = 'Selecciona un elemento de la izquierda y luego su par de la derecha.';
        els.quizOptions.appendChild(hint);

        // Submit button
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary btn-large';
        submitBtn.textContent = 'Verificar respuestas';
        submitBtn.id = 'btn-submit-match';
        submitBtn.style.marginTop = '12px';
        submitBtn.addEventListener('click', submitMatch);
        els.quizOptions.appendChild(submitBtn);
    }

    function selectMatchLeft(index) {
        if (state.quiz.answered) return;
        state.quiz.matchSelected = index;
        const leftBtns = els.quizOptions.querySelectorAll('.match-left-btn');
        leftBtns.forEach((btn, i) => {
            btn.classList.toggle('selected', i === index);
        });
    }

    function selectMatchRight(origIndex) {
        const q = state.quiz;
        if (q.answered || q.matchSelected === -1) return;

        // Assign this right item to the selected left item
        q.matchCurrent[q.matchSelected] = origIndex;

        // Update left button text to show match
        const leftBtns = els.quizOptions.querySelectorAll('.match-left-btn');
        const question = q.questions[q.currentIndex];
        leftBtns[q.matchSelected].innerHTML = '<span>' + question.left[q.matchSelected] + ' → ' + question.right[origIndex] + '</span>';
        leftBtns[q.matchSelected].classList.remove('selected');

        // Mark right button as used
        const rightBtns = els.quizOptions.querySelectorAll('.match-right-btn');
        rightBtns.forEach(btn => {
            if (parseInt(btn.dataset.origIndex) === origIndex) {
                btn.classList.add('disabled');
            }
        });

        q.matchSelected = -1;
    }

    function submitMatch() {
        const q = state.quiz;
        if (q.answered) return;
        if (q.matchCurrent.includes(-1)) {
            // Not all matched yet
            els.quizFeedback.className = 'quiz-feedback incorrect';
            els.quizFeedback.innerHTML = '<div class="feedback-label">Incomplete</div><div>Debe emparejar todos los elementos antes de verificar.</div>';
            els.quizFeedback.style.display = '';
            return;
        }

        q.answered = true;
        const question = q.questions[q.currentIndex];
        let correctCount = 0;
        q.matchCurrent.forEach((userMatch, i) => {
            if (userMatch === question.correct[i]) correctCount++;
        });
        const isCorrect = correctCount === question.left.length;
        if (isCorrect) q.correctCount++;

        // Highlight
        const leftBtns = els.quizOptions.querySelectorAll('.match-left-btn');
        leftBtns.forEach((btn, i) => {
            btn.classList.add('disabled');
            if (q.matchCurrent[i] === question.correct[i]) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('incorrect');
            }
        });

        const submitBtn = document.getElementById('btn-submit-match');
        if (submitBtn) submitBtn.style.display = 'none';

        const correctPairs = question.left.map((l, i) => l + ' → ' + question.right[question.correct[i]]).join('; ');
        showFeedback(isCorrect, (isCorrect ? '' : 'Emparejaste ' + correctCount + ' de ' + question.left.length + ' correctamente. ') + 'Pares correctos: ' + correctPairs);
    }

    function showFeedback(isCorrect, extraText) {
        els.quizFeedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
        els.quizFeedback.innerHTML = '<div class="feedback-label">' + (isCorrect ? 'Correcto' : 'Incorrecto') + '</div><div>' + (extraText || (isCorrect ? 'La respuesta es correcta.' : '')) + '</div>';
        els.quizFeedback.style.display = '';

        const isLast = state.quiz.currentIndex >= state.quiz.totalQuestions - 1;
        els.nextBtn.textContent = isLast ? 'Ver Resultados' : 'Siguiente Pregunta';
        els.nextBtn.style.display = '';

        const progress = ((state.quiz.currentIndex + 1) / state.quiz.totalQuestions) * 100;
        els.quizProgress.style.width = progress + '%';
    }

    function selectOption(index) {
        const q = state.quiz;
        if (q.answered) return;

        const question = q.questions[q.currentIndex];
        const type = question.type || 'mc';

        if (type === 'order') {
            submitOrder();
            return;
        }

        q.answered = true;
        const isCorrect = index === question.correct;

        if (isCorrect) {
            q.correctCount++;
        }

        if (type === 'tf') {
            // Mark tf buttons
            const tfBtns = els.quizOptions.querySelectorAll('.tf-btn');
            tfBtns.forEach((btn) => {
                btn.classList.add('disabled');
                const val = btn.textContent.includes('Verdadero');
                if (val === question.correct) {
                    btn.classList.add('correct');
                }
                if (val === index) {
                    btn.classList.add('selected');
                    if (!isCorrect) btn.classList.add('incorrect');
                }
            });
        } else {
            // Mark option buttons (mc, fill, correct, reading)
            const optionBtns = els.quizOptions.querySelectorAll('.quiz-option');
            optionBtns.forEach((btn, i) => {
                btn.classList.add('disabled');
                if (i === question.correct) {
                    btn.classList.add('correct');
                } else if (i === index && !isCorrect) {
                    btn.classList.add('incorrect');
                }
                if (i === index) {
                    btn.classList.add('selected');
                }
            });
        }

        let extraText = '';
        if (!isCorrect) {
            if (type === 'tf') {
                extraText = 'La respuesta correcta es: ' + (question.correct ? 'Verdadero' : 'Falso') + '.';
            } else if (type === 'fill' || type === 'correct' || type === 'reading') {
                extraText = 'La respuesta correcta es la opción ' + String.fromCharCode(65 + question.correct) + '.';
            } else {
                extraText = 'La respuesta correcta es la opción ' + String.fromCharCode(65 + question.correct) + '.';
            }
        }

        showFeedback(isCorrect, extraText);
    }

    function nextQuestion() {
        const q = state.quiz;
        q.currentIndex++;

        if (q.currentIndex >= q.totalQuestions) {
            showResults();
        } else {
            renderQuestion();
        }
    }

    function showResults() {
        const q = state.quiz;
        
        els.quizActive.style.display = 'none';
        els.quizResults.style.display = '';

        const percentage = Math.round((q.correctCount / q.totalQuestions) * 100);
        
        els.resultsScore.textContent = q.correctCount + '/' + q.totalQuestions;
        els.resultsPercentage.textContent = percentage + '%';

        // Grade
        let gradeText, gradeClass;
        if (percentage >= 90) {
            gradeText = 'Excelente';
            gradeClass = 'excelente';
        } else if (percentage >= 70) {
            gradeText = 'Bien';
            gradeClass = 'bien';
        } else if (percentage >= 60) {
            gradeText = 'Suficiente';
            gradeClass = 'suficiente';
        } else {
            gradeText = 'Insuficiente';
            gradeClass = 'insuficiente';
        }

        els.resultsGrade.textContent = gradeText;
        els.resultsGrade.className = 'results-grade ' + gradeClass;

        const incorrect = q.totalQuestions - q.correctCount;
        els.resultsDetail.innerHTML = `
            Respondio correctamente <strong>${q.correctCount}</strong> de <strong>${q.totalQuestions}</strong> preguntas.                ${incorrect > 0 ? ' Es necesario repasar los temas en los que tuvo errores.' : (state.unit === 'all' ? ' Ha dominado los temas de todas las unidades.' : ' Ha dominado los temas de esta unidad.')}
        `;
    }

    function retryQuiz() {
        els.quizResults.style.display = 'none';
        startQuiz();
    }

    // --- Public API ---

    return {
        init: init,
        selectTestType: selectTestType,
        selectSubject: selectSubject,
        selectUnit: selectUnit,
        showTab: showTab,
        startQuiz: startQuiz,
        startQuizAll: startQuizAll,
        nextQuestion: nextQuestion,
        retryQuiz: retryQuiz,
        goBack: goBack,
        showUnitDetail: showUnitDetail
    };

})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});
