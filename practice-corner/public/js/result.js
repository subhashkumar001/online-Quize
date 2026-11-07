// Practice Corner - Quiz Result & Review Logic
document.addEventListener('DOMContentLoaded', async () => {
  // Ensure user is signed in
  await initAuthNav({ requireLogin: true });

  const rawData = sessionStorage.getItem('practiceCornerLastResult');
  const lastCount = sessionStorage.getItem('practiceCornerLastCount') || '10';

  if (!rawData) {
    // If no recent result, return to subjects
    window.location.href = '/subjects';
    return;
  }

  let result;
  try {
    result = JSON.parse(rawData);
  } catch {
    window.location.href = '/subjects';
    return;
  }

  // DOM Elements
  const subjectTag = document.getElementById('result-subject-tag');
  const scoreDisplay = document.getElementById('score-display');
  const scoreMessage = document.getElementById('score-message');
  const correctCountEl = document.getElementById('correct-count');
  const wrongCountEl = document.getElementById('wrong-count');
  const reviewList = document.getElementById('review-list');
  const tryAgainBtn = document.getElementById('try-again-btn');

  // Populate Subject Tag
  if (result.subject) {
    subjectTag.textContent = result.subject.name;
    subjectTag.style.backgroundColor = result.subject.color;
  }

  // Populate Score & Stats
  const score = result.score || 0;
  const total = result.total || 0;
  const wrong = total - score;
  const percentage = result.percentage || Math.round((score / total) * 100);

  scoreDisplay.textContent = `${score} / ${total}`;
  correctCountEl.textContent = String(score);
  wrongCountEl.textContent = String(wrong);

  // Friendly encouraging student notes
  if (percentage >= 90) {
    scoreMessage.textContent = `Outstanding! You scored ${percentage}%. You have solid mastery of these fundamentals.`;
  } else if (percentage >= 70) {
    scoreMessage.textContent = `Great effort! You scored ${percentage}%. Review the few questions below to turn them into strengths.`;
  } else if (percentage >= 50) {
    scoreMessage.textContent = `Decent start (${percentage}%). Go through the answer explanations below and try another round!`;
  } else {
    scoreMessage.textContent = `Keep your head up (${percentage}%). Revision is where learning actually happens. Read through the notes below.`;
  }

  // "Try Again" Button handler
  tryAgainBtn.addEventListener('click', () => {
    if (result.subject && result.subject.slug) {
      window.location.href = `/quiz?subject=${encodeURIComponent(result.subject.slug)}&count=${lastCount}`;
    } else {
      window.location.href = '/subjects';
    }
  });

  // Render Question-by-Question Review List
  reviewList.innerHTML = '';
  if (Array.isArray(result.review)) {
    result.review.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `review-item ${item.isCorrect ? 'is-correct' : 'is-wrong'}`;

      card.innerHTML = `
        <div class="review-q">
          <span style="font-family: var(--font-hand); font-size: 22px; margin-right: 8px;">Q${index + 1}.</span>
          ${escapeHtml(item.question)}
        </div>

        <div class="review-answers">
          <div class="ans-line">
            <span class="ans-label">Your Answer:</span>
            <span class="ans-text ${item.isCorrect ? 'correct-highlight' : 'wrong-highlight'}">
              ${item.selectedKey ? `[${item.selectedKey}] ${escapeHtml(item.selectedText)}` : '<em>Not answered</em>'}
              ${item.isCorrect ? ' ✓' : ' ✗'}
            </span>
          </div>

          ${!item.isCorrect ? `
            <div class="ans-line">
              <span class="ans-label">Right Answer:</span>
              <span class="ans-text correct-highlight">
                [${item.correctKey}] ${escapeHtml(item.correctText)} ✓
              </span>
            </div>
          ` : ''}
        </div>

        ${item.explanation ? `
          <div class="review-explanation">
            <strong>Notebook note:</strong> ${escapeHtml(item.explanation)}
          </div>
        ` : ''}
      `;

      reviewList.appendChild(card);
    });
  }
});

