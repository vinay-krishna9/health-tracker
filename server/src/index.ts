import dotenv from "dotenv";
dotenv.config();

import express from "express";
import pool from "./database/db";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from TypeScript + Express!");
});

app.get("/db-check", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    res.json({ success: true, result: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
