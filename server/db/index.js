//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Game = require('./models/Game')

//associations
User.hasMany(Game)
Game.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Game,
  },
}
