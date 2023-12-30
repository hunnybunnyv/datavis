//import pg from lodash
// import Client from 'lodash/pg';
const { Client } = require('pg');

// Replace the connection string with your own
const connectionString = 'postgres://postgres:AglaeSebastien@135.181.84.87:5432/mbds_bigdata?sslmode=disable';

// Create a new PostgreSQL client
const client = new Client({
  connectionString: connectionString,
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the database');
    
    // Now you can execute queries or perform other database operations
    
    // Example: Execute a simple query
    return client.query('SELECT * FROM catalog_car');
  })
  .then((result) => {
    console.log('Query result:', result.rows);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
    // Close the connection when done
    client.end()
      .then(() => console.log('Connection closed'))
      .catch((error) => console.error('Error closing connection:', error));
  });