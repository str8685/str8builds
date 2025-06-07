// Simple test script to debug the login process
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';

// Open the SQLite database directly
const db = new Database('str8build.db');

async function testLogin() {
  try {
    console.log('Testing login process...');
    
    // Get the admin user from the database
    const userQuery = 'SELECT * FROM users WHERE username = ?';
    const user = db.prepare(userQuery).get('str8');
    
    if (!user) {
      console.error('User not found in database');
      return;
    }
    
    console.log('Found user:', { 
      id: user.id, 
      username: user.username,
      hasPassword: Boolean(user.password)
    });
    
    // Test password match with bcrypt
    const testPassword = 'omokoroa2023';
    const storedHash = user.password;
    
    console.log('Stored password hash:', storedHash);
    
    // Test direct comparison to see if hash format is correct
    try {
      const isMatch = await bcrypt.compare(testPassword, storedHash);
      console.log('Password match result:', isMatch);
    } catch (error) {
      console.error('Error comparing passwords with bcrypt:', error);
      
      // Try to verify if the stored hash is in a valid bcrypt format
      if (!storedHash.startsWith('$2')) {
        console.error('Stored hash is not in bcrypt format. It might be using a different hashing algorithm.');
      }
    }
    
  } catch (error) {
    console.error('Test login error:', error);
  } finally {
    db.close();
  }
}

testLogin();
