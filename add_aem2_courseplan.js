const fs = require('fs');
const path = require('path');
const db = require('./db');

async function run() {
  try {
    const srcPath = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\66b1e802-333d-47e6-8bcd-45445bc973db\\.user_uploaded\\media__1785722321063.pdf';
    const destDir = path.join(__dirname, 'resources', 'CSE');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    
    const destFile = 'AEM_II_Courseplan.pdf';
    const destPath = path.join(destDir, destFile);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    } else {
      console.error("Source file not found at:", srcPath);
    }
    
    const link = `/resources/CSE/${destFile}`;
    const name = "AEM II Courseplan";
    
    // Find AEM II subject ID
    const cseRes = await db.query("SELECT id FROM branches WHERE name='CSE'");
    const cseId = cseRes.rows[0].id;
    const subRes = await db.query("SELECT id FROM subjects WHERE branch_id=$1 AND name='AEM II'", [cseId]);
    
    if (subRes.rows.length === 0) {
      console.error("AEM II subject not found in DB!");
      return;
    }
    
    const subId = subRes.rows[0].id;
    
    // Clean up existing duplicate if any, then insert
    await db.query("DELETE FROM subject_resources WHERE subject_id=$1 AND type='syllabus'", [subId]);
    await db.query("INSERT INTO subject_resources (subject_id, type, name, link) VALUES ($1, 'syllabus', $2, $3)", [subId, name, link]);
    console.log(`Successfully added AEM II Courseplan (Syllabus) for subject ID ${subId}.`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit(0);
  }
}

run();
