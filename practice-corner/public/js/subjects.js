// Practice Corner - Simple Subjects Logic
document.addEventListener('DOMContentLoaded', async () => {
  // Check login
  await initAuthNav({ requireLogin: true });

  const subjectsContainer = document.getElementById('subjects-container');
  const attemptsContainer = document.getElementById('attempts-container');

  // 1. Fetch & Render Subjects
  try {
    const res = await fetch('/api/subjects');
    const subjects = await res.json();

    if (!Array.isArray(subjects) || subjects.length === 0) {
      subjectsContainer.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center;">No subjects found.</div>';
      return;
    }

    subjectsContainer.innerHTML = '';
    subjects.forEach((subj) => {
      const card = document.createElement('div');
      card.className = 'subject-card';
      card.innerHTML = `
        <div>
          <div class="subject-header">
            <h3 class="subject-title">${escapeHtml(subj.name)}</h3>
            <span class="logo-tag">10 Questions</span>
          </div>
          <p class="subject-desc">${escapeHtml(subj.description)}</p>
        </div>
        <div>
          <a href="/quiz?subject=${encodeURIComponent(subj.slug)}&count=10" class="btn btn-primary btn-block">
            Start Quiz &rarr;
          </a>
        </div>
      `;
      subjectsContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load subjects:', err);
    subjectsContainer.innerHTML = '<div class="card" style="grid-column: 1/-1; text-align: center; color: #dc2626;">Could not load subjects. Please check server connection.</div>';
  }

  // 2. Fetch & Render Recent Attempts
  try {
    const res = await fetch('/api/attempts/recent');
    const attempts = await res.json();

    if (!Array.isArray(attempts) || attempts.length === 0) {
      attemptsContainer.innerHTML = `
        <div class="card" style="text-align: center; color: #64748b; padding: 20px;">
          No practice history yet. Choose any subject above to take your first quiz!
        </div>
      `;
      return;
    }

    attemptsContainer.innerHTML = '';
    attempts.forEach(item => {
      const percentage = Math.round((item.score / item.total) * 100);
      const dateStr = new Date(item.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const row = document.createElement('div');
      row.className = 'attempt-row';
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(item.subject_name)}</strong>
          <span style="font-size: 13px; color: var(--text-muted); margin-left: 10px;">${dateStr}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-weight: 700; color: #2563eb;">${item.score} / ${item.total}</span>
          <span class="logo-tag">${percentage}%</span>
        </div>
      `;
      attemptsContainer.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load attempts:', err);
    attemptsContainer.innerHTML = '<div style="color: #64748b; padding: 12px;">Could not load practice history.</div>';
  }
});
