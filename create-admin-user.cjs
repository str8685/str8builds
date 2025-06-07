// Using CommonJS for this script
const { execSync } = require('child_process');
const { createHash } = require('crypto');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Use better-sqlite3 directly to create the admin user
const db = new Database('str8build.db');

function hashPassword(password) {
  // Simple hash function for this script (not as secure as bcrypt but works for this purpose)
  return createHash('sha256').update(password).digest('hex');
}

function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Check if user already exists
    const existingUser = db.prepare('SELECT * FROM users WHERE username = ?').get('str8');
    
    if (existingUser) {
      console.log('Admin user already exists:', existingUser.username);
      return;
    }
    
    // Hash the password
    const hashedPassword = hashPassword('omokoroa2023');
    
    // Create the admin user
    const stmt = db.prepare(`
      INSERT INTO users (username, password, companyName, fullName, email, phone, defaultHourlyRate, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    
    const info = stmt.run(
      'str8',
      hashedPassword,
      'STR8 BUILD',
      'Admin User',
      'admin@str8build.com',
      '+64 21 123 4567',
      '75.00'
    );
    
    if (info.changes > 0) {
      const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
      console.log('Admin user created successfully:', {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      });
    } else {
      console.log('Failed to create admin user.');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    db.close();
  }
}

createAdminUser();
