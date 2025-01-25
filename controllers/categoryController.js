const db = require("../db/queries");
const { validationResult } = require("express-validator");

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

async function getCategoryById(req, res) {
  const { categoryId } = req.params;
  try {
    const category = await db.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    const cars = await db.getCarsByCategory(categoryId);
    res.render("categories/detail", { category, cars });
  } catch (error) {
    console.error("Error fetching category detail:", error);
    res.status(500).send("Error fetching category detail");
  }
}

async function updateCategoryGet(req, res) {
  const { categoryId } = req.params;
  try {
    const category = await db.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    // Render the update form view
    res.render("categories/update", { category });
  } catch (error) {
    console.error("Error fetching category for update:", error);
    res.status(500).send("Error fetching category for update");
  }
}

async function updateCategoryPost(req, res) {
  const { categoryId } = req.params;
  const { name } = req.body;
  try {
    await db.updateCategory(categoryId, name);
    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Error updating category");
  }
}

async function deleteCategoryPost(req, res) {
  const { categoryId } = req.params;
  try {
    // Check if category has associated cars
    const hasCars = await db.categoryHasCars(categoryId);
    if (hasCars) {
      // If category has cars, redirect back with error message
      alert(
        "This category cannot be deleted because it contains cars. Please re-categorize or delete the cars within this category before deleting it."
      );
      return res.redirect("/categories");
    }

    // If no cars, proceed with deletion
    await db.deleteCategory(categoryId);
    req.session.success = "Category successfully deleted.";
    res.redirect("/categories");
  } catch (error) {
    console.error("Error deleting category:", error);
    alert("Error deleting category.");
    res.redirect("/categories");
  }
}

module.exports = {
  getAllCategories,
  createCategoryGet,
  createCategoryPost,
  getCategoryById,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost
};
