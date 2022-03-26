require("dotenv").config({ path: ".env.vars" });

const db = require("../config/db");

exports.showRestaurants = async (req, res, next) => {
  const { day = "" } = req.params;

  try {
    const restaurants = await db.query(
      `
      SELECT nombre, concepto_en, concepto_es, dia, hora_inicio, hora_final
      FROM centros_consumo AS cc
      INNER JOIN centros_consumo_horarios AS cch
      ON cc.id = cch.centro_consumo_id
      WHERE cc.categoria_id = 2 AND cch.dia = ${day};
      `
    );
    res.json(restaurants);
  } catch (error) {
    console.log(error);
    next();
  }
};