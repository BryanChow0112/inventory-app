const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function getAllCars(req, res) {
  const cars = await db.getAllCars();
  const categories = await db.getAllCategories();
  console.log("Cars:", cars);
  res.render("cars/index", { cars, categories });
}

async function createCarGet(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("cars/create", { categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error fetching categories");
  }
}

async function createCarPost(req, res) {
  const { make, model, year, price, category_id, color, description } =
    req.body;
  try {
    await db.insertCar(
      make,
      model,
      year,
      price,
      category_id,
      color,
      description
    );
    res.redirect("/cars");
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).send("Error creating car");
  }
}

async function getCarById(req, res) {
  const { carId } = req.params;
  try {
    const car = await db.getCarById(carId);
    if (!car) {
      return res.status(404).send("Car not found");
    }

    res.render("cars/detail", { car });
  } catch (error) {
    console.error("Error fetching car detail:", error);
    res.status(500).send("Error fetching car detail");
  }
}

async function updateCarGet(req, res) {
  const { carId } = req.params;
  const categories = await db.getAllCategories();
  try {
    const car = await db.getCarById(carId);
    res.render("cars/update", { car, categories });
  } catch (error) {
    console.error("Error fetching car for update:", error);
    res.status(500).send("Error fetching car for update");
  }
}

async function updateCarPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, re-render the form with error messages
    try {
      const { carId } = req.params;
      const car = await db.getCarById(carId);
      const categories = await db.getAllCategories();
      return res.render("cars/update", {
        car: { ...car, ...req.body, car_id: carId },
        categories,
        errors: errors.array()
      });
    } catch (error) {
      console.error("Error fetching data for validation error render:", error);
      return res.status(500).send("Error processing request");
    }
  }

  const { carId } = req.params;
  const { make, model, year, price, category_id, color, description } =
    req.body;
  try {
    await db.updateCar(
      carId,
      make,
      model,
      year,
      price,
      category_id,
      color,
      description
    );
    res.redirect(`/cars/${carId}`);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).send("Error updating car");
  }
}

async function deleteCarPost(req, res) {
  const { carId } = req.params;
  try {
    await db.deleteCar(carId);
    res.redirect("/cars");
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).send("Error deleting car");
  }
}

module.exports = {
  getAllCars,
  createCarGet,
  createCarPost,
  getCarById,
  updateCarGet,
  updateCarPost,
  deleteCarPost
};
