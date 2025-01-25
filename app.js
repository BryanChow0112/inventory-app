require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const pool = require("./db/pool");
const categoryRouter = require("./routes/categories");
const carRouter = require("./routes/cars");

// Test database connection (optional, but good to check)
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database!"))
  .catch((err) => console.error("Database connection error:", err.stack));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from public directory

// Set up view engine (EJS)
app.set("view engine", "ejs");
app.set("views", "./views");

// Home route
app.get("/", async (req, res) => {
  try {
    res.render("index", { title: "Car Inventory Management" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading homepage");
  }
});

app.use("/categories", categoryRouter);
app.use("/cars", carRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
