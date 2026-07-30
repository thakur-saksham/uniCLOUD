const db = require('./db');
async function run() {
  try {
    const res = await db.query(`SELECT id, name, semester FROM subjects WHERE branch_id = (SELECT id FROM branches WHERE name = 'Civil') ORDER BY semester, name`);
    console.log(res.rows);
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
