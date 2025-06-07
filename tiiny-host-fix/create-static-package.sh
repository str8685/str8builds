#!/bin/bash
# Script to create a static package for Tiiny Host

echo "Creating static package for Tiiny Host..."

# Ensure we're in the right directory
cd "$(dirname "$0")"
cd ..

# Create directories
mkdir -p tiiny-host-fix/static

# Build the application if dist doesn't exist
if [ ! -d "dist" ]; then
  echo "Building application..."
  npm run build
fi

# Copy only the static files (no server-side code)
echo "Copying static files..."
cp -r dist/public/* tiiny-host-fix/static/

# Create a special 404.html for SPA routing
cat > tiiny-host-fix/static/404.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting...</title>
  <script>
    // Redirect to index.html with the original path as a query parameter
    const path = window.location.pathname;
    window.location.href = '/index.html?path=' + encodeURIComponent(path);
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
EOL

# Modify the main index.html to handle SPA routing
cp tiiny-host-fix/static/index.html tiiny-host-fix/static/index.html.bak

# Add SPA routing script to index.html
sed -i.bak '/<head>/a \
  <!-- SPA routing for static hosting --> \
  <script> \
    // Check if we were redirected from 404.html \
    document.addEventListener("DOMContentLoaded", function() { \
      const query = window.location.search.substring(1); \
      const params = new URLSearchParams(query); \
      const path = params.get("path"); \
      if (path) { \
        // Remove the query parameter \
        window.history.replaceState(null, null, path); \
      } \
    }); \
  </script>' tiiny-host-fix/static/index.html

# Create a ZIP file for Tiiny Host
echo "Creating ZIP file..."
cd tiiny-host-fix/static
zip -r ../../str8-build-tiiny-host-static.zip .

echo "✅ Static package created successfully!"
echo "Upload str8-build-tiiny-host-static.zip to Tiiny Host"
