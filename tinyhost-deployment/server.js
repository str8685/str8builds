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
