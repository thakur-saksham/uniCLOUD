const db = require('./db');
async function run() {
  try {
    const res = await db.query(`SELECT b.name, COUNT(r.id) as count FROM branches b LEFT JOIN subjects s ON b.id = s.branch_id LEFT JOIN subject_resources r ON s.id = r.subject_id AND r.type = 'pyq' GROUP BY b.id, b.name ORDER BY count DESC, b.name`);
    console.table(res.rows);
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
