const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");

// GET - List all categories
router.get("/", categoryController.categoryList); // Route for listing all categories

// GET - View a specific category
router.get("/:categoryId", categoryController.categoryDetail);

module.exports = router;
