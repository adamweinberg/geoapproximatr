// server/db/serverless-db.js
const { Sequelize } = require('sequelize');
const pg = require('pg');

const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

console.log('Serverless DB - DATABASE_URL available:', !!process.env.DATABASE_URL);
console.log('Serverless DB - NETLIFY_DATABASE_URL available:', !!process.env.NETLIFY_DATABASE_URL);
console.log('Serverlet DB - Using URL:', databaseUrl ? 'YES' : 'NO');

if (!databaseUrl) {
  throw new Error('NETLIFY_DATABASE_URL or DATABASE_URL must be set');
}

// Configure pg for serverless environment
pg.defaults.ssl = { rejectUnauthorized: false };

const db = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false,
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = { db };