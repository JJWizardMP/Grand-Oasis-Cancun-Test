import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import Details from "./components/details/details";
import RestaurantsColumn from "./components/restaurantscolumn/restaurantscolumn";
import BarsColumn from "./components/barscolumn/barscolumn";

function App() {
  // Url
  const url = "https://oasis-express-app.herokuapp.com/apiv1";
  const rest_endpoint = "restaurants";
  const bars_endpoint = "bars";
  const hotels_endpoint = "hotels";
  const url_img = "https://api-onow.oasishoteles.net/";
  // Set States
  const [initapi, setInitapi] = useState(true);
  const [hotel, setHotel] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [bars, setBars] = useState([]);
  const [details, setDetails] = useState({});
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
  //Handle change hotel
  const handleChangeHotel = (e) => {
    let value = parseInt(e.target.value);
    setHotel(value);
    const getData = async (url_api, endpoint, hotel) => {
      try {
        let response = await Axios({
          url: `${url_api}/${endpoint}/${day}/${hotel}/${hour}`,
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
    getData(url, bars_endpoint, value).then((res) => setBars(res));
    getData(url, rest_endpoint, value).then((res) => setRestaurants(res));
  };
  useEffect(() => {
    const interval = setInterval(() => setHour(hourobject(), 60 * 1000));
    // Request to api
    const getData = async (url_api, endpoint) => {
      try {
        let response = await Axios({
          url: `${url_api}/${endpoint}/${day}/${hotel}/${hour}`,
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

    const getHotels = async (url_api, endpoint) => {
      try {
        let response = await Axios({
          url: `${url_api}/${endpoint}`,
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
    if (initapi) {
      setInitapi(false)
      getHotels(url, hotels_endpoint).then((res) => setHotels(res));
      getData(url, bars_endpoint).then((res) => setBars(res));
      getData(url, rest_endpoint).then((res) => setRestaurants(res));
    }
    return () => {
      clearInterval(interval);
    };
  }, [day, hotel, hour, initapi]);

  return (
    <div className="App">
      <NavBar
        hours12={hours12}
        handleChangeHotel={handleChangeHotel}
        hour={hour}
        date={date}
        hotels={hotels}
      />
      <section className="container">
        <div className="column">
          <h1 className="coltitle">Restaurantes</h1>
          <div>
            <RestaurantsColumn
              restaurants={restaurants}
              hours12={hours12}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="column-bar">
          <h1 className="coltitle">Bares</h1>
          <div>
            <BarsColumn
              bars={bars}
              hours12={hours12}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="column-result">
          <Details hours12={hours12} url_img={url_img} details={details} />
        </div>
      </section>
    </div>
  );
}

export default App;
