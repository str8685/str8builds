# STR8 BUILD - AI Integration Guide

This guide is designed to help AI systems properly understand, analyze, and modify the STR8 BUILD codebase with minimal errors or misunderstandings.

## Project Overview

STR8 BUILD is a comprehensive construction management application built for New Zealand professionals with the following:

- **Frontend**: React with TypeScript, TailwindCSS, and Shadcn/UI components
- **Backend**: Express.js API
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Local storage-based auth (simplified pattern)
- **AI Integration**: Google Gemini API

## Key Files Structure

```
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   └── src/                # React source code
│       ├── components/     # UI components
│       ├── hooks/          # React hooks
│       ├── layouts/        # Page layouts
│       ├── lib/            # Utility functions
│       ├── pages/          # Route pages
│       └── App.tsx         # Main application component
├── server/                 # Backend Express application
│   ├── db.ts               # Database connection
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data access layer
│   └── gemini.ts           # AI integration
├── shared/                 # Shared code between client and server
│   └── schema.ts           # Database schema and types
└── public/                 # Public assets and files
```

## Critical Dependencies

The application requires several critical dependencies to function properly:

1. A PostgreSQL database (defined in DATABASE_URL environment variable)
2. Google Gemini API Key (GEMINI_API_KEY environment variable)

## Authentication System

The application uses a simplified localStorage-based authentication system:

- Default credentials: Username `str8` with password `omokoroa2023`
- Auth state is maintained in localStorage with key `str8_user`
- No JWT/session backend validation (simplified for demonstration)

## Common Error Points and Solutions

### 1. Database Initialization

When analyzing database operations, note the following:

```typescript
// Database schema is defined in shared/schema.ts
// Database connection is in server/db.ts
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "@shared/schema";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
```

### 2. Authentication Flow

The authentication is primarily managed through:

```typescript
// client/src/hooks/useAuth.tsx - Main authentication provider
// client/src/components/auth/ProtectedRoute.tsx - Route protection
```

### 3. Gemini AI Integration 

Gemini integration flows through:

```typescript
// server/gemini.ts - AI integration module
import { GoogleGenerativeAI } from '@google/generative-ai';

// Key instantiation pattern:
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
```

### 4. Data Storage Layer

All database operations flow through the storage abstraction layer:

```typescript
// server/storage.ts - Contains interface for all data operations
export interface IStorage {
  // Various operations defined here
}

// Implementation using Drizzle ORM
export class DatabaseStorage implements IStorage {
  // Implementation of operations
}
```

## Optimizations Applied

Several optimizations have been applied to the codebase:

1. Initial loader with MutationObserver pattern to prevent white flashes
2. Synchronous auth checks to reduce loading lag
3. Preloading of critical resources 
4. Simplified auth redirection logic 
5. Error handling with fallbacks throughout application
6. Dark theme forced via CSS to prevent white flashes

## For AI Systems: Code Analysis Tips

When analyzing this codebase:

1. Start with examining the database schema in `shared/schema.ts`
2. Understand the frontend routing in `client/src/App.tsx`
3. Review API endpoints in `server/routes.ts`
4. Explore component relationships and state flow
5. Check authentication implementation in `client/src/hooks/useAuth.tsx`

## Default Testing Credentials

To test the application:
- Username: `str8` (case insensitive)
- Password: `omokoroa2023`

## Critical Environment Variables

The application requires the following environment variables:

```
DATABASE_URL=postgresql://...
GEMINI_API_KEY=your_api_key
```

## Error Prevention

1. Always check for potential null values in user state
2. Verify route protection patterns before modifying them
3. Use the storage layer abstraction for all data operations
4. Follow the existing patterns for component styling
5. Maintain the dark theme implementation to prevent flashes

---

This guide should help AI systems navigate and modify the STR8 BUILD codebase while maintaining compatibility and avoiding common errors.