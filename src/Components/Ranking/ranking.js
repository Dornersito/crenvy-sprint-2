import { useEffect, useState, React } from 'react';
import SongRanking from './songRanking'; 

export default function Ranking() {
    //const [songs, setSongs] = useState([]);

    const songs=[];
    for(var i=0, len=localStorage.length; i<len; i++) {
        var key = localStorage.key(i);
        var value = (localStorage.getItem(key));
        //console.log(key + " => " + value);
        songs.push({
            nombre: key,
            likes: value,
        });

        songs.sort(function(a, b){
            return b.likes - a.likes;
        });
    
        var rank = 1;
        for (var i = 0; i < songs.length; i++) {
        // increase rank only if current likes less than previous
            if (i > 0 && songs[i].likes < songs[i - 1].likes) {
                rank++;
            }
            songs[i].rank = rank;
        }
    }
    
    //console.log(songs);

    //const ranking = new SongRanking(songs)
    //ranking.render()

    songs.map((item)=>{
        //console.log(item.nombre)
    })

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