/*const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Host name for database connection:
  port: process.env.DB_PORT, // Port number for database connection:
  user: process.env.DB_USER, // Database user:
  password: process.env.DB_PW, // Password for the above database user:
  database: process.env.DB_NAME // Database name:
});
connection.connect();*/

const { Client } = require("pg");

const connection = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

connection.connect();

module.exports = connection;
