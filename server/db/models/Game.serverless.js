// server/db/models/Game.serverless.js
const { sql } = require('../serverless-db');

class Game {
  static async findByPk(id) {
    const result = await sql`SELECT * FROM games WHERE id = ${id}`;
    return result[0] || null;
  }
  
  static async findOne(options = {}) {
    let query = 'SELECT * FROM games';
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    if (options.order) {
      const orderClause = options.order
        .map(([field, direction]) => `${field} ${direction}`)
        .join(', ');
      query += ` ORDER BY ${orderClause}`;
    }
    
    query += ' LIMIT 1';
    const result = await sql.unsafe(query);
    return result[0] || null;
  }
  
  static async findAll(options = {}) {
    let query = 'SELECT * FROM games';
    
    if (options.include) {
      // Handle includes for joins
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
            // Handle Sequelize operators like { [Op.gte]: date }
            const op = Object.keys(value)[0];
            const val = value[op];
            if (op === 'gte') return `${key} >= '${val}'`;
            if (op === 'lte') return `${key} <= '${val}'`;
            if (op === 'gt') return `${key} > '${val}'`;
            if (op === 'lt') return `${key} < '${val}'`;
          }
          return `${key} = '${value}'`;
        })
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    if (options.order) {
      const orderClause = options.order
        .map(([field, direction]) => `${field} ${direction}`)
        .join(', ');
      query += ` ORDER BY ${orderClause}`;
    }
    
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    
    return await sql.unsafe(query);
  }
  
  static async create(data) {
    const fields = Object.keys(data).join(', ');
    const values = Object.values(data).map(v => `'${v}'`).join(', ');
    const result = await sql.unsafe(`INSERT INTO games (${fields}) VALUES (${values}) RETURNING *`);
    return result[0];
  }
  
  static async count(options = {}) {
    let query = 'SELECT COUNT(*) as count FROM games';
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => `${key} = '${value}'`)
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
        .map(([key, value]) => `${key} = '${value}'`)
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    await sql.unsafe(query);
  }
}

module.exports = Game;