const { Pool } = require('pg');

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'NodeV',
  password: '123',
  port: 5432, // Port par défaut pour PostgreSQL
});

// open the PG connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

module.exports = connection;
