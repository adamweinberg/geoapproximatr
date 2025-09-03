const { sql } = require('../serverless-db');

class Game {
  constructor(data) {
    if (data) {
      Object.assign(this, data);
      
      // If we have user fields from JOIN, restructure them into a user object
      if (data.username || data.firstName || data.lastName) {
        this.user = {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName
        };
        
        // Keep original properties for backwards compatibility
        // delete this.username;
        // delete this.firstName; 
        // delete this.lastName;
      }
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
    console.log('Game.findAll called with options:', JSON.stringify(options, null, 2));
    
    let query;
    let tableAlias;
    
    if (options.include) {
      query = `
        SELECT g.*, u.username, u."firstName", u."lastName"
        FROM games g
        JOIN users u ON g."userId" = u.id
      `;
      tableAlias = 'g';
    } else {
      query = 'SELECT * FROM games';
      tableAlias = 'games';
    }
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            // Handle Sequelize operators
            const operators = Object.keys(value);
            if (operators.length > 0) {
              const op = operators[0];
              const val = value[op];
              console.log(`Processing operator: ${op} with value:`, val);
              if (op === 'gte') return `${tableAlias}."${key}" >= '${val}'`;
              if (op === 'lte') return `${tableAlias}."${key}" <= '${val}'`;
              if (op === 'gt') return `${tableAlias}."${key}" > '${val}'`;
              if (op === 'lt') return `${tableAlias}."${key}" < '${val}'`;
            }
            console.log(`Unhandled object value for ${key}:`, value);
            return null; // Skip this condition
          }
          return `${tableAlias}."${key}" = '${value}'`;
        })
        .filter(condition => condition !== null) // Remove null conditions
        .join(' AND ');
      
      if (conditions) {
        query += ` WHERE ${conditions}`;
      }
    }
    
    if (options.order) {
      const orderClause = options.order
        .map(([field, direction]) => `${tableAlias}."${field}" ${direction}`)
        .join(', ');
      query += ` ORDER BY ${orderClause}`;
    }
    
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    
    console.log('Generated SQL query:', query);
    
    try {
      console.log('About to execute query...');
      // Try building a proper template literal call
      console.log('Using Function constructor to build query...');
      const queryFunc = new Function('sql', `return sql\`${query}\`;`);
      const results = await queryFunc(sql);
      console.log('Raw SQL results:', results);
      console.log('Results type:', typeof results);
      console.log('Results is array:', Array.isArray(results));
      
      // Handle case where results might be undefined or not an array
      if (!results) {
        console.log('Results is undefined or null');
        return [];
      }
      
      if (!Array.isArray(results)) {
        console.log('Results is not an array, converting...');
        return [];
      }
      
      console.log('Query results count:', results.length);
      console.log('First result sample:', results[0]);
      
      const gameObjects = results.map(row => new Game(row));
      console.log('Returning games count:', gameObjects.length);
      return gameObjects;
    } catch (error) {
      console.error('Error in Game.findAll:', error);
      console.error('Error details:', error.message, error.stack);
      throw error;
    }
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