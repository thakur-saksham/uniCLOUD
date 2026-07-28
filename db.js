/**
 * uniCLOUD - PostgreSQL Database Configuration for Supabase
 */
const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.includes('pooler') ? process.env.DATABASE_URL : 'postgresql://postgres.gjejqgqnlnqbckwzagov:sakshamandshaurya@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function initDB() {
  console.log('Initializing PostgreSQL database...');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id                  SERIAL PRIMARY KEY,
      email               TEXT    NOT NULL UNIQUE,
      password_hash       TEXT    NOT NULL DEFAULT '',
      full_name           TEXT,
      student_id          TEXT,
      branch              TEXT    DEFAULT '',
      semester            INTEGER DEFAULT 1,
      academic_year       TEXT    DEFAULT '',
      phone               TEXT    DEFAULT '',
      profile_picture_url TEXT    DEFAULT '',
      intro_seen          INTEGER DEFAULT 0,
      default_branch      TEXT    DEFAULT '',
      default_semester    INTEGER DEFAULT 1,
      google_id           TEXT    UNIQUE,
      created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS branches (
      id   SERIAL PRIMARY KEY,
      name TEXT    NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id        SERIAL PRIMARY KEY,
      branch_id INTEGER NOT NULL REFERENCES branches(id),
      name      TEXT    NOT NULL,
      semester  INTEGER NOT NULL DEFAULT 1
    );

    -- Postgres uses CREATE UNIQUE INDEX IF NOT EXISTS differently, but this works
    CREATE UNIQUE INDEX IF NOT EXISTS idx_subjects_unique ON subjects(branch_id, name, semester);

    CREATE TABLE IF NOT EXISTS attendance (
      id          SERIAL PRIMARY KEY,
      user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      subject_id  INTEGER NOT NULL REFERENCES subjects(id),
      conducted   INTEGER DEFAULT 0,
      attended    INTEGER DEFAULT 0,
      UNIQUE(user_id, subject_id)
    );

    CREATE TABLE IF NOT EXISTS subject_resources (
      id         SERIAL PRIMARY KEY,
      subject_id INTEGER NOT NULL REFERENCES subjects(id),
      type       TEXT    NOT NULL CHECK(type IN ('syllabus','notes','lab','pyq')),
      name       TEXT    NOT NULL,
      link       TEXT    NOT NULL
    );

    CREATE TABLE IF NOT EXISTS saved_resources (
      id            SERIAL PRIMARY KEY,
      user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      branch        TEXT    NOT NULL DEFAULT '',
      subject       TEXT    NOT NULL DEFAULT '',
      resource_type TEXT    NOT NULL DEFAULT 'pdf',
      name          TEXT    NOT NULL,
      link          TEXT    NOT NULL,
      saved_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      subject    TEXT    DEFAULT '',
      content    TEXT    NOT NULL,
      rating     INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('PostgreSQL Tables ready.');
}

if (require.main === module) {
  initDB().then(() => process.exit(0)).catch(console.error);
}

module.exports = {
  query: (text, params = []) => {
    let count = 1;
    let pgText = text.replace(/\?/g, () => `$${count++}`);
    if (pgText.trim().match(/^INSERT/i) && !pgText.match(/RETURNING/i)) {
      pgText += ' RETURNING id';
    }
    return pool.query(pgText, params);
  },
  pool,
  initDB
};
