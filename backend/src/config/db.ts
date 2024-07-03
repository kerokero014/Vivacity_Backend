import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "personal",
  password: "admin",
  port: 5433,
});

export default pool;
