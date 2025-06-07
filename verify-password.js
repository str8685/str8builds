import bcryptjs from 'bcryptjs';
import Database from 'better-sqlite3';

// Use the same database file that the server uses
const db = new Database('./str8build.db');

async function verifyPasswordDirectly() {
  try {
    // Get the current admin user and password hash
    const adminUser = db.prepare('SELECT * FROM users WHERE id = 1').get();
    
    if (!adminUser) {
      console.error('Admin user not found!');
      return;
    }
    
    console.log('Found admin user:', {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      passwordHash: adminUser.password
    });
    
    // Test passwords
    const testPasswords = ['admin', 'test123', 'test', 'password', 'str8build', '123456'];
    
    for (const testPassword of testPasswords) {
      const isValid = await bcryptjs.compare(testPassword, adminUser.password);
      console.log(`Password "${testPassword}": ${isValid ? 'VALID ✓' : 'INVALID ✗'}`);
    }
    
    // Create a new password
    const newPassword = 'str8';
    const salt = await bcryptjs.genSalt(10);
    const newHash = await bcryptjs.hash(newPassword, salt);
    
    // Update the password
    const stmt = db.prepare('UPDATE users SET password = ? WHERE id = 1');
    const result = stmt.run(newHash);
    
    console.log('Updated admin password:', result.changes > 0 ? 'Success' : 'No changes made');
    console.log('New password hash:', newHash);
    
    // Verify the new password
    const isValid = await bcryptjs.compare(newPassword, newHash);
    console.log(`New password "${newPassword}" verification: ${isValid ? 'VALID ✓' : 'INVALID ✗'}`);
    
    console.log('\n======= IMPORTANT =======');
    console.log('Please use these final credentials to login:');
    console.log('Email: admin@str8build.com');
    console.log('Password: str8');
    console.log('========================\n');
    
  } catch (error) {
    console.error('Error during password verification:', error);
  } finally {
    db.close();
  }
}

verifyPasswordDirectly().then(() => {
  console.log('Password verification completed');
});
