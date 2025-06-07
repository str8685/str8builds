/**
 * Sitemap Generator for STR8 BUILD
 * 
 * This script generates a sitemap.xml file for better SEO and search engine indexing.
 * Run this script as part of your production build process.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://str8build.com'; // Replace with your actual domain
const DIST_DIR = path.resolve(__dirname, '../dist/public');
const OUTPUT_FILE = path.join(DIST_DIR, 'sitemap.xml');

// Main pages with priority and change frequency
const MAIN_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/login', priority: '0.8', changefreq: 'monthly' },
  { url: '/register', priority: '0.8', changefreq: 'monthly' },
  { url: '/dashboard', priority: '0.9', changefreq: 'daily' },
  { url: '/projects', priority: '0.9', changefreq: 'daily' },
  { url: '/clients', priority: '0.8', changefreq: 'weekly' },
  { url: '/tools', priority: '0.8', changefreq: 'monthly' },
  { url: '/settings', priority: '0.7', changefreq: 'monthly' },
  { url: '/help', priority: '0.7', changefreq: 'monthly' },
];

// Generate sitemap XML
function generateSitemap() {
  console.log('🗺️  Generating sitemap...');
  
  // Create XML header
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add main pages
  MAIN_PAGES.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  // Close XML
  xml += '</urlset>';
  
  // Ensure output directory exists
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`✅ Sitemap generated at ${OUTPUT_FILE}`);
}

// Generate robots.txt
function generateRobotsTxt() {
  const robotsTxt = `# robots.txt for STR8 BUILD
User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt);
  console.log('🤖 Generated robots.txt');
}

// Execute
try {
  generateSitemap();
  generateRobotsTxt();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
