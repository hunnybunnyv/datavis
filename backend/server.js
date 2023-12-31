const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

const connectionString = 'postgres://postgres:AglaeSebastien@135.181.84.87:5432/mbds_bigdata?sslmode=disable';

const client = new Client({
  connectionString: connectionString,
});

app.get('/api/customers', async (req, res) => {
  try {
    // Connect to the PostgreSQL database
    await client.connect();

    console.log('Connected to the database');

    // Execute a simple query
    const result = await client.query('SELECT * FROM customer');

    console.log('Query result:', result.rows);

    res.json(result.rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the connection when done
    try {
      await client.end();
      console.log('Connection closed');
    } catch (error) {
      console.error('Error closing connection:', error);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
