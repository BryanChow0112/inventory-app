const db = require("../db/queries");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  console.log("Categories:", categories);
  res.render("categories/index", { categories });
}

module.exports = {
  getAllCategories
};
