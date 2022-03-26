require("dotenv").config({ path: ".env.vars" });

const db = require("../config/db");

exports.showBars = async (req, res, next) => {

  const { day = "" } = req.params;
  try {
    const bars = await db.query(
      `
      SELECT nombre, hora_inicio, hora_final, dia, logo, img_portada
      FROM centros_consumo AS cc
      INNER JOIN centros_consumo_horarios AS cch
      ON cc.id = cch.centro_consumo_id
      WHERE cc.categoria_id = 3 AND cch.dia = ${day};
      `
    );
    res.json(bars);
  } catch (error) {
    console.log(error);
    next();
  }
};