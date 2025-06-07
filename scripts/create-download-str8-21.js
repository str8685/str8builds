import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a file to stream archive data to
const outputFilePath = path.join(outputDir, 'str8-21.zip');
const output = fs.createWriteStream(outputFilePath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`✅ STR8 BUILD v21 archive created successfully`);
  console.log(`📦 Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📂 Location: ${outputFilePath}`);
  console.log(`🌐 Download URL: /str8-21.zip`);
});

// Handle archive warnings
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('⚠️ Warning:', err);
  } else {
    throw err;
  }
});

// Handle archive errors
archive.on('error', function(err) {
  console.error('❌ Error creating archive:', err);
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Define directories/files to include
const includeDirs = [
  { src: 'client', dest: 'client' },
  { src: 'server', dest: 'server' },
  { src: 'shared', dest: 'shared' },
  { src: 'public', dest: 'public' },
  { src: 'scripts', dest: 'scripts' },
  { src: 'attached_assets', dest: 'attached_assets' }
];

// Define files to include from root
const includeFiles = [
  'package.json',
  'package-lock.json',
  'vite.config.ts',
  'tsconfig.json',
  'postcss.config.js',
  'tailwind.config.ts',
  'drizzle.config.ts',
  'components.json',
  '.gitignore',
  'README.md',
  'AI_INTEGRATION_GUIDE.md',
  'setup-for-ai.sh',
  'check-for-ai-errors.sh'
];

// Define patterns to exclude
const excludePatterns = [
  /\.DS_Store$/,
  /\.env$/,
  /node_modules/,
  /\.git/,
  /\.vscode/,
  /\.yarn/,
  /\.idea/,
  /\.next/,
  /\.nuxt/,
  /dist/,
  /build/,
  /coverage/,
  /str8build.*\.zip$/,
  /str8-.*\.zip$/,
];

// Function to check if path should be excluded
function shouldExclude(filePath) {
  return excludePatterns.some(pattern => pattern.test(filePath));
}

// Function to add directory to archive recursively
function addDirectoryToArchive(directoryPath, destPath) {
  if (shouldExclude(directoryPath)) return;
  
  const files = fs.readdirSync(directoryPath);
  
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const archivePath = path.join(destPath, file);
    
    if (shouldExclude(filePath)) continue;
    
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively add subdirectories
      addDirectoryToArchive(filePath, archivePath);
    } else {
      // Add file to archive
      archive.file(filePath, { name: archivePath });
    }
  }
}

// Add directories
console.log('📦 Creating STR8 BUILD v21 download archive...');
for (const dir of includeDirs) {
  if (fs.existsSync(dir.src)) {
    console.log(`📂 Adding directory: ${dir.src}`);
    addDirectoryToArchive(dir.src, dir.dest);
  } else {
    console.warn(`⚠️ Directory not found: ${dir.src}`);
  }
}

// Add individual files
for (const file of includeFiles) {
  if (fs.existsSync(file)) {
    console.log(`📄 Adding file: ${file}`);
    archive.file(file, { name: file });
  } else {
    console.warn(`⚠️ File not found: ${file}`);
  }
}

// Add a README file for the download
const readmeContent = `# STR8 BUILD v21

Thank you for downloading STR8 BUILD v21, the ultimate construction app for New Zealand professionals.

## Quick Start

1. Extract all files to a directory on your computer
2. Install dependencies with: \`npm install\`
3. Start the development server with: \`npm run dev\`

## Login Details

Username: str8
Password: omokoroa2023

## Features

- Building Calculators (Timber, Concrete, Roofing, Insulation)
- 3D Model Viewer for construction components
- Job & Time Tracking
- Invoicing System
- Resource Management
- AI Recommendations with Gemini AI
- Admin Dashboard

## Requirements

- Node.js v16+ and npm
- PostgreSQL database
- Gemini API key (for AI features)

## AI Integration Notes

This version has been optimized for AI system compatibility with:
- Comprehensive documentation in AI_INTEGRATION_GUIDE.md
- Automated setup script (setup-for-ai.sh)
- Error checking tools (check-for-ai-errors.sh)

## Contact

For support or questions, please contact support@str8build.co.nz

`;

// Add the README file
archive.append(readmeContent, { name: 'README.md' });

// Create an installation helper script
const installScriptContent = `#!/bin/bash
echo "Installing STR8 BUILD v21..."
npm install
echo "Creating database tables..."
npm run db:push
echo "Installation complete!"
echo "Start the application with: npm run dev"
`;

// Add installation script
archive.append(installScriptContent, { name: 'install.sh', mode: 0o755 });

// Finalize the archive
archive.finalize();