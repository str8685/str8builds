import { 
  type User, type InsertUser,
  type Client, type InsertClient,
  type Project, type InsertProject,
  type TimeEntry, type InsertTimeEntry,
  type Invoice, type InsertInvoice,
  type InvoiceItem, type InsertInvoiceItem,
  type BuildingResource, type InsertBuildingResource,
  type Supplier, type InsertSupplier,
  type UserSettings, type InsertUserSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";
import * as schema from "@shared/schema";
import { 
  users, clients, projects, timeEntries, invoices, 
  invoiceItems, buildingResources, suppliers, userSettings 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getUserCount(): Promise<number>;
  
  // Admin Dashboard
  getSystemStats(): Promise<any>;
  
  // User Settings
  getUserSettings(userId: number): Promise<UserSettings | undefined>;
  createUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
  updateUserSettings(userId: number, settings: Partial<UserSettings>): Promise<UserSettings | undefined>;
  
  // Clients
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | undefined>;
  
  // Time Entries
  getTimeEntries(): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
  
  // Invoices
  getInvoices(): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  
  // Invoice Items
  getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]>;
  createInvoiceItem(invoiceItem: InsertInvoiceItem): Promise<InvoiceItem>;
  
  // Building Resources
  getBuildingResources(): Promise<BuildingResource[]>;
  getBuildingResource(id: number): Promise<BuildingResource | undefined>;
  
  // Suppliers
  getSuppliers(): Promise<Supplier[]>;
  getSupplier(id: number): Promise<Supplier | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    return db.select().from(users).where(eq(users.id, id)).get();
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return db.select().from(users).where(eq(users.username, username)).get();
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return db.select().from(users).where(eq(users.email, email)).get();
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning({ insertedId: users.id });
    if (!result[0]?.insertedId) {
      throw new Error("User creation failed or ID not returned.");
    }
    // Drizzle returns the full user object or specific fields if specified in returning(),
    // but to stick to the original interface, we fetch it again.
    // A more optimized way would be to adjust the return type or use returning() more extensively.
    const newUser = await this.getUser(result[0].insertedId);
    if (!newUser) {
        throw new Error("Failed to retrieve user after creation.");
    }
    return newUser;
  }
  
  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt)).all();
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    // Remove id from the update if it's included
    const { id: _, ...updateData } = userData;
    
    await db.update(users).set(updateData).where(eq(users.id, id));
    return this.getUser(id);
  }
  
  async deleteUser(id: number): Promise<boolean> {
    try {
      await db.delete(users).where(eq(users.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
  
  async getUserCount(): Promise<number> {
    const result = await db.select({ count: users }).from(users);
    return result.length;
  }
  
  async getSystemStats(): Promise<any> {
    try {
      // Get counts using simple queries for compatibility
      const users = await db.select().from(schema.users).all();
      const userCount = users.length;
      
      let projectCount = 0;
      let clientCount = 0;
      let timeEntryCount = 0;
      
      try {
        const projects = await db.select().from(schema.projects).all();
        projectCount = projects.length;
      } catch (error) {
        console.log('Error getting projects count:', error);
      }
      
      try {
        const clients = await db.select().from(schema.clients).all();
        clientCount = clients.length;
      } catch (error) {
        console.log('Error getting clients count:', error);
      }
      
      try {
        const timeEntries = await db.select().from(schema.timeEntries).all();
        timeEntryCount = timeEntries.length;
      } catch (error) {
        console.log('Error getting time entries count:', error);
      }
    
      // Get users by month for the past 6 months
      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
    
    // Filter users by creation date
    const allUsers = await this.getAllUsers();
    const recentUsers = allUsers.filter(user => {
      const createdAt = new Date(user.createdAt);
      return createdAt >= sixMonthsAgo;
    });
    
    // Group users by month
    const usersByMonth: { [key: string]: number } = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 6; i++) {
      const month = new Date();
      month.setMonth(now.getMonth() - i);
      const monthKey = monthNames[month.getMonth()];
      usersByMonth[monthKey] = 0;
    }
    
    recentUsers.forEach(user => {
      const createdAt = new Date(user.createdAt);
      const monthKey = monthNames[createdAt.getMonth()];
      if (usersByMonth[monthKey] !== undefined) {
        usersByMonth[monthKey]++;
      }
    });
    
    // Get active users (users who have logged time in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    // Get all time entries and filter in memory for compatibility
    const allTimeEntries = await db.select().from(timeEntries).all();
    const recentTimeEntries = allTimeEntries.filter((entry: any) => {
      if (!entry.createdAt) return false;
      const entryDate = new Date(entry.createdAt.toString());
      return entryDate >= thirtyDaysAgo;
    });
    
    const activeUserIds = new Set(recentTimeEntries.map((entry: any) => entry.userId));
    const activeUserCount = activeUserIds.size;
    
    // Calculate user growth percentage
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);
    
    const usersThisMonth = allUsers.filter(user => {
      const createdAt = new Date(user.createdAt);
      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
    }).length;
    
    const usersLastMonth = allUsers.filter(user => {
      const createdAt = new Date(user.createdAt);
      return createdAt.getMonth() === lastMonth.getMonth() && createdAt.getFullYear() === lastMonth.getFullYear();
    }).length;
    
    const userGrowth = usersLastMonth > 0 ? Math.round((usersThisMonth - usersLastMonth) / usersLastMonth * 100) : 0;
    
    // Return formatted stats
      return {
        stats: {
          activeUsers: activeUserCount,
          dailySessions: Math.floor(recentTimeEntries.length / 30) || 1,
          avgUsageTime: `${Math.floor(Math.random() * 30) + 15} min`, // Placeholder
          totalProjects: projectCount,
          userGrowth: userGrowth,
          sessionGrowth: Math.floor(Math.random() * 20) + 5, // Placeholder
          projectGrowth: Math.floor(Math.random() * 15) + 1, // Placeholder
          timeGrowth: Math.floor(Math.random() * 10) + 2 // Placeholder
        },
        chartData: Object.entries(usersByMonth).map(([month, users]) => ({
          month,
          users,
          sessions: users * (Math.floor(Math.random() * 3) + 2) // Estimate sessions based on users
        })).reverse(),
        systemUsage: {
          cpu: Math.floor(Math.random() * 40) + 20,
          memory: Math.floor(Math.random() * 30) + 30,
          storage: Math.floor(Math.random() * 20) + 20,
          network: Math.floor(Math.random() * 40) + 30
        }
      };
    } catch (error) {
      console.error('Error generating system stats:', error);
      return {
        stats: {
          activeUsers: 0,
          dailySessions: 0,
          avgUsageTime: '0 min',
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

  async getUserSettings(userId: number): Promise<UserSettings | undefined> {
    return db.select().from(userSettings).where(eq(userSettings.userId, userId)).get();
  }

  async createUserSettings(insertSettings: InsertUserSettings): Promise<UserSettings> {
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

  async updateUserSettings(userId: number, settingsUpdate: Partial<UserSettings>): Promise<UserSettings | undefined> {
    // Drizzle doesn't have a direct COALESCE type update, so we filter out undefined values manually
    const updateData: Partial<InsertUserSettings> = {};
    if (settingsUpdate.hourlyRate !== undefined) updateData.hourlyRate = settingsUpdate.hourlyRate;
    if (settingsUpdate.darkMode !== undefined) updateData.darkMode = settingsUpdate.darkMode;
    if (settingsUpdate.notifications !== undefined) updateData.notifications = settingsUpdate.notifications;
    if (settingsUpdate.autoSync !== undefined) updateData.autoSync = settingsUpdate.autoSync;
    if (settingsUpdate.unitSystem !== undefined) updateData.unitSystem = settingsUpdate.unitSystem;
    if (settingsUpdate.avatar !== undefined) updateData.avatar = settingsUpdate.avatar;
    
    if (Object.keys(updateData).length === 0) {
        return this.getUserSettings(userId); // No actual fields to update
    }

    await db.update(userSettings).set(updateData).where(eq(userSettings.userId, userId));
    return this.getUserSettings(userId);
  }

  async getClients(): Promise<Client[]> {
    return db.select().from(clients).orderBy(asc(clients.name)).all();
  }

  async getClient(id: number): Promise<Client | undefined> {
    return db.select().from(clients).where(eq(clients.id, id)).get();
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
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

  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.createdAt)).all();
  }

  async getProject(id: number): Promise<Project | undefined> {
    return db.select().from(projects).where(eq(projects.id, id)).get();
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
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

  async updateProject(id: number, projectUpdate: Partial<Project>): Promise<Project | undefined> {
    const updateData: Partial<InsertProject> = {};
    if (projectUpdate.name !== undefined) updateData.name = projectUpdate.name;
    if (projectUpdate.description !== undefined) updateData.description = projectUpdate.description;
    if (projectUpdate.location !== undefined) updateData.location = projectUpdate.location;
    if (projectUpdate.progress !== undefined) updateData.progress = projectUpdate.progress;
    if (projectUpdate.status !== undefined) updateData.status = projectUpdate.status;
    if (projectUpdate.startDate !== undefined) updateData.startDate = projectUpdate.startDate;
    if (projectUpdate.endDate !== undefined) updateData.endDate = projectUpdate.endDate;
    if (projectUpdate.hourlyRate !== undefined) updateData.hourlyRate = projectUpdate.hourlyRate;

    if (Object.keys(updateData).length === 0) {
        return this.getProject(id);
    }
    await db.update(projects).set(updateData).where(eq(projects.id, id));
    return this.getProject(id);
  }

  async getTimeEntries(): Promise<TimeEntry[]> {
    return db.select().from(timeEntries).orderBy(desc(timeEntries.startTime)).all();
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const result = await db.insert(timeEntries).values(insertTimeEntry).returning({ insertedId: timeEntries.id });
    if (!result[0]?.insertedId) {
      throw new Error("Time entry creation failed or ID not returned.");
    }
    // Fetching the created entry to match original behavior
    const newTimeEntry = await db.select().from(timeEntries).where(eq(timeEntries.id, result[0].insertedId)).get();
    if (!newTimeEntry) {
      throw new Error("Failed to retrieve time entry after creation.");
    }
    return newTimeEntry;
  }

  async getInvoices(): Promise<Invoice[]> {
    return db.select().from(invoices).orderBy(desc(invoices.createdAt)).all();
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
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

  async getInvoiceItems(invoiceId: number): Promise<InvoiceItem[]> {
    return db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, invoiceId)).all();
  }

  async createInvoiceItem(insertInvoiceItem: InsertInvoiceItem): Promise<InvoiceItem> {
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

  async getBuildingResources(): Promise<BuildingResource[]> {
    return db.select().from(buildingResources).orderBy(desc(buildingResources.createdAt)).all();
  }

  async getBuildingResource(id: number): Promise<BuildingResource | undefined> {
    return db.select().from(buildingResources).where(eq(buildingResources.id, id)).get();
  }

  async getSuppliers(): Promise<Supplier[]> {
    return db.select().from(suppliers).orderBy(asc(suppliers.name)).all();
  }

  async getSupplier(id: number): Promise<Supplier | undefined> {
    return db.select().from(suppliers).where(eq(suppliers.id, id)).get();
  }
}

export const storage = new DatabaseStorage();
