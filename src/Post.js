import './App.css';
import React, {useState} from "react";
import EntryCard from './Components/EntryCard';
import Select from 'react-select'

export default function Post({songs}){
    //const [title, setTitle] = useState("Crenvy");
    const [blogEntrys, setBlogEntrys] = useState([]);
    const[entry, setEntry] = useState({});
   // const[selectedSong, setSelectedSong] = useState("");
   // const[selectedImg, setSelectedImg] = useState("");
   // const[songs, setSongs] = useState([]);
    // console.log("xd");
    // console.log(songs);
    
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
        
        setEntry({...entry, "content":e.label, 'picture':[songArray[0].album.images[0].url,songArray[0].external_urls.spotify]});
        console.log(songArray[0].external_urls.spotify)
    }
    


    return (
        <div>
            <div className="App">
                <div className='main-wrapper'>
                    <div className='form-wrapper'>
                        <form action=''>
                            <div className='form-group'>
                                <label htmlFor=''>¿Que estas escuchando?</label>
                                <Select options={songs.map(song => ({label: song.name, value: song.name}))} onChange={handlerSelect} ></Select>
                            </div>
                            <div className='form-group'>
                                <label htmlFor=''>¿Como te llamas?</label>
                                <input type='text' name='entryTitle' onChange={changeHandler}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor=''>Estado de animo</label>
                                <select name='animo' onChange={changeHandler}>
                                    <option></option>
                                    <option>Feliz c:</option>
                                    <option>Triste :c</option>
                                    <option>Indiferente :|</option>
                                </select>
                            </div>
                            
                        </form>
                        <button type='button' onClick={saveHandler}>Crenvyar</button>
                    </div>
                    <div className='entries-wrapper'>
                    {
                        blogEntrys.map((entry, index) => <EntryCard entryData = {entry}/>)//Mapea las entradas y devuelve entryCard, cada objeto le llamamos entry
                    }
                    </div>
                </div>
            </div>
        </div>   
    );
}