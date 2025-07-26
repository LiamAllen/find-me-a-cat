// src/ReadDirectory.js
// This module reads a directory containing cat images and exports their 
// relative file paths into a JSON file named 'catImages.json' for
// use in the React application.

const { dir } = require('console');
const fs = require('fs');
const path = require('path');

function read_existing_data() {

  try {
    const data = fs.readFileSync(path.resolve(__dirname, 'catImages.json'), 'utf8');
    return JSON.parse(data);

  } catch (err) {
    console.error('Error reading existing data:', err);
    return {};

  }
}

function append_to_existing_data(oldData, newData) {
  return mergedData = Object.assign({}, oldData, newData);
}

// Define the relative path to each directory containing cat images
// and store them in an array
// Note: Ensure that the paths are correct relative to the current file's location
const relDirectoryPath = [
  '/Cat-Images-Dataset/cat images',
  '/Cat-Images-Dataset/cute cat/',
  '/Cat-Images-Dataset/domestic cat/',
  '/Cat-Images-Dataset/house cat/',
  '/Cat-Images-Dataset/pet cat/',
  '/Cat-Images-Dataset/ragdoll cat/'
];

// Use __dirname to get the absolute path of the current directory
// and join it with the relative path to the cat images directory

let index = 0;

relDirectoryPath.forEach(dirPath => {


  const directoryPath = path.join(__dirname, dirPath);
  console.log('Reading directory:', dirPath);

  const object = {}

  try {

    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      const relFilePath = path.join(dirPath.replace("/Cat-Images-Dataset", ""), file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        Object.assign(object, { [index]: relFilePath });
        index++;
      }

    });

    console.log('Total Files: ' + Object.keys(object).length);
    //console.log('Files:', object);

    try {

      try {
        const existingData = read_existing_data();

        if (Object.keys(existingData).length === 0) {
          console.log('No existing data found, creating new file.');

          // If no existing data is found, write the new data to the file

          fs.writeFileSync(path.resolve(__dirname, 'catImages.json'), JSON.stringify(object, null, 2));
          console.log('catImages.json has been created successfully.');

        } else {
          console.log('Existing data found, appending to it.');

          // If existing data is found, merge it with the new data
          // and write it back to the file

          const mergedData = append_to_existing_data(existingData, object);
          fs.writeFileSync(path.resolve(__dirname, 'catImages.json'), JSON.stringify(mergedData, null, 2));
          console.log('catImages.json has been created/updated successfully.');

        }

      } catch (readErr) {
        console.error('Error reading existing data:', readErr);

      }

    } catch (writeErr) {

      console.error('Error writing to catImages.json:', writeErr);

    }

  } catch (err) {

    console.error('Error reading directory:', err);

  }
});

// CopyRight (c) 2025 Liam Allen
// This code is licensed under the MIT License (MIT).
// You may obtain a copy of the License at
// https://opensource.org/license/mit/