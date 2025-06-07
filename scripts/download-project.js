import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

// Get __filename and __dirname equivalents in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(__dirname, '../str8-build-project.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log('\x1b[32m%s\x1b[0m', '✓ Project archive created successfully!');
  console.log(`✓ Archive size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('\x1b[36m%s\x1b[0m', '✓ The file "str8-build-project.zip" is now ready to download from your project files.');
  console.log('\x1b[36m%s\x1b[0m', '✓ Download this file to save a copy of your project to your computer.');
});

// Good practice to catch warnings
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('\x1b[33m%s\x1b[0m', `Warning: ${err}`);
  } else {
    throw err;
  }
});

// Handle errors
archive.on('error', function(err) {
  console.error('\x1b[31m%s\x1b[0m', `Error during archive creation: ${err}`);
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Function to recursively add a directory to the archive
function addDirectoryToArchive(directoryPath, excludePatterns = []) {
  const items = fs.readdirSync(directoryPath);
  
  items.forEach(item => {
    const itemPath = path.join(directoryPath, item);
    const relativePath = path.relative(path.join(__dirname, '..'), itemPath);
    
    // Check if this path should be excluded
    if (excludePatterns.some(pattern => 
      typeof pattern === 'string' 
        ? itemPath.includes(pattern) 
        : pattern.test(itemPath)
    )) {
      return;
    }
    
    // Add directory or file to archive
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      // Recursively add subdirectories
      addDirectoryToArchive(itemPath, excludePatterns);
    } else {
      // Add file to archive
      archive.file(itemPath, { name: relativePath });
      process.stdout.write(`\rAdding file: ${relativePath}`);
    }
  });
}

// Add project directories to the archive, excluding node_modules and other large/unnecessary files
console.log('\x1b[36m%s\x1b[0m', 'Starting to create STR8 BUILD project archive...');
console.log('\x1b[36m%s\x1b[0m', 'This may take a moment depending on project size.');

const excludePatterns = [
  'node_modules',
  '.git',
  'str8-build-project.zip',
  /\.DS_Store$/,
  /\.env$/,
  /\.log$/,
  /\.replit\.nix$/
];

// Add project directories
const rootDir = path.join(__dirname, '..');
addDirectoryToArchive(rootDir, excludePatterns);

// Include a README with instructions
const readmeContent = `# STR8 BUILD Project Backup

This archive contains a backup of your STR8 BUILD construction app project.

## Project Structure
- \`/client\`: React front-end code
- \`/server\`: Node.js back-end code
- \`/shared\`: Shared schemas and types
- \`/scripts\`: Utility scripts

## Restore Instructions
To restore this project:
1. Extract all files to a directory
2. Run \`npm install\` to install dependencies
3. Run \`npm run dev\` to start the project

## Features
- Job tracking and time management
- Project and client management
- Invoicing system
- Weather impact analysis
- Supplier locator with map
- 3D building component visualization
- Dashboard with customizable widgets

Created on: ${new Date().toLocaleString()}
`;

archive.append(readmeContent, { name: 'README.md' });

// Finalize the archive
archive.finalize();