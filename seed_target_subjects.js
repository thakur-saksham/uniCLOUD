const db = require('./db');

const seedData = {
  'Chemical': {
    1: ['Mathematics I', 'Physics I', 'Chemistry I', 'Programming for Engineers', 'Basic Electrical & Electronics Engineering', 'Workshop Practices', 'Engineering Graphics'],
    2: ['Mathematics II', 'Physics II', 'Process Chemistry', 'Materials & Energy Balance Calculations', 'Chemical Technology', 'Basic Electrical & Electronics Engineering', 'Workshop Practices / Engineering Graphics'],
    3: ['Chemical Engineering Thermodynamics', 'Momentum Transfer / Transport Phenomena', 'Material & Energy Balance Computations', 'Process Heat Transfer', 'Chemical Process Calculations', 'Materials Science', 'Mathematics III'],
    4: ['Chemical Reaction Engineering', 'Mass Transfer', 'Chemical Engineering Thermodynamics-II', 'Heat Transfer', 'Numerical Methods in Chemical Engineering', 'Fluid Mechanics', 'Particulate Technology']
  },
  'Fire & Safety': {
    1: ['Mathematics I', 'Physics I', 'Chemistry I', 'Programming for Engineers', 'Basic Electrical & Electronics Engineering', 'Basic of Mechanical Engineering', 'Workshop Practices / Engineering Graphics'],
    2: ['Mathematics II', 'Physics II', 'Chemistry', 'Basic Electrical & Electronics Engineering', 'Engineering Mechanics', 'Basic of Mechanical Engineering', 'Workshop Practices'],
    3: ['Fire Engineering I (Fundamentals)', 'Chemical Engineering I (Thermodynamics & Analytical Instruments)', 'Fluid Mechanics', 'First Aid & Emergency Procedure', 'Behaviour Based Safety & Human Factor Engineering', 'Mathematics III / Applied Numerical Methods', 'Safety in Construction / Principles of Safety Management'],
    4: ['Fire Engineering II (Planning & Design of Fire Protection Systems)', 'Strength of Material', 'Occupational Health & Safety / Industrial Hygiene', 'Principles of Engineering Design', 'Electrical System Safety & Design', 'Chemical Engineering II (Unit Operations)', 'Behaviour Based Safety & Human Factor Engineering']
  },
  'Mechanical': {
    1: ['Mathematics I', 'Physics I', 'Chemistry I', 'Programming for Engineers', 'Basic Electrical & Electronics Engineering', 'Workshop Practices', 'Engineering Graphics'],
    2: ['Mathematics II', 'Physics II', 'Chemistry', 'Engineering Mechanics', 'Introduction to Mechanical Engineering', 'Basic Electrical & Electronics Engineering', 'Workshop Practices / Engineering Graphics'],
    3: ['Materials Science / Engineering', 'Fluid Mechanics', 'Engineering Thermodynamics', 'Manufacturing Processes', 'Manufacturing / Machine Assembly Drawing', 'Mathematics III / Statistical & Numerical Methods', 'Physics (continued)'],
    4: ['Strength of Materials', 'Heat Transfer', 'Applied Thermodynamics', 'Fluid Mechanics & Fluid Machines', 'Manufacturing Technology', 'Theory of Machines', 'Instrumentation & Control / Mechanical Measurement & Metrology']
  },
  'BCA': {
    1: ['Mathematics', 'Programming in C', 'Problem Solving Using C', 'Computer Fundamentals', 'Database Management Systems / SQL', 'Web Technologies', 'English Communication'],
    2: ['Mathematics II', 'Discrete Mathematics', 'Statistics Numerical Methods & Algorithms', 'Data Structures', 'Object-Oriented Analysis & Design (OOPs with C++)', 'Operating Systems (incl. Linux/Shell)', 'Advanced DBMS / PL-SQL', 'Computer System Architecture / Digital Electronics', 'Business Communication / Accounting'],
    3: ['Computer Networks', 'Java Programming', 'Python Programming / Scripting', 'Database Management Systems (Advanced)', 'Design and Analysis of Algorithms', 'Statistics & Discrete Mathematics', 'Operating Systems'],
    4: ['Software Engineering (incl. Project Management / Agile)', 'Computer Networks / Data Communication', 'Web Technologies (Front-end / PHP / Django)', 'Database Management Systems', 'Java Programming', 'Operating Systems', 'Design and Analysis of Algorithms', 'Computer System Architecture']
  }
};

async function seed() {
  try {
    for (const [branchName, semesters] of Object.entries(seedData)) {
      const res = await db.query('SELECT id FROM branches WHERE name = $1', [branchName]);
      const branchId = res.rows[0].id;
      
      for (const [semStr, subjects] of Object.entries(semesters)) {
        const semester = parseInt(semStr, 10);
        for (const subName of subjects) {
          await db.query(
            "INSERT INTO subjects (branch_id, name, semester) VALUES ($1, $2, $3) ON CONFLICT (branch_id, name, semester) DO NOTHING",
            [branchId, subName, semester]
          );
        }
      }
    }
    console.log("Successfully seeded canonical subjects!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();
