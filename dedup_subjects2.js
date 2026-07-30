const db = require('./db');

// Levenshtein distance function
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  var matrix = [];
  for (var i = 0; i <= b.length; i++) matrix[i] = [i];
  for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (var i = 1; i <= b.length; i++) {
    for (var j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) == a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, Math.min(matrix[i][j-1] + 1, matrix[i-1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

async function run() {
  try {
    const res = await db.query(`SELECT b.name as branch, s.id, s.name, s.semester FROM subjects s JOIN branches b ON s.branch_id = b.id WHERE b.name IN ('Chemical', 'Mechanical', 'Fire & Safety', 'Aerospace', 'BCA', 'Civil') ORDER BY b.name, s.semester`);
    const subjects = res.rows;
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
          
          let rawA = a.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          let rawB = b.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          
          let isMatch = false;
          let dist = levenshtein(rawA, rawB);
          
          // If only 1 character difference (like plural 's'), merge them
          if (rawA.length > 5 && rawB.length > 5 && dist <= 1) {
            isMatch = true;
          }
          
          if (isMatch) {
            console.log(`Merging [${a.branch} Sem ${a.semester}] ${a.name} <---> ${b.name} (Dist: ${dist})`);
            toMerge.push({ keepId: a.id, dropId: b.id });
            b.merged = true;
          }
        }
      }
    }
    
    for (let merge of toMerge) {
      await db.query(`UPDATE subject_resources SET subject_id = $1 WHERE subject_id = $2`, [merge.keepId, merge.dropId]);
      await db.query(`DELETE FROM attendance WHERE subject_id = $1`, [merge.dropId]);
      await db.query(`DELETE FROM subjects WHERE id = $1`, [merge.dropId]);
    }
    
    console.log(`Successfully merged ${toMerge.length} MORE duplicate subjects!`);
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
