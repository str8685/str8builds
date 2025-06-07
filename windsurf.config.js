// Configuration for Windsurf deployment
module.exports = {
  // Build configuration
  build: {
    // Command to run for building the application
    command: "npm run build",
    // Directory containing the built files to be deployed
    outputDir: "dist/public",
    // Entry point for the application
    entry: "dist/index.js",
  },
  // Server configuration
  server: {
    // Port to run the server on
    port: 8081,
    // Environment variables
    env: {
      NODE_ENV: "production"
    },
    // Static file serving
    static: {
      // Directory to serve static files from
      dir: "dist/public",
      // Route to serve static files from
      route: "/"
    },
    // Routes that should be redirected to index.html (for SPA routing)
    spa: true
  }
};
