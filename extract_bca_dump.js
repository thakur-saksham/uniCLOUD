const cheerio = require('cheerio');
const https = require('https');

https.get('https://library.ddn.upes.ac.in/questionbank/soc/bca.html', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const $ = cheerio.load(data);
    let subjects = new Set();
    
    // In these pages, tables usually have columns: Year, Course, Subject Code, Subject Name, Download
    // Let's iterate all rows and find the cell that looks like a subject name.
    // Usually subject codes are like "CSEG 1025" or "MATH 1058", and the next td is the subject name.
    
    $('tr').each((i, tr) => {
      let cols = $(tr).find('td');
      if (cols.length >= 4) {
        let text3 = $(cols[3]).text().trim().replace(/\s+/g, ' ');
        if (text3 && text3.toLowerCase() !== 'subject' && text3.toLowerCase() !== 'subject name') {
          // Exclude IoT
          if (!text3.toLowerCase().includes('iot')) {
             subjects.add(text3);
          }
        }
      } else {
        // Sometimes it's inside one cell with newlines?
        let text = $(tr).text();
        let lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        // If lines contains a subject code, the next line might be the subject.
        for(let j=0; j<lines.length; j++) {
           if (/^[A-Z]{3,4}\s*\d{3,4}$/i.test(lines[j])) {
              if (j+1 < lines.length) {
                 let subj = lines[j+1];
                 if (!subj.toLowerCase().includes('download') && !subj.toLowerCase().includes('iot')) {
                    subjects.add(subj);
                 }
              }
           }
        }
      }
    });

    console.log(Array.from(subjects).sort());
  });
});
