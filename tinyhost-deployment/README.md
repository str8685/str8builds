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
