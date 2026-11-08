// Practice Corner - Login Logic
document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect to subjects
  initAuthNav({ redirectIfLoggedIn: true });

  const form = document.getElementById('login-form');
  const alertBox = document.getElementById('alert-box');
  const submitBtn = document.getElementById('submit-btn');

  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');
  const identifierError = document.getElementById('identifier-error');
  const passwordError = document.getElementById('password-error');

  function clearErrors() {
    alertBox.classList.remove('visible');
    alertBox.textContent = '';
    identifierError.classList.remove('visible');
    identifierError.textContent = '';
    passwordError.classList.remove('visible');
    passwordError.textContent = '';
    identifierInput.style.borderColor = '';
    passwordInput.style.borderColor = '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const identifier = identifierInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;
    if (!identifier) {
      identifierError.textContent = 'Please enter your email or 10-digit mobile number.';
      identifierError.classList.add('visible');
      identifierInput.style.borderColor = '#a82424';
      hasError = true;
    }

    if (!password) {
      passwordError.textContent = 'Please enter your password.';
      passwordError.classList.add('visible');
      passwordInput.style.borderColor = '#a82424';
      hasError = true;
    }

    if (hasError) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (parseErr) {
        // Non-JSON response
      }

      if (!res.ok) {
        alertBox.textContent = (data && data.error) || `Sign in failed (${res.status}). Please verify your credentials.`;
        alertBox.classList.add('visible');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In →';
        return;
      }

      // Success -> navigate to subjects
      window.location.href = '/subjects';
    } catch (err) {
      console.error('Login error:', err);
      alertBox.textContent = 'Could not reach server. Please check your internet connection.';
      alertBox.classList.add('visible');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In →';
    }
  });
});

