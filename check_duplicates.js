const db = require('./db');
async function run() {
  try {
    const res = await db.query(`SELECT b.name as branch, s.id, s.name, s.semester FROM subjects s JOIN branches b ON s.branch_id = b.id WHERE b.name IN ('Chemical', 'Mechanical', 'Fire & Safety') ORDER BY b.name, s.semester, s.name`);
    console.table(res.rows);
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
