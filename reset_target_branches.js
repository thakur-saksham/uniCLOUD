const db = require('./db');

async function run() {
  try {
    const targetBranches = ['BCA', 'B.Sc (Hons) - Chemistry', 'B.Sc (Hons) - Geology', 'B.Sc (Hons) - Mathematics', 'B.Sc (Hons) - Physics', 'B.Sc (CSE)', 'B.Tech Applied Petroleum Engineering – Gas Stream'];
    const placeholders = targetBranches.map((_, i) => `$${i + 1}`).join(', ');
    const res = await db.query(`SELECT id FROM branches WHERE name IN (${placeholders})`, targetBranches);
    const branchIds = res.rows.map(r => r.id);
    for (let id of branchIds) {
      await db.query(`DELETE FROM subject_resources WHERE subject_id IN (SELECT id FROM subjects WHERE branch_id = $1)`, [id]);
      await db.query(`DELETE FROM attendance WHERE subject_id IN (SELECT id FROM subjects WHERE branch_id = $1)`, [id]);
      await db.query(`DELETE FROM subjects WHERE branch_id = $1`, [id]);
    }
    console.log("Deleted all subjects and resources for Chemical, Mechanical, Fire & Safety, BCA.");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
