import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react';

const CLIENT_ID="b01669ce06464e06ad1afe9c395c7c15"; //id del cliente 
const CLIENT_SECRET="c7e50afc03dc417ca2181cf3d81664ff";

export default function Publicacion({setSongs}){
    const[searchInput, setSearchInput] = useState("");
    const[accessToken, setAccessToken] = useState("");

    useEffect(()=>{
        //se usa para inicializar solo una vez la api
        var authParameters={
          method:'POST',
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token',authParameters)
          .then(result=>result.json())
          .then(data=>setAccessToken(data.access_token))
      },[])

      async function search(){//funcion para buscar por artista o por la cancion
        var artistParameters={//si es que la persona solo pone la cancion
          method: 'GET',      //en el selector de canciones la cancion sera la primera
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
          }
        }
        var artistID =await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=track%2Cartist',artistParameters)//se hace la busqueda
        .then(response=> response.json())
        .then(data=>{return data.artists.items[0].id && data.tracks})//retorna el primer item que encuentra y sus canciones
        
        setSongs(artistID.items);//setea las songs
      }
    
    return(   
      <div>
      <div className="App">
          <div className='main-wrapper'>
              <div className='form-wrapper'>
                  <form action='' >
                      <div className='form-group'>
                          <label htmlFor=''>Ingresa tu artista</label>
                          
                          <input type='text' name='entryTitle'
                          placeholder= "Search by artist"
                          
                    
                          onChange={event=>setSearchInput(event.target.value)}
                          onBlur={search}//busca la cancion por artista cuando se deja de focusear el div, es decir cuando se cambia de div
                          />              
                    </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
      
    )

}