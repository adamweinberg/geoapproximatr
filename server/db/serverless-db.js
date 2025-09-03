const { Sequelize } = require('sequelize');
const pkg = require('../../package.json');

// Use NETLIFY_DATABASE_URL for serverless, fallback to DATABASE_URL
const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

console.log('Serverless DB - DATABASE_URL available:', !!process.env.DATABASE_URL);
console.log('Serverless DB - NETLIFY_DATABASE_URL available:', !!process.env.NETLIFY_DATABASE_URL);
console.log('Serverless DB - Using URL:', databaseUrl ? 'YES' : 'NO');

if (!databaseUrl) {
  throw new Error('NETLIFY_DATABASE_URL or DATABASE_URL must be set');
}

// Create Sequelize instance for serverless
const db = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
  // Serverless-specific pool configuration
  pool: {
    max: 1,        // Maximum 1 connection for serverless
    min: 0,        // No minimum connections
    acquire: 30000, // 30 second timeout
    idle: 10000    // 10 second idle timeout
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  // Serverless-specific options
  define: {
    freezeTableName: true,
    timestamps: true
  }
});

module.exports = { db };