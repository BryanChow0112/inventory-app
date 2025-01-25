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

module.exports = {
  getAllCategories
};
