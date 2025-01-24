#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const createCategoriesTableSQL = `
    CREATE TABLE IF NOT EXISTS categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
`;

const createCarsTableSQL = `
    CREATE TABLE IF NOT EXISTS cars (
        car_id SERIAL PRIMARY KEY,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        color VARCHAR(255),
        description TEXT,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );
`;

async function main() {
  console.log("Creating database tables...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query(createCategoriesTableSQL);
    await client.query(createCarsTableSQL);
    console.log("Tables created (or already exist).");
  } catch (error) {
    console.error("Error occurred during table creation:", error);
  } finally {
    await client.end();
    console.log("Database connection closed.");
    console.log("Done.");
  }
}

main();
