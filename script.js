/* ==========================================================================
   PESCANDO EL CÓDIGO - JUEGO INTERACTIVO EN JAVASCRIPT
   Lógica del juego, preguntas, pesca interactiva, Web Audio API y animación.
   ========================================================================== */

// --- BASE DE DATOS DE PREGUNTAS (14 Preguntas Escolares) ---
const questionsData = [
    {
        category: "Git & GitHub",
        question: "¿Qué es GitHub y cuál es su función en el desarrollo de software?",
        correct: "Es una plataforma para alojar, gestionar y colaborar en proyectos mediante repositorios Git.",
        incorrect: [
            "Es un lenguaje de programación utilizado exclusivamente para crear páginas web.",
            "Es un programa utilizado únicamente para diseñar imágenes."
        ]
    },
    {
        category: "Git & GitHub",
        question: "¿Cuál es la diferencia entre Git y GitHub?",
        correct: "Git es un sistema de control de versiones y GitHub es una plataforma que permite alojar y colaborar con repositorios Git.",
        incorrect: [
            "Git y GitHub son exactamente el mismo programa.",
            "GitHub es un lenguaje de programación y Git es un navegador."
        ]
    },
    {
        category: "Git & GitHub",
        question: "¿Qué es un repositorio y cómo se utiliza en GitHub?",
        correct: "Es un espacio donde se almacenan los archivos, código e historial de cambios de un proyecto.",
        incorrect: [
            "Es una herramienta que solamente sirve para crear contraseñas.",
            "Es una parte del navegador utilizada para ejecutar JavaScript."
        ]
    },
    {
        category: "Git & GitHub",
        question: "¿Qué son los commits, branches, merge y pull requests?",
        correct: "Son herramientas de Git para registrar cambios, crear ramas, combinar cambios y proponer modificaciones en un proyecto.",
        incorrect: [
            "Son diferentes lenguajes de programación.",
            "Son herramientas utilizadas exclusivamente para diseñar páginas web."
        ]
    },
    {
        category: "Git & GitHub",
        question: "¿Cómo se puede utilizar GitHub para trabajar colaborativamente en un proyecto?",
        correct: "Los desarrolladores pueden trabajar con repositorios, ramas, commits y pull requests para compartir y revisar cambios.",
        incorrect: [
            "Cada integrante debe trabajar sin compartir ningún archivo.",
            "GitHub solamente permite que una persona trabaje en un proyecto."
        ]
    },
    {
        category: "Git & GitHub",
        question: "¿Qué ventajas ofrece GitHub para estudiantes y desarrolladores?",
        correct: "Permite practicar control de versiones, crear portafolios, colaborar y almacenar proyectos.",
        incorrect: [
            "Solo sirve para jugar videojuegos.",
            "Solo permite crear documentos de texto sin código."
        ]
    },
    {
        category: "JavaScript",
        question: "¿Qué es JavaScript y qué función cumple en el desarrollo frontend?",
        correct: "Es un lenguaje de programación que permite agregar interactividad y comportamiento dinámico a las páginas web.",
        incorrect: [
            "Es un programa utilizado únicamente para editar fotografías.",
            "Es un sistema operativo para computadoras."
        ]
    },
    {
        category: "JavaScript & Frameworks",
        question: "¿Qué es un framework de JavaScript?",
        correct: "Es una estructura o conjunto de herramientas que facilita y organiza el desarrollo de aplicaciones utilizando JavaScript.",
        incorrect: [
            "Es un tipo de computadora.",
            "Es un programa utilizado únicamente para navegar por Internet."
        ]
    },
    {
        category: "Frontend Frameworks",
        question: "¿Cuáles son algunas de las principales tecnologías utilizadas actualmente en frontend?",
        correct: "React, Angular, Vue.js y Svelte, entre otras.",
        incorrect: [
            "Git, GitHub, Windows y Linux son todos frameworks de frontend.",
            "Word, Excel y PowerPoint son frameworks de JavaScript."
        ]
    },
    {
        category: "Frontend Frameworks",
        question: "¿Cuáles son algunas características de React, Angular, Vue.js y Svelte?",
        correct: "React es una biblioteca para interfaces, Angular es un framework completo, Vue.js es progresivo y Svelte utiliza un enfoque basado en compilación.",
        incorrect: [
            "Todas son bases de datos.",
            "Todas son sistemas operativos."
        ]
    },
    {
        category: "Frontend Frameworks",
        question: "¿Cuál es una diferencia importante entre React, Angular, Vue.js y Svelte?",
        correct: "Utilizan diferentes enfoques y arquitecturas para construir interfaces y aplicaciones web.",
        incorrect: [
            "Todas funcionan exactamente de la misma manera.",
            "Son diferentes versiones del sistema operativo Windows."
        ]
    },
    {
        category: "Frontend Frameworks",
        question: "¿Qué ventajas y desventajas pueden presentar estas tecnologías?",
        correct: "Pueden ofrecer productividad, componentes reutilizables y herramientas de desarrollo, pero también pueden tener diferentes curvas de aprendizaje y complejidad.",
        incorrect: [
            "No tienen ninguna ventaja ni desventaja.",
            "Solamente funcionan para editar fotografías."
        ]
    },
    {
        category: "Despliegue & GitHub Pages",
        question: "¿Cómo se puede publicar un proyecto frontend desarrollado con JavaScript en GitHub Pages?",
        correct: "Subiendo el proyecto a un repositorio de GitHub y configurando GitHub Pages para publicar el contenido.",
        incorrect: [
            "Instalando Windows dentro del repositorio.",
            "Enviando únicamente una captura de pantalla del proyecto."
        ]
    },
    {
        category: "Integración Web",
        question: "¿Cómo se relacionan GitHub, Git y los frameworks frontend dentro de un proyecto web?",
        correct: "Los frameworks ayudan a construir la aplicación, Git controla los cambios del código y GitHub permite almacenar y colaborar con el proyecto.",
        incorrect: [
            "Son tres lenguajes de programación que deben ejecutarse al mismo tiempo.",
            "No tienen ninguna relación con el desarrollo web."
        ]
    }
];

// --- ESTADO DEL JUEGO ---
let currentQuestionIndex = 0;
let score = 0;
let correctCount = 0;
let incorrectCount = 0;
let isAnswered = false;
let audioEnabled = true;

// --- ELEMENTOS DEL DOM ---
const questionTrackerEl = document.getElementById("question-tracker");
const scoreTrackerEl = document.getElementById("score-tracker");
const progressBarEl = document.getElementById("progress-bar");
const questionCategoryEl = document.getElementById("question-category");
const questionTextEl = document.getElementById("question-text");
const fishContainerEl = document.getElementById("fish-container");
const feedbackBannerEl = document.getElementById("feedback-banner");
const feedbackIconEl = document.getElementById("feedback-icon");
const feedbackTextEl = document.getElementById("feedback-text");
const soundBtnEl = document.getElementById("sound-btn");
const soundIconEl = document.getElementById("sound-icon");

// Elementos Pantalla Final
const endScreenEl = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const correctCountEl = document.getElementById("correct-count");
const incorrectCountEl = document.getElementById("incorrect-count");
const accuracyPercentEl = document.getElementById("accuracy-percent");
const finalMessageTextEl = document.getElementById("final-message-text");
const restartBtnEl = document.getElementById("restart-btn");

// Elementos SVG para el hilo de pesca
const fishingLineSvg = document.getElementById("fishing-line-svg");
const fishingLinePath = document.getElementById("fishing-line");
const fishingHookGroup = document.getElementById("fishing-hook");

// --- SINTETIZADOR DE SONIDOS CON WEB AUDIO API ---
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
    }
}

function playTone(freq, type = "sine", duration = 0.2, gainValue = 0.1) {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.log("Audio Error:", e);
    }
}

// Sonido de Lanzar la Caña
function playCastSound() {
    if (!audioEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
}

// Sonido de Pesca Correcta (Chime alegre)
function playCorrectSound() {
    if (!audioEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
        setTimeout(() => playTone(freq, "triangle", 0.3, 0.15), idx * 80);
    });
}

// Sonido de Pesca Incorrecta (Buzzer de error)
function playIncorrectSound() {
    if (!audioEnabled) return;
    const notes = [220, 196, 174];
    notes.forEach((freq, idx) => {
        setTimeout(() => playTone(freq, "sawtooth", 0.25, 0.12), idx * 100);
    });
}

// Sonido de Victoria al terminar
function playVictorySound() {
    if (!audioEnabled) return;
    const melody = [
        { f: 523.25, d: 0.15 }, { f: 659.25, d: 0.15 }, { f: 783.99, d: 0.15 },
        { f: 1046.5, d: 0.4 }
    ];
    melody.forEach((note, idx) => {
        setTimeout(() => playTone(note.f, "sine", note.d, 0.18), idx * 160);
    });
}

// --- FUNCIÓN MEZCLADORA (Shuffle Array) ---
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- ARTWORKS DE PECES (SVG) ---
const fishSvgTemplates = [
    // Pez Naranja (Clownfish style)
    `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
        <path d="M 15 35 C 10 10 5 15 0 5 C 10 35 0 65 15 35 Z" fill="#FF7675"/>
        <ellipse cx="50" cy="35" rx="35" ry="22" fill="#FF7675"/>
        <path d="M 40 14 C 45 25 45 45 40 56" stroke="#FFFFFF" stroke-width="6" fill="none"/>
        <path d="M 60 16 C 65 25 65 45 60 54" stroke="#FFFFFF" stroke-width="5" fill="none"/>
        <circle cx="72" cy="28" r="4" fill="#2B2D42"/>
        <circle cx="73" cy="27" r="1.5" fill="#FFFFFF"/>
        <path d="M 30 25 C 20 15 25 5 35 15 Z" fill="#E74C3C"/>
    </svg>`,
    // Pez Turquesa (Tropical Blue style)
    `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
        <path d="M 15 35 L 0 10 L 5 35 L 0 60 Z" fill="#4ECDC4"/>
        <ellipse cx="50" cy="35" rx="35" ry="24" fill="#4ECDC4"/>
        <path d="M 50 11 Q 55 35 50 59" stroke="#FFE66D" stroke-width="4" fill="none"/>
        <circle cx="74" cy="27" r="4.5" fill="#1D3557"/>
        <circle cx="75" cy="26" r="1.5" fill="#FFFFFF"/>
        <path d="M 45 12 C 40 0 60 0 55 12 Z" fill="#45B7D1"/>
    </svg>`,
    // Pez Dorado (Yellow Gold style)
    `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
        <path d="M 15 35 Q 0 10 0 35 Q 0 60 15 35 Z" fill="#FFB703"/>
        <ellipse cx="50" cy="35" rx="36" ry="22" fill="#FFB703"/>
        <path d="M 35 15 Q 42 35 35 55" stroke="#FB8500" stroke-width="4" fill="none"/>
        <circle cx="73" cy="28" r="4" fill="#023E8A"/>
        <circle cx="74" cy="27" r="1.5" fill="#FFFFFF"/>
        <path d="M 50 13 Q 65 2 58 15 Z" fill="#FB8500"/>
    </svg>`
];

// --- CARGAR PREGUNTA ---
function loadQuestion(index) {
    isAnswered = false;
    hideFeedbackBanner();
    resetFishingLine();

    const currentQ = questionsData[index];

    // Actualizar HUD
    questionTrackerEl.textContent = `Pregunta ${index + 1} / ${questionsData.length}`;
    scoreTrackerEl.textContent = `${score} pts`;
    const progressPercent = ((index + 1) / questionsData.length) * 100;
    progressBarEl.style.width = `${progressPercent}%`;

    // Actualizar datos de pregunta
    questionCategoryEl.textContent = currentQ.category;
    questionTextEl.textContent = currentQ.question;

    // Preparar opciones mezcladas (1 correcta + 2 incorrectas)
    const options = shuffleArray([
        { text: currentQ.correct, isCorrect: true },
        { text: currentQ.incorrect[0], isCorrect: false },
        { text: currentQ.incorrect[1], isCorrect: false }
    ]);

    // Limpiar contenedor de peces
    fishContainerEl.innerHTML = "";

    // Generar las 3 tarjetas de peces
    const optionLabels = ["A", "B", "C"];
    options.forEach((opt, idx) => {
        const fishCard = document.createElement("div");
        fishCard.className = "fish-card";
        fishCard.dataset.isCorrect = opt.isCorrect;

        const svgArtwork = fishSvgTemplates[idx % fishSvgTemplates.length];

        fishCard.innerHTML = `
            <div class="fish-avatar">
                ${svgArtwork}
            </div>
            <div class="option-badge">${optionLabels[idx]}</div>
            <div class="option-text">${opt.text}</div>
        `;

        // Evento de Click / Pesca
        fishCard.addEventListener("click", (e) => {
            handleFishSelection(fishCard, opt.isCorrect, opt.text);
        });

        fishContainerEl.appendChild(fishCard);
    });
}

// --- DIBUJAR ANIMACIÓN DEL HILO DE PESCA Y ANZUELO ---
function animateFishingLine(targetCard, callback) {
    const sceneRect = document.getElementById("game-scene").getBoundingClientRect();
    const boatContainer = document.querySelector(".boat-fisherman-container");
    const boatRect = boatContainer ? boatContainer.getBoundingClientRect() : null;
    const cardRect = targetCard.getBoundingClientRect();

    // Posición dinámica de la punta de la caña respecto al bote
    let rodTipX = sceneRect.width * 0.18;
    let rodTipY = sceneRect.height * 0.22;

    if (boatRect) {
        rodTipX = (boatRect.left - sceneRect.left) + (boatRect.width * 0.95);
        rodTipY = (boatRect.top - sceneRect.top) + (boatRect.height * 0.12);
    }

    // Posición del centro del pez objetivo
    const targetX = (cardRect.left - sceneRect.left) + (cardRect.width * 0.15);
    const targetY = (cardRect.top - sceneRect.top) + (cardRect.height * 0.5);

    // Dibujar el hilo SVG
    const controlX = (rodTipX + targetX) / 2 + 15;
    const controlY = (rodTipY + targetY) / 2 - 35;

    const pathData = `M ${rodTipX} ${rodTipY} Q ${controlX} ${controlY} ${targetX} ${targetY}`;
    fishingLinePath.setAttribute("d", pathData);
    fishingHookGroup.setAttribute("transform", `translate(${targetX}, ${targetY})`);

    playCastSound();

    setTimeout(() => {
        if (callback) callback();
    }, 250);
}

function resetFishingLine() {
    fishingLinePath.setAttribute("d", "M 0 0 L 0 0");
    fishingHookGroup.setAttribute("transform", "translate(-100, -100)");
}

// --- MANEJO DE SELECCIÓN DE RESPUESTA ---
function handleFishSelection(fishCard, isCorrect, text) {
    if (isAnswered) return;
    isAnswered = true;

    // Animar hilo de pesca hacia la tarjeta de respuesta
    animateFishingLine(fishCard, () => {
        if (isCorrect) {
            // Respuesta Correcta
            score += 100;
            correctCount++;
            fishCard.classList.add("fished-correct");
            playCorrectSound();
            showFeedbackBanner(true, "¡Excelente! 🎣 Respuesta correcta.");
        } else {
            // Respuesta Incorrecta
            incorrectCount++;
            fishCard.classList.add("fished-incorrect");
            playIncorrectSound();
            showFeedbackBanner(false, "¡Oh no! 🐟 Esa no es la respuesta correcta.");

            // Mostrar cuál era la correcta
            const allCards = fishContainerEl.querySelectorAll(".fish-card");
            allCards.forEach(card => {
                if (card.dataset.isCorrect === "true") {
                    card.classList.add("reveal-correct");
                }
            });
        }

        // Actualizar UI Puntuación
        scoreTrackerEl.textContent = `${score} pts`;

        // Avanzar a la siguiente pregunta tras 1.8s
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questionsData.length) {
                loadQuestion(currentQuestionIndex);
            } else {
                showEndScreen();
            }
        }, 1800);
    });
}

// --- MOSTRAR / OCULTAR FEEDBACK TOAST ---
function showFeedbackBanner(isSuccess, message) {
    feedbackBannerEl.className = `feedback-banner ${isSuccess ? 'success' : 'error'}`;
    feedbackIconEl.textContent = isSuccess ? "🎣" : "🐟";
    feedbackTextEl.textContent = message;
    feedbackBannerEl.classList.remove("hidden");
}

function hideFeedbackBanner() {
    feedbackBannerEl.classList.add("hidden");
}

// --- MOSTRAR PANTALLA FINAL DE RESULTADOS ---
function showEndScreen() {
    playVictorySound();
    resetFishingLine();

    const totalQuestions = questionsData.length;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    finalScoreEl.textContent = `${score} pts`;
    correctCountEl.textContent = `${correctCount} / ${totalQuestions}`;
    incorrectCountEl.textContent = `${incorrectCount} / ${totalQuestions}`;
    accuracyPercentEl.textContent = `${accuracy}%`;

    // Mensaje personalizado según el porcentaje alcanzado
    let messageText = "";
    if (accuracy >= 90) {
        messageText = "🏆 ¡Excelente! Dominas muy bien estos conceptos.";
    } else if (accuracy >= 70) {
        messageText = "🎣 ¡Muy bien! Tienes buenos conocimientos.";
    } else if (accuracy >= 50) {
        messageText = "🐟 Buen intento. Puedes repasar algunos conceptos.";
    } else {
        messageText = "📚 Sigue practicando. ¡La próxima pesca será mejor!";
    }

    finalMessageTextEl.textContent = messageText;
    endScreenEl.classList.remove("hidden");
}

// --- REINICIAR EL JUEGO ---
function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
    isAnswered = false;

    endScreenEl.classList.add("hidden");
    loadQuestion(0);
}

// --- CONFIGURACIÓN DE AUDIO (MUTE/UNMUTE) ---
soundBtnEl.addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    soundIconEl.textContent = audioEnabled ? "🔊" : "🔇";
    soundBtnEl.title = audioEnabled ? "Desactivar Sonido" : "Activar Sonido";
});

// Re-vincular botón de reinicio
restartBtnEl.addEventListener("click", restartGame);

// --- INICIALIZACIÓN AL CARGAR LA PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    // Escuchar interacción del usuario para activar AudioContext
    document.body.addEventListener("click", () => {
        initAudio();
    }, { once: true });

    // Cargar la primera pregunta
    loadQuestion(0);
});
