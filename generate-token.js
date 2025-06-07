import jwt from 'jsonwebtoken';
import sqlite3 from 'better-sqlite3';

// Generate a JWT token for testing
const JWT_SECRET = 'str8-build-development-secret-key';
const TOKEN_EXPIRY = '30d'; // Token expires in 30 days

// Get the str8 user ID from the database
const db = sqlite3('str8build.db');
const user = db.prepare('SELECT id, username, role FROM users WHERE username = ?').get('str8');

console.log('User found:', user);

if (user) {
  // Generate a token for the user
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  
  console.log('Generated auth token:', token);
  console.log('\nUse this token in your API requests with the following curl command:');
  console.log(`\ncurl -v -H "Cookie: authToken=${token}" http://localhost:8081/api/users\n`);
} else {
  console.log('User not found!');
}
