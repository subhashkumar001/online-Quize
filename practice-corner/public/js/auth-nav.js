// Navigation & Auth Helper for Practice Corner

// 1. Theme Setup (Dark / Light)
function initTheme() {
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = saved || (systemDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', current);

  // Attach toggle button to header
  const headerContent = document.querySelector('.header-content');
  if (headerContent && !document.getElementById('theme-toggle-btn')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle theme');
    toggleBtn.textContent = current === 'dark' ? '☀️ Light' : '🌙 Dark';

    toggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme');
      const next = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      toggleBtn.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
    });

    const userNav = document.getElementById('user-nav-container');
    if (userNav) {
      userNav.parentNode.insertBefore(toggleBtn, userNav);
    } else {
      headerContent.appendChild(toggleBtn);
    }
  }
}

initTheme();
document.addEventListener('DOMContentLoaded', initTheme);

// 2. Navigation & User Authentication
async function initAuthNav(options = {}) {
  const { requireLogin = false, redirectIfLoggedIn = false } = options;

  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();

    const userNavContainer = document.getElementById('user-nav-container');

    if (data.loggedIn && data.user) {
      if (redirectIfLoggedIn) {
        window.location.href = '/subjects';
        return;
      }

      if (userNavContainer) {
        userNavContainer.innerHTML = `
          <div class="user-greeting">Hi, <strong>${escapeHtml(data.user.firstName || data.user.name)}</strong></div>
          <button type="button" id="logout-btn" class="btn btn-secondary" style="padding: 6px 14px; font-size: 14px;">
            Sign out
          </button>
        `;
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
      }
    } else {
      if (requireLogin) {
        window.location.href = '/login';
        return;
      }

      if (userNavContainer) {
        userNavContainer.innerHTML = `
          <a href="/login" class="btn btn-secondary" style="padding: 6px 14px; font-size: 14px;">Sign in</a>
          <a href="/signup" class="btn btn-primary" style="padding: 6px 14px; font-size: 14px;">Sign up</a>
        `;
      }
    }

    return data;
  } catch (err) {
    console.error('Failed to check auth state:', err);
    if (requireLogin) {
      window.location.href = '/login';
    }
  }
}

async function handleLogout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  } catch (err) {
    console.error('Logout failed:', err);
    window.location.href = '/login';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
