import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  // Url
  //const url = "http://0.0.0.0:5000/apiv1/";
  const url_img = "https://api-onow.oasishoteles.net/";
  const rest_url = "http://0.0.0.0:5000/apiv1/restaurants";
  const bars_url = "http://0.0.0.0:5000/apiv1/bars";
  const hot_url = "http://0.0.0.0:5000/apiv1/hotels";
  // Set States
  const [hotel, setHotel] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [bars, setBars] = useState([]);
  const [details, setDetails] = useState({state:"state"});
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

  // Changer format from "hh:mm:ss" to "hh:mm AM/PM"
  const hours12 = (hr) => {
    return (
      (parseInt(hr.split(":")[0]) >= 12
        ? parseInt(hr.split(":")[0]) % 12
        : hr.split(":")[0]) +
      ":" +
      hr.split(":")[1] +
      " " +
      (parseInt(hr.split(":")[0]) >= 12 ? "PM" : "AM")
    );
  };
  // Handle all details state
  const handleChange = (e) => {
    e.preventDefault();
    let idcent = parseInt(e.target.getAttribute("data-id"));
    setDetails(bars.concat(restaurants).filter((e) => e.id === idcent)[0]);
  };

  const handleChangeHotel = (e) => {
    let value = parseInt(e.target.value);
    setHotel(value);
    //setHotel(value);
    const getData = async (url_api, hotel) => {
      try {
        let response = await Axios({
          url: `${url_api}/${day}/${hotel}/${hour}`,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Don't forget to return something
        setDetails(response.data[0] ? response.data[0] : {});
        return response.data;
      } catch (err) {
        console.error(err);
      }
    };
    getData(bars_url, value).then((res) => setBars(res));
    getData(rest_url, value).then((res) => setRestaurants(res));
  };
  useEffect(() => {
    const interval = setInterval(() => setHour(hourobject(), 1000));
    // Request to api
    const getData = async (url_api) => {
      try {
        let response = await Axios({
          url: `${url_api}/${day}/${hotel}/${hour}`,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Don't forget to return something
        setDetails(response.data[0] ? response.data[0] : {});
        return response.data;
      } catch (err) {
        console.error(err);
      }
    };

    const getHotels = async (url_api) => {
      try {
        let response = await Axios({
          url: `${url_api}`,
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Don't forget to return something
        return response.data;
      } catch (err) {
        console.error(err);
      }
    };
    getHotels(hot_url).then((res) => setHotels(res));
    getData(bars_url).then((res) => setBars(res));
    getData(rest_url).then((res) => setRestaurants(res));
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <div className="navbar">
        <section id="greeting">
          <p className="title">GRAND OASIS CANCUN &ensp;| </p>
          <p className="hour">{hours12(hour)}</p>
          <p className="date">{date}</p>
        </section>
        <section id="hotelsform">
          <label htmlFor="hotels">Choose a hotel :&ensp;</label>
          <select name="hotels" id="hotels" onChange={handleChangeHotel}>
            {hotels.map((res, ind) => (
              <option value={res.id} key={ind}>
                {res.nombre}
              </option>
            ))}
          </select>
        </section>
      </div>
      <section className="container">
        <div className="column">
          <h1 className="coltitle">Restaurantes</h1>
          <div>
            {restaurants && (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="column-bar">
          <h1 className="coltitle">Bares</h1>
          <div>
            {bars && (
              <>
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
              </>
            )}
          </div>
        </div>
        <div className="column-result">
          {details.hasOwnProperty("id") && (
            <>
              <img
                src={url_img + details.img_portada}
                id="background"
                alt="logo"
              />
              <img src={url_img + details.logo} id="logo" alt="business" />
              <div className="detailsdiv">
                <div id="ddesc">
                  <p id="dtitle">{details.nombre}</p>
                  <p>{details.concepto_en}</p>
                  <p>{details.concepto_es}</p>
                </div>
                <div id="dtime">
                  <span> ABIERTO HOY </span>
                  <p>
                    {hours12(details.hora_inicio)} -{" "}
                    {hours12(details.hora_final)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
