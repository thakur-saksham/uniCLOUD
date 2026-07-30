const cheerio = require('cheerio');
const https = require('https');

https.get('https://library.ddn.upes.ac.in/questionbank/soc/bca.html', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const $ = cheerio.load(data);
    let subjectsBySem = { 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set() };
    
    // Find semester headers
    $('h1, h2, h3, h4, h5, h6, strong').each((i, el) => {
      let text = $(el).text().trim().toLowerCase();
      let semMatch = text.match(/semester\s*(-|:)?\s*([1-4i]+)/) || text.match(/sem\s*(-|:)?\s*([1-4i]+)/);
      if (semMatch) {
        let semStr = semMatch[2];
        let sem = 1;
        if (semStr === '1' || semStr === 'i') sem = 1;
        if (semStr === '2' || semStr === 'ii') sem = 2;
        if (semStr === '3' || semStr === 'iii') sem = 3;
        if (semStr === '4' || semStr === 'iv') sem = 4;
        
        // Find the table that follows this header
        let table = $(el).closest(':has(table)').find('table').first();
        if ($(el).nextAll('table').length > 0) {
            table = $(el).nextAll('table').first();
        } else if ($(el).parent().nextAll('table').length > 0) {
            table = $(el).parent().nextAll('table').first();
        } else if ($(el).parent().parent().nextAll('table').length > 0) {
            table = $(el).parent().parent().nextAll('table').first();
        }

        if (table.length > 0) {
          table.find('tr').each((j, tr) => {
            let cols = $(tr).find('td');
            if (cols.length >= 2) {
              let subj = $(cols[1]).text().trim();
              if (subj && subj.toLowerCase() !== 'subject' && !subj.toLowerCase().includes('iot')) {
                subjectsBySem[sem].add(subj);
              }
            }
          });
        }
      }
    });

    console.log("Sem 1:", Array.from(subjectsBySem[1]));
    console.log("Sem 2:", Array.from(subjectsBySem[2]));
    console.log("Sem 3:", Array.from(subjectsBySem[3]));
    console.log("Sem 4:", Array.from(subjectsBySem[4]));

  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
