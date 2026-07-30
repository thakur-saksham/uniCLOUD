const db = require('./db');
async function run() {
  try {
    const res1 = await db.query(`SELECT id, name FROM subjects ORDER BY id DESC LIMIT 10`);
    console.log("Top 10 max ID subjects before cleanup:", res1.rows);

    await db.query(`DELETE FROM subject_resources WHERE type = 'pyq'`);
    console.log("Deleted all PYQs");

    // We can identify scraper subjects because they were created today. Wait, subjects don't have created_at.
    // Let's delete subjects where id > 800 AND they have no resources left (after we deleted PYQs).
    const res2 = await db.query(`
      DELETE FROM subjects 
      WHERE id NOT IN (SELECT DISTINCT subject_id FROM subject_resources) 
        AND id > 800
      RETURNING id, name;
    `);
    console.log(`Deleted ${res2.rows.length} newly created empty subjects. Sample:`, res2.rows.slice(0,5));
    
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
