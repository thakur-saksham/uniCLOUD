const db = require('./db');

// This is the EXACT data from the FIRST COMMIT (828fb21) db.js file.
// Nothing added, nothing changed.

const BRANCHES = [
  'CSE', 'Petroleum', 'Mechanical', 'Civil', 'Electrical',
  'Aerospace', 'Chemical', 'Fire & Safety', 'B.Sc', 'BCA', 'B.Des'
];

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
  },
  Mechanical: {
    1: ['Mathematics I','Physics','Engineering Drawing','Workshop Practice','English Communication'],
    2: ['Mathematics II','Mechanics of Solids','Thermodynamics','Materials Science','Manufacturing Processes I'],
    3: ['Fluid Mechanics','Heat Transfer','Theory of Machines','Metrology','Manufacturing Processes II'],
    4: ['Machine Design','Industrial Engineering','Refrigeration & AC','CAD/CAM','Elective I'],
    5: ['Automobile Engineering','Finite Element Analysis','Operations Research','Elective II','Mini Project'],
    6: ['Robotics','Power Plant Engineering','Elective III','Industrial Training'],
    7: ['Advanced Manufacturing','Elective IV','Seminar'],
    8: ['Major Project','Internship','Open Elective']
  },
  Civil: {
    1: ['Mathematics I','Physics','Engineering Drawing','Environmental Science','English Communication'],
    2: ['Mathematics II','Mechanics of Structures','Building Materials','Surveying I','Engineering Geology'],
    3: ['Fluid Mechanics','Strength of Materials','Surveying II','Concrete Technology','Engineering Geology II'],
    4: ['Structural Analysis','Geotechnical Engineering','Transportation Engineering','Water Resources','Elective I'],
    5: ['Design of RC Structures','Foundation Engineering','Irrigation Engineering','Construction Management','Elective II'],
    6: ['Bridge Engineering','Urban Planning','Environmental Engineering','Elective III','Mini Project'],
    7: ['Advanced Structural Design','Elective IV','Seminar'],
    8: ['Major Project','Internship','Open Elective']
  },
  Electrical: {
    1: ['Mathematics I','Physics','Basic Electrical Engineering','Engineering Drawing','English Communication'],
    2: ['Mathematics II','Network Theory','Electronic Devices','Electrical Machines I','Digital Circuits'],
    3: ['Signals & Systems','Control Systems','Electrical Machines II','Power Systems I','Electromagnetic Fields'],
    4: ['Power Electronics','Microprocessors','Power Systems II','Instrumentation','Elective I'],
    5: ['High Voltage Engineering','Electric Drives','Renewable Energy','Elective II','Mini Project'],
    6: ['Smart Grid','VLSI Design','Elective III','Industrial Training'],
    7: ['Advanced Power Systems','Elective IV','Seminar'],
    8: ['Major Project','Internship','Open Elective']
  },
  Aerospace: {
    1: ['AEM1', 'Engineering Graphics', 'EVS', 'Managing Self', 'Physics', 'Programming for Engineers'],
    2: ['AEM2', 'Basic Electrical and Electronics Engineering', 'Chemistry', 'Design and Build Lab', 'Engineering Mechanics', 'EVS (Living)', 'Introduction to Aerospace Engineering', 'Time and Priority Management'],
    3: ['Aircraft System & Instruments', 'Computation Techniques', 'Fluid Mechanics', 'Introduction to Thermodynamics', 'Leading Conversations', 'Python'],
    4: ['Aerodynamics I', 'DSA', 'Discrete Mathematics', 'EDGE Softskills', 'Heat Transfer of Aerospace Applications', 'Mechanics of Materials', 'Propulsion I', 'Writing with Impact'],
    5: ['Aerodynamics II', 'Propulsion II', 'Flight Mechanics I', 'Control Systems', 'Elective II'],
    6: ['Flight Mechanics II', 'Aerospace Structures II', 'Avionics', 'Elective III', 'Industrial Training'],
    7: ['Space Dynamics', 'Elective IV', 'Seminar'],
    8: ['Major Project', 'Internship', 'Open Elective']
  },
  Chemical: {
    1: ['AEM1', 'Basic Chemistry', 'Basic Electrical and Electronics Engineering', 'EVS', 'Managing Self', 'Programming for Engineers'],
    2: ['AEM2', 'Design and Build Lab', 'Engineering Graphics', 'EVS (Living)', 'Materials and Energy Balance Calculations', 'Physics', 'Process Chemistry', 'Time and Priority Management', 'Workshop Practices'],
    3: ['Chemical Engineering Thermodynamics', 'Chemical Technology', 'Leading Conversations', 'Momentum Transfer', 'Process Heat Transfer', 'Social Internship'],
    4: ['Chemical Reaction Engineering', 'Data Analysis and Machine Learning', 'EDGE Softskills', 'Mass Transfer', 'Numerical Method in ChE', 'Writing with Impact'],
    5: ['Petroleum Refining','Polymer Technology','Safety Engineering','Elective II','Mini Project'],
    6: ['Biochemical Engineering','Environmental Technology','Elective III','Industrial Training'],
    7: ['Advanced Process Design','Elective IV','Seminar'],
    8: ['Major Project','Internship','Open Elective']
  },
  'Fire & Safety': {
    1: ["AEM 1","Basic Electrical and Electronics Engineering","Basic Of Mechanical Engineering","Chemistry","Engineering Graphics","Object Oriented Programming","Physics","Programming For Engineers","Sensing Devices","Workshop Practices"],
    2: ["AEM 2","Basic Electrical and Electronics Engineering","Basic Of Mechanical Engineering","Chemistry","Engineering Mechanics","Iot Controllers","Object Oriented Programming","Physics","Programming For Problem Solving","Safety In Engineering Industry","Workshop Practices"],
    3: ["Applied Numerical Methods","Artificial Intelligence","Behaviour Based Safety & Human Factor Engineering","Chemical Engineering I (Thermodynamics & Analytical Instruments)","Computing With Python","Elements Of Machine Drawing","Engineering Mechanics","Fire Engineering I","First Aid and Emergency Procedures","Fluid Mechanics","Fundamentals Of Fire Engineering","Introduction To Machine Learning","Introduction To Petroleum Engineering","Mathematics II","Principles Of Safety Management","Safety In Construction","Tmp & Tqm","Transforms And Numerical Methods"],
    4: ["Applied Numerical Methods","Behaviour Based Safety & Human Factor Engineering","Biology For Engineers","Chemical Engineering II","Computing With Python","Electrical System Safety and Design","Fire Engineering I","Fire Engineering II","Fire Protection Equipment & Design","First Aid And Emergency Procedures","Introduction To Cryptography","Introduction To Robotic Systems","Machine Learning (ai-minor)","Occupational Health & Hygiene Management","Occupational Health & Safety Engineering","Occupational Safety And Industrial Hygiene","Planning And Design Of Fire Protection Systems","Principles Of Engineering Design","Safety In Petroleum Exploration","Strength of Materials","Sustainability Engineering"],
    5: ['Process Safety','Environmental Management','Elective II','Mini Project'],
    6: ['Advanced Fire Safety','Elective III','Industrial Training'],
    7: ['Safety Audit & Compliance','Elective IV','Seminar'],
    8: ['Major Project','Internship','Open Elective']
  },
  'B.Sc': {
    1: ['Mathematics I','Physics','Chemistry','English','Environmental Science'],
    2: ['Mathematics II','Modern Physics','Physical Chemistry','Statistics','Computer Fundamentals'],
    3: ['Mathematics III','Quantum Mechanics','Organic Chemistry','Numerical Methods','Electronics'],
    4: ['Mathematics IV','Spectroscopy','Inorganic Chemistry','Statistical Mechanics','Elective I'],
    5: ['Advanced Mathematics','Nuclear Physics','Polymer Chemistry','Elective II','Project'],
    6: ['Dissertation','Elective III','Internship']
  },
  BCA: {
    1: ['Mathematics I','Programming in C','Computer Fundamentals','English Communication','Digital Logic'],
    2: ['Mathematics II','Data Structures','OOP with C++','Web Technologies','Database Management'],
    3: ['Algorithms','Operating Systems','Computer Networks','Software Engineering','Elective I'],
    4: ['Java Programming','Mobile App Development','Cloud Computing','Cyber Security','Mini Project'],
    5: ['Python Programming','AI & ML Basics','IoT','Elective II','Seminar'],
    6: ['Major Project','Internship','Elective III']
  },
  'B.Des': {
    1: ['Design Fundamentals','Visual Communication','Design Drawing','Art History','Model Making'],
    2: ['Typography','Colour Theory','Photography','Digital Tools','Design Thinking'],
    3: ['UI/UX Design','Brand Identity','3D Design','Motion Graphics','Research Methods'],
    4: ['Product Design','Interior Design Basics','Packaging Design','Elective I','Studio Project'],
    5: ['Service Design','Exhibition Design','Elective II','Dissertation I'],
    6: ['Dissertation II','Internship','Portfolio Development']
  }
};

// The EXACT resource files from the first commit (828fb21).
// Only CSE SEM 1 and SEM 2 had files in git.
const RESOURCES = [
  // CSE SEM 1 - AEM1
  { subject: 'AEM1', sem: 1, type: 'syllabus', name: 'MATH 1059 Session Plan.pdf', link: '/resources/CSE/SEM 1/MATH 1059 Session Plan.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Maths Assignment.pdf', link: '/resources/CSE/SEM 1/Maths Assignment.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Ravish R. Singh - Engineering mathematics.pdf', link: '/resources/CSE/SEM 1/Ravish R. Singh_ Mukul Bhatt - Engineering mathematics _ a tutorial approach (2010, Tata McGraw Hill Education Private Ltd.) - libgen.lc.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Practice set-1_AEM-I.pdf', link: '/resources/CSE/SEM 1/Practice set-1_AEM-I.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Practice Set 2 (MATH 1059).pdf', link: '/resources/CSE/SEM 1/Practice Set 2 (MATH 1059).pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Practice Set 3 -AEM I-MATH1059.pdf', link: '/resources/CSE/SEM 1/Practice Set 3 -AEM I-MATH1059.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Tutorial-0 AEM-1.pdf', link: '/resources/CSE/SEM 1/Tutorial-0 AEM-1.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Tutorial-0 AEM-1-1.pdf', link: '/resources/CSE/SEM 1/Tutorial-0 AEM-1-1.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Tutorial sheet-2.pdf', link: '/resources/CSE/SEM 1/Tutorial sheet-2.pdf' },
  { subject: 'AEM1', sem: 1, type: 'notes', name: 'Tutorial sheet-3 AEM-I.pdf', link: '/resources/CSE/SEM 1/Tutorial sheet-3 AEM-I.pdf' },

  // CSE SEM 1 - LINUX
  { subject: 'LINUX', sem: 1, type: 'notes', name: 'Learning Linux Shell Scripting.pdf', link: '/resources/CSE/SEM 1/Learning Linux Shell Scripting.pdf' },
  { subject: 'LINUX', sem: 1, type: 'notes', name: 'Shell Scripting.pdf', link: '/resources/CSE/SEM 1/Shell Scripting.pdf' },
  { subject: 'LINUX', sem: 1, type: 'lab', name: 'Linux Lab Courseplan.pdf', link: '/resources/CSE/SEM 1/Linux Lab Courseplan.pdf' },

  // CSE SEM 1 - PROBLEM SOLVING
  { subject: 'PROBLEM SOLVING', sem: 1, type: 'syllabus', name: 'Problem Solving_Syllabus Roland.pdf', link: '/resources/CSE/SEM 1/Problem Solving_Syllabus Roland.pdf' },
  { subject: 'PROBLEM SOLVING', sem: 1, type: 'notes', name: 'Roland C. Backhouse - Algorithmic Problem Solving.pdf', link: '/resources/CSE/SEM 1/Roland C. Backhouse - Algorithmic Problem Solving-John Wiley & Sons (2011).pdf' },

  // CSE SEM 1 - MANAGING SELF
  { subject: 'MANAGING SELF', sem: 1, type: 'notes', name: 'Workbook - Managing Self Updated.pdf', link: '/resources/CSE/SEM 1/Workbook - Managing Self Updated.pdf' },

  // CSE SEM 2 - ELEMENTS OF AIML
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'syllabus', name: 'Syllabus Elements of AIML.pdf', link: '/resources/CSE/SEM 2/Syllabus Elements of AIML.pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'notes', name: 'What is Machine Learning.pdf', link: '/resources/CSE/SEM 2/What is Machine Learning.pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'notes', name: 'Unit-1 AIML.pdf', link: '/resources/CSE/SEM 2/Unit-1 AIML.pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'notes', name: 'Elements of AIML Unit-2 PL and FOL.pdf', link: '/resources/CSE/SEM 2/Elements of AIML Unit-2 PL and FOL.pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'notes', name: 'Elements of AIML Unit-2 Resolution.pdf', link: '/resources/CSE/SEM 2/Elements of AIML Unit-2 Resolution.pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'notes', name: 'UNIT-3 AIML.pdf', link: '/resources/CSE/SEM 2/UNIT-3 AIML.pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'notes', name: 'Unit-3 AIML (1).pdf', link: '/resources/CSE/SEM 2/Unit-3 AIML (1).pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'notes', name: 'Applications of AI and Machine Learning - Unit 5.pdf', link: '/resources/CSE/SEM 2/Applications of AI and Machine Learning - Unit 5.pdf' },
  { subject: 'ELEMENTS OF AIML', sem: 2, type: 'lab', name: 'class_Imbalance_B49_B50_B54_AIML_Lab.pdf', link: '/resources/CSE/SEM 2/class_Imbalance_B49_B50_B54_AIML_Lab.pdf' },

  // CSE SEM 2 - EVS
  { subject: 'EVS', sem: 2, type: 'syllabus', name: 'EVS_Activities_Syllabus.html', link: '/resources/CSE/SEM 2/EVS_Activities_Syllabus.html' },

  // CSE SEM 2 - DSA IN C (notes from dsa-notes subfolder)
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Linked List.pdf', link: '/resources/CSE/SEM 2/Linked List.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Sorting Techniques.pdf', link: '/resources/CSE/SEM 2/Sorting Techniques.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Stack Data Structure.pdf', link: '/resources/CSE/SEM 2/Stack Data Structure.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Tree.pdf', link: '/resources/CSE/SEM 2/Tree.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Dijkstras Algorithm.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Dijkstras Algorithm.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Graph Representations and Traversal.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Graph Representations and Traversal.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Hashing and Hash Functions.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Hashing and Hash Functions.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Introduction to Graph and Terminology.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Introduction to Graph and Terminology.pdf' },
  { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Kruskals and Prims Algorithms.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Kruskals and Prims Algorithms.pdf' },
  // DSA IN C labs
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'EXP.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/EXP.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB-1.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB-1.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB-2.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB-2.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB-3.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB-3.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB-4.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB-4.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB-5.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB-5.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB-6.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB-6.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB 7.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB 7.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB 8.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB 8.zip' },
  { subject: 'DSA IN C', sem: 2, type: 'lab', name: 'LAB 9&10.zip', link: '/resources/CSE/SEM 2/DSA in C/Labs/LAB 9&10.zip' },

  // CSE SEM 2 - PHYSICS
  { subject: 'PHYSICS', sem: 2, type: 'syllabus', name: 'THEORY-PHYS1036-SEM-I II-All-SoCS-BRANCHES.pdf', link: '/resources/CSE/SEM 2/PHYSICS/THEORY-PHYS1036-SEM-I II-All-SoCS-BRANCHES (1).pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'PHYSICS.pdf', link: '/resources/CSE/SEM 2/PHYSICS/PHYSICS.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-1 - UNIT I Fibre Optics.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - UNIT I  Fibre Optics.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-1 - Lasers & Holography PPT Jan 24.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - Lasers & Holography PPT Jan 24.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-2 - EMT (3) 26 Sep.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-2 - EMT (3) 26 Sep.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-2 - Vector Calculus Sep 24.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-2 - Vector Calculus Sep 24.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-4 - Semiconductor Physics.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-4 - Semiconductor Physics (1).pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-4 - feb 24 Unit 2 AA.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-4 - feb 24 Unit 2 AA.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-1 - TUTORIAL_LASER & FIBRE OPTICS.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - TUTORIAL_LASER & FIBRE OPTICS_2025-26_SEM I @ UNIT I.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-1 - u1 tut.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - u1 tut.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-2 - TUTORIAL_EMT.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-2 - TUTORIAL_EMT_2025-26_SEM I @ UNIT II.pdf' },
  { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-3 - TUTORIAL_QUANTUM MECHANICS.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-3 - TUTORIAL_QUANTUM MECHANICS_2025-26_SEM I @ UNIT III.pdf' },

  // CSE SEM 2 - PYTHON
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP1.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP1.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP2.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP2.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP3.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP3.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP4.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP4.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP5.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP5.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP6.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP6.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP7.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP7.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP8.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP8.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP9.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP9.py' },
  { subject: 'PYTHON', sem: 2, type: 'lab', name: 'EXP10.py', link: '/resources/CSE/SEM 2/Python/EXP/EXP10.py' },
];


async function seed() {
  console.log('=== FULL RESTORE FROM FIRST COMMIT (828fb21) ===');
  console.log('Clearing existing subjects and resources...');
  
  await db.query('DELETE FROM subject_resources');
  await db.query('DELETE FROM subjects');
  await db.query('DELETE FROM branches');
  
  console.log('Inserting branches...');
  for (const name of BRANCHES) {
    await db.query('INSERT INTO branches (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [name]);
  }
  const branchRes = await db.query('SELECT id, name FROM branches ORDER BY id');
  console.log(`  ✅ ${branchRes.rows.length} branches inserted`);
  branchRes.rows.forEach(b => console.log(`     ${b.id}: ${b.name}`));
  
  console.log('Inserting subjects...');
  let totalSubjects = 0;
  for (const [branchName, semesters] of Object.entries(SUBJECTS)) {
    const b = branchRes.rows.find(r => r.name === branchName);
    if (!b) { console.warn(`  ⚠️ Branch not found: ${branchName}`); continue; }
    for (const [sem, subjects] of Object.entries(semesters)) {
      for (const name of subjects) {
        await db.query(
          'INSERT INTO subjects (branch_id, name, semester) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
          [b.id, name, parseInt(sem)]
        );
        totalSubjects++;
      }
    }
  }
  console.log(`  ✅ ${totalSubjects} subjects inserted`);

  console.log('Inserting resources...');
  let totalResources = 0;
  const cseRow = branchRes.rows.find(r => r.name === 'CSE');
  if (!cseRow) { console.error('CSE branch not found!'); process.exit(1); }

  for (const r of RESOURCES) {
    const subRes = await db.query(
      'SELECT id FROM subjects WHERE branch_id = $1 AND name = $2 AND semester = $3',
      [cseRow.id, r.subject, r.sem]
    );
    if (subRes.rows.length === 0) {
      console.warn(`  ⚠️ Subject not found: ${r.subject} sem ${r.sem}`);
      continue;
    }
    await db.query(
      'INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, $2, $3, $4)',
      [subRes.rows[0].id, r.type, r.name, r.link]
    );
    totalResources++;
  }
  console.log(`  ✅ ${totalResources} resources inserted`);

  // Final verification
  const bc = await db.query('SELECT COUNT(*) as c FROM branches');
  const sc = await db.query('SELECT COUNT(*) as c FROM subjects');
  const rc = await db.query('SELECT COUNT(*) as c FROM subject_resources');
  console.log('\n=== FINAL STATE ===');
  console.log(`Branches: ${bc.rows[0].c}`);
  console.log(`Subjects: ${sc.rows[0].c}`);
  console.log(`Resources: ${rc.rows[0].c}`);
  
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
