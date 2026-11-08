# Practice Corner 📝

A handmade, quiet quiz website designed for school and college students. 

Created with a deliberate **"student notebook / notice board"** aesthetic:
- **Background**: gray black (`#222222`).
- **Ink color**: Dark brown-grey (`#3b2f2f`), never pure black.
- **Typography**: Hand-lettered headings (*Patrick Hand* & *Caveat*) paired with readable body text (*Nunito*).
- **Hand-drawn details**: Wobbly border curves (`border-radius: 255px 15px 225px 15px/15px 225px 15px 255px`), 2px dark outlines, soft offset shadows, and cards tilted at slight natural angles (-1.5° to 1.5°).
- **Animations**: Paper-flip question reveals, staggered option entrances, self-drawing SVG ticks (`stroke-dashoffset`), and gentle feedback without flashy confetti or neon blobs.

---

## Tech Stack

- **Frontend**: Plain HTML5, CSS3, and vanilla JavaScript (no React, no Tailwind, no UI component libraries).
- **Backend**: Node.js + Express.
- **Database**: SQLite (`better-sqlite3`).
- **Security**: Passwords hashed with `bcryptjs`, sessions maintained securely with HTTP-only cookies (`jsonwebtoken`).

---

## Quick Start (How to Run)

### Option 1: Double-Click Launcher (Windows)
Double-click [`start-quiz.bat`](file:///c:/Users/hp/OneDrive/Desktop/portfolio/start-quiz.bat) located in the main folder, or [`run.bat`](file:///c:/Users/hp/OneDrive/Desktop/portfolio/practice-corner/run.bat) inside `practice-corner`.

---

### Option 2: Using the Terminal

1. Open your terminal and navigate to the `practice-corner` directory:
   ```bash
   cd practice-corner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database with all 300 curated questions (50 per subject):
   ```bash
   node seed.js
   ```

4. Start the server:
   ```bash
   npm run dev
   # or: npm start / node server.js
   ```

5. Open your web browser at:
   ```text
   http://localhost:4000
   ```

---

## Features & Pages

1. **Sign Up (`/signup`)**:
   - Fields: Full Name, 10-digit Mobile Number, Email, Password, Confirm Password.
   - Real-time client validation and server-side verification with friendly inline messages (e.g. *"Password needs at least 6 characters"*, *"Mobile number must be exactly 10 digits"*).
   - Enforces unique email and unique mobile number.

2. **Login (`/login`)**:
   - Students can sign in using **either their email address or their 10-digit mobile number** + password.

3. **Global Header**:
   - Displays a clean **"Sign in"** button when logged out.
   - Displays the student's first name with a **"Sign out"** button when logged in.

4. **Subjects Dashboard (`/subjects`)**:
   - Clean, professional dashboard subject cards with modern pastel tones and hand-drawn SVG icons:
     - 📐 **Maths** (`#dbeafe` Professional Slate Blue) — Calculus, Linear Algebra, Matrices & Complex Numbers
     - ⚛️ **Physics** (`#ede9fe` Professional Royal Violet) — Mechanics, Thermodynamics, Optics & Fields
     - 🧪 **Chemistry** (`#d1fae5` Professional Emerald Mint) — Bonding, Thermodynamics, Kinetics & Organic
     - 🌍 **General Knowledge** (`#fef3c7` Professional Warm Amber) — History, Polity, Geography & Science
     - 📖 **English** (`#ffe4e6` Professional Soft Rose) — Vocabulary, Grammar, Idioms & Antonyms
     - 💻 **Computer Basics** (`#cffafe` Professional Cyan Teal) — Binary, CPU Architecture, OS & Networking
   - Choose **10, 20, or 50 questions** before starting.
   - Shows the student's **last 5 practice attempts** with score, percentage, and date.

5. **Quiz Engine (`/quiz`)**:
   - One question at a time, exactly 4 shuffled options (A, B, C, D).
   - Randomly drawn from the 50 subject questions in the database.
   - Progress badge (*"Question 7 of 20"*).
   - Next button unlocks only after an option is selected.
   - **Keyboard shortcuts**: Press `1-4` or `A-D` to choose an option, and `Enter` to advance.
   - Selected option gets an animated hand-drawn SVG tick.

6. **Scorecard & Answer Key (`/result`)**:
   - Clear score breakdown (e.g., `17 / 20`, `85%`), with correct & wrong counts.
   - Complete review list displaying every question, what you answered, the correct answer, and an explanatory notebook note.
   - Quick buttons to *"Try again"* or *"Choose another subject"*.

---

## Database Architecture (`practice.db`)

- `users`: `id`, `name`, `mobile`, `email`, `password_hash`, `created_at`
- `subjects`: `id`, `name`, `slug`, `color`, `description`, `icon_svg`
- `questions`: `id`, `subject_id`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_option`, `explanation`
- `attempts`: `id`, `user_id`, `subject_id`, `score`, `total`, `created_at`

