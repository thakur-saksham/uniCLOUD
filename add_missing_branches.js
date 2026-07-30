const db = require('./db');

async function run() {
  try {
    const newBranches = [
      'B.Tech Applied Petroleum Engineering – Gas Stream',
      'B.Sc (Hons) - Chemistry',
      'B.Sc (Hons) - Geology',
      'B.Sc (Hons) - Mathematics',
      'B.Sc (Hons) - Physics',
      'B.Sc (CSE)'
    ];

    for (let b of newBranches) {
      await db.query(`INSERT INTO branches (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`, [b]);
    }
    console.log("Branches added.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
run();
