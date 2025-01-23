require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test database connection (optional, but good to check)
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database!"))
  .catch((err) => console.error("Database connection error:", err.stack));

app.use(express.urlencoded({ extended: true }));

// Set up view engine (EJS)
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW() as now"); // Simple query to get current timestamp
    const currentTime = result.rows[0].now;
    client.release(); // Release the client back to the pool
    res.send(`Hello, Car Inventory App! Server time: ${currentTime}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to database");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
