// server/db/serverless-db.js
const { neon } = require('@neondatabase/serverless');

const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

console.log('Serverless DB - DATABASE_URL available:', !!process.env.DATABASE_URL);
console.log('Serverless DB - NETLIFY_DATABASE_URL available:', !!process.env.NETLIFY_DATABASE_URL);
console.log('Serverless DB - Using URL:', databaseUrl ? 'YES' : 'NO');

if (!databaseUrl) {
  throw new Error('NETLIFY_DATABASE_URL or DATABASE_URL must be set');
}

// Create Neon serverless connection
const sql = neon(databaseUrl);

// Create a Sequelize-compatible interface
const db = {
  async authenticate() {
    try {
      await sql`SELECT 1`;
      return true;
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  },
  
  async sync() {
    console.log('Serverless: Skipping sync - tables should already exist');
    return true;
  },
  
  async query(queryString, options = {}) {
    try {
      const result = await sql.unsafe(queryString);
      return [result];
    } catch (error) {
      throw new Error(`Query failed: ${error.message}`);
    }
  }
};

module.exports = { db, sql };