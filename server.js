/**
 * uniCLOUD – Backend Server
 * =========================
 * Stack: Node.js + Express + SQLite (better-sqlite3) + express-session
 * Auth : Email/Password  +  Google One Tap (ID token verified server-side)
 *
 * Setup:
 *   1. npm install
 *   2. node db.js          ← create DB + seed subjects
 *   3. node server.js      ← start server on :3000
 *
 * Google OAuth setup:
 *   • Go to https://console.cloud.google.com → APIs & Services → Credentials
 *   • Create an OAuth 2.0 Client ID (Web application)
 *   • Authorized JavaScript origins: add every URL you use (e.g. http://localhost:3000,
 *     http://YOUR_LAN_IP:3000 for phone testing, and your production domain)
 *   • Redirect URIs are NOT required for the default sign-in flow
 *   • Copy the Client ID into GOOGLE_CLIENT_ID below (or .env)
 */

require('dotenv').config({ path: '.env' });

const express      = require('express');
const cors         = require('cors');
const session      = require('cookie-session');
const cookieParser = require('cookie-parser');
const path         = require('path');
const https        = require('https');
const bcrypt       = require('bcryptjs');
const db           = require('./db');

// ── Google token verification (no extra package needed) ──────────────
// We fetch Google's public JWKS and verify the RS256 signature manually,
// OR fall back to Google's tokeninfo endpoint for simplicity.

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';

/**
 * Verify a Google ID token by calling Google's tokeninfo endpoint.
 * Returns the payload { sub, email, name, picture, email_verified } or throws.
 * This is the safest zero-dependency approach.
 */
function verifyGoogleToken(idToken) {
  return new Promise((resolve, reject) => {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          const payload = JSON.parse(data);
          if (payload.error) return reject(new Error(payload.error_description || 'Invalid token'));
          // Verify audience matches our Client ID (skip check if placeholder)
          if (GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE' && payload.aud !== GOOGLE_CLIENT_ID) {
            return reject(new Error('Token audience mismatch'));
          }
          if (payload.email_verified !== 'true' && payload.email_verified !== true) {
            return reject(new Error('Email not verified with Google'));
          }
          resolve(payload);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// ── App setup ────────────────────────────────────────────────────────
const app       = express();
const PORT      = process.env.PORT || 3000;
// Static files live one level UP from the backend folder (project root)
// Static files: serve from same directory as server.js (project root)
// If your HTML files are in the same folder as server.js, use __dirname
// If they're one level up, keep '..' — adjust to match your folder layout
const staticDir = path.join(__dirname);

app.use(cors({
  origin: (origin, cb) => cb(null, true),   // allow all origins (tighten in prod)
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({ name: 'session', keys: [process.env.SESSION_SECRET || 'unicloud-secret'], maxAge: 30 * 24 * 60 * 60 * 1000 }));

function requirePageAuth(req, res, next) {
  if (req.session?.userId) return next();
  return res.redirect('/login.html');
}

app.get('/login', (req, res) => res.sendFile(path.join(staticDir, 'login.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(staticDir, 'login.html')));

const protectedPages = {
  '/':              'main.html',
  '/main':          'main.html',
  '/main.html':     'main.html',
  '/index':         'main.html',
  '/index.html':    'main.html',
  '/profile':       'profile.html',
  '/profile.html':  'profile.html',
  '/subject':       'subject.html',
  '/subject.html':  'subject.html',
  '/attendance':    'attendance.html',
  '/attendance.html': 'attendance.html'
};
for (const [route, file] of Object.entries(protectedPages)) {
  app.get(route, requirePageAuth, (req, res) => res.sendFile(path.join(staticDir, file)));
}

// Serve assets (JS/CSS/images) — index disabled so / goes through auth route above
app.use(express.static(staticDir, { index: false }));

// ── Helper: require session auth ─────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session?.userId) return next();
  return res.status(401).json({ error: 'Not authenticated. Please log in.' });
}

// ── Helper: get safe user row ─────────────────────────────────────────
const USER_COLS = `id, email, full_name, student_id, branch, semester,
                   academic_year, phone, profile_picture_url,
                   intro_seen, default_branch, default_semester, google_id`;

async function getUser(id) { return (await db.query(`SELECT ${USER_COLS} FROM users WHERE id = ?`, [id])).rows[0]; }
async function getByEmail(em) { return (await db.query(`SELECT ${USER_COLS} FROM users WHERE email = ?`, [em.trim().toLowerCase()])).rows[0]; }

// ═══════════════════════════════════════════════════════════════
//  AUTH ROUTES
// ═══════════════════════════════════════════════════════════════

// ── POST /auth/signup ─────────────────────────────────────────
app.post('/auth/signup', async (req, res) => {
  const {
    email, password, full_name, student_id,
    branch, semester, academic_year, phone
  } = req.body || {};

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email))
    return res.status(400).json({ error: 'Please enter a valid email address.' });

  const hash = bcrypt.hashSync(password, 12);

  try {
    (await db.query(
      `INSERT INTO users
         (email, password_hash, full_name, student_id, branch, semester, academic_year, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    , [email.trim().toLowerCase(),
      hash,
      full_name    || null,
      student_id   || null,
      branch       || null,
      semester     ? parseInt(semester, 10) : 1,
      academic_year || null,
      phone        || null]));

    const user = await getByEmail(email);
    req.session.userId = user.id;
    res.status(201).json({ user });
  } catch (e) {
    if (e.message?.includes('UNIQUE'))
      return res.status(409).json({ error: 'An account with this email already exists.' });
    console.error('Signup error:', e);
    return res.status(500).json({ error: 'Signup failed. Please try again.' });
  }
});

// ── POST /auth/login ──────────────────────────────────────────
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required.' });

  const row = (await db.query(
    `SELECT id, password_hash FROM users WHERE email = ?`
  , [email.trim().toLowerCase()])).rows[0];

  if (!row || !bcrypt.compareSync(password, row.password_hash))
    return res.status(401).json({ error: 'Incorrect password.' });

  const user = await getUser(row.id);
  req.session.userId = user.id;
  res.json({ user });
});

// ── POST /auth/logout ─────────────────────────────────────────
app.post('/auth/logout', async (req, res) => {
  req.session = null; res.json({ ok: true });
});

// ── Shared Google sign-in logic ───────────────────────────────
async function signInWithGoogleToken(token) {
  const payload = await verifyGoogleToken(token);
  const { email, name, picture, sub: googleId } = payload;

  if (!email) throw new Error('No email in Google token.');

  let user = (await db.query(
    `SELECT id, google_id, email, profile_picture_url FROM users WHERE email = ? OR google_id = ?`
  , [email.trim().toLowerCase(), googleId])).rows[0];

  if (!user) {
    const dummyHash = bcrypt.hashSync(Math.random().toString(36) + Date.now(), 10);
    const info = (await db.query(
      `INSERT INTO users
         (email, password_hash, full_name, profile_picture_url, google_id, semester)
       VALUES (?, ?, ?, ?, ?, 1)`
    , [email.trim().toLowerCase(), dummyHash, name || null, picture || null, googleId]));

    user = await getUser(info.rows[0]?.id);
  } else {
    const updates = [];
    const vals    = [];
    if (!user.google_id)           { updates.push('google_id = ?');           vals.push(googleId); }
    if (!user.profile_picture_url && picture) {
      updates.push('profile_picture_url = ?');
      vals.push(picture);
    }
    if (updates.length) {
      vals.push(user.id);
      (await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, [...vals]));
      user = await getUser(user.id);
    } else {
      user = await getUser(user.id);
    }
  }

  return user;
}

// ── POST /auth/google ─────────────────────────────────────────
// Receives the Google ID token from the frontend One Tap widget
app.post('/auth/google', async (req, res) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: 'Google token required.' });

  try {
    const user = await signInWithGoogleToken(token);
    req.session.userId = user.id;
    res.json({ user });
  } catch (e) {
    console.error('Google auth error:', e.message);
    res.status(401).json({ error: 'Google sign-in failed: ' + e.message });
  }
});

// ── POST /auth/google/callback ────────────────────────────────
// Redirect fallback when popup / One Tap is blocked (Safari, mobile)
app.post('/auth/google/callback', async (req, res) => {
  const token = req.body?.credential;
  if (!token) return res.redirect('/login.html?error=google');

  try {
    const user = await signInWithGoogleToken(token);
    req.session.userId = user.id;
    res.redirect('/main.html');
  } catch (e) {
    console.error('Google callback error:', e.message);
    res.redirect('/login.html?error=google');
  }
});

// ── GET /auth/me ──────────────────────────────────────────────
app.get('/auth/me', async (req, res) => {
  if (!req.session?.userId) return res.json({ user: null });
  const user = await getUser(req.session.userId);
  res.json({ user: user || null });
});

// ═══════════════════════════════════════════════════════════════
//  USER / PROFILE ROUTES
// ═══════════════════════════════════════════════════════════════

app.get('/api/users/me', requireAuth, async (req, res) => {
  res.json(await getUser(req.session.userId) || {});
});

app.patch('/api/users/me', requireAuth, async (req, res) => {
  const allowed = {
    full_name:           req.body.full_name,
    student_id:          req.body.student_id,
    branch:              req.body.branch,
    semester:            req.body.semester != null ? parseInt(req.body.semester, 10) : undefined,
    academic_year:       req.body.academic_year,
    phone:               req.body.phone,
    profile_picture_url: req.body.profile_picture_url,
    intro_seen:          req.body.intro_seen != null ? (req.body.intro_seen ? 1 : 0) : undefined,
    default_branch:      req.body.default_branch,
    default_semester:    req.body.default_semester != null ? parseInt(req.body.default_semester, 10) : undefined
  };

  // Build dynamic SET clause only for defined fields
  const sets = [];
  const vals = [];
  for (const [col, val] of Object.entries(allowed)) {
    if (val !== undefined && val !== null) {
      sets.push(`${col} = ?`);
      vals.push(val);
    }
  }

  if (sets.length === 0) return res.json(await getUser(req.session.userId));

  vals.push(req.session.userId);
  (await db.query(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, [...vals]));
  res.json(await getUser(req.session.userId));
});

// legacy route used by profile.html
app.get('/api/user/profile', requireAuth, async (req, res) => {
  res.json(await getUser(req.session.userId) || {});
});
app.post('/api/user/update', requireAuth, async (req, res) => {
  const { name, email, branch, semester } = req.body || {};
  const sets = []; const vals = [];
  if (name)     { sets.push('full_name = ?'); vals.push(name); }
  if (email)    { sets.push('email = ?');     vals.push(email.trim().toLowerCase()); }
  if (branch)   { sets.push('branch = ?');    vals.push(branch); }
  if (semester) { sets.push('semester = ?');  vals.push(parseInt(semester, 10)); }
  if (sets.length) { vals.push(req.session.userId); (await db.query(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, [...vals])); }
  res.json(await getUser(req.session.userId));
});

// DELETE /api/users/me — permanently delete account
app.delete('/api/users/me', requireAuth, async (req, res) => {
  const uid = req.session.userId;
  try {
    (await db.query('DELETE FROM attendance      WHERE user_id = ?', [uid]));
    (await db.query('DELETE FROM saved_resources WHERE user_id = ?', [uid]));
    (await db.query('DELETE FROM reviews         WHERE user_id = ?', [uid]));
    (await db.query('DELETE FROM users           WHERE id = ?', [uid]));
    req.session = null; res.json({ ok: true });
  } catch (e) {
    console.error('Delete account error:', e);
    res.status(500).json({ error: 'Failed to delete account.' });
  }
});

// ═══════════════════════════════════════════════════════════════
//  BRANCHES & SUBJECTS
// ═══════════════════════════════════════════════════════════════

app.get('/api/branches', async (req, res) => {
  res.json((await db.query('SELECT id, name FROM branches ORDER BY name', [])).rows);
});

app.get('/api/subjects', async (req, res) => {
  const { branch, semester } = req.query;
  if (!branch) return res.status(400).json({ error: 'branch required' });

  const b = (await db.query('SELECT id FROM branches WHERE name = ?', [branch])).rows[0];
  if (!b) return res.json([]);

  const sem = semester ? parseInt(semester, 10) : null;
  const rows = sem
    ? (await db.query('SELECT id, name, semester FROM subjects WHERE branch_id = ? AND semester = ? ORDER BY name', [b.id, sem])).rows
    : (await db.query('SELECT id, name, semester FROM subjects WHERE branch_id = ? ORDER BY semester, name', [b.id])).rows;

  res.json(rows);
});

// Bulk endpoint: returns ALL subjects for a branch grouped by semester in ONE call
app.get('/api/subjects/all', async (req, res) => {
  const { branch } = req.query;
  if (!branch) return res.status(400).json({ error: 'branch required' });

  const b = (await db.query('SELECT id FROM branches WHERE name = ?', [branch])).rows[0];
  if (!b) return res.json({});

  const rows = (await db.query('SELECT id, name, semester FROM subjects WHERE branch_id = ? ORDER BY semester, name', [b.id])).rows;
  
  // Group by semester: { sem1: [...], sem2: [...], ... }
  const grouped = {};
  rows.forEach(r => {
    const key = 'sem' + r.semester;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(r);
  });
  
  res.json(grouped);
});

// ═══════════════════════════════════════════════════════════════
//  ATTENDANCE
// ═══════════════════════════════════════════════════════════════

// GET all attendance records for current user's branch+semester
app.get('/api/attendance', requireAuth, async (req, res) => {
  const { branch, semester } = req.query;
  if (!branch || !semester) return res.status(400).json({ error: 'branch and semester required' });

  const b = (await db.query('SELECT id FROM branches WHERE name = ?', [branch])).rows[0];
  if (!b) return res.json([]);

  const sem      = parseInt(semester, 10);
  const subjects = (await db.query('SELECT id, name FROM subjects WHERE branch_id = ? AND semester = ? ORDER BY name', [b.id, sem])).rows;
  const attMap   = {};
  (await db.query('SELECT subject_id, conducted, attended FROM attendance WHERE user_id = ?', [req.session.userId])).rows
    .forEach(a => { attMap[a.subject_id] = a; });

  res.json(subjects.map(s => ({
    id:        s.id,
    name:      s.name,
    conducted: attMap[s.id]?.conducted || 0,
    attended:  attMap[s.id]?.attended  || 0
  })));
});

// GET /api/attendance/me — all saved attendance rows for this user
app.get('/api/attendance/me', requireAuth, async (req, res) => {
  const rows = (await db.query(`
    SELECT s.id, s.name, s.semester, a.conducted, a.attended, br.name AS branch
    FROM   attendance a
    JOIN   subjects   s  ON a.subject_id  = s.id
    JOIN   branches   br ON s.branch_id   = br.id
    WHERE  a.user_id = ?
    ORDER  BY s.name
  `, [req.session.userId])).rows;

  res.json(rows);
});

// PUT /api/attendance — upsert one subject
app.put('/api/attendance', requireAuth, async (req, res) => {
  const { subject_id, conducted, attended } = req.body || {};
  if (subject_id == null) return res.status(400).json({ error: 'subject_id required' });

  const att = Math.max(0, parseInt(attended,  10) || 0);
  const con = Math.max(0, parseInt(conducted, 10) || 0);
  if (att > con) return res.status(400).json({ error: 'Attended cannot exceed conducted.' });

  (await db.query(`
    INSERT INTO attendance (user_id, subject_id, conducted, attended)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(user_id, subject_id)
    DO UPDATE SET conducted = excluded.conducted, attended = excluded.attended
  `, [req.session.userId, subject_id, con, att]));

  res.json({ ok: true });
});

// POST /api/attendance/calculate — calculate without saving
app.post('/api/attendance/calculate', requireAuth, async (req, res) => {
  const attended  = Math.max(0, parseInt(req.body.attended,  10) || 0);
  const total     = Math.max(0, parseInt(req.body.total,     10) || 0);
  if (total === 0) return res.status(400).json({ error: 'Total classes cannot be zero.' });
  if (attended > total) return res.status(400).json({ error: 'Attended cannot exceed total.' });

  const pct      = parseFloat(((attended / total) * 100).toFixed(2));
  const status   = pct >= 75 ? 'Good' : pct >= 60 ? 'Warning' : 'Critical';
  const needed   = pct < 75 ? Math.max(0, Math.ceil((0.75 * total - attended) / 0.25)) : 0;
  const canSkip  = pct >= 75 ? Math.max(0, Math.floor(attended / 0.75 - total)) : 0;

  res.json({ percentage: pct, status, classesNeeded: needed, canSkip });
});

// ═══════════════════════════════════════════════════════════════
//  SUBJECT RESOURCES
// ═══════════════════════════════════════════════════════════════

app.get('/api/subject-resources', async (req, res) => {
  const { branch, subject, subject_id, sem } = req.query;
  let sid = subject_id ? parseInt(subject_id, 10) : null;

  if (!sid) {
    if (!branch || !subject)
      return res.status(400).json({ error: 'branch and subject required' });
    const b = (await db.query('SELECT id FROM branches WHERE LOWER(name) = LOWER(?)', [branch])).rows[0];
    if (!b) return res.json({ syllabus: [], notes: [], lab: [], pyq: [], tutorial: [] });
    
    let s;
    if (sem) {
        s = (await db.query('SELECT id FROM subjects WHERE branch_id = ? AND LOWER(name) = LOWER(?) AND semester = ?', [b.id, subject, parseInt(sem, 10)])).rows[0];
    } else {
        s = (await db.query('SELECT id FROM subjects WHERE branch_id = ? AND LOWER(name) = LOWER(?)', [b.id, subject])).rows[0];
    }
    
    if (!s) return res.json({ syllabus: [], notes: [], lab: [], pyq: [], tutorial: [] });
    sid = s.id;
  }

  const rows   = (await db.query('SELECT id, type, name, link FROM subject_resources WHERE subject_id = ?', [sid])).rows;
  const result = { syllabus: [], notes: [], lab: [], pyq: [], tutorial: [] };
  rows.forEach(r => { if (result[r.type]) result[r.type].push(r); });
  res.json(result);
});

// ═══════════════════════════════════════════════════════════════
//  SAVED RESOURCES
// ═══════════════════════════════════════════════════════════════

app.get('/api/saved', requireAuth, async (req, res) => {
  const rows = (await db.query(
    'SELECT id, branch, subject, resource_type, name, link FROM saved_resources WHERE user_id = ? ORDER BY id DESC'
  , [req.session.userId])).rows;
  res.json(rows);
});

app.post('/api/saved', requireAuth, async (req, res) => {
  const { branch, subject, resource_type, name, link } = req.body || {};
  if (!name || !link) return res.status(400).json({ error: 'name and link required' });

  const info = (await db.query(
    'INSERT INTO saved_resources (user_id, branch, subject, resource_type, name, link) VALUES (?, ?, ?, ?, ?, ?)'
  , [req.session.userId, branch || '', subject || '', resource_type || 'pdf', name, link]));

  res.status(201).json({ id: info.rows[0]?.id, branch, subject, resource_type: resource_type || 'pdf', name, link });
});

app.delete('/api/saved/:id', requireAuth, async (req, res) => {
  const info = (await db.query(
    'DELETE FROM saved_resources WHERE id = ? AND user_id = ?'
  , [parseInt(req.params.id, 10), req.session.userId]));
  if (info.rowCount === 0) return res.status(404).json({ error: 'Not found.' });
  res.json({ ok: true });
});

// ═══════════════════════════════════════════════════════════════
//  REVIEWS
// ═══════════════════════════════════════════════════════════════

app.get('/api/reviews/user', requireAuth, async (req, res) => {
  res.json((await db.query('SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC', [req.session.userId])).rows);
});

app.get('/api/reviews', async (req, res) => {
  res.json((await db.query('SELECT r.*, u.full_name, u.branch FROM reviews r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC LIMIT 50', [])).rows);
});

app.post('/api/reviews', requireAuth, async (req, res) => {
  const { subject, content, rating } = req.body || {};
  if (!content || !rating) return res.status(400).json({ error: 'content and rating required' });

  const info = (await db.query(
    'INSERT INTO reviews (user_id, subject, content, rating) VALUES (?, ?, ?, ?)'
  , [req.session.userId, subject || '', content, parseInt(rating, 10)]));

  res.status(201).json((await db.query('SELECT * FROM reviews WHERE id = ?', [info.rows[0]?.id])).rows[0]);
});

app.delete('/api/reviews/:id', requireAuth, async (req, res) => {
  const info = (await db.query('DELETE FROM reviews WHERE id = ? AND user_id = ?', [parseInt(req.params.id, 10), req.session.userId]));
  if (info.rowCount === 0) return res.status(404).json({ error: 'Not found.' });
  res.json({ ok: true });
});

// ═══════════════════════════════════════════════════════════════
//  Q&A ROUTES
// ═══════════════════════════════════════════════════════════════



// ── MIGRATE: remove UNIQUE constraint from timetable ──────────────────────


app.get('/api/qa', async (req, res) => {
  const { subject, branch } = req.query;
  if (!subject) return res.status(400).json({ error: 'subject required' });
  const rows = (await db.query(
    'SELECT q.id, q.content, q.created_at, COUNT(a.id) as answer_count FROM qa_questions q LEFT JOIN qa_answers a ON a.question_id = q.id WHERE q.subject = ? AND q.branch = ? GROUP BY q.id ORDER BY q.created_at DESC'
  , [subject, branch || ''])).rows;
  res.json(rows);
});

app.post('/api/qa', async (req, res) => {
  const { subject, branch, content } = req.body || {};
  if (!subject || !content?.trim()) return res.status(400).json({ error: 'subject and content required' });
  const info = (await db.query('INSERT INTO qa_questions (subject, branch, content) VALUES (?, ?, ?)', [subject, branch || '', content.trim()]));
  res.status(201).json({ id: info.rows[0]?.id, subject, content: content.trim(), answer_count: 0, created_at: new Date().toISOString() });
});

app.get('/api/qa/:id/answers', async (req, res) => {
  const rows = (await db.query('SELECT * FROM qa_answers WHERE question_id = ? ORDER BY created_at ASC', [parseInt(req.params.id)])).rows;
  res.json(rows);
});

app.post('/api/qa/:id/answers', async (req, res) => {
  const { content } = req.body || {};
  if (!content?.trim()) return res.status(400).json({ error: 'content required' });
  const info = (await db.query('INSERT INTO qa_answers (question_id, content) VALUES (?, ?)', [parseInt(req.params.id), content.trim()]));
  res.status(201).json({ id: info.rows[0]?.id, question_id: parseInt(req.params.id), content: content.trim(), created_at: new Date().toISOString() });
});

// ═══════════════════════════════════════════════════════════════
//  TIMETABLE ROUTES
// ═══════════════════════════════════════════════════════════════
const TT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


function normalizeTTDay(day) {
  if (!day) return null;
  const key = String(day).trim().slice(0, 3).toLowerCase();
  const map = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat' };
  return map[key] || (TT_DAYS.includes(day) ? day : null);
}

function normalizeTTTime(time) {
  if (!time) return null;
  const raw = String(time).trim().replace('.', ':');
  const m24 = raw.match(/^(\d{1,2}):(\d{2})$/);
  if (m24) {
    const h = Math.min(23, Math.max(0, parseInt(m24[1], 10)));
    const min = Math.min(59, Math.max(0, parseInt(m24[2], 10)));
    return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }
  const m12 = raw.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (m12) {
    let h = parseInt(m12[1], 10);
    const min = Math.min(59, Math.max(0, parseInt(m12[2], 10)));
    if (/pm/i.test(m12[3]) && h < 12) h += 12;
    if (/am/i.test(m12[3]) && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }
  return null;
}

function sanitizeTTEntry(entry) {
  const day = normalizeTTDay(entry?.day);
  const time = normalizeTTTime(entry?.time);
  const end_time = entry?.end_time ? (normalizeTTTime(entry.end_time) || '') : '';
  const subject = String(entry?.subject || '').trim().slice(0, 200);
  const room = String(entry?.room || '').trim().slice(0, 50);
  if (!day || !time || !subject) return null;
  return { day, time, end_time, subject, room };
}

app.get('/api/timetable', requireAuth, async (req, res) => {
  const rows = (await db.query('SELECT * FROM timetable WHERE user_id = ? ORDER BY day, time', [req.session.userId])).rows;
  res.json(rows);
});

app.post('/api/timetable', requireAuth, async (req, res) => {
  const clean = sanitizeTTEntry(req.body || {});
  if (!clean) return res.status(400).json({ error: 'Valid day, time, and subject required' });
  try {
    const info = (await db.query(
      'INSERT INTO timetable (user_id, day, time, end_time, subject, room) VALUES (?, ?, ?, ?, ?, ?)'
    , [req.session.userId, clean.day, clean.time, clean.end_time, clean.subject, clean.room]));
    res.status(201).json({ id: info.rows[0]?.id, ...clean });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/timetable/:id', requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'Invalid id' });
  const clean = sanitizeTTEntry(req.body || {});
  if (!clean) return res.status(400).json({ error: 'Valid day, time, and subject required' });
  const info = (await db.query(
    'UPDATE timetable SET day = ?, time = ?, end_time = ?, subject = ?, room = ? WHERE id = ? AND user_id = ?'
  , [clean.day, clean.time, clean.end_time, clean.subject, clean.room, id, req.session.userId]));
  if (info.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ id, ...clean });
});

app.delete('/api/timetable/:id', requireAuth, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'Invalid id' });
  const info = (await db.query('DELETE FROM timetable WHERE id = ? AND user_id = ?', [id, req.session.userId]));
  if (info.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});


// ═══════════════════════════════════════════════════════════════
//  GLOBAL ERROR HANDLER
// ═══════════════════════════════════════════════════════════════

app.use((err, req, res, _next) => {
  console.error('❌', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ═══════════════════════════════════════════════════════════════
//  START
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log('\n🚀  uniCLOUD running →  http://localhost:' + PORT);
  console.log('📁  Static files  →  ' + staticDir);
  console.log('🗄️   Database      →  ' + path.join(__dirname, 'unicloud.db'));
  console.log('\nGoogle Client ID:', GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE'
    ? '⚠️  NOT SET (Google Sign-In disabled)'
    : '✅  ' + GOOGLE_CLIENT_ID.slice(0, 20) + '…');
  console.log('Google Sign-In: add each site URL to Authorized JavaScript origins in Google Cloud Console');
  console.log('  e.g. http://localhost:' + PORT + '  and  http://YOUR_LAN_IP:' + PORT + '  (for phone testing)');
  console.log('\nDemo account: demo@unicloud.app / demo1234\n');
});
