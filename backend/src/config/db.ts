import { Pool } from "pg";
import dotenv from "dotenv";

const pool = new Pool({
  user: process.env.DATASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

export default pool;
