require('dotenv').config();
const db = require('./db');
const bcrypt = require('bcryptjs');

async function testSignup() {
  try {
    const cleanEmail = 'student1@example.com';
    const cleanMobile = '9876543210';
    const name = 'Student One';
    const password = 'password123';

    console.log('1. Checking existing email...');
    const existingEmail = await db.query('SELECT id FROM users WHERE email = $1', [cleanEmail]);
    console.log('Existing email count:', existingEmail.rows.length);

    console.log('2. Checking existing mobile...');
    const existingMobile = await db.query('SELECT id FROM users WHERE mobile = $1', [cleanMobile]);
    console.log('Existing mobile count:', existingMobile.rows.length);

    console.log('3. Hashing password...');
    const passwordHash = await bcrypt.hash(password, 10);

    console.log('4. Inserting user...');
    const result = await db.query(
      'INSERT INTO users (name, mobile, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id',
      [name.trim(), cleanMobile, cleanEmail, passwordHash]
    );
    console.log('Inserted user ID:', result.rows[0].id);
    console.log('SIGNUP WORKS PERFECTLY!');
  } catch (err) {
    console.error('SIGNUP FAILED:', err);
  } finally {
    await db.pool.end();
  }
}

testSignup();

