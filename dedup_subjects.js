const db = require('./db');

async function run() {
  try {
    const res = await db.query(`SELECT b.name as branch, s.id, s.name, s.semester FROM subjects s JOIN branches b ON s.branch_id = b.id WHERE b.name IN ('Chemical', 'Mechanical', 'Fire & Safety') ORDER BY b.name, s.semester`);
    const subjects = res.rows;
    
    // Group by branch and semester
    let groups = {};
    for (let s of subjects) {
      let key = `${s.branch}_${s.semester}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(s);
    }
    
    let toMerge = [];
    
    for (let key in groups) {
      let group = groups[key];
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          let a = group[i];
          let b = group[j];
          if (a.merged || b.merged) continue;
          
          let nameA = a.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          let nameB = b.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          
          let rawA = a.name.toLowerCase().replace(/\s+/g, ' ').trim();
          let rawB = b.name.toLowerCase().replace(/\s+/g, ' ').trim();
          
          let isMatch = false;
          
          if (nameA === nameB) {
            isMatch = true;
          } else if (rawA.includes('mathematics ii') && rawB.includes('mathematics ii')) {
            isMatch = true;
          } else if (rawA === 't & m' || rawB === 't & m' || rawA === 't&m' || rawB === 't&m') {
            if (rawA.includes('time') || rawB.includes('time')) isMatch = true;
            if (rawA.includes('measuring') || rawB.includes('measuring')) isMatch = true;
            if (rawA.includes('measurement') || rawB.includes('measurement')) isMatch = true;
          } else if (rawA.includes(rawB) && rawB.length > 5) {
            isMatch = true;
          } else if (rawB.includes(rawA) && rawA.length > 5) {
            isMatch = true;
          }
          
          // Custom fixes for "t & m", "time and measuring" etc
          if (rawA.includes('time and measur') && rawB === 't & m') isMatch = true;
          if (rawB.includes('time and measur') && rawA === 't & m') isMatch = true;

          // Abbreviations e.g. TQM and Total Quality Management
          let getAbbr = (str) => str.split(/[\s&]+/).filter(w=>w.length>0).map(w=>w[0]).join('').toLowerCase();
          if (!isMatch && getAbbr(rawA) === rawB && rawB.length >= 3) isMatch = true;
          if (!isMatch && getAbbr(rawB) === rawA && rawA.length >= 3) isMatch = true;
          
          // Specific rule for Mathematics
          if (rawA.replace(' mathematics', ' mathematics ') === rawB || rawB.replace(' mathematics', ' mathematics ') === rawA) isMatch = true;

          if (isMatch) {
            console.log(`Merging [${a.semester}] ${a.name} <---> ${b.name}`);
            toMerge.push({ keepId: a.id, dropId: b.id });
            b.merged = true;
          }
        }
      }
    }
    
    // Execute merges
    for (let merge of toMerge) {
      await db.query(`UPDATE subject_resources SET subject_id = $1 WHERE subject_id = $2`, [merge.keepId, merge.dropId]);
      await db.query(`DELETE FROM attendance WHERE subject_id = $1`, [merge.dropId]);
      await db.query(`DELETE FROM subjects WHERE id = $1`, [merge.dropId]);
    }
    
    console.log(`Successfully merged ${toMerge.length} duplicate subjects!`);
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
