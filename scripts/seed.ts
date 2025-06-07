import { db, pool } from "../server/db";
import { 
  users, clients, projects, 
  timeEntries, invoices, invoiceItems, 
  buildingResources, suppliers 
} from "../shared/schema";
import { DEFAULT_HOURLY_RATE, GST_RATE, NZ_REGIONS } from "../client/src/lib/constants";

async function main() {
  console.log("Starting database seeding...");

  // Clear existing data
  await db.delete(invoiceItems);
  await db.delete(invoices);
  await db.delete(timeEntries);
  await db.delete(projects);
  await db.delete(clients);
  await db.delete(suppliers);
  await db.delete(buildingResources);
  await db.delete(users);

  console.log("Deleted existing data");

  // Create a default user
  const [user] = await db.insert(users).values({
    username: "demo",
    password: "demo123", // In a real app, this would be hashed
    companyName: "STR8 BUILD Construction",
    fullName: "Demo User",
    email: "demo@str8build.co.nz",
    phone: "027 555 1234",
    defaultHourlyRate: DEFAULT_HOURLY_RATE.toString()
  }).returning();

  console.log(`Created demo user with ID: ${user.id}`);

  // Create clients
  const clientsData = [
    {
      userId: user.id,
      name: "Auckland City Development",
      contact: "James Wilson",
      email: "james@aucklanddev.co.nz",
      phone: "09 555 1234",
      address: "123 Queen Street, Auckland CBD",
      notes: "Major commercial developer"
    },
    {
      userId: user.id,
      name: "Coastal Homes NZ",
      contact: "Sarah Thompson",
      email: "sarah@coastalhomes.co.nz",
      phone: "021 555 9876",
      address: "45 Beach Road, Takapuna",
      notes: "High-end residential developer"
    },
    {
      userId: user.id,
      name: "Wellington Infrastructure Ltd",
      contact: "Michael Chen",
      email: "m.chen@wellingtoninfra.co.nz",
      phone: "04 555 8765",
      address: "78 Willis Street, Wellington",
      notes: "Public sector projects"
    }
  ];

  const insertedClients = await Promise.all(
    clientsData.map(async (clientData) => {
      const [client] = await db.insert(clients).values(clientData).returning();
      return client;
    })
  );

  console.log(`Created ${insertedClients.length} clients`);

  // Create projects
  const projectsData = [
    {
      userId: user.id,
      clientId: insertedClients[0].id,
      name: "Auckland Tower Commercial Renovation",
      description: "Complete interior renovation of levels 10-15",
      location: "240 Queen Street, Auckland CBD",
      progress: 65,
      status: "active",
      startDate: new Date("2024-11-01"),
      endDate: new Date("2025-03-30"),
      hourlyRate: "75.00"
    },
    {
      userId: user.id,
      clientId: insertedClients[1].id,
      name: "Takapuna Beach House",
      description: "Luxury 5-bedroom beach house construction",
      location: "27 Marine Parade, Takapuna",
      progress: 30,
      status: "active",
      startDate: new Date("2024-10-15"),
      endDate: new Date("2025-06-20"),
      hourlyRate: "85.00"
    },
    {
      userId: user.id,
      clientId: insertedClients[2].id,
      name: "Wellington Public Library Upgrade",
      description: "Seismic strengthening and interior modernization",
      location: "65 Victoria Street, Wellington",
      progress: 90,
      status: "active",
      startDate: new Date("2024-07-10"),
      endDate: new Date("2025-01-15"),
      hourlyRate: DEFAULT_HOURLY_RATE.toString()
    }
  ];

  const insertedProjects = await Promise.all(
    projectsData.map(async (projectData) => {
      const [project] = await db.insert(projects).values(projectData).returning();
      return project;
    })
  );

  console.log(`Created ${insertedProjects.length} projects`);

  // Create time entries
  const timeEntriesData = [
    {
      userId: user.id,
      projectId: insertedProjects[0].id,
      startTime: new Date("2024-12-05T08:00:00"),
      endTime: new Date("2024-12-05T17:00:00"),
      duration: 9 * 60 * 60, // 9 hours in seconds
      notes: "Demolition and prep work",
      hourlyRate: insertedProjects[0].hourlyRate // Already a string from projects data
    },
    {
      userId: user.id,
      projectId: insertedProjects[1].id,
      startTime: new Date("2024-12-06T08:30:00"),
      endTime: new Date("2024-12-06T16:30:00"),
      duration: 8 * 60 * 60, // 8 hours in seconds
      notes: "Foundation preparation",
      hourlyRate: insertedProjects[1].hourlyRate // Already a string from projects data
    },
    {
      userId: user.id,
      projectId: insertedProjects[2].id,
      startTime: new Date("2024-12-07T07:30:00"),
      endTime: new Date("2024-12-07T18:30:00"),
      duration: 11 * 60 * 60, // 11 hours in seconds
      notes: "Installing support beams",
      hourlyRate: insertedProjects[2].hourlyRate // Already a string from projects data
    }
  ];

  const insertedTimeEntries = await Promise.all(
    timeEntriesData.map(async (timeEntryData) => {
      const [timeEntry] = await db.insert(timeEntries).values(timeEntryData).returning();
      return timeEntry;
    })
  );

  console.log(`Created ${insertedTimeEntries.length} time entries`);

  // Create invoices
  const invoicesData = [
    {
      userId: user.id,
      clientId: insertedClients[0].id,
      projectId: insertedProjects[0].id,
      invoiceNumber: "INV-2024-001",
      issueDate: new Date("2024-11-30"),
      dueDate: new Date("2024-12-14"),
      subtotal: toStr(7500.00),
      tax: toStr(7500.00 * GST_RATE),
      total: toStr(7500.00 * (1 + GST_RATE)),
      status: "paid",
      notes: "November work completed"
    },
    {
      userId: user.id,
      clientId: insertedClients[1].id,
      projectId: insertedProjects[1].id,
      invoiceNumber: "INV-2024-002",
      issueDate: new Date("2024-12-01"),
      dueDate: new Date("2024-12-15"),
      subtotal: toStr(12750.00),
      tax: toStr(12750.00 * GST_RATE),
      total: toStr(12750.00 * (1 + GST_RATE)),
      status: "pending",
      notes: "Initial foundation work"
    }
  ];

  const insertedInvoices = await Promise.all(
    invoicesData.map(async (invoiceData) => {
      const [invoice] = await db.insert(invoices).values(invoiceData).returning();
      return invoice;
    })
  );

  console.log(`Created ${insertedInvoices.length} invoices`);

  // Create invoice items
  const invoiceItemsData = [
    // Items for first invoice
    {
      invoiceId: insertedInvoices[0].id,
      description: "Demolition services",
      quantity: toStr(40),
      unitPrice: toStr(75.00),
      amount: toStr(40 * 75.00)
    },
    {
      invoiceId: insertedInvoices[0].id,
      description: "Materials (drywall, framing)",
      quantity: toStr(1),
      unitPrice: toStr(2500.00),
      amount: toStr(2500.00)
    },
    {
      invoiceId: insertedInvoices[0].id,
      description: "Electrical preparation",
      quantity: toStr(20),
      unitPrice: toStr(75.00),
      amount: toStr(20 * 75.00)
    },
    // Items for second invoice
    {
      invoiceId: insertedInvoices[1].id,
      description: "Foundation preparation",
      quantity: toStr(60),
      unitPrice: toStr(85.00),
      amount: toStr(60 * 85.00)
    },
    {
      invoiceId: insertedInvoices[1].id,
      description: "Concrete and formwork",
      quantity: toStr(1),
      unitPrice: toStr(6750.00),
      amount: toStr(6750.00)
    },
    {
      invoiceId: insertedInvoices[1].id,
      description: "Site preparation",
      quantity: toStr(30),
      unitPrice: toStr(85.00),
      amount: toStr(30 * 85.00)
    }
  ];

  const insertedInvoiceItems = await Promise.all(
    invoiceItemsData.map(async (invoiceItemData) => {
      const [invoiceItem] = await db.insert(invoiceItems).values(invoiceItemData).returning();
      return invoiceItem;
    })
  );

  console.log(`Created ${insertedInvoiceItems.length} invoice items`);

  // Create building resources
  const buildingResourcesData = [
    {
      category: "Building Code",
      title: "NZ Building Code Section E2 (External Moisture)",
      description: "Guidelines for weathertightness and moisture management",
      content: "This section covers requirements for external moisture management in buildings. It includes standards for roof and wall cladding systems, flashing details, and weathertightness requirements specific to New Zealand's climate conditions.",
      fileUrl: null
    },
    {
      category: "Building Code",
      title: "NZ Building Code Section B1 (Structure)",
      description: "Structural requirements for NZ buildings",
      content: "This section outlines the structural requirements for buildings in New Zealand, taking into account seismic considerations, wind zones, and snow loads. It specifies performance criteria for structural stability and resistance to deformation.",
      fileUrl: null
    },
    {
      category: "Safety",
      title: "Heights Safety Guidelines",
      description: "Working safely at heights in construction",
      content: "Comprehensive safety guidelines for working at heights on construction sites in New Zealand. Includes risk assessment procedures, equipment requirements, and best practices for scaffolding and roof work.",
      fileUrl: null
    },
    {
      category: "Materials",
      title: "Timber Treatment Levels",
      description: "NZ timber treatment standards and applications",
      content: "Overview of New Zealand timber treatment levels (H1-H6) and their appropriate applications in construction. Includes information on treatment chemicals, durability expectations, and appropriate use cases for each treatment level.",
      fileUrl: null
    },
    {
      category: "Standards",
      title: "Electrical Wiring Standards AS/NZS 3000",
      description: "Electrical installation requirements for NZ",
      content: "Summary of key requirements from the AS/NZS 3000 Electrical Installations standard (also known as the Wiring Rules). Covers safety requirements, testing procedures, and compliance criteria for electrical installations in New Zealand buildings.",
      fileUrl: null
    }
  ];

  const insertedBuildingResources = await Promise.all(
    buildingResourcesData.map(async (resourceData) => {
      const [resource] = await db.insert(buildingResources).values(resourceData).returning();
      return resource;
    })
  );

  console.log(`Created ${insertedBuildingResources.length} building resources`);

  // Create suppliers
  const suppliersData = [
    {
      name: "PlaceMakers",
      category: "Building Supplies",
      address: "123 Great North Road",
      city: "Auckland",
      region: "Auckland",
      phone: "09 555 7777",
      email: "auckland@placemakers.co.nz",
      website: "https://www.placemakers.co.nz",
      openingHours: JSON.stringify({
        monday: "7:00 AM - 6:00 PM",
        tuesday: "7:00 AM - 6:00 PM",
        wednesday: "7:00 AM - 6:00 PM",
        thursday: "7:00 AM - 6:00 PM",
        friday: "7:00 AM - 6:00 PM",
        saturday: "8:00 AM - 4:00 PM",
        sunday: "9:00 AM - 4:00 PM"
      }),
      location: JSON.stringify({
        lat: -36.868,
        lng: 174.763
      })
    },
    {
      name: "Mitre 10 MEGA",
      category: "Building Supplies",
      address: "45 Constellation Drive",
      city: "Auckland",
      region: "Auckland",
      phone: "09 555 8888",
      email: "albany@mitre10.co.nz",
      website: "https://www.mitre10.co.nz",
      openingHours: JSON.stringify({
        monday: "7:00 AM - 7:00 PM",
        tuesday: "7:00 AM - 7:00 PM",
        wednesday: "7:00 AM - 7:00 PM",
        thursday: "7:00 AM - 7:00 PM",
        friday: "7:00 AM - 7:00 PM",
        saturday: "8:00 AM - 6:00 PM",
        sunday: "9:00 AM - 6:00 PM"
      }),
      location: JSON.stringify({
        lat: -36.747,
        lng: 174.749
      })
    },
    {
      name: "Bunnings Warehouse",
      category: "Building Supplies",
      address: "78 Manukau Road",
      city: "Auckland",
      region: "Auckland",
      phone: "09 555 9999",
      email: "manukau@bunnings.co.nz",
      website: "https://www.bunnings.co.nz",
      openingHours: JSON.stringify({
        monday: "7:00 AM - 7:00 PM",
        tuesday: "7:00 AM - 7:00 PM",
        wednesday: "7:00 AM - 7:00 PM",
        thursday: "7:00 AM - 7:00 PM",
        friday: "7:00 AM - 9:00 PM",
        saturday: "7:00 AM - 7:00 PM",
        sunday: "8:00 AM - 6:00 PM"
      }),
      location: JSON.stringify({
        lat: -36.994,
        lng: 174.882
      })
    },
    {
      name: "Carters",
      category: "Building Supplies",
      address: "15 Parkway Drive",
      city: "Wellington",
      region: "Wellington",
      phone: "04 555 6666",
      email: "wellington@carters.co.nz",
      website: "https://www.carters.co.nz",
      openingHours: JSON.stringify({
        monday: "7:30 AM - 5:30 PM",
        tuesday: "7:30 AM - 5:30 PM",
        wednesday: "7:30 AM - 5:30 PM",
        thursday: "7:30 AM - 5:30 PM",
        friday: "7:30 AM - 5:30 PM",
        saturday: "8:00 AM - 4:00 PM",
        sunday: "Closed"
      }),
      location: JSON.stringify({
        lat: -41.231,
        lng: 174.805
      })
    },
    {
      name: "NALCO Equipment",
      category: "Tool Hire",
      address: "55 Industrial Avenue",
      city: "Christchurch",
      region: "Canterbury",
      phone: "03 555 3333",
      email: "hire@nalco.co.nz",
      website: "https://www.nalco.co.nz",
      openingHours: JSON.stringify({
        monday: "7:00 AM - 5:00 PM",
        tuesday: "7:00 AM - 5:00 PM",
        wednesday: "7:00 AM - 5:00 PM",
        thursday: "7:00 AM - 5:00 PM",
        friday: "7:00 AM - 5:00 PM",
        saturday: "8:00 AM - 12:00 PM",
        sunday: "Closed"
      }),
      location: JSON.stringify({
        lat: -43.532,
        lng: 172.636
      })
    }
  ];

  const insertedSuppliers = await Promise.all(
    suppliersData.map(async (supplierData) => {
      const [supplier] = await db.insert(suppliers).values(supplierData).returning();
      return supplier;
    })
  );

  console.log(`Created ${insertedSuppliers.length} suppliers`);
  
  console.log("Database seeding completed successfully!");
}

// Convert numeric values to strings to match schema expectations
function toStr(val: number): string {
  return val.toString();
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the pool connection
    await pool.end();
    process.exit(0);
  });