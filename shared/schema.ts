import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
  PgTableWithColumns,
} from "drizzle-orm/pg-core";
import {
  sqliteTable,
  text as sqliteText,
  integer as sqliteInteger,
  real,
  SQLiteTableWithColumns,
} from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Check if we're using SQLite (development) or Postgres (production)
const isProduction =
  process.env.NODE_ENV !== "development" || !!process.env.DATABASE_URL;

// Helper function to create tables based on environment
function createTable<T extends Record<string, any>>(
  name: string,
  columns: T,
): PgTableWithColumns<any> | SQLiteTableWithColumns<any> {
  if (isProduction) {
    return pgTable(name, columns);
  } else {
    // Convert pg columns to sqlite columns
    const sqliteColumns: Record<string, any> = {};
    for (const [key, value] of Object.entries(columns)) {
      if (!value || typeof value !== "object") continue;

      if (value.dataType === "serial") {
        sqliteColumns[key] = sqliteInteger(key).primaryKey().notNull();
      } else if (value.dataType === "numeric") {
        sqliteColumns[key] = real(key);
      } else if (value.dataType === "timestamp") {
        sqliteColumns[key] = sqliteText(key);
      } else if (value.dataType === "jsonb") {
        // For SQLite, simply store JSON as TEXT - we'll handle parsing/serialization in the application code
        // This avoids issues with the SQLite adapter not supporting transform
        sqliteColumns[key] = sqliteText(key);
      } else if (value.dataType === "integer") {
        sqliteColumns[key] = sqliteInteger(key);
      } else if (value.dataType === "boolean") {
        sqliteColumns[key] = sqliteInteger(key);
      } else {
        sqliteColumns[key] = sqliteText(key);
      }
    }
    return sqliteTable(name, sqliteColumns);
  }
}

// Users
export const users = createTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("companyName"),
  fullName: text("fullName"),
  email: text("email"),
  phone: text("phone"),
  defaultHourlyRate: numeric("defaultHourlyRate"),
  role: text("role"),
  status: text("status"),
  profileImageUrl: text("profileImageUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Clients
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  contact: text("contact"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  clientId: integer("client_id").references(() => clients.id),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  progress: integer("progress").default(0),
  status: text("status").default("active"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  hourlyRate: numeric("hourly_rate"),
  photos: jsonb("photos"), // Store array of project photos with notes
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

// Time Entries
export const timeEntries = pgTable("time_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  projectId: integer("project_id").references(() => projects.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // in seconds
  notes: text("notes"),
  hourlyRate: numeric("hourly_rate"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTimeEntrySchema = createInsertSchema(timeEntries)
  .omit({
    id: true,
    createdAt: true,
  })
  .transform((data) => ({
    ...data,
    startTime:
      typeof data.startTime === "string"
        ? new Date(data.startTime)
        : data.startTime,
    endTime: data.endTime
      ? typeof data.endTime === "string"
        ? new Date(data.endTime)
        : data.endTime
      : undefined,
  }));

// Invoices
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInvoiceSchema = createInsertSchema(invoices)
  .omit({
    id: true,
    createdAt: true,
  })
  .transform((data) => ({
    ...data,
    issueDate:
      typeof data.issueDate === "string"
        ? new Date(data.issueDate)
        : data.issueDate,
    dueDate:
      typeof data.dueDate === "string" ? new Date(data.dueDate) : data.dueDate,
  }));

// Invoice Items
export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id")
    .notNull()
    .references(() => invoices.id),
  description: text("description").notNull(),
  quantity: numeric("quantity").notNull(),
  unitPrice: numeric("unit_price").notNull(),
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems).omit({
  id: true,
  createdAt: true,
});

// Building Resources
export const buildingResources = createTable("building_resources", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  fileUrl: text("file_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBuildingResourceSchema = createInsertSchema(
  buildingResources,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Suppliers
export const suppliers = createTable("suppliers", {
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
  location: jsonb("location"), // to store lat/lng
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
});

// User Settings - added after all other table definitions
export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  hourlyRate: numeric("hourly_rate"),
  darkMode: boolean("dark_mode").default(true),
  notifications: boolean("notifications").default(true),
  autoSync: boolean("auto_sync").default(true),
  unitSystem: text("unit_system").default("metric"),
  avatar: text("avatar"), // Base64 encoded image
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSettingsSchema = createInsertSchema(userSettings).omit({
  id: true,
  updatedAt: true,
});

// Relations section - after all tables are defined
export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
  projects: many(projects),
  invoices: many(invoices),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [projects.clientId],
    references: [clients.id],
  }),
  timeEntries: many(timeEntries),
  invoices: many(invoices),
}));

export const timeEntriesRelations = relations(timeEntries, ({ one }) => ({
  user: one(users, {
    fields: [timeEntries.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [timeEntries.projectId],
    references: [projects.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  user: one(users, {
    fields: [invoices.userId],
    references: [users.id],
  }),
  client: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id],
  }),
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id],
  }),
  invoiceItems: many(invoiceItems),
}));

export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId],
    references: [invoices.id],
  }),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  clients: many(clients),
  projects: many(projects),
  timeEntries: many(timeEntries),
  invoices: many(invoices),
  settings: one(userSettings),
}));

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type TimeEntry = typeof timeEntries.$inferSelect;
export type InsertTimeEntry = z.infer<typeof insertTimeEntrySchema>;

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type InsertInvoiceItem = z.infer<typeof insertInvoiceItemSchema>;

export type BuildingResource = typeof buildingResources.$inferSelect;
export type InsertBuildingResource = z.infer<
  typeof insertBuildingResourceSchema
>;

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
