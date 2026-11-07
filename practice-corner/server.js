// Practice Corner - Express Web Server
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'practice-corner-student-secret-2026';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Helper to authenticate JWT token from HTTP-only cookie
function getAuthUser(req) {
  const token = req.cookies.token;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = db.prepare('SELECT id, name, mobile, email FROM users WHERE id = ?').get(payload.id);
    return user || null;
  } catch {
    return null;
  }
}

// Middleware to protect API routes
function requireAuth(req, res, next) {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Please sign in to continue.' });
  }
  req.user = user;
  next();
}

// -----------------------------------------------------------------------------
// AUTHENTICATION ROUTES
// -----------------------------------------------------------------------------

// Sign up
app.post('/api/auth/signup', async (req, res) => {
  const { name, mobile, email, password, confirmPassword } = req.body;

  // Validation
  const errors = {};
  if (!name || name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 letters).';
  }

  const cleanMobile = (mobile || '').trim().replace(/\D/g, '');
  if (!cleanMobile || cleanMobile.length !== 10) {
    errors.mobile = 'Mobile number must be exactly 10 digits.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim().toLowerCase())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password || password.length < 6) {
    errors.password = 'Password needs at least 6 characters.';
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check unique email and mobile
  const existingEmail = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
  if (existingEmail) {
    return res.status(400).json({ errors: { email: 'Oops, that email is already registered. Try logging in.' } });
  }

  const existingMobile = db.prepare('SELECT id FROM users WHERE mobile = ?').get(cleanMobile);
  if (existingMobile) {
    return res.status(400).json({ errors: { mobile: 'This mobile number is already registered.' } });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = db.prepare(`
      INSERT INTO users (name, mobile, email, password_hash)
      VALUES (?, ?, ?, ?)
    `).run(name.trim(), cleanMobile, cleanEmail, passwordHash);

    const userId = result.lastInsertRowid;
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });

    const firstName = name.trim().split(' ')[0];
    return res.json({
      success: true,
      user: { id: userId, name: name.trim(), firstName, email: cleanEmail, mobile: cleanMobile },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Server error during sign up. Please try again.' });
  }
});

// Login (supports either email or 10-digit mobile)
app.post('/api/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Please enter your email/mobile and password.' });
  }

  const cleanIdentifier = identifier.trim().toLowerCase();
  const cleanMobile = identifier.trim().replace(/\D/g, '');

  const user = db.prepare(`
    SELECT * FROM users WHERE email = ? OR (length(?) = 10 AND mobile = ?)
  `).get(cleanIdentifier, cleanMobile, cleanMobile);

  if (!user) {
    return res.status(400).json({ error: 'No account found with this email or mobile number.' });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(400).json({ error: 'Incorrect password. Please try again.' });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
  });

  const firstName = user.name.split(' ')[0];
  return res.json({
    success: true,
    user: { id: user.id, name: user.name, firstName, email: user.email, mobile: user.mobile },
  });
});

// Current user state
app.get('/api/auth/me', (req, res) => {
  const user = getAuthUser(req);
  if (!user) {
    return res.json({ loggedIn: false });
  }
  const firstName = user.name.split(' ')[0];
  return res.json({
    loggedIn: true,
    user: { id: user.id, name: user.name, firstName, email: user.email, mobile: user.mobile },
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// -----------------------------------------------------------------------------
// SUBJECTS & ATTEMPTS ROUTES
// -----------------------------------------------------------------------------

// Get all subjects
app.get('/api/subjects', (req, res) => {
  const subjects = db.prepare('SELECT id, name, slug, color, description, icon_svg FROM subjects ORDER BY id ASC').all();
  res.json(subjects);
});

// Get user's last 5 attempts
app.get('/api/attempts/recent', requireAuth, (req, res) => {
  const attempts = db.prepare(`
    SELECT 
      a.id, 
      a.score, 
      a.total, 
      a.created_at, 
      s.name as subject_name, 
      s.slug as subject_slug, 
      s.color as subject_color
    FROM attempts a
    JOIN subjects s ON a.subject_id = s.id
    WHERE a.user_id = ?
    ORDER BY a.created_at DESC
    LIMIT 5
  `).all(req.user.id);

  res.json(attempts);
});

// -----------------------------------------------------------------------------
// QUIZ SESSION ROUTES
// -----------------------------------------------------------------------------

// Fetch random questions for a subject with shuffled options
app.get('/api/quiz/:slug', requireAuth, (req, res) => {
  const { slug } = req.params;
  const count = parseInt(req.query.count, 10) || 10;
  const validCounts = [10, 20, 50];
  const limit = validCounts.includes(count) ? count : 10;

  const subject = db.prepare('SELECT id, name, slug, color FROM subjects WHERE slug = ?').get(slug);
  if (!subject) {
    return res.status(404).json({ error: 'Subject not found.' });
  }

  // Pick random questions from database
  const rawQuestions = db.prepare(`
    SELECT id, question, option_a, option_b, option_c, option_d
    FROM questions
    WHERE subject_id = ?
    ORDER BY RANDOM()
    LIMIT ?
  `).all(subject.id, limit);

  // Helper to shuffle options while tracking key mappings
  const preparedQuestions = rawQuestions.map((q) => {
    const originalOptions = [
      { originalKey: 'A', text: q.option_a },
      { originalKey: 'B', text: q.option_b },
      { originalKey: 'C', text: q.option_c },
      { originalKey: 'D', text: q.option_d },
    ];

    // Fisher-Yates shuffle
    for (let i = originalOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [originalOptions[i], originalOptions[j]] = [originalOptions[j], originalOptions[i]];
    }

    // Re-assign A, B, C, D to the shuffled options
    const labels = ['A', 'B', 'C', 'D'];
    const shuffledOptions = originalOptions.map((opt, index) => ({
      key: labels[index], // Display key for student
      text: opt.text,
      originalKey: opt.originalKey, // Tracked secretly for grading
    }));

    return {
      id: q.id,
      question: q.question,
      options: shuffledOptions,
    };
  });

  res.json({
    subject: { name: subject.name, slug: subject.slug, color: subject.color },
    total: preparedQuestions.length,
    questions: preparedQuestions,
  });
});

// Submit completed quiz, calculate score, save attempt, and return review
app.post('/api/quiz/submit', requireAuth, (req, res) => {
  const { subjectSlug, answers } = req.body;
  // answers format: [ { questionId: 12, selectedOriginalKey: 'B' }, ... ]

  if (!subjectSlug || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid submission data.' });
  }

  const subject = db.prepare('SELECT id, name, slug, color FROM subjects WHERE slug = ?').get(subjectSlug);
  if (!subject) {
    return res.status(404).json({ error: 'Subject not found.' });
  }

  let score = 0;
  const review = [];

  const getQuestion = db.prepare(`
    SELECT id, question, option_a, option_b, option_c, option_d, correct_option, explanation
    FROM questions
    WHERE id = ?
  `);

  for (const item of answers) {
    const q = getQuestion.get(item.questionId);
    if (!q) continue;

    const isCorrect = item.selectedOriginalKey === q.correct_option;
    if (isCorrect) {
      score++;
    }

    const optionsMap = {
      A: q.option_a,
      B: q.option_b,
      C: q.option_c,
      D: q.option_d,
    };

    review.push({
      questionId: q.id,
      question: q.question,
      options: [
        { key: 'A', text: q.option_a },
        { key: 'B', text: q.option_b },
        { key: 'C', text: q.option_c },
        { key: 'D', text: q.option_d },
      ],
      selectedKey: item.selectedOriginalKey || null,
      selectedText: item.selectedOriginalKey ? optionsMap[item.selectedOriginalKey] : 'Not answered',
      correctKey: q.correct_option,
      correctText: optionsMap[q.correct_option],
      isCorrect,
      explanation: q.explanation || '',
    });
  }

  const total = answers.length;

  // Record attempt in database
  const insertAttempt = db.prepare(`
    INSERT INTO attempts (user_id, subject_id, score, total)
    VALUES (?, ?, ?, ?)
  `);
  insertAttempt.run(req.user.id, subject.id, score, total);

  res.json({
    success: true,
    subject: { name: subject.name, slug: subject.slug, color: subject.color },
    score,
    total,
    percentage: Math.round((score / total) * 100),
    review,
  });
});

// -----------------------------------------------------------------------------
// HTML PAGE ROUTING
// -----------------------------------------------------------------------------
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/subjects', (req, res) => res.sendFile(path.join(__dirname, 'public', 'subjects.html')));
app.get('/quiz', (req, res) => res.sendFile(path.join(__dirname, 'public', 'quiz.html')));
app.get('/result', (req, res) => res.sendFile(path.join(__dirname, 'public', 'result.html')));

// Catch-all
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Start server
app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`  Practice Corner is running!`);
  console.log(`  Open in browser: http://localhost:${PORT}`);
  console.log(`==============================================\n`);
});

