import React from "react";
import "./navbar.css";

export default function NavBar(props) {
  return (
    <>
      <div className="navbar">
        <section id="greeting">
          <p className="title">GRAND OASIS CANCUN &ensp;| </p>
          <p className="hour">{props.hours12(props.hour)}</p>
          <p className="date">{props.date}</p>
        </section>
        <section id="hotelsform">
          <label htmlFor="hotels">Choose a hotel :&ensp;</label>
          <select
            name="hotels"
            id="hotels"
            onChange={props.handleChangeHotel}
          >
            {props.hotels.map((res, ind) => (
              <option value={res.id} key={ind}>
                {res.nombre}
              </option>
            ))}
          </select>
        </section>
      </div>
    </>
  );
}
