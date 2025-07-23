const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

// Check for both DATABASE_URL and NETLIFY_DATABASE_URL (Neon extension creates the latter)
const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || `postgres://localhost:5432/${databaseName}`;

const db = new Sequelize(databaseUrl, config)
module.exports = db
