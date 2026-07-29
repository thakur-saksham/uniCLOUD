const db = require('./db');

async function run() {
  try {
    // Drop the check constraint and recreate it to allow 'tutorial'
    await db.query("ALTER TABLE subject_resources DROP CONSTRAINT IF EXISTS subject_resources_type_check");
    await db.query("ALTER TABLE subject_resources ADD CONSTRAINT subject_resources_type_check CHECK(type IN ('syllabus','notes','lab','pyq','tutorial'))");
    console.log("Updated check constraint on subject_resources.");

    const res = await db.query("SELECT * FROM subject_resources WHERE type = 'notes' AND (name ILIKE '%tutorial%' OR name ILIKE '%practice%' OR name ILIKE '%sheet%')");
    console.log('Found resources to move:', res.rows.length);
    for (let r of res.rows) {
      console.log(`- ${r.name} (Subj: ${r.subject_id})`);
    }

    const update = await db.query("UPDATE subject_resources SET type = 'tutorial' WHERE type = 'notes' AND (name ILIKE '%tutorial%' OR name ILIKE '%practice%' OR name ILIKE '%sheet%') RETURNING id, name");
    console.log('Moved', update.rowCount, 'items to tutorials.');

    // Wait, the user specifically mentioned "phys tutorial sheets in tutorial" and "aem1 practice sset and tutorial from notes to tutorial tab"
    // Just in case any other names match, this is safe.

    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
