const db = require('./db');

async function run() {
  try {
    // Get Civil branch ID
    let civilRes = await db.query("SELECT id FROM branches WHERE name = 'Civil'");
    let civilId = civilRes.rows[0]?.id;
    if (!civilId) {
      console.log('Civil branch not found!');
      return;
    }

    // Delete existing Civil subjects to prevent duplicates
    await db.query("DELETE FROM subjects WHERE branch_id = $1", [civilId]);

    // Insert new Civil subjects
    const civilData = [
      { sem: 1, subjects: ['Engineering Graphics', 'Physics', 'OOP', 'AEM I', 'EVS'] },
      { sem: 2, subjects: ['Engineering Mechanics', 'Living Conversations', 'Chemistry', 'Basic Electrical And Electronics Eng', 'Basic Of Mechanical', 'AEM II', 'EVS'] },
      { sem: 3, subjects: ['Intro To Chemical Eng', 'Engineering Geology And Groundwater', 'Building Materials And Concrete Technology', 'Surveying And Remote Sensing', 'Elements Of Fluid Mechanics', 'Design Thinking'] },
      { sem: 4, subjects: ['Edge', 'Python', 'Working With Data', 'Elements Of Hydraulic Eng', 'Water Supply And Sanitation', 'Green Building And Energy Efficiency', 'Survey Camp', 'Computer Aided Civil Eng Design Lab', 'Solid Mechanics Lab', 'Strength Of Material'] }
    ];

    for (let sem of civilData) {
      for (let subj of sem.subjects) {
        await db.query("INSERT INTO subjects (branch_id, semester, name) VALUES ($1, $2, $3)", [civilId, sem.sem, subj]);
      }
    }
    console.log('Civil subjects inserted.');

    // Title case ALL subjects using Postgres initcap
    await db.query("UPDATE subjects SET name = initcap(name)");
    console.log('All subjects title cased.');

    // Fix specific acronyms that were mangled by initcap
    await db.query("UPDATE subjects SET name = replace(name, 'Oop', 'OOP') WHERE name LIKE '%Oop%'");
    await db.query("UPDATE subjects SET name = replace(name, 'Aem', 'AEM') WHERE name LIKE '%Aem%'");
    await db.query("UPDATE subjects SET name = replace(name, 'Evs', 'EVS') WHERE name LIKE '%Evs%'");
    await db.query("UPDATE subjects SET name = replace(name, 'Dsa', 'DSA') WHERE name LIKE '%Dsa%'");
    await db.query("UPDATE subjects SET name = replace(name, 'Dbms', 'DBMS') WHERE name LIKE '%Dbms%'");

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run();
