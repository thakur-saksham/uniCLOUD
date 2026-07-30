const db = require('./db');

const civilSubjects = [
  { sem: 1, subjects: ["Engineering Graphics", "Physics", "OOP", "AEM I", "EVS"] },
  { sem: 2, subjects: ["Engineering Mechanics", "Living Conversations", "Chemistry", "Basic Electrical And Electronics Eng", "Basic Of Mechanical", "AEM II", "EVS"] },
  { sem: 3, subjects: ["Intro To Chemical Eng", "Engineering Geology And Groundwater", "Building Materials And Concrete Technology", "Surveying And Remote Sensing", "Elements Of Fluid Mechanics", "Design Thinking"] },
  { sem: 4, subjects: ["EDGE", "Python", "Working With Data", "Elements Of Hydraulic Eng", "Water Supply And Sanitation", "Green Building And Energy Efficiency", "Survey Camp", "Computer Aided Civil Eng Design Lab", "Solid Mechanics Lab", "Strength Of Material"] }
];

async function run() {
  try {
    const branchRes = await db.query("SELECT id FROM branches WHERE name = 'Civil'");
    if (branchRes.rows.length === 0) throw new Error("Civil branch not found");
    const branchId = branchRes.rows[0].id;

    for (const group of civilSubjects) {
      for (const sub of group.subjects) {
        await db.query(
          "INSERT INTO subjects (branch_id, name, semester) VALUES ($1, $2, $3) ON CONFLICT (branch_id, name, semester) DO NOTHING",
          [branchId, sub, group.sem]
        );
      }
    }
    console.log("Civil subjects inserted successfully.");

    const aeroRes = await db.query("SELECT id FROM branches WHERE name = 'Aerospace'");
    const aeroId = aeroRes.rows[0].id;
    await db.query("INSERT INTO subjects (branch_id, name, semester) VALUES ($1, $2, $3) ON CONFLICT (branch_id, name, semester) DO NOTHING", [aeroId, "Workshop Practice", 1]);
    console.log("Workshop Practice inserted for Aerospace Sem 1.");

    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

run();
