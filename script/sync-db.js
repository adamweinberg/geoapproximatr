const { db } = require('../server/db');

async function syncDatabase() {
  try {
    console.log('Connecting to database...');
    await db.authenticate();
    console.log('Database connection established successfully.');

    console.log('Syncing database schema...');
    await db.sync({ alter: true });
    console.log('Database schema synced successfully.');

    console.log('Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Database sync failed:', error);
    process.exit(1);
  }
}

syncDatabase();