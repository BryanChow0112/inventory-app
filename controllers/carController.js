const db = require("../db/queries");

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
  const { make, model, year, price, category_id } = req.body;
  try {
    await db.insertCar(make, model, year, price, category_id);
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

module.exports = {
  getAllCars,
  createCarGet,
  createCarPost,
  getCarById
};
