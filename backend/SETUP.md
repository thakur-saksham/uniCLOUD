# uniCLOUD — Setup Guide

## Your Folder Structure (must match exactly)

```
uniCLOUD/          ← your project root (same folder as server.js)
├── server.js
├── db.js
├── api.js         ← NOT in a subfolder; but HTML pages load it as "js/api.js"
├── package.json
├── .env
├── login.html
├── main.html
├── profile.html
├── subject.html
├── attendance.html
├── index.html
├── cards.html
├── logo.png
├── js/
│   └── api.js     ← COPY api.js here too (HTML pages load from js/api.js)
└── unicloud.db    ← auto-created on first run
```

## IMPORTANT: Create the js/ folder

The HTML pages load api.js from `js/api.js`, so you must create this folder:

```bash
mkdir js
cp api.js js/api.js
```

Every time you update api.js, copy it to js/ again.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp env.example .env
# Edit .env and set a strong SESSION_SECRET

# 3. Create the js/ folder for the frontend API client
mkdir js && cp api.js js/api.js

# 4. Seed the database (creates unicloud.db with branches + subjects)
node db.js

# 5. Start the server
node server.js
# Or for auto-restart on changes:
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Demo Account

After running `node db.js`, a demo account is created:
- Email: `demo@unicloud.app`
- Password: `demo1234`

---

## Google Sign-In Setup (Optional)

1. Go to https://console.cloud.google.com
2. APIs & Services → Credentials → Create OAuth 2.0 Client ID
3. Application type: **Web application**
4. Authorized JavaScript origins: `http://localhost:3000`
5. Copy the Client ID

Then in TWO places:

**`.env`:**
```
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

**`login.html`** (line ~11):
```html
<meta name="google-client-id" content="your-client-id-here.apps.googleusercontent.com">
```

**`profile.html`** (line ~10):
```html
<meta name="google-client-id" content="your-client-id-here.apps.googleusercontent.com">
```

---

## What Was Fixed

| Issue | Fix |
|-------|-----|
| Hardcoded `C:\Users\ASUS\...` paths | All changed to `/main.html`, `/login.html` etc. |
| Profile tab showing "John Doe" | Now loads real user data from `/auth/me` on every page load |
| Guest login showing real user data | Guest is now a synthetic object (never touches DB) |
| Settings not saving to DB | `PATCH /api/users/me` wired up correctly, profile tab refreshes immediately after save |
| Logout not calling server | Now calls `POST /auth/logout` to destroy session cookie |
| Attendance branch dropdown hardcoded | Fetches from `GET /api/branches` dynamically |
| Attendance subjects hardcoded | Fetches from `GET /api/subjects?branch=X&semester=Y` |
| Google login redirecting wrong | Fixed to `/main.html` |
| api.js BASE URL hardcoded to localhost | Now auto-detects from `window.location.origin` |
| No delete account feature | `DELETE /api/users/me` added to server + button in Settings |
| Profile picture upload | File → base64 → saved in DB via PATCH, shows immediately |
| Google connect status in Settings | Shows connected/not connected based on `google_id` in DB |
