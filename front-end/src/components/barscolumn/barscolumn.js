import React from "react";
import "./barscolumn.css";

export default function BarsColumn(props) {
  return (
    <>
      {props.bars && (
        <>
          {props.bars.map((bar, ind) => (
            <div className="card-bar" key={ind}>
              <h5 id="name">{bar.nombre}</h5>
              <div className="innercard-bar">
                <div>
                  {" "}
                  <span id="isopen"> ABIERTO HOY </span>
                  <p id="time">
                    {" "}
                    {props.hours12(bar.hora_inicio)} -
                    {props.hours12(bar.hora_final)}
                  </p>{" "}
                </div>

                <button
                  className="incbutton-bar"
                  data-id={bar.id}
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
