// Practice Corner - Subjects & Notice Board Logic
document.addEventListener('DOMContentLoaded', async () => {
  // Enforce login
  await initAuthNav({ requireLogin: true });

  const subjectsContainer = document.getElementById('subjects-container');
  const attemptsContainer = document.getElementById('attempts-container');

  const modal = document.getElementById('count-modal');
  const modalSubjectName = document.getElementById('modal-subject-name');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalStartBtn = document.getElementById('modal-start-btn');
  const countPills = document.querySelectorAll('.count-pill');

  let activeSubjectSlug = null;
  let selectedCount = 10;

  // 1. Fetch & Render Subjects
  try {
    const res = await fetch('/api/subjects');
    const subjects = await res.json();

    if (!Array.isArray(subjects) || subjects.length === 0) {
      subjectsContainer.innerHTML = '<p style="text-align:center;">No subjects found. Please run seed.js.</p>';
      return;
    }

    subjectsContainer.innerHTML = '';
    subjects.forEach((subj) => {
      const tile = document.createElement('div');
      tile.className = 'subject-tile';
      tile.style.backgroundColor = subj.color;
      tile.setAttribute('role', 'button');
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('aria-label', `Practice ${subj.name}`);

      tile.innerHTML = `
        <div>
          <div class="subject-header">
            <h2 class="subject-title">${escapeHtml(subj.name)}</h2>
            <div class="subject-icon">${subj.icon_svg}</div>
          </div>
          <p class="subject-desc">${escapeHtml(subj.description)}</p>
        </div>
        <div class="subject-action">
          <span>Start Practicing</span>
          <span style="font-size: 20px;">&rarr;</span>
        </div>
      `;

      // Click to open count picker modal
      const openModal = () => {
        activeSubjectSlug = subj.slug;
        modalSubjectName.textContent = subj.name;
        modal.classList.add('open');
      };

      tile.addEventListener('click', openModal);
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      });

      subjectsContainer.appendChild(tile);
    });
  } catch (err) {
    console.error('Failed to load subjects:', err);
    subjectsContainer.innerHTML = '<p style="text-align:center; color:#a82424;">Could not load subjects. Please check if the server is running.</p>';
  }

  // 2. Count Picker Modal Handlers
  countPills.forEach(pill => {
    pill.addEventListener('click', () => {
      countPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedCount = parseInt(pill.dataset.count, 10);
    });
  });

  modalCancelBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  modalStartBtn.addEventListener('click', () => {
    if (activeSubjectSlug) {
      window.location.href = `/quiz?subject=${encodeURIComponent(activeSubjectSlug)}&count=${selectedCount}`;
    }
  });

  // 3. Fetch & Render Last 5 Attempts
  try {
    const res = await fetch('/api/attempts/recent');
    const attempts = await res.json();

    if (!Array.isArray(attempts) || attempts.length === 0) {
      attemptsContainer.innerHTML = `
        <div class="paper-card" style="text-align: center; padding: 24px; transform: rotate(-0.5deg);">
          <p style="font-family: var(--font-hand); font-size: 22px; color: var(--ink);">
            No practice logs recorded yet!
          </p>
          <p style="font-size: 15px; color: var(--ink-muted); margin-top: 4px;">
            Pick any subject note above to start your very first practice session.
          </p>
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
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const row = document.createElement('div');
      row.className = 'attempt-row';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px;">
          <span class="logo-tag" style="background: ${item.subject_color}; font-size: 16px;">
            ${escapeHtml(item.subject_name)}
          </span>
          <span style="font-size: 14px; color: var(--ink-muted);">${dateStr}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="font-family: var(--font-hand); font-size: 24px; font-weight: bold; color: var(--c-english);">
            ${item.score} / ${item.total}
          </span>
          <span style="font-family: var(--font-hand); font-size: 19px; background: var(--bg-paper); border: 2px solid var(--ink); border-radius: var(--radius-tag); padding: 2px 10px;">
            ${percentage}%
          </span>
        </div>
      `;
      attemptsContainer.appendChild(row);
    });
  } catch (err) {
    console.error('Failed to load recent attempts:', err);
    attemptsContainer.innerHTML = '<p style="text-align: center; color: var(--ink-muted);">Could not fetch study history.</p>';
  }
});

