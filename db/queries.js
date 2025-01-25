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

async function getCategoryById(id) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM categories WHERE category_id = $1",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching category by id:", error);
    throw error;
  }
}

async function updateCategory(id, name) {
  try {
    await pool.query("UPDATE categories SET name = $1 WHERE category_id = $2", [
      name,
      id
    ]);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

async function deleteCategory(id) {
  try {
    await pool.query("DELETE FROM categories WHERE category_id = $1", [id]);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

async function getAllCars() {
  try {
    const { rows } = await pool.query(
      "SELECT cars.*, categories.name AS category_name FROM cars JOIN categories ON cars.category_id = categories.category_id ORDER BY cars.make, cars.model, cars.year"
    );
    return rows;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
}

async function insertCar(
  make,
  model,
  year,
  price,
  categoryId,
  color = null,
  description = null
) {
  try {
    await pool.query(
      "INSERT INTO cars (make, model, year, price, category_id, color, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [make, model, year, price, categoryId, color, description]
    );
  } catch (error) {
    console.error("Error inserting car:", error);
    throw error;
  }
}

async function getCarById(id) {
  try {
    const { rows } = await pool.query(
      "SELECT cars.*, categories.name AS category_name FROM cars JOIN categories ON cars.category_id = categories.category_id WHERE car_id = $1",
      [id]
    );
    console.log("Car:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching car by id:", error);
    throw error;
  }
}

async function updateCar(id, make, model, year, price, categoryId) {
  try {
    await pool.query(
      "UPDATE cars SET make = $1, model = $2, year = $3, price = $4, category_id = $5 WHERE car_id = $6",
      [make, model, year, price, categoryId, id]
    );
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
}

module.exports = {
  getAllCategories,
  insertCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCars,
  insertCar,
  getCarById,
  updateCar
};
