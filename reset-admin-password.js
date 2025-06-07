import bcrypt from 'bcrypt';
import Database from 'better-sqlite3';

// Open the SQLite database
// Using the correct database file
const db = new Database('./str8build.db');

async function resetAdminPassword() {
  try {
    // Create new password hash
    const password = 'admin'; // Default simple password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    console.log('Generated new password hash:', hashedPassword);
    
    // Update the admin user (assuming the admin user has ID 1)
    const stmt = db.prepare('UPDATE users SET password = ? WHERE id = 1');
    const result = stmt.run(hashedPassword);
    
    console.log('Updated admin password:', result.changes > 0 ? 'Success' : 'No changes made');
    
    // Verify the admin user
    const adminUser = db.prepare('SELECT * FROM users WHERE id = 1').get();
    console.log('Admin user:', { 
      id: adminUser.id, 
      email: adminUser.email, 
      role: adminUser.role,
      passwordHashLength: adminUser.password?.length || 0
    });
    
  } catch (error) {
    console.error('Error resetting admin password:', error);
  } finally {
    db.close();
  }
}

resetAdminPassword().then(() => {
  console.log('Done');
});

