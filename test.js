let text = `
      INSERT INTO users
         (email, password_hash, full_name, profile_picture_url, google_id, semester)
       VALUES (?, ?, ?, ?, ?, 1)`; 
let count = 1; 
let pgText = text.replace(/\?/g, () => `$${count++}`); 
if (pgText.trim().match(/^INSERT/i) && !pgText.match(/RETURNING/i)) { 
  pgText += ' RETURNING id'; 
} 
console.log(pgText);
