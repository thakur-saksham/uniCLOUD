const db = require('./db');
async function run() {
  const b = await db.query("SELECT id FROM branches WHERE name = 'CSE'");
  const bid = b.rows[0].id;
  const s = await db.query('SELECT name, semester FROM subjects WHERE branch_id = $1 ORDER BY semester, name', [bid]);
  console.log('CSE subjects:');
  s.rows.forEach(r => console.log('  SEM ' + r.semester + ': ' + r.name));
  process.exit(0);
}
run();
