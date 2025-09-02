const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const init = async () => {
  try {
    console.log('Starting server initialization...');
    console.log('DATABASE_URL configured:', !!process.env.DATABASE_URL);
    console.log('NETLIFY_DATABASE_URL configured:', !!process.env.NETLIFY_DATABASE_URL);
    console.log('JWT configured:', !!process.env.JWT);
    
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      console.log('Syncing database...');
      await db.sync({ alter: true });
      console.log('Database sync completed');
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (ex) {
    console.error('Server initialization failed:', ex);
    process.exit(1);
  }
}

init()
