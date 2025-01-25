// Load environment variables from .env file
require("dotenv").config();

// Import required dependencies
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = require("./db/pool");

// Import route handlers
const categoryRouter = require("./routes/categories");
const carRouter = require("./routes/cars");

// Test database connection
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database!"))
  .catch((err) => console.error("Database connection error:", err.stack));

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from public directory

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

/**
 * Home route
 * Renders the main landing page
 */
app.get("/", async (req, res) => {
  try {
    res.render("index", { title: "Car Inventory Management" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading homepage");
  }
});

// Register route handlers
app.use("/categories", categoryRouter);
app.use("/cars", carRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
