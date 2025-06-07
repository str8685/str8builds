#!/bin/bash
# Script to package STR8 Build application for Tinyhost deployment

echo "Packaging STR8 Build for Tinyhost deployment..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Create the deployment package directory
PACKAGE_DIR="tinyhost-deployment"
rm -rf $PACKAGE_DIR
mkdir -p $PACKAGE_DIR

# Copy the built files
echo "Copying built files..."
cp -r dist/* $PACKAGE_DIR/

# Copy package.json (needed for dependencies)
echo "Copying package.json..."
cp package.json $PACKAGE_DIR/

# Create a simple server.js file that can be used by Tinyhost with SPA routing support
echo "Creating server starter file with SPA routing support..."
cat > $PACKAGE_DIR/server.js << 'EOL'
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

# Create Tinyhost configuration
echo "Creating Tinyhost configuration..."
cat > $PACKAGE_DIR/tinyhost.json << 'EOL'
{
  "name": "str8-build-app",
  "type": "node",
  "start": "node server.js",
  "env": {
    "NODE_ENV": "production"
  }
}
EOL

# Create a minimal .env file for production
echo "Creating production environment file..."
cat > $PACKAGE_DIR/.env << 'EOL'
# STR8 BUILD Production Environment Variables
PORT=8080
NODE_ENV=production
# Add your database URL and other sensitive information in the Tinyhost dashboard
EOL

# Create a README for deployment
echo "Creating deployment instructions..."
cat > $PACKAGE_DIR/README.md << 'EOL'
# STR8 Build Tinyhost Deployment

This package contains all the files needed to deploy STR8 Build to Tinyhost.

## Deployment Instructions

1. Upload this entire folder to Tinyhost
2. Set the following environment variables in the Tinyhost dashboard:
   - DATABASE_URL (your database connection string)
   - SMTP_PASSWORD (your email service password)
   - Any other API keys or secrets

## Files Included

- `index.js` - The main server application
- `server.js` - Entry point for Tinyhost
- `public/` - All static frontend files
- `package.json` - Dependencies
- `tinyhost.json` - Tinyhost configuration
- `.env` - Basic environment variables

## Post-Deployment

After deployment, visit your Tinyhost URL to access the application.
EOL

# Create a ZIP file for easy upload
echo "Creating ZIP archive..."
(cd $PACKAGE_DIR && zip -r ../str8-build-tinyhost-package.zip .)

echo "✅ Deployment package created successfully!"
echo "You can find the package in: str8-build-tinyhost-package.zip"
echo "Upload this ZIP file to Tinyhost to deploy your application."
