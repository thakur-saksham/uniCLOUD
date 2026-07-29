const db = require('./db');
const pg = require('pg');

async function seedResourcesFast() {
  console.log('Seeding mock resources FAST...');
  await db.query('DELETE FROM subject_resources'); // start clean

  const res = await db.query('SELECT id, name FROM subjects');
  const subjects = res.rows;
  
  let values = [];
  let placeholders = [];
  let pIdx = 1;

  for (const subject of subjects) {
    const sid = subject.id;
    const name = subject.name;
    
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
      placeholders.push(`($${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++})`);
      values.push(sid, r.type, r.name, r.link);
    }
  }

  // Batch insert
  const batchSize = 1000; // placeholders
  for (let i = 0; i < placeholders.length; i += 250) {
    const chunkPlaceholders = placeholders.slice(i, i + 250);
    const chunkValues = values.slice(i * 4, (i + 250) * 4);
    
    // adjust placeholder numbers for chunk
    let adjustedPlaceholders = [];
    let localIdx = 1;
    for (let j = 0; j < chunkPlaceholders.length; j++) {
      adjustedPlaceholders.push(`($${localIdx++}, $${localIdx++}, $${localIdx++}, $${localIdx++})`);
    }

    const query = `INSERT INTO subject_resources (subject_id, type, name, link) VALUES ${adjustedPlaceholders.join(', ')}`;
    await db.query(query, chunkValues);
  }

  console.log(`✅ Fast Seeded ${placeholders.length} files across ${subjects.length} subjects!`);
  process.exit(0);
}

seedResourcesFast().catch(console.error);
