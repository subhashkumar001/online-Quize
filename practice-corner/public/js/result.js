// Practice Corner - Simple Result & Review Logic
document.addEventListener('DOMContentLoaded', async () => {
  await initAuthNav({ requireLogin: true });

  const rawData = sessionStorage.getItem('lastQuizResult') || sessionStorage.getItem('practiceCornerLastResult');

  if (!rawData) {
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

  const subjectTag = document.getElementById('result-subject-tag');
  const scoreDisplay = document.getElementById('score-display');
  const scoreMessage = document.getElementById('score-message');
  const correctCountEl = document.getElementById('correct-count');
  const wrongCountEl = document.getElementById('wrong-count');
  const reviewList = document.getElementById('review-list');
  const tryAgainBtn = document.getElementById('try-again-btn');

  if (result.subject) {
    subjectTag.textContent = result.subject.name;
  }

  const score = result.score || 0;
  const total = result.total || 0;
  const wrong = total - score;
  const percentage = result.percentage || Math.round((score / total) * 100);

  scoreDisplay.textContent = `${score} / ${total}`;
  correctCountEl.textContent = String(score);
  wrongCountEl.textContent = String(wrong);

  if (percentage >= 80) {
    scoreMessage.textContent = `Great job! You scored ${percentage}%.`;
  } else if (percentage >= 50) {
    scoreMessage.textContent = `Good effort (${percentage}%). Check the explanations below to improve.`;
  } else {
    scoreMessage.textContent = `Score: ${percentage}%. Review the answers below to strengthen your understanding.`;
  }

  tryAgainBtn.addEventListener('click', () => {
    if (result.subject && result.subject.slug) {
      window.location.href = `/quiz?subject=${encodeURIComponent(result.subject.slug)}&count=${total}`;
    } else {
      window.location.href = '/subjects';
    }
  });

  reviewList.innerHTML = '';
  if (Array.isArray(result.review)) {
    result.review.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `review-item ${item.isCorrect ? 'correct' : 'wrong'}`;

      card.innerHTML = `
        <div class="review-meta">
          <strong>Question ${index + 1}</strong>
          <span style="font-weight: 600; color: ${item.isCorrect ? '#16a34a' : '#dc2626'};">
            ${item.isCorrect ? '✓ Correct' : '✗ Incorrect'}
          </span>
        </div>
        <div class="review-question">
          ${escapeHtml(item.question)}
        </div>
        <div class="review-answers">
          <div><strong>Your Answer:</strong> ${escapeHtml(item.selectedText || 'None')}</div>
          ${!item.isCorrect ? `<div style="color: #16a34a; margin-top: 4px;"><strong>Correct Answer:</strong> ${escapeHtml(item.correctText || '')}</div>` : ''}
        </div>
        ${item.explanation ? `
          <div class="review-explanation">
            <strong>Explanation:</strong> ${escapeHtml(item.explanation)}
          </div>
        ` : ''}
      `;

      reviewList.appendChild(card);
    });
  }
});
