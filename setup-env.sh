#!/bin/bash

# STR8 BUILD Environment Setup Script

echo "STR8 BUILD v21 - Environment Setup"
echo "=================================="
echo ""

# Check if .env file exists and back it up if it does
if [ -f .env ]; then
  echo "Existing .env file found. Creating backup as .env.backup"
  cp .env .env.backup
fi

# Create new .env file
cat > .env << EOL
# STR8 BUILD Environment Variables
# Generated on $(date)

# Database Configuration
# Uncomment and set your PostgreSQL connection string for production use
# DATABASE_URL=postgresql://username:password@localhost:5432/str8build

# AI Features
# Uncomment and add your Gemini API key to enable AI features
# GEMINI_API_KEY=your_api_key_here

# Server Configuration
# Default port is 8080, change if needed
PORT=8080
NODE_ENV=development
EOL

echo "Environment file created at ./.env"
echo ""
echo "Next steps:"
echo "1. Edit the .env file to configure your database and API keys"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "For more information, see the README.md file."
echo ""

# Make the file executable
chmod +x setup-env.sh 