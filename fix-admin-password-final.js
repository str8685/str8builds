import bcryptjs from 'bcryptjs';
import Database from 'better-sqlite3';

// Use the same database file that the server uses
const db = new Database('./str8build.db');

async function resetAdminPasswordWithBcryptjs() {
  try {
    // Create a fixed test password
    const password = 'test123'; // Simple password that's easy to type correctly
    
    // Use the same hashing method as the server (bcryptjs)
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    
    console.log('Generated new password hash with bcryptjs:', hashedPassword);
    
    // Update the admin user (using id = 1)
    const stmt = db.prepare('UPDATE users SET password = ? WHERE id = 1');
    const result = stmt.run(hashedPassword);
    
    console.log('Updated admin password:', result.changes > 0 ? 'Success' : 'No changes made');
    
    // Verify the updated user
    const adminUser = db.prepare('SELECT * FROM users WHERE id = 1').get();
    console.log('Admin user:', { 
      id: adminUser.id, 
      username: adminUser.username,
      email: adminUser.email, 
      role: adminUser.role,
      passwordHash: adminUser.password
    });
    
    // Test password verification to ensure it works
    const isValid = await bcryptjs.compare(password, adminUser.password);
    console.log('Password verification test:', isValid ? 'PASSED ✓' : 'FAILED ✗');
    
    console.log('\nIMPORTANT: Please use these credentials to login:');
    console.log('Email: admin@str8build.com');
    console.log('Password: test123');
    
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    db.close();
  }
}

resetAdminPasswordWithBcryptjs().then(() => {
  console.log('Password reset process completed');
});
