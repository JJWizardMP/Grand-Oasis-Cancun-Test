const express = require("express");
const router = express.Router();
const restaurantsController = require("../controllers/restaurantsController");
const barsController = require("../controllers/barsController");
<<<<<<< HEAD
const path = require("path");
module.exports = function () {
  router.get("/apiv1/restaurants/:day/:hour", restaurantsController.showRestaurants);
  router.get("/apiv1/bars/:day/:hour", barsController.showBars);
=======
const hotelsController = require("../controllers/hotelsController");
const path = require("path");
module.exports = function () {
  router.get("/apiv1/restaurants/:day/:hotel/:hour", restaurantsController.showRestaurants);
  router.get("/apiv1/bars/:day/:hotel/:hour", barsController.showBars);
  router.get("/apiv1/hotels", hotelsController.showHotels);

>>>>>>> development
  return router;
};