/* ===================================
   ENERGI TAK TERBAHARUKAN - JAVASCRIPT
   =================================== */

// ===== DARK/LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');

// Check if user has saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ===== SMOOTH SCROLL =====
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== TOGGLE ENERGY CARDS =====
function toggleCard(card) {
    const details = card.querySelector('.card-details');
    const isHidden = details.classList.contains('hidden');

    // Close all other cards
    document.querySelectorAll('.energy-card').forEach(c => {
        c.classList.remove('expanded');
        c.querySelector('.card-details').classList.remove('show');
    });

    // Toggle current card
    if (isHidden) {
        details.classList.remove('hidden');
        details.classList.add('show');
        card.classList.add('expanded');
    } else {
        details.classList.add('hidden');
        details.classList.remove('show');
        card.classList.remove('expanded');
    }
}

// ===== SCROLL ANIMATION FOR ELEMENTS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items and other elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.timeline-item, .energy-card, .info-card, .impact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ===== SIMULATION INTERACTIVE =====
const yearSlider = document.getElementById('yearSlider');
const yearValue = document.getElementById('yearValue');
const co2Result = document.getElementById('co2Result');
const tempResult = document.getElementById('tempResult');
const landResult = document.getElementById('landResult');
const co2Bar = document.getElementById('co2Bar');
const tempBar = document.getElementById('tempBar');
const landBar = document.getElementById('landBar');
const simMessage = document.getElementById('simMessage');

if (yearSlider) {
    yearSlider.addEventListener('input', (e) => {
        const years = parseInt(e.target.value);
        yearValue.textContent = years;

        // Calculate impacts based on years
        const co2Emissions = 500 * years; // 500 juta ton per tahun
        const tempIncrease = (0.2 * years).toFixed(1); // 0.2°C per tahun
        const landDamage = 10 * years; // 10 ribu hektar per tahun

        // Update display
        co2Result.textContent = co2Emissions.toLocaleString('id-ID');
        tempResult.textContent = tempIncrease + '°C';
        landResult.textContent = landDamage.toLocaleString('id-ID');

        // Update bar widths
        const co2Width = Math.min((years / 50) * 100, 100);
        const tempWidth = Math.min((years / 50) * 100, 100);
        const landWidth = Math.min((years / 50) * 100, 100);

        co2Bar.style.width = co2Width + '%';
        tempBar.style.width = tempWidth + '%';
        landBar.style.width = landWidth + '%';

        // Update message
        updateSimulationMessage(years);
    });

    function updateSimulationMessage(years) {
        let message = '';
        if (years <= 10) {
            message = '⚠️ Dengan penggunaan energi fosil selama ' + years + ' tahun, dampak lingkungan sudah terasa.';
        } else if (years <= 25) {
            message = '🔴 Selama ' + years + ' tahun, kerusakan lingkungan sangat signifikan dan sulit diperbaiki.';
        } else {
            message = '🆘 Jika energi fosil terus digunakan ' + years + ' tahun ke depan, planet kita akan mengalami kerusakan permanent!';
        }
        simMessage.textContent = message;
    }

    // Initial message
    updateSimulationMessage(10);
}

// ===== QUIZ FUNCTIONALITY =====
const quizData = [
    {
        question: 'Apa itu energi tak terbaharukan?',
        options: [
            'Energi yang dapat diperbaharui dengan mudah',
            'Energi yang jumlahnya terbatas dan tidak dapat diperbaharui dalam waktu singkat',
            'Energi yang bersumber dari matahari',
            'Energi yang ramah lingkungan'
        ],
        correct: 1
    },
    {
        question: 'Mana dari berikut ini yang BUKAN termasuk energi tak terbaharukan?',
        options: [
            'Minyak bumi',
            'Batu bara',
            'Energi matahari',
            'Gas alam'
        ],
        correct: 2
    },
    {
        question: 'Proses pembentukan energi fosil memerlukan waktu berapa lama?',
        options: [
            'Ribuan tahun',
            'Puluhan ribu tahun',
            'Jutaan tahun',
            'Hanya beberapa tahun'
        ],
        correct: 2
    },
    {
        question: 'Dampak utama dari penggunaan energi fosil adalah?',
        options: [
            'Meningkatkan produksi pertanian',
            'Meningkatkan suhu bumi dan polusi udara',
            'Menghemat biaya energi',
            'Mengurangi limbah plastik'
        ],
        correct: 1
    },
    {
        question: 'Manakah energi terbarukan yang paling ramah lingkungan?',
        options: [
            'Batu bara',
            'Minyak bumi',
            'Energi matahari dan angin',
            'Gas alam'
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    displayQuestion();
}

function displayQuestion() {
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');

    if (currentQuestion < quizData.length) {
        quizResults.classList.add('hidden');
        const question = quizData[currentQuestion];

        let optionsHTML = '';
        question.options.forEach((option, index) => {
            optionsHTML += `
                <label class="quiz-option">
                    <input type="radio" name="answer" value="${index}">
                    ${option}
                </label>
            `;
        });

        quizContent.innerHTML = `
            <div class="quiz-item">
                <div class="quiz-question">
                    Pertanyaan ${currentQuestion + 1} dari ${quizData.length}: ${question.question}
                </div>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
                <button class="btn btn-submit-quiz" onclick="nextQuestion()">
                    ${currentQuestion === quizData.length - 1 ? 'Selesai' : 'Lanjut'}
                </button>
            </div>
        `;

        // Add event listeners to options
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function () {
                document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    } else {
        showResults();
    }
}

function nextQuestion() {
    const selected = document.querySelector('.quiz-option.selected');
    if (!selected) {
        alert('Silakan pilih jawaban terlebih dahulu!');
        return;
    }

    const answer = parseInt(selected.querySelector('input').value);
    userAnswers.push(answer);

    if (answer === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    displayQuestion();
}

function showResults() {
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    const scoreText = document.getElementById('scoreText');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultMessage = document.getElementById('resultMessage');

    quizContent.classList.add('hidden');
    quizResults.classList.remove('hidden');

    const percentage = Math.round((score / quizData.length) * 100);
    scoreText.textContent = score + '/' + quizData.length;
    scorePercentage.textContent = percentage + '%';

    let message = '';
    if (percentage === 100) {
        message = '🏆 Sempurna! Kamu memahami materi energi tak terbaharukan dengan sangat baik!';
    } else if (percentage >= 80) {
        message = '🎉 Luar biasa! Kamu sudah memahami sebagian besar materi dengan baik.';
    } else if (percentage >= 60) {
        message = '👍 Cukup baik! Kamu perlu mempelajari energi tak terbarukan l.';
    } else {
        message = '📚 Jangan putus asa! Kembali pelajari materi dan coba lagi.';
    }

    resultMessage.textContent = message;
}

function restartQuiz() {
    initQuiz();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if quiz container exists
    if (document.getElementById('quizContent')) {
        initQuiz();
    }
});

// ===== ACTIVE NAVIGATION LINK =====
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.landing');
    if (parallax) {
        parallax.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
    }
});

// ===== HIDE NAVIGATION ON SCROLL =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }

    lastScrollTop = scrollTop;
});

// ===== IMPACT CARD HOVER REVEAL =====
document.addEventListener('DOMContentLoaded', () => {
    const impactCards = document.querySelectorAll('.impact-card');

    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const detail = this.querySelector('.impact-detail');
            if (detail) {
                detail.style.display = 'block';
            }
        });

        card.addEventListener('mouseleave', function () {
            const detail = this.querySelector('.impact-detail');
            if (detail) {
                detail.style.display = 'none';
            }
        });
    });
});

// ===== KEYBOARD NAVIGATION FOR ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    // Escape key to close expanded cards
    if (e.key === 'Escape') {
        document.querySelectorAll('.energy-card').forEach(card => {
            card.classList.remove('expanded');
            card.querySelector('.card-details').classList.add('hidden');
            card.querySelector('.card-details').classList.remove('show');
        });
    }
});

// ===== PRINT FRIENDLY STYLES =====
window.addEventListener('beforeprint', () => {
    document.body.classList.remove('light-mode');
});

// ===== CONSOLE MESSAGE =====
console.log('%c🌍 Energi Tak Terbarukan - Website Edukatif', 'font-size: 20px; font-weight: bold; color: #ff8c42;');
console.log('%cTema: Energi tak terbarukan dan Dampaknya untuk Pelajar SMP/SMA/SMK', 'color: #4dabf7; font-size: 14px;');
console.log('%cKembangkan solusi energi terbarukan untuk masa depan!', 'color: #51cf66; font-size: 14px;');
