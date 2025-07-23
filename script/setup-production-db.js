// One-time database setup for production
require('dotenv').config();

async function setupProductionDB() {
  try {
    console.log('Environment check:');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✅' : 'Not set ❌');
    console.log('JWT:', process.env.JWT ? 'Set ✅' : 'Not set ❌');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL environment variable is not set!');
      console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('DATA')));
      process.exit(1);
    }

    const { db } = require('../server/db');
    
    console.log('Connecting to Neon database...');
    await db.authenticate();
    console.log('✅ Database connection successful');

    console.log('Creating tables...');
    await db.sync({ force: false, alter: true });
    console.log('✅ Tables created/updated successfully');

    // Test table creation
    const [results] = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    
    console.log('Tables in database:', results.map(r => r.table_name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

setupProductionDB();