import bcryptjs from 'bcryptjs';
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';

// Using the correct database file
const db = new Database('./str8build.db');

// JWT settings matching the server's auth.ts
const JWT_SECRET = 'str8-build-development-secret-key';
const TOKEN_EXPIRY = '30d';

async function testLoginCredentials() {
  try {
    const testEmail = 'admin@str8build.com';
    const testPassword = 'admin';
    
    // Get admin user from database
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(testEmail);
    
    if (!user) {
      console.error('User not found:', testEmail);
      return;
    }
    
    console.log('Found user:', {
      id: user.id,
      email: user.email,
      role: user.role,
      passwordHash: user.password.substring(0, 20) + '...'
    });
    
    // Test password verification with bcryptjs (matching server)
    const isValidPassword = await bcryptjs.compare(testPassword, user.password);
    
    console.log('Password verification result:', isValidPassword);
    
    if (isValidPassword) {
      // Generate a token using the same method as the server
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
      console.log('Generated JWT token:', token.substring(0, 40) + '...');
      
      // Reset password using bcryptjs instead of bcrypt
      const salt = await bcryptjs.genSalt(10);
      const newHash = await bcryptjs.hash(testPassword, salt);
      
      // Update the password in the database
      const updateResult = db.prepare('UPDATE users SET password = ? WHERE id = ?').run(newHash, user.id);
      console.log('Updated password with bcryptjs hash:', updateResult.changes > 0);
      console.log('New password hash (bcryptjs):', newHash);
    }
    
  } catch (error) {
    console.error('Error in login test:', error);
  } finally {
    db.close();
  }
}

testLoginCredentials().then(() => {
  console.log('Debug login test completed');
});
