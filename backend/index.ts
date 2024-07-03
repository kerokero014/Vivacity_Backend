import express, { Request, Response } from "express";
import pool from "./config/db";
import mainRoutes from "./routes";

const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/", mainRoutes);

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);

  // Test the database connection on server startup and send the current date
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected:", res.rows[0]);
  } catch (err: any) {
    console.error("Database connection failed:", err.stack);
  }
});
