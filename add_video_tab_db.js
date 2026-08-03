const db = require('./db');

async function run() {
  try {
    console.log("Updating database schema for video tab support...");
    await db.query("ALTER TABLE subject_resources DROP CONSTRAINT IF EXISTS subject_resources_type_check");
    await db.query("ALTER TABLE subject_resources ADD CONSTRAINT subject_resources_type_check CHECK(type IN ('syllabus','notes','lab','pyq','tutorial','video','videos'))");
    console.log("Successfully updated check constraint on subject_resources.");

    const cseRes = await db.query("SELECT id FROM branches WHERE name='CSE'");
    if (cseRes.rows.length === 0) {
      console.log("CSE branch not found!");
      return;
    }
    const cseId = cseRes.rows[0].id;
    const subs = await db.query("SELECT id, name, semester FROM subjects WHERE branch_id=$1 AND semester IN (1, 2)", [cseId]);
    
    console.log("CSE Sem 1 & 2 subjects found:", subs.rows);

    // Curated high-quality video tutorials & lecture series for standard engineering subjects
    const videoMap = {
      "AEM I": [
        { name: "Engineering Mathematics I - Gajendra Purohit Complete Playlist", link: "https://www.youtube.com/c/GajendraPurohitMathematics" },
        { name: "NPTEL Engineering Mathematics I", link: "https://nptel.ac.in/" }
      ],
      "Physics": [
        { name: "Engineering Physics - Quantum Mechanics & Fiber Optics", link: "https://www.youtube.com/@PhysicsbyTK" }
      ],
      "Programming for Problem Solving": [
        { name: "C Programming Language - Complete Tutorial (CodeWithHarry)", link: "https://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR" },
        { name: "C Language Advanced Concepts & Pointers", link: "https://www.youtube.com/c/AbdulBari" }
      ],
      "EVS": [
        { name: "Environmental Sustainability & Climate Change Lectures", link: "https://www.youtube.com/@NPTEL-NOC" }
      ],
      "AEM II": [
        { name: "Engineering Mathematics II - Vector Calculus & ODEs", link: "https://www.youtube.com/c/GajendraPurohitMathematics" }
      ],
      "DE": [
        { name: "Digital Electronics Complete Playlist - Gate Smashers", link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3-Jo3c_V0A5bT2N80" },
        { name: "Digital Logic Design - Neso Academy", link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3-Jo3c_V0A5bT2N80" }
      ],
      "DSA In C": [
        { name: "Data Structures & Algorithms in C - Gate Smashers", link: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaNaNWL5G3_5R618w7DGI" },
        { name: "DSA Complete Playlist - Abdul Bari", link: "https://www.youtube.com/c/AbdulBari" },
        { name: "Data Structures in C - CodeWithHarry", link: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi" }
      ],
      "Elements of AIML": [
        { name: "Artificial Intelligence & Machine Learning Basics - Andrew Ng", link: "https://www.youtube.com/@DeepLearningAI" },
        { name: "Introduction to Machine Learning - Gate Smashers", link: "https://www.youtube.com/c/GateSmashers" }
      ]
    };

    for (const sub of subs.rows) {
      const vids = videoMap[sub.name] || [
        { name: `${sub.name} - Complete Video Lecture Playlist`, link: "https://www.youtube.com" }
      ];
      for (const v of vids) {
        // Check if video link already exists
        const chk = await db.query("SELECT 1 FROM subject_resources WHERE subject_id=$1 AND type='video' AND name=$2", [sub.id, v.name]);
        if (chk.rows.length === 0) {
          await db.query("INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, 'video', $2, $3)", [sub.id, v.name, v.link]);
          console.log(`Added video to Sem ${sub.semester} ${sub.name}: ${v.name}`);
        }
      }
    }
    console.log("Videos added successfully!");

  } catch(err) {
    console.error("Error:", err);
  } finally {
    process.exit(0);
  }
}

run();
