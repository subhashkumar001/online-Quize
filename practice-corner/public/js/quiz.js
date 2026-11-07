// Practice Corner - Interactive Quiz Session Logic
document.addEventListener('DOMContentLoaded', async () => {
  // Ensure user is signed in
  await initAuthNav({ requireLogin: true });

  const urlParams = new URLSearchParams(window.location.search);
  const subjectSlug = urlParams.get('subject') || 'maths';
  const questionCount = parseInt(urlParams.get('count'), 10) || 10;

  // DOM Elements
  const subjectBadge = document.getElementById('subject-badge');
  const progressIndicator = document.getElementById('progress-indicator');
  const questionCard = document.getElementById('question-card');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');
  const quitBtn = document.getElementById('quit-btn');

  // Quiz State
  let questions = [];
  let subjectInfo = null;
  let currentIndex = 0;
  let userAnswers = [];
  let currentSelection = null; // { originalKey, displayKey }

  // 1. Fetch randomized quiz questions
  try {
    const res = await fetch(`/api/quiz/${encodeURIComponent(subjectSlug)}?count=${questionCount}`);
    if (!res.ok) {
      alert('Could not start quiz for this subject. Redirecting to subjects.');
      window.location.href = '/subjects';
      return;
    }

    const data = await res.json();
    questions = data.questions;
    subjectInfo = data.subject;

    if (!questions || questions.length === 0) {
      alert('No questions available in this subject yet.');
      window.location.href = '/subjects';
      return;
    }

    // Initialize badge
    subjectBadge.textContent = subjectInfo.name;
    subjectBadge.style.backgroundColor = subjectInfo.color;

    renderCurrentQuestion();
  } catch (err) {
    console.error('Quiz initialization error:', err);
    alert('Failed to connect to server. Redirecting to subjects.');
    window.location.href = '/subjects';
  }

  // 2. Render Single Question with Animations
  function renderCurrentQuestion() {
    currentSelection = null;
    nextBtn.disabled = true;

    const q = questions[currentIndex];
    const totalQ = questions.length;

    // Progress counter
    progressIndicator.textContent = `Question ${currentIndex + 1} of ${totalQ}`;

    // Update button text on last question
    if (currentIndex === totalQ - 1) {
      nextBtn.innerHTML = 'Finish &amp; See Score &rarr;';
    } else {
      nextBtn.innerHTML = 'Next Question &rarr;';
    }

    // Question text
    questionText.textContent = q.question;

    // Paper-slide flip animation trigger
    questionCard.classList.remove('animating');
    // Force reflow
    void questionCard.offsetWidth;
    questionCard.classList.add('animating');

    // Build exactly 4 options with staggered animation & self-drawing tick
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const optionEl = document.createElement('div');
      optionEl.className = 'option-item';
      optionEl.setAttribute('role', 'radio');
      optionEl.setAttribute('aria-checked', 'false');
      optionEl.setAttribute('tabindex', '0');
      optionEl.dataset.originalKey = opt.originalKey;
      optionEl.dataset.displayKey = opt.key;

      optionEl.innerHTML = `
        <span class="option-letter">${opt.key}</span>
        <span class="option-text">${escapeHtml(opt.text)}</span>
        <!-- Hand-drawn SVG tick -->
        <svg class="tick-icon" viewBox="0 0 24 24">
          <path d="M4 13l5 5L20 6" />
        </svg>
      `;

      optionEl.addEventListener('click', () => chooseOption(optionEl, opt));
      optionsContainer.appendChild(optionEl);
    });
  }

  // 3. Option Selection Handler
  function chooseOption(element, opt) {
    // Deselect all
    const allOptions = optionsContainer.querySelectorAll('.option-item');
    allOptions.forEach(el => {
      el.classList.remove('selected');
      el.setAttribute('aria-checked', 'false');
    });

    // Mark current selected
    element.classList.add('selected');
    element.setAttribute('aria-checked', 'true');

    currentSelection = {
      originalKey: opt.originalKey,
      displayKey: opt.key,
    };

    // Enable Next button
    nextBtn.disabled = false;
  }

  // 4. Next Question / Submit Handler
  async function handleNext() {
    if (!currentSelection) return;

    // Save answer
    const currentQ = questions[currentIndex];
    userAnswers.push({
      questionId: currentQ.id,
      selectedOriginalKey: currentSelection.originalKey,
    });

    // Check if more questions remain
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderCurrentQuestion();
    } else {
      // Finished all questions -> Submit to backend
      nextBtn.disabled = true;
      nextBtn.textContent = 'Calculating score...';

      try {
        const res = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectSlug: subjectInfo.slug,
            answers: userAnswers,
          }),
        });

        const resultData = await res.json();
        if (!res.ok) {
          alert(resultData.error || 'Failed to submit quiz.');
          nextBtn.disabled = false;
          return;
        }

        // Store result in sessionStorage for the result page to read
        sessionStorage.setItem('practiceCornerLastResult', JSON.stringify(resultData));
        sessionStorage.setItem('practiceCornerLastCount', String(questionCount));
        window.location.href = '/result';
      } catch (err) {
        console.error('Quiz submission error:', err);
        alert('Connection error while submitting your answers. Please try again.');
        nextBtn.disabled = false;
      }
    }
  }

  nextBtn.addEventListener('click', handleNext);

  // 5. Keyboard Support: 1-4 or A-D, Enter to proceed
  document.addEventListener('keydown', (e) => {
    // Ignore if typing inside input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toUpperCase();
    const options = optionsContainer.querySelectorAll('.option-item');

    // 1-4
    if (['1', '2', '3', '4'].includes(key)) {
      const idx = parseInt(key, 10) - 1;
      if (options[idx]) options[idx].click();
      return;
    }

    // A-D
    if (['A', 'B', 'C', 'D'].includes(key)) {
      const keyMap = { A: 0, B: 1, C: 2, D: 3 };
      const idx = keyMap[key];
      if (options[idx]) options[idx].click();
      return;
    }

    // Enter for Next (if an option is selected)
    if (e.key === 'Enter') {
      if (!nextBtn.disabled) {
        e.preventDefault();
        handleNext();
      }
    }
  });

  // Confirm before accidental exit
  quitBtn.addEventListener('click', (e) => {
    if (currentIndex > 0 && currentIndex < questions.length) {
      const confirmQuit = confirm('Are you sure you want to exit? Your progress in this quiz will be lost.');
      if (!confirmQuit) {
        e.preventDefault();
      }
    }
  });
});

