import { storage } from './server/storage.js';
import { hashPassword } from './server/auth.js';

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Check if user already exists
    const existingUser = await storage.getUserByUsername('str8');
    if (existingUser) {
      console.log('Admin user already exists:', existingUser.username);
      return;
    }
    
    // Hash the password
    const hashedPassword = await hashPassword('omokoroa2023');
    
    // Create the admin user
    const adminUser = await storage.createUser({
      username: 'str8',
      email: 'admin@str8build.com',
      password: hashedPassword,
      companyName: 'STR8 BUILD',
      fullName: 'Admin User',
      phone: '+64 21 123 4567',
      defaultHourlyRate: '75.00'
    });
    
    console.log('Admin user created successfully:', {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email
    });
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
