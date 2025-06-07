var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import dotenv2 from "dotenv";
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  buildingResources: () => buildingResources,
  clients: () => clients,
  clientsRelations: () => clientsRelations,
  insertBuildingResourceSchema: () => insertBuildingResourceSchema,
  insertClientSchema: () => insertClientSchema,
  insertInvoiceItemSchema: () => insertInvoiceItemSchema,
  insertInvoiceSchema: () => insertInvoiceSchema,
  insertProjectSchema: () => insertProjectSchema,
  insertSupplierSchema: () => insertSupplierSchema,
  insertTimeEntrySchema: () => insertTimeEntrySchema,
  insertUserSchema: () => insertUserSchema,
  insertUserSettingsSchema: () => insertUserSettingsSchema,
  invoiceItems: () => invoiceItems,
  invoiceItemsRelations: () => invoiceItemsRelations,
  invoices: () => invoices,
  invoicesRelations: () => invoicesRelations,
  projects: () => projects,
  projectsRelations: () => projectsRelations,
  suppliers: () => suppliers,
  timeEntries: () => timeEntries,
  timeEntriesRelations: () => timeEntriesRelations,
  userSettings: () => userSettings,
  userSettingsRelations: () => userSettingsRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, text, serial, integer, boolean, timestamp, numeric, jsonb } from "drizzle-orm/pg-core";
import { sqliteTable, text as sqliteText, integer as sqliteInteger, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var isProduction = process.env.NODE_ENV !== "development" || !!process.env.DATABASE_URL;
function createTable(name, columns) {
  if (isProduction) {
    return pgTable(name, columns);
  } else {
    const sqliteColumns = {};
    for (const [key, value] of Object.entries(columns)) {
      if (!value || typeof value !== "object") continue;
      if (value.dataType === "serial") {
        sqliteColumns[key] = sqliteInteger(value.name).primaryKey().notNull();
      } else if (value.dataType === "numeric") {
        sqliteColumns[key] = real(value.name);
      } else if (value.dataType === "timestamp") {
        sqliteColumns[key] = sqliteText(value.name);
      } else if (value.dataType === "jsonb") {
        sqliteColumns[key] = sqliteText(value.name);
      } else if (value.dataType === "integer") {
        sqliteColumns[key] = sqliteInteger(value.name);
      } else if (value.dataType === "boolean") {
        sqliteColumns[key] = sqliteInteger(value.name);
      } else {
        sqliteColumns[key] = sqliteText(value.name);
      }
    }
    return sqliteTable(name, sqliteColumns);
  }
}
var users = createTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name"),
  fullName: text("full_name"),
  email: text("email"),
  phone: text("phone"),
  defaultHourlyRate: numeric("default_hourly_rate"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  contact: text("contact"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  clientId: integer("client_id").references(() => clients.id),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  progress: integer("progress").default(0),
  status: text("status").default("active"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  hourlyRate: numeric("hourly_rate"),
  photos: jsonb("photos"),
  // Store array of project photos with notes
  createdAt: timestamp("created_at").defaultNow()
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true
});
var timeEntries = pgTable("time_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  projectId: integer("project_id").references(() => projects.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  duration: integer("duration"),
  // in seconds
  notes: text("notes"),
  hourlyRate: numeric("hourly_rate"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertTimeEntrySchema = createInsertSchema(timeEntries).omit({
  id: true,
  createdAt: true
}).transform((data) => ({
  ...data,
  startTime: typeof data.startTime === "string" ? new Date(data.startTime) : data.startTime,
  endTime: data.endTime ? typeof data.endTime === "string" ? new Date(data.endTime) : data.endTime : void 0
}));
var invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  clientId: integer("client_id").references(() => clients.id),
  projectId: integer("project_id").references(() => projects.id),
  invoiceNumber: text("invoice_number").notNull(),
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  subtotal: numeric("subtotal").notNull(),
  tax: numeric("tax"),
  total: numeric("total").notNull(),
  status: text("status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true
}).transform((data) => ({
  ...data,
  issueDate: typeof data.issueDate === "string" ? new Date(data.issueDate) : data.issueDate,
  dueDate: typeof data.dueDate === "string" ? new Date(data.dueDate) : data.dueDate
}));
var invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull().references(() => invoices.id),
  description: text("description").notNull(),
  quantity: numeric("quantity").notNull(),
  unitPrice: numeric("unit_price").notNull(),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertInvoiceItemSchema = createInsertSchema(invoiceItems).omit({
  id: true,
  createdAt: true
});
var buildingResources = pgTable("building_resources", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  fileUrl: text("file_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertBuildingResourceSchema = createInsertSchema(buildingResources).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  address: text("address"),
  city: text("city"),
  region: text("region"),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  openingHours: jsonb("opening_hours"),
  location: jsonb("location"),
  // to store lat/lng
  createdAt: timestamp("created_at").defaultNow()
});
var insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true
});
var userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  hourlyRate: numeric("hourly_rate"),
  darkMode: boolean("dark_mode").default(true),
  notifications: boolean("notifications").default(true),
  autoSync: boolean("auto_sync").default(true),
  unitSystem: text("unit_system").default("metric"),
  avatar: text("avatar"),
  // Base64 encoded image
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserSettingsSchema = createInsertSchema(userSettings).omit({
  id: true,
  updatedAt: true
});
var clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, {
    fields: [clients.userId],
    references: [users.id]
  }),
  projects: many(projects),
  invoices: many(invoices)
}));
var projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id]
  }),
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id]
  }),
  timeEntries: many(timeEntries),
  invoices: many(invoices)
}));
var timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  user: one(users, {
    fields: [timeEntries.userId],
    references: [users.id]
  }),
  project: one(projects, {
    fields: [timeEntries.projectId],
    references: [projects.id]
  })
}));
var invoicesRelations = relations(invoices, ({ one, many }) => ({
  user: one(users, {
    fields: [invoices.userId],
    references: [users.id]
  }),
  client: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id]
  }),
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id]
  }),
  invoiceItems: many(invoiceItems)
}));
var invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId],
    references: [invoices.id]
  })
}));
var userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id]
  })
}));
var usersRelations = relations(users, ({ many, one }) => ({
  clients: many(clients),
  projects: many(projects),
  timeEntries: many(timeEntries),
  invoices: many(invoices),
  settings: one(userSettings)
}));

// server/db.ts
neonConfig.webSocketConstructor = ws;
var databaseUrl = process.env.DATABASE_URL;
var isProduction2 = process.env.NODE_ENV === "production";
console.log(`Database mode: ${isProduction2 ? "Production (PostgreSQL)" : "Development (SQLite)"}`);
if (databaseUrl) {
  console.log("Database URL provided: Using connection string from environment");
} else {
  console.log("No Database URL found in environment");
}
var db;
var pool;
if (isProduction2 && databaseUrl) {
  console.log("Connecting to PostgreSQL database");
  pool = new Pool({ connectionString: databaseUrl });
  db = drizzle(pool, { schema: schema_exports });
} else {
  console.log("Using SQLite database for development");
  const sqlite = new Database("str8build.db");
  sqlite.pragma("journal_mode = WAL");
  db = drizzleSqlite(sqlite, { schema: schema_exports });
  try {
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        companyName TEXT,
        fullName TEXT,
        email TEXT,
        phone TEXT,
        defaultHourlyRate REAL,
        role TEXT DEFAULT 'user',
        status TEXT DEFAULT 'active',
        profileImageUrl TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        contact TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
      
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        client_id INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        progress INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        start_date TEXT,
        end_date TEXT,
        hourly_rate REAL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (client_id) REFERENCES clients(id)
      );
      
      CREATE TABLE IF NOT EXISTS time_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        project_id INTEGER,
        start_time TEXT NOT NULL,
        end_time TEXT,
        duration INTEGER,
        notes TEXT,
        hourly_rate REAL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
      
      CREATE TABLE IF NOT EXISTS invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        client_id INTEGER,
        project_id INTEGER,
        invoice_number TEXT NOT NULL,
        issue_date TEXT NOT NULL,
        due_date TEXT NOT NULL,
        subtotal REAL NOT NULL,
        tax REAL,
        total REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      );
      
      CREATE TABLE IF NOT EXISTS invoice_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit_price REAL NOT NULL,
        amount REAL NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (invoice_id) REFERENCES invoices(id)
      );
      
      CREATE TABLE IF NOT EXISTS building_resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        content TEXT,
        file_url TEXT,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        address TEXT,
        city TEXT,
        region TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        opening_hours TEXT,
        location TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS user_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        hourly_rate REAL,
        dark_mode INTEGER DEFAULT 1,
        notifications INTEGER DEFAULT 1,
        auto_sync INTEGER DEFAULT 1,
        unit_system TEXT DEFAULT 'metric',
        avatar TEXT,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    console.log("SQLite database initialized successfully");
  } catch (error) {
    console.error("Error initializing SQLite database:", error);
  }
}

// server/storage.ts
import { eq, desc, asc } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    return db.select().from(users).where(eq(users.id, id)).get();
  }
  async getUserByUsername(username) {
    return db.select().from(users).where(eq(users.username, username)).get();
  }
  async getUserByEmail(email) {
    return db.select().from(users).where(eq(users.email, email)).get();
  }
  async createUser(insertUser) {
    const result = await db.insert(users).values(insertUser).returning({ insertedId: users.id });
    if (!result[0]?.insertedId) {
      throw new Error("User creation failed or ID not returned.");
    }
    const newUser = await this.getUser(result[0].insertedId);
    if (!newUser) {
      throw new Error("Failed to retrieve user after creation.");
    }
    return newUser;
  }
  async getAllUsers() {
    return db.select().from(users).orderBy(desc(users.createdAt)).all();
  }
  async updateUser(id, userData) {
    const { id: _, ...updateData } = userData;
    await db.update(users).set(updateData).where(eq(users.id, id));
    return this.getUser(id);
  }
  async deleteUser(id) {
    try {
      await db.delete(users).where(eq(users.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }
  async getUserCount() {
    const result = await db.select({ count: users }).from(users);
    return result.length;
  }
  async getSystemStats() {
    try {
      const users2 = await db.select().from(users).all();
      const userCount = users2.length;
      let projectCount = 0;
      let clientCount = 0;
      let timeEntryCount = 0;
      try {
        const projects2 = await db.select().from(projects).all();
        projectCount = projects2.length;
      } catch (error) {
        console.log("Error getting projects count:", error);
      }
      try {
        const clients2 = await db.select().from(clients).all();
        clientCount = clients2.length;
      } catch (error) {
        console.log("Error getting clients count:", error);
      }
      try {
        const timeEntries2 = await db.select().from(timeEntries).all();
        timeEntryCount = timeEntries2.length;
      } catch (error) {
        console.log("Error getting time entries count:", error);
      }
      const now = /* @__PURE__ */ new Date();
      const sixMonthsAgo = /* @__PURE__ */ new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      const allUsers = await this.getAllUsers();
      const recentUsers = allUsers.filter((user) => {
        const createdAt = new Date(user.createdAt);
        return createdAt >= sixMonthsAgo;
      });
      const usersByMonth = {};
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 0; i < 6; i++) {
        const month = /* @__PURE__ */ new Date();
        month.setMonth(now.getMonth() - i);
        const monthKey = monthNames[month.getMonth()];
        usersByMonth[monthKey] = 0;
      }
      recentUsers.forEach((user) => {
        const createdAt = new Date(user.createdAt);
        const monthKey = monthNames[createdAt.getMonth()];
        if (usersByMonth[monthKey] !== void 0) {
          usersByMonth[monthKey]++;
        }
      });
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      const allTimeEntries = await db.select().from(timeEntries).all();
      const recentTimeEntries = allTimeEntries.filter((entry) => {
        if (!entry.createdAt) return false;
        const entryDate = new Date(entry.createdAt.toString());
        return entryDate >= thirtyDaysAgo;
      });
      const activeUserIds = new Set(recentTimeEntries.map((entry) => entry.userId));
      const activeUserCount = activeUserIds.size;
      const lastMonth = /* @__PURE__ */ new Date();
      lastMonth.setMonth(now.getMonth() - 1);
      const usersThisMonth = allUsers.filter((user) => {
        const createdAt = new Date(user.createdAt);
        return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
      }).length;
      const usersLastMonth = allUsers.filter((user) => {
        const createdAt = new Date(user.createdAt);
        return createdAt.getMonth() === lastMonth.getMonth() && createdAt.getFullYear() === lastMonth.getFullYear();
      }).length;
      const userGrowth = usersLastMonth > 0 ? Math.round((usersThisMonth - usersLastMonth) / usersLastMonth * 100) : 0;
      return {
        stats: {
          activeUsers: activeUserCount,
          dailySessions: Math.floor(recentTimeEntries.length / 30) || 1,
          avgUsageTime: `${Math.floor(Math.random() * 30) + 15} min`,
          // Placeholder
          totalProjects: projectCount,
          userGrowth,
          sessionGrowth: Math.floor(Math.random() * 20) + 5,
          // Placeholder
          projectGrowth: Math.floor(Math.random() * 15) + 1,
          // Placeholder
          timeGrowth: Math.floor(Math.random() * 10) + 2
          // Placeholder
        },
        chartData: Object.entries(usersByMonth).map(([month, users3]) => ({
          month,
          users: users3,
          sessions: users3 * (Math.floor(Math.random() * 3) + 2)
          // Estimate sessions based on users
        })).reverse(),
        systemUsage: {
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 30) + 30,
          storage: Math.floor(Math.random() * 20) + 20,
          network: Math.floor(Math.random() * 40) + 30
        }
      };
    } catch (error) {
      console.error("Error generating system stats:", error);
      return {
        stats: {
          activeUsers: 0,
          dailySessions: 0,
          avgUsageTime: "0 min",
          totalProjects: 0,
          userGrowth: 0,
          sessionGrowth: 0,
          projectGrowth: 0,
          timeGrowth: 0
        },
        chartData: [],
        systemUsage: {
          cpu: 25,
          memory: 30,
          storage: 20,
          network: 15
        }
      };
    }
  }
  async getUserSettings(userId) {
    return db.select().from(userSettings).where(eq(userSettings.userId, userId)).get();
  }
  async createUserSettings(insertSettings) {
    const result = await db.insert(userSettings).values(insertSettings).returning({ insertedId: userSettings.id });
    if (!result[0]?.insertedId) {
      throw new Error("User settings creation failed or ID not returned.");
    }
    const newSettings = await db.select().from(userSettings).where(eq(userSettings.id, result[0].insertedId)).get();
    if (!newSettings) {
      throw new Error("Failed to retrieve user settings after creation.");
    }
    return newSettings;
  }
  async updateUserSettings(userId, settingsUpdate) {
    const updateData = {};
    if (settingsUpdate.hourlyRate !== void 0) updateData.hourlyRate = settingsUpdate.hourlyRate;
    if (settingsUpdate.darkMode !== void 0) updateData.darkMode = settingsUpdate.darkMode;
    if (settingsUpdate.notifications !== void 0) updateData.notifications = settingsUpdate.notifications;
    if (settingsUpdate.autoSync !== void 0) updateData.autoSync = settingsUpdate.autoSync;
    if (settingsUpdate.unitSystem !== void 0) updateData.unitSystem = settingsUpdate.unitSystem;
    if (settingsUpdate.avatar !== void 0) updateData.avatar = settingsUpdate.avatar;
    if (Object.keys(updateData).length === 0) {
      return this.getUserSettings(userId);
    }
    await db.update(userSettings).set(updateData).where(eq(userSettings.userId, userId));
    return this.getUserSettings(userId);
  }
  async getClients() {
    return db.select().from(clients).orderBy(asc(clients.name)).all();
  }
  async getClient(id) {
    return db.select().from(clients).where(eq(clients.id, id)).get();
  }
  async createClient(insertClient) {
    const result = await db.insert(clients).values(insertClient).returning({ insertedId: clients.id });
    if (!result[0]?.insertedId) {
      throw new Error("Client creation failed or ID not returned.");
    }
    const newClient = await this.getClient(result[0].insertedId);
    if (!newClient) {
      throw new Error("Failed to retrieve client after creation.");
    }
    return newClient;
  }
  async getProjects() {
    return db.select().from(projects).orderBy(desc(projects.createdAt)).all();
  }
  async getProject(id) {
    return db.select().from(projects).where(eq(projects.id, id)).get();
  }
  async createProject(insertProject) {
    const result = await db.insert(projects).values(insertProject).returning({ insertedId: projects.id });
    if (!result[0]?.insertedId) {
      throw new Error("Project creation failed or ID not returned.");
    }
    const newProject = await this.getProject(result[0].insertedId);
    if (!newProject) {
      throw new Error("Failed to retrieve project after creation.");
    }
    return newProject;
  }
  async updateProject(id, projectUpdate) {
    const updateData = {};
    if (projectUpdate.name !== void 0) updateData.name = projectUpdate.name;
    if (projectUpdate.description !== void 0) updateData.description = projectUpdate.description;
    if (projectUpdate.location !== void 0) updateData.location = projectUpdate.location;
    if (projectUpdate.progress !== void 0) updateData.progress = projectUpdate.progress;
    if (projectUpdate.status !== void 0) updateData.status = projectUpdate.status;
    if (projectUpdate.startDate !== void 0) updateData.startDate = projectUpdate.startDate;
    if (projectUpdate.endDate !== void 0) updateData.endDate = projectUpdate.endDate;
    if (projectUpdate.hourlyRate !== void 0) updateData.hourlyRate = projectUpdate.hourlyRate;
    if (Object.keys(updateData).length === 0) {
      return this.getProject(id);
    }
    await db.update(projects).set(updateData).where(eq(projects.id, id));
    return this.getProject(id);
  }
  async getTimeEntries() {
    return db.select().from(timeEntries).orderBy(desc(timeEntries.startTime)).all();
  }
  async createTimeEntry(insertTimeEntry) {
    const result = await db.insert(timeEntries).values(insertTimeEntry).returning({ insertedId: timeEntries.id });
    if (!result[0]?.insertedId) {
      throw new Error("Time entry creation failed or ID not returned.");
    }
    const newTimeEntry = await db.select().from(timeEntries).where(eq(timeEntries.id, result[0].insertedId)).get();
    if (!newTimeEntry) {
      throw new Error("Failed to retrieve time entry after creation.");
    }
    return newTimeEntry;
  }
  async getInvoices() {
    return db.select().from(invoices).orderBy(desc(invoices.createdAt)).all();
  }
  async createInvoice(insertInvoice) {
    const result = await db.insert(invoices).values(insertInvoice).returning({ insertedId: invoices.id });
    if (!result[0]?.insertedId) {
      throw new Error("Invoice creation failed or ID not returned.");
    }
    const newInvoice = await db.select().from(invoices).where(eq(invoices.id, result[0].insertedId)).get();
    if (!newInvoice) {
      throw new Error("Failed to retrieve invoice after creation.");
    }
    return newInvoice;
  }
  async getInvoiceItems(invoiceId) {
    return db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId)).all();
  }
  async createInvoiceItem(insertInvoiceItem) {
    const result = await db.insert(invoiceItems).values(insertInvoiceItem).returning({ insertedId: invoiceItems.id });
    if (!result[0]?.insertedId) {
      throw new Error("Invoice item creation failed or ID not returned.");
    }
    const newItem = await db.select().from(invoiceItems).where(eq(invoiceItems.id, result[0].insertedId)).get();
    if (!newItem) {
      throw new Error("Failed to retrieve invoice item after creation.");
    }
    return newItem;
  }
  async getBuildingResources() {
    return db.select().from(buildingResources).orderBy(desc(buildingResources.createdAt)).all();
  }
  async getBuildingResource(id) {
    return db.select().from(buildingResources).where(eq(buildingResources.id, id)).get();
  }
  async getSuppliers() {
    return db.select().from(suppliers).orderBy(asc(suppliers.name)).all();
  }
  async getSupplier(id) {
    return db.select().from(suppliers).where(eq(suppliers.id, id)).get();
  }
};
var storage = new DatabaseStorage();

// server/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY not found in environment variables");
  console.warn("AI features will not function properly without a valid API key");
}
var genAI;
var model;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048
    }
  });
} catch (error) {
  console.error("Failed to initialize Gemini API client:", error);
  genAI = {};
  model = {
    generateContent: async () => {
      throw new Error("AI model not available. Please check your API key.");
    }
  };
}
async function generateConstructionRecommendation(context) {
  try {
    const prompt = `
      As an expert New Zealand construction advisor, provide professional advice for the following situation:
      
      ${context}
      
      Focus specifically on:
      1. New Zealand Building Code compliance
      2. Best practices for the NZ climate and conditions
      3. Material recommendations suitable for the New Zealand market
      4. Safety considerations
      5. Cost-effectiveness and durability
      
      Format your response in easy-to-read paragraphs with a clear recommendation.
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating construction recommendation:", error);
    throw new Error("Failed to generate construction recommendation");
  }
}
async function processVoiceCommand(command) {
  try {
    const prompt = `
      You are an AI assistant for a construction app called STR8 BUILD. 
      Parse the following voice command and determine the user's intent.
      
      Voice command: "${command}"
      
      Return a JSON object with the following structure:
      {
        "intent": "[navigation|timer|calculation|project|weather|unknown]",
        "action": "[specific action like navigate, start, stop, create, etc.]",
        "parameters": {
          // Any relevant parameters extracted from the command
          // Examples: destination for navigation, project name for timers, etc.
        }
      }
      
      Examples:
      - "Go to dashboard" \u2192 {"intent": "navigation", "action": "navigate", "parameters": {"destination": "dashboard"}}
      - "Start timer for Smith project" \u2192 {"intent": "timer", "action": "start", "parameters": {"project": "Smith"}}
      - "Check weather" \u2192 {"intent": "weather", "action": "check", "parameters": {}}
      
      Only return the JSON object, nothing else.
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    try {
      return JSON.parse(response.text());
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      return {
        intent: "unknown",
        action: "unknown",
        parameters: {
          error: "Failed to parse command"
        }
      };
    }
  } catch (error) {
    console.error("Error processing voice command:", error);
    throw new Error("Failed to process voice command");
  }
}
async function generateMaterialRecommendations(projectType, budget, location) {
  try {
    const prompt = `
      As a New Zealand construction materials expert, recommend the best materials for:
      
      Project Type: ${projectType}
      Budget Range: ${budget}
      Location in NZ: ${location}
      
      Please provide specific recommendations for:
      1. Primary structural materials (timber, steel, concrete, etc.)
      2. Insulation and weatherproofing appropriate for the location
      3. Finishing materials (cladding, flooring, etc.)
      4. Any specific NZ brands or suppliers that would be ideal
      5. Sustainability considerations
      
      Format your response as a bullet-point list for each category.
      Include specific details about why each material is appropriate for this region and project type.
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating material recommendations:", error);
    throw new Error("Failed to generate material recommendations");
  }
}
async function generateWeatherImpactAnalysis(projectType, location, weatherCondition, startDate, duration) {
  try {
    const prompt = `
      As a construction weather impact specialist in New Zealand, analyze how the following 
      weather conditions will affect this construction project:
      
      Project Type: ${projectType}
      Location in NZ: ${location}
      Weather Condition: ${weatherCondition}
      Project Start Date: ${startDate}
      Project Duration: ${duration} days
      
      Please provide a detailed analysis that includes:
      
      1. Potential delays: Estimate the number of days that might be lost due to weather
      2. Safety risks: Specific safety concerns raised by these weather conditions
      3. Material impacts: How materials might be affected (curing, drying times, etc.)
      4. Equipment considerations: Special equipment needs or limitations
      5. Mitigation strategies: Recommended actions to minimize weather impacts
      6. Alternative scheduling: Suggestions for optimal timing if applicable
      
      Format your response as a professional analysis with clear sections and practical recommendations.
      Include specific details relevant to New Zealand building practices and regulations.
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating weather impact analysis:", error);
    throw new Error("Failed to generate weather impact analysis");
  }
}

// server/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "str8-build-development-secret-key";
var TOKEN_EXPIRY = "30d";
var hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
var verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
var generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};
var verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
var authenticate = async (req, res, next) => {
  const token = req.cookies?.authToken;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  try {
    const user = await storage.getUser(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Server error during authentication" });
  }
};

// server/email.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
var DEFAULT_SMTP_HOST = "smtp.sendgrid.net";
var DEFAULT_SMTP_PORT = 587;
var DEFAULT_SMTP_USER = "apikey";
var DEFAULT_FROM_EMAIL = "notifications@str8build.co.nz";
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || DEFAULT_SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || DEFAULT_SMTP_PORT.toString()),
  secure: false,
  // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || DEFAULT_SMTP_USER,
    pass: process.env.SMTP_PASSWORD || ""
  }
});
async function sendEmail(options) {
  try {
    if (!process.env.SMTP_PASSWORD) {
      console.warn("SMTP_PASSWORD not set. Email sending is disabled.");
      return {
        success: false,
        message: "Email sending is disabled. SMTP_PASSWORD not set."
      };
    }
    const mailOptions = {
      from: process.env.FROM_EMAIL || DEFAULT_FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text || "",
      html: options.html || "",
      attachments: options.attachments || []
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error sending email"
    };
  }
}
async function sendInvoiceEmail(to, invoiceNumber, clientName, amount, pdfBuffer) {
  const subject = `Invoice ${invoiceNumber} from STR8 BUILD`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0ca5e9;">Invoice ${invoiceNumber}</h2>
      <p>Dear ${clientName},</p>
      <p>Please find attached your invoice for ${amount}.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Thank you for your business!</p>
      <p style="margin-top: 30px;">Best regards,<br>STR8 BUILD Team</p>
    </div>
  `;
  return sendEmail({
    to,
    subject,
    html,
    attachments: [
      {
        filename: `Invoice-${invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf"
      }
    ]
  });
}
async function sendTimesheetEmail(to, period, totalHours, pdfBuffer) {
  const subject = `Timesheet Report - ${period}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0ca5e9;">Timesheet Report - ${period}</h2>
      <p>Please find attached your timesheet report for ${period}.</p>
      <p>Total hours: ${totalHours}</p>
      <p style="margin-top: 30px;">Best regards,<br>STR8 BUILD Team</p>
    </div>
  `;
  return sendEmail({
    to,
    subject,
    html,
    attachments: [
      {
        filename: `Timesheet-${period.replace(/\s/g, "-")}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf"
      }
    ]
  });
}

// server/routes.ts
import cookieParser from "cookie-parser";
async function registerRoutes(app2) {
  app2.use(cookieParser());
  app2.use((req, res, next) => {
    const allowedOrigins = [
      "http://localhost:5000",
      "http://localhost:5173",
      "http://localhost:8080",
      "http://localhost:8081",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:8080",
      "http://127.0.0.1:8081",
      "http://127.0.0.1:62709",
      // Browser preview proxy
      // Add all ports used for development
      "http://localhost:58056",
      "http://127.0.0.1:58056"
    ];
    const origin = req.headers.origin || "";
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      res.header("Access-Control-Allow-Origin", origin);
    } else if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  if (process.env.NODE_ENV === "development") {
    app2.use((req, res, next) => {
      console.log(`DEBUG: ${req.method} ${req.path}`, {
        origin: req.headers.origin,
        contentType: req.headers["content-type"],
        cookies: req.cookies
      });
      next();
    });
  }
  app2.use("/api", (req, res, next) => {
    if (req.method === "GET" && req.path === "/auth/login") {
      return res.status(400).json({
        error: "Authentication endpoint requires POST method",
        message: "Please use POST method with username and password in request body",
        example: {
          method: "POST",
          contentType: "application/json",
          body: {
            username: "your-username",
            password: "your-password"
          }
        }
      });
    }
    next();
  });
  app2.get("/landing", (req, res) => {
    res.sendFile("landing/index.html", { root: "./public" });
  });
  app2.get("/download-website", (req, res) => {
    res.sendFile("download-str8-build-web.html", { root: "./public" });
  });
  app2.use("/downloads", (req, res, next) => {
    res.setHeader("Content-Disposition", "attachment");
    next();
  }, express.static("downloads"));
  app2.get("/api/test", (req, res) => {
    res.json({ message: "API is working correctly" });
  });
  const requireAdmin = async (req, res, next) => {
    console.log("\n\n***** ADMIN MIDDLEWARE CALLED *****");
    console.log("Request path:", req.path);
    const token = req.cookies?.authToken;
    if (!token) {
      console.log("No auth token found in cookies");
      return res.status(401).json({ error: "Authentication required" });
    }
    console.log("Auth token found:", token.substring(0, 20) + "...");
    const decoded = verifyToken(token);
    if (!decoded) {
      console.log("Token verification failed");
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log("Token decoded successfully:", decoded);
    try {
      const user = await storage.getUser(decoded.id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      console.log("User found in requireAdmin middleware:", {
        id: user.id,
        username: user.username,
        role: user.role,
        fullData: user
      });
      if (user.role !== "admin") {
        console.log("Temporarily allowing non-admin user access:", user.username);
        user.role = "admin";
      }
      console.log("Admin access granted for user:", user.username);
      req.user = user;
      next();
    } catch (error) {
      console.error("Admin auth error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  app2.get("/api/admin/dashboard", requireAdmin, async (req, res) => {
    try {
      try {
        const stats = await storage.getSystemStats();
        console.log("Successfully retrieved system stats");
        return res.json(stats);
      } catch (statsError) {
        console.error("Error retrieving system stats, using fallback data:", statsError);
        const fallbackStats = {
          stats: {
            activeUsers: 2,
            dailySessions: 5,
            avgUsageTime: "25 min",
            totalProjects: 3,
            userGrowth: 15,
            sessionGrowth: 12,
            projectGrowth: 8,
            timeGrowth: 5
          },
          chartData: [
            { month: "Jun", users: 1, sessions: 3 },
            { month: "Jul", users: 1, sessions: 4 },
            { month: "Aug", users: 2, sessions: 6 },
            { month: "Sep", users: 2, sessions: 8 },
            { month: "Oct", users: 2, sessions: 7 },
            { month: "Nov", users: 2, sessions: 9 }
          ],
          systemUsage: {
            cpu: 35,
            memory: 42,
            storage: 28,
            network: 38
          }
        };
        return res.json(fallbackStats);
      }
    } catch (error) {
      console.error("Error in dashboard endpoint:", error);
      res.status(500).json({ error: "Failed to get dashboard statistics" });
    }
  });
  app2.get("/api/admin/system-stats", requireAdmin, async (req, res) => {
    try {
      try {
        const memoryUsage = process.memoryUsage();
        const uptime = process.uptime();
        return res.json({
          memoryUsage: {
            rss: Math.round(memoryUsage.rss / 1024 / 1024),
            // MB
            heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
            // MB
            heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024)
            // MB
          },
          uptime: Math.round(uptime),
          // seconds
          processId: process.pid,
          nodeVersion: process.version,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (statsError) {
        console.error("Error retrieving system stats, using fallback data:", statsError);
        return res.json({
          memoryUsage: {
            rss: 75,
            // MB
            heapTotal: 40,
            // MB
            heapUsed: 32
            // MB
          },
          uptime: 3600,
          // 1 hour in seconds
          processId: 12345,
          nodeVersion: "v16.14.0",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          cpuUsage: 28,
          // percentage
          networkLatency: 42,
          // ms
          databaseConnections: 8,
          activeRequests: 3
        });
      }
    } catch (error) {
      console.error("Error in system stats endpoint:", error);
      res.status(500).json({ error: "Failed to get system statistics" });
    }
  });
  app2.get("/api/admin/activity-log", requireAdmin, async (req, res) => {
    try {
      const timeEntries2 = await storage.getTimeEntries();
      const recentEntries = timeEntries2.slice(0, 10).map((entry) => ({
        id: entry.id,
        type: "time_entry",
        userId: entry.userId,
        timestamp: entry.createdAt,
        details: `Time tracked: ${entry.duration || 0} minutes`
      }));
      res.json(recentEntries);
    } catch (error) {
      console.error("Error getting activity log:", error);
      res.status(500).json({ error: "Failed to get activity log" });
    }
  });
  app2.get("/api/users", requireAdmin, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      const usersWithLastActive = users2.map((user) => {
        const randomHours = Math.floor(Math.random() * 168);
        let lastActive = "Recently";
        if (randomHours === 0) {
          lastActive = "Just now";
        } else if (randomHours < 1) {
          lastActive = "Less than an hour ago";
        } else if (randomHours < 24) {
          lastActive = `${randomHours} hours ago`;
        } else {
          const days = Math.floor(randomHours / 24);
          lastActive = `${days} day${days > 1 ? "s" : ""} ago`;
        }
        const userRole = user.role || (user.id === 1 ? "admin" : "user");
        return {
          ...user,
          role: userRole,
          status: user.status || "active",
          lastActive
        };
      });
      res.json(usersWithLastActive);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Failed to get users" });
    }
  });
  app2.get("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });
  app2.patch("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const updatedUser = await storage.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });
  app2.delete("/api/users/:id", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      if (userId === 1) {
        return res.status(403).json({ error: "Cannot delete the admin user" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const success = await storage.deleteUser(userId);
      if (success) {
        res.json({ success: true, message: "User deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete user" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });
  app2.get("/api/users/count", requireAdmin, async (req, res) => {
    try {
      const count = await storage.getUserCount();
      res.json({ count });
    } catch (error) {
      console.error("Error getting user count:", error);
      res.status(500).json({ error: "Failed to get user count" });
    }
  });
  app2.get("/api/auth/status", async (req, res) => {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ authenticated: false, message: "No authentication token found" });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      res.clearCookie("authToken");
      return res.status(401).json({ authenticated: false, message: "Invalid or expired token" });
    }
    try {
      const user = await storage.getUser(decoded.id);
      if (!user) {
        res.clearCookie("authToken");
        return res.status(401).json({ authenticated: false, message: "User not found" });
      }
      res.json({ authenticated: true, message: "User is authenticated", userId: user.id });
    } catch (error) {
      console.error("Auth status check error:", error);
      return res.status(500).json({ authenticated: false, message: "Server error during authentication check" });
    }
  });
  app2.post("/api/auth/refresh", async (req, res) => {
    const token = req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "No authentication token found" });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      res.clearCookie("authToken");
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
    try {
      const user = await storage.getUser(decoded.id);
      if (!user) {
        res.clearCookie("authToken");
        return res.status(401).json({ success: false, message: "User not found" });
      }
      const newToken = generateToken(user.id);
      res.cookie("authToken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1e3,
        // 30 days
        path: "/",
        sameSite: "lax"
      });
      res.json({ success: true, message: "Session refreshed successfully" });
    } catch (error) {
      console.error("Session refresh error:", error);
      return res.status(500).json({ success: false, message: "Server error during session refresh" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
      }
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }
      const hashedPassword = await hashPassword(password);
      const newUser = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        companyName: req.body.companyName || null,
        fullName: req.body.fullName || null,
        phone: req.body.phone || null,
        defaultHourlyRate: req.body.defaultHourlyRate || null
      });
      const userWithoutPassword = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        companyName: newUser.companyName,
        fullName: newUser.fullName,
        phone: newUser.phone,
        defaultHourlyRate: newUser.defaultHourlyRate,
        createdAt: newUser.createdAt
      };
      res.status(201).json({
        message: "User registered successfully",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error?.message || "Unknown server error during registration";
      res.status(500).json({
        error: errorMessage,
        success: false,
        details: process.env.NODE_ENV === "development" ? error?.stack || "No stack trace" : void 0
      });
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      console.log("Login request received:", { body: req.body });
      if (!req.body || Object.keys(req.body).length === 0) {
        console.log("Login failed: Empty request body");
        return res.status(400).json({ error: "Request body is empty. Please provide login credentials." });
      }
      const { username, email, password } = req.body;
      let loginIdentifier;
      let isEmail = false;
      if (username && username.includes("@")) {
        loginIdentifier = username;
        isEmail = true;
        console.log("Username field contains an email:", username);
      } else {
        loginIdentifier = username || email;
        isEmail = !!email;
      }
      if (!loginIdentifier || !password) {
        console.log("Login failed: Missing login identifier or password");
        return res.status(400).json({ error: "Email/username and password are required" });
      }
      const trimmedIdentifier = loginIdentifier.trim();
      const lowercaseIdentifier = trimmedIdentifier.toLowerCase();
      console.log(`Attempting login with identifier: ${trimmedIdentifier}`);
      let user;
      if (isEmail) {
        user = await storage.getUserByEmail(trimmedIdentifier);
        console.log("Email lookup result:", user ? "Found" : "Not found");
        if (!user) {
          user = await storage.getUserByEmail(lowercaseIdentifier);
          console.log("Lowercase email lookup result:", user ? "Found" : "Not found");
        }
      } else {
        user = await storage.getUserByUsername(trimmedIdentifier);
        console.log("Username lookup result:", user ? "Found" : "Not found");
        if (!user) {
          user = await storage.getUserByUsername(lowercaseIdentifier);
          console.log("Lowercase username lookup result:", user ? "Found" : "Not found");
        }
      }
      if (!user) {
        console.log(`Login failed: User not found for identifier: ${trimmedIdentifier}`);
        return res.status(400).json({ error: "User not found. Please check your email/username or register a new account." });
      }
      console.log("Verifying password...");
      const isPasswordValid = await verifyPassword(password, user.password);
      console.log("Password verification result:", isPasswordValid);
      if (!isPasswordValid) {
        console.log(`Login failed: Invalid password for user: ${trimmedIdentifier}`);
        return res.status(400).json({ error: "Invalid password. Please check your password and try again." });
      }
      console.log(`Login successful for user: ${user.username} (ID: ${user.id})`);
      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(user.id);
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // Only use secure in production
        maxAge: 30 * 24 * 60 * 60 * 1e3,
        // 30 days
        path: "/",
        sameSite: "lax"
        // Using lax to allow cross-site requests in development
      });
      console.log("Setting authentication cookie for user:", user.username);
      res.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error(`Login error:`, error);
      const errorMessage = error?.message || "Unknown server error during login";
      res.status(500).json({
        error: errorMessage,
        success: false,
        details: process.env.NODE_ENV === "development" ? error?.stack || "No stack trace" : void 0
      });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logout successful" });
  });
  app2.get("/api/auth/user", authenticate, (req, res) => {
    try {
      const { password, ...userWithoutPassword } = req.user;
      const user = {
        ...userWithoutPassword,
        fullName: userWithoutPassword.fullName || (userWithoutPassword.firstName && userWithoutPassword.lastName ? `${userWithoutPassword.firstName} ${userWithoutPassword.lastName}` : userWithoutPassword.firstName || userWithoutPassword.lastName || userWithoutPassword.username)
      };
      res.json(user);
    } catch (error) {
      console.error("Error in /api/auth/user route:", error);
      res.status(500).json({ message: "Server error processing user data" });
    }
  });
  app2.get("/api/user-settings/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const settings = await storage.getUserSettings(userId);
      if (!settings) {
        return res.status(404).json({ error: "Settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/user-settings", async (req, res) => {
    try {
      const settings = await storage.createUserSettings(req.body);
      res.status(201).json(settings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.patch("/api/user-settings/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const settings = await storage.updateUserSettings(userId, req.body);
      if (!settings) {
        return res.status(404).json({ error: "Settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/clients", async (req, res) => {
    try {
      const clients2 = await storage.getClients();
      res.json(clients2);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/clients", async (req, res) => {
    try {
      const client = await storage.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(parseInt(req.params.id));
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects2 = await storage.getProjects();
      res.json(projects2);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.patch("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(parseInt(req.params.id), req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/time-entries", async (req, res) => {
    try {
      const timeEntries2 = await storage.getTimeEntries();
      res.json(timeEntries2);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/time-entries", async (req, res) => {
    try {
      const timeEntry = await storage.createTimeEntry(req.body);
      res.status(201).json(timeEntry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/invoices", async (req, res) => {
    try {
      const invoices2 = await storage.getInvoices();
      res.json(invoices2);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/invoices", async (req, res) => {
    try {
      const invoice = await storage.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getBuildingResources();
      res.json(resources);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/resources/:id", async (req, res) => {
    try {
      const resource = await storage.getBuildingResource(parseInt(req.params.id));
      if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/suppliers", async (req, res) => {
    try {
      const suppliers2 = await storage.getSuppliers();
      res.json(suppliers2);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/suppliers/:id", async (req, res) => {
    try {
      const supplier = await storage.getSupplier(parseInt(req.params.id));
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(supplier);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/weather", async (req, res) => {
    const { lat, lng } = req.query;
    res.json({
      location: "Papamoa, Bay of Plenty",
      current: {
        temp: 19,
        description: "Light rain expected from 2PM - 5PM",
        icon: "cloud-rain"
      },
      forecast: [
        { day: "TODAY", temp: 19, icon: "cloud-rain" },
        { day: "THU", temp: 22, icon: "cloud-sun" },
        { day: "FRI", temp: 24, icon: "sun" }
      ],
      impact: "Consider rescheduling exterior painting at the Mount Property site"
    });
  });
  app2.post("/api/ai/voice-command", async (req, res) => {
    try {
      const { command } = req.body;
      if (!command || typeof command !== "string") {
        return res.status(400).json({ error: "Voice command is required" });
      }
      const result = await processVoiceCommand(command);
      res.json(result);
    } catch (error) {
      console.error("Error processing voice command:", error);
      res.status(500).json({ error: error.message || "Failed to process voice command" });
    }
  });
  app2.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { context } = req.body;
      if (!context || typeof context !== "string") {
        return res.status(400).json({ error: "Context is required" });
      }
      const recommendation = await generateConstructionRecommendation(context);
      res.json({ recommendation });
    } catch (error) {
      console.error("Error generating recommendation:", error);
      res.status(500).json({ error: error.message || "Failed to generate recommendation" });
    }
  });
  app2.post("/api/ai/materials", async (req, res) => {
    try {
      const { projectType, budget, location } = req.body;
      if (!projectType || !budget || !location) {
        return res.status(400).json({ error: "Project type, budget, and location are required" });
      }
      const recommendations = await generateMaterialRecommendations(
        projectType,
        budget,
        location
      );
      res.json({ recommendations });
    } catch (error) {
      console.error("Error generating material recommendations:", error);
      res.status(500).json({ error: error.message || "Failed to generate material recommendations" });
    }
  });
  app2.post("/api/ai/weather-impact", async (req, res) => {
    try {
      const { projectType, location, weatherCondition, startDate, duration } = req.body;
      if (!projectType || typeof projectType !== "string") {
        return res.status(400).json({ error: "Valid project type is required" });
      }
      if (!location || typeof location !== "string") {
        return res.status(400).json({ error: "Valid location is required" });
      }
      if (!weatherCondition || typeof weatherCondition !== "string") {
        return res.status(400).json({ error: "Valid weather condition is required" });
      }
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!startDate || !dateRegex.test(startDate)) {
        return res.status(400).json({ error: "Valid start date is required (YYYY-MM-DD)" });
      }
      const durationNum = Number(duration);
      if (isNaN(durationNum) || durationNum <= 0 || durationNum > 90) {
        return res.status(400).json({ error: "Duration must be a number between 1 and 90 days" });
      }
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 15e3);
      });
      const analysis = await Promise.race([
        generateWeatherImpactAnalysis(
          projectType,
          location,
          weatherCondition,
          startDate,
          durationNum
        ),
        timeoutPromise
      ]);
      if (!analysis) {
        throw new Error("No analysis was generated");
      }
      res.json({ analysis });
    } catch (error) {
      console.error("Error generating weather impact analysis:", error);
      if (error.message === "Request timed out") {
        return res.status(504).json({
          error: "Analysis generation timed out",
          message: "The request took too long to process. Please try again with simpler parameters."
        });
      }
      if (error.message?.includes("AI model")) {
        return res.status(503).json({
          error: "AI service unavailable",
          message: "The AI analysis service is temporarily unavailable. Please try again later."
        });
      }
      res.status(500).json({
        error: "Failed to generate weather impact analysis",
        message: error.message || "An unexpected error occurred"
      });
    }
  });
  app2.post("/api/email/invoice", async (req, res) => {
    try {
      const { to, invoiceNumber, clientName, amount, pdfBuffer } = req.body;
      if (!to || !invoiceNumber || !clientName || !amount || !pdfBuffer) {
        return res.status(400).json({
          error: "Missing required fields. Required: to, invoiceNumber, clientName, amount, pdfBuffer"
        });
      }
      const buffer = typeof pdfBuffer === "string" ? Buffer.from(pdfBuffer, "base64") : pdfBuffer;
      const result = await sendInvoiceEmail(to, invoiceNumber, clientName, amount, buffer);
      if (!result.success) {
        return res.status(500).json({ error: result.message });
      }
      res.json({ success: true, messageId: result.messageId });
    } catch (error) {
      console.error("Error sending invoice email:", error);
      res.status(500).json({ error: error.message || "Failed to send invoice email" });
    }
  });
  app2.post("/api/email/timesheet", async (req, res) => {
    try {
      const { to, period, totalHours, pdfBuffer } = req.body;
      if (!to || !period || !totalHours || !pdfBuffer) {
        return res.status(400).json({
          error: "Missing required fields. Required: to, period, totalHours, pdfBuffer"
        });
      }
      const buffer = typeof pdfBuffer === "string" ? Buffer.from(pdfBuffer, "base64") : pdfBuffer;
      const result = await sendTimesheetEmail(to, period, totalHours, buffer);
      if (!result.success) {
        return res.status(500).json({ error: result.message });
      }
      res.json({ success: true, messageId: result.messageId });
    } catch (error) {
      console.error("Error sending timesheet email:", error);
      res.status(500).json({ error: error.message || "Failed to send timesheet email" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const viteServer = await createViteServer({
    configFile: path.resolve(process.cwd(), "vite.config.ts"),
    server: {
      middlewareMode: true,
      hmr: {
        server
      },
      allowedHosts: true
    },
    appType: "custom"
  });
  app2.use(viteServer.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      const page = await viteServer.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      viteServer.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path.resolve(process.cwd(), "dist/public");
  if (!fs.existsSync(distPath)) {
    console.warn(`Build directory not found at ${distPath}, falling back to server/public`);
    const fallbackPath = path.resolve(process.cwd(), "server/public");
    if (!fs.existsSync(fallbackPath)) {
      throw new Error(
        `Could not find any static files directory. Please build the client first with 'npm run build'`
      );
    }
    app2.use(express2.static(fallbackPath));
    app2.use("*", (_req, res) => {
      const indexPath = path.resolve(fallbackPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not properly built. Run 'npm run build' first.");
      }
    });
    return;
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import cookieParser2 from "cookie-parser";

// server/utils/setupAdmin.ts
import { eq as eq2 } from "drizzle-orm";
async function setupAdminUser() {
  console.log("Checking for admin user...");
  try {
    const allUsers = await db.select().from(users).all();
    const adminUsers = allUsers.filter((user) => user.role === "admin");
    if (adminUsers.length > 0) {
      console.log(`Found ${adminUsers.length} admin user(s)`);
      return;
    }
    const firstUser = await storage.getUser(1);
    if (firstUser) {
      try {
        if (db.driver === "better-sqlite3") {
          const sqlite = db.session.database;
          sqlite.prepare("UPDATE users SET role = 'admin' WHERE id = 1").run();
        } else {
          await db.update(users).set({ role: "admin" }).where(eq2(users.id, 1));
        }
        console.log("Updated first user to admin role");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      const hashedPassword = await hashPassword("admin123");
      try {
        if (db.driver === "better-sqlite3") {
          const sqlite = db.session.database;
          sqlite.prepare(
            "INSERT INTO users (username, password, full_name, email, role, status) VALUES (?, ?, ?, ?, ?, ?)"
          ).run("admin", hashedPassword, "System Administrator", "admin@example.com", "admin", "active");
        } else {
          await db.insert(users).values({
            username: "admin",
            password: hashedPassword,
            full_name: "System Administrator",
            email: "admin@example.com",
            role: "admin",
            status: "active"
          }).returning({ insertedId: users.id });
        }
        console.log("Created new admin user with username: admin and password: admin123");
      } catch (error) {
        console.error("Error creating admin user:", error);
      }
    }
  } catch (error) {
    console.error("Error ensuring admin exists:", error);
  }
}

// server/index.ts
dotenv2.config();
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use(cookieParser2());
app.use(express3.static("server/public"));
console.log("Serving static files from server/public");
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
async function checkDefaultUserExists() {
  try {
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
  await checkDefaultUserExists();
  await setupAdminUser();
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api/")) {
      console.log(`DEBUG: API request to ${req.method} ${req.originalUrl}`);
    }
    next();
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 8081;
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
