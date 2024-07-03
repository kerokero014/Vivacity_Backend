const { Pool } = require("pg");

const pool = new Pool({
  user: "database_ykw2_user",
  host: "dpg-cq2egmlds78s73ecs9b0-a.oregon-postgres.render.com",
  database: "database_ykw2",
  password: "mRl7AlR3EweWOtVKnLVI7G0sFP3zzkYo",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
