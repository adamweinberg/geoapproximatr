// server/db/serverless-db.js
const { Sequelize } = require('sequelize');

const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

console.log('Serverless DB - DATABASE_URL available:', !!process.env.DATABASE_URL);
console.log('Serverless DB - NETLIFY_DATABASE_URL available:', !!process.env.NETLIFY_DATABASE_URL);
console.log('Serverless DB - Using URL:', databaseUrl ? 'YES' : 'NO');

if (!databaseUrl) {
  throw new Error('NETLIFY_DATABASE_URL or DATABASE_URL must be set');
}

const db = new Sequelize(databaseUrl, {
  dialect: 'postgres',
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