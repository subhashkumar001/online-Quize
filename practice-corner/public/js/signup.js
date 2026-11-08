// Practice Corner - Sign Up Logic
document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect to subjects
  initAuthNav({ redirectIfLoggedIn: true });

  const form = document.getElementById('signup-form');
  const alertBox = document.getElementById('alert-box');
  const submitBtn = document.getElementById('submit-btn');

  const fields = {
    name: document.getElementById('name'),
    mobile: document.getElementById('mobile'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirm-password'),
  };

  const errorEls = {
    name: document.getElementById('name-error'),
    mobile: document.getElementById('mobile-error'),
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error'),
    confirmPassword: document.getElementById('confirmPassword-error'),
  };

  function setInlineError(field, message) {
    if (errorEls[field]) {
      if (message) {
        errorEls[field].textContent = message;
        errorEls[field].classList.add('visible');
        fields[field].style.borderColor = '#a82424';
      } else {
        errorEls[field].textContent = '';
        errorEls[field].classList.remove('visible');
        fields[field].style.borderColor = '';
      }
    }
  }

  function clearAllErrors() {
    alertBox.classList.remove('visible');
    alertBox.textContent = '';
    Object.keys(fields).forEach(f => setInlineError(f, ''));
  }

  // Real-time friendly validation rules
  function validateField(fieldName) {
    const val = fields[fieldName].value.trim();

    if (fieldName === 'name') {
      if (!val || val.length < 2) {
        setInlineError('name', 'Please enter your full name (at least 2 letters).');
        return false;
      }
      setInlineError('name', '');
      return true;
    }

    if (fieldName === 'mobile') {
      const clean = val.replace(/\D/g, '');
      if (clean.length !== 10) {
        setInlineError('mobile', 'Please enter a valid 10-digit mobile number.');
        return false;
      }
      setInlineError('mobile', '');
      return true;
    }

    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val || !emailRegex.test(val.toLowerCase())) {
        setInlineError('email', 'Please enter a valid email address (e.g. name@domain.com).');
        return false;
      }
      setInlineError('email', '');
      return true;
    }

    if (fieldName === 'password') {
      if (!val || val.length < 6) {
        setInlineError('password', 'Password needs at least 6 characters.');
        return false;
      }
      setInlineError('password', '');
      return true;
    }

    if (fieldName === 'confirmPassword') {
      const pwdVal = fields.password.value;
      if (val !== pwdVal) {
        setInlineError('confirmPassword', 'Passwords do not match.');
        return false;
      }
      setInlineError('confirmPassword', '');
      return true;
    }

    return true;
  }

  // Attach blur / input listeners
  Object.keys(fields).forEach(f => {
    fields[f].addEventListener('blur', () => validateField(f));
    fields[f].addEventListener('input', () => {
      // Clear error as user types
      if (errorEls[f].classList.contains('visible')) {
        validateField(f);
      }
    });
  });

  // Handle Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAllErrors();

    // Check all fields
    let isValid = true;
    Object.keys(fields).forEach(f => {
      const valid = validateField(f);
      if (!valid) isValid = false;
    });

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    const payload = {
      name: fields.name.value.trim(),
      mobile: fields.mobile.value.trim(),
      email: fields.email.value.trim(),
      password: fields.password.value,
      confirmPassword: fields.confirmPassword.value,
    };

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (parseErr) {
        // Response was not JSON (e.g. HTML 404/500 from hosting provider)
      }

      if (!res.ok) {
        if (data && data.errors) {
          // Show server-side inline errors
          Object.keys(data.errors).forEach(key => {
            setInlineError(key, data.errors[key]);
          });
        } else if (data && data.error) {
          alertBox.textContent = data.error;
          alertBox.classList.add('visible');
        } else {
          alertBox.textContent = `Server error (${res.status}). Please try again or check settings.`;
          alertBox.classList.add('visible');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign Up →';
        return;
      }

      // Success -> redirect to subjects notice board
      window.location.href = '/subjects';
    } catch (err) {
      console.error('Sign up error:', err);
      alertBox.textContent = 'Could not connect to server. Please check your network connection.';
      alertBox.classList.add('visible');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign Up →';
    }
  });
});

