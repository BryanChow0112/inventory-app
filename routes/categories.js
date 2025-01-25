const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");
const { check } = require("express-validator");

// GET - List all categories
router.get("/", categoryController.getAllCategories); // Route for listing all categories

// GET - Display create category form
router.get("/create", categoryController.createCategoryGet);

// POST - Handle create category form submission with validation
router.post(
  "/create",
  [
    // Validation middleware array
    check("name")
      .trim()
      .notEmpty()
      .withMessage("Category name is required")
      .isLength({ max: 255 })
      .withMessage("Category name cannot be longer than 255 characters")
  ],
  categoryController.createCategoryPost
);

module.exports = router;
