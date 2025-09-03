const { sql } = require('../serverless-db');

class Game {
  constructor(data) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static async findByPk(id) {
    const result = await sql`SELECT * FROM games WHERE id = ${id}`;
    return result[0] ? new Game(result[0]) : null;
  }
  
  static async findOne(options = {}) {
    let query = 'SELECT * FROM games';
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => {
          if (typeof value === 'object' && value[Object.keys(value)[0]]) {
            const op = Object.keys(value)[0];
            const val = value[op];
            if (op === 'gte') return `"${key}" >= '${val}'`;
            if (op === 'lte') return `"${key}" <= '${val}'`;
            if (op === 'gt') return `"${key}" > '${val}'`;
            if (op === 'lt') return `"${key}" < '${val}'`;
          }
          return `"${key}" = '${value}'`;
        })
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    if (options.order) {
      const orderClause = options.order
        .map(([field, direction]) => `"${field}" ${direction}`)
        .join(', ');
      query += ` ORDER BY ${orderClause}`;
    }
    
    query += ' LIMIT 1';
    const result = await sql.unsafe(query);
    return result[0] ? new Game(result[0]) : null;
  }
  
  static async findAll(options = {}) {
    let query = 'SELECT * FROM games';
    
    if (options.include) {
      query = `
        SELECT g.*, u.username, u."firstName", u."lastName"
        FROM games g
        JOIN users u ON g."userId" = u.id
      `;
    }
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => {
          if (typeof value === 'object' && value[Object.keys(value)[0]]) {
            const op = Object.keys(value)[0];
            const val = value[op];
            if (op === 'gte') return `g."${key}" >= '${val}'`;
            if (op === 'lte') return `g."${key}" <= '${val}'`;
            if (op === 'gt') return `g."${key}" > '${val}'`;
            if (op === 'lt') return `g."${key}" < '${val}'`;
          }
          return `g."${key}" = '${value}'`;
        })
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    if (options.order) {
      const orderClause = options.order
        .map(([field, direction]) => `g."${field}" ${direction}`)
        .join(', ');
      query += ` ORDER BY ${orderClause}`;
    }
    
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    
    const results = await sql.unsafe(query);
    return results.map(row => new Game(row));
  }
  
  static async create(data) {
    try {
      console.log('Creating game with data:', data);
      
      const result = await sql`
        INSERT INTO games ("userId", "totalScore", "averageScore", "bestRound", "worstRound", rounds, distances, scores, "completedAt")
        VALUES (${data.userId}, ${data.totalScore}, ${data.averageScore}, ${data.bestRound}, ${data.worstRound}, ${JSON.stringify(data.rounds)}, ${JSON.stringify(data.distances)}, ${JSON.stringify(data.scores)}, ${data.completedAt || new Date().toISOString()})
        RETURNING *
      `;
      
      console.log('Game created successfully:', result[0]);
      return new Game(result[0]);
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  }
  
  static async count(options = {}) {
    let query = 'SELECT COUNT(*) as count FROM games';
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => `"${key}" = '${value}'`)
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    const result = await sql.unsafe(query);
    return result[0].count;
  }
  
  static async destroy(options = {}) {
    let query = 'DELETE FROM games';
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => `"${key}" = '${value}'`)
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    await sql.unsafe(query);
  }
}

module.exports = Game;