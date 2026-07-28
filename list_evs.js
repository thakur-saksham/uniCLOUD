const db = require('better-sqlite3')('unicloud.db');
const rows = db.prepare("SELECT * FROM subjects WHERE name='EVS'").all();
console.log(JSON.stringify(rows, null, 2));
