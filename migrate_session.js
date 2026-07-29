const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

code = code.replace(/const session      = require\('express-session'\);/, "const session      = require('cookie-session');");

code = code.replace(/app\.use\(session\(\{[\s\S]+?\}\)\);/, "app.use(session({ name: 'session', keys: [process.env.SESSION_SECRET || 'unicloud-secret'], maxAge: 30 * 24 * 60 * 60 * 1000 }));");

code = code.replace(/req\.session\.save\(\(\) => res\.status\(201\)\.json\(\{ user \}\)\);/g, "res.status(201).json({ user });");
code = code.replace(/req\.session\.save\(\(\) => res\.json\(\{ user \}\)\);/g, "res.json({ user });");
code = code.replace(/req\.session\.save\(\(\) => res\.redirect\('\/main\.html'\)\);/g, "res.redirect('/main.html');");
code = code.replace(/req\.session\.destroy\(\(\) => res\.json\(\{ ok: true \}\)\);/g, "req.session = null; res.json({ ok: true });");

fs.writeFileSync('server.js', code);
