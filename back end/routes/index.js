const express = require("express");
const router = express.Router();
const restaurantsController = require("../controllers/restaurantsController");
const barsController = require("../controllers/barsController");
const path = require("path");
module.exports = function () {
  router.get("/restaurants/:day", restaurantsController.showRestaurants);
  router.get("/bars/:day", barsController.showBars);
  return router;
};