const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, 'unicloud.db'));

// Fix 'UNIT-1 - u1 tut' in PHYSICS
const branch = db.prepare("SELECT id FROM branches WHERE name = 'CSE'").get();
const physics = db.prepare("SELECT id FROM subjects WHERE branch_id = ? AND semester = 2 AND name = 'PHYSICS'").get(branch.id);
if (physics) {
    db.prepare("UPDATE subject_resources SET type = 'tutorial' WHERE subject_id = ? AND name LIKE '%tut%'").run(physics.id);
    console.log("Updated 'tut' files in PHYSICS to tutorial.");
}

// Check EVS
const evs = db.prepare("SELECT id, name FROM subjects WHERE branch_id = ? AND semester = 2 AND name LIKE '%EVS%'").all(branch.id);
console.log("EVS Subjects found:");
console.log(JSON.stringify(evs, null, 2));

for (const s of evs) {
    const res = db.prepare("SELECT id, name, type FROM subject_resources WHERE subject_id = ?").all(s.id);
    console.log(`Resources for ${s.name}:`);
    console.log(JSON.stringify(res, null, 2));
}

