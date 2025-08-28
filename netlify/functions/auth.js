const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
const JWT_SECRET = process.env.JWT;

if (!databaseUrl || !JWT_SECRET) {
  throw new Error('DATABASE_URL and JWT must be set');
}

const sql = neon(databaseUrl);

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const path = event.path.replace('/.netlify/functions/auth', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : {};

    if (method === 'POST' && path === '/signup') {
      const { username, password } = body;
      
      if (!username || !password) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify('Username and password are required')
        };
      }

      // Check if user exists
      const existingUser = await sql`SELECT id FROM users WHERE username = ${username}`;
      if (existingUser.length > 0) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify('User already exists')
        };
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await sql`
        INSERT INTO users (username, password) 
        VALUES (${username}, ${hashedPassword}) 
        RETURNING id, username
      `;

      // Generate token
      const token = jwt.sign({ id: result[0].id }, JWT_SECRET);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ token })
      };
    }

    if (method === 'POST' && path === '/login') {
      const { username, password } = body;

      // Find user
      const user = await sql`SELECT id, username, password FROM users WHERE username = ${username}`;
      if (user.length === 0) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify('Wrong username and/or password')
        };
      }

      // Check password
      const isValid = await bcrypt.compare(password, user[0].password);
      if (!isValid) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify('Wrong username and/or password')
        };
      }

      // Generate token
      const token = jwt.sign({ id: user[0].id }, JWT_SECRET);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ token })
      };
    }

    if (method === 'GET' && path === '/me') {
      const authHeader = event.headers.authorization;
      if (!authHeader) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify('No token provided')
        };
      }

      try {
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        const user = await sql`SELECT id, username FROM users WHERE id = ${decoded.id}`;
        
        if (user.length === 0) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify('Invalid token')
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(user[0])
        };
      } catch (error) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify('Invalid token')
        };
      }
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify('Not found')
    };

  } catch (error) {
    console.error('Auth function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify('Internal server error')
    };
  }
};