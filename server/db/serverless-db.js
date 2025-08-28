const { neon } = require('@neondatabase/serverless');
const { Sequelize } = require('sequelize');

// Use Neon serverless driver for Netlify Functions
const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL must be set');
}

// Create Neon serverless connection
const sql = neon(databaseUrl);

// Create Sequelize instance with serverless driver
const db = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectModule: require('@neondatabase/serverless'),
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

module.exports = { db, sql };