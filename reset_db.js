const db = require('./db');
async function run() {
  try {
    const res = await db.query(`SELECT id FROM branches WHERE name IN ('Chemical', 'Mechanical', 'Fire & Safety')`);
    const branchIds = res.rows.map(r => r.id);
    for (let id of branchIds) {
      await db.query(`DELETE FROM subject_resources WHERE subject_id IN (SELECT id FROM subjects WHERE branch_id = $1)`, [id]);
      await db.query(`DELETE FROM attendance WHERE subject_id IN (SELECT id FROM subjects WHERE branch_id = $1)`, [id]);
      await db.query(`DELETE FROM subjects WHERE branch_id = $1`, [id]);
    }
    console.log("Deleted all subjects and resources for Chemical, Mechanical, Fire & Safety.");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
