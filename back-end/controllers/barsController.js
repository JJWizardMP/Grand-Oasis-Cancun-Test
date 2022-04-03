require("dotenv").config({ path: ".env.vars" });

const db = require("../config/db");

exports.showBars = async (req, res, next) => {

<<<<<<< HEAD
  const { day = "", hour = "" } = req.params;
=======
  const { day = "", hotel= "", hour = "" } = req.params;
>>>>>>> development
  try {
    const bars = await db.query(
      `
      SELECT cc.id, cc.nombre, cch.dia, cch.hora_inicio, cch.hora_final, 
      cc.logo, img_portada
      FROM centros_consumo AS cc
      INNER JOIN centros_consumo_horarios AS cch
      ON cc.id = cch.centro_consumo_id
      INNER JOIN centros_consumo_detalles as ccd 
      ON cc.id = ccd.centro_consumo_id 
<<<<<<< HEAD
      WHERE cc.categoria_id = 3 AND ccd.hotel_id = 1 AND cch.dia = ${day}
=======
      WHERE cc.categoria_id = 3 AND ccd.hotel_id = ${hotel} AND cch.dia = ${day}
>>>>>>> development
      AND cch.hora_inicio < "${hour}" AND cch.hora_final > "${hour}";
      
      `
    );
    res.json(bars[0]);
  } catch (error) {
    console.log(error);
    next();
  }
};