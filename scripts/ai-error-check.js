#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Load environment variables
dotenv.config({ path: path.join(ROOT_DIR, '.env') });

console.log('🔍 STR8 BUILD - AI Error Prevention Check');
console.log('==========================================');

// Array to store issues
const issues = [];
const warnings = [];

// Check for critical files
const requiredFiles = [
  { path: 'client/src/App.tsx', name: 'Main Application Component' },
  { path: 'client/src/hooks/useAuth.tsx', name: 'Authentication Hook' },
  { path: 'client/src/pages/Login.tsx', name: 'Login Page' },
  { path: 'client/src/pages/Dashboard.tsx', name: 'Dashboard Page' },
  { path: 'server/index.ts', name: 'Server Entry Point' },
  { path: 'server/storage.ts', name: 'Storage Layer' },
  { path: 'server/routes.ts', name: 'API Routes' },
  { path: 'shared/schema.ts', name: 'Database Schema' },
  { path: 'package.json', name: 'Package Configuration' },
];

console.log('\n🔍 Checking critical files...');
for (const file of requiredFiles) {
  const filePath = path.join(ROOT_DIR, file.path);
  if (!fs.existsSync(filePath)) {
    issues.push(`Missing critical file: ${file.name} (${file.path})`);
    console.log(`❌ ${file.path} - Not found`);
  } else {
    console.log(`✅ ${file.path} - Found`);
  }
}

// Check environment variables
console.log('\n🔍 Checking environment variables...');
const requiredEnvVars = [
  { name: 'DATABASE_URL', description: 'PostgreSQL database connection string' },
  { name: 'GEMINI_API_KEY', description: 'Google Gemini API key for AI features' },
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar.name]) {
    warnings.push(`Missing environment variable: ${envVar.name} - ${envVar.description}`);
    console.log(`⚠️ ${envVar.name} - Not set`);
  } else {
    console.log(`✅ ${envVar.name} - Set`);
  }
}

// Check database schema
console.log('\n🔍 Checking database schema...');
try {
  const schemaPath = path.join(ROOT_DIR, 'shared/schema.ts');
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  const requiredTables = ['users', 'projects', 'clients', 'invoices'];
  for (const table of requiredTables) {
    if (!schemaContent.includes(`export const ${table} =`)) {
      warnings.push(`Missing database table: ${table}`);
      console.log(`⚠️ Schema - ${table} table definition not found`);
    } else {
      console.log(`✅ Schema - ${table} table definition found`);
    }
  }
} catch (error) {
  issues.push(`Error reading schema file: ${error.message}`);
  console.log('❌ Schema - Error reading file');
}

// Check authentication implementation
console.log('\n🔍 Checking authentication implementation...');
try {
  const authPath = path.join(ROOT_DIR, 'client/src/hooks/useAuth.tsx');
  const authContent = fs.readFileSync(authPath, 'utf8');
  
  if (!authContent.includes('str8_user')) {
    warnings.push('Authentication implementation may be modified: localStorage key not found');
    console.log('⚠️ Auth - localStorage key not found');
  } else {
    console.log('✅ Auth - localStorage key found');
  }
  
  if (!authContent.includes('isAuthenticated')) {
    warnings.push('Authentication implementation may be modified: isAuthenticated not found');
    console.log('⚠️ Auth - isAuthenticated not found');
  } else {
    console.log('✅ Auth - isAuthenticated found');
  }
} catch (error) {
  issues.push(`Error reading auth file: ${error.message}`);
  console.log('❌ Auth - Error reading file');
}

// Check package.json
console.log('\n🔍 Checking package.json...');
try {
  const packagePath = path.join(ROOT_DIR, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredDeps = ['react', 'express', 'drizzle-orm', '@google/generative-ai'];
  const missingDeps = [];
  
  for (const dep of requiredDeps) {
    if (!packageJson.dependencies[dep]) {
      missingDeps.push(dep);
    }
  }
  
  if (missingDeps.length > 0) {
    warnings.push(`Missing dependencies: ${missingDeps.join(', ')}`);
    console.log(`⚠️ Package - Missing dependencies: ${missingDeps.join(', ')}`);
  } else {
    console.log('✅ Package - All critical dependencies found');
  }
  
  if (!packageJson.scripts?.dev) {
    warnings.push('Missing dev script in package.json');
    console.log('⚠️ Package - No dev script found');
  } else {
    console.log('✅ Package - Dev script found');
  }
} catch (error) {
  issues.push(`Error parsing package.json: ${error.message}`);
  console.log('❌ Package - Error reading file');
}

// Print summary
console.log('\n🔍 Check complete!');
console.log('==========================================');

if (issues.length === 0 && warnings.length === 0) {
  console.log('✅ No issues or warnings detected. The project is ready for AI integration.');
} else {
  if (issues.length > 0) {
    console.log('\n❌ Critical Issues:');
    issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    warnings.forEach((warning, i) => {
      console.log(`${i + 1}. ${warning}`);
    });
  }
  
  console.log('\nPlease address these issues before proceeding with AI integration.');
}

// Exit with error code if there are issues
process.exit(issues.length > 0 ? 1 : 0);