import React, { useState } from "react";
import LocalStorage from "../LocalStorage/localStorage";
import Ranking from "../Ranking/ranking";


export const Likes = (cancion) => {
    
    const[like,setlike]= useState("")

    const[likeactive,setlikeactive]=useState(false)

    //console.log(titulo)

    function likef(){
        if(likeactive){//si like esta activo cuando se presiona pasa a estado dislike
            setlikeactive(false)
            setlike("")
            LocalStorage(cancion,"-1")
        }else{
            setlikeactive(true)
            setlike("d❤")
            LocalStorage(cancion,"+1")
        }
    }

    
    return (
        <div>
            <button onClick={likef} className={likeactive?'active-like':null} style={{backgroundColor:"#0000006f",
            color:"white", border: "white",
            borderRadius: "20px", borderStyle: "solid", borderWidth:"0.2px"
            }}> Like{like}</button>
        </div>
    )
    
}