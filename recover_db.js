const Database = require('better-sqlite3');
const path = require('path');

try {
  const db = new Database(path.join(__dirname, 'unicloud_recovered.db'));
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL DEFAULT '',
      full_name TEXT,
      student_id TEXT,
      branch TEXT DEFAULT '',
      semester INTEGER DEFAULT 1,
      academic_year TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      profile_picture_url TEXT DEFAULT '',
      intro_seen INTEGER DEFAULT 0,
      default_branch TEXT DEFAULT '',
      default_semester INTEGER DEFAULT 1,
      google_id TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS branches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      branch_id INTEGER NOT NULL REFERENCES branches(id),
      name TEXT NOT NULL,
      semester INTEGER NOT NULL DEFAULT 1
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_subjects_unique ON subjects(branch_id, name, semester);
    CREATE TABLE IF NOT EXISTS subject_resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL REFERENCES subjects(id),
      type TEXT NOT NULL CHECK(type IN ('syllabus','notes','lab','pyq')),
      name TEXT NOT NULL,
      link TEXT NOT NULL
    );
  `);

  console.log('DB created with schema.');

  // Check if WAL had any data
  const branches = db.prepare('SELECT * FROM branches').all();
  console.log('Branches:', branches.length, JSON.stringify(branches));

  const subjects = db.prepare('SELECT * FROM subjects').all();
  console.log('Subjects:', subjects.length);

  const resources = db.prepare('SELECT * FROM subject_resources').all();
  console.log('Resources:', resources.length);
  if (resources.length > 0) {
    console.log('RESOURCE DATA:');
    console.log(JSON.stringify(resources, null, 2));
  }

  db.close();
} catch (e) {
  console.error('Error:', e.message);
}
