const db = require("../db/queries");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  console.log("Categories:", categories);
  res.render("categories/index", { categories });
}

async function createCategoryGet(req, res) {
  // Render the create form view
  res.render("categories/create");
}

async function createCategoryPost(req, res) {
  const { name } = req.body;
  try {
    await db.insertCategory(name);
    res.redirect("/categories");
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Error creating category");
  }
}

module.exports = {
  getAllCategories,
  createCategoryGet,
  createCategoryPost
};
