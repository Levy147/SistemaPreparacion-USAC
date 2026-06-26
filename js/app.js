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

    // --- Unit Selection ---

    function showUnitSelection() {
        const units = LENGUAJE_DATA.units;
        
        els.unitsTitle.textContent = 'Seleccione la unidad';
        els.unitsGrid.innerHTML = '';

        // Add "All Units" card
        const allCard = document.createElement('button');
        allCard.className = 'card';
        allCard.style.borderColor = '#2c3e50';
        allCard.style.borderStyle = 'dashed';
        
        let totalQuestions = 0;
        for (const unit of units) {
            const qKey = 'u' + unit.unit;
            totalQuestions += (LENGUAJE_DATA.questions[qKey] || []).length;
        }
        
        allCard.innerHTML = `
            <div class="card-icon" style="background: #e8e6dc; color: #2c3e50;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c6 3 10 0 12-2v-5"/></svg>
            </div>
            <div class="card-content">
                <h3>Todas las unidades</h3>
                <p>Cuestionario combinado de todas las unidades (${totalQuestions} preguntas disponibles)</p>
            </div>
            <span class="card-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></span>
        `;
        allCard.addEventListener('click', () => selectAllUnits());
        els.unitsGrid.appendChild(allCard);

        for (const unit of units) {
            const num = parseInt(unit.unit);
            const qKey = 'u' + unit.unit;
            const questionCount = (LENGUAJE_DATA.questions[qKey] || []).length;

            const card = document.createElement('button');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-icon" style="background: #eef2f5; color: #2c3e50;">
                    <span style="font-weight:700;font-size:1rem;">${unit.unit}</span>
                </div>
                <div class="card-content">
                    <h3>Unidad ${unit.unit}: ${unit.name}</h3>
                    <p>${questionCount} preguntas disponibles</p>
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
        const unit = LENGUAJE_DATA.units.find(u => u.unit === state.unit);
        if (!unit) return;

        els.detailTitle.textContent = 'Unidad ' + unit.unit + ': ' + unit.name;
        
        const qKey = 'u' + unit.unit;
        const questionCount = (LENGUAJE_DATA.questions[qKey] || []).length;
        els.detailSubtitle.textContent = questionCount + ' preguntas disponibles';

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
        
        let totalQuestions = 0;
        for (const unit of LENGUAJE_DATA.units) {
            const qKey = 'u' + unit.unit;
            totalQuestions += (LENGUAJE_DATA.questions[qKey] || []).length;
        }
        els.detailSubtitle.textContent = totalQuestions + ' preguntas disponibles en total';

        // Show combined study info
        els.studyContent.innerHTML = `
            <div class="study-info">
                <p>Esta opcion permite estudiar todas las unidades en un solo cuestionario combinado. Se seleccionaran 20 preguntas al azar de entre las ${totalQuestions} preguntas disponibles en las 6 unidades.</p>
                <h4 class="study-section-title">Unidades incluidas</h4>
                <ul class="video-list">
                    ${LENGUAJE_DATA.units.map(u => `
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
        // Combine questions from all units
        let allQuestions = [];
        for (const unit of LENGUAJE_DATA.units) {
            const qKey = 'u' + unit.unit;
            const questions = LENGUAJE_DATA.questions[qKey] || [];
            allQuestions = allQuestions.concat(questions);
        }

        if (allQuestions.length === 0) return;

        // Select 20 random questions
        const count = Math.min(20, allQuestions.length);
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
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
        const unitData = LENGUAJE_DATA.videos.find(v => parseInt(v.unit) === unitNum);
        
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
        const allQuestions = LENGUAJE_DATA.questions[qKey];
        
        if (!allQuestions || allQuestions.length === 0) {
            return;
        }

        // Select 20 random questions (or less if pool is smaller)
        const count = Math.min(20, allQuestions.length);
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
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

        // Counter
        els.quizCounter.textContent = 'Pregunta ' + (q.currentIndex + 1) + ' de ' + q.totalQuestions;

        // Question text
        els.quizQuestion.textContent = question.question;

        // Options
        const letters = ['A', 'B', 'C', 'D'];
        els.quizOptions.innerHTML = '';

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

    function selectOption(index) {
        const q = state.quiz;
        if (q.answered) return;

        q.answered = true;
        const question = q.questions[q.currentIndex];
        const isCorrect = index === question.correct;

        if (isCorrect) {
            q.correctCount++;
        }

        // Mark options
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

        // Show feedback
        els.quizFeedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
        els.quizFeedback.innerHTML = '';
        
        if (isCorrect) {
            els.quizFeedback.innerHTML = '<div class="feedback-label">Correcto</div><div>La respuesta es correcta.</div>';
        } else {
            const correctLetter = String.fromCharCode(65 + question.correct);
            els.quizFeedback.innerHTML = '<div class="feedback-label">Incorrecto</div><div>La respuesta correcta es la opcion ' + correctLetter + '.</div>';
        }
        els.quizFeedback.style.display = '';

        // Show next button
        const isLast = q.currentIndex >= q.totalQuestions - 1;
        els.nextBtn.textContent = isLast ? 'Ver Resultados' : 'Siguiente Pregunta';
        els.nextBtn.style.display = '';

        // Update progress to reflect answer
        const progress = ((q.currentIndex + 1) / q.totalQuestions) * 100;
        els.quizProgress.style.width = progress + '%';
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
