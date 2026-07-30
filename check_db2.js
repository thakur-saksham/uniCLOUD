const db = require('./db');
async function run() {
  try {
    const res = await db.query(`SELECT id, name, semester FROM subjects WHERE id > 850`);
    console.log(`Subjects with id > 850: ${res.rows.length}`);
    const pyqs = await db.query(`SELECT count(*) FROM subject_resources WHERE type = 'pyq'`);
    console.log(`Total PYQs: ${pyqs.rows[0].count}`);
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
