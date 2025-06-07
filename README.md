# STR8 BUILD v21

Thank you for downloading STR8 BUILD v21, the ultimate construction app for New Zealand professionals.

## Quick Start

1. Extract all files to a directory on your computer
2. Install dependencies with: `npm install`
3. Start the development server with: `npm run dev`
4. Access the application at: http://localhost:8080

## Login Details

Username: str8
Password: omokoroa2023

## Setting Up the Database

The application can run in two modes:

### Development Mode (No Database Required)
- By default, the application will run with a mock database when no DATABASE_URL is provided
- Data won't persist between server restarts in this mode

### Production Mode (PostgreSQL Required)
1. Create a PostgreSQL database for the application
2. Set the DATABASE_URL environment variable to your PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   ```
3. Run `npx drizzle-kit push` to create the database schema
4. Run `npx tsx scripts/populate-sample-data.ts` to populate sample construction and woodworking data

## Features

- Building Calculators (Timber, Concrete, Roofing, Insulation)
- 3D Model Viewer for construction components
- Job & Time Tracking
- Invoicing System
- Resource Management
- Woodworking Resource Library
- Construction Templates
- AI Recommendations with Gemini AI (requires API key)
- Admin Dashboard

## Construction & Woodworking Resources

The application includes comprehensive resources for:

- Timber Frame Construction
- Foundation Building
- Roof Framing
- Timber Joinery Techniques
- Wood Finishing
- Material Takeoff Templates
- Construction Timeline Templates
- Building Quote Templates

## Requirements

- Node.js v16+ and npm
- PostgreSQL database (for production use)
- Gemini API key (for AI features - optional)

## Setting Up Gemini AI Features

1. Obtain a Gemini API key from https://ai.google.dev/
2. Set the GEMINI_API_KEY environment variable with your key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

## Contact

For support or questions, please contact support@str8build.co.nz

