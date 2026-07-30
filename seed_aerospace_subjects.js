const db = require('./db');

const aerospaceSubjects = [
  { sem: 1, subjects: ["AEM I", "Engineering Graphics", "EVS", "Managing Self", "Physics", "Programming For Engineers"] },
  { sem: 2, subjects: ["AEM II", "Basic Electrical And Electronics Eng", "Chemistry", "Design And Build", "Engineering Mechanics", "EVS", "Intro To Aerospace Eng", "Time And Priority"] },
  { sem: 3, subjects: ["Aircraft System And Instruments", "Computation Techniques", "Fluid Mechanics", "Intro To Thermo", "Leading Conversations", "Python"] },
  { sem: 4, subjects: ["Aerodynamics I", "DSA", "EDGE", "Discrete", "Heat Transfer For Aerospace", "Mechanics Of Materials", "Propulsion I"] }
];

async function run() {
  try {
    const branchRes = await db.query("SELECT id FROM branches WHERE name = 'Aerospace'");
    if (branchRes.rows.length === 0) throw new Error("Aerospace branch not found");
    const branchId = branchRes.rows[0].id;

    for (const group of aerospaceSubjects) {
      for (const sub of group.subjects) {
        await db.query(
          "INSERT INTO subjects (branch_id, name, semester) VALUES ($1, $2, $3) ON CONFLICT (branch_id, name, semester) DO NOTHING",
          [branchId, sub, group.sem]
        );
      }
    }
    console.log("Aerospace subjects inserted successfully.");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}

run();
