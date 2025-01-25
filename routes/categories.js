const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");

// GET - List all categories
router.get("/", categoryController.getAllCategories); // Route for listing all categories

module.exports = router;
