//import { useEffect, useState, React } from 'react';
//import SongRanking from './songRanking'; 

export default function Ranking(estado) {
    //const [songs, setSongs] = useState([]);
    console.log("ranking.js");
    console.log(estado);

    let animo="";
    if(estado=="😎"){
        animo="Feliz"
    }else if(estado=="😔"){
        animo="Triste"
    }else if(estado=="🙂"){
        animo = "Relajado"
    }else if(estado == "😡"){
        animo="Enojado"
    }else{
        animo = "Vacio"
    }

    console.log("Este animo tiene el ranking")
    console.log(animo)
    //console.log(animo.length)

    const songs=[];
    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        let valueString = (localStorage.getItem(key));
        let valueObject = JSON.parse(valueString);//Convierte la cadena a un objeto usando JSON.parse
        let valorActual = Object.values(valueObject);
        //console.log(key + " => " + value);

        if(animo != "Vacio"){
            valorActual.forEach(element => {
                let claves = Object.keys(element);//claves 
                for(let j=0; j< claves.length; j++){
                    let clave = claves[j];
                    console.log("Aca prueba de likes")
                    console.log(clave)
                    //console.log(clave.length)
                    console.log(element[clave])
                    if(clave==animo){
                        console.log("Se cumple")
                        if(element[clave]!=="0"){
                            songs.push({
                                id: i,
                                nombre: key,
                                likes: element[clave]
                            });
                        }
                    }

                    //console.log(element[clave]);
                }
            })
        }else{
            valorActual.forEach(element => {
                if(animo == "Vacio"){
                    songs.push({
                        id: i,
                        nombre: key,
                        likes: element["Total"]
                    });
                    
                }
            })
        }

        /*songs.push({
            id: i,
            nombre: key,
            likes: value,
        });*/

        songs.sort(function(a, b){
            return b.likes - a.likes;
        });
    
        var rank = 1;
        for (var j = 0; j < songs.length; j++) {
        // increase rank only if current likes less than previous
            if (j > 0 && songs[j].likes < songs[j - 1].likes) {
                rank++;
            }
            songs[j].rank = rank;
        }
    }
    
    //console.log(songs);

    //const ranking = new SongRanking(songs)
    //ranking.render()

    /*songs.map((item)=>{
        //console.log(item.nombre)
    })*/

    return(
        songs
    )
    
}

/*return(
        <div>
            <h1>Tablero de Likes</h1>
            <table border={"1"}>
                <tr>
                    <td>Cancion</td>
                    <td>❤</td>
                </tr>
            {
                songs.map((item)=>
                <tr>
                    <td>{item.nombre}</td>
                    <td>{item.likes}</td>
                </tr>
                )
            }
            </table>
        </div>
    )*/



/*
                if(animo == "Vacio"){
                    if(element["Total"]!=="0"){
                        songs.push({
                            id: i,
                            nombre: key,
                            likes: element["Total"]
                        });
                    }
                }
                */