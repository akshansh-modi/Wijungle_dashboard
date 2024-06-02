import fs from 'fs';

fs.readFile('./src/eve.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split the data by new lines to create an array of JSON strings
  const jsonArray = data.trim().split('\n').map(line => JSON.parse(line));
  
  // Convert the array to a properly formatted JSON array string
  const formattedJson = JSON.stringify(jsonArray, null, 2);

  // Write the formatted JSON array to a new file
  fs.writeFile('./src/eve_formatted.json', formattedJson, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    console.log('File has been formatted and saved as eve_formatted.json');
  });
});
