import React from "react";
import './App.css';


import logoBanner from "./logoCrenvyBanner.png"
import eslogan from "./eslogan2.png"

export default function Navbar({Iconimage, country, place, temp, weather, dateText, hour_text}){
    //<a href = "/" className="site-title">Crenvy</a> 
    return (
    <nav className="nav">
      <ul>
      <img src = {logoBanner} alt = "icon"/>    
      </ul>
      
      <ul>
        
          <div style={{marginRight:"400px", marginTop:"35px"}}>
            <img src = {eslogan} alt ="" style={{width:"100%"}} />
          </div>
        
        <li>
          <img src = {Iconimage} alt = "icon" style={{marginRight:"10px"}}/> 
        </li> 

          <li className="Weather" style={{marginTop:"5px"}}>
              <div> {country} </div>
              <div> {place} </div>
              <div> {temp} </div>
              <div> {weather} </div>
          </li>
          <li className="App" style={{marginTop:"25px", marginRight:"20px"}}>
              <div> {dateText}</div>
              <div> {hour_text} </div>
          </li>
      </ul>
    </nav>
    )
}