import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { BASE_URL, REPO_URL } = process.env;
const __dirname = path.resolve();

if (!BASE_URL || !REPO_URL) {
  console.error("Please define BASE_URL and REPO_URL in your .env file.");
  process.exit(1);
}

// Read .astro files from the pages folder
const folderPath = path.resolve(__dirname, './src/pages');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Generate URLs for each page
  const urls = files.map((file) => {
    const pageName = path.parse(file).name;
    return `${BASE_URL}/${pageName}`;
  });

  // Prepare the content for readme.txt
  const readmeContent = `Pages:\n${urls.join('\n')}\n\nRepo:\n${REPO_URL}`;

  // Write URLs to readme.txt in the public folder
  const outputPath = path.resolve(__dirname, './dist/readme.txt');
  fs.writeFile(outputPath, readmeContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("URLs written to readme.txt successfully.");
  });
});
