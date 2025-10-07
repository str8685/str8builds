import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000; // Different from client port 8081 to avoid conflicts

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enhanced CORS for development
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5000', 
      'http://localhost:5173', 
      'http://localhost:8080',
      'http://localhost:8081',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:8081',
      'http://127.0.0.1:62709' // Browser preview proxy
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, true); // Allow all origins in development
    }
    return callback(null, true);
  },
  credentials: true
}));

// Debug middleware
app.use((req, res, next) => {
  console.log(`DEBUG: ${req.method} ${req.path}`, {
    origin: req.headers.origin,
    contentType: req.headers['content-type']
  });
  next();
});

// Serve static files from the client build and public directories
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

// In-memory storage for development
const users = [
  {
    id: 1,
    username: 'str8',
    email: 'admin@str8build.com',
    password: 'omokoroa2023', // Plain text for development only
    fullName: 'Admin User',
    companyName: 'STR8 BUILD',
    createdAt: new Date().toISOString()
  }
];

// Simple JWT-like token generation
const generateToken = (userId: number) => {
  return crypto.randomBytes(32).toString('hex');
};

// Auth routes
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Check if username exists
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password, // In production, this would be hashed
      fullName: req.body.fullName || null,
      companyName: req.body.companyName || null,
      phone: req.body.phone || null,
      defaultHourlyRate: req.body.defaultHourlyRate || null,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;

    console.log('User registered:', userWithoutPassword);

    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    console.log('Login request received:', { body: req.body });
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      console.log('Login failed: Missing username or password');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = users.find(u => u.username === username);

    if (!user) {
      console.log(`Login failed: User not found for username: ${username}`);
      return res.status(400).json({ error: 'User not found. Please check your username or register a new account.' });
    }

    // Verify password (in production this would use bcrypt)
    const isPasswordValid = user.password === password;
    
    if (!isPasswordValid) {
      console.log(`Login failed: Invalid password for username: ${username}`);
      return res.status(400).json({ error: 'Invalid password. Please check your password and try again.' });
    }

    console.log(`Login successful for user: ${user.username} (ID: ${user.id})`);

    // Generate token
    const token = generateToken(user.id);

    // Set cookie with persistent login (30 days)
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // Set to false in development for http connections
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
      sameSite: 'lax', // Using lax to allow cross-site requests in development
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error(`Login error:`, error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Logout user
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: 'Logout successful' });
});

// Get current user
app.get('/api/auth/user', (req, res) => {
  // Check for auth token
  const token = req.cookies?.authToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  // In a real app, we would validate the token
  // For development, just return the first user
  const user = users[0];
  
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  
  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  
  res.json(userWithoutPassword);
});

// API endpoint for health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Development server running without database' });
});

// For all other routes, serve the client app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Development server running on http://localhost:${PORT}`);
  console.log('Available users:', users.map(u => ({ username: u.username, password: u.password })));
}); 