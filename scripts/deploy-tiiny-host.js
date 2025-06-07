#!/usr/bin/env node
/**
 * STR8 BUILD - Tiiny Host Deployment Script
 * 
 * This script prepares and deploys the STR8 BUILD app to Tiiny Host
 * It handles:
 * 1. Building the production assets
 * 2. Creating a ZIP package
 * 3. Uploading to Tiiny Host via their API
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');
const fetch = require('node-fetch');
const FormData = require('form-data');

// Configuration
const CONFIG = {
  distDir: path.join(__dirname, '../dist/public'),
  outputZip: path.join(__dirname, '../tiiny-host-package.zip'),
  tiinyHostEmail: process.env.TIINY_HOST_EMAIL,
  tiinyHostApiKey: process.env.TIINY_HOST_API_KEY,
  siteName: process.env.TIINY_HOST_SITE_NAME || 'str8build',
  custom404: 'index.html', // Use SPA approach for 404s
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

/**
 * Log a message with a color-coded prefix
 */
function log(type, message) {
  const types = {
    info: `${colors.cyan}[INFO]${colors.reset}`,
    success: `${colors.green}[SUCCESS]${colors.reset}`,
    warning: `${colors.yellow}[WARNING]${colors.reset}`,
    error: `${colors.red}[ERROR]${colors.reset}`,
  };
  
  console.log(`${types[type] || types.info} ${message}`);
}

/**
 * Check if all required configuration is present
 */
function validateConfig() {
  log('info', 'Validating configuration...');
  
  const requiredEnvVars = [
    'TIINY_HOST_EMAIL', 
    'TIINY_HOST_API_KEY'
  ];
  
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    log('error', `Missing required environment variables: ${missing.join(', ')}`);
    log('info', 'You can set these in your .env file or as environment variables.');
    process.exit(1);
  }
  
  // Check if dist directory exists
  if (!fs.existsSync(CONFIG.distDir)) {
    log('warning', `Distribution directory not found at ${CONFIG.distDir}`);
    log('info', 'Running production build first...');
    
    try {
      execSync('npm run build:prod', { stdio: 'inherit' });
      log('success', 'Build completed successfully.');
    } catch (error) {
      log('error', 'Build failed. Please fix the errors and try again.');
      process.exit(1);
    }
  }
  
  log('success', 'Configuration validated.');
}

/**
 * Create a ZIP archive of the distribution directory
 */
async function createZipArchive() {
  log('info', `Creating ZIP archive at ${CONFIG.outputZip}...`);
  
  return new Promise((resolve, reject) => {
    // Create a file to stream archive data to
    const output = fs.createWriteStream(CONFIG.outputZip);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Highest compression level
    });
    
    // Listen for all archive data to be written
    output.on('close', () => {
      const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      log('success', `ZIP archive created (${sizeMB} MB)`);
      resolve();
    });
    
    // Handle warnings and errors
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        log('warning', err.message);
      } else {
        reject(err);
      }
    });
    
    archive.on('error', (err) => {
      reject(err);
    });
    
    // Pipe archive data to the file
    archive.pipe(output);
    
    // Add files from dist directory
    archive.directory(CONFIG.distDir, false);
    
    // Finalize the archive
    archive.finalize();
  });
}

/**
 * Upload the ZIP file to Tiiny Host
 */
async function uploadToTiinyHost() {
  log('info', 'Uploading to Tiiny Host...');
  
  // Create form data for the API request
  const form = new FormData();
  form.append('file', fs.createReadStream(CONFIG.outputZip));
  form.append('email', CONFIG.tiinyHostEmail);
  form.append('siteTitle', CONFIG.siteName);
  form.append('custom404', CONFIG.custom404);
  
  try {
    const response = await fetch('https://api.tiiny.host/v1/publish', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.tiinyHostApiKey}`,
      },
      body: form,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      log('success', 'Deployment to Tiiny Host completed successfully!');
      log('info', `Your site is available at: ${data.url}`);
      
      // Add the URL to a deployments log file
      const deploymentLog = path.join(__dirname, '../deployments.log');
      const timestamp = new Date().toISOString();
      const logEntry = `${timestamp} - ${data.url}\n`;
      
      fs.appendFileSync(deploymentLog, logEntry);
      log('info', `Deployment URL logged to: ${deploymentLog}`);
    } else {
      log('error', `Deployment failed: ${data.message || 'Unknown error'}`);
    }
  } catch (error) {
    log('error', `Upload failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Clean up temporary files
 */
function cleanUp() {
  log('info', 'Cleaning up temporary files...');
  
  try {
    fs.unlinkSync(CONFIG.outputZip);
    log('success', 'Temporary files removed.');
  } catch (error) {
    log('warning', `Failed to clean up: ${error.message}`);
  }
}

/**
 * Main deployment function
 */
async function deploy() {
  console.log('\n');
  console.log(`${colors.cyan}${colors.bright}STR8 BUILD - Tiiny Host Deployment${colors.reset}`);
  console.log(`${colors.cyan}===============================${colors.reset}`);
  console.log('\n');
  
  try {
    validateConfig();
    await createZipArchive();
    await uploadToTiinyHost();
    cleanUp();
    
    log('success', 'Deployment process completed successfully!');
  } catch (error) {
    log('error', `Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the deployment
deploy();
