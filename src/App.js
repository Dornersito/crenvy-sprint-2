import logo from './logoCrenvyMenu.gif';
import './App.css';
import Navbar from './Navbar';
import Publicacion from './Publicacion'
import Post from './Post'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,InputGroup,FormControl,Button,Row,Card} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import Buscador from './Buscador';

const CLIENT_ID="b01669ce06464e06ad1afe9c395c7c15";
const CLIENT_SECRET="c7e50afc03dc417ca2181cf3d81664ff";

function App() {
  const[searchInput, setSearchInput] = useState("");
  const[accessToken, setAccessToken] = useState("");
  const[loading, setLoading] = useState("");
  const[songs, setSongs] = useState([]);

  useEffect(()=>{
    setLoading(true);
    setTimeout(() => {setLoading(false);}, 3000);
  },[])

  return(
    <div>
      {loading ?
        (
        <div className="Loading">
          <header className="Loading-header">
            <img src={logo} className="Loading-logo" alt="Loading" />
          </header>
        </div>
        ):
        (
          <header className='App-header'>
            <Navbar />
            <Publicacion setSongs = {setSongs}/>
            <Post songs = {songs}/>
            
          </header>
          
        )
    }
    </div>
  )
}

export default App;
