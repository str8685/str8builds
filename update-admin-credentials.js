import bcryptjs from 'bcryptjs';
import Database from 'better-sqlite3';

// Use the same database file that the server uses
const db = new Database('./str8build.db');

async function updateAdminCredentials() {
  try {
    // Get the current admin user
    const adminUser = db.prepare('SELECT * FROM users WHERE id = 1').get();
    
    if (!adminUser) {
      console.error('Admin user not found!');
      return;
    }
    
    console.log('Found admin user:', {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email
    });
    
    // Set the new credentials
    const newUsername = 'str8';
    const newPassword = 'omokoroa2023';
    
    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const newHash = await bcryptjs.hash(newPassword, salt);
    
    // Update the username and password
    const stmt = db.prepare('UPDATE users SET username = ?, password = ? WHERE id = 1');
    const result = stmt.run(newUsername, newHash);
    
    console.log('Updated admin credentials:', result.changes > 0 ? 'Success' : 'No changes made');
    
    // Verify the updated user
    const updatedUser = db.prepare('SELECT * FROM users WHERE id = 1').get();
    console.log('Updated admin user:', { 
      id: updatedUser.id, 
      username: updatedUser.username,
      email: updatedUser.email
    });
    
    // Verify the new password
    const isValid = await bcryptjs.compare(newPassword, updatedUser.password);
    console.log(`Password verification: ${isValid ? 'VALID ✓' : 'INVALID ✗'}`);
    
    console.log('\n======= UPDATED ADMIN CREDENTIALS =======');
    console.log('Username: str8');
    console.log('Password: omokoroa2023');
    console.log('Email: ' + updatedUser.email);
    console.log('=========================================\n');
    
  } catch (error) {
    console.error('Error updating admin credentials:', error);
  } finally {
    db.close();
  }
}

updateAdminCredentials().then(() => {
  console.log('Admin credentials update completed');
});
