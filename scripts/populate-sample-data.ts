import { db } from '../server/db';
import * as schema from '../shared/schema';
import { hashPassword } from '../server/auth';

/**
 * Populate database with sample construction and woodworking data
 * Run this script with: npx tsx scripts/populate-sample-data.ts
 */
async function populateDatabase() {
  console.log('Starting database population with sample data...');

  try {
    // Create default admin user if it doesn't exist
    const existingUsers = await db.select().from(schema.users).where(eb => eb.eq(schema.users.username, 'str8'));
    
    if (existingUsers.length === 0) {
      console.log('Creating default admin user...');
      
      const hashedPassword = await hashPassword('omokoroa2023');
      await db.insert(schema.users).values({
        username: 'str8',
        password: hashedPassword,
        companyName: 'STR8 BUILD',
        fullName: 'Admin User',
        email: 'admin@str8build.co.nz'
      });
    }

    // Add construction guides if they don't exist
    const existingResources = await db.select().from(schema.buildingResources);
    
    if (existingResources.length === 0) {
      console.log('Adding construction and woodworking resources...');
      
      // Timber and construction resources
      await db.insert(schema.buildingResources).values({
        category: 'timber',
        title: 'Timber Frame Construction Guide',
        description: 'Complete guide for timber framing in residential construction',
        content: 'This comprehensive guide covers all aspects of timber frame construction including materials, tools, techniques, and building code compliance for New Zealand.'
      });
      
      await db.insert(schema.buildingResources).values({
        category: 'construction',
        title: 'Foundation Construction Guide',
        description: 'Step-by-step guide for building various foundation types',
        content: 'This guide covers concrete slab, pile, and perimeter foundation techniques, along with drainage, reinforcement, and necessary inspections.'
      });
      
      await db.insert(schema.buildingResources).values({
        category: 'construction',
        title: 'Roof Framing Guide',
        description: 'Detailed instructions for gable, hip, and cathedral roof framing',
        content: 'Learn how to calculate rafter lengths, angles, and proper bracing techniques for various roof styles common in New Zealand construction.'
      });
      
      // Woodworking resources
      await db.insert(schema.buildingResources).values({
        category: 'woodworking',
        title: 'Timber Joinery Techniques',
        description: 'Advanced joinery methods for furniture and architectural elements',
        content: 'Learn how to create dovetails, mortise and tenon joints, and other traditional woodworking techniques for both functional and decorative applications.'
      });
      
      await db.insert(schema.buildingResources).values({
        category: 'woodworking',
        title: 'Wood Finishing Guide',
        description: 'Complete guide to sanding, staining, and finishing wooden surfaces',
        content: 'This guide covers everything from preparing wood surfaces to applying final protective coats, with special attention to New Zealand climate considerations.'
      });
      
      // Templates
      await db.insert(schema.buildingResources).values({
        category: 'templates',
        title: 'Construction Timeline Template',
        description: 'Gantt chart template for residential construction projects',
        content: 'Use this template to create detailed construction timelines with dependencies, resource allocation, and critical path analysis for efficient project management.'
      });
      
      await db.insert(schema.buildingResources).values({
        category: 'templates',
        title: 'Material Takeoff Spreadsheet',
        description: 'Comprehensive spreadsheet for calculating construction materials',
        content: 'This template helps calculate precise material quantities for framing, cladding, roofing, and more, with built-in formulas for common construction elements.'
      });
      
      await db.insert(schema.buildingResources).values({
        category: 'templates',
        title: 'Standard Building Quote Template',
        description: 'NZ compliant building quote template',
        content: 'Use this template to create professional building quotes that comply with New Zealand regulations and industry standards for transparency and accuracy.'
      });
    }

    console.log('Sample data population completed successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

// Execute the population function
populateDatabase(); 