#!/bin/bash
echo "Installing STR8 BUILD v21..."
npm install
echo "Creating database tables..."
npm run db:push
echo "Installation complete!"
echo "Start the application with: npm run dev"
