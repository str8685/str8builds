import { db } from '../db';
import * as schema from '@shared/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../auth';
import { storage } from '../storage';

/**
 * Ensures that an admin user exists in the system.
 * If no admin is found, it creates one with default credentials.
 */
async function ensureAdminExists() {
  console.log('Checking for admin user...');
  
  try {
    // Use a different approach due to potential SQLite issues
    // Get all users and filter in memory
    const allUsers = await db.select().from(schema.users).all();
    const adminUsers = allUsers.filter((user: any) => user.role === 'admin');
    
    if (adminUsers.length > 0) {
      console.log(`Found ${adminUsers.length} admin user(s)`);
      return;
    }
    
    // If no admin users found, check if user with ID 1 exists
    const firstUser = await storage.getUser(1);
    
    if (firstUser) {
      try {
        // Use a direct query for SQLite compatibility
        if (db.driver === 'better-sqlite3') {
          // For SQLite
          const sqlite = (db as any).session.database;
          sqlite.prepare("UPDATE users SET role = 'admin' WHERE id = 1").run();
        } else {
          // For PostgreSQL
          await db.update(schema.users)
            .set({ role: 'admin' })
            .where(eq(schema.users.id, 1));
        }
        
        console.log('Updated first user to admin role');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      // Create a new admin user
      const hashedPassword = await hashPassword('admin123');
      
      try {
        // Use a direct query for SQLite compatibility
        if (db.driver === 'better-sqlite3') {
          // For SQLite
          const sqlite = (db as any).session.database;
          sqlite.prepare(
            "INSERT INTO users (username, password, full_name, email, role, status) VALUES (?, ?, ?, ?, ?, ?)"
          ).run('admin', hashedPassword, 'System Administrator', 'admin@example.com', 'admin', 'active');
        } else {
          // For PostgreSQL
          await db.insert(schema.users).values({
            username: 'admin',
            password: hashedPassword,
            full_name: 'System Administrator',
            email: 'admin@example.com',
            role: 'admin',
            status: 'active'
          }).returning({ insertedId: schema.users.id });
        }
        
        console.log('Created new admin user with username: admin and password: admin123');
      } catch (error) {
        console.error('Error creating admin user:', error);
      }
    }
  } catch (error) {
    console.error('Error ensuring admin exists:', error);
  }
}

// Run the function
ensureAdminExists()
  .then(() => {
    console.log('Admin user check complete');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to ensure admin exists:', err);
    process.exit(1);
  });
