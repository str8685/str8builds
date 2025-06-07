import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import ws from "ws";
import * as schema from "@shared/schema";
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';

neonConfig.webSocketConstructor = ws;

// Check if we're using PostgreSQL (production) or SQLite (development)
const databaseUrl = process.env.DATABASE_URL;

// Better production detection logic
const isProduction = process.env.NODE_ENV === 'production';

// Log database connection details (without exposing credentials)
console.log(`Database mode: ${isProduction ? 'Production (PostgreSQL)' : 'Development (SQLite)'}`);
if (databaseUrl) {
  console.log('Database URL provided: Using connection string from environment');
} else {
  console.log('No Database URL found in environment');
}

let db: any;
let pool: any;

if (isProduction && databaseUrl) {
  // Use PostgreSQL for production
  console.log('Connecting to PostgreSQL database');
  pool = new Pool({ connectionString: databaseUrl });
  db = drizzle(pool, { schema });
} else {
  // Use SQLite for development
  console.log('Using SQLite database for development');
  const sqlite = new Database('str8build.db');
  
  // Enable WAL mode for better performance
  sqlite.pragma('journal_mode = WAL');
  
  db = drizzleSqlite(sqlite, { schema });
  
  // Run migrations if needed
  try {
    // Create tables if they don't exist
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        companyName TEXT,
        fullName TEXT,
        email TEXT,
        phone TEXT,
        defaultHourlyRate REAL,
        role TEXT DEFAULT 'user',
        status TEXT DEFAULT 'active',
        profileImageUrl TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        contact TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
      
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        client_id INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        progress INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        start_date TEXT,
        end_date TEXT,
        hourly_rate REAL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (client_id) REFERENCES clients(id)
      );
      
      CREATE TABLE IF NOT EXISTS time_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        project_id INTEGER,
        start_time TEXT NOT NULL,
        end_time TEXT,
        duration INTEGER,
        notes TEXT,
        hourly_rate REAL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
      
      CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        client_id INTEGER,
        project_id INTEGER,
        invoice_number TEXT NOT NULL,
        issue_date TEXT NOT NULL,
        due_date TEXT NOT NULL,
        subtotal REAL NOT NULL,
        tax REAL,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
      
      CREATE TABLE IF NOT EXISTS invoice_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit_price REAL NOT NULL,
        amount REAL NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (invoice_id) REFERENCES invoices(id)
      );
      
      CREATE TABLE IF NOT EXISTS building_resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        content TEXT,
        file_url TEXT,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        address TEXT,
        city TEXT,
        region TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        opening_hours TEXT,
        location TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS user_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        hourly_rate REAL,
        dark_mode INTEGER DEFAULT 1,
        notifications INTEGER DEFAULT 1,
        auto_sync INTEGER DEFAULT 1,
        unit_system TEXT DEFAULT 'metric',
        avatar TEXT,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    console.log('SQLite database initialized successfully');
  } catch (error) {
    console.error('Error initializing SQLite database:', error);
  }
}

export { db, pool };
