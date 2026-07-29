const db = require('./db');

async function seedRealResources() {
  console.log('Seeding REAL custom resources...');
  
  // Clear any existing dummy resources again just to be safe
  await db.query('DELETE FROM subject_resources');

  const files = [
    // CSE SEM 1 - AEM1 (Applied Engineering Mathematics 1)
    { subject: 'AEM1', sem: 1, type: 'syllabus', name: 'MATH 1059 Session Plan.pdf', link: '/resources/CSE/SEM 1/MATH 1059 Session Plan.pdf' },
    { subject: 'AEM1', sem: 1, type: 'notes', name: 'Maths Assignment.pdf', link: '/resources/CSE/SEM 1/Maths Assignment.pdf' },
    { subject: 'AEM1', sem: 1, type: 'notes', name: 'Ravish R. Singh_ Mukul Bhatt - Engineering mathematics.pdf', link: '/resources/CSE/SEM 1/Ravish R. Singh_ Mukul Bhatt - Engineering mathematics _ a tutorial approach (2010, Tata McGraw Hill Education Private Ltd.) - libgen.lc.pdf' },
    { subject: 'AEM1', sem: 1, type: 'tutorial', name: 'Practice set-1_AEM-I.pdf', link: '/resources/CSE/SEM 1/Practice set-1_AEM-I.pdf' },
    { subject: 'AEM1', sem: 1, type: 'tutorial', name: 'Practice Set 2 (MATH 1059).pdf', link: '/resources/CSE/SEM 1/Practice Set 2 (MATH 1059).pdf' },
    { subject: 'AEM1', sem: 1, type: 'tutorial', name: 'Practice Set 3 -AEM I-MATH1059.pdf', link: '/resources/CSE/SEM 1/Practice Set 3 -AEM I-MATH1059.pdf' },
    { subject: 'AEM1', sem: 1, type: 'tutorial', name: 'Tutorial-0 AEM-1.pdf', link: '/resources/CSE/SEM 1/Tutorial-0 AEM-1.pdf' },
    { subject: 'AEM1', sem: 1, type: 'tutorial', name: 'Tutorial-0 AEM-1-1.pdf', link: '/resources/CSE/SEM 1/Tutorial-0 AEM-1-1.pdf' },
    { subject: 'AEM1', sem: 1, type: 'tutorial', name: 'Tutorial sheet-2.pdf', link: '/resources/CSE/SEM 1/Tutorial sheet-2.pdf' },
    { subject: 'AEM1', sem: 1, type: 'tutorial', name: 'Tutorial sheet-3 AEM-I.pdf', link: '/resources/CSE/SEM 1/Tutorial sheet-3 AEM-I.pdf' },

    // CSE SEM 1 - LINUX
    { subject: 'LINUX', sem: 1, type: 'notes', name: 'Learning Linux Shell Scripting.pdf', link: '/resources/CSE/SEM 1/Learning Linux Shell Scripting.pdf' },
    { subject: 'LINUX', sem: 1, type: 'notes', name: 'Shell Scripting.pdf', link: '/resources/CSE/SEM 1/Shell Scripting.pdf' },
    { subject: 'LINUX', sem: 1, type: 'lab', name: 'Linux Lab Courseplan.pdf', link: '/resources/CSE/SEM 1/Linux Lab Courseplan.pdf' },

    // CSE SEM 1 - PROBLEM SOLVING
    { subject: 'PROBLEM SOLVING', sem: 1, type: 'syllabus', name: 'Problem Solving_Syllabus Roland.pdf', link: '/resources/CSE/SEM 1/Problem Solving_Syllabus Roland.pdf' },
    { subject: 'PROBLEM SOLVING', sem: 1, type: 'notes', name: 'Roland C. Backhouse - Algorithmic Problem Solving.pdf', link: '/resources/CSE/SEM 1/Roland C. Backhouse - Algorithmic Problem Solving-John Wiley & Sons (2011).pdf' },

    // CSE SEM 1 - MANAGING SELF
    { subject: 'MANAGING SELF', sem: 1, type: 'notes', name: 'Workbook - Managing Self Updated.pdf', link: '/resources/CSE/SEM 1/Workbook - Managing Self Updated.pdf' },


    // CSE SEM 2 - PHYSICS
    { subject: 'PHYSICS', sem: 2, type: 'syllabus', name: 'THEORY-PHYS1036-SEM-I II-All-SoCS-BRANCHES.pdf', link: '/resources/CSE/SEM 2/PHYSICS/THEORY-PHYS1036-SEM-I II-All-SoCS-BRANCHES (1).pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'PHYSICS.pdf', link: '/resources/CSE/SEM 2/PHYSICS/PHYSICS.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-1 - UNIT I Fibre Optics.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - UNIT I  Fibre Optics.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-1 - Lasers & Holography PPT Jan 24.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - Lasers & Holography PPT Jan 24.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-2 - EMT (3) 26 Sep.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-2 - EMT (3) 26 Sep.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-2 - Vector Calculus Sep 24.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-2 - Vector Calculus Sep 24.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-4 - Semiconductor Physics (1).pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-4 - Semiconductor Physics (1).pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'notes', name: 'UNIT-4 - feb 24 Unit 2 AA.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-4 - feb 24 Unit 2 AA.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'tutorial', name: 'UNIT-1 - TUTORIAL_LASER & FIBRE OPTICS.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - TUTORIAL_LASER & FIBRE OPTICS_2025-26_SEM I @ UNIT I.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'tutorial', name: 'UNIT-1 - u1 tut.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-1 - u1 tut.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'tutorial', name: 'UNIT-2 - TUTORIAL_EMT.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-2 - TUTORIAL_EMT_2025-26_SEM I @ UNIT II.pdf' },
    { subject: 'PHYSICS', sem: 2, type: 'tutorial', name: 'UNIT-3 - TUTORIAL_QUANTUM MECHANICS.pdf', link: '/resources/CSE/SEM 2/PHYSICS/UNIT-3 - TUTORIAL_QUANTUM MECHANICS_2025-26_SEM I @ UNIT III.pdf' },

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

    // CSE SEM 2 - DE (Using the generic ones in SEM 2 that don't fit AIML)
    { subject: 'DE', sem: 2, type: 'notes', name: 'Linked List.pdf', link: '/resources/CSE/SEM 2/Linked List.pdf' },
    { subject: 'DE', sem: 2, type: 'notes', name: 'Sorting Techniques.pdf', link: '/resources/CSE/SEM 2/Sorting Techniques.pdf' },
    { subject: 'DE', sem: 2, type: 'notes', name: 'Stack Data Structure.pdf', link: '/resources/CSE/SEM 2/Stack Data Structure.pdf' },
    { subject: 'DE', sem: 2, type: 'notes', name: 'Tree.pdf', link: '/resources/CSE/SEM 2/Tree.pdf' },

    // CSE SEM 2 - DSA IN C
    { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Dijkstras Algorithm.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Dijkstras Algorithm.pdf' },
    { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Graph Representations and Traversal.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Graph Representations and Traversal.pdf' },
    { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Hashing and Hash Functions.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Hashing and Hash Functions.pdf' },
    { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Introduction to Graph and Terminology.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Introduction to Graph and Terminology.pdf' },
    { subject: 'DSA IN C', sem: 2, type: 'notes', name: 'Kruskals and Prims Algorithms.pdf', link: '/resources/CSE/SEM 2/dsa-notes-graphs and hashing/Kruskals and Prims Algorithms.pdf' },
    
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
  ];

  let totalInserted = 0;
  for (const f of files) {
    // get subject id
    const res = await db.query('SELECT id FROM subjects WHERE name = $1 AND semester = $2', [f.subject, f.sem]);
    if (res.rows.length === 0) {
      console.log('Skipping missing subject:', f.subject);
      continue;
    }
    const sid = res.rows[0].id;
    
    // allow 'tutorial' since we added it to CHECK constraint
    await db.query(
      'INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, $2, $3, $4)',
      [sid, f.type, f.name, f.link]
    ).catch(e => {
        // Fallback for tutorial constraint issue
        if(f.type === 'tutorial') {
           return db.query('INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, $2, $3, $4)', [sid, 'notes', f.name, f.link])
        } else {
           throw e;
        }
    });
    totalInserted++;
  }

  console.log(`✅ Real Seeded ${totalInserted} actual user files!`);
  process.exit(0);
}

seedRealResources().catch(console.error);
