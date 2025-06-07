import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import cookieParser from "cookie-parser";
import { storage } from './storage';
import { hashPassword } from './auth';
import { setupAdminUser } from './utils/setupAdmin';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the public directory
app.use(express.static('server/public'));
console.log('Serving static files from server/public');

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Function to check if default user exists (no auto-creation anymore)
async function checkDefaultUserExists() {
  try {
    // Just check if the user exists, don't create one automatically
    const existingUser = await storage.getUserByUsername("str8");
    
    if (existingUser) {
      console.log("Default STR8 user exists");
    } else {
      console.log("No default user found - first time users will need to register");
    }
  } catch (error) {
    console.error("Error checking if default user exists:", error);
  }
}

(async () => {
  console.log("Starting server initialization...");
  // Check if default user exists (changed from ensuring it exists)
  await checkDefaultUserExists();
  
  // Ensure an admin user exists
  await setupAdminUser();
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Add a special logging middleware to debug route handling
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api/')) {
      console.log(`DEBUG: API request to ${req.method} ${req.originalUrl}`);
    }
    next();
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Changed to port 9999 to avoid conflicts with other processes
  // this serves both the API and the client.
  const port = 8081;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
