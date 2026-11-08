// Database Seed Script for Practice Corner
// Inserts 6 subjects and 300 verified college/school level questions (50 per subject)
const db = require('./db');

const mathsQuestions = require('./data/maths');
const physicsQuestions = require('./data/physics');
const chemistryQuestions = require('./data/chemistry');
const gkQuestions = require('./data/gk');
const englishQuestions = require('./data/english');
const computersQuestions = require('./data/computers');

console.log('--- Seeding Practice Corner Database ---');

// Hand-drawn wobbly style inline SVGs (with slight wobble and natural strokes)
const SUBJECTS = [
  {
    name: 'Maths',
    slug: 'maths',
    color: '#dbeafe', // Professional Slate Blue
    description: 'Calculus, Linear Algebra, Matrices & Complex Numbers',
    icon_svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- Wobbly Integral sign and square root -->
      <path d="M22 14c3-4 7-3 6 4l-4 30c-1 7 3 9 7 4" />
      <path d="M34 38l5 6 12-16" />
      <path d="M30 26h18" />
      <path d="M12 48l4-2 3 5" />
    </svg>`
  },
  {
    name: 'Physics',
    slug: 'physics',
    color: '#ede9fe', // Professional Royal Violet
    description: 'Mechanics, Thermodynamics, Optics & Fields',
    icon_svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- Wobbly Atom orbits and nucleus -->
      <circle cx="32" cy="32" r="4" fill="#1e293b" />
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-30 32 32)" />
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(30 32 32)" />
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(90 32 32)" />
    </svg>`
  },
  {
    name: 'Chemistry',
    slug: 'chemistry',
    color: '#d1fae5', // Professional Emerald Mint
    description: 'Bonding, Thermodynamics, Kinetics & Organic Mechanisms',
    icon_svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- Wobbly Conical Flask with liquid and bubbles -->
      <path d="M28 10h8v10l15 30c1 3-1 6-4 6H17c-3 0-5-3-4-6l15-30V10z" />
      <path d="M20 44c4-2 8 2 12-1s8 2 12-1" />
      <circle cx="28" cy="34" r="2" fill="#1e293b" />
      <circle cx="36" cy="28" r="1.5" fill="#1e293b" />
      <path d="M26 10h12" />
    </svg>`
  },
  {
    name: 'General Knowledge',
    slug: 'general-knowledge',
    color: '#fef3c7', // Professional Warm Amber
    description: 'History, Geography, Polity, Science & World Facts',
    icon_svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- Wobbly Globe on tilted stand -->
      <circle cx="32" cy="28" r="18" />
      <path d="M14 28c3 7 11 11 18 11s15-4 18-11" />
      <path d="M32 10c-6 5-10 11-10 18s4 13 10 18" />
      <path d="M32 10c6 5 10 11 10 18-4 13-10 18" />
      <path d="M32 46v10m-10 0h20" />
    </svg>`
  },
  {
    name: 'English',
    slug: 'english',
    color: '#ffe4e6', // Professional Soft Rose
    description: 'Vocabulary, Grammar, Idioms & Accurate Usage',
    icon_svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- Wobbly Open Notebook with bookmark ribbon -->
      <path d="M12 16c8-3 16 0 20 4 4-4 12-7 20-4v34c-8-3-16 0-20 4-4-4-12-7-20-4V16z" />
      <path d="M32 20v34" />
      <path d="M18 27c4-1 8 0 10 2m-10 6c4-1 8 0 10 2" />
      <path d="M36 27c4-1 8 0 10 2m-10 6c4-1 8 0 10 2" />
    </svg>`
  },
  {
    name: 'Computer Basics',
    slug: 'computer-basics',
    color: '#cffafe', // Professional Cyan Teal
    description: 'Binary, CPU Architecture, Operating Systems & Networks',
    icon_svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <!-- Wobbly Retro Monitor and Terminal prompt -->
      <rect x="12" y="12" width="40" height="30" rx="3" />
      <path d="M22 42l-4 10h28l-4-10" />
      <path d="M20 22l5 5-5 5" />
      <path d="M28 32h10" />
    </svg>`
  }
];

// Seed the database
async function runSeed() {
  await db.init();
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    // Clear old questions and subjects
    await client.query('DELETE FROM attempts');
    await client.query('DELETE FROM questions');
    await client.query('DELETE FROM subjects');

    const questionSets = [
      { slug: 'maths', list: mathsQuestions },
      { slug: 'physics', list: physicsQuestions },
      { slug: 'chemistry', list: chemistryQuestions },
      { slug: 'general-knowledge', list: gkQuestions },
      { slug: 'english', list: englishQuestions },
      { slug: 'computer-basics', list: computersQuestions }
    ];

    let totalQuestionsCount = 0;

    for (const s of SUBJECTS) {
      const res = await client.query(
        'INSERT INTO subjects (name, slug, color, description, icon_svg) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [s.name, s.slug, s.color, s.description, s.icon_svg]
      );
      const subjectId = res.rows[0].id;

      const matchedSet = questionSets.find(q => q.slug === s.slug);
      if (matchedSet && matchedSet.list) {
        for (const q of matchedSet.list) {
          await client.query(
            `INSERT INTO questions (subject_id, question, option_a, option_b, option_c, option_d, correct_option, explanation)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              subjectId,
              q.question,
              q.option_a,
              q.option_b,
              q.option_c,
              q.option_d,
              q.correct_option.toUpperCase(),
              q.explanation || ''
            ]
          );
          totalQuestionsCount++;
        }
        console.log(`✓ Inserted subject "${s.name}" with ${matchedSet.list.length} questions`);
      }
    }

    await client.query('COMMIT');
    console.log(`\nAll done! Total subjects: ${SUBJECTS.length}, Total questions seeded: ${totalQuestionsCount}`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Failed to seed database:', err);
    process.exit(1);
  } finally {
    client.release();
    await db.pool.end();
  }
}

runSeed();

