require("dotenv").config({ path: ".env.vars" });

const db = require("../config/db");

exports.showRestaurants = async (req, res, next) => {
  const { day = "", hotel = "", hour = "" } = req.params;

  try {
    const restaurants = await db.query(
      `
      SELECT cc.id, cc.nombre, cc.concepto_en, cc.concepto_es, 
      cch.dia, cch.hora_inicio, cch.hora_final, cc.logo, img_portada
      FROM centros_consumo AS cc
      INNER JOIN centros_consumo_horarios AS cch
      ON cc.id = cch.centro_consumo_id
      INNER JOIN centros_consumo_detalles as ccd 
      ON cc.id = ccd.centro_consumo_id 
      WHERE cc.categoria_id = 2 AND ccd.hotel_id = ${hotel} AND cch.dia = ${day}
      AND cch.hora_inicio < "${hour}" AND cch.hora_final > "${hour}";
      `
    );
    res.json(restaurants[0]);
  } catch (error) {
    console.log(error);
    next();
  }
};