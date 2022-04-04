import React from "react";
import "./details.css";

export default function Details(props) {
  return (
    <>
      {props.details.hasOwnProperty("id") && (
        <>
          <img
            src={props.url_img + props.details.img_portada}
            id="background"
            alt="logo"
          />
          <img
            src={props.url_img + props.details.logo}
            id="logo"
            alt="business"
          />
          <div className="detailsdiv">
            <div id="ddesc">
              <p id="dtitle">{props.details.nombre}</p>
              <p>{props.details.concepto_en}</p>
              <p>{props.details.concepto_es}</p>
            </div>
            <div id="dtime">
              <span> ABIERTO HOY </span>
              <p>
                {props.hours12(props.details.hora_inicio)} -
                {props.hours12(props.details.hora_final)}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
