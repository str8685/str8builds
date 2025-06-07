#!/bin/bash
# Script to create a minimal Tinyhost package that fixes the 404 error

echo "Creating minimal Tinyhost package..."

# Ensure we're in the right directory
cd "$(dirname "$0")"
cd ..

# Build the application if dist doesn't exist
if [ ! -d "dist" ]; then
  echo "Building application..."
  npm run build
fi

# Create public directory in our fix folder
mkdir -p tinyhost-fix/public

# Copy all built files
echo "Copying built files..."
cp -r dist/public/* tinyhost-fix/public/

# Create a ZIP file
echo "Creating ZIP file..."
cd tinyhost-fix
zip -r ../str8-build-tinyhost-minimal.zip .

echo "✅ Minimal package created successfully!"
echo "Upload str8-build-tinyhost-minimal.zip to Tinyhost"
