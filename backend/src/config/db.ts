// Removed unused import
const dotenv = require("dotenv");

dotenv.config();

console.log("DB_USER", process.env.DB_USER);
console.log("DB_HOST", process.env.DB_HOST);

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  port: parseInt(process.env.DB_PORT as string, 10),
});

export default pool;
