// Serverless-compatible database setup for Netlify Functions
// server/db/serverless-index.js
const { db, sql } = require('./serverless-db');

// Import serverless-compatible models
const User = require('./models/User.serverless');
const Game = require('./models/Game.serverless');

// Set up associations (for compatibility)
User.hasMany = () => {};
Game.belongsTo = () => {};

module.exports = {
  db,
  sql,
  models: {
    User,
    Game,
  },
};