import { db } from "../server/db";
import { users } from "../shared/schema";
import { hashPassword } from "../server/auth";

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const existingAdmin = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, "str8")
    });

    if (existingAdmin) {
      console.log("Admin user 'str8' already exists.");
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await hashPassword("omokoroa2023");

    // Create admin user
    const [admin] = await db.insert(users).values({
      username: "str8",
      password: hashedPassword,
      companyName: "STR8 BUILD Ltd.",
      fullName: "Administrator",
      email: "admin@str8build.co.nz",
    }).returning();

    console.log("Admin user created successfully:");
    console.log({
      id: admin.id,
      username: admin.username,
      companyName: admin.companyName,
    });

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    process.exit(0);
  }
}

createAdminUser();