const pool = require("./pool");

async function getAllCategories() {
  try {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

async function insertCategory(category) {
  try {
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [category]);
  } catch (error) {
    console.error("Error inserting category:", error);
    throw error;
  }
}

module.exports = {
  getAllCategories,
  insertCategory
};
