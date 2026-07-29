const cheerio = require('cheerio');
const https = require('https');
const db = require('./db');

const TARGETS = [
  { url: 'https://library.ddn.upes.ac.in/questionbank/soc/btech_AI.html', branch: 'CSE' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_ase.html', branch: 'Aerospace' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_civil.html', branch: 'Civil' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_chemical.html', branch: 'Chemical' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_fse.html', branch: 'Fire & Safety' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soc/bca.html', branch: 'BCA' },
  { url: 'https://library.ddn.upes.ac.in/questionbank/soe/btech_mechanical.html', branch: 'Mechanical' }
];

function parseSemester(text) {
  const t = text.toUpperCase();
  if (t.includes('SEM-VIII') || t.includes('SEM-8')) return 8;
  if (t.includes('SEM-VII') || t.includes('SEM-7')) return 7;
  if (t.includes('SEM-VI') || t.includes('SEM-6')) return 6;
  if (t.includes('SEM-IV') || t.includes('SEM-4')) return 4;
  if (t.includes('SEM-V') || t.includes('SEM-5')) return 5;
  if (t.includes('SEM-III') || t.includes('SEM-3')) return 3;
  if (t.includes('SEM-II') || t.includes('SEM-2')) return 2;
  if (t.includes('SEM-I') || t.includes('SEM-1')) return 1;
  return null;
}

function titleCase(str) {
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

async function scrapeUrl(target) {
  return new Promise(async (resolve, reject) => {
    try {
      const branchRes = await db.query("SELECT id FROM branches WHERE name = $1", [target.branch]);
      if (branchRes.rows.length === 0) {
          console.log(`${target.branch} branch not found`);
          return resolve();
      }
      const branchId = branchRes.rows[0].id;
      const subjectsRes = await db.query("SELECT id, name, semester FROM subjects WHERE branch_id = $1", [branchId]);
      let subjects = subjectsRes.rows;

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
          
          let insertedCount = 0;

const mapper = require('./scraper_mapper');

          for (let pyq of pyqsToInsert) {
            const AUTO_BRANCHES = ['BCA', 'Mechanical', 'Fire & Safety', 'Chemical'];
            
            if (AUTO_BRANCHES.includes(target.branch)) {
               const mappedName = mapper.normalizeName(target.branch, pyq.semester, pyq.name);
               if (mappedName === null) {
                  // Drop this PYQ completely (it's an elective or unmapped)
                  continue;
               }
               pyq.name = mappedName;
            }

            const ALIASES = {
              "aem1": ["advanced engineering mathematics-i", "advanced engineering mathematics - 1", "advanced engineering mathematics -1", "advanced engineering mathematics", "engineering mathematics-i", "engineering mathematics - i", "engineering mathematics - 1"],
              "aem2": ["advanced engineering mathematics-ii", "advanced engineering mathematics - 2", "advanced engineering mathematics -2", "engineering mathematics-ii", "engineering mathematics - ii", "engineering mathematics - 2", "engineering mathematics ii"],
              "aem i": ["advanced engineering mathematics-i", "advanced engineering mathematics - 1", "advanced engineering mathematics -1", "advanced engineering mathematics", "engineering mathematics-i", "engineering mathematics - i", "engineering mathematics - 1"],
              "aem ii": ["advanced engineering mathematics-ii", "advanced engineering mathematics - 2", "advanced engineering mathematics -2", "engineering mathematics-ii", "engineering mathematics - ii", "engineering mathematics - 2", "engineering mathematics ii"],
              "c": ["programming in c", "principles of programming languages"],
              "de": ["digital electronics"],
              "evs": ["environmental", "environment studies"],
              "physics": ["physics for computer", "engineering physics", "physics"],
              "dsa in c": ["data structure", "data structures"],
              "python": ["programming with python", "python programming"],
              "elements of aiml": ["elements of ai", "artificial intelligence"],
              "computer organization and architecture": ["computer organization"],
              "design and analysis of algorithms": ["design and analysis"],
              "operating systems": ["operating system"],
              "programming for engineers": ["programming in c", "principles of programming languages", "programming for engineers"],
              "basic electrical and electronics eng": ["basic electrical", "electrical and electronics"],
              "intro to aerospace eng": ["introduction to aerospace", "intro to aerospace"],
              "aircraft system and instruments": ["aircraft system"],
              "computation techniques": ["computational techniques", "computation techniques"],
              "intro to thermo": ["thermodynamics"],
              "heat transfer for aerospace": ["heat transfer"],
              "workshop practice": ["workshop practice"],
              "oop": ["object oriented programming"],
              "elements of hydraulic eng": ["hydraulic engineering", "hydraulic eng"],
              "water supply and sanitation": ["water supply"],
              "green building and energy efficiency": ["green building"],
              "computer aided civil eng design lab": ["computer aided civil"],
              "strength of material": ["strength of material", "strength of materials"],
              "intro to chemical eng": ["introduction to chemical", "intro to chemical"],
              "surveying and remote sensing": ["surveying", "remote sensing"]
            };

            let matchedSubject = subjects.find(s => {
              if (s.semester !== pyq.semester) return false;
              let dbName = s.name.toLowerCase();
              let pyqName = pyq.name.toLowerCase();
              
              if (pyqName === dbName) return true;
              if (dbName.length > 3 && pyqName.includes(dbName)) return true;
              
              if (ALIASES[dbName]) {
                for (let alias of ALIASES[dbName]) {
                  if (pyqName.includes(alias)) return true;
                }
              }
              return false;
            });

            if (!matchedSubject) {
              console.log(`Missing subject in DB for ${pyq.name} (Sem ${pyq.semester}), dropping PYQ...`);
              continue;
            }
            
            const subjectIdToUse = matchedSubject.id;
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
    } catch(err) {
       reject(err);
    }
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
