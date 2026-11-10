// Practice Corner - Clean Quiz Logic
document.addEventListener('DOMContentLoaded', async () => {
  await initAuthNav({ requireLogin: true });

  const urlParams = new URLSearchParams(window.location.search);
  const subjectSlug = urlParams.get('subject') || 'maths';
  const questionCount = parseInt(urlParams.get('count'), 10) || 10;

  const subjectBadge = document.getElementById('subject-badge');
  const progressIndicator = document.getElementById('progress-indicator');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');

  let questions = [];
  let subjectInfo = null;
  let currentIndex = 0;
  let userAnswers = [];
  let currentSelection = null;

  // 1. Fetch questions
  try {
    const res = await fetch(`/api/quiz/${encodeURIComponent(subjectSlug)}?count=${questionCount}`);
    if (!res.ok) {
      alert('Could not start quiz. Redirecting to subjects.');
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

    subjectBadge.textContent = subjectInfo.name;
    renderQuestion();
  } catch (err) {
    console.error('Quiz initialization error:', err);
    alert('Failed to connect to server. Redirecting to subjects.');
    window.location.href = '/subjects';
  }

  // 2. Render Current Question
  function renderQuestion() {
    currentSelection = null;
    nextBtn.disabled = true;

    const q = questions[currentIndex];
    const total = questions.length;

    progressIndicator.textContent = `Question ${currentIndex + 1} of ${total}`;
    questionText.textContent = q.question;

    if (currentIndex === total - 1) {
      nextBtn.textContent = 'Submit Quiz';
    } else {
      nextBtn.textContent = 'Next Question →';
    }

    optionsContainer.innerHTML = '';
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-row';
      btn.innerHTML = `
        <span class="option-badge">${opt.key}</span>
        <span>${escapeHtml(opt.text)}</span>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.option-row').forEach(el => el.classList.remove('selected'));
        btn.classList.add('selected');
        currentSelection = {
          questionId: q.id,
          selectedOption: opt.originalKey
        };
        nextBtn.disabled = false;
      });

      optionsContainer.appendChild(btn);
    });
  }

  // 3. Next / Submit Handler
  nextBtn.addEventListener('click', async () => {
    if (!currentSelection) return;

    userAnswers.push(currentSelection);

    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      // Submit Quiz
      nextBtn.disabled = true;
      nextBtn.textContent = 'Submitting...';

      try {
        const res = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subjectSlug: subjectInfo.slug,
            answers: userAnswers
          })
        });

        const result = await res.json();

        if (res.ok && result.success) {
          sessionStorage.setItem('lastQuizResult', JSON.stringify(result));
          window.location.href = '/result';
        } else {
          alert(result.error || 'Failed to submit quiz. Please try again.');
          nextBtn.disabled = false;
          nextBtn.textContent = 'Submit Quiz';
        }
      } catch (err) {
        console.error('Quiz submit error:', err);
        alert('Network error while submitting quiz.');
        nextBtn.disabled = false;
        nextBtn.textContent = 'Submit Quiz';
      }
    }
  });
});
