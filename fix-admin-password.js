// Fix admin password with proper bcrypt hash
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';

// Open the SQLite database directly
const db = new Database('str8build.db');

async function fixAdminPassword() {
  try {
    console.log('Fixing admin user password...');
    
    // Generate proper bcrypt hash
    const salt = await bcrypt.genSalt(10);
    const password = 'omokoroa2023';
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('Generated proper bcrypt hash:', hashedPassword);
    
    // Update the admin user's password
    const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';
    const result = db.prepare(updateQuery).run(hashedPassword, 'str8');
    
    if (result.changes > 0) {
      console.log('Admin password updated successfully!');
    } else {
      console.log('No changes made to database. User might not exist.');
    }
    
    // Verify the password was updated correctly
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get('str8');
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password verification test:', isMatch ? 'SUCCESS' : 'FAILED');
    }
    
  } catch (error) {
    console.error('Error fixing admin password:', error);
  } finally {
    db.close();
  }
}

fixAdminPassword();
