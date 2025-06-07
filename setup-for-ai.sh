#!/bin/bash

# Color outputs for better visibility
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=============================================${NC}"
echo -e "${GREEN}STR8 BUILD - AI Compatibility Setup Tool${NC}"
echo -e "${BLUE}=============================================${NC}"
echo ""

# Make script executable
chmod +x setup-for-ai.sh

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required software
echo -e "${YELLOW}Checking system requirements...${NC}"

# Check for Node.js
if command_exists node; then
  NODE_VERSION=$(node -v)
  echo -e "✅ Node.js is installed: ${GREEN}$NODE_VERSION${NC}"
else
  echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
  exit 1
fi

# Check for npm
if command_exists npm; then
  NPM_VERSION=$(npm -v)
  echo -e "✅ npm is installed: ${GREEN}$NPM_VERSION${NC}"
else
  echo -e "${RED}❌ npm is not installed. Please install npm.${NC}"
  exit 1
fi

# Check for PostgreSQL (optional check)
if command_exists psql; then
  PSQL_VERSION=$(psql --version)
  echo -e "✅ PostgreSQL client is installed: ${GREEN}$PSQL_VERSION${NC}"
else
  echo -e "${YELLOW}⚠️ PostgreSQL client not found. This is okay if using remote database.${NC}"
fi

echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"

# Install dependencies
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
  echo -e "${RED}❌ Failed to install dependencies${NC}"
  exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo ""
  echo -e "${YELLOW}Creating .env file...${NC}"
  cat > .env << EOL
# STR8 BUILD Environment Variables
# Replace these with your actual credentials

# Database URL (required)
DATABASE_URL=postgresql://username:password@localhost:5432/str8build

# Gemini API Key (required for AI features)
GEMINI_API_KEY=your_api_key_here

# Session Secret (for enhanced security)
SESSION_SECRET=str8build_session_secret_change_this
EOL
  echo -e "${GREEN}✅ Created .env file template${NC}"
  echo -e "${YELLOW}⚠️ Please edit the .env file with your actual credentials${NC}"
else
  echo -e "${YELLOW}⚠️ .env file already exists. Not modifying.${NC}"
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo ""
  echo -e "${YELLOW}⚠️ DATABASE_URL environment variable is not set.${NC}"
  echo -e "${YELLOW}  Please set it to connect to your PostgreSQL database.${NC}"
  echo -e "${YELLOW}  Example: export DATABASE_URL=postgresql://username:password@localhost:5432/str8build${NC}"
else
  echo ""
  echo -e "${GREEN}✅ DATABASE_URL environment variable is set${NC}"
  
  # Check if we can connect to the database
  echo -e "${YELLOW}Testing database connection...${NC}"
  if npx drizzle-kit push:pg; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
    echo -e "${GREEN}✅ Schema updated successfully${NC}"
  else
    echo -e "${RED}❌ Failed to connect to database or update schema${NC}"
    echo -e "${YELLOW}⚠️ Please check your DATABASE_URL and try again${NC}"
  fi
fi

# Check if GEMINI_API_KEY is set
if [ -z "$GEMINI_API_KEY" ]; then
  echo ""
  echo -e "${YELLOW}⚠️ GEMINI_API_KEY environment variable is not set.${NC}"
  echo -e "${YELLOW}  AI features will not work without an API key.${NC}"
  echo -e "${YELLOW}  Set it in your .env file or directly in your environment.${NC}"
else
  echo ""
  echo -e "${GREEN}✅ GEMINI_API_KEY environment variable is set${NC}"
fi

echo ""
echo -e "${BLUE}=============================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${BLUE}=============================================${NC}"
echo ""
echo -e "To start the application, run: ${YELLOW}npm run dev${NC}"
echo ""
echo -e "Default login credentials:"
echo -e "  Username: ${YELLOW}str8${NC}"
echo -e "  Password: ${YELLOW}omokoroa2023${NC}"
echo ""
echo -e "Documentation is available in: ${YELLOW}AI_INTEGRATION_GUIDE.md${NC}"
echo -e "${BLUE}=============================================${NC}"