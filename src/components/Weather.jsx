import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import { FaSearch } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";
// import Card from "./Card";
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Bhopal");
  const cityRef = useRef(null);
  const getWeather = async () => {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${`b2e20c8c626180f5d91fda6e5fdb1c61`}&units=metric `
      );
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.log("Error Ocuurd:"), error;
    }
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  const handleSearch = () => {
    // console.log(cityRef.current.value);
    setCity(cityRef.current.value);
  };
  return (
    <div className="weather-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="search City weather"
          className="input-field"
          ref={cityRef}
        />
        <button className="btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
      {weather && (
        <div className="info-container">
          <p className="city-name">
            {weather.name} ({weather.sys.country})
          </p>
          <p className="temp">
            {weather.main.temp} &deg;C <CiTempHigh />
          </p>
          <p className="weather-condition">
            Condition: {weather.weather[0].description}
          </p>
          <p className="wind">Wind Speed: {weather.wind.speed} km/hr</p>

          <div className="temp-range">
            <p>Max Temp: {weather.main.temp_max} &deg;C</p>
            <p>Min Temp: {weather.main.temp_min} &deg;C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

/*

*/
