import bcrypt from 'bcryptjs';
import sqlite3 from 'better-sqlite3';

async function testBcrypt() {
  try {
    // Generate a new hash for "password"
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password', salt);
    console.log('Generated hash:', hash);
    console.log('Hash length:', hash.length);
    
    // Test verification with correct password
    const isValid = await bcrypt.compare('password', hash);
    console.log('Verification with correct password:', isValid);
    
    // Test verification with incorrect password
    const isInvalid = await bcrypt.compare('wrongpassword', hash);
    console.log('Verification with incorrect password:', isInvalid);
    
    // Test our stored hash for admin user
    const adminHash = '$2b$10$L9UmDKiTIeaQA7JwHm8sMuXsQMdgPmyj8YOLUCUcqoQDsZKpfh9he';
    const adminValid = await bcrypt.compare('admin123', adminHash);
    console.log('Admin password verification:', adminValid);
    
    return hash;
  } catch (error) {
    console.error('Error in bcrypt testing:', error);
  }
}

testBcrypt().then(hash => {
  // Now let's try to write it to the database
  const sqlite = sqlite3('str8build.db');
  
  // First make a backup of current users
  const users = sqlite.prepare('SELECT * FROM users').all();
  console.log('Current users:', JSON.stringify(users, null, 2));
  
  // Reset the admin user with a proper password
  try {
    sqlite.prepare('DELETE FROM users WHERE username = ?').run('admin');
    console.log('Deleted admin user');
    
    const stmt = sqlite.prepare(`
      INSERT INTO users (username, password, fullName, email, role, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      'admin',
      hash, // Use the newly generated hash
      'System Administrator',
      'admin@example.com',
      'admin',
      'active'
    );
    
    console.log('Created new admin user with properly hashed password');
    
    // Verify it was stored correctly
    const newAdmin = sqlite.prepare('SELECT username, password FROM users WHERE username = ?').get('admin');
    console.log('New admin user:', newAdmin);
    console.log('Password hash length:', newAdmin.password.length);
  } catch (error) {
    console.error('Error updating database:', error);
  }
});
