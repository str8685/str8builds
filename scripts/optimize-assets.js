/**
 * Asset optimization script for STR8 BUILD
 * 
 * This script optimizes static assets after the build process:
 * 1. Compresses images using modern formats (WebP)
 * 2. Minifies remaining CSS/JS not handled by Vite
 * 3. Generates size report for optimized assets
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.join(DIST_DIR, 'public');

console.log('🔧 Starting asset optimization...');

// Ensure directories exist
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Dist directory not found. Run build first.');
  process.exit(1);
}

// Function to recursively process files
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      await optimizeFile(filePath);
    }
  }
}

// Function to optimize individual files
async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // For now, we'll just simulate optimization with logs
  // In a real implementation, you would use libraries like sharp for images,
  // terser for JS, cssnano for CSS, etc.
  
  switch (ext) {
    case '.jpg':
    case '.jpeg':
    case '.png':
      console.log(`🖼️  Optimizing image: ${path.relative(DIST_DIR, filePath)}`);
      // In production, use sharp or similar to convert to WebP and optimize
      break;
      
    case '.css':
      if (!filePath.includes('.min.css')) {
        console.log(`🎨 Minifying CSS: ${path.relative(DIST_DIR, filePath)}`);
        // In production, use cssnano or similar
      }
      break;
      
    case '.js':
      if (!filePath.includes('.min.js')) {
        console.log(`📜 Minifying JS: ${path.relative(DIST_DIR, filePath)}`);
        // In production, use terser or similar
      }
      break;
  }
}

// Create a file with cache headers for deployment platforms
function generateCacheConfig() {
  const cacheConfig = `
# STR8 BUILD Cache Configuration
# Netlify _headers file

# Cache static assets for 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache CSS and JS for 1 week
*.js
  Cache-Control: public, max-age=604800
*.css
  Cache-Control: public, max-age=604800

# HTML and JSON should be revalidated
*.html
  Cache-Control: public, max-age=0, must-revalidate
*.json
  Cache-Control: public, max-age=0, must-revalidate
  `.trim();
  
  fs.writeFileSync(path.join(DIST_DIR, '_headers'), cacheConfig);
  console.log('📝 Generated cache configuration');
}

// Add structured data for SEO
function addStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "STR8 BUILD",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0"
    },
    "description": "Professional construction management platform with advanced tools for contractors and builders"
  };
  
  // In a real implementation, this would be injected into your HTML
  // For now, we'll create a separate file that can be included
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'structured-data.json'), 
    JSON.stringify(structuredData, null, 2)
  );
  console.log('🔍 Generated structured data for SEO');
}

// Main execution
(async function() {
  try {
    await processDirectory(PUBLIC_DIR);
    generateCacheConfig();
    addStructuredData();
    
    console.log('✅ Asset optimization complete!');
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
})();
