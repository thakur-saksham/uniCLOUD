const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres.gjejqgqnlnqbckwzagov:sakshamandshaurya@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const res = await pool.query("SELECT s.id, s.name, s.semester, b.name as branch FROM subjects s JOIN branches b ON s.branch_id=b.id WHERE b.name='CSE' AND s.semester=1");
  console.log(res.rows);
  pool.end();
}
run();
