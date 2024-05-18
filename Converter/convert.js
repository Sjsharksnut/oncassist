const csv = require('csv-parser');
const fs = require('fs');

const data = [];

fs.createReadStream('/Users/baileymendel/Desktop/OncAssistdesktop/liquidbiopsy1.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
    console.log('JSON file generated successfully.');
  });
