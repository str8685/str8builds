#!/bin/bash
# Deployment script for Tinyhost

echo "Preparing STR8 Build application for Tinyhost deployment..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Clean any previous build
echo "Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

echo "Creating production build with server and client..."
# Ensure the client/.env.production exists with the correct API URL
echo "VITE_API_URL=/api" > client/.env.production

# Backup the database if it exists
if [ -f "str8build.db" ]; then
  echo "Backing up database..."
  cp str8build.db str8build.db.backup
fi

# Create a Tinyhost-specific start script if needed
echo "Configuring for Tinyhost..."
cat > tinyhost-start.js << EOL
// Tinyhost startup script
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import the server app
import app from './dist/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get port from environment or use default
const PORT = process.env.PORT || 8080;

// Create HTTP server
const server = createServer(app);

// Start the server
server.listen(PORT, () => {
  console.log(\`STR8 Build server running on port \${PORT}\`);
});
EOL

echo "Deployment package ready for Tinyhost!"
echo "Use 'tinyhost deploy' command to deploy your application."
