// Serverless-compatible database setup for Netlify Functions
const { db } = require('./serverless-db');

// Import models with serverless database
const User = require('./models/User');
const Game = require('./models/Game');

// Set up associations
User.hasMany(Game);
Game.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Game,
  },
};