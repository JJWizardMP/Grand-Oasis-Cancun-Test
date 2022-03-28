const express = require("express");
const router = express.Router();
const restaurantsController = require("../controllers/restaurantsController");
const barsController = require("../controllers/barsController");
const path = require("path");
module.exports = function () {
  router.get("/apiv1/restaurants/:day/:hour", restaurantsController.showRestaurants);
  router.get("/apiv1/bars/:day/:hour", barsController.showBars);
  return router;
};