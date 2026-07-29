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
  },
  Civil: {
    1: ['Mathematics I','Physics','Chemistry','Engineering Mechanics','English Communication'],
    2: ['Mathematics II','Programming in C','Basic Electrical Engineering','Engineering Graphics','Environmental Science'],
    3: ['Solid Mechanics','Fluid Mechanics','Surveying','Building Materials','Engineering Geology'],
    4: ['Structural Analysis I','Concrete Technology','Hydraulics','Soil Mechanics','Transportation Engg I'],
    5: ['Structural Analysis II','Design of RC Structures','Environmental Engg I','Foundation Engg','Transportation Engg II'],
    6: ['Design of Steel Structures','Environmental Engg II','Irrigation Engg','Construction Management','Elective I'],
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

async function seed() {
  console.log('Starting seed of FULL custom subjects...');
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
