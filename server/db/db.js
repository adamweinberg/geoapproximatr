const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false,
  pool: {
    max: 1,
    min: 0,
    acquire: 10000,
    idle: 1000
  }
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

// Check for both DATABASE_URL and NETLIFY_DATABASE_URL (Neon extension creates the latter)
const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || `postgres://localhost:5432/${databaseName}`;

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

let db;

// Try to use Neon serverless for serverless environments
if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  try {
    // For Neon serverless, we need to configure differently
    const { neon } = require('@neondatabase/serverless');
    config.dialectModule = neon;
    db = new Sequelize(databaseUrl, config);
  } catch (error) {
    console.log('Neon serverless setup failed, trying standard pg:', error.message);
    // Fallback to regular pg
    db = new Sequelize(databaseUrl, config);
  }
} else {
  db = new Sequelize(databaseUrl, config);
}
module.exports = db
