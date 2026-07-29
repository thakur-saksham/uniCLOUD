const cheerio = require('cheerio');
const https = require('https');
const db = require('./db');

// We need to parse Roman numerals from the header to get the semester
function parseSemester(text) {
  if (text.includes('SEM-I') || text.includes('SEM-1')) return 1;
  if (text.includes('SEM-II') || text.includes('SEM-2')) return 2;
  if (text.includes('SEM-III') || text.includes('SEM-3')) return 3;
  if (text.includes('SEM-IV') || text.includes('SEM-4')) return 4;
  if (text.includes('SEM-V') || text.includes('SEM-5')) return 5;
  if (text.includes('SEM-VI') || text.includes('SEM-6')) return 6;
  if (text.includes('SEM-VII') || text.includes('SEM-7')) return 7;
  if (text.includes('SEM-VIII') || text.includes('SEM-8')) return 8;
  return null;
}

// Title case helper
function titleCase(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

async function run() {
  https.get('https://library.ddn.upes.ac.in/questionbank/soc/btech_AI.html', (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', async () => {
      const $ = cheerio.load(data);
      let currentSemester = null;
      let pyqsToInsert = [];

      $('tr').each((i, el) => {
        const text = $(el).text();
        
        // Check for semester header
        if (text.includes('B.Tech Computer Science') && text.includes('SEM-')) {
          const sem = parseSemester(text);
          if (sem) currentSemester = sem;
        }

        const tds = $(el).find('td');
        if (tds.length >= 5 && currentSemester) {
          const year = $(tds[0]).text().trim();
          const name = $(tds[3]).text().trim();
          const link = $(tds[4]).find('a').attr('href');
          
          if (link && link.toLowerCase().includes('.pdf')) {
            pyqsToInsert.push({ semester: currentSemester, year, name: titleCase(name), link });
          }
        }
      });

      console.log(`Extracted ${pyqsToInsert.length} PYQs from the webpage.`);
      
      try {
        // Fetch CSE branch id
        const branchRes = await db.query("SELECT id FROM branches WHERE name = 'CSE'");
        if (branchRes.rows.length === 0) throw new Error("CSE branch not found");
        const branchId = branchRes.rows[0].id;

        // Fetch all CSE subjects
        const subjectsRes = await db.query("SELECT id, name, semester FROM subjects WHERE branch_id = $1", [branchId]);
        const subjects = subjectsRes.rows;

        let insertedCount = 0;

        for (let pyq of pyqsToInsert) {
          // Find a matching subject in the DB for this semester.
          // The PYQ name might be slightly different from our DB subject name (e.g., "Physics for Computer Engineers" vs "Physics").
          // We will do a basic matching: if DB subject name is contained in PYQ name or vice versa.
          let matchedSubject = subjects.find(s => 
            s.semester === pyq.semester &&
            (pyq.name.toLowerCase().includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(pyq.name.toLowerCase()))
          );

          if (matchedSubject) {
            // Check if this PYQ is already in the DB
            const check = await db.query("SELECT id FROM subject_resources WHERE subject_id = $1 AND link = $2", [matchedSubject.id, pyq.link]);
            if (check.rows.length === 0) {
              const resourceName = `${pyq.year} - ${pyq.name}`;
              await db.query(
                "INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, 'pyq', $2, $3)",
                [matchedSubject.id, resourceName, pyq.link]
              );
              insertedCount++;
            }
          } else {
             // If no exact match, let's just create a new subject! 
             // Wait, the user already provided the subjects list for CSE previously!
             // We can just insert the pyq into the closest subject if possible. Let's create the subject if it doesn't exist, as it's safe.
             // Wait, let's just insert it as a new subject.
             const newSubjRes = await db.query("INSERT INTO subjects (branch_id, name, semester) VALUES ($1, $2, $3) ON CONFLICT (branch_id, name, semester) DO UPDATE SET name=EXCLUDED.name RETURNING id", [branchId, pyq.name, pyq.semester]);
             const newSubjId = newSubjRes.rows[0].id;

             const check = await db.query("SELECT id FROM subject_resources WHERE subject_id = $1 AND link = $2", [newSubjId, pyq.link]);
             if (check.rows.length === 0) {
               const resourceName = `${pyq.year} PYQ`;
               await db.query(
                 "INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, 'pyq', $2, $3)",
                 [newSubjId, resourceName, pyq.link]
               );
               insertedCount++;
             }
          }
        }
        console.log(`Inserted ${insertedCount} new PYQs into the database for CSE.`);
        process.exit(0);
      } catch (err) {
        console.error("Database error:", err);
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('HTTP GET Error:', err);
    process.exit(1);
  });
}

run();
