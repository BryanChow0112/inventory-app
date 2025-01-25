const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController.js");
const { check } = require("express-validator");

// GET - List all cars
router.get("/", carController.getAllCars);

// GET - Display create car form
router.get("/create", carController.createCarGet);

// POST - Handle create car form submission with validation
router.post(
  "/create",
  [
    check("make").trim().notEmpty().withMessage("Make is required"),
    check("model").trim().notEmpty().withMessage("Model is required"),
    check("year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Invalid year"),
    check("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    check("category_id")
      .notEmpty()
      .withMessage("Category is required")
      .isInt()
      .withMessage("Invalid category")
  ],
  carController.createCarPost
);

// GET - View a specific car detail
router.get("/:carId", carController.getCarById);

// GET - Display update car form for a specific car
router.get("/:carId/update", carController.updateCarGet);

// POST - Handle update car form submission with validation
router.post(
  "/:carId/update",
  [
    check("make").trim().notEmpty().withMessage("Make is required"),
    check("model").trim().notEmpty().withMessage("Model is required"),
    check("year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
      .withMessage("Invalid year"),
    check("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    check("category_id")
      .notEmpty()
      .withMessage("Category is required")
      .isInt()
      .withMessage("Invalid category")
  ],
  carController.updateCarPost
);

module.exports = router;
