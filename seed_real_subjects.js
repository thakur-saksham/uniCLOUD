const db = require('./db');

const SUBJECTS = {
  Petroleum: {
    1: ['Mathematics I','Physics','Chemistry','Engineering Drawing','English Communication'],
    2: ['Mathematics II','Fluid Mechanics','Thermodynamics','Geology','Environmental Science'],
    3: ['Petroleum Geology','Reservoir Engineering I','Drilling Engineering','Fluid Flow in Porous Media','Instrumentation'],
    4: ['Reservoir Engineering II','Well Logging','Production Engineering','Petroleum Economics','HSE Management'],
    5: ['Enhanced Oil Recovery','Natural Gas Engineering','Refinery Processes','Pipeline Engineering','Project Management'],
    6: ['Offshore Engineering','Petroleum Legislation','Formation Evaluation','Elective I','Industrial Training'],
    7: ['Advanced Reservoir Simulation','Petroleum Geomechanics','Elective II','Seminar'],
    8: ['Thesis / Project','Internship','Elective III']
  },
  CSE: {
    1: ['C','LINUX','AEM1','MANAGING SELF','EVS','PROBLEM SOLVING'],
    2: ['AEM2','DSA IN C','DE','ELEMENTS OF AIML','EVS','PHYSICS','PYTHON','TIME AND PRIORITY MANAGEMENT'],
    3: ['Operating Systems', 'Design and Analysis of Algorithms', 'Leading Conversations', 'Computer organization and Architecture', 'EDGE Aptitude Fundamentals', 'Data communication and Networks'],
    4: ['Computer Networks','Theory of Computation','Compiler Design','Microprocessors','Elective I'],
    5: ['Machine Learning','Web Technologies','Cloud Computing','Information Security','Elective II'],
    6: ['Artificial Intelligence','Mobile Computing','Big Data Analytics','Elective III','Mini Project'],
    7: ['Deep Learning','Blockchain','Elective IV','Seminar'],
    8: ['Major Project','Internship','Open Elective']
  }
};

async function seed() {
  console.log('Starting seed of ACTUAL custom subjects...');
  let totalBranches = 0;
  let totalSubjects = 0;

  for (const branchName of Object.keys(SUBJECTS)) {
    // Insert branch if not exists
    await db.query(
      `INSERT INTO branches (name) 
       SELECT $1 WHERE NOT EXISTS (SELECT 1 FROM branches WHERE name = $1)`, 
      [branchName]
    );
    
    // Get branch id
    const branchRes = await db.query('SELECT id FROM branches WHERE name = $1', [branchName]);
    const branchId = branchRes.rows[0].id;
    totalBranches++;

    // Insert subjects
    const semesters = SUBJECTS[branchName];
    for (const [sem, subjects] of Object.entries(semesters)) {
      for (const name of subjects) {
        await db.query(
          `INSERT INTO subjects (branch_id, name, semester)
           SELECT $1, $2, $3 WHERE NOT EXISTS (
             SELECT 1 FROM subjects WHERE branch_id = $1 AND name = $2 AND semester = $3
           )`,
          [branchId, name, parseInt(sem)]
        );
        totalSubjects++;
      }
    }
  }

  console.log(`✅ Seeded ${totalBranches} branches and ${totalSubjects} custom subjects.`);
  process.exit(0);
}

seed().catch(console.error);
