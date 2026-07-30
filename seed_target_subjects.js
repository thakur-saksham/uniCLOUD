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
  },
  'B.Tech Applied Petroleum Engineering – Gas Stream': {
    1: ['Mathematics I', 'Physics I', 'Chemistry I', 'Programming for Engineers', 'Basic Electrical & Electronics Engineering', 'Workshop Practices'],
    2: ['Mathematics II', 'Physics II', 'Chemistry', 'Engineering Graphics', 'Workshop Practices', 'Basic Electrical & Electronics Engineering', 'Introduction to Geology'],
    3: ['Engineering Thermodynamics', 'Fluid Mechanics', 'Material & Energy Balance Computations', 'Petroleum Engineering Fundamentals', 'Sedimentary and Petroleum Geology', 'Mathematics III', 'Engineering Mechanics'],
    4: ['Natural Gas Engineering', 'Mass Transfer', 'Heat Transfer', 'Chemical Engineering Thermodynamics-II', 'Drilling Technology', 'Reservoir Engineering I', 'Geophysics']
  },
  'B.Sc (Hons) - Chemistry': {
    1: ['Inorganic Chemistry I', 'Physical Chemistry I', 'Linear Algebra', 'Geology GE', 'Physics GE', 'Environmental Science'],
    2: ['Organic Chemistry-I', 'Physical Chemistry-II', 'Analytical Chemistry', 'Calculus', 'Physics GE', 'Constitution and Indian Polity', 'English Communication'],
    3: ['Physical Chemistry III', 'Organic Chemistry II', 'Inorganic Chemistry II', 'Fuel/Pesticide Chemistry', 'Elements of Modern Physics', 'Differential Equations'],
    4: ['Physical Chemistry IV', 'Organic Chemistry III', 'Inorganic Chemistry-III', 'Pharmaceutical/Analytical Chemistry', 'Nuclear and Particle Physics', 'Numerical Methods / Probability & Statistics']
  },
  'B.Sc (Hons) - Geology': {
    1: ['Mineral Science', 'Earth System Science', 'Chemistry GE', 'Linear Algebra', 'Physics GE', 'Information Security / Computer Programming'],
    2: ['Igneous Petrology', 'Sedimentary Petrology', 'Structural Geology / Elements of Geochemistry', 'Chemistry GE', 'Physics GE', 'Calculus', 'Environmental Science'],
    3: ['Metamorphic Petrology', 'Structural Geology', 'Elements of Geochemistry', 'Palaeontology', 'Chemistry GE', 'Physics GE', 'Differential Equations'],
    4: ['Hydrogeology', 'Remote Sensing and GIS', 'Stratigraphic Principles and Indian Stratigraphy', 'Paleontology / Metamorphic Petrology', 'Chemistry GE', 'Physics GE', 'Math GE']
  },
  'B.Sc (Hons) - Mathematics': {
    1: ['Differential Calculus', 'Linear Algebra I', 'Chemistry GE', 'Physics GE', 'Geology GE', 'Environmental Science'],
    2: ['Real Analysis I', 'Linear Algebra-II', 'Analytical Geometry', 'Integral Calculus', 'Chemistry GE', 'Physics GE', 'Constitution and Indian Polity / English Communication'],
    3: ['Ordinary Differential Equations', 'Complex Analysis', 'Analytical Geometry', 'Logic and Sets', 'Group Theory I', 'Theory of Real Functions', 'Chemistry/Physics GE'],
    4: ['Real Analysis II', 'Partial Differential Equations', 'Graph Theory', 'Probability & Statistics', 'Ring Theory and Linear Algebra I', 'Complex Analysis', 'Chemistry/Physics/Geology GE']
  },
  'B.Sc (Hons) - Physics': {
    1: ['Mathematical Physics-I', 'Mechanics', 'Linear Algebra I', 'Chemistry GE', 'Geology GE', 'Introduction to Metrology', 'Environmental Science'],
    2: ['Mathematical Physics II', 'Thermal Physics', 'Electricity and Magnetism', 'Waves & Optics', 'Chemistry GE', 'Calculus', 'Constitution and Indian Polity / English Communication'],
    3: ['Waves & Optics', 'Elements of Modern Physics', 'Analog & Digital Systems and Applications', 'Computational Physics', 'Thermal Physics', 'Differential Equations', 'Chemistry GE'],
    4: ['Mathematical Physics III', 'Solid State Physics', 'Statistical Physics', 'Radiation Safety', 'Math GE', 'Chemistry GE', 'Digital Systems / MATLAB']
  },
  'B.Sc (CSE)': {
    1: ['Mathematical Sciences-I', 'Digital Electronics', 'Programming in C'],
    2: ['Mathematical Sciences-II', 'OOPs Using C++'],
    3: ['Databases', 'Discrete Mathematics & Linear Algebra', 'Design and Analysis of Algorithms', 'Elements of AIML'],
    4: ['Information Technology and Cyber Security', 'Fundamentals of Data Science', 'Applied Machine Learning', 'Probability, Computing and Statistics', 'Operating Systems', 'Computer Organization and Architecture']
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
