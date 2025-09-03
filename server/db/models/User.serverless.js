// server/db/models/User.serverless.js
const { sql } = require('../serverless-db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
  static async findByPk(id) {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    return result[0] || null;
  }
  
  static async findOne(where) {
    const conditions = Object.entries(where)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(' AND ');
    const result = await sql.unsafe(`SELECT * FROM users WHERE ${conditions} LIMIT 1`);
    return result[0] || null;
  }
  
  static async findAll(options = {}) {
    let query = 'SELECT * FROM users';
    
    if (options.attributes) {
      const attrs = options.attributes.join(', ');
      query = `SELECT ${attrs} FROM users`;
    }
    
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
    
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    
    return await sql.unsafe(query);
  }
  
  static async create(data) {
    try {
      console.log('Creating user with data:', data);
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.password, 5);
      console.log('Password hashed');
      
      const fields = Object.keys(data).filter(key => key !== 'password').join(', ') + ', password';
      const values = Object.values(data)
        .filter((_, index) => Object.keys(data)[index] !== 'password')
        .map(v => `'${v}'`)
        .join(', ') + `, '${hashedPassword}'`;
      
      const query = `INSERT INTO users (${fields}) VALUES (${values}) RETURNING *`;
      console.log('Executing query:', query);
      
      const result = await sql.unsafe(query);
      console.log('User created successfully:', result[0]);
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  static async count(options = {}) {
    let query = 'SELECT COUNT(*) as count FROM users';
    
    if (options.where) {
      const conditions = Object.entries(options.where)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(' AND ');
      query += ` WHERE ${conditions}`;
    }
    
    const result = await sql.unsafe(query);
    return result[0].count;
  }
  
  async update(data) {
    const updates = Object.entries(data)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(', ');
    const result = await sql.unsafe(`UPDATE users SET ${updates} WHERE id = ${this.id} RETURNING *`);
    return result[0];
  }
  
  async destroy() {
    await sql.unsafe(`DELETE FROM users WHERE id = ${this.id}`);
  }
  
  async correctPassword(candidatePwd) {
    return bcrypt.compare(candidatePwd, this.password);
  }
  
  generateToken() {
    return jwt.sign({id: this.id}, process.env.JWT);
  }
  
  static async authenticate({ username, password }) {
    const user = await this.findOne({ username });
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
  }
  
  static async findByToken(token) {
    try {
      const {id} = jwt.verify(token, process.env.JWT);
      const user = await this.findByPk(id);
      if (!user) {
        throw 'nooo';
      }
      return user;
    } catch (ex) {
      const error = Error('bad token');
      error.status = 401;
      throw error;
    }
  }
}

module.exports = User;