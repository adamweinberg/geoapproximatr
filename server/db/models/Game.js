const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalScore: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 25000
    }
  },
  averageScore: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bestRound: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  worstRound: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rounds: {
    type: Sequelize.JSON,
    allowNull: false,
    comment: 'Array of round data with location, guess, distance, score'
  },
  distances: {
    type: Sequelize.JSON,
    allowNull: false,
    comment: 'Array of distances for each round'
  },
  scores: {
    type: Sequelize.JSON,
    allowNull: false,
    comment: 'Array of scores for each round'
  },
  completedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Game