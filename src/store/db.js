const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',          // Your PostgreSQL username
  host: 'localhost',         // Database host
  database: 'cyberquest',    // Database name
  password: 'root',  // Your PostgreSQL password
  port: 5432,                // Default PostgreSQL port
});

module.exports = pool;