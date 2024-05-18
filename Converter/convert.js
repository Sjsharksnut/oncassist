const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Get the current directory of the script
const currentDir = __dirname;

// Get file paths from command-line arguments or use default paths
const inputFilePath = process.argv[2] || path.join(currentDir, '/Users/baileymendel/Desktop/OncAssistdesktop/test30.csv');
const outputFilePath = process.argv[3] || path.join(currentDir, 'output.json');

const data = [];

// Ensure the input file exists
if (!fs.existsSync(inputFilePath)) {
  console.error(`Input file not found: ${inputFilePath}`);
  process.exit(1);
}

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    data.push(row);
  })
  .on('end', () => {
    try {
      fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
      console.log('JSON file generated successfully.');
    } catch (error) {
      console.error(`Error writing to output file: ${error.message}`);
    }
  })
  .on('error', (error) => {
    console.error(`Error reading the CSV file: ${error.message}`);
  });
