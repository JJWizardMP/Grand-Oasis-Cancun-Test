import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  // Url
  //const url = "https://oasis-express-app.herokuapp.com/apiv1/";
  const url_img = "https://api-onow.oasishoteles.net/";
  const rest_url = "https://oasis-express-app.herokuapp.com/apiv1/restaurants";
  const bars_url = "https://oasis-express-app.herokuapp.com/apiv1/bars";
  // Set States
  const [restaurants, setRestaurants] = useState([]);
  const [bars, setBars] = useState([]);
  const [details, setDetails] = useState({
    id: 0,
    logo: "",
    img_portada: "",
    hora_inicio: "00:00:00",
    hora_final: "00:00:00",
  });
  // Date and Hours values
  const [day] = useState(new Date().getDay() + 1);
  const [date] = useState(
    new Date().toLocaleString("es-MX", {
      timeZone: "America/Cancun",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );
  const hourobject = () => {
    return new Date().toLocaleTimeString("es-MX", {
      timeZone: "America/Cancun",
    });
  };
  const [hour, setHour] = useState(hourobject());

  // Request to api
  const getData = async (url_api) => {
    try {
      let res = await Axios({
        url: `${url_api}/${day}/${hour}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        // test for status you want, etc
        console.log(res.status);
      }
      // Don't forget to return something
      setDetails(res.data[0]);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // Changer format from "hh:mm:ss" to "hh:mm AM/PM"
  const hours12 = (hr) => {
    return (
      (parseInt(hr.split(":")[0]) % 12) +
      ":" +
      hr.split(":")[1] +
      " " +
      (parseInt(hr.split(":")[0]) / 12 > 1 ? "PM" : "AM")
    );
  };
  // Handle all details state
  const handleChange = (e) => {
    e.preventDefault();
    let idcent = parseInt(e.target.getAttribute("data-id"));
    setDetails(bars.concat(restaurants).filter((e) => e.id === idcent)[0]);
  };

  useEffect(() => {
    const interval = setInterval(() => setHour(hourobject(), 60 * 1000));

    getData(bars_url).then((res) => setBars(res));
    getData(rest_url).then((res) => setRestaurants(res));

    return () => {
      clearInterval(interval);
    };
    //req()
  }, [setRestaurants, setBars, setHour]);
  return (
    <div className="App">
      <div className="navbar">
        <p className="title">GRAND OASIS CANCUN |</p>
        <p className="hour">{hours12(hour)}</p>
        <p className="date">{date}</p>
      </div>
      <section className="container">
        <div className="column">
          <h1 className="coltitle">Restaurantes</h1>
          <div>
            {restaurants.map((res, ind) => (
              <div className="card" id={res.id} key={ind}>
                <h5 id="name">{res.nombre}</h5>
                <p id="concept">{res.concepto_en}</p>
                <p id="concept">{res.concepto_es}</p>
                <div className="innercard">
                  <div className="innertimecard">
                    <span id="isopen"> ABIERTO HOY </span>
                    <p id="time">
                      {" "}
                      {hours12(res.hora_inicio)} - {hours12(res.hora_final)}
                    </p>
                  </div>
                  <button
                    className="incbutton"
                    data-id={res.id}
                    onClick={handleChange}
                  >
                    VER MÁS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="column-bar">
          <h1 className="coltitle">Bares</h1>
          <div>
            {bars.map((bar, ind) => (
              <div className="card-bar" key={ind}>
                <h5 id="name">{bar.nombre}</h5>
                <div className="innercard-bar">
                  <div>
                    {" "}
                    <span id="isopen"> ABIERTO HOY </span>
                    <p id="time">
                      {" "}
                      {hours12(bar.hora_inicio)} - {hours12(bar.hora_final)}
                    </p>{" "}
                  </div>

                  <button
                    className="incbutton-bar"
                    data-id={bar.id}
                    onClick={handleChange}
                  >
                    VER MÁS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="column-result">
          <img src={url_img + details.img_portada} id="background" alt="logo" />
          <img src={url_img + details.logo} id="logo" alt="business image"/>

          <div className="detailsdiv">
            <div id="ddesc">
              <p id="dtitle">{details.nombre}</p>
              <p>{details.concepto_en}</p>
              <p>{details.concepto_es}</p>
            </div>
            <div id="dtime">
              <span> ABIERTO HOY </span>
              <p>
                {hours12(details.hora_inicio)} - {hours12(details.hora_final)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;