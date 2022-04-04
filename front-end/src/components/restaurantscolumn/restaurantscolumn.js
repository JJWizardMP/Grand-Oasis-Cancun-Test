import React from "react";
import "./restaurantscolumn.css";

export default function RestaurantsColumn(props) {
  return (
    <>
      {props.restaurants && (
        <>
          {props.restaurants.map((res, ind) => (
            <div className="card" id={res.id} key={ind}>
              <h5 id="name">{res.nombre}</h5>
              <p id="concept">{res.concepto_en}</p>
              <p id="concept">{res.concepto_es}</p>
              <div className="innercard">
                <div className="innertimecard">
                  <span id="isopen"> ABIERTO HOY </span>
                  <p id="time">
                    {" "}
                    {props.hours12(res.hora_inicio)} -
                    {props.hours12(res.hora_final)}
                  </p>
                </div>
                <button
                  className="incbutton"
                  data-id={res.id}
                  onClick={props.handleChange}
                >
                  VER MÁS
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
