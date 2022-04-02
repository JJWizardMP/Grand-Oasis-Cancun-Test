require("dotenv").config({ path: ".env.vars" });

const db = require("../config/db");

exports.showHotels = async (req, res, next) => {

  //const { day = "", hour = "" } = req.params;
  try {
    const hotels = await db.query(
      `
      SELECT *
      FROM hoteles;
      
      `
    );
    res.json(hotels[0]);
  } catch (error) {
    console.log(error);
    next();
  }
};