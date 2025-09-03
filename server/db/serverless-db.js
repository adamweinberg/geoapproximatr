const { neon } = require('@neondatabase/serverless');
const { Sequelize } = require('sequelize');

// Use Neon serverless driver for Netlify Functions
const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

console.log('Serverless DB - DATABASE_URL available:', !!process.env.DATABASE_URL);
console.log('Serverless DB - NETLIFY_DATABASE_URL available:', !!process.env.NETLIFY_DATABASE_URL);
console.log('Serverless DB - Using URL:', databaseUrl ? 'YES' : 'NO');

if (!databaseUrl) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL must be set');
}

// Create Neon serverless connection
const sql = neon(databaseUrl);

// Create Sequelize instance with Neon serverless driver
const db = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: neon,
  logging: false,
  pool: {
    max: 1,
    min: 0,
    acquire: 10000,
    idle: 1000
  },
  dialectOptions: {
    ssl: true
  }
});

module.exports = { db, sql };