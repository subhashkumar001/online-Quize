// Navigation & Auth Helper for Practice Corner
// Runs on every page to update top-right user state and handle logout

async function initAuthNav(options = {}) {
  const { requireLogin = false, redirectIfLoggedIn = false } = options;

  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();

    const userNavContainer = document.getElementById('user-nav-container');

    if (data.loggedIn && data.user) {
      // If user is already logged in and tries to access /login or /signup, go to /subjects
      if (redirectIfLoggedIn) {
        window.location.href = '/subjects';
        return;
      }

      // Render logged in state in top-right
      if (userNavContainer) {
        userNavContainer.innerHTML = `
          <div class="user-greeting">Hi, <strong>${escapeHtml(data.user.firstName)}</strong></div>
          <button id="logout-btn" class="btn btn-secondary" style="font-size: 18px; padding: 5px 16px;">
            Sign out
          </button>
        `;

        document.getElementById('logout-btn').addEventListener('click', handleLogout);
      }
    } else {
      // Not logged in
      if (requireLogin) {
        // Protected page -> redirect to login
        window.location.href = '/login';
        return;
      }

      // Render logged out state
      if (userNavContainer) {
        userNavContainer.innerHTML = `
          <a href="/login" class="btn btn-primary" style="font-size: 19px; padding: 6px 18px;">
            Sign in
          </a>
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

// Small helper to prevent XSS in rendered student names
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

