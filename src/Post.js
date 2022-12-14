import './App.css';
import React from "react";
import EntryCard from './Components/EntryCard';
import Select from 'react-select'
import {useState,useEffect} from 'react';

import Ranking from './Components/Ranking/ranking';

const CLIENT_ID="b01669ce06464e06ad1afe9c395c7c15";
const CLIENT_SECRET="c7e50afc03dc417ca2181cf3d81664ff";

export default function Post({songs, setSongs, Iconimage, hour_text, weather}){
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
        if (searchInput.trim() === '') return;//si es que la persona solo pone la cancion
        console.log("search for "+searchInput); //en el selector de canciones la cancion sera la primera
        
        var artistParameters={
            method: 'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
            }
        }
        var artistID =await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=track%2Cartist',artistParameters)//se hace la busqueda
        .then(response=> response.json())
        .then(data=>{return data.artists.items[0].id && data.tracks})//retorna el primer item que sera el artista que se busca y sus canciones
        
        setSongs(artistID.items);//setea las songs
        
    }


    const [blogEntrys, setBlogEntrys] = useState([]);
    const[entry, setEntry] = useState({});
    
    const changeHandler = event =>{//Le entrega lo del formulario al objeto que mostramos
        const value = event.target.value; //Se guarda lo que escribimos en el input
        const property = event.target.name;
        setEntry({...entry, [property]:value});
    }

    const saveHandler = () =>{ //Guarda en blogEntrys la nueva entry ingresada
        
        setBlogEntrys([...blogEntrys, entry])
    }

    const handlerSelect = e =>{
        var songArray = songs.filter(function(cancion){
            return cancion.name === e.label;
        })
        
        setEntry({...entry, "content":e.label,
                            'picture':[songArray[0].album.images[0].url,songArray[0].external_urls.spotify],
                            "weather": Iconimage,
                            "hour" : hour_text,
                            "weather_text": weather,
                            "artist": songArray[0].album.artists[0].name});
        
    }

    let estado = "Vacio";

    const changeAnimo = event =>{
        estado = event.target.value;
        //console.log("si entra")
        //console.log(event.target.value)//recibe el valor dentro de la opcion
        estado = event.target.value;
    }

    const [canciones,setCanciones] = useState([])

    const actualizarRank = () =>{
        setCanciones(Ranking(estado)); 
    }
    

    return (
        <div>
            <div className="left">
                <div className='main-wrapper'>
                    <div className='Formulario'>
                        <form action=''>
                            <div className = 'form-group'>
                                <label htmlFor=''>Ingresa tu artista</label>                
                                <input type='text' name='entryTitle'
                                    placeholder= ""
                                    onChange={event=>{setSearchInput(event.target.value);}}
                                    onBlur={search}//busca la cancion por artista cuando se deja de focusear el div, es decir cuando se cambia de div
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor=''>??Qu?? estas escuchando?</label>
                                <Select  placeholder="" className="Select" options={songs.map(song => ({label: song.name, value: song.name}))} onChange={handlerSelect} ></Select>
                            </div>

                            <div className='form-group'>
                                <label htmlFor=''>??C??mo te llamas?</label>
                                <input type='text' name='entryTitle' onChange={changeHandler}/>
                            </div>

                            <div className='form-group'>
                                <label htmlFor=''>Estado de ??nimo</label>
                                <select name='animo' onChange={changeHandler}>
                                    <option></option>
                                    <option>Feliz ????</option>
                                    <option>Triste ????</option>
                                    <option>Relajado ????</option>
                                    <option>Enojado ????</option>
                                </select>
                            </div>
                        </form>
                        
                    {entry.picture && entry.animo && entry.entryTitle? (
                        <button type='button'  class="bn632-hover bn26"  onClick={saveHandler} style={{marginTop: '20px'}}>Crenvyar</button>
                        ):
                        <button type='button' class="bn632-hover bn26" onClick={saveHandler} disabled style={{marginTop: '20px'}}>Crenvyar</button>
                    }
                    
                    </div>

                    <div className='entries-wrapper'>
                    {

                            blogEntrys.map((entry, index) => <EntryCard entryData = {entry}/>)//Mapea las entradas y devuelve entryCard, cada objeto le llamamos entry

                    }
                    </div>
                    
                    <div className='right'>
                    
                        <div className='rankingTitle'>RANKING</div>
                        <div style={{marginTop:"5px"}}>
                            <button type='button' class='bn1' style={{margin:"5px"}} onClick={actualizarRank}>????</button>
                            <select type='button' class='bn1'style={{margin:"5px"}} onChange={changeAnimo}>
                                    <option></option>
                                    <option>????</option>
                                    <option>????</option>
                                    <option>????</option>
                                    <option>????</option>
                            </select>
                            <select type='button' class='bn1'style={{margin:"5px"}}>
                                    <option></option>
                                    <option>???</option>
                                    <option>????</option>
                                    <option>????</option>
                            </select>
                        </div>
                        
                        

                        <div>
                            <div className='SongLike' style={{marginTop: "30px", width:"100%", height:"100%"}}>
                                    <div style={{marginLeft: "80px"}}>Canci??n</div>
                                    <div style={{marginRight: "10px"}}>???</div>
                            </div>
                            <div className='rankingBox'>
                                {canciones.map((item)=>(
                                    <div className='songsRanking'>
                                            <p className='izq'>{item.nombre}</p>
                                            <p className='der'>{item.likes}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>   
    );
}