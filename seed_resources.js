const db = require('./db');

async function seedResources() {
  console.log('Seeding mock resources for all subjects...');
  
  // Get all subjects
  const res = await db.query('SELECT id, name FROM subjects');
  const subjects = res.rows;
  
  let totalInserted = 0;
  
  for (const subject of subjects) {
    const sid = subject.id;
    const name = subject.name;
    
    // Check if resources already exist to prevent duplicates
    const existing = await db.query('SELECT count(*) as c FROM subject_resources WHERE subject_id = $1', [sid]);
    if (parseInt(existing.rows[0].c, 10) > 0) continue;

    // Create realistic dummy resources
    const resources = [
      { type: 'syllabus', name: `${name} Official Syllabus 2024`, link: '#' },
      
      { type: 'notes', name: 'Unit 1 Handwritten Notes (Topper)', link: '#' },
      { type: 'notes', name: 'Unit 2 & 3 Condensed Notes', link: '#' },
      { type: 'notes', name: 'Professor Lecture Slides Complete', link: '#' },
      
      { type: 'lab', name: 'Official Lab Manual', link: '#' },
      { type: 'lab', name: 'Experiment 1-5 Readings & Viva Qs', link: '#' },
      
      { type: 'pyq', name: '2023 End Semester Paper', link: '#' },
      { type: 'pyq', name: '2022 End Semester Paper', link: '#' },
      { type: 'pyq', name: 'Midterm Question Bank (Solved)', link: '#' }
    ];
    
    for (const r of resources) {
      await db.query(
        'INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, $2, $3, $4)',
        [sid, r.type, r.name, r.link]
      );
      totalInserted++;
    }
  }
  
  console.log(`✅ Seeded ${totalInserted} files across ${subjects.length} subjects!`);
  process.exit(0);
}

seedResources().catch(console.error);
