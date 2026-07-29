const cheerio = require('cheerio');
const https = require('https');
const db = require('./db');

const TARGETS = [
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_ase.html', branch: 'Aerospace' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_civil.html', branch: 'Civil' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_chemical.html', branch: 'Chemical' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_fse.html', branch: 'Fire & Safety' }
];

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

function titleCase(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

async function scrapeUrl(target) {
  return new Promise((resolve, reject) => {
    https.get(target.url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', async () => {
        try {
          const $ = cheerio.load(data);
          let currentSemester = null;
          let pyqsToInsert = [];

          $('tr').each((i, el) => {
            const text = $(el).text();
            
            if (text.includes('SEM-')) {
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

          console.log(`Extracted ${pyqsToInsert.length} PYQs for ${target.branch}.`);
          
          const branchRes = await db.query("SELECT id FROM branches WHERE name = $1", [target.branch]);
          if (branchRes.rows.length === 0) throw new Error(`${target.branch} branch not found`);
          const branchId = branchRes.rows[0].id;

          const subjectsRes = await db.query("SELECT id, name, semester FROM subjects WHERE branch_id = $1", [branchId]);
          const subjects = subjectsRes.rows;

          let insertedCount = 0;

          for (let pyq of pyqsToInsert) {
            let matchedSubject = subjects.find(s => 
              s.semester === pyq.semester &&
              (pyq.name.toLowerCase().includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(pyq.name.toLowerCase()))
            );

            let subjectIdToUse;

            if (matchedSubject) {
              subjectIdToUse = matchedSubject.id;
            } else {
              const newSubjRes = await db.query("INSERT INTO subjects (branch_id, name, semester) VALUES ($1, $2, $3) ON CONFLICT (branch_id, name, semester) DO UPDATE SET name=EXCLUDED.name RETURNING id", [branchId, pyq.name, pyq.semester]);
              subjectIdToUse = newSubjRes.rows[0].id;
              subjects.push({ id: subjectIdToUse, name: pyq.name, semester: pyq.semester });
            }

            const check = await db.query("SELECT id FROM subject_resources WHERE subject_id = $1 AND link = $2", [subjectIdToUse, pyq.link]);
            if (check.rows.length === 0) {
              const resourceName = `${pyq.year} - ${pyq.name}`;
              await db.query(
                "INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, 'pyq', $2, $3)",
                [subjectIdToUse, resourceName, pyq.link]
              );
              insertedCount++;
            }
          }
          console.log(`Inserted ${insertedCount} new PYQs for ${target.branch}.`);
          resolve();
        } catch(err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function runAll() {
  for (const target of TARGETS) {
    try {
      await scrapeUrl(target);
    } catch (e) {
      console.error(`Error scraping ${target.branch}:`, e);
    }
  }
  process.exit(0);
}

runAll();
