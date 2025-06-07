#!/bin/bash
# Script to create a Tinyhost deployment package with all files in a single ZIP

echo "Creating Tinyhost deployment package..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Clean any previous build
echo "Cleaning previous build..."
rm -rf dist tinyhost-package

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Clean any previous temporary directories
rm -rf tinyhost-temp
mkdir -p tinyhost-temp

# Copy necessary files to the temp directory
echo "Copying built files..."
cp -r dist/* tinyhost-temp/
cp package.json tinyhost-temp/

# Create a server.js file for Tinyhost with SPA routing support
echo "Creating server entry point with SPA routing support..."
cat > tinyhost-temp/server.js << 'EOL'
// Tinyhost server entry point
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import express from 'express';
import path from 'path';

// Import the built server if it exists
let app;
try {
  app = (await import('./index.js')).default;
} catch (e) {
  console.log('Could not import server app, creating Express app instead:', e.message);
  app = express();
}

// Handle SPA routing - ensure all routes fall back to index.html
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, 'public');

// Add express middleware to handle SPA routing if not already present
if (!app._router || !app._router.stack.some(layer => 
  layer.handle && layer.handle.toString().includes('index.html'))) {
  
  console.log('Adding SPA routing middleware');
  
  // Serve static files from public directory
  app.use(express.static(publicPath));
  
  // API routes should be handled by the server
  app.get('/api/*', (req, res, next) => {
    next();
  });
  
  // All other routes should redirect to index.html for SPA
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

// Create HTTP server
const server = createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(`STR8 Build server running on port ${PORT}`);
  console.log(`Serving static files from: ${publicPath}`);
});
EOL

# Create a proper .env file (with placeholders for sensitive data)
echo "Creating environment file..."
cat > tinyhost-temp/.env << 'EOL'
# STR8 BUILD Production Environment
PORT=8080
NODE_ENV=production
# Add actual database connection and API keys in Tinyhost dashboard
EOL

# Create a readme with instructions
echo "Adding deployment instructions..."
cat > tinyhost-temp/README.md << 'EOL'
# STR8 Build - Tinyhost Deployment

## After Uploading
1. Set these environment variables in Tinyhost dashboard:
   - DATABASE_URL: Your database connection string
   - SMTP_PASSWORD: Email service password (if used)
   - Any API keys needed by your application

2. Make sure to select Node.js as the runtime environment

3. Set the start command to: `node server.js`

## Note
All files should already be properly configured for Tinyhost deployment.
EOL

# Create the single ZIP file
echo "Creating ZIP file..."
cd tinyhost-temp
zip -r ../str8-build-tinyhost.zip .
cd ..

# Clean up
rm -rf tinyhost-temp

echo "✅ Package created successfully!"
echo "You can now upload str8-build-tinyhost.zip to Tinyhost as a single file."
