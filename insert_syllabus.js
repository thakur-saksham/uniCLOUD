const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres.gjejqgqnlnqbckwzagov:sakshamandshaurya@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await pool.query("INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, $2, $3, $4)",
    [784, 'syllabus', 'Course Content Maths', '/resources/CSE/sem1_aem1_syllabus.pdf']);
  console.log('Inserted syllabus');
  pool.end();
}
run();
