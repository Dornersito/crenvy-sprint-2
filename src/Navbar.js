import React from "react";
import './App.css';
import axios from "axios";

import logoBanner from "./logoCrenvyBanner.png"

export default function Navbar(){
    const API_endpoint = "https://api.openweathermap.org/data/2.5/weather?";
    const API_key = "885247edcfd01bf83861e339962c9756";

    const [temp, setTemp] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [place, setPlace] = React.useState("");
    const [weather, setWeather] = React.useState("");
    const [Iconimage, setIconImage] = React.useState("");
  
    let date = new Date();
    let dayDate = date.getDate();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let hour = date.getHours();
    let minutes = date.getMinutes();
  
    let iconUrl = "";
  
    //console.log(dayDate);
  
    let hour_text = `${hour}:${minutes}`;
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    let dateText = `${days[day]} ${dayDate}/${month}`;
  
    let longitude;
    let latitude;
  
    React.useEffect(() => {  
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        const crd = pos.coords;
        longitude = crd.longitude;
        latitude = crd.latitude;
  
        let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`;
      
        axios.get(finalAPIEndPoint)
        .then((response) => {
          //console.log(response);
  
          let t = response.data.main.temp -272.15; 
          setPlace(response.data.name);
          setCountry(response.data.sys.country);
          setWeather(response.data.weather[0].main);
          setTemp(`${t.toFixed(1)} °C`);
  
          let url = "http://openweathermap.org/img/wn/";
          iconUrl = url + response.data.weather[0].icon + "@2x.png";
          setIconImage(iconUrl);
  
        })
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, [])

    //<a href = "/" className="site-title">Crenvy</a> 
    return (
    <nav className="nav">
      <ul>
      <img src = {logoBanner} alt = "icon"/> 
        
      </ul>
        <ul>
          <li>
            <img src = {Iconimage} alt = "icon"/> 
          </li> 
            <li className="Weather">
                <div> {country} </div>
                <div> {place} </div>
                <div> {temp} </div>
                <div> {weather} </div>
            </li>
            <li className="App">
                <div> {dateText} </div>
                <p> {hour_text} </p>
            </li>
        </ul>
    </nav>
    )
}